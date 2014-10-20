'use strict';

var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var compareSize = require('compare-size');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('rebuild the advpng binaries', function (t) {
	t.plan(2);

	var version = require('../').version;
	var builder = new BinBuild()
		.src('http://prdownloads.sourceforge.net/advancemame/advancecomp-' + version + '.tar.gz')
		.cmd('autoreconf -fiv && ./configure --prefix="' + tmp + '" --bindir="' + tmp + '"')
		.cmd('make install');

	builder.build(function (err) {
		t.assert(!err, err);

		fs.exists(path.join(tmp, 'advpng'), function (exists) {
			t.assert(exists);
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['--version'], function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify a PNG', function (t) {
	t.plan(5);

	var src = path.join(__dirname, 'fixtures/test.png');
	var dest = path.join(tmp, 'test.png');
	var args = [
		'--recompress',
		'--shrink-extra',
		dest
	];

	fs.readFile(src, function (err, data) {
		t.assert(!err, err);

		fs.writeFile(dest, data, function (err) {
			t.assert(!err, err);

			execFile(require('../').path, args, function (err) {
				t.assert(!err, err);

				compareSize(src, dest, function (err, res) {
					t.assert(!err, err);
					t.assert(res[dest] < res[src]);
				});
			});
		});
	});
});
