#!/usr/bin/env node
const puppeteer = require('puppeteer')

const argv = require('yargs')
  .usage('Usage: $0 URL -o [path]')
  .option('output', {
    alias: 'o',
    describe: 'output image path',
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
  .option('subs', {
    alias: 's',
    describe: 'text substitutions (JSON)',
    coerce: JSON.parse,
  })
  .demand('o')
  .demandCommand(1, 'Please specify a URL')
  .argv

async function run() {
  const browser = await puppeteer.launch()
  try {
    const page = await browser.newPage()
    await page.setViewport({
      width: argv.width,
      height: argv.height,
      deviceScaleFactor: argv.density,
    })

    const url = argv._[0]
    await page.goto(url, {waitUntil: 'networkidle'})

    if (argv.subs) {
      await page.evaluate(subs => {
        for (const query of Object.keys(subs)) {
          const text = subs[query]
          document.querySelectorAll(query).forEach(el => {
            el.innerHTML = text
          })
        }
      }, argv.subs)
    }

    let clip
    if (argv.crop) {
      clip = await page.evaluate(query => {
        const el = document.querySelector(query)
        if (!el) {
          return
        }
        const box = el.getBoundingClientRect()
        return {
          x: box.left,
          y: box.top,
          width: box.width,
          height: box.height,
        }
      }, argv.crop)
    }

    await page.screenshot({path: argv.output, clip})
  } catch (err) {
    console.log(err.toString())
  } finally {
    browser.close()
  }
}

run()
