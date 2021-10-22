import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import execa from 'execa';
import tempy from 'tempy';
import binCheck from 'bin-check';
import binBuild from 'bin-build';
import compareSize from 'compare-size';
import advpng from '../index.js';

test('rebuild the advpng binaries', async t => {
	// Skip the test on Windows
	if (process.platform === 'win32') {
		t.pass();
		return;
	}

	const temporary = tempy.directory();
	const source = fileURLToPath(new URL('../vendor/source/advancecomp-2.1.tar.gz', import.meta.url));

	await binBuild.file(source, [
		'autoreconf -fiv',
		`./configure --prefix="${temporary}" --bindir="${temporary}"`,
		'make install',
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
	const src = fileURLToPath(new URL('fixtures/test.png', import.meta.url));
	const contents = fs.readFileSync(src);
	const dest = path.join(temporary, 'test.png');
	const args = [
		'--recompress',
		'--shrink-extra',
		dest,
	];

	fs.writeFileSync(dest, contents);
	await execa(advpng, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
