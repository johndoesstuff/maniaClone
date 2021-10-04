var fs = require('fs');
var StreamZip = require('node-stream-zip');
var zip = new StreamZip({file: './test map.osz', storeEntries: true});
var entries = zip.entries();
Array(Object.keys(entries).filter(e => (["osu", "mp3"]).includes(e.split(".")[e.split(".").length-1])).length).fill(0).map((e, i) => entries[Object.keys(entries).filter(e => (["osu", "mp3"]).includes(e.split(".")[e.split(".").length-1]))[i]])