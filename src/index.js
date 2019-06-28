import {dirname, basename, extname, isAbsolute, join, resolve} from 'path';
import {isDirectory, isFile, isRelative, traverseExpression} from './utils';
// require('debug-utils').install();

const resolveDirname = (path, opts, fileOpts) => {
  const {ignoreDirWithDots = true, moduleFileExtensions} = opts;
  const {filename} = fileOpts;
  // Only process absolute or relative paths without extensions (eg. exclude regular modules)
  const hasExtension = !!extname(path);
  const isAbsolutePath = isAbsolute(path);
  const isRelativePath = isRelative(path);
  if ((ignoreDirWithDots && hasExtension) || !(isAbsolutePath || isRelativePath)) {
    return path;
  }
  const fileDirname = dirname(filename);
  // Do we have a matching directory?
  const targetPath = isRelativePath ? resolve(fileDirname, path) : path;
  if (!isDirectory(targetPath)) {
    return path;
  }
  // Without any index file?
  const fileExtname = extname(filename);
  const fileExtensions = moduleFileExtensions || [fileExtname ? fileExtname.slice(1) : fileExtname];
  // Enable support for custom extensions
  for (const extension of fileExtensions) {
    if (isFile(join(targetPath, `index.${extension}`))) {
      return `${path}/index.${extension}`;
    }
  }

  // Without conflicting file that should have priority?
  const pathBasename = basename(path);
  const targetPathDirname = dirname(targetPath);
  if (isFile(join(targetPathDirname, `${pathBasename}${fileExtname}`))) {
    return path;
  }

  // Finally activate plugin as a last attempt
  return `${path}/${pathBasename}`;
};

export default ({types: t}) => {
  const visitor = {
    CallExpression(path, state) {
      if (!(path.node.callee.name === 'require' || t.isImport(path.node.callee))) {
        return;
      }

      const args = path.node.arguments;
      if (!args.length) {
        return;
      }

      const firstArg = traverseExpression(t, args[0]);

      if (firstArg) {
        firstArg.value = resolveDirname(firstArg.value, state.opts, state.file.opts);
      }
    },
    ImportDeclaration(path, state) {
      path.node.source.value = resolveDirname(path.node.source.value, state.opts, state.file.opts); // eslint-disable-line no-param-reassign
    },
    ExportNamedDeclaration(path, state) {
      if (path.node.source) {
        path.node.source.value = resolveDirname(path.node.source.value, state.opts, state.file.opts); // eslint-disable-line no-param-reassign
      }
    },
    ExportAllDeclaration(path, state) {
      if (path.node.source) {
        path.node.source.value = resolveDirname(path.node.source.value, state.opts, state.file.opts); // eslint-disable-line no-param-reassign
      }
    }
  };
  return {
    visitor: {
      Program(path, state) {
        path.traverse(visitor, state);
      }
    }
  };
};
