"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRichTextV10 = exports.renderRichText = void 0;
const renderRichText = (field, context) => {
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['EntryFields'],
        isTypeOnly: true,
    });
    return 'EntryFields.RichText';
};
exports.renderRichText = renderRichText;
const renderRichTextV10 = (field, context) => {
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['EntryFieldTypes'],
        isTypeOnly: true,
    });
    return 'EntryFieldTypes.RichText';
};
exports.renderRichTextV10 = renderRichTextV10;
