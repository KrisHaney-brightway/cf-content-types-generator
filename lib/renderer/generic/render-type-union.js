"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTypeUnion = void 0;
const renderTypeUnion = (types) => {
    return types.sort().join(' | ');
};
exports.renderTypeUnion = renderTypeUnion;
