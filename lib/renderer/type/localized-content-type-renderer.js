"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalizedContentTypeRenderer = void 0;
const generic_1 = require("../generic");
const base_content_type_renderer_1 = require("./base-content-type-renderer");
class LocalizedContentTypeRenderer extends base_content_type_renderer_1.BaseContentTypeRenderer {
    FILE_BASE_NAME = 'Localized';
    files;
    constructor() {
        super();
        this.files = [];
    }
    setup(project) {
        const file = project.createSourceFile(`${this.FILE_BASE_NAME}.ts`, 
        // eslint-disable-next-line no-warning-comments
        // TODO: read from template file
        undefined, {
            overwrite: true,
        });
        file.addStatements('/* Utility types for localized entries */');
        file.addTypeAlias({
            name: 'LocalizedFields<Fields, Locales extends keyof any>',
            isExported: true,
            type: `{
                [FieldName in keyof Fields]?: {
                    [LocaleName in Locales]?: Fields[FieldName];
                }
            }`,
        });
        file.addTypeAlias({
            name: 'LocalizedEntry<EntryType, Locales extends keyof any>',
            isExported: true,
            type: `{
                [Key in keyof EntryType]:
                Key extends 'fields'
                    ? LocalizedFields<EntryType[Key], Locales>
                    : EntryType[Key]
            }`,
        });
        file.formatText();
        this.files.push(file);
    }
    render(contentType, file) {
        const context = this.createContext();
        file.addTypeAlias({
            name: `Localized${context.moduleFieldsName(contentType.sys.id)}<Locales extends keyof any>`,
            isExported: true,
            type: (0, generic_1.renderTypeGeneric)('LocalizedFields', `${context.moduleFieldsName(contentType.sys.id)}, Locales`),
        });
        file.addTypeAlias({
            name: `Localized${context.moduleName(contentType.sys.id)}<Locales extends keyof any>`,
            isExported: true,
            type: (0, generic_1.renderTypeGeneric)('LocalizedEntry', `${context.moduleName(contentType.sys.id)}, Locales`),
        });
        context.imports.add({
            moduleSpecifier: `./${this.FILE_BASE_NAME}`,
            namedImports: ['LocalizedFields', 'LocalizedEntry'],
            isTypeOnly: true,
        });
        for (const structure of context.imports) {
            file.addImportDeclaration(structure);
        }
    }
    additionalFiles() {
        return this.files;
    }
}
exports.LocalizedContentTypeRenderer = LocalizedContentTypeRenderer;
