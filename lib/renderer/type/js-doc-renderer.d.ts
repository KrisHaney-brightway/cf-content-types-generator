import { ContentTypeField } from 'contentful';
import { JSDocStructure, OptionalKind, SourceFile } from 'ts-morph';
import { CFContentType, CFEditorInterface, CFEditorInterfaceControl } from '../../types';
import { BaseContentTypeRenderer } from './base-content-type-renderer';
type EntryDocsOptionsProps = {
    readonly name: string;
    readonly contentType: CFContentType;
};
type FieldsDocsOptionsProps = {
    readonly name: string;
    readonly entryName: string;
    readonly fields: ContentTypeField[];
};
type FieldDocsOptionsProps = {
    readonly field: ContentTypeField;
    readonly control?: CFEditorInterfaceControl;
};
type SkeletonDocsOptionsProps = {
    readonly name: string;
    readonly contentType: CFContentType;
};
export type JSDocRenderOptions = {
    renderEntryDocs?: (props: EntryDocsOptionsProps) => OptionalKind<JSDocStructure> | string;
    renderFieldsDocs?: (props: FieldsDocsOptionsProps) => OptionalKind<JSDocStructure> | string;
    renderFieldDocs?: (props: FieldDocsOptionsProps) => OptionalKind<JSDocStructure> | string;
    renderSkeletonDocs?: (props: SkeletonDocsOptionsProps) => OptionalKind<JSDocStructure> | string;
};
export declare const defaultJsDocRenderOptions: Required<JSDocRenderOptions>;
export declare class JsDocRenderer extends BaseContentTypeRenderer {
    private renderOptions;
    constructor({ renderOptions }?: {
        renderOptions?: JSDocRenderOptions;
    });
    render: (contentType: CFContentType, file: SourceFile, editorInterface?: CFEditorInterface) => void;
}
export {};
