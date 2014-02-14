'use strict';

var bin = require('./advpng').bin;
var chalk = require('chalk');

bin.build(function (error) {
  if (error) {
    return console.log(chalk.red('✗ ' + error.message));
  }

  console.log(chalk.green('✓ advpng built successfully'));
});