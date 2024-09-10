"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPropArrayV10 = exports.renderPropArray = void 0;
const extract_validation_1 = require("../../extract-validation");
const generic_1 = require("../generic");
const renderPropArray = (field, context) => {
    if (!field.items) {
        throw new Error(`missing items for ${field.id}`);
    }
    if (field.items.type === 'Link') {
        return (0, generic_1.renderTypeArray)(context.getFieldRenderer('Link')(field.items, context));
    }
    if (field.items.type === 'ResourceLink') {
        return (0, generic_1.renderTypeArray)(context.getFieldRenderer('ResourceLink')(field, context));
    }
    if (field.items.type === 'Symbol') {
        const validation = (0, extract_validation_1.inValidations)(field.items);
        if (validation?.length > 0) {
            const validationsTypes = validation.map((val) => (0, generic_1.renderTypeLiteral)(val));
            if (validationsTypes.length > 1) {
                return (0, generic_1.renderTypeArray)(`(${(0, generic_1.renderTypeUnion)(validationsTypes)})`);
            }
            return (0, generic_1.renderTypeArray)(`${(0, generic_1.renderTypeUnion)(validationsTypes)}`);
        }
        context.imports.add({
            moduleSpecifier: 'contentful',
            namedImports: ['EntryFields'],
            isTypeOnly: true,
        });
        return (0, generic_1.renderTypeArray)('EntryFields.Symbol');
    }
    throw new Error('unhandled array type "' + field.items.type + '"');
};
exports.renderPropArray = renderPropArray;
const renderPropArrayV10 = (field, context) => {
    if (!field.items) {
        throw new Error(`missing items for ${field.id}`);
    }
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['EntryFieldTypes'],
        isTypeOnly: true,
    });
    if (field.items.type === 'Link') {
        return (0, generic_1.renderTypeGeneric)('EntryFieldTypes.Array', context.getFieldRenderer('Link')(field.items, context));
    }
    if (field.items.type === 'ResourceLink') {
        return (0, generic_1.renderTypeGeneric)('EntryFieldTypes.Array', context.getFieldRenderer('ResourceLink')(field, context));
    }
    if (field.items.type === 'Symbol') {
        const validation = (0, extract_validation_1.inValidations)(field.items);
        if (validation?.length > 0) {
            const validationsTypes = validation.map((val) => (0, generic_1.renderTypeLiteral)(val));
            return (0, generic_1.renderTypeGeneric)('EntryFieldTypes.Array', (0, generic_1.renderTypeGeneric)('EntryFieldTypes.Symbol', (0, generic_1.renderTypeUnion)(validationsTypes)));
        }
        return (0, generic_1.renderTypeGeneric)('EntryFieldTypes.Array', 'EntryFieldTypes.Symbol');
    }
    throw new Error('unhandled array type "' + field.items.type + '"');
};
exports.renderPropArrayV10 = renderPropArrayV10;
