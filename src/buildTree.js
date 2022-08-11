import _ from 'lodash';

const buildTree = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keysAll = _.uniq([...keys1, ...keys2]);
  const keysAllSorted = _.sortBy(keysAll);

  const diffedKeys = keysAllSorted.map((key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { key, value: buildTree(object1[key], object2[key]), type: 'nested' };
    }
    if (object1[key] === object2[key]) {
      return { key, value: object1[key], type: 'unchanged' };
    }
    if (object2[key] === undefined) {
      return { key, value: object1[key], type: 'deleted' };
    }
    if (object1[key] === undefined) {
      return { key, value: object2[key], type: 'added' };
    }
    return {
      key, value1: object1[key], value2: object2[key], type: 'changed',
    };
  });

  return diffedKeys;
};

export default buildTree;
