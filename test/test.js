/*global afterEach,beforeEach,it*/
'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var tmp = path.join(__dirname, 'tmp');

beforeEach(function () {
	mkdirp.sync(tmp);
});

afterEach(function () {
	rimraf.sync(tmp);
});

it('rebuild the advpng binaries', function (cb) {
	var builder = new BinBuild()
		.src('http://prdownloads.sourceforge.net/advancemame/advancecomp-1.19.tar.gz')
		.cmd('autoreconf -fiv')
		.cmd('./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install');

	builder.run(function (err) {
		assert(!err);
		assert(fs.statSync(path.join(tmp, 'advpng')).isFile());
		cb();
	});
});

it('return path to binary and verify that it is working', function (cb) {
	binCheck(require('../').path, ['--version'], function (err, works) {
		assert(!err);
		assert(works);
		cb();
	});
});

it('minify a PNG', function (cb) {
	var src = path.join(__dirname, 'fixtures/test.png');
	var contents = fs.readFileSync(src);
	var dest = path.join(tmp, 'test.png');
	var args = [
		'--recompress',
		'--shrink-extra',
		dest
	];

	fs.writeFileSync(dest, contents);
	execFile(require('../').path, args, function (err) {
		assert(!err);

		compareSize(src, dest, function (err, res) {
			assert(!err);
			assert(res[dest] < res[src]);
			cb();
		});
	});
});
