"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTypeGeneric = void 0;
const renderTypeGeneric = (type, ...gen) => {
    return `${type}<${gen.join(', ')}>`;
};
exports.renderTypeGeneric = renderTypeGeneric;
