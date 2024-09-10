import { Project, SourceFile } from 'ts-morph';
import { CFContentType } from '../../types';
import { ContentTypeRenderer } from './content-type-renderer';
import { RenderContext } from './create-default-context';
export declare class BaseContentTypeRenderer implements ContentTypeRenderer {
    setup(project: Project): void;
    render(contentType: CFContentType, file: SourceFile): void;
    createContext(): RenderContext;
    additionalFiles(): SourceFile[];
}
