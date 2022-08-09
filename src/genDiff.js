import _ from 'lodash';
import path from 'node:path';
import getFileObject from './parsers.js';
import makeFormatted from '../formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathResolved1 = path.resolve(process.cwd(), filepath1);
  const pathResolved2 = path.resolve(process.cwd(), filepath2);

  const fileObj1 = getFileObject(pathResolved1);
  const fileObj2 = getFileObject(pathResolved2);

  const iter = (object1, object2) => {
    const keys1 = Object.keys(object1).sort();
    const keys2 = Object.keys(object2).sort();
    const keysAll = _.uniq([...keys1, ...keys2]).sort();

    const diffedKeys = keysAll.map((key) => {
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        return { key, value: iter(object1[key], object2[key]), type: 'nested' };
      }
      if (object1[key] === object2[key]) {
        return { key, value: object1[key], type: 'unchanged' };
      }
      if (object2[key] === undefined) {
        return { key, value: object1[key], type: 'deleted' };
      }
      if (object1[key] === undefined) {
        return { key, value: object2[key], type: 'added' };
      }
      return {
        key, value1: object1[key], value2: object2[key], type: 'changed',
      };
    });

    return diffedKeys;
  };

  const result = iter(fileObj1, fileObj2);
  const finalResult = makeFormatted(result, formatName.format);

  console.log(finalResult);

  return finalResult;
};

export default genDiff;
