import _ from 'lodash';

const calcIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);
const calcBracketIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 4);

const stringify = (value, treeDepth) => {
  if (!_.isObject(value)) return `${value}`;
  if (value === null) return null;

  const keys = Object.keys(value);
  const lines = keys
    .map((key) => `${calcIndent(treeDepth + 1)}  ${key}: ${stringify(value[key], treeDepth + 1)}`)
    .join('\n');

  return `{
${lines}
${calcIndent(treeDepth)}  }`;
};

const makeStylish = (diffedKeys) => {
  const iter = (currentDiffedKeys, depth) => {
    const diffedKeysStringify = currentDiffedKeys
      .flatMap((obj) => {
        const getValue = (value, sign) => `${calcIndent(depth)}${sign} ${obj.key}: ${stringify(value, depth)}`;

        switch (obj.type) {
          case 'nested':
            return `${calcIndent(depth)}  ${obj.key}: ${iter(obj.value, depth + 1)}`;
          case 'unchanged':
            return getValue(obj.value, ' ');
          case 'deleted':
            return getValue(obj.value, '-');
          case 'added':
            return getValue(obj.value, '+');
          case 'changed':
            return [getValue(obj.value1, '-'), getValue(obj.value2, '+')];
          default:
            return console.error(`Передан неправильный оператор: ${obj.type}`);
        }
      });

    return ['{', ...diffedKeysStringify, `${calcBracketIndent(depth)}}`].join('\n');
  };

  return iter(diffedKeys, 1);
};

export default makeStylish;

const ChooseFormatter = (formatter = makeStylish) => {
  
}
