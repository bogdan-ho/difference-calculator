import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('genDiff JSON', () => {
  const filepath1 = path.resolve(__dirname, '..', '__fixtures__/file1.json');
  const filepath2 = path.resolve(__dirname, '..', '__fixtures__/file2.json');
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(result);
});

test('genDiff YAML', () => {
  const filepath1 = path.resolve(__dirname, '..', '__fixtures__/file1.yml');
  const filepath2 = path.resolve(__dirname, '..', '__fixtures__/file2.yml');
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(result);
});
