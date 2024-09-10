"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inValidations = exports.linkContentTypeValidations = void 0;
const validation = (node, field) => {
    if (node.validations && node.validations.length > 0) {
        const linkContentValidation = node.validations.find((value) => value[field]);
        if (linkContentValidation) {
            return linkContentValidation[field] || [];
        }
    }
    return [];
};
const linkContentTypeValidations = (node) => {
    const value = validation(node, 'linkContentType');
    return Array.isArray(value) ? value : [value];
};
exports.linkContentTypeValidations = linkContentTypeValidations;
const inValidations = (node) => {
    return validation(node, 'in');
};
exports.inValidations = inValidations;
