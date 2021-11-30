'use strict';

// eslint-disable-next-line
const runMRZ = require('../src/runMRZ');
const getMrz = require('../src/util/getMrz');

const IJS = require('image-js').default;

const loadFontFingerprint = require('../src/util/loadFontData');
const symbols = require('../src/util/symbolClasses').MRZ; // SYMBOLS MRZ NUMBERS

var options = {
  roiOptions: {
    minSurface: 20,
    positive: true,
    negative: false,
    maxWidth: 50,
    greyThreshold: 0.5,
    level: true // we recalculate the greyThreshold based
    // on min / max values of the grey image
  },
  fingerprintOptions: {
    height: 12,
    width: 12,
    minSimilarity: 0.7,
    fontName: 'ocrb',
    category: symbols.label
  }
};

const fontFingerprint = loadFontFingerprint(options.fingerprintOptions);

const imageForOcr = __dirname + '/../demo/passport1.jpg';

IJS.load(imageForOcr).then(function (image) {
  console.log('Image size: ', image.width, image.height);
  console.time('full OCR process');

  const mrzImage = getMrz(image);
  mrzImage.save('debug.png');

  const result = runMRZ(mrzImage, fontFingerprint, options);

  console.timeEnd('full OCR process');

  for (let line of result.lines) {
    console.log(line.text, line.similarity, ' Found:', line.found, ' Not found:', line.notFound);
  }
  console.log('Total similarity', result.totalSimilarity);
  console.log('Total found', result.totalFound);
  console.log('Total not found', result.totalNotFound);
});
