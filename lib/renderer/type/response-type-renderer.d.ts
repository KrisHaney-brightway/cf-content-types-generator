import { SourceFile } from 'ts-morph';
import { CFContentType } from '../../types';
import { BaseContentTypeRenderer } from './base-content-type-renderer';
export declare class ResponseTypeRenderer extends BaseContentTypeRenderer {
    render: (contentType: CFContentType, file: SourceFile) => void;
}
