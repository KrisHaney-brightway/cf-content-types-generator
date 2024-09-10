"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultContentTypeRenderer = void 0;
const property_imports_1 = require("../../property-imports");
const generic_1 = require("../generic");
const base_content_type_renderer_1 = require("./base-content-type-renderer");
class DefaultContentTypeRenderer extends base_content_type_renderer_1.BaseContentTypeRenderer {
    render(contentType, file) {
        const context = this.createContext();
        this.addDefaultImports(context);
        this.renderFieldsInterface(contentType, file, context);
        file.addTypeAlias(this.renderEntry(contentType, context));
        for (const structure of context.imports) {
            file.addImportDeclaration(structure);
        }
        file.organizeImports({
            ensureNewLineAtEndOfFile: true,
        });
    }
    renderFieldsInterface(contentType, file, context) {
        const fieldsInterfaceName = context.moduleFieldsName(contentType.sys.id);
        const interfaceDeclaration = file.addInterface({
            name: fieldsInterfaceName,
            isExported: true,
        });
        for (const field of contentType.fields) {
            interfaceDeclaration.addProperty(this.renderField(field, context));
            for (const pImport of (0, property_imports_1.propertyImports)(field, context, file.getBaseNameWithoutExtension())) {
                context.imports.add(pImport);
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addDefaultImports(context) { }
    renderField(field, context) {
        return {
            name: field.id,
            hasQuestionToken: field.omitted || !field.required,
            type: this.renderFieldType(field, context),
        };
    }
    renderFieldType(field, context) {
        return context.getFieldRenderer(field.type)(field, context);
    }
    renderEntry(contentType, context) {
        return {
            name: context.moduleName(contentType.sys.id),
            isExported: true,
            type: this.renderEntryType(contentType, context),
        };
    }
    renderEntryType(contentType, context) {
        context.imports.add({
            moduleSpecifier: 'contentful',
            namedImports: ['Entry'],
            isTypeOnly: true,
        });
        return (0, generic_1.renderTypeGeneric)('Entry', context.moduleFieldsName(contentType.sys.id));
    }
}
exports.DefaultContentTypeRenderer = DefaultContentTypeRenderer;
