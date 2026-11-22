import core = require("@actions/core");
import github = require("@actions/github");
import _ = require("lodash");
import ST = require("stjs");
import { type Embed, removeUnresolved, sanitizeEmbed, sendEmbeds } from "./discord";

interface Commit {
    message: string;
    [key: string]: unknown;
}

interface TemplateData {
    env: NodeJS.ProcessEnv;
    github: typeof github;
    length?: number;
}

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

async function run(): Promise<void> {
    try {
        const message = core.getInput("message");
        const webhook = core.getInput("webhook");
        const webhook_all = core.getInput("webhook_all");
        const url = core.getInput("url");
        const iconUrl = core.getInput("icon_url") ?? "https://i.imgur.com/eJ08X1Z.png";
        const author = core.getInput("author") ?? "Tedeapolis";
        const embed =
            core.getInput("embed") ||
            '{ "title": "{{ commit.title }}", "description": "{{ commit.description }}", "url": "{{ commit.url }}", "author": { "name": "{{ commit.author.name }} ({{ commit.author.username }})", "icon_url": "https://avatars.io/gravatar/{{ commit.author.email }}"} }';
        const eventName = github.context.eventName || "push";
        const data: TemplateData = {
            env: { ...process.env },
            github: { ...github },
        };

        github.context.payload.commits = github.context.payload.commits || [
            {
                author: {
                    email: "burroughszeb@me.com",
                    name: "Zeb",
                    username: "ZebTheWizard",
                },
                message: "this is a title\n\nthis is a description",
            },
            {
                author: {
                    email: "burroughszeb@me.com",
                    name: "Zeb",
                    username: "ZebTheWizard",
                },
                message:
                    "testing\n" +
                    "\n" +
                    "**What is new?**\n" +
                    "I'm testing out some capability.\n" +
                    "~what do you think?~\n" +
                    "```js\n" +
                    "console.log('asdf');\n" +
                    "```",
            },
        ];

        const commits: Commit[] = github.context.payload.commits;

        const toEmbeds = (list: Commit[]): Embed[] =>
            list.flatMap((commit) => {
                const $data = {
                    ...data,
                    commit: {
                        title: commit.message.split("\n\n").slice(0, 1).join("\n\n"),
                        description: commit.message.split("\n\n").slice(1).join("\n\n"),
                        ...commit,
                    },
                };

                const parsed = ST.select($data).transformWith(JSON.parse(embed)).root();
                const sanitized = sanitizeEmbed(removeUnresolved(parsed, JSON.parse(embed)));
                return sanitized ? [sanitized] : [];
            });

        const embeds = toEmbeds(
            commits.filter((commit) => {
                const message = commit.message.toLowerCase();
                if (message.includes("redacted")) {
                    return false;
                }
                if (message.includes("merge")) {
                    return false;
                }

                return true;
            })
        );

        data.length = embeds.length;

        if (webhook_all) {
            const embeds_all = toEmbeds(
                commits.filter((commit) => {
                    const message = commit.message.toLowerCase();
                    if (message.includes("merge")) {
                        return false;
                    }

                    return true;
                })
            );

            await sendEmbeds(webhook_all, embeds_all, eventName);
        }

        if (embeds.length == 0) {
            console.log("All messages filtered, cancelling run.");
            return;
        }

        const header = sanitizeEmbed({
            "description": _.template(message)(data),
            "color": 2752256,
            "author": {
                "name": _.template(author)(data),
                "url": _.template(url)(data),
                "icon_url": _.template(iconUrl)(data),
            },
        });

        const delivered = await sendEmbeds(webhook, header ? [header, ...embeds] : embeds, eventName);
        if (delivered) {
            console.log("Message sent ! Shutting down ...");
        }
    } catch (error) {
        core.setFailed((error as Error).message);
    }
}

run();
