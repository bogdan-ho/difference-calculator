import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const makeFormatted = (diffedKeys, formatter = 'stylish') => {
  switch (formatter) {
    case 'stylish':
      return makeStylish(diffedKeys);
    case 'plain':
      return makePlain(diffedKeys);
    case 'json':
      return makeJson(diffedKeys);
    default:
      throw new Error(`Передан неправильный форматер: ${formatter}`);
  }
};

export default makeFormatted;
