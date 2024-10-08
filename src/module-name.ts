import { upperFirst } from 'lodash';
import { pipe } from 'lodash/fp';

const removeSpace = (input: string): string => input.replace(/\s/g, '');
const replaceDash = (input: string): string => input.replace(/-/g, '__');
const addPrefix = (input: string): string => input;

export const moduleName = (name: string): string => {
  return pipe([replaceDash, upperFirst, addPrefix, removeSpace])(name);
};

export const moduleSkeletonName = (name: string): string => {
  return moduleName(name) + 'Skeleton';
};

export const moduleFieldsName = (name: string): string => {
  return moduleName(name) + 'Fields';
};
