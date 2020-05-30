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
	const temporary = tempy.directory();
	await binBuild.url('https://github.com/amadvance/advancecomp/releases/download/v2.1/advancecomp-2.1.tar.gz', [
		'autoreconf -fiv',
		`./configure --prefix="${temporary}" --bindir="${temporary}"`,
		'make install'
	]).then(() => {
		t.true(fs.existsSync(path.join(temporary, 'advpng')));
	}).catch(() => {
		t.fail();
	});
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(advpng, ['--version']));
});

test('minify a PNG', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.png');
	const contents = fs.readFileSync(src);
	const dest = path.join(temporary, 'test.png');
	const args = [
		'--recompress',
		'--shrink-extra',
		dest
	];

	fs.writeFileSync(dest, contents);
	await execa(advpng, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
