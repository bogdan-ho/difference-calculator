import path from 'node:path';

const getFileExtension = (filepathResolved) => {
  const { ext } = path.parse(filepathResolved);
  return ext.slice(1);
};

export default getFileExtension;
