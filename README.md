# Typesetter's Son

[![Named for "Typesetter's Son" on Channel101](typesetters-son.jpg)](http://www.channel101.com/episode/1667)

Typesetter's Son is a small utility for generating images based on lightly modified webpages. It loads a URL in [Headless Chrome](https://github.com/GoogleChrome/puppeteer), substitutes innerHTML for elements you specify, and takes a screenshot.

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

## Example:

```sh
typesetters-son http://dogpatchjs.com/banner -o dogpatch.png -w 1024 -c 'body' -s '{"#day": "Monday, July 17, 2017", "#where": "Spark Social", "#time": "6:30pm"}'
```

![Example output](example.png)
