'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');
const pkg = require('../package.json');

const url = `https://raw.github.com/imagemin/advpng-bin/v${pkg.version}/vendor/`;

module.exports = new BinWrapper()
	.src(`${url}osx/advpng`, 'darwin')
	.src(`${url}linux/advpng`, 'linux')
	.src(`${url}win32/advpng.exe`, 'win32')
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'advpng.exe' : 'advpng');
