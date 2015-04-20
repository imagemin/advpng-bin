#!/usr/bin/env node
'use strict';

var spawn = require('child_process').spawn;
var advpng = require('./').path;
var input = process.argv.slice(2);

spawn(advpng, input, {stdio: 'inherit'})
	.on('exit', process.exit);
