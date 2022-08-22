import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof (value) === 'string') {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (diffedKeys) => {
  const iter = (currentDiffedKeys, ancestry, depth) => {
    const stringifiedDiffedKeys = currentDiffedKeys.flatMap((obj) => {
      const name = obj.key;
      const currentAncestry = (depth === 1) ? `${name}` : `${ancestry}.${name}`;

      switch (obj.type) {
        case 'nested':
          return iter(obj.children, currentAncestry);
        case 'unchanged':
          return [];
        case 'deleted':
          return `Property '${currentAncestry}' was removed`;
        case 'added':
          return `Property '${currentAncestry}' was added with value: ${getValue(obj.value)}`;
        case 'changed':
          return `Property '${currentAncestry}' was updated. From ${getValue(obj.value1)} to ${getValue(obj.value2)}`;
        default:
          return console.error(`Передан неправильный оператор: ${obj.type}`);
      }
    });

    return stringifiedDiffedKeys.join('\n');
  };

  return iter(diffedKeys, '', 1);
};

export default makePlain;
