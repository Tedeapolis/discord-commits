import core = require("@actions/core");

export type Embed = Record<string, unknown>;

// https://docs.discord.com/developers/resources/message (Embed Limits)
const LIMITS = {
    title: 256,
    description: 4096,
    fields: 25,
    fieldName: 256,
    fieldValue: 1024,
    footerText: 2048,
    authorName: 256,
    embedsPerMessage: 10,
    charsPerMessage: 6000,
} as const;

const MAX_ATTEMPTS = 5;
const MAX_RETRY_WAIT_MS = 60_000;
const MAX_ERROR_BODY_LENGTH = 500;
const PLACEHOLDER = /\{\{[\s\S]+?\}\}/g;

class WebhookError extends Error {
    constructor(message: string, readonly stopSending: boolean) {
        super(message);
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function truncate(text: string, max: number): string {
    const trimmed = text.trim();
    if (trimmed.length <= max) {
        return trimmed;
    }
    if (max <= 0) {
        return "";
    }

    let end = max - 1;
    const lastCode = trimmed.charCodeAt(end - 1);
    if (lastCode >= 0xd800 && lastCode <= 0xdbff) {
        end--; // Don't cut an emoji in half.
    }
    return `${trimmed.slice(0, end).trimEnd()}…`;
}

function validUrl(value: unknown, allowAttachment = false): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }

    const url = value.trim();
    if (!URL.canParse(url)) {
        return undefined;
    }

    const parsed = new URL(url);
    const { protocol } = parsed;
    const allowed = protocol === "http:" || protocol === "https:" || (allowAttachment && protocol === "attachment:");
    return allowed ? parsed.href : undefined; // href is encoded, since Discord rejects raw spaces.
}

function validColor(value: unknown): number | undefined {
    return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 0xffffff ? value : undefined;
}

function validTimestamp(value: unknown): string | undefined {
    if (typeof value !== "string" || Number.isNaN(Date.parse(value))) {
        return undefined;
    }
    return new Date(value).toISOString();
}

function validMedia(value: unknown): Embed | undefined {
    if (!isRecord(value)) {
        return undefined;
    }
    const url = validUrl(value.url, true);
    return url ? { ...value, url } : undefined;
}

/**
 * Removes template placeholders that had no value, such as a missing GitHub username.
 * A value that is entirely one resolved placeholder is kept as is, so commit text containing braces survives.
 */
export function removeUnresolved(rendered: unknown, template: unknown): unknown {
    if (typeof rendered === "string" && typeof template === "string") {
        const placeholders = template.match(PLACEHOLDER) ?? [];
        if (placeholders.length === 1 && placeholders[0] === template.trim() && rendered !== template) {
            return rendered;
        }

        const cleaned = placeholders.reduce((text, placeholder) => text.split(placeholder).join(""), rendered);
        return cleaned === rendered ? rendered : cleaned.replace(/\(\s*\)/g, "").trim();
    }
    if (Array.isArray(rendered) && Array.isArray(template)) {
        return rendered.map((value, index) => removeUnresolved(value, template[index]));
    }
    if (isRecord(rendered) && isRecord(template)) {
        return Object.fromEntries(
            Object.entries(rendered).map(([key, value]) => [key, removeUnresolved(value, template[key])])
        );
    }
    return rendered;
}

/** Fits an embed to Discord's limits and drops invalid values. Returns undefined if nothing visible remains. */
export function sanitizeEmbed(input: unknown): Embed | undefined {
    if (!isRecord(input)) {
        return undefined;
    }

    let remaining: number = LIMITS.charsPerMessage;
    const take = (value: unknown, max: number): string | undefined => {
        const raw = typeof value === "number" ? String(value) : value;
        if (typeof raw !== "string") {
            return undefined;
        }
        const text = truncate(raw, Math.min(max, remaining));
        remaining -= text.length;
        return text || undefined;
    };

    const embed: Embed = { ...input };
    embed.title = take(input.title, LIMITS.title);

    embed.author = undefined;
    if (isRecord(input.author)) {
        const name = take(input.author.name, LIMITS.authorName);
        if (name) {
            embed.author = {
                ...input.author,
                name,
                url: validUrl(input.author.url),
                icon_url: validUrl(input.author.icon_url, true),
            };
        }
    }

    embed.description = take(input.description, LIMITS.description);

    embed.footer = undefined;
    if (isRecord(input.footer)) {
        const text = take(input.footer.text, LIMITS.footerText);
        if (text) {
            embed.footer = { ...input.footer, text, icon_url: validUrl(input.footer.icon_url, true) };
        }
    }

    const fields = (Array.isArray(input.fields) ? input.fields : []).slice(0, LIMITS.fields).flatMap((field) => {
        if (!isRecord(field)) {
            return [];
        }
        const before = remaining;
        const name = take(field.name, LIMITS.fieldName);
        const value = take(field.value, LIMITS.fieldValue);
        if (!name || !value) {
            remaining = before; // Both are required, so a half-kept field shouldn't use up the budget.
            return [];
        }
        return [{ ...field, name, value }];
    });
    embed.fields = fields.length > 0 ? fields : undefined;

    embed.url = validUrl(input.url);
    embed.color = validColor(input.color);
    embed.timestamp = validTimestamp(input.timestamp);
    embed.image = validMedia(input.image);
    embed.thumbnail = validMedia(input.thumbnail);

    const visible = embed.title || embed.description || embed.author || embed.footer || embed.fields || embed.image || embed.thumbnail;
    return visible ? embed : undefined;
}

function embedLength(embed: Embed): number {
    const length = (value: unknown) => (typeof value === "string" ? value.length : 0);
    const author = isRecord(embed.author) ? embed.author : {};
    const footer = isRecord(embed.footer) ? embed.footer : {};
    const fields = Array.isArray(embed.fields) ? embed.fields : [];

    return (
        length(embed.title) +
        length(embed.description) +
        length(author.name) +
        length(footer.text) +
        fields.reduce((total: number, field: Embed) => total + length(field.name) + length(field.value), 0)
    );
}

/** Splits sanitized embeds into messages that respect both the embed count and total character limits. */
export function batchEmbeds(embeds: Embed[]): Embed[][] {
    const batches: Embed[][] = [];
    let current: Embed[] = [];
    let chars = 0;

    for (const embed of embeds) {
        const length = embedLength(embed);
        if (current.length === LIMITS.embedsPerMessage || chars + length > LIMITS.charsPerMessage) {
            batches.push(current);
            current = [];
            chars = 0;
        }
        current.push(embed);
        chars += length;
    }

    if (current.length > 0) {
        batches.push(current);
    }
    return batches;
}

function rateLimitSeconds(response: Response, body: string): number | undefined {
    try {
        const retryAfter = JSON.parse(body).retry_after;
        if (typeof retryAfter === "number" && retryAfter >= 0) {
            return retryAfter;
        }
    } catch {
        // Not JSON, so fall back to the header.
    }

    const header = Number(response.headers.get("retry-after") ?? Number.NaN);
    return Number.isFinite(header) && header >= 0 ? header : undefined;
}

function retryDelayMs(response: Response, body: string, attempt: number): number {
    const seconds = response.status === 429 ? rateLimitSeconds(response, body) : undefined;
    return seconds !== undefined ? Math.ceil(seconds * 1000) : 1000 * 2 ** (attempt - 1);
}

async function postBatch(endpoint: string, embeds: Embed[], eventName: string): Promise<void> {
    for (let attempt = 1; ; attempt++) {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-GitHub-Event": eventName,
            },
            body: JSON.stringify({ embeds }),
        });
        const body = await response.text();

        if (response.ok) {
            return;
        }

        const { status } = response;
        if ((status === 429 || status === 502) && attempt < MAX_ATTEMPTS) {
            const delay = retryDelayMs(response, body, attempt);
            if (delay <= MAX_RETRY_WAIT_MS) {
                console.log(`Discord returned ${status}, retrying in ${delay}ms (attempt ${attempt}/${MAX_ATTEMPTS}).`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
            }
        }

        const detail = truncate(body, MAX_ERROR_BODY_LENGTH) || response.statusText;
        throw new WebhookError(`Discord returned ${status}: ${detail}`, [401, 403, 404, 429].includes(status));
    }
}

function failureDetail(err: Error): string {
    return err.cause instanceof Error ? `${err.message}: ${err.cause.message}` : err.message;
}

/** Sends embeds in as many messages as needed. Returns true if every message was delivered. */
export async function sendEmbeds(webhookUrl: string, embeds: Embed[], eventName: string): Promise<boolean> {
    if (!URL.canParse(webhookUrl)) {
        core.setFailed("The webhook input is not a valid URL.");
        return false;
    }

    const endpoint = new URL(webhookUrl);
    endpoint.searchParams.set("wait", "true");

    let delivered = true;
    for (const batch of batchEmbeds(embeds)) {
        try {
            await postBatch(endpoint.toString(), batch, eventName);
        } catch (e) {
            const err = e as Error;
            delivered = false;
            console.log(JSON.stringify({ embeds: batch }));
            console.error("Error :", err);
            core.setFailed(`Message : ${failureDetail(err)}`);

            if (err instanceof WebhookError && err.stopSending) {
                break;
            }
        }
    }
    return delivered;
}
