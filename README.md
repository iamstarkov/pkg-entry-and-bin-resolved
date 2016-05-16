# pkg-entry-and-bin-resolved

[![NPM version][npm-image]][npm-url]
[![Unix Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> `main` entry and `bin` paths resolved from package.json

## Install

    npm install --save pkg-entry-and-bin-resolved

## Usage

```js
import pkgEntryAndBinResolved from 'pkg-entry-and-bin-resolved';

pkgEntryAndBinResolvedAsync('./fixtures/basic.json')
  .then(result => console.log(result)); /* [
    '/Users/iamstarkov/projects/pkg-entry-and-bin-resolved/fixtures/src/index.js',
    '/Users/iamstarkov/projects/pkg-entry-and-bin-resolved/fixtures/one.js',
    '/Users/iamstarkov/projects/pkg-entry-and-bin-resolved/fixtures/two.js' ] */
```

## API

### pkgEntryAndBinResolved(pkg)

Return a promise that resolves flat array of `main` entry and `binaries` resolved.

#### pkg

*Required*  
Type: `String`

Path to `package.json`.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/pkg-entry-and-bin-resolved
[npm-image]: https://img.shields.io/npm/v/pkg-entry-and-bin-resolved.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/pkg-entry-and-bin-resolved
[travis-image]: https://img.shields.io/travis/iamstarkov/pkg-entry-and-bin-resolved.svg?style=flat-square&label=unix

[appveyor-url]: https://ci.appveyor.com/project/iamstarkov/pkg-entry-and-bin-resolved
[appveyor-image]: https://img.shields.io/appveyor/ci/iamstarkov/pkg-entry-and-bin-resolved.svg?style=flat-square&label=windows

[coveralls-url]: https://coveralls.io/r/iamstarkov/pkg-entry-and-bin-resolved
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/pkg-entry-and-bin-resolved.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/pkg-entry-and-bin-resolved
[depstat-image]: https://david-dm.org/iamstarkov/pkg-entry-and-bin-resolved.svg?style=flat-square
