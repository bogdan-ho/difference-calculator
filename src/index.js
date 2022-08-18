import path from 'node:path';
import fs from 'node:fs';
import format from './formatters/index.js';
import buildTree from './buildTree.js';
import parsers from './parsers.js';

const getPathResolved = (filepath) => path.resolve(process.cwd(), filepath);

const getFileExtension = (filepathResolved) => {
  const { ext } = path.parse(filepathResolved);
  return ext.slice(1);
};

const getData = (filepathResolved) => {
  const dataFormat = getFileExtension(filepathResolved);

  return parsers(fs.readFileSync(filepathResolved), dataFormat);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathResolved1 = getPathResolved(filepath1);
  const pathResolved2 = getPathResolved(filepath2);

  const data1 = getData(pathResolved1);
  const data2 = getData(pathResolved2);

  const tree = buildTree(data1, data2);

  return format(tree, formatName);
};

export default genDiff;
