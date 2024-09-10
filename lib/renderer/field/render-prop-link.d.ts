import { ContentTypeField } from 'contentful';
import { RenderContext } from '../type';
export declare const renderPropLink: (field: Pick<ContentTypeField, "validations" | "linkType">, context: RenderContext) => string;
export declare const renderPropLinkV10: (field: Pick<ContentTypeField, "validations" | "linkType">, context: RenderContext) => string;
