'use strict';


const runOCR = require('../src/runOCR');

const Image = require('image-js').default;

const loadFontFingerprint = require('../src/util/loadFontData');
const symbols = require('../src/util/symbolClasses').MRZ; // SYMBOLS MRZ NUMBERS

const options = {
  roiOptions: {
    minSurface: 30,
    positive: true,
    negative: false,
    greyThreshold: 0.5,
    level: true
  },
  fingerprintOptions: {
    height: 12,
    width: 12,
    minSimilarity: 0.4,
    maxNotFound: 100,
    fontName: 'ocrb',
    category: symbols.label
  },
};

const fontFingerprint = loadFontFingerprint(options.fingerprintOptions);

const imageForOcr = __dirname + '/../demo/mrz-2.png';

Image.load(imageForOcr).then(function (image) {
  const result = runOCR(image, fontFingerprint, options);

  for (let line of result.lines) {
    console.log(line.text, line.similarity, ' Found:', line.found, ' Not found:', line.notFound);
  }
  console.log('Total similarity', result.totalSimilarity);
  console.log('Total found', result.totalFound);
  console.log('Total not found', result.totalNotFound);

  // for the first line we just show the roiOptions
  // for (var roi of result.lines[1].rois) {
  //    console.log(JSON.stringify(roiOptions));
  // }
});
