'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

(async () => {
	await bin.run(['--version']).catch(async err => {
		log.warn(err.message);
		log.warn('advpng pre-build test failed');
		log.info('compiling from source');

		await binBuild.url('http://prdownloads.sourceforge.net/advancemame/advancecomp-1.19.tar.gz', [
			'autoreconf -fiv',
			`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make install'
		]).then(() => {
			log.success('advpng built successfully');
		}).catch(error => {
			log.error(error.stack);
		});
	});

	log.success('advpng pre-build test passed successfully');
})();
