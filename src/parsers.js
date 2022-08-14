import fs from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const getFileExtension = (filepathResolved) => {
  const { ext } = path.parse(filepathResolved);
  return ext.slice(1);
};

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

export default getFileObject;
