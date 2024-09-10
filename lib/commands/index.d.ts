import { Command } from '@oclif/core';
declare class ContentfulMdg extends Command {
    static description: string;
    static flags: {
        version: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        help: import("@oclif/core/lib/interfaces").BooleanFlag<void>;
        out: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        preserve: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        v10: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        localized: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        jsdoc: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        typeguard: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        response: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        spaceId: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        token: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        environment: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        host: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static args: {
        file: import("@oclif/core/lib/interfaces").Arg<string | undefined, {
            exists?: boolean | undefined;
        }>;
    };
    run(): Promise<string | void>;
}
export = ContentfulMdg;
