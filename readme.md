# advpng-bin ![GitHub Actions Status](https://github.com/imagemin/advpng-bin/workflows/test/badge.svg?branch=main)

> The main purpose of this utility is to recompress png files to get the smallest possible size

You probably want [`imagemin-advpng`](https://github.com/imagemin/imagemin-advpng) instead.

## Install

```
$ npm install --save advpng-bin
```

## Usage

```js
import {execFile} from 'node:child_process';
import advpng from 'advpng-bin';

execFile(advpng, ['--recompress', '--shrink-extra', 'image.png'], error => {
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
