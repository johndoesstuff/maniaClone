//burnt orange is my favorite color :)

var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

renderScreen();

skin = (window.location.href.split("skin=")[1] || "").split("&")[0] || "quaver";

document.getElementById("speed").oninput = (e) => {
	var sp = document.getElementById("speed").value * document.getElementById("diffenh").value;
	for (var i = 0; i < document.getElementById("diffs").children.length; i++) {
		var a = document.getElementById("diffs").children[i];
		a.innerText = a.key + "K " + a.diff + " | " + round(a.starValue*sp) + "*\nNPS: " + round(a.sampleNps*sp) + "~" + round(a.nps*sp) + " OD: " + a.od + " LN: " + a.ln + "%\n\n";
	}
}

document.getElementById("diffenh").oninput = document.getElementById("speed").oninput

var round = (e) => Math.round(e*100)/100

window.keybinds = {
	1: " ".split(""),
	2: "dj".split(""),
	3: "d j".split(""),
	4: "dfjk".split(""),
	5: "df jk".split(""),
	6: "sdfjkl".split(""),
	7: "sdf jkl".split(""),
	8: "qweruiop".split(""), //chromebooks have bad keyboard rollover so i need to use qweruiop instead of asdfjkl;
	9: "qwer uiop".split(""),
	10: "qwervnuiop".split(""),
	11: "qwerv nuiop".split(""),
	12: "qwerfvnjuiop".split(""),
	13: "qwerfv njuiop".split(""),
	14: "qawerfvnjuio;p".split(""),
	15: "qawerfv njuio;p".split(""),
	16: "qawserfvnjuilo;p".split(""),
	17: "qawserfv njuilo;p".split(""),
	18: "qawsedrfvnjukilo;p".split(""), //just realized these look like keysmashes dafjklgskdf
};

window.genSongs = [
	{
		title: "Beethoven Virus",
		file: "genSongs/175.mp3",
		bpm: 175,
	},
	{
		title: "Dopamine",
		file: "genSongs/175-2.mp3",
		bpm: 175,
	},
	{
		title: "Run",
		file: "genSongs/150.33.mp3",
		bpm: 150.33,
	},
	{
		title: "Nailgun",
		file: "genSongs/128.mp3",
		bpm: 128,
	},
	{
		title: "Highscore",
		file: "genSongs/124.3.mp3",
		bpm: 124.3,
	},
];

window.generateMap = (song, pattern, keys, bpm) => {
	song = window.genSongs[song];
	var patternName = [
		"Alternation",
		"Jump",
		"Hand",
		"Quad/Hand",
		"Stream",
		"Jump Stream",
		"Hand Stream",
		"Trill",
		"Jump Trill",
		"Jump Chain",
		"Hand Chain",
		"Quad Chain",
		"Jump Grace",
		"Hand Grace",
		"Quad Grace",
		"Jack",
		"Mini Jack",
		"Jump Jack",
		"Hand Jack",
		"Running Men",
		"Roll",
		"Triplet",
	][pattern]
	var map = {
		general: {
			title: patternName + " Practice",
			keys: keys,
			artist: "Generated",
			diff: pattern,
			od: 8,
			audio: song.file,
		}
	};
	map.notes = [];
	map.audio = new Audio(song.file);
	if (bpm) {
		map.audio.playbackRate = bpm / song.bpm; 
	}
	bpm = song.bpm || bpm;
	for (var i = 0; i < 999; i++) {
		var beatLen = 60000/bpm;
		var t = i*beatLen;
		switch (pattern) {
			case 0: //alternation
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+1*beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+2*beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+3*beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				break;
			case 1: //jump
				map.notes.push({s: t, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				map.notes.push({s: t+beatLen/2, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				break;
			case 2: //hand
				r = ~~(Math.random()*keys);
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				r = ~~(Math.random()*keys);
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				break;
			case 3: //quad hand
				if (Math.random() < 0.5) {
					r = ~~(Math.random()*keys);
					map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
					map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
					map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				} else {
					map.notes.push({s: t, l: 0});
					map.notes.push({s: t, l: 1});
					map.notes.push({s: t, l: 2});
					map.notes.push({s: t, l: 3});
				}
				if (Math.random() < 0.5) {
					r = ~~(Math.random()*keys);
					map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
					map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
					map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				} else {
					map.notes.push({s: t+beatLen/2, l: 0});
					map.notes.push({s: t+beatLen/2, l: 1});
					map.notes.push({s: t+beatLen/2, l: 2});
					map.notes.push({s: t+beatLen/2, l: 3});
				}
				break;
			case 4: //stream
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				map.notes.push({s: t+1*beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+2*beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				map.notes.push({s: t+3*beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				break;
			case 5: //jumpstream
				map.notes.push({s: 2*t, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: 2*t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: 2*t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: 2*t+2*beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: 2*t+3*beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				break;
			case 6: //handstream
				r = ~~(Math.random()*keys);
				map.notes.push({s: 2*t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
				map.notes.push({s: 2*t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
				map.notes.push({s: 2*t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				map.notes.push({s: 2*t+beatLen/2, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: 2*t+2*beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: 2*t+3*beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				break;
			case 7: //trill
				n1 = Array(keys).fill(0).map((e,i) => i).filter(e => e != ((map.notes[map.notes.length-1] || []).l || 0))[~~(Math.random()*(keys-1))];
				n2 =  Array(keys).fill(0).map((e,i) => i).filter(e => e != n1)[~~(Math.random()*(keys-1))];
				n3 =  Array(keys).fill(0).map((e,i) => i).filter(e => !([n1,n2]).includes(e))[~~(Math.random()*(keys-2))];
				n4 =  Array(keys).fill(0).map((e,i) => i).filter(e => !([n1,n2,n3]).includes(e))[~~(Math.random()*(keys-3))];
				map.notes.push({s: t, l: n1});
				map.notes.push({s: t+beatLen/4, l: n2});
				map.notes.push({s: t+2*beatLen/4, l: n1});
				map.notes.push({s: t+3*beatLen/4, l: n2});
				break;
			case 8: //jump trill
				n1 = Array(keys).fill(0).map((e,i) => i).filter(e => e != ((map.notes[map.notes.length-1] || []).l || 0))[~~(Math.random()*(keys-1))];
				n2 =  Array(keys).fill(0).map((e,i) => i).filter(e => e != n1)[~~(Math.random()*(keys-1))];
				n3 =  Array(keys).fill(0).map((e,i) => i).filter(e => !([n1,n2]).includes(e))[~~(Math.random()*(keys-2))];
				n4 =  Array(keys).fill(0).map((e,i) => i).filter(e => !([n1,n2,n3]).includes(e))[~~(Math.random()*(keys-3))];
				map.notes.push({s: 2*t, l: n1});
				map.notes.push({s: 2*t, l: n2});
				map.notes.push({s: 2*t+beatLen/2, l: n3});
				map.notes.push({s: 2*t+beatLen/2, l: n4});
				map.notes.push({s: 2*t+beatLen, l: n1});
				map.notes.push({s: 2*t+beatLen, l: n2});
				map.notes.push({s: 2*t+3*beatLen/2, l: n3});
				map.notes.push({s: 2*t+3*beatLen/2, l: n4});
				break;
			case 9: //jump chain
				map.notes.push({s: t, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+beatLen/4, l: p});
				map.notes.push({s: t+beatLen/2, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+3*beatLen/4, l: p});
				break;
			case 10: //hand chain
				r = ~~(Math.random()*keys);
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
				map.notes.push({s: t, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				map.notes.push({s: t+beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[~~(Math.random()*(keys-1))]});
				r = ~~(Math.random()*keys);
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
				map.notes.push({s: t+beatLen/2, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				map.notes.push({s: t+3*beatLen/4, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[~~(Math.random()*(keys-1))]});
				break;
			case 11: //quad chain
				r = ~~(Math.random()*keys);
				map.notes.push({s: t, l: 0});
				map.notes.push({s: t, l: 1});
				map.notes.push({s: t, l: 2});
				map.notes.push({s: t, l: 3});
				map.notes.push({s: t+beatLen/4, l: r});
				r = ~~(Math.random()*keys);
				map.notes.push({s: t+beatLen/2, l: 0});
				map.notes.push({s: t+beatLen/2, l: 1});
				map.notes.push({s: t+beatLen/2, l: 2});
				map.notes.push({s: t+beatLen/2, l: 3});
				map.notes.push({s: t+3*beatLen/4, l: r});
				break;
			case 12: //jump grace
				map.notes.push({s: t, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				map.notes.push({s: t+beatLen/2, l: ~~(Math.random()*keys)});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				map.notes.push({s: t+beatLen/2+beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))]});
				break;
			case 13: //hand grace
				o = Array(keys-1).fill(0).map((e,i) => i).sort(() => (Math.random() > .5) ? 1 : -1);
				r = ~~(Math.random()*keys);
				map.notes.push({s: t+o[0]*beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
				map.notes.push({s: t+o[1]*beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
				map.notes.push({s: t+o[2]*beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				o = Array(keys-1).fill(0).map((e,i) => i).sort(() => (Math.random() > .5) ? 1 : -1);
				r = ~~(Math.random()*keys);
				map.notes.push({s: t+beatLen/2+o[0]*beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]});
				map.notes.push({s: t+beatLen/2+o[1]*beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]});
				map.notes.push({s: t+beatLen/2+o[2]*beatLen/16, l: Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]});
				break;
			case 14: //quad grace
				o = Array(keys).fill(0).map((e,i) => i).sort(() => (Math.random() > .5) ? 1 : -1);
				map.notes.push({s: t+o[0]*beatLen/16, l: 0});
				map.notes.push({s: t+o[1]*beatLen/16, l: 1});
				map.notes.push({s: t+o[2]*beatLen/16, l: 2});
				map.notes.push({s: t+o[3]*beatLen/16, l: 3});
				o = Array(keys).fill(0).map((e,i) => i).sort(() => (Math.random() > .5) ? 1 : -1);
				map.notes.push({s: t+o[0]*beatLen/16+beatLen/2, l: 0});
				map.notes.push({s: t+o[1]*beatLen/16+beatLen/2, l: 1});
				map.notes.push({s: t+o[2]*beatLen/16+beatLen/2, l: 2});
				map.notes.push({s: t+o[3]*beatLen/16+beatLen/2, l: 3});
				break;
			case 15: //jack
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				r = Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))];
				map.notes.push({s: t+0*beatLen/4, l: r});
				map.notes.push({s: t+1*beatLen/4, l: r});
				map.notes.push({s: t+2*beatLen/4, l: r});
				map.notes.push({s: t+3*beatLen/4, l: r});
				break;
			case 16: //mini jack
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				r = Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))];
				map.notes.push({s: t+0*beatLen/4, l: r});
				map.notes.push({s: t+1*beatLen/4, l: r});
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				r = Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))];
				map.notes.push({s: t+2*beatLen/4, l: r});
				map.notes.push({s: t+3*beatLen/4, l: r});
				break;
			case 17: //jump jack
				n1 = ~~(Math.random()*keys);
				n2 = Array(keys).fill(0).map((e,i) => i).filter(e => e != n1)[~~(Math.random()*(keys-1))]
				map.notes.push({s: t, l: n1});
				map.notes.push({s: t, l: n2});
				map.notes.push({s: t+1*beatLen/4, l: n1});
				map.notes.push({s: t+1*beatLen/4, l: n2});
				map.notes.push({s: t+2*beatLen/4, l: n1});
				map.notes.push({s: t+2*beatLen/4, l: n2});
				map.notes.push({s: t+3*beatLen/4, l: n1});
				map.notes.push({s: t+3*beatLen/4, l: n2});
				break;
			case 18: //hand jack
				r = ~~(Math.random()*keys);
				n1 = Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[0]
				n2 = Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[1]
				n3 = Array(keys).fill(0).map((e,i) => i).filter(e => e != r)[2]
				map.notes.push({s: t, l: n1});
				map.notes.push({s: t, l: n2});
				map.notes.push({s: t, l: n3});
				map.notes.push({s: t+1*beatLen/4, l: n1});
				map.notes.push({s: t+1*beatLen/4, l: n2});
				map.notes.push({s: t+1*beatLen/4, l: n3});
				map.notes.push({s: t+2*beatLen/4, l: n1});
				map.notes.push({s: t+2*beatLen/4, l: n2});
				map.notes.push({s: t+2*beatLen/4, l: n3});
				map.notes.push({s: t+3*beatLen/4, l: n1});
				map.notes.push({s: t+3*beatLen/4, l: n2});
				map.notes.push({s: t+3*beatLen/4, l: n3});
				break;
			case 19: //running men
				p = (0 || (map.notes[map.notes.length-1] || []).l + 1) - 1;
				r = Array(keys).fill(0).map((e,i) => i).filter(e => e != p)[~~(Math.random()*(keys-1))];
				a = Array(keys).fill(0).map((e,i) => i).filter(e => e != r).sort(() => (Math.random() > .5) ? 1 : -1);
				map.notes.push({s: 2*t, l: r});
				map.notes.push({s: 2*t+beatLen/4, l: a[0]});
				map.notes.push({s: 2*t+2*beatLen/4, l: r});
				map.notes.push({s: 2*t+3*beatLen/4, l: a[1]});
				map.notes.push({s: 2*t+4*beatLen/4, l: r});
				map.notes.push({s: 2*t+5*beatLen/4, l: a[2]});
				map.notes.push({s: 2*t+6*beatLen/4, l: r});
				map.notes.push({s: 2*t+7*beatLen/4, l: a[1]});
				break;
			case 20: //roll
				a = Array(keys).fill(0).map((e,i) => i).sort(() => (Math.random() > .5) ? 1 : -1);
				map.notes.push({s: 4*t, l: a[0]});
				map.notes.push({s: 4*t+beatLen/4, l: a[1]});
				map.notes.push({s: 4*t+2*beatLen/4, l: a[2]});
				map.notes.push({s: 4*t+3*beatLen/4, l: a[3]});
				map.notes.push({s: 4*t+4*beatLen/4, l: a[0]});
				map.notes.push({s: 4*t+5*beatLen/4, l: a[1]});
				map.notes.push({s: 4*t+6*beatLen/4, l: a[2]});
				map.notes.push({s: 4*t+7*beatLen/4, l: a[3]});
				map.notes.push({s: 4*t+8*beatLen/4, l: a[0]});
				map.notes.push({s: 4*t+9*beatLen/4, l: a[1]});
				map.notes.push({s: 4*t+10*beatLen/4, l: a[2]});
				map.notes.push({s: 4*t+11*beatLen/4, l: a[3]});
				map.notes.push({s: 4*t+12*beatLen/4, l: a[0]});
				map.notes.push({s: 4*t+13*beatLen/4, l: a[1]});
				map.notes.push({s: 4*t+14*beatLen/4, l: a[2]});
				map.notes.push({s: 4*t+15*beatLen/4, l: a[3]});
				break;
		}
	}
	return map;
}

window.rankAccs = [
	[100, "rankX"],
	[95, "rankS"],
	[90, "rankA"],
	[80, "rankB"],
	[70, "rankC"],
	[0, "rankD"],
];

function loadMap(map, overrideSpeed) {
	ingame = true;
	window.loadedMap = map;
	window.filteredNotes = window.loadedMap.notes.filter(e => !e.h);
	window.audio = map.audio;
	window.maniaWidth = skins[skin].widthMult*Math.sqrt(map.general.keys)/2*window.defaultManiaWidth;
	variableSpeed = document.getElementById("variableSpeed").checked;
	wobble = document.getElementById("wobble").checked;
	hell = document.getElementById("hell").checked;
	unreadable = document.getElementById("unreadable").checked;
	chunked = document.getElementById("chunked").checked;
	halfChunked = document.getElementById("halfchunked").checked;
	if (document.getElementById("noln").checked) {
		loadedMap.notes = loadedMap.notes.map(e => ({s: e.s, l: e.l}));
	}
	var enh = document.getElementById("diffenh").value;
	if (enh < 1) {
		loadedMap.notes = loadedMap.notes.filter(e => Math.random() > enh);
	} else if (enh > 1) {
		var o = loadedMap.notes.length*(enh-1);
		for (var i = 0; i < o; i++) {
			var n = ~~(Math.random()*loadedMap.notes.length)
			var t = loadedMap.notes[n].s;
			var r = ~~(Math.random()*Number(loadedMap.general.keys));
			if (loadedMap.notes.filter(e => e.s == t).map(e => e.l).includes(r)) {
				i -= 0.9; //only try 10 times per note
			} else {
				loadedMap.notes.splice(n, 0, {s: t, l: r});
			}
		}
	}
	if (document.getElementById("random").checked) {
		loadedMap.notes.forEach(e=>{e.l+=Number(loadedMap.general.keys)});
		var rnd = Array(Number(loadedMap.general.keys)).fill(0).map((e,i)=>i).sort(e=>Math.random()-0.5);
		loadedMap.notes.forEach(e=>{e.l = rnd[e.l-Number(loadedMap.general.keys)]});
	}
	od = window.loadedMap.general.od;
	updateWindows();
	if (!overrideSpeed) window.audio.playbackRate = Number(document.getElementById("speed").value)
	window.audio.volume = 0.1;
	setTimeout(() => {window.audio.play()}, 500);
	maxCombo = 0;
	startT = loadedMap.notes[0].s || 0;
	var lnCanvases = Array(skins[skin].notes.length).fill(0).map(e => document.createElement("canvas"));
	lnCanvases.forEach(e => e.width = (Math.ceil(maniaWidth/loadedMap.general.keys)));
	lnCanvases.forEach((e, i) => e.height = Math.floor(e.width*skins[skin].notes[i].mid.height/skins[skin].notes[i].mid.width));
	lnCanvases.forEach((e, i) => e.getContext("2d").drawImage(skins[skin].notes[i].mid, 0, 0, e.width, e.height));
	window.lnPatterns = Array(lnCanvases.length).fill(0).map((e, i) => ctx.createPattern(lnCanvases[i], "repeat-y"));
	renderScreen();
}

function makeImg(e) { var img = new Image(); img.src = e; return img; }
speedAcc = e => (0.00625*e+0.995);

function changeSkin(e) {
	if (window.location.href.split("skin=")[1]) window.location.href = window.location.href.split("skin=" + skin)[0] + "skin=" + e + window.location.href.split("skin=" + skin)[1];
	else if (window.location.href.split("?")[1]) window.location.href += "&skin=" + e;
	else window.location.href += "?skin=" + e;
}

function changeScrollSpeed(e) {
	window.scrollSpeed = Number((window.location.href.split("speed=")[1] || "").split("&")[0]) || 32;
	if (window.location.href.split("speed=")[1]) window.location.href = window.location.href.split("speed=" + scrollSpeed)[0] + "speed=" + e + window.location.href.split("speed=" + scrollSpeed)[1];
	else if (window.location.href.split("?")[1]) window.location.href += "&speed=" + e;
	else window.location.href += "?speed=" + e;
}

function updateWindows() {
	missWindow = 188 - 3*od;
	window50 = 151 - 3*od;
	window100 = 127 - 3*od;
	window200 = 97 - 3*od;
	window300 = 64 - 3*od;
	windowMax = 40 - 3*od;
}

var recF = 0;
var od = 8;
var missWindow = 188 - 3*od;
var window50 = 151 - 3*od;
var window100 = 127 - 3*od;
var window200 = 97 - 3*od;
var window300 = 64 - 3*od;
var windowMax = 40 - 3*od;
var healthMax = 1;
var health300 = 0.7;
var health200 = 0.1;
var health100 = -0.2;
var health50 = -0.4;
var healthMiss = -6;
var totalAcc = 1e-100;
var notesHit = 1e-100;
var accMax = 1;
var acc300 = 1;
var acc200 = 2/3;
var acc100 = 1/3;
var acc50 = 1/6;
var accMiss = 0;
var lastHit = "";
var lastHitT = 0;
var health = 100;
var healthAnim = 100;
var combo = 0;
var hitTimings = [];
var ingame = false;
var resultsScreen = false;
var maxCombo = 0;
var hitsMax = 0;
var hits300 = 0;
var hits200 = 0;
var hits100 = 0;
var hits50 = 0;
var hitsMiss = 0;
var startT = 0;
var globalVisualOffset = -0.6;
var variableSpeedMiss = 0.98;
var variableSpeedMax = 1.005;
var defaultManiaWidth = 380;
var bottomHeight = 100;
var noteWidth = 30;
var keysPressed = {};
var wobble = false;
var hell = false;
var npsColors = [
	[5, "#77f283"],
	[10, "#9cdb5c"],
	[15, "#dbce5c"],
	[20, "#db8942"],
	[Infinity, "#db5442"],
];
var speedColors = [
	[0.5, "#77f283"],
	[0.75, "#9cdb5c"],
	[1, "#dbce5c"],
	[1.5, "#db8942"],
	[Infinity, "#db5442"],
];
window.fps = 0;

document.getElementById("speed").onchange = function () {
	[...document.getElementById("diffs").children].sort((a, b) => (a.starValue+(9999*Number(a.key))) - (b.starValue+(9999*Number(b.key)))).forEach(e=>document.getElementById("diffs").appendChild(e));
}

function renderScreen() {
	if (ingame) {
		if (combo > maxCombo) maxCombo = combo;
		document.body.style.overflow = "hidden";
		document.getElementById("notCanvas").style.display = "none";
		window.maniaWidth = skins[skin].widthMult*Math.sqrt(loadedMap.general.keys)/2*window.defaultManiaWidth;
		window.scrollSpeed = Number((window.location.href.split("speed=")[1] || "").split("&")[0]) || 32;
		if (wobble) {
			var ws = 1;
			window.scrollSpeed = 2*(Math.sin(audio.currentTime/ws)+Math.sin(Math.PI*audio.currentTime/ws)+Math.sin(Math.sqrt(2)*audio.currentTime/ws))+30
		}
		if (hell) {
			var ws = 0.5;
			window.scrollSpeed = 4*(Math.sin(audio.currentTime/ws)+Math.sin(Math.PI*audio.currentTime/ws)+Math.sin(Math.sqrt(2)*audio.currentTime/ws))+30
		}
		if (unreadable) {
			var ws = 0.25;
			window.scrollSpeed = 3*(Math.sin(audio.currentTime/ws)+Math.sin(Math.PI*audio.currentTime/ws)+Math.sin(Math.sqrt(2)*audio.currentTime/ws))+20
		}
		var chunkedOffset = 0;
		if (chunked) {
			noteS = (loadedMap.notes.filter(e => e.s < audio.currentTime*1000)[loadedMap.notes.filter(e => e.s < audio.currentTime*1000).length-1] || 0).s;
			chunkedOffset = Math.min((audio.currentTime*1000-noteS)/1000, 0.25);
		}
		if (halfChunked) {
			noteS = (loadedMap.notes.filter(e => e.s < audio.currentTime*1000)[loadedMap.notes.filter(e => e.s < audio.currentTime*1000).length-1] || 0).s;
			chunkedOffset = Math.min((audio.currentTime*1000-noteS)/1000, 0.5)/2;
		}
		window.scrollSpeed /= window.audio.playbackRate;
		healthAnim = 0.9*healthAnim + 0.1*health;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = skins[skin].bgColor;
		ctx.fillRect(window.innerWidth/2-maniaWidth/2, 0, maniaWidth, window.innerHeight);
		for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
			ctx.drawImage(skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]], window.innerWidth/2-maniaWidth/2+maniaWidth/loadedMap.general.keys*i, window.innerHeight-bottomHeight, maniaWidth/loadedMap.general.keys, skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].height * (maniaWidth/loadedMap.general.keys/skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].width))
		}
		for (var i = 0; i < Math.min(filteredNotes.length, 100); i++) {
			var note = filteredNotes[i];
			ctx.fillStyle = lnPatterns[skins[skin].keycolors[loadedMap.general.keys][note.l]];
			ctx.save();
			ctx.translate(window.innerWidth/2-maniaWidth/2 + maniaWidth/loadedMap.general.keys*note.l, window.innerHeight-(scrollSpeed/20)*(note.e-(audio.currentTime-chunkedOffset)*1000)+(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.width)-((maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)*(globalVisualOffset + skins[skin].offset)));
			if (note.e) {
				ctx.fillRect(0, 0, maniaWidth/loadedMap.general.keys, note.triggered ? ((scrollSpeed/20)*(note.e-(audio.currentTime-chunkedOffset)*1000)-(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.width)+(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)/2 - ((maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)*(globalVisualOffset + skins[skin].offset))) : ((scrollSpeed/20)*(note.e-note.s)-(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.width)+(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)/2));
			}
			ctx.restore();
			if (!note.triggered || note.s > (audio.currentTime-chunkedOffset)*1000) ctx.drawImage(skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note, window.innerWidth/2-maniaWidth/2 + maniaWidth/loadedMap.general.keys*note.l, window.innerHeight-(scrollSpeed/20)*(note.s-(audio.currentTime-chunkedOffset)*1000)-((maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)*(globalVisualOffset + skins[skin].offset)), maniaWidth/loadedMap.general.keys, maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)
			ctx.drawImage(skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end, window.innerWidth/2-maniaWidth/2 + maniaWidth/loadedMap.general.keys*note.l, window.innerHeight-(scrollSpeed/20)*(note.e-(audio.currentTime-chunkedOffset)*1000)-((maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)*(globalVisualOffset + skins[skin].offset)), maniaWidth/loadedMap.general.keys, maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.width)
			if (note.s-audio.currentTime*1000 < -window50 && !note.triggered) {
				filteredNotes[i].h = true;
				window.filteredNotes = window.loadedMap.notes.filter(e => !e.h);
				i--;
				lastHit = "miss";
				if (variableSpeed) audio.playbackRate *= speedAcc(accMiss);
				health -= 8;
				combo = 0;
				totalAcc += accMiss;
				notesHit++;
				hitsMiss++;
				lastHitT = audio.currentTime*1000;
				health = Math.max(health, 0)
			}
		}
		if (skins[skin].keyFront) {
			for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
				ctx.drawImage(skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]], window.innerWidth/2-maniaWidth/2+maniaWidth/loadedMap.general.keys*i, window.innerHeight-bottomHeight, maniaWidth/loadedMap.general.keys, skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].height * (maniaWidth/loadedMap.general.keys/skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].width))
			}
		}
		if ((lastHitT - audio.currentTime*1000)/audio.playbackRate > -500) {
			ctx.fillStyle = ({
				"Max": "#FAF6E6",
				"300": "#F3DC2A",
				"200": "#74F32A",
				"100": "#4AAAFB",
				"50": "#A345F4",
				"miss": "#EE1212",
			})[lastHit]
			var frame = (lastHitT - audio.currentTime*1000)/audio.playbackRate;
			var s = (-frame/500-1)**4+4;
			ctx.font = s + "vw Arial"
			ctx.textAlign = "center";
			if (lastHit == "miss") ctx.drawImage(skins[skin].hitMiss, window.innerWidth/2 - (1-(s-4)/4)*skins[skin].hitMiss.width/2, window.innerHeight/3 - (1-(s-4)/4)*skins[skin].hitMiss.height/2, (1-(s-4)/4)*skins[skin].hitMiss.width, (1-(s-4)/4)*skins[skin].hitMiss.height)
			if (lastHit == "Max") ctx.drawImage(skins[skin].hitMax, window.innerWidth/2 - (1-(s-4)/4)*skins[skin].hitMax.width/2, window.innerHeight/3 - (1-(s-4)/4)*skins[skin].hitMax.height/2, (1-(s-4)/4)*skins[skin].hitMax.width, (1-(s-4)/4)*skins[skin].hitMax.height)
			if (lastHit == "300") ctx.drawImage(skins[skin].hit300, window.innerWidth/2 - (1-(s-4)/4)*skins[skin].hit300.width/2, window.innerHeight/3 - (1-(s-4)/4)*skins[skin].hit300.height/2, (1-(s-4)/4)*skins[skin].hit300.width, (1-(s-4)/4)*skins[skin].hit300.height)
			if (lastHit == "200") ctx.drawImage(skins[skin].hit200, window.innerWidth/2 - (1-(s-4)/4)*skins[skin].hit200.width/2, window.innerHeight/3 - (1-(s-4)/4)*skins[skin].hit200.height/2, (1-(s-4)/4)*skins[skin].hit200.width, (1-(s-4)/4)*skins[skin].hit200.height)
			if (lastHit == "100") ctx.drawImage(skins[skin].hit100, window.innerWidth/2 - (1-(s-4)/4)*skins[skin].hit100.width/2, window.innerHeight/3 - (1-(s-4)/4)*skins[skin].hit100.height/2, (1-(s-4)/4)*skins[skin].hit100.width, (1-(s-4)/4)*skins[skin].hit100.height)
			if (lastHit == "50") ctx.drawImage(skins[skin].hit50, window.innerWidth/2 - (1-(s-4)/4)*skins[skin].hit50.width/2, window.innerHeight/3 - (1-(s-4)/4)*skins[skin].hit50.height/2, (1-(s-4)/4)*skins[skin].hit50.width, (1-(s-4)/4)*skins[skin].hit50.height)
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			var combostr = String(combo);
			for (var i = 0; i < combostr.length; i++) {
				ctx.drawImage(skins[skin].combo[Number(combostr[i])], window.innerWidth/2-skins[skin].combo[Number(combostr[i])].width/2 + (i-(combostr.length-1)/2)*skins[skin].combo[Number(combostr[i])].width, (window.innerHeight/2-skins[skin].combo[Number(combostr[i])].height/2)+(1-s/4)*skins[skin].combo[Number(combostr[i])].height/2, skins[skin].combo[Number(combostr[i])].width, s/4*skins[skin].combo[Number(combostr[i])].height);
			}
			ctx.globalAlpha = 1;
			var size = window.innerWidth/8;
			ctx.fillStyle = "#db6e6e";
			ctx.fillRect(window.innerWidth/2-size/2/window50*missWindow, (1/2+1/6)*window.innerHeight-window.innerHeight/200, size/window50*missWindow, window.innerHeight/100);
			ctx.fillStyle = "#986edb";
			ctx.fillRect(window.innerWidth/2-size/2, (1/2+1/6)*window.innerHeight-window.innerHeight/200, window.innerWidth/10, window.innerHeight/100);
			ctx.fillStyle = "#3283a8";
			ctx.fillRect(window.innerWidth/2-size/2/window50*window100, (1/2+1/6)*window.innerHeight-window.innerHeight/200, size/window50*window100, window.innerHeight/100);
			ctx.fillStyle = "#32a84a";
			ctx.fillRect(window.innerWidth/2-size/2/window50*window200, (1/2+1/6)*window.innerHeight-window.innerHeight/200, size/window50*window200, window.innerHeight/100);
			ctx.fillStyle = "#e6ed98";
			ctx.fillRect(window.innerWidth/2-size/2/window50*window300, (1/2+1/6)*window.innerHeight-window.innerHeight/200, size/window50*window300, window.innerHeight/100);
			ctx.fillStyle = "#cfcfcf";
			ctx.fillRect(window.innerWidth/2-size/2/window50*windowMax, (1/2+1/6)*window.innerHeight-window.innerHeight/200, size/window50*windowMax, window.innerHeight/100);
			ctx.fillStyle = "white";
			for (var i = 0; i < Math.min(hitTimings.length, 10); i++) {
				ctx.globalAlpha = (10-i)/10;
				ctx.fillRect(((hitTimings[i]/window50/audio.playbackRate+1)/2)*(window.innerWidth/10)-window.innerWidth/800+window.innerWidth/2-window.innerWidth/20, (1/2+1/6)*window.innerHeight-window.innerHeight/32, window.innerWidth/400, window.innerHeight/16);
			}
			ctx.globalAlpha = 1;
		} else {
			ctx.font = "4vw Arial"
		}
		if (filteredNotes[0] && audio.currentTime*1000+audio.playbackRate*1000 < filteredNotes[0].s) {
			ctx.drawImage(skins[skin].skip, window.innerWidth-skins[skin].skip.width, window.innerHeight-skins[skin].skip.height);
		}
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.fillText("x" + combo, window.innerWidth, window.innerHeight);
		ctx.fillStyle = "white";
		ctx.textAlign = "left";
		ctx.font = "3vw Arial"
		ctx.fillText((Math.round(totalAcc/notesHit*10000)/100).toFixed(2) + "%", window.innerWidth/8, window.innerHeight/15);
		var rank = rankAccs[0][1];
		for (var i = 0; i < rankAccs.length; i++) {
			rank = rankAccs[i][1];
			if (totalAcc/notesHit >= rankAccs[i][0]/100) i = rankAccs.length;
		}
		ctx.drawImage(skins[skin][rank], window.innerWidth/8, window.innerHeight/14);
		ctx.fillStyle = "white";
		ctx.fillRect(0, window.innerHeight*(100-healthAnim)/100, window.innerWidth/50, window.innerHeight);
		ctx.fillStyle = "#5eeb34";
		ctx.fillRect(window.innerWidth/10-window.innerWidth/200, 0, window.innerWidth/100, window.innerHeight);
		for (var i = 0; i < hitTimings.length; i++) {
			ctx.globalAlpha = 0.3;
			ctx.fillStyle = "white";
			ctx.fillRect(window.innerWidth/10-window.innerWidth/50, ((hitTimings[i]/window50+1)/2)*window.innerHeight, window.innerWidth/25, 3);
		}
		ctx.globalAlpha = 1;
		var nps = Math.round(loadedMap.notes.filter(e => e.s > audio.currentTime*1000 && e.s < audio.currentTime*1000+(audio.playbackRate*1e4)).length/10*100)/100;
		ctx.fillStyle = "#5c5c5c";
		ctx.fillRect(window.innerWidth - (window.innerWidth * 1/7.8), 0, window.innerWidth * 1/7.8, window.innerHeight * 1/7.8);
		ctx.fillStyle = "#212121";
		ctx.fillRect(window.innerWidth - (window.innerWidth * 1/8), 0, window.innerWidth * 1/8, window.innerHeight * 1/8);
		ctx.textAlign = "center";
		ctx.fillStyle = npsColors.filter(e => e[0] > nps)[0][1];
		ctx.font = "5vw Arial";
		ctx.fillText(nps, window.innerWidth - (window.innerWidth * 1/16), window.innerHeight * 1/10);
		requestAnimationFrame(renderScreen);
		recF++;
		if (new Date().getTime() % 2000 > 1000) {
			if (recF > 1) {
				console.log("fps", recF)
				window.fps = recF;
			}
			recF = 0;
		}
		if (audio.currentTime == audio.duration || !filteredNotes[0]) setTimeout(e => {resultsScreen = true; ingame = false}, 500);
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "white";
		if (audio.currentTime*1000-startT < 0) {
			ctx.fillStyle = "#3FE46E";
			ctx.fillRect(0, 0, audio.currentTime*1000/startT*window.innerWidth, 10);
		}
		else if (filteredNotes[0]) ctx.fillRect(0, 0, (audio.currentTime*1000-startT)/(Math.max(filteredNotes[filteredNotes.length-1].s, filteredNotes[filteredNotes.length-1].e || 0) - startT) * window.innerWidth, 10)
		else ctx.fillRect(0, 0, window.innerWidth, 10);
		ctx.globalAlpha = 1;
		var nps = Math.round(loadedMap.notes.filter(e => e.s > audio.currentTime*1000 && e.s < audio.currentTime*1000+(audio.playbackRate*1e4)).length/10*100)/100;
		ctx.fillStyle = "#5c5c5c";
		ctx.fillRect(window.innerWidth - (window.innerWidth * 1/7.8), 0, window.innerWidth * 1/7.8, window.innerHeight * 1/7.8);
		ctx.fillStyle = "#212121";
		ctx.fillRect(window.innerWidth - (window.innerWidth * 1/8), 0, window.innerWidth * 1/8, window.innerHeight * 1/8);
		ctx.textAlign = "center";
		ctx.fillStyle = npsColors.filter(e => e[0] > nps)[0][1];
		ctx.font = "2.5vw Arial";
		ctx.fillText(nps + "nps", window.innerWidth - (window.innerWidth * 1/16), window.innerHeight * 1/18);
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.fillText(fps, window.innerWidth - (window.innerWidth * 0.2/16), window.innerHeight * 3.2/18);
		ctx.textAlign = "center";
		ctx.fillStyle = speedColors.filter(e => e[0] > audio.playbackRate)[0][1];
		ctx.fillText(Math.round(100*audio.playbackRate)/100 + "x", window.innerWidth - (window.innerWidth * 1/16), window.innerHeight * 1/9 );
	} else if (resultsScreen) {
		document.getElementById("notCanvas").style.display = "none";
		document.body.style.overflow = "hidden";
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.font = "4vw Arial";
		ctx.fillText("Accuracy: " + (Math.round(totalAcc/notesHit*10000)/100).toFixed(2), window.innerWidth/2, 2/10*window.innerHeight);
		ctx.fillText("Max Combo: " + maxCombo, window.innerWidth/2, 3/10*window.innerHeight);
		ctx.fillText("Max: " + hitsMax, 1/3*window.innerWidth, 4/10*window.innerHeight);
		ctx.fillText("300: " + hits300, 2/3*window.innerWidth, 4/10*window.innerHeight);
		ctx.fillText("200: " + hits200, 1/3*window.innerWidth, 5/10*window.innerHeight);
		ctx.fillText("100: " + hits100, 2/3*window.innerWidth, 5/10*window.innerHeight);
		ctx.fillText("50: " + hits50, 1/3*window.innerWidth, 6/10*window.innerHeight);
		ctx.fillText("Miss:  " + hitsMiss, 2/3*window.innerWidth, 6/10*window.innerHeight);
		ctx.fillText("Press ESC to exit", 1/2*window.innerWidth, 7/10*window.innerHeight);
	} else {
		canvas.width = 0;
		canvas.height = 0;
		document.body.style.overflowY = "scroll";
	}
}

for (var i = 0; i < Object.keys(keybinds).length; i++) {
	for (var j = 0; j < keybinds[Object.keys(keybinds)[i]].length; j++) {
		keysPressed[keybinds[Object.keys(keybinds)[i]][j]] = 0;
	}
}

window.onkeydown = e => {
	if (e.key == "Enter") {
		if (audio.currentTime*1000+audio.playbackRate*500 < loadedMap.notes.filter(e => !e.h)[0].s) audio.currentTime = loadedMap.notes.filter(e => !e.h)[0].s/1000-0.5*audio.playbackRate;
	}
	if (e.key == "Tab") {
		return false;
	}
	if (e.key == "Escape") {
		if (!resultsScreen) {
			if (audio.paused) audio.play()
			else audio.pause()
		} else {
			resultsScreen = false;
			ingame = false;
			document.body.style.overflowY = "scroll";
			document.getElementById("notCanvas").style.display = "block";
			document.getElementById("c").style.display = "none";
		}
	}
	if (keybinds[loadedMap.general.keys].includes(e.key.toLowerCase()) && keysPressed[e.key.toLowerCase()] == 0) {
		for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
			if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) var noteTest = loadedMap.notes.indexOf(loadedMap.notes.filter(e => !e.h).filter(e => e.l == i)[0]);
		}
		if (noteTest > -1 && Math.abs(loadedMap.notes[noteTest].s-audio.currentTime*1000) < missWindow*window.audio.playbackRate) {
			if (Math.abs(loadedMap.notes[noteTest].s-audio.currentTime*1000) < window50*window.audio.playbackRate) {
				if (Math.abs(loadedMap.notes[noteTest].s-audio.currentTime*1000) < window100*window.audio.playbackRate) {
					if (Math.abs(loadedMap.notes[noteTest].s-audio.currentTime*1000) < window200*window.audio.playbackRate) {
						if (Math.abs(loadedMap.notes[noteTest].s-audio.currentTime*1000) < window300*window.audio.playbackRate) {
							if (Math.abs(loadedMap.notes[noteTest].s-audio.currentTime*1000) < windowMax*window.audio.playbackRate) {
								lastHit = "Max";
								health += healthMax;
								totalAcc += accMax;
								if (variableSpeed) audio.playbackRate *= speedAcc(accMax);
								notesHit++;
								hitsMax++;
								if (variableSpeed) audio.playbackRate *= variableSpeedMax;
							} else {
								lastHit = "300";
								health += health300;
								totalAcc += acc300;
								if (variableSpeed) audio.playbackRate *= speedAcc(acc300);
								notesHit++;
								hits300++;
							}
						} else {
							lastHit = "200";
							health += health200;
							totalAcc += acc200;
							if (variableSpeed) audio.playbackRate *= speedAcc(acc200);
							notesHit++;
							hits200++;
						}
					} else {
						lastHit = "100";
						health += health100;
						totalAcc += acc100;
						if (variableSpeed) audio.playbackRate *= speedAcc(acc100);
						notesHit++;
						hits100++;
					}
				} else {
					lastHit = "50";
					health += health50;
					totalAcc += acc50;
					if (variableSpeed) audio.playbackRate *= speedAcc(acc50);
					notesHit++;
					hits50++;
				}
				combo++;
				hitTimings.unshift(loadedMap.notes[noteTest].s-audio.currentTime*1000);
				if (hitTimings.length >= 50) hitTimings.pop();
			} else {
				lastHit = "miss";
				health += healthMiss;
				totalAcc += accMiss;
				if (variableSpeed) audio.playbackRate *= speedAcc(accMiss);
				notesHit++;
				hitsMiss++;
				combo = 0;
			}
			health = Math.max(health, 0)
			health = Math.min(health, 100)
			lastHitT = audio.currentTime*1000;
			if (window.loadedMap.notes[noteTest].e) {
				window.loadedMap.notes[noteTest].triggered = true;
			} else {
				window.loadedMap.notes[noteTest].h = true;
				window.filteredNotes = window.loadedMap.notes.filter(e => !e.h);
			}
		}
	}
	for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
		if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) keysPressed[keybinds[loadedMap.general.keys][i]] = 1;
	}
}

window.onkeyup = e => {
	for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
		if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) var noteTest = loadedMap.notes.indexOf(loadedMap.notes.filter(e => !e.h).filter(e => e.l == i)[0]);
	}
	if (noteTest > -1 && loadedMap.notes[noteTest].triggered && Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < missWindow*window.audio.playbackRate) {
		if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window50*window.audio.playbackRate) {
			if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window100*window.audio.playbackRate) {
				if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window200*window.audio.playbackRate) {
					if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window300*window.audio.playbackRate) {
						if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < windowMax*window.audio.playbackRate) {
							lastHit = "Max";
							health += healthMax;
							totalAcc += accMax;
							notesHit++;
							hitsMax++;
							if (variableSpeed) audio.playbackRate *= speedAcc(accMax);
						} else {
							lastHit = "300";
							health += health300;
							totalAcc += acc300;
							if (variableSpeed) audio.playbackRate *= speedAcc(acc300);
							notesHit++;
							hits300++;
						}
					} else {
						lastHit = "200";
						health += health200;
						totalAcc += acc200;
						if (variableSpeed) audio.playbackRate *= speedAcc(acc200);
						notesHit++;
						hits200++;
					}
				} else {
					lastHit = "200";
					health += health200;
					totalAcc += acc200;
					if (variableSpeed) audio.playbackRate *= speedAcc(acc200);
					notesHit++;
					hits200++;
				}
			} else {
				lastHit = "200";
				health += health200;
				totalAcc += acc200;
				if (variableSpeed) audio.playbackRate *= speedAcc(acc200);
				notesHit++;
				hits200++;
			}
			combo++;
			hitTimings.unshift(loadedMap.notes[noteTest].e-audio.currentTime*1000);
			if (hitTimings.length >= 50) hitTimings.pop();
		} else {
			lastHit = "200";
			health += health200;
			totalAcc += acc200;
			if (variableSpeed) audio.playbackRate *= speedAcc(acc200);
			notesHit++;
			hits200++;
		}
		health = Math.max(health, 0)
		health = Math.min(health, 100)
		lastHitT = audio.currentTime*1000;
		window.loadedMap.notes[noteTest].h = true;
		window.filteredNotes = window.loadedMap.notes.filter(e => !e.h);
	} else if (noteTest > -1 && loadedMap.notes[noteTest].triggered) {
		if (loadedMap.notes[noteTest].e-audio.currentTime*1000 > 0) {
			lastHit = "miss";
			if (variableSpeed) audio.playbackRate *= variableSpeedMiss;
			health += healthMiss;
			totalAcc += accMiss;
			if (variableSpeed) audio.playbackRate *= speedAcc(accMiss);
			hitsMiss++;
			combo = 0;
		} else {
			lastHit = "200";
			health += health200;
			totalAcc += acc200;
			if (variableSpeed) audio.playbackRate *= speedAcc(acc200);
			hits200++;
		}
		notesHit++;
		health = Math.max(health, 0)
		health = Math.min(health, 100)
		lastHitT = audio.currentTime*1000;
		window.loadedMap.notes[noteTest].h = true;
		window.filteredNotes = window.loadedMap.notes.filter(e => !e.h);
	}
	for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
		if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) keysPressed[keybinds[loadedMap.general.keys][i]] = 0;
	}
}