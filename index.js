const core = require("@actions/core");
const github = require("@actions/github");
const _ = require("lodash");
const axios = require("axios");
const ST = require("stjs");

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

async function run() {
    try {
        const message = core.getInput("message");
        const webhook = core.getInput("webhook");
        const embed =
            core.getInput("embed") ||
            '{ "title": "{{ commit.title }}", "description": "{{ commit.description }}", "url": "{{ commit.url }}", "author": { "name": "{{ commit.author.name }} ({{ commit.author.username }})", "icon_url": "https://avatars.io/gravatar/{{ commit.author.email }}"} }';
        const data = {
            env: { ...process.env },
            github: { ...github },
        };

        console.log(JSON.stringify(data));

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

        /**
         * @type any[]
         */
        const embeds = github.context.payload.commits.map((commit) => {
            const $data = {
                ...data,
                commit: {
                    title: commit.message.split("\n\n").slice(0, 1).join("\n\n"),
                    description: commit.message.split("\n\n").slice(1).join("\n\n"),
                    ...commit,
                },
            };

            const parsed = ST.select($data).transformWith(JSON.parse(embed)).root();
            return parsed;
        });

        let payload = {
            content: _.template(message)(data),
        }

        while (embeds.length > 0) {
            payload["embeds"] = embeds.splice(0, 10);

            try {
                await axios
                    .post(`${webhook}?wait=true`, JSON.stringify(payload), {
                        headers: {
                            "Content-Type": "application/json",
                            "X-GitHub-Event": github.context.eventName || "push",
                        },
                    });
            } catch (err) {
                console.log(JSON.stringify(payload));
                console.error("Error :", err.response.status, err.response.statusText);
                core.setFailed(
                    "Message :",
                    err.response ? err.response.data : err.message
                );
            }

            payload = {}
        }

        console.log("Message sent ! Shutting down ...");
        process.exit(0);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();