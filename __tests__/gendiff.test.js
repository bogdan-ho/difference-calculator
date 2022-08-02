import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { test, expect, describe } from '@jest/globals';
import fs from 'node:fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('plain objects', () => {
  const result = fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__/plain/result'), 'utf-8');

  test('genDiff JSON', () => {
    const filepath1 = path.resolve(__dirname, '..', '__fixtures__/plain/file1.json');
    const filepath2 = path.resolve(__dirname, '..', '__fixtures__/plain/file2.json');

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });

  test('genDiff YAML', () => {
    const filepath1 = path.resolve(__dirname, '..', '__fixtures__/plain/file1.yml');
    const filepath2 = path.resolve(__dirname, '..', '__fixtures__/plain/file2.yml');

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });
});

describe('nested objects', () => {
  const result = fs.readFileSync(path.resolve(__dirname, '..', '__fixtures__/nested/result'), 'utf-8');

  test('genDiff JSON', () => {
    const filepath1 = path.resolve(__dirname, '..', '__fixtures__/nested/file1.json');
    const filepath2 = path.resolve(__dirname, '..', '__fixtures__/nested/file2.json');

    expect(genDiff(filepath1, filepath2)).toBe(result);
  });

  // test('genDiff YAML', () => {
  //   const filepath1 = path.resolve(__dirname, '..', '__fixtures__/nested/file1.yml');
  //   const filepath2 = path.resolve(__dirname, '..', '__fixtures__/nested/file2.yml');

  //   expect(genDiff(filepath1, filepath2)).toBe(result);
  // });
});
