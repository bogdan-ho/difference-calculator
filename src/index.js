import path from 'node:path';
import getFileObject from './parsers.js';
import makeFormatted from './formatters/index.js';
import buildTree from './buildTree.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const pathResolved1 = path.resolve(process.cwd(), filepath1);
  const pathResolved2 = path.resolve(process.cwd(), filepath2);

  const fileObj1 = getFileObject(pathResolved1);
  const fileObj2 = getFileObject(pathResolved2);

  const tree = buildTree(fileObj1, fileObj2);
  const finalResult = makeFormatted(tree, formatName);

  return finalResult;
};

export default genDiff;
