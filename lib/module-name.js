"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleFieldsName = exports.moduleSkeletonName = exports.moduleName = void 0;
const lodash_1 = require("lodash");
const fp_1 = require("lodash/fp");
const removeSpace = (input) => input.replace(/\s/g, '');
const replaceDash = (input) => input.replace(/-/g, '__');
const addPrefix = (input) => (input.startsWith('Type') ? input : `Type${input}`);
const moduleName = (name) => {
    return (0, fp_1.pipe)([replaceDash, lodash_1.upperFirst, addPrefix, removeSpace])(name);
};
exports.moduleName = moduleName;
const moduleSkeletonName = (name) => {
    return (0, exports.moduleName)(name) + 'Skeleton';
};
exports.moduleSkeletonName = moduleSkeletonName;
const moduleFieldsName = (name) => {
    return (0, exports.moduleName)(name) + 'Fields';
};
exports.moduleFieldsName = moduleFieldsName;
