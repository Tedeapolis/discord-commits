declare module "stjs" {
    interface Selection {
        transformWith(template: unknown): Selection;
        root(): unknown;
    }

    const ST: {
        select(data: unknown): Selection;
    };

    export = ST;
}
