'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');
var pkg = require('../package.json');

/**
 * Variables
 */

var BIN_VERSION = '1.19';
var BASE_URL = 'https://raw.github.com/imagemin/advpng-bin/v' + pkg.version + '/vendor/';

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper({ progress: false })
	.src(BASE_URL + 'osx/advpng', 'darwin')
	.src(BASE_URL + 'linux/advpng', 'linux')
	.src(BASE_URL + 'win32/advpng.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'advpng.exe' : 'advpng');

/**
 * Module exports
 */

module.exports = bin;
module.exports.v = BIN_VERSION;
