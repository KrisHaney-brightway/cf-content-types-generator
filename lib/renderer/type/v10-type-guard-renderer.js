"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V10TypeGuardRenderer = void 0;
const module_name_1 = require("../../module-name");
const base_content_type_renderer_1 = require("./base-content-type-renderer");
const generic_1 = require("../generic");
class V10TypeGuardRenderer extends base_content_type_renderer_1.BaseContentTypeRenderer {
    files;
    static WithContentTypeLink = 'WithContentTypeLink';
    constructor() {
        super();
        this.files = [];
    }
    setup(project) {
        super.setup(project);
    }
    render = (contentType, file) => {
        const entryInterfaceName = (0, module_name_1.moduleName)(contentType.sys.id);
        file.addImportDeclaration({
            moduleSpecifier: `contentful`,
            namedImports: ['ChainModifiers', 'Entry', 'LocaleCode'],
            isTypeOnly: true,
        });
        file.addFunction({
            isExported: true,
            name: (0, generic_1.renderTypeGeneric)(`is${entryInterfaceName}`, 'Modifiers extends ChainModifiers', 'Locales extends LocaleCode'),
            returnType: `entry is ${(0, generic_1.renderTypeGeneric)(entryInterfaceName, 'Modifiers', 'Locales')}`,
            parameters: [
                {
                    name: 'entry',
                    type: (0, generic_1.renderTypeGeneric)('Entry', 'EntrySkeletonType', 'Modifiers', 'Locales'),
                },
            ],
            statements: `return entry.sys.contentType.sys.id === '${contentType.sys.id}'`,
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
exports.V10TypeGuardRenderer = V10TypeGuardRenderer;
