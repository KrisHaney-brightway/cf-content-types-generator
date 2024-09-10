"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContentTypeRenderer = void 0;
const create_default_context_1 = require("./create-default-context");
class BaseContentTypeRenderer {
    setup(project) {
        /**/
    }
    render(contentType, file) {
        file.addStatements(`/* Types for ${contentType.sys.id} */`);
    }
    createContext() {
        return (0, create_default_context_1.createDefaultContext)();
    }
    additionalFiles() {
        return [];
    }
}
exports.BaseContentTypeRenderer = BaseContentTypeRenderer;
