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
				a.innerText = maps[maps.length-1].general.keys + "k " + nps + "kps " + Math.round(maps[maps.length-1].notes.filter(e => e.e).length/maps[maps.length-1].notes.length*10000)/100 + "%ln : " + maps[maps.length-1].general.diff;
				a.id = maps.length-1;
				console.log(a);
				a.onclick = (e) => {
					loadMap(maps[e.srcElement.id], mapAudio);
				}
				document.getElementById("diffs").appendChild(a);
			}
		}
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