import { Project, SourceFile } from 'ts-morph';
import { CFContentType } from '../../types';
import { BaseContentTypeRenderer } from './base-content-type-renderer';
export declare class TypeGuardRenderer extends BaseContentTypeRenderer {
    private readonly files;
    private static readonly WithContentTypeLink;
    constructor();
    setup(project: Project): void;
    render: (contentType: CFContentType, file: SourceFile) => void;
    additionalFiles(): SourceFile[];
}
