'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

describe('advpng()', function () {
  this.timeout(0);

  after(function () {
    fs.unlinkSync('test/fixtures/minified.png');
  });

  it('should return path to advpng binary', function (callback) {
    var binPath = require('../lib/advpng').path;

    execFile(binPath, ['-h'], function (err, stdout, stderr) {
      assert(stdout.toString().indexOf('advpng') !== -1);
      callback();
    });
  });

  it('should successfully proxy advpng', function (callback) {
    var binPath = path.join(__dirname, '../bin/advpng.js');

    execFile('node', [binPath, '-h'], function (err, stdout, stderr) {
      assert(stdout.toString().indexOf('advpng') !== -1);
      callback();
    });
  });

  it('should minify a .png', function (callback) {
    var binPath = path.join(__dirname, '../bin/advpng.js');
    var src = path.join(__dirname, 'fixtures', 'test.png');
    var dest = path.join(__dirname, 'fixtures', 'minified.png');
    var args = ['--recompress', '--shrink-extra', dest];

    exec('cp ' + src + ' ' + dest, function () {
      exec('node ' + [binPath].concat(args).join(' '), function () {
        var actual = fs.statSync('test/fixtures/minified.png').size;
        var original = fs.statSync('test/fixtures/test.png').size;
        assert(actual < original);
        callback();
      });
    });
  });
});