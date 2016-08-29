# fly-pug-lint

[![fly badge][fly-bgp]][fly-bg] [![npm badge][npm-bgp]][npm-bg] ![download badge][dl-bgp] [![travisbadge][travis-bgp]][travis-bg] [![license badge][license-bgp]][license-bg]

[fly-bgp]: https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square&maxAge=2592000
[fly-bg]: https://github.com/flyjs/fly

[npm-bgp]: https://img.shields.io/npm/v/fly-pug-lint.svg?style=flat-square
[npm-bg]: https://www.npmjs.org/package/fly-pug-lint

[dl-bgp]: https://img.shields.io/npm/dm/fly-pug-lint.svg?style=flat-square

[travis-bgp]: https://img.shields.io/travis/frantic1048/fly-pug-lint.svg?style=flat-square
[travis-bg]: https://travis-ci.org/frantic1048/fly-pug-lint

[license-bgp]: https://img.shields.io/github/license/frantic1048/fly-pug-lint.svg?style=flat-square
[license-bg]: https://spdx.org/licenses/WTFPL.html

[Pug-lint][] plugin for *[Fly][]* .

[Fly]: https://github.com/flyjs/fly
[Pug-lint]: https://github.com/pugjs/pug-lint

## Install

This plugin requires [Fly][] .

```bash
npm i -D fly-pug-lint
```

## Usage

By default, `fly-pug-lint` uses `.pug-lintrc.js` in your project directory as `pug-lint` config.

Async/Await flavored:

```js
export async function lintPug () {
  await this
    .source('src/*.pug')
    .puglint()
    /* or pass your custom options to pug-lint
     * .puglint({
     *   extends: '.pug-lintrc.js',
     *   disallowIdAttributeWithStaticValue: true,
     *   disallowSpacesInsideAttributeBrackets: null
     * })
     */
}
```

Generator function flavored:

```js
exports.lintPug = function* () {
  yield this
    .source('src/*.pug')
    .puglint()
    /* or pass your custom options to pug-lint
     * .puglint({
     *   extends: '.pug-lintrc.js',
     *   disallowIdAttributeWithStaticValue: true,
     *   disallowSpacesInsideAttributeBrackets: null
     * })
     */
}
```

Check out Pug-lint [documentation][] for available options.

[documentation]: https://github.com/pugjs/pug-lint#options-1

## License

[Do What The F*ck You Want To Public License](https://spdx.org/licenses/WTFPL)
