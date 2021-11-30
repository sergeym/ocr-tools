'use strict';


const fs = require('fs');

const mkdirp = require('mkdirp');

const getFingerprintName = require('./getFontDataFilename');

module.exports = function saveFingerprint(fingerprint, options = {}) {
  const file = getFingerprintName(options);
  mkdirp.sync(file.folder);

  const filename = file.folder + '/' + file.name;
  console.log('saving to ', filename);

  fs.writeFileSync(
      filename,
    JSON.stringify({
      font: options.fontName,
      fingerprint
    })
  );
};
