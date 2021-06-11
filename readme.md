# advpng-bin

> The main purpose of this utility is to recompress png files to get the smallest possible size

You probably want [`imagemin-advpng`](https://github.com/imagemin/imagemin-advpng) instead.

## Install

```
$ npm install --save advpng-bin
```

## Usage

```js
const {execFile} = require('child_process');
const advpng = require('advpng-bin');

execFile(advpng, ['--recompress', '--shrink-extra', 'image.png'], err => {
	console.log('Image minified!');
});
```

## CLI

```
$ npm install --global advpng-bin
```

```
$ advpng --help
```
