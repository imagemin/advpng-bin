'use strict';

var binCheck = require('bin-check');
var BinBuild = require('bin-build');
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
		t.assert(!err);

		fs.exists(path.join(tmp, 'advpng'), function (exists) {
			t.assert(exists);
		});
	});
});

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['--version'], function (err, works) {
		t.assert(!err);
		t.assert(works);
	});
});

test('minify a PNG', function (t) {
	t.plan(7);

	var args = [
		'--recompress',
		'--shrink-extra',
		path.join(tmp, 'test.png')
	];

	fs.readFile(path.join(__dirname, 'fixtures/test.png'), function (err, a) {
		t.assert(!err);

		fs.writeFile(path.join(tmp, 'test.png'), a, function (err) {
			t.assert(!err);

			execFile(require('../').path, args, function (err) {
				t.assert(!err);

				fs.stat(path.join(tmp, 'test.png'), function (err, b) {
					t.assert(!err);
					t.assert(b.size < a.length);
				});
			});
		});
	});
});
