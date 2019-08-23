#!/usr/bin/env node
var program = require('./program');
program.parse(process.argv);

const chalk = require('chalk');
const ora = require('ora');
const spinnerStyle = require('../libs/spinners.json');
const path = require('path');
const fs = require('fs');
const variables = require('./variables');
const optionItems = require('./option-items');
const utils = require('./utils');

const spinner = ora({
  text: chalk.blue('generate template begin'),
  spinner: spinnerStyle.dots,
});

/**
 * Help
 */
(function help() {
  if (program.args.length < 1) return program.help();
})();

/**
 * Generate
 */
const suffix = '.vue';
const baseDir = './';
const basePath = path.join(process.cwd(), baseDir);

console.log(`[options]: ${JSON.stringify(program.opts())}`);
console.log(program.args);
console.log();
spinner.start('Generating component, please wait...');
console.log();

checkBasePathIsExists(basePath, baseDir);

// check base path
function checkBasePathIsExists(currentPath, currentDir) {
  if (fs.existsSync(currentPath)) {
    const filename = program.file || program.args[0];
    if (optionItems.type.file === program.type) {
      generate(filename);
    } else {
      generateFolderComponent(filename);
    }
  } else {
    spinner.fail(chalk.red(currentDir + ' directory does not exist'));
  }
}

function generate(filename) {
  // if (!filename) {
  //   spinner.fail(chalk.red('No filename provided.'));
  // }
  checkPathIsExists('.', filename);
  console.log();
  spinner.stop();
}

function generateFolderComponent(filename) {
  const folderName = utils.toKebabCase(filename);

  let currentPath = path.join(basePath, folderName);
  if (!fs.existsSync(currentPath)) {
    fs.mkdirSync(currentPath);
  }

  generateVueFile(currentPath, filename);
  generateIndexFile(currentPath, filename);

  spinner.stop();
}

// check path
function checkPathIsExists(currentDir, filename) {
  let currentPath = path.join(basePath, currentDir);
  if (!fs.existsSync(currentPath)) {
    fs.mkdirSync(currentPath);
  }
  checkVueFileIsExists(currentPath, filename);
}

function checkVueFileIsExists(currentPath, filename) {
  if (Object.prototype.toString.call(filename) === '[object Array]') {
    filename.forEach(function(file) {
      generateVueFile(currentPath, file);
    });
  } else {
    generateVueFile(currentPath, filename);
  }
}

function generateVueFile(currentPath, filename) {
  const targetFile = filename + suffix;
  let destFile = path.join(currentPath, './' + targetFile);

  spinner.start(targetFile + ' is generating...');

  console.log();
  if (fs.existsSync(destFile)) {
    spinner.fail(chalk.red(destFile + ' already exists.'));
  } else {
    fs.writeFileSync(destFile, readTemplate(filename));
    spinner.succeed(chalk.green(`${destFile} generated.`));
  }
}

function generateIndexFile(currentPath, filename) {
  const indexFile = path.join(currentPath, './index.js');
  fs.writeFileSync(indexFile, readIndexFile(filename));
}

function readTemplate(filename) {
  const filePath = `../templates/${program.template}.txt`;
  var template = fs.readFileSync(path.join(__dirname, filePath));
  var content = template.toString();
  content = content.replace(new RegExp(variables.NAME, 'g'), utils.toKebabCase(filename));
  content = content.replace(new RegExp(variables.CSS_LANG, 'g'), program.css);
  return content;
}

function readIndexFile(filename) {
  const filePath = `../templates/import-comp.txt`;
  var indexFile = fs.readFileSync(path.join(__dirname, filePath));
  var content = indexFile.toString();
  content = content.replace(new RegExp(variables.NAME, 'g'), filename);
  return content;
}
