import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

(async () => {
	await bin.run(['--version']).catch(async error => {
		console.warn(error.message);
		console.warn('advpng pre-build test failed');
		console.info('compiling from source');

		const source = fileURLToPath(new URL('../vendor/source/advancecomp-2.1.tar.gz', import.meta.url));

		await binBuild.file(source, [
			'autoreconf -fiv',
			`./configure --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
			'make install',
		]).then(() => {
			console.log('advpng built successfully');
		}).catch(error => {
			console.error(error.stack);
		});
	});

	console.log('advpng pre-build test passed successfully');
})();
