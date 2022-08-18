import makeStylish from './stylish.js';
import makePlain from './plain.js';

const format = (diffedKeys, formatter) => {
  switch (formatter) {
    case 'stylish':
      return makeStylish(diffedKeys);
    case 'plain':
      return makePlain(diffedKeys);
    case 'json':
      return JSON.stringify(diffedKeys);
    default:
      throw new Error(`Передан неправильный форматер: ${formatter}`);
  }
};

export default format;
