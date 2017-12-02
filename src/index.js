const puppeteer = require('puppeteer')

async function generateImage({
  browserWSEndpoint,
  url,
  output,
  width,
  height,
  density=1,
  subs,
  crop,
}) {
  let browser
  if (browserWSEndpoint) {
    browser = await puppeteer.connect({browserWSEndpoint})
  } else {
    browser = await puppeteer.launch()
  }
  try {
    const page = await browser.newPage()
    await page.setViewport({
      width: width,
      height: height,
      deviceScaleFactor: density,
    })

    await page.goto(url, {waitUntil: 'networkidle0'})

    if (subs) {
      await page.evaluate(subs => {
        for (const query of Object.keys(subs)) {
          const text = subs[query]
          document.querySelectorAll(query).forEach(el => {
            el.innerHTML = text
          })
        }
      }, subs)
    }

    let clip
    if (crop) {
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
      }, crop)
    }

    return await page.screenshot({path: output, clip})
  } finally {
    browser.close()
  }
}

module.exports = generateImage
