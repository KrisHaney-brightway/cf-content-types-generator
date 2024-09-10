"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultContext = void 0;
const module_name_1 = require("../../module-name");
const field_1 = require("../field");
const createDefaultContext = () => {
    return {
        moduleName: module_name_1.moduleName,
        moduleFieldsName: module_name_1.moduleFieldsName,
        moduleSkeletonName: module_name_1.moduleSkeletonName,
        moduleReferenceName: module_name_1.moduleFieldsName,
        getFieldRenderer: (fieldType) => field_1.defaultRenderers[fieldType],
        imports: new Set(),
    };
};
exports.createDefaultContext = createDefaultContext;
