"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGuardRenderer = void 0;
const module_name_1 = require("../../module-name");
const base_content_type_renderer_1 = require("./base-content-type-renderer");
class TypeGuardRenderer extends base_content_type_renderer_1.BaseContentTypeRenderer {
    files;
    static WithContentTypeLink = 'WithContentTypeLink';
    constructor() {
        super();
        this.files = [];
    }
    setup(project) {
        super.setup(project);
        const file = project.createSourceFile(`${TypeGuardRenderer.WithContentTypeLink}.ts`, undefined, {
            overwrite: true,
        });
        file.addTypeAlias({
            name: TypeGuardRenderer.WithContentTypeLink,
            isExported: true,
            type: `{ sys: { contentType: { sys: { id: string } } } }`,
        });
        file.formatText();
        this.files.push(file);
    }
    render = (contentType, file) => {
        const entryInterfaceName = (0, module_name_1.moduleName)(contentType.sys.id);
        file.addImportDeclaration({
            moduleSpecifier: `./${TypeGuardRenderer.WithContentTypeLink}`,
            namedImports: [TypeGuardRenderer.WithContentTypeLink],
            isTypeOnly: true,
        });
        file.addFunction({
            isExported: true,
            name: `is${entryInterfaceName}`,
            returnType: `entry is ${entryInterfaceName}`,
            parameters: [
                {
                    name: 'entry',
                    type: TypeGuardRenderer.WithContentTypeLink,
                },
            ],
            statements: `return entry?.sys?.contentType?.sys?.id === '${contentType.sys.id}'`,
        });
        file.organizeImports({
            ensureNewLineAtEndOfFile: true,
        });
        file.formatText();
    };
    additionalFiles() {
        return this.files;
    }
}
exports.TypeGuardRenderer = TypeGuardRenderer;
