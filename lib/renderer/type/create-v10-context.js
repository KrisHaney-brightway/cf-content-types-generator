"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createV10Context = void 0;
const field_1 = require("../field");
const create_default_context_1 = require("./create-default-context");
const module_name_1 = require("../../module-name");
const createV10Context = () => {
    return {
        ...(0, create_default_context_1.createDefaultContext)(),
        moduleReferenceName: module_name_1.moduleSkeletonName,
        getFieldRenderer: (fieldType) => field_1.v10Renderers[fieldType],
    };
};
exports.createV10Context = createV10Context;
