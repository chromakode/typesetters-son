# Typesetter's Son

[![npm](https://img.shields.io/npm/v/typesetters-son.svg?style=flat-square)](https://www.npmjs.com/package/typesetters-son)
[![license](https://img.shields.io/npm/l/typesetters-son.svg?style=flat-square)](https://github.com/chromakode/typesetters-son/blob/master/LICENSE)

[![Named for "Typesetter's Son" on Channel101](typesetters-son.jpg)](http://www.channel101.com/episode/1667)

Typesetter's Son is a small utility for generating images based on lightly modified webpages. It loads a URL in [Headless Chrome](https://github.com/GoogleChrome/puppeteer), substitutes innerHTML for elements you specify, and takes a screenshot.

It works great on SVGs too -- just sprinkle in `id` attributes where you want to modify text!

## Installation

Library: `npm install typesetters-son`  
Executable: `npm install -g typesetters-son`

## Example:

`typesetters-son http://dogpatchjs.com/banner -o dogpatch.png -w 1024 -c 'body' -s '{"#day": "Monday, July 17, 2017", "#where": "Spark Social", "#time": "6:30pm"}'`

![Example output](example.png)

## Library Usage

```js
const generateImage = require('typesetters-son')
generateImage({
  url: 'http://dogpatchjs.com/banner',
  output: 'dogpatch.png',
  width: 1024,
  height: 800,
  density: 1,  // defaults to 1 if unspecified
  crop: 'body',
  subs: {
   '#day': new Date().toDateString(),
   '#where': 'Spark Social',
   '#time': '6:30pm',
  },
})
```

## Executable Usage

```
Usage: typesetters-son URL -o [path]

Options:
  --output, -o   output image path                                    [required]
  --width, -w    viewport width                                   [default: 800]
  --height, -h   viewport height                                  [default: 600]
  --crop, -c     element query to crop around
  --density, -d  pixel density                                      [default: 1]
  --subs, -s     text substitutions (JSON)
```
