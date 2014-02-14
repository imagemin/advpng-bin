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
      assert(stderr.toString().indexOf('advpng') !== -1);
      callback();
    });
  });

  it('should successfully proxy advpng', function (callback) {
    var binPath = path.join(__dirname, '../bin/advpng.js');

    execFile('node', [binPath, '-h'], function (err, stdout, stderr) {
      assert(stderr.toString().indexOf('advpng') !== -1);
      callback();
    });
  });

  it('should minify a .png', function (callback) {
    var binPath = path.join(__dirname, '../bin/advpng.js');
    var args = [
      '--recompress',
      '--shrink-extra',
      path.join(__dirname, 'fixtures', 'test.pcd ..ng'),
      path.join(__dirname, 'fixtures', 'minified.png')
    ];

    exec('node ' + [binPath].concat(args).join(' '), function () {
      var actual = fs.statSync('test/fixtures/minified.png').size;
      var original = fs.statSync('test/fixtures/test.png').size;
      assert(actual < original);
      callback();
    });
  });
});