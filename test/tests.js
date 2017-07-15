import assert from 'assert';
import fs from 'fs';
import path from 'path';

import { Parser } from 'commonmark';

import Renderer from '../lib';

describe('tests', () => {
  const fixtures = fs.readdirSync('./test/fixtures').sort();

  fixtures.forEach(fixture => {
    const actual = require(path.resolve('./test/fixtures', fixture, 'actual'));
    const expected = require(path.resolve('./test/fixtures', fixture, 'expected'));
    let options;
    try {
      options = require(path.resolve('./test/fixtures', fixture, 'options'));
    } catch (error) { }

    it(fixture, () => {
      const parser = new Parser();
      const renderer = new Renderer(options);
      const ast = parser.parse(actual);
      const result = renderer.render(ast);
      assert.deepStrictEqual(result, expected);
    });
  });
});
