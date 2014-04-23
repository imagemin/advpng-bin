'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'advpng',
  bin: 'advpng',
  path: path.join(__dirname, '../vendor'),
  url: 'https://raw.github.com/1000ch/node-advpng-bin/master/vendor/linux/advpng',
  src: 'http://prdownloads.sourceforge.net/advancemame/advancecomp-1.18.tar.gz',
  buildScript: './configure && make && mv ./advpng ' + path.join(__dirname, '../vendo/advpng'),
  platform: {
    osx: {
      url: 'https://raw.github.com/1000ch/node-advpng-bin/master/vendor/osx/advpng'
    },
    linux: {
      url: 'https://raw.github.com/1000ch/node-advpng-bin/master/vendor/linux/advpng'
    }
  }
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;