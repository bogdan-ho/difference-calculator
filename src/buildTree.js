import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysAll = _.uniq([...keys1, ...keys2]);
  const keysAllSorted = _.sortBy(keysAll);

  const diffedKeys = keysAllSorted.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: buildTree(data1[key], data2[key]), type: 'nested' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    if (data2[key] === undefined) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (data1[key] === undefined) {
      return { key, value: data2[key], type: 'added' };
    }
    return {
      key, value1: data1[key], value2: data2[key], type: 'changed',
    };
  });

  return diffedKeys;
};

export default buildTree;
