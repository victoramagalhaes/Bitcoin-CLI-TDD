#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./convertBTC.js');

program
     .version(pkg.version)
     .description('Convert Bitcoin to any currency defined.')
     .option('-C, --currency <currency>', 'Currency to be converted. (Default: USD)')
     .option('-A, --amount <amount>', 'Value in bitcoin to be converted. (Default: 1)')
     .parse(process.argv)

console.log(convertBTC(program.currency, program.amount));