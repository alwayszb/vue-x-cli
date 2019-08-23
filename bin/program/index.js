#!/usr/bin/env node
var program = require('commander');
var optionItems = require('../option-items');
program
  .version(require('../../package').version, '-v, --version')
  .description('Vue components/views generator cli.')
  .usage('[options]')
  .option('-f, --filename [filename]', 'the component/view name you want to create')
  .option(
    '-t, --template [template]',
    'available templates: ' + optionItems.template,
    optionItems.template[0],
  )
  .option('-c, --css [lang]', 'css language', 'less')
  .option(
    '--type [type]',
    'available component types: ' + Object.keys(optionItems.type),
    optionItems.type.file,
  );

module.exports = program;
