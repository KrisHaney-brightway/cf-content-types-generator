"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPropLinkV10 = exports.renderPropLink = void 0;
const extract_validation_1 = require("../../extract-validation");
const generic_1 = require("../generic");
const renderPropLink = (field, context) => {
    const linkContentType = (field, context) => {
        const validations = (0, extract_validation_1.linkContentTypeValidations)(field);
        return validations?.length > 0
            ? (0, generic_1.renderTypeUnion)(validations.map((validation) => context.moduleFieldsName(validation)))
            : 'Record<string, any>';
    };
    switch (field.linkType) {
        case 'Entry':
            context.imports.add({
                moduleSpecifier: 'contentful',
                namedImports: ['Entry'],
                isTypeOnly: true,
            });
            return (0, generic_1.renderTypeGeneric)(field.linkType, linkContentType(field, context));
        case 'Asset':
            context.imports.add({
                moduleSpecifier: 'contentful',
                namedImports: ['Asset'],
                isTypeOnly: true,
            });
            return 'Asset';
        default:
            throw new Error(`Unknown linkType "${field.linkType}"`);
    }
};
exports.renderPropLink = renderPropLink;
const renderPropLinkV10 = (field, context) => {
    const linkContentType = (field, context) => {
        const validations = (0, extract_validation_1.linkContentTypeValidations)(field);
        return validations?.length > 0
            ? (0, generic_1.renderTypeUnion)(validations.map((validation) => context.moduleSkeletonName(validation)))
            : 'EntrySkeletonType';
    };
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['EntryFieldTypes'],
        isTypeOnly: true,
    });
    switch (field.linkType) {
        case 'Entry':
            return (0, generic_1.renderTypeGeneric)('EntryFieldTypes.EntryLink', linkContentType(field, context));
        case 'Asset':
            return 'EntryFieldTypes.AssetLink';
        default:
            throw new Error(`Unknown linkType "${field.linkType}"`);
    }
};
exports.renderPropLinkV10 = renderPropLinkV10;
