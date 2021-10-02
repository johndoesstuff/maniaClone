var fs = require('fs');
var StreamZip = require('node-stream-zip');
var zip = new StreamZip({file: './test map.osz', storeEntries: true});
var entries = zip.entries();