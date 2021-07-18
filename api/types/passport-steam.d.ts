declare module "passport-steam" {
    import passport from "passport";

    interface StrategyOpts {
        returnURL: string;
        realm?: string;
        apiKey?: string;
        profile?: boolean;
    }

    type StrategyValidateCallback = (
        identifier: string,
        profile: unknown,
        done: (err: unknown, user?: Express.User) => void
    ) => void;

    export class Strategy extends passport.Strategy {
        name: "steam";
        stateless: boolean;

        constructor(opts: StrategyOpts, validate: StrategyValidateCallback);
    }

    export default Strategy;
}
