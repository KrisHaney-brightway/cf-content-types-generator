"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTypeRenderer = void 0;
const generic_1 = require("../generic");
const base_content_type_renderer_1 = require("./base-content-type-renderer");
/*
 * Renders the response types for the contentful content types
 * Based on https://github.com/contentful/contentful.js/issues/2138#issuecomment-1921923508
 */
const ChainModifiers = {
    WITHOUT_UNRESOLVABLE_LINKS: 'WithoutUnresolvableLinksResponse',
    WITHOUT_LINK_RESOLUTION: 'WithoutLinkResolutionResponse',
    WITH_ALL_LOCALES: 'WithAllLocalesResponse',
    WITH_ALL_LOCALES_AND_WITHOUT_LINK_RESOLUTION: 'WithAllLocalesAndWithoutLinkResolutionResponse',
    WITH_ALL_LOCALES_AND_WITHOUT_UNRESOLVABLE_LINK: 'WithAllLocalesAndWithoutUnresolvableLinksResponse',
};
const LocaleWithDefaultTypeString = 'Locales extends LocaleCode = LocaleCode';
class ResponseTypeRenderer extends base_content_type_renderer_1.BaseContentTypeRenderer {
    render = (contentType, file) => {
        const context = this.createContext();
        const entityName = context.moduleName(contentType.sys.id);
        file.addTypeAlias({
            name: `${entityName}${ChainModifiers.WITHOUT_LINK_RESOLUTION}`,
            isExported: true,
            type: (0, generic_1.renderTypeGeneric)(entityName, (0, generic_1.renderTypeUnion)([(0, generic_1.renderTypeLiteral)('WITHOUT_LINK_RESOLUTION')])),
        });
        file.addTypeAlias({
            name: `${entityName}${ChainModifiers.WITHOUT_UNRESOLVABLE_LINKS}`,
            isExported: true,
            type: (0, generic_1.renderTypeGeneric)(entityName, (0, generic_1.renderTypeUnion)([(0, generic_1.renderTypeLiteral)('WITHOUT_UNRESOLVABLE_LINKS')])),
        });
        file.addTypeAlias({
            name: `${entityName}${ChainModifiers.WITH_ALL_LOCALES}<${LocaleWithDefaultTypeString}>`,
            isExported: true,
            type: (0, generic_1.renderTypeGeneric)(entityName, (0, generic_1.renderTypeUnion)([(0, generic_1.renderTypeLiteral)('WITH_ALL_LOCALES')]), 'Locales'),
        });
        file.addTypeAlias({
            name: `${entityName}${ChainModifiers.WITH_ALL_LOCALES_AND_WITHOUT_LINK_RESOLUTION}<${LocaleWithDefaultTypeString}>`,
            isExported: true,
            type: (0, generic_1.renderTypeGeneric)(entityName, (0, generic_1.renderTypeUnion)([
                (0, generic_1.renderTypeLiteral)('WITH_ALL_LOCALES'),
                (0, generic_1.renderTypeLiteral)('WITHOUT_LINK_RESOLUTION'),
            ]), 'Locales'),
        });
        file.addTypeAlias({
            name: `${entityName}${ChainModifiers.WITH_ALL_LOCALES_AND_WITHOUT_UNRESOLVABLE_LINK}<${LocaleWithDefaultTypeString}>`,
            isExported: true,
            type: (0, generic_1.renderTypeGeneric)(entityName, (0, generic_1.renderTypeUnion)([
                (0, generic_1.renderTypeLiteral)('WITH_ALL_LOCALES'),
                (0, generic_1.renderTypeLiteral)('WITHOUT_UNRESOLVABLE_LINKS'),
            ]), 'Locales'),
        });
        file.organizeImports({
            ensureNewLineAtEndOfFile: true,
        });
        file.formatText();
    };
}
exports.ResponseTypeRenderer = ResponseTypeRenderer;
