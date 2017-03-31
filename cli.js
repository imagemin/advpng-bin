#!/usr/bin/env node
'use strict';
const spawn = require('child_process').spawn;
const advpng = require('.');

const input = process.argv.slice(2);

spawn(advpng, input, {stdio: 'inherit'})
	.on('exit', process.exit);
