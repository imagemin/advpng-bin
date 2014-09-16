# advpng-bin [![Build Status](http://img.shields.io/travis/imagemin/advpng-bin.svg?style=flat)](https://travis-ci.org/imagemin/advpng-bin)

> The main purpose of this utility is to recompress png files to get the smallest 
possible size


## Install

```sh
$ npm install --save advpng-bin
```


## Usage

```js
var advpng = require('advpng-bin').path;
var execFile = require('child_process').execFile;

execFile(advpng, ['--recompress', '--shrink-extra', 'image.png'], function (err) {
	if (err) {
		throw err;
	}

	console.log('Image minified!');
});
```


## CLI

```sh
$ npm install --global advpng-bin
```

```sh
$ advpng --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
