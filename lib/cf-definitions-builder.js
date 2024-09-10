"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_morph_1 = require("ts-morph");
const module_name_1 = require("./module-name");
const renderer_1 = require("./renderer");
const lodash_1 = require("lodash");
class CFDefinitionsBuilder {
    project;
    contentTypeRenderers;
    constructor(contentTypeRenderers = []) {
        if (contentTypeRenderers.length === 0) {
            contentTypeRenderers.push(new renderer_1.DefaultContentTypeRenderer());
        }
        this.contentTypeRenderers = contentTypeRenderers;
        this.project = new ts_morph_1.Project({
            useInMemoryFileSystem: true,
            compilerOptions: {
                target: ts_morph_1.ScriptTarget.ES5,
                declaration: true,
            },
        });
        for (const renderer of this.contentTypeRenderers) {
            renderer.setup(this.project);
        }
    }
    appendType = (model, editorInterface) => {
        if (model.sys.type !== 'ContentType') {
            throw new Error('given data is not describing a ContentType');
        }
        const file = this.addFile((0, module_name_1.moduleName)(model.sys.id));
        for (const renderer of this.contentTypeRenderers) {
            renderer.render(model, file, editorInterface);
        }
        file.organizeImports({
            ensureNewLineAtEndOfFile: true,
        });
        return this;
    };
    appendTypes = (models, editorInterface) => {
        for (const model of models) {
            this.appendType(model, editorInterface);
        }
        return this;
    };
    write = async (dir, writeCallback) => {
        this.addIndexFile();
        if (dir.endsWith('/')) {
            dir = dir.slice(0, -1);
        }
        const writePromises = this.project.getSourceFiles().map((file) => {
            const targetPath = `${dir}${file.getFilePath()}`;
            file.formatText();
            return writeCallback(targetPath, file.getFullText());
        });
        await Promise.all(writePromises);
        this.removeIndexFile();
    };
    toString = () => {
        const mergeFileName = 'ContentTypes';
        const mergeFile = this.addFile(mergeFileName);
        const imports = [];
        const types = [];
        for (const sourceFile of this.project.getSourceFiles().filter((sourceFile) => {
            return sourceFile.getBaseNameWithoutExtension() !== mergeFileName;
        }))
            (0, ts_morph_1.forEachStructureChild)(sourceFile.getStructure(), (childStructure) => {
                switch (childStructure.kind) {
                    case ts_morph_1.StructureKind.ImportDeclaration:
                        imports.push(childStructure);
                        break;
                    case ts_morph_1.StructureKind.Interface:
                        types.push(childStructure.name);
                        mergeFile.addInterface(childStructure);
                        break;
                    case ts_morph_1.StructureKind.TypeAlias:
                        types.push(childStructure.name);
                        mergeFile.addTypeAlias(childStructure);
                        break;
                    case ts_morph_1.StructureKind.Function:
                        mergeFile.addFunction(childStructure);
                        break;
                    default:
                        throw new Error(`Unhandled node type '${ts_morph_1.StructureKind[childStructure.kind]}'.`);
                }
            });
        const additionalFiles = (0, lodash_1.flatten)(this.contentTypeRenderers.map((renderer) => {
            return renderer.additionalFiles();
        }));
        const additionalFileNames = new Set(additionalFiles.map((file) => file.getBaseNameWithoutExtension()));
        // only import modules not present in merge file and not present in additional files
        for (const importD of imports) {
            const name = importD.moduleSpecifier.startsWith('./')
                ? importD.moduleSpecifier.slice(2)
                : importD.moduleSpecifier;
            // This check relies on the fact that module and file name match
            if (!types.includes(name) && !additionalFileNames.has(name)) {
                mergeFile.addImportDeclaration(importD);
            }
        }
        mergeFile.organizeImports({
            ensureNewLineAtEndOfFile: true,
        });
        mergeFile.formatText();
        const fullText = mergeFile.getFullText();
        this.project.removeSourceFile(mergeFile);
        return fullText;
    };
    addFile = (name) => {
        return this.project.createSourceFile(`${name}.ts`, undefined, {
            overwrite: true,
        });
    };
    getIndexFile = () => {
        return this.project.getSourceFile((file) => {
            return file.getBaseNameWithoutExtension() === 'index';
        });
    };
    addIndexFile = () => {
        this.removeIndexFile();
        const indexFile = this.addFile('index');
        // this assumes all things are named exports
        // maybe use https://github.com/dsherret/ts-morph/issues/165#issuecomment-350522329
        for (const sourceFile of this.project.getSourceFiles()) {
            const exportDeclarations = sourceFile.getExportSymbols();
            if (sourceFile.getBaseNameWithoutExtension() !== 'index') {
                // we have to add every single exported member to differentiate type only exports
                // organize imports in the end optimize again and groups imports from same module
                for (const exportDeclaration of exportDeclarations) {
                    indexFile.addExportDeclaration({
                        isTypeOnly: !sourceFile.getFunctions().some((f) => {
                            return f.getName() === exportDeclaration.getExportSymbol().getName();
                        }),
                        namedExports: [exportDeclaration.getExportSymbol().getEscapedName()],
                        moduleSpecifier: `./${sourceFile.getBaseNameWithoutExtension()}`,
                    });
                }
            }
        }
        indexFile.organizeImports();
    };
    removeIndexFile = () => {
        const indexFile = this.getIndexFile();
        if (indexFile) {
            this.project.removeSourceFile(indexFile);
        }
    };
}
exports.default = CFDefinitionsBuilder;
