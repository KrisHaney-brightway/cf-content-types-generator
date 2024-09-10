"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsDocRenderer = exports.defaultJsDocRenderOptions = void 0;
const base_content_type_renderer_1 = require("./base-content-type-renderer");
exports.defaultJsDocRenderOptions = {
    renderEntryDocs: ({ contentType, name }) => {
        const tags = [];
        tags.push({
            tagName: 'name',
            text: name,
        }, {
            tagName: 'type',
            text: `{${name}}`,
        });
        const cmaContentType = contentType;
        if (cmaContentType.sys.createdBy?.sys?.id) {
            tags.push({
                tagName: 'author',
                text: cmaContentType.sys.createdBy.sys.id,
            });
        }
        if (cmaContentType.sys.firstPublishedAt) {
            tags.push({
                tagName: 'since',
                text: cmaContentType.sys.firstPublishedAt,
            });
        }
        if (cmaContentType.sys.publishedVersion) {
            tags.push({
                tagName: 'version',
                text: cmaContentType.sys.publishedVersion.toString(),
            });
        }
        return {
            description: `Entry type definition for content type '${contentType.sys.id}' (${contentType.name})`,
            tags,
        };
    },
    renderFieldsDocs: ({ name, entryName }) => {
        return {
            description: `Fields type definition for content type '${entryName}'`,
            tags: [
                {
                    tagName: 'name',
                    text: name,
                },
                {
                    tagName: 'type',
                    text: `{${name}}`,
                },
                {
                    tagName: 'memberof',
                    text: entryName,
                },
            ],
        };
    },
    renderFieldDocs: ({ field, control }) => {
        const tags = [
            {
                tagName: 'name',
                text: field.name,
            },
            {
                tagName: 'localized',
                text: field.localized.toString(),
            },
        ];
        if (control?.settings?.helpText) {
            tags.push({
                tagName: 'summary',
                text: control?.settings?.helpText,
            });
        }
        return {
            description: `Field type definition for field '${field.id}' (${field.name})`,
            tags,
        };
    },
    renderSkeletonDocs: ({ contentType, name }) => {
        const tags = [];
        tags.push({
            tagName: 'name',
            text: name,
        }, {
            tagName: 'type',
            text: `{${name}}`,
        });
        const cmaContentType = contentType;
        if (cmaContentType.sys.createdBy?.sys?.id) {
            tags.push({
                tagName: 'author',
                text: cmaContentType.sys.createdBy.sys.id,
            });
        }
        if (cmaContentType.sys.firstPublishedAt) {
            tags.push({
                tagName: 'since',
                text: cmaContentType.sys.firstPublishedAt,
            });
        }
        if (cmaContentType.sys.publishedVersion) {
            tags.push({
                tagName: 'version',
                text: cmaContentType.sys.publishedVersion.toString(),
            });
        }
        return {
            description: `Entry skeleton type definition for content type '${contentType.sys.id}' (${contentType.name})`,
            tags,
        };
    },
};
/* JsDocRenderer only works in conjunction with other Renderers. It relays on previously rendered Interfaces */
class JsDocRenderer extends base_content_type_renderer_1.BaseContentTypeRenderer {
    renderOptions;
    constructor({ renderOptions } = {}) {
        super();
        this.renderOptions = {
            ...exports.defaultJsDocRenderOptions,
            ...renderOptions,
        };
    }
    render = (contentType, file, editorInterface) => {
        const context = this.createContext();
        const entryInterfaceName = context.moduleName(contentType.sys.id);
        const entryInterface = file.getTypeAlias(entryInterfaceName);
        if (entryInterface) {
            entryInterface.addJsDoc(this.renderOptions.renderEntryDocs({
                name: entryInterfaceName,
                contentType,
            }));
        }
        const fieldsInterfaceName = context.moduleFieldsName(contentType.sys.id);
        const fieldsInterface = file.getInterface(fieldsInterfaceName);
        if (fieldsInterface) {
            fieldsInterface.addJsDoc(this.renderOptions.renderFieldsDocs({
                name: fieldsInterfaceName,
                entryName: entryInterfaceName,
                fields: contentType.fields,
            }));
            const fields = fieldsInterface.getProperties();
            for (const field of fields) {
                const fieldName = field.getName();
                const contentTypeField = contentType.fields.find((f) => f.id === fieldName);
                const control = editorInterface?.controls.find((c) => c.fieldId === fieldName);
                if (contentTypeField) {
                    field.addJsDoc(this.renderOptions.renderFieldDocs({
                        field: contentTypeField,
                        control,
                    }));
                }
            }
        }
        const skeletonInterfaceName = context.moduleSkeletonName(contentType.sys.id);
        const skeletonInterface = file.getTypeAlias(skeletonInterfaceName);
        if (skeletonInterface) {
            skeletonInterface.addJsDoc(this.renderOptions.renderSkeletonDocs({
                name: skeletonInterfaceName,
                contentType,
            }));
        }
    };
}
exports.JsDocRenderer = JsDocRenderer;
