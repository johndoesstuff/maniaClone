function convert(e) {
	lines = e.split("\n").map(k => k.trim());
	map = {};
	map.general = {};
	map.metadata = {};
	map.difficulty = {};
	mapF = {};
	mapF.general = {};
	mapF.notes = [];
	lines.slice(lines.indexOf("[General]")).slice(1,lines.slice(lines.indexOf("[General]")).indexOf("")).map(e => {map.general[e.split(":")[0]] = e.split(":").slice(1).join(":").trim()});
	lines.slice(lines.indexOf("[Metadata]")).slice(1,lines.slice(lines.indexOf("[Metadata]")).indexOf("")).map(e => {map.metadata[e.split(":")[0]] = e.split(":").slice(1).join(":").trim()});
	lines.slice(lines.indexOf("[Difficulty]")).slice(1,lines.slice(lines.indexOf("[Difficulty]")).indexOf("")).map(e => {map.difficulty[e.split(":")[0]] = e.split(":").slice(1).join(":").trim()});
	lines.slice(lines.indexOf("[HitObjects]")).slice(1,lines.slice(lines.indexOf("[HitObjects]")).indexOf("")).map(e => {
		if ((Number(e.split(",")[3]) & 128) >> 7 & 1) mapF.notes.push({
			l: ~~(Number(e.split(",")[0])*Number(map.difficulty.CircleSize)/512),
			s: Number(e.split(",")[2]),
			e: Number(e.split(",")[5].split(":")[0]),
		});
		else mapF.notes.push({
			l: ~~(Number(e.split(",")[0])*Number(map.difficulty.CircleSize)/512),
			s: Number(e.split(",")[2]),
		});
	});
	if (map.general.Mode != "3") return "bruh";
	//if (map.difficulty.CircleSize != "4") return "4k only";
	mapF.general.title = map.metadata.Title;
	mapF.general.keys = map.difficulty.CircleSize;
	mapF.general.artist = map.metadata.Artist;
	mapF.general.diff = map.metadata.Version;
	mapF.general.od = map.difficulty.OverallDifficulty;
	mapF.general.audio = map.general.AudioFilename;
	mapF.general.preview = map.general.PreviewTime;
	return mapF;
}