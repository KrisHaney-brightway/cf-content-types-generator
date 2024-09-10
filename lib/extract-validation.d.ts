import { FieldItem } from 'contentful';
type WithValidations = Pick<FieldItem, 'validations'>;
export declare const linkContentTypeValidations: (node: WithValidations) => string[];
export declare const inValidations: (node: WithValidations) => string[];
export {};
