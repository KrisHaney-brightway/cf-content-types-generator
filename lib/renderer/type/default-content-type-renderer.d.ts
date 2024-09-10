import { ContentTypeField } from 'contentful';
import { OptionalKind, PropertySignatureStructure, SourceFile, TypeAliasDeclarationStructure } from 'ts-morph';
import { CFContentType } from '../../types';
import { BaseContentTypeRenderer } from './base-content-type-renderer';
import { RenderContext } from './create-default-context';
export declare class DefaultContentTypeRenderer extends BaseContentTypeRenderer {
    render(contentType: CFContentType, file: SourceFile): void;
    protected renderFieldsInterface(contentType: CFContentType, file: SourceFile, context: RenderContext): void;
    protected addDefaultImports(context: RenderContext): void;
    protected renderField(field: ContentTypeField, context: RenderContext): OptionalKind<PropertySignatureStructure>;
    protected renderFieldType(field: ContentTypeField, context: RenderContext): string;
    protected renderEntry(contentType: CFContentType, context: RenderContext): OptionalKind<TypeAliasDeclarationStructure>;
    protected renderEntryType(contentType: CFContentType, context: RenderContext): string;
}
