import { ContentTypeFieldType } from 'contentful';
import { ImportDeclarationStructure, OptionalKind } from 'ts-morph';
import { FieldRenderer } from '../field';
export type RenderContext = {
    getFieldRenderer: <FType extends ContentTypeFieldType>(fieldType: FType) => FieldRenderer<FType>;
    moduleName: (id: string) => string;
    moduleFieldsName: (id: string) => string;
    moduleReferenceName: (id: string) => string;
    moduleSkeletonName: (id: string) => string;
    imports: Set<OptionalKind<ImportDeclarationStructure>>;
};
export declare const createDefaultContext: () => RenderContext;
