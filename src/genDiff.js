import _ from 'lodash';
import path from 'node:path';
import getFileObject from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const pathResolved1 = path.resolve(process.cwd(), filepath1);
  const pathResolved2 = path.resolve(process.cwd(), filepath2);

  const fileObj1 = getFileObject(pathResolved1);
  const fileObj2 = getFileObject(pathResolved2);

  const keys1 = Object.keys(fileObj1).sort();
  const keys2 = Object.keys(fileObj2).sort();
  const keys = _.uniq([...keys1, ...keys2]).sort();

  const diffedKeys = keys.map((key) => {
    if (fileObj1[key] === fileObj2[key]) {
      return { key, value: fileObj1[key], type: 'unchanged' };
    }
    if (fileObj2[key] === undefined) {
      return { key, value: fileObj1[key], type: 'deleted' };
    }
    if (fileObj1[key] === undefined) {
      return { key, value: fileObj2[key], type: 'added' };
    }
    return {
      key, value1: fileObj1[key], value2: fileObj2[key], type: 'changed',
    };
  });

  const diffedKeysStringify = diffedKeys
    .map((obj) => {
      switch (obj.type) {
        case 'unchanged':
          return `    ${obj.key}: ${obj.value}`;
        case 'deleted':
          return `  - ${obj.key}: ${obj.value}`;
        case 'added':
          return `  + ${obj.key}: ${obj.value}`;
        case 'changed':
          return [`  - ${obj.key}: ${obj.value1}`, `  + ${obj.key}: ${obj.value2}`];
        default:
          return console.error(`Передан неправильный оператор: ${obj.type}`);
      }
    })
    .flat();

  const result = ['{', ...diffedKeysStringify, '}'].join('\n');

  console.log(result);

  return result;
};

export default genDiff;
