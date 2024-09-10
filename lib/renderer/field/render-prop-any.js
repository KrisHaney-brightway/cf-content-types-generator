"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPropAnyV10 = exports.renderPropAny = void 0;
const generic_1 = require("../generic");
const renderPropAny = (field, context) => {
    if (field.validations?.length > 0) {
        const includesValidation = field.validations.find((validation) => validation.in);
        if (includesValidation && includesValidation.in) {
            const mapper = () => {
                if (field.type === 'Symbol' || field.type === 'Text' || field.type === 'RichText') {
                    return generic_1.renderTypeLiteral;
                }
                return (value) => value.toString();
            };
            return (0, generic_1.renderTypeUnion)(includesValidation.in.map((type) => mapper()(type)));
        }
    }
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['EntryFields'],
        isTypeOnly: true,
    });
    return `EntryFields.${field.type}`;
};
exports.renderPropAny = renderPropAny;
const renderPropAnyV10 = (field, context) => {
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['EntryFieldTypes'],
        isTypeOnly: true,
    });
    if (field.validations?.length > 0) {
        const includesValidation = field.validations.find((validation) => validation.in);
        if (includesValidation && includesValidation.in) {
            const mapper = () => {
                if (field.type === 'Symbol' || field.type === 'Text' || field.type === 'RichText') {
                    return generic_1.renderTypeLiteral;
                }
                return (value) => value.toString();
            };
            return (0, generic_1.renderTypeGeneric)(`EntryFieldTypes.${field.type}`, (0, generic_1.renderTypeUnion)(includesValidation.in.map((type) => mapper()(type))));
        }
    }
    return `EntryFieldTypes.${field.type}`;
};
exports.renderPropAnyV10 = renderPropAnyV10;
