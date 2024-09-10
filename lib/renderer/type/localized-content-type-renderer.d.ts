import { Project, SourceFile } from 'ts-morph';
import { CFContentType } from '../../types';
import { BaseContentTypeRenderer } from './base-content-type-renderer';
export declare class LocalizedContentTypeRenderer extends BaseContentTypeRenderer {
    private readonly FILE_BASE_NAME;
    private readonly files;
    constructor();
    setup(project: Project): void;
    render(contentType: CFContentType, file: SourceFile): void;
    additionalFiles(): SourceFile[];
}
