/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('advpng()', function () {
  afterEach(function (cb) {
    rm(path.join(__dirname, 'tmp'), cb);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should rebuild the advpng binaries', function (cb) {
    var tmp = path.join(__dirname, 'tmp');
    var builder = new BinBuild()
      .src('http://prdownloads.sourceforge.net/advancemame/advancecomp-1.19.tar.gz')
      .cfg('./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
      .make('make install');

    builder.build(function (err) {
      assert(!err);
      assert(fs.existsSync(path.join(tmp, 'advpng')));
      cb();
    });
  });

  it('should return path to binary and verify that it is working', function (cb) {
    var binPath = require('../').path;

    binCheck(binPath, ['--version'], function (err, works) {
      cb(assert.equal(works, true));
    });
  });

  it('should minify a PNG', function (cb) {
    var src = path.join(__dirname, 'fixtures/test.png');
    var dest = path.join(__dirname, 'tmp/test.png');
    var binPath = require('../').path;
    var args = [
      '--recompress',
      '--shrink-extra',
      path.join(__dirname, 'tmp/test.png')
    ];

    fs.writeFileSync(dest, fs.readFileSync(src));

    execFile(binPath, args, function () {
      var src = fs.statSync(path.join(__dirname, 'fixtures/test.png')).size;
      var dest = fs.statSync(path.join(__dirname, 'tmp/test.png')).size;

      cb(assert(dest < src));
    });
  });
});
