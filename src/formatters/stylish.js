import _ from 'lodash';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth - 2);
const getBracketIndent = (depth, spacesCount = 4) => ' '.repeat(spacesCount * depth);

const stringify = (value, treeDepth) => {
  if (!_.isObject(value)) return `${value}`;
  if (value === null) return null;

  const keys = Object.keys(value);
  const lines = keys
    .map((key) => `${getIndent(treeDepth + 1)}  ${key}: ${stringify(value[key], treeDepth + 1)}`)
    .join('\n');

  return `{
${lines}
${getIndent(treeDepth)}  }`;
};

const makeStylish = (diffedKeys) => {
  const iter = (currentDiffedKeys, depth) => {
    const stringifiedDiffedKeys = currentDiffedKeys
      .flatMap((obj) => {
        const getValue = (value, sign) => `${getIndent(depth)}${sign} ${obj.key}: ${stringify(value, depth)}`;

        switch (obj.type) {
          case 'nested':
            return `${getIndent(depth)}  ${obj.key}: ${iter(obj.children, depth + 1)}`;
          case 'unchanged':
            return getValue(obj.value, ' ');
          case 'deleted':
            return getValue(obj.value, '-');
          case 'added':
            return getValue(obj.value, '+');
          case 'changed':
            return [getValue(obj.value1, '-'), getValue(obj.value2, '+')];
          default:
            throw new Error(`Передан неправильный оператор: ${obj.type}`);
        }
      });

    return `{
${stringifiedDiffedKeys.join('\n')}
${getBracketIndent(depth - 1)}}`;
  };

  return iter(diffedKeys, 1);
};

export default makeStylish;
