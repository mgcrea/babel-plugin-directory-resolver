# Babel Directory Resolver Plugin

![status](https://img.shields.io/badge/status-maintained-brightgreen.svg)
[![npm version](https://img.shields.io/npm/v/babel-plugin-directory-resolver.svg)](https://www.npmjs.com/package/babel-plugin-directory-resolver)
[![npm downloads](https://img.shields.io/npm/dm/babel-plugin-directory-resolver.svg)](https://www.npmjs.com/package/babel-plugin-directory-resolver)
[![license](https://img.shields.io/github/license/mgcrea/babel-plugin-directory-resolver.svg?style=flat)](https://tldrlegal.com/license/mit-license)<br />
[![build status](http://img.shields.io/travis/mgcrea/babel-plugin-directory-resolver/master.svg?style=flat)](http://travis-ci.org/mgcrea/babel-plugin-directory-resolver)
[![dependencies status](https://img.shields.io/david/mgcrea/babel-plugin-directory-resolver.svg?style=flat)](https://david-dm.org/mgcrea/babel-plugin-directory-resolver)
[![devDependencies status](https://img.shields.io/david/dev/mgcrea/babel-plugin-directory-resolver.svg?style=flat)](https://david-dm.org/mgcrea/babel-plugin-directory-resolver#info=devDependencies)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a9aef0592ea44fae88864321d5f14473)](https://www.codacy.com/app/mgcrea/babel-plugin-directory-resolver?utm_source=github.com&utm_medium=referral&utm_content=mgcrea/babel-plugin-directory-resolver&utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/a9aef0592ea44fae88864321d5f14473)](https://www.codacy.com/app/mgcrea/babel-plugin-directory-resolver?utm_source=github.com&utm_medium=referral&utm_content=mgcrea/babel-plugin-directory-resolver&utm_campaign=Badge_Coverage)

This plugin adds an extra resolution for directories, as it will look for `${dirname}.js` and thus allows you to drop `index.js` files inside your directories.

Useful for frontend components when you have a directory per component, with either styles, or tests along the component file.

## Usage

When you require a folder:

```js
import BarComponent from './BarComponent';
```

You must use an `index.js` file as an export proxy:

```
├── BarComponent
│   ├── BarComponent.js
│   ├── BarComponent.spec.js
│   └── index.js
```

With this plugin, you can clean up the structure and have working directory imports by dirname:

```
├── BarComponent
│   ├── BarComponent.js
│   └── BarComponent.spec.js
```

### Quickstart

```
yarn add --dev directory-resolver
```

1. Add the plugin to your `.babel.config.js` (or `.babelrc`)

```js
module.exports = {
  presets: [['@babel/preset-env']],
  plugins: ['directory-resolver']
};
```

### Available scripts

| **Script**  | **Description**               |
| ----------- | ----------------------------- |
| start       | Alias of test:watch           |
| test        | Run jest unit tests           |
| test:watch  | Run and watch jest unit tests |
| lint        | Run eslint static tests       |
| build       | Compile the library           |
| build:watch | Compile and watch the library |

## Authors

**Olivier Louvignes**

- http://olouv.com
- http://github.com/mgcrea

## License

```
The MIT License

Copyright (c) 2019 Olivier Louvignes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
