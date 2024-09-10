"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyImports = void 0;
const extract_validation_1 = require("./extract-validation");
const propertyImports = (field, context, ignoreModule) => {
    const filterIgnoredModule = (name) => ignoreModule !== context.moduleName(name);
    const moduleImport = (module) => {
        return {
            moduleSpecifier: `./${context.moduleName(module)}`,
            namedImports: [context.moduleReferenceName(module)],
            isTypeOnly: true,
        };
    };
    if (field.type === 'Link' && field.linkType === 'Entry') {
        return field.validations?.length > 0
            ? (0, extract_validation_1.linkContentTypeValidations)(field)
                .filter((name) => filterIgnoredModule(name))
                .map((contentType) => moduleImport(contentType))
            : [moduleImport(field.id)];
    }
    if (field.type === 'Array' && field.items) {
        return (0, extract_validation_1.linkContentTypeValidations)(field.items)
            .filter((name) => filterIgnoredModule(name))
            .map((contentType) => moduleImport(contentType));
    }
    return [];
};
exports.propertyImports = propertyImports;
