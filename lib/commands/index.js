"use strict";
const core_1 = require("@oclif/core");
// eslint-disable-next-line unicorn/prefer-module
const contentfulExport = require('contentful-export');
const fs = require("fs-extra");
const fs_extra_1 = require("fs-extra");
const path = require("node:path");
const cf_definitions_builder_1 = require("../cf-definitions-builder");
const renderer_1 = require("../renderer");
class ContentfulMdg extends core_1.Command {
    static description = 'Contentful Content Types (TS Definitions) Generator';
    static flags = {
        version: core_1.Flags.version({ char: 'v' }),
        help: core_1.Flags.help({ char: 'h' }),
        out: core_1.Flags.string({ char: 'o', description: 'output directory' }),
        preserve: core_1.Flags.boolean({ char: 'p', description: 'preserve output folder' }),
        v10: core_1.Flags.boolean({ char: 'X', description: 'create contentful.js v10 types' }),
        localized: core_1.Flags.boolean({ char: 'l', description: 'add localized types' }),
        jsdoc: core_1.Flags.boolean({ char: 'd', description: 'add JSDoc comments' }),
        typeguard: core_1.Flags.boolean({ char: 'g', description: 'add type guards' }),
        response: core_1.Flags.boolean({ char: 'r', description: 'add response types' }),
        // remote access
        spaceId: core_1.Flags.string({ char: 's', description: 'space id' }),
        token: core_1.Flags.string({
            char: 't',
            description: 'management token',
            default: process.env.CTF_CMA_TOKEN,
        }),
        environment: core_1.Flags.string({ char: 'e', description: 'environment' }),
        host: core_1.Flags.string({ char: 'a', description: 'host', default: 'api.contentful.com' }),
    };
    static args = {
        file: core_1.Args.file({ description: 'local export (.json)' }),
    };
    async run() {
        const { args, flags } = await this.parse(ContentfulMdg);
        if (args.file && !fs.pathExistsSync(args.file)) {
            this.error(`file ${args.file} doesn't exists.`);
        }
        let content;
        if (args.file) {
            content = await fs.readJSON(args.file);
            if (!content.contentTypes)
                this.error(`file ${args.file} is missing "contentTypes" field`);
        }
        else {
            if (!flags.spaceId)
                this.error('Please specify "spaceId".');
            if (!flags.token)
                this.error('Please specify "token".');
            content = await contentfulExport({
                spaceId: flags.spaceId,
                managementToken: flags.token,
                environmentId: flags.environment,
                skipContent: true,
                skipRoles: true,
                skipWebhooks: true,
                saveFile: false,
                host: flags.host,
            });
        }
        const renderers = flags.v10
            ? [new renderer_1.V10ContentTypeRenderer()]
            : [new renderer_1.DefaultContentTypeRenderer()];
        if (flags.localized) {
            if (flags.v10) {
                this.error('"--localized" option is not needed, contentful.js v10 types have localization built in.');
            }
            renderers.push(new renderer_1.LocalizedContentTypeRenderer());
        }
        if (flags.jsdoc) {
            renderers.push(new renderer_1.JsDocRenderer());
        }
        if (flags.typeguard) {
            renderers.push(flags.v10 ? new renderer_1.V10TypeGuardRenderer() : new renderer_1.TypeGuardRenderer());
        }
        if (flags.response) {
            if (!flags.v10) {
                this.error('"--response" option is only available for contentful.js v10 types.');
            }
            renderers.push(new renderer_1.ResponseTypeRenderer());
        }
        const editorInterfaces = content.editorInterfaces;
        const builder = new cf_definitions_builder_1.default(renderers);
        for (const model of content.contentTypes) {
            const editorInterface = editorInterfaces?.find((e) => e.sys.contentType.sys.id === model.sys.id);
            builder.appendType(model, editorInterface);
        }
        if (flags.out) {
            const outDir = path.resolve(flags.out);
            if (!flags.preserve && fs.pathExistsSync(outDir)) {
                await fs.remove(outDir);
            }
            await fs.ensureDir(outDir);
            await builder.write(flags.out, fs_extra_1.writeFile);
        }
        else {
            this.log(builder.toString());
        }
    }
}
module.exports = ContentfulMdg;
