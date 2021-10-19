const model = (() => {
	return {
		getEntries(file, options) {
			return (new zip.ZipReader(new zip.BlobReader(file))).getEntries(options);
		},
		async getURL(entry, options) {
			return URL.createObjectURL(await entry.getData(new zip.BlobWriter(), options));
		}
	};

})();

zip.useWebWorkers = false;
window.maps = [];
document.getElementById("map").onchange = async function() {
	window.maps = [];
	while (document.getElementById("diffs").firstChild) document.getElementById("diffs").removeChild(document.getElementById("diffs").firstChild);
	entries = await model.getEntries(document.getElementById("map").files[0],  "utf8" );
	if (entries.length) {
		console.log(entries[0].filename)
		window.text = [];
		for (var i = 0; i < entries.length; i++) {
			window.text[i] = await entries[i].getData(
				new zip.TextWriter(),
				{ 
					onprogress: (index, max) => {}
				}
			);
			if (Array.from(entries[i].rawFilename).map(e => String.fromCharCode(e)).join("").endsWith(".osu") && typeof convert(text[i]) != "string") {
				maps.push(convert(text[i]));
				var a = document.createElement("div");
				var nps = Math.round(maps[maps.length-1].notes.length/(maps[maps.length-1].notes[maps[maps.length-1].notes.length-1].s-maps[maps.length-1].notes[0].s)*100000)/100
				var deltaT = 10000;
				var npsDist = Array(maps[maps.length-1].notes.length).fill(0).map((e, i) => maps[maps.length-1].notes.filter(n => n.s > maps[maps.length-1].notes[i].s && n.s < maps[maps.length-1].notes[i].s + deltaT).length/(deltaT/1000));
				npsDist = npsDist.sort((a, b) => b - a);
				var sampleNps = npsDist.slice(0, Math.floor(npsDist[0])).reduce((a, b) => a+b)/Math.floor(npsDist[0]);
				var k = maps[maps.length-1].general.keys;
				var sampleNps = Math.round(sampleNps*100)/100;
				var od = maps[maps.length-1].general.od;
				var ln = Math.round(maps[maps.length-1].notes.filter(e => e.e).length/maps[maps.length-1].notes.length*10000)/100;
				var diff = maps[maps.length-1].general.diff;
				//a.innerText = k + "k " + nps + "kps " + sampleNps + "Skps OD: " + od + ", " + ln + "%ln : " + diff;
				var starScale = 0.15;
				var star = Math.round(starScale*100*((sampleNps + nps) + ln/100*(sampleNps + nps) + od/100*(sampleNps + nps)))/100;
				a.innerText = k + "K " + diff + " | " + star + "*\nNPS: " + sampleNps + "~" + nps + " OD: " + od + " LN: " + ln + "%\n\n";
				a.id = maps.length-1;
				a.starValue = star;
				console.log(a);
				a.onclick = (e) => {
					loadMap(maps[e.srcElement.id], mapAudio);
				}
				document.getElementById("diffs").appendChild(a);
			}
		}
		[...document.getElementById("diffs").children].sort((a, b) => a.starValue - b.starValue).forEach(e=>document.getElementById("diffs").appendChild(e));
		for (var a = 0; a < maps.length; a++) {
			mapAudio = maps[a].general.audio
			for (var i = 0; i < entries.length; i++) {
				if (Array.from(entries[i].rawFilename).map(e => String.fromCharCode(e)).join("") == mapAudio) {
					mapAudio = URL.createObjectURL(await entries[i].getData(
						new zip.BlobWriter(),
						{ 
							onprogress: (index, max) => {}
						}
					));
				}
			}
			maps[a].audio = new Audio(mapAudio);
		}
	}
}