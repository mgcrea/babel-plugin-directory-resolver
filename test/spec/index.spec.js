import {transform} from '@babel/core';
import {resolve} from 'path';

import babelPlugin from '../../src';

// const ROOT_DIR = resolve(`${__dirname}/../..`);
const PKG_DIR = resolve(`${__dirname}/../fixtures`);
const FIXTURE_FILENAME = `${PKG_DIR}/src/index.js`;

const testRequireImport = (source, expected, transformOpts) => {
  it('with a require statement', () => {
    const code = `var something = require("${source}");`;
    const result = transform(code, transformOpts);
    expect(result.code).toContain(`require("${expected}")`);
  });
  it('with an import statement', () => {
    const code = `import something from "${source}";`;
    const result = transform(code, transformOpts);
    expect(result.code).toContain(`require("${expected}")`);
  });
};

describe('plugin', () => {
  describe('with default options', () => {
    const transformerOpts = {
      babelrc: false,
      plugins: [[babelPlugin, {}]],
      filename: FIXTURE_FILENAME
    };

    describe('should not break existing resolution', () => {
      testRequireImport('express', 'express', transformerOpts);
    });

    describe('should resolve via basename', () => {
      testRequireImport('./foo', './foo/foo', transformerOpts);
    });

    describe('should resolve the sub file path', () => {
      testRequireImport('./foo/bar', './foo/bar/bar', transformerOpts);
    });

    describe('should not resolve the file path with a dirname containing a dot', () => {
      testRequireImport('./foo/baz.qux', './foo/baz.qux', transformerOpts);
    });

    describe('should handle a filename matching dirname', () => {
      // @NOTE When a file and a directory on the same level share the same name,
      // the file has priority according to the Node require mechanism
      // We're not supporting this case here as a directory will prevail
      testRequireImport('./foo/qux', './foo/qux/qux', transformerOpts);
    });

    describe('should not resolve with basename if an index file exists', () => {
      testRequireImport('./foo/quux', './foo/quux', transformerOpts);
    });
  });
  describe('with ignoreDirWithDots options', () => {
    const transformerOpts = {
      babelrc: false,
      plugins: [[babelPlugin, {ignoreDirWithDots: false}]],
      filename: FIXTURE_FILENAME
    };

    describe('should resolve the file path with a dirname containing a dot', () => {
      testRequireImport('./foo/baz.qux', './foo/baz.qux/baz.qux', transformerOpts);
    });
  });
});
