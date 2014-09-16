'use strict';

var bin = require('./');
var BinBuild = require('bin-build');
var logSymbols = require('log-symbols');

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

bin.run(['--version'], function (err) {
	if (err) {
		console.log(logSymbols.warning + ' pre-build test failed, compiling from source...');

		var builder = new BinBuild()
			.src('http://prdownloads.sourceforge.net/advancemame/advancecomp-' + bin.v + '.tar.gz')
			.cmd('./configure --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
			.cmd('make install');

		return builder.build(function (err) {
			if (err) {
				console.log(logSymbols.error, err);
				return;
			}

			console.log(logSymbols.success + ' advpng built successfully!');
		});
	}

	console.log(logSymbols.success + ' pre-build test passed successfully!');
});
