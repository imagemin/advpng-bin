'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const BinBuild = require('bin-build');
const compareSize = require('compare-size');
const advpng = require('..');

test.cb('rebuild the advpng binaries', t => {
	const tmp = tempy.directory();
	const builder = new BinBuild()
		.src('http://prdownloads.sourceforge.net/advancemame/advancecomp-1.19.tar.gz')
		.cmd('autoreconf -fiv')
		.cmd(`./configure --prefix="${tmp}" --bindir="${tmp}"`)
		.cmd('make install');

	builder.run(err => {
		t.ifError(err);
		t.true(fs.existsSync(path.join(tmp, 'advpng')));
		t.end();
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
