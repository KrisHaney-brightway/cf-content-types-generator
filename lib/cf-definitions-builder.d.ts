import { ContentTypeRenderer } from './renderer';
import { CFContentType, CFEditorInterface, WriteCallback } from './types';
export default class CFDefinitionsBuilder {
    private readonly project;
    private readonly contentTypeRenderers;
    constructor(contentTypeRenderers?: ContentTypeRenderer[]);
    appendType: (model: CFContentType, editorInterface?: CFEditorInterface) => CFDefinitionsBuilder;
    appendTypes: (models: CFContentType[], editorInterface?: CFEditorInterface) => CFDefinitionsBuilder;
    write: (dir: string, writeCallback: WriteCallback) => Promise<void>;
    toString: () => string;
    private addFile;
    private getIndexFile;
    private addIndexFile;
    private removeIndexFile;
}
