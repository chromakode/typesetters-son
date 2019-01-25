#!/usr/bin/env node
const {generateImage, generatePDF} = require('./')

const argv = require('yargs')
  .usage('Usage: $0 URL -o [path]')
  .option('output', {
    alias: 'o',
    describe: 'output image/pdf path',
  })
  .option('width', {
    alias: 'w',
    describe: 'viewport width',
    default: 800,
  })
  .option('height', {
    alias: 'h',
    describe: 'viewport height',
    default: 600,
  })
  .option('crop', {
    alias: 'c',
    describe: 'element query to crop around',
  })
  .option('density', {
    alias: 'd',
    describe: 'pixel density',
    default: 1,
  })
  .option('paper', {
    alias: 'p',
    describe: 'paper size (e.g. Letter, A4, etc.)',
    default: 'Letter',
  })
  .option('remove-bg', {
    describe: 'remove bg colors (for printing)',
    default: false,
    type: 'boolean',
  })
  .option('subs', {
    alias: 's',
    describe: 'text substitutions (JSON)',
    coerce: JSON.parse,
  })
  .demand('o')
  .demandCommand(1, 'Please specify a URL')
  .argv

argv.url = argv._[0]
const generate = argv.output.endsWith('.pdf')
  ? generatePDF
  : generateImage

generate(argv)
  .catch(err => {
    console.log(err.toString())
  })
