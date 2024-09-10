"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V10ContentTypeRenderer = void 0;
const property_imports_1 = require("../../property-imports");
const generic_1 = require("../generic");
const base_content_type_renderer_1 = require("./base-content-type-renderer");
const create_v10_context_1 = require("./create-v10-context");
class V10ContentTypeRenderer extends base_content_type_renderer_1.BaseContentTypeRenderer {
    render(contentType, file) {
        const context = this.createContext();
        this.addDefaultImports(context);
        this.renderFieldsInterface(contentType, file, context);
        file.addTypeAlias(this.renderEntrySkeleton(contentType, context));
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
    renderEntrySkeleton(contentType, context) {
        return {
            name: context.moduleSkeletonName(contentType.sys.id),
            isExported: true,
            type: this.renderEntrySkeletonType(contentType, context),
        };
    }
    renderEntrySkeletonType(contentType, context) {
        context.imports.add({
            moduleSpecifier: 'contentful',
            namedImports: ['EntrySkeletonType'],
            isTypeOnly: true,
        });
        return (0, generic_1.renderTypeGeneric)('EntrySkeletonType', context.moduleFieldsName(contentType.sys.id), `"${contentType.sys.id}"`);
    }
    renderEntry(contentType, context) {
        return {
            name: (0, generic_1.renderTypeGeneric)(context.moduleName(contentType.sys.id), 'Modifiers extends ChainModifiers', 'Locales extends LocaleCode = LocaleCode'),
            isExported: true,
            type: this.renderEntryType(contentType, context),
        };
    }
    renderEntryType(contentType, context) {
        context.imports.add({
            moduleSpecifier: 'contentful',
            namedImports: ['ChainModifiers', 'Entry', 'LocaleCode'],
            isTypeOnly: true,
        });
        return (0, generic_1.renderTypeGeneric)('Entry', context.moduleSkeletonName(contentType.sys.id), 'Modifiers', 'Locales');
    }
    createContext() {
        return (0, create_v10_context_1.createV10Context)();
    }
}
exports.V10ContentTypeRenderer = V10ContentTypeRenderer;
