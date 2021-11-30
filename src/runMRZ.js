'use strict';

const getLinesFromImage = require('./util/getLinesFromImage');
const doOcrOnLines = require('./util/doOcrOnLines');
const setFingerprintDataOnRoi = require("./util/setFingerprintDataOnRoi");

module.exports = function runMRZ(image, fontFingerprint, options = {}) {
  let { lines } = getLinesFromImage(image, options.roiOptions);
  const ocrOptions = Object.assign({}, options.fingerprintOptions, { maxNotFound: 411 });
  setFingerprintDataOnRoi(lines, options.fingerprintOptions);
  return doOcrOnLines(lines, fontFingerprint, ocrOptions);
};
