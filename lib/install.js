'use strict';
const path = require('path');
const binBuild = require('bin-build');
const bin = require('.');

(async () => {
	await bin.run(['--version']).catch(async error => {
		console.warn(error.message);
		console.warn('advpng pre-build test failed');
		console.info('compiling from source');

		await binBuild.file(path.resolve(__dirname, '../vendor/source/advancecomp-2.1.tar.gz'), [
			'autoreconf -fiv',
			`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make install'
		]).then(() => {
			console.log('advpng built successfully');
		}).catch(error => {
			console.error(error.stack);
		});
	});

	console.log('advpng pre-build test passed successfully');
})();
