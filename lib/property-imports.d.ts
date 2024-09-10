import { ContentTypeField } from 'contentful';
import { ImportDeclarationStructure, OptionalKind } from 'ts-morph';
import { RenderContext } from './renderer';
export declare const propertyImports: (field: ContentTypeField, context: RenderContext, ignoreModule?: string) => OptionalKind<ImportDeclarationStructure>[];
