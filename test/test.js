'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
const advpng = require('..');

test('rebuild the advpng binaries', async t => {
	const tmp = tempy.directory();
	await binBuild.url('http://prdownloads.sourceforge.net/advancemame/advancecomp-1.19.tar.gz', [
		'autoreconf -fiv',
		`./configure --prefix="${tmp}" --bindir="${tmp}"`,
		'make install'
	]).then(() => {
		t.true(fs.existsSync(path.join(tmp, 'advpng')));
	}).catch(() => {
		t.fail();
	});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(advpng, ['--version']));
});

test('minify a PNG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const contents = fs.readFileSync(src);
	const dest = path.join(tmp, 'test.png');
	const args = [
		'--recompress',
		'--shrink-extra',
		dest
	];

	fs.writeFileSync(dest, contents);
	await execa(advpng, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
