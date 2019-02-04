import {lstatSync} from 'fs';

export const isRelative = path => /^\.{1,2}\/.+/.test(path);

export const isDirectory = filepath => {
  try {
    return lstatSync(filepath).isDirectory();
  } catch (err) {
    return false;
  }
};

export const isFile = filepath => {
  try {
    return lstatSync(filepath).isFile();
  } catch (err) {
    return false;
  }
};

/**
 * Recursively traverses binary  expressions to find the first `StringLiteral` if any.
 * @param  {Object} t           Babel types
 * @param  {Node} arg           a Babel node
 * @return {StringLiteral?}
 */
export const traverseExpression = (t, arg) => {
  if (t.isStringLiteral(arg)) {
    return arg;
  }
  if (t.isBinaryExpression(arg)) {
    return traverseExpression(t, arg.left);
  }
  return null;
};
