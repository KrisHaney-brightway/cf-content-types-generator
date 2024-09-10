"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPropResourceLinkV10 = exports.renderPropResourceLink = void 0;
const generic_1 = require("../generic");
const renderPropResourceLink = (field, context) => {
    for (const resource of field.allowedResources) {
        if (resource.type !== 'Contentful:Entry') {
            throw new Error(`Unknown type "${resource.type}"`);
        }
    }
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['Entry'],
        isTypeOnly: true,
    });
    return (0, generic_1.renderTypeGeneric)('Entry', 'Record<string, any>');
};
exports.renderPropResourceLink = renderPropResourceLink;
const renderPropResourceLinkV10 = (field, context) => {
    for (const resource of field.allowedResources) {
        if (resource.type !== 'Contentful:Entry') {
            throw new Error(`Unknown type "${resource.type}"`);
        }
    }
    context.imports.add({
        moduleSpecifier: 'contentful',
        namedImports: ['EntryFieldTypes', 'EntrySkeletonType'],
        isTypeOnly: true,
    });
    return (0, generic_1.renderTypeGeneric)('EntryFieldTypes.EntryResourceLink', 'EntrySkeletonType');
};
exports.renderPropResourceLinkV10 = renderPropResourceLinkV10;
