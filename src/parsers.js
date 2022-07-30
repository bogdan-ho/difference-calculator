/* eslint-disable consistent-return */
import fs from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const getFileObject = (filepathResolved) => {
  const { ext } = path.parse(filepathResolved);

  if (ext === '.json') {
    return JSON.parse(fs.readFileSync(filepathResolved));
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(fs.readFileSync(filepathResolved));
  }
};

export default getFileObject;
