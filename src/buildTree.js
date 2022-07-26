import _ from 'lodash';

const getAllKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysAll = _.uniq([...keys1, ...keys2]);

  return _.sortBy(keysAll);
};

const buildTree = (data1, data2) => {
  const keysAllSorted = getAllKeys(data1, data2);

  const diffedKeys = keysAllSorted.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: buildTree(data1[key], data2[key]), type: 'nested' };
    }
    if (data1[key] === data2[key]) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    return {
      key, value1: data1[key], value2: data2[key], type: 'changed',
    };
  });

  return diffedKeys;
};

export default buildTree;
