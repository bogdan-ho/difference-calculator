import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';
import getFileExtension from './parsers.js';
import makeFormatted from './formatters/index.js';
import buildTree from './buildTree.js';

const getPathResolved = (filepath) => path.resolve(process.cwd(), filepath);

const getJsonFile = (filepath) => JSON.parse(fs.readFileSync(filepath));
const getYamlFile = (filepath) => yaml.load(fs.readFileSync(filepath));

const getFileObject = (filepathResolved) => {
  const ext = getFileExtension(filepathResolved);

  switch (ext) {
    case ('json'):
      return getJsonFile(filepathResolved);
    case ('yml'): case ('yaml'): // case ('yml' || 'yaml'):
      return getYamlFile(filepathResolved);
    default:
      throw new Error(`Передан неправильное расширение файла ext: ${ext}`);
  }
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathResolved1 = getPathResolved(filepath1);
  const pathResolved2 = getPathResolved(filepath2);

  const fileObj1 = getFileObject(pathResolved1);
  const fileObj2 = getFileObject(pathResolved2);

  const tree = buildTree(fileObj1, fileObj2);
  const finalResult = makeFormatted(tree, formatName);

  return finalResult;
};

export default genDiff;
