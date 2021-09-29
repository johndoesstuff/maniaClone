var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

renderScreen();

skin = (window.location.href.split("skin=")[1] || "").split("&")[0] || "quaver";

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
	18: "qawsedrfvnjukilo;p".split(""),
};

window.rankAccs = [
	[100, "rankX"],
	[95, "rankS"],
	[90, "rankA"],
	[80, "rankB"],
	[70, "rankC"],
	[0, "rankD"],
];

function loadMap(map) {
	ingame = true;
	window.loadedMap = map;
	window.audio = map.audio;
	window.maniaWidth = skins[skin].widthMult*Math.sqrt(map.general.keys)/2*window.defaultManiaWidth;
	variableSpeed = document.getElementById("variableSpeed").checked;
	if (document.getElementById("random").checked) {
		loadedMap.notes.forEach(e=>{e.l+=Number(loadedMap.general.keys)});
		var rnd = Array(Number(loadedMap.general.keys)).fill(0).map((e,i)=>i).sort(e=>Math.random()-0.5);
		loadedMap.notes.forEach(e=>{e.l = rnd[e.l-Number(loadedMap.general.keys)]});
	}
	window.audio.playbackRate = Number(document.getElementById("speed").value)
	window.audio.volume = 0.1;
	setTimeout(() => {window.audio.play()}, 500);
	renderScreen();
	maxCombo = 0;
	startT = loadedMap.notes[0].s || 0;
}

function makeImg(e) { var img = new Image(); img.src = e; return img; }

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

var recF = 0;
var window50 = 127;
var window100 = 103;
var window200 = 73;
var window300 = 40.33;
var windowMax = 16.33
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
var missWindow = 164;
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

function renderScreen() {
	if (ingame) {
		if (combo > maxCombo) maxCombo = combo;
		document.body.style.overflow = "hidden";
		document.getElementById("notCanvas").style.display = "none";
		window.maniaWidth = skins[skin].widthMult*Math.sqrt(loadedMap.general.keys)/2*window.defaultManiaWidth;
		var lnCanvases = Array(skins[skin].notes.length).fill(0).map(e => document.createElement("canvas"));
		lnCanvases.forEach(e => e.width = (Math.ceil(maniaWidth/loadedMap.general.keys)));
		lnCanvases.forEach((e, i) => e.height = Math.floor(e.width*skins[skin].notes[i].mid.height/skins[skin].notes[i].mid.width));
		lnCanvases.forEach((e, i) => e.getContext("2d").drawImage(skins[skin].notes[i].mid, 0, 0, e.width, e.height));
		window.scrollSpeed = Number((window.location.href.split("speed=")[1] || "").split("&")[0]) || 32;
		window.scrollSpeed /= window.audio.playbackRate;
		healthAnim = 0.9*healthAnim + 0.1*health;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = skins[skin].bgColor;
		ctx.fillRect(window.innerWidth/2-maniaWidth/2, 0, maniaWidth, window.innerHeight);
		for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
			//ctx.drawImage([images[(["out", "in", "mid"])[keycolors[loadedMap.general.keys][i]] + "_r"], images[(["out", "in", "mid"])[keycolors[loadedMap.general.keys][i]] + "_p"]][keysPressed[keybinds[loadedMap.general.keys][i]]], window.innerWidth/2-maniaWidth/2+maniaWidth/loadedMap.general.keys*i, window.innerHeight-bottomHeight, maniaWidth/loadedMap.general.keys, images.out_r.height * (maniaWidth/loadedMap.general.keys/images.out_r.width))
			ctx.drawImage(skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]], window.innerWidth/2-maniaWidth/2+maniaWidth/loadedMap.general.keys*i, window.innerHeight-bottomHeight, maniaWidth/loadedMap.general.keys, skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].height * (maniaWidth/loadedMap.general.keys/skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].width))
		}
		for (var i = 0; i < Math.min(window.loadedMap.notes.length, 100); i++) {
			var note = window.loadedMap.notes[i];
			ctx.fillStyle = ctx.createPattern(lnCanvases[skins[skin].keycolors[loadedMap.general.keys][note.l]], "repeat-y");
			ctx.save();
			ctx.translate(window.innerWidth/2-maniaWidth/2 + maniaWidth/loadedMap.general.keys*note.l, window.innerHeight-(scrollSpeed/20)*(note.e-audio.currentTime*1000)+(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.width)-((maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)*(globalVisualOffset + skins[skin].offset)));
			if (note.e) ctx.fillRect(0, 0, maniaWidth/loadedMap.general.keys, (scrollSpeed/20)*(note.e-note.s)-(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.width)+(maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)/2);
			ctx.restore();
			ctx.drawImage(skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note, window.innerWidth/2-maniaWidth/2 + maniaWidth/loadedMap.general.keys*note.l, window.innerHeight-(scrollSpeed/20)*(note.s-audio.currentTime*1000)-((maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)*(globalVisualOffset + skins[skin].offset)), maniaWidth/loadedMap.general.keys, maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)
			ctx.drawImage(skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end, window.innerWidth/2-maniaWidth/2 + maniaWidth/loadedMap.general.keys*note.l, window.innerHeight-(scrollSpeed/20)*(note.e-audio.currentTime*1000)-((maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].note.width)*(globalVisualOffset + skins[skin].offset)), maniaWidth/loadedMap.general.keys, maniaWidth/loadedMap.general.keys*skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.height/skins[skin].notes[skins[skin].keycolors[loadedMap.general.keys][note.l]].end.width)
			if (note.s-audio.currentTime*1000 < -window50 && !note.triggered) {
				window.loadedMap.notes = window.loadedMap.notes.slice(0, i).concat(window.loadedMap.notes.slice(i+1, window.loadedMap.notes.length))
				i--;
				lastHit = "miss";
				if (variableSpeed) audio.playbackRate *= variableSpeedMiss;
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
				//ctx.drawImage([images[(["out", "in", "mid"])[keycolors[loadedMap.general.keys][i]] + "_r"], images[(["out", "in", "mid"])[keycolors[loadedMap.general.keys][i]] + "_p"]][keysPressed[keybinds[loadedMap.general.keys][i]]], window.innerWidth/2-maniaWidth/2+maniaWidth/loadedMap.general.keys*i, window.innerHeight-bottomHeight, maniaWidth/loadedMap.general.keys, images.out_r.height * (maniaWidth/loadedMap.general.keys/images.out_r.width))
				ctx.drawImage(skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]], window.innerWidth/2-maniaWidth/2+maniaWidth/loadedMap.general.keys*i, window.innerHeight-bottomHeight, maniaWidth/loadedMap.general.keys, skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].height * (maniaWidth/loadedMap.general.keys/skins[skin].keys[skins[skin].keycolors[loadedMap.general.keys][i]][!!keysPressed[keybinds[loadedMap.general.keys][i]]].width))
			}
		}
		if (lastHitT - audio.currentTime*1000 > -500) {
			ctx.fillStyle = ({
				"Max": "#FAF6E6",
				"300": "#F3DC2A",
				"200": "#74F32A",
				"100": "#4AAAFB",
				"50": "#A345F4",
				"miss": "#EE1212",
			})[lastHit]
			var frame = lastHitT - audio.currentTime*1000;
			var s = (-frame/500-1)**4+4;
			ctx.font = s + "vw Arial"
			ctx.textAlign = "center";
			if (lastHit == "miss") ctx.drawImage(skins[skin].hitMiss, window.innerWidth/2 - skins[skin].hitMiss.width/2, window.innerHeight/3 - skins[skin].hitMiss.height/2 + 5*(s-4))
			if (lastHit == "Max") ctx.drawImage(skins[skin].hitMax, window.innerWidth/2 - skins[skin].hitMax.width/2, window.innerHeight/3 - skins[skin].hitMax.height/2 + 5*(s-4))
			if (lastHit == "300") ctx.drawImage(skins[skin].hit300, window.innerWidth/2 - skins[skin].hit300.width/2, window.innerHeight/3 - skins[skin].hit300.height/2 + 5*(s-4))
			if (lastHit == "200") ctx.drawImage(skins[skin].hit200, window.innerWidth/2 - skins[skin].hit200.width/2, window.innerHeight/3 - skins[skin].hit200.height/2 + 5*(s-4))
			if (lastHit == "100") ctx.drawImage(skins[skin].hit100, window.innerWidth/2 - skins[skin].hit100.width/2, window.innerHeight/3 - skins[skin].hit100.height/2 + 5*(s-4))
			if (lastHit == "50") ctx.drawImage(skins[skin].hit50, window.innerWidth/2 - skins[skin].hit50.width/2, window.innerHeight/3 - skins[skin].hit50.height/2 + 5*(s-4))
			//ctx.fillText(lastHit, window.innerWidth/2, window.innerHeight/2)
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
				ctx.fillRect(((hitTimings[i]/window50+1)/2)*(window.innerWidth/10)-window.innerWidth/800+window.innerWidth/2-window.innerWidth/20, (1/2+1/6)*window.innerHeight-window.innerHeight/32, window.innerWidth/400, window.innerHeight/16);
			}
			ctx.globalAlpha = 1;
			//ctx.fillText(combo, window.innerWidth/2, window.innerHeight/2)
		} else {
			ctx.font = "4vw Arial"
		}
		if (loadedMap.notes[0] && audio.currentTime*1000+audio.playbackRate*1000 < loadedMap.notes[0].s) {
			ctx.drawImage(skins[skin].skip, window.innerWidth-skins[skin].skip.width, window.innerHeight-skins[skin].skip.height);
		}
		ctx.fillStyle = "white";
		ctx.textAlign = "right";
		ctx.fillText("x" + combo, window.innerWidth, window.innerHeight);
		ctx.fillStyle = "white";
		ctx.textAlign = "left";
		ctx.font = "3vw Arial"
		ctx.fillText(Math.round(totalAcc/notesHit*10000)/100 + "%", window.innerWidth/8, window.innerHeight/15);
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
		requestAnimationFrame(renderScreen);
		recF++;
		if (new Date().getTime() % 2000 > 1000) {
			if (recF > 1) console.log("fps", recF)
			recF = 0;
		}
		if (audio.currentTime == audio.duration || !loadedMap.notes[0]) setTimeout(e => {resultsScreen = true; ingame = false}, 500);
		ctx.globalAlpha = 0.5;
		ctx.fillStyle = "white";
		if (audio.currentTime*1000-startT < 0) {
			ctx.fillStyle = "#3FE46E";
			ctx.fillRect(0, 0, audio.currentTime*1000/startT*window.innerWidth, 10);
		}
		else if (loadedMap.notes[0]) ctx.fillRect(0, 0, (audio.currentTime*1000-startT)/(Math.max(loadedMap.notes[loadedMap.notes.length-1].s, loadedMap.notes[loadedMap.notes.length-1].e || 0) - startT) * window.innerWidth, 10)
		else ctx.fillRect(0, 0, window.innerWidth, 10);
		ctx.globalAlpha = 1;
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
		ctx.fillText("Accuracy: " + Math.round(totalAcc/notesHit*10000)/100, window.innerWidth/2, 2/10*window.innerHeight);
		ctx.fillText("Max Combo: " + maxCombo, window.innerWidth/2, 3/10*window.innerHeight);
		ctx.fillText("Max: " + hitsMax, 1/3*window.innerWidth, 4/10*window.innerHeight);
		ctx.fillText("300: " + hits300, 2/3*window.innerWidth, 4/10*window.innerHeight);
		ctx.fillText("200: " + hits200, 1/3*window.innerWidth, 5/10*window.innerHeight);
		ctx.fillText("100: " + hits100, 2/3*window.innerWidth, 5/10*window.innerHeight);
		ctx.fillText("50: " + hits50, 1/3*window.innerWidth, 6/10*window.innerHeight);
		ctx.fillText("Miss: " + hitsMiss, 2/3*window.innerWidth, 6/10*window.innerHeight);
	} else {
		canvas.width = 0;
		canvas.height = 0;
		document.body.style.overflow = "default";
	}
}

for (var i = 0; i < Object.keys(keybinds).length; i++) {
	for (var j = 0; j < keybinds[Object.keys(keybinds)[i]].length; j++) {
		keysPressed[keybinds[Object.keys(keybinds)[i]][j]] = 0;
	}
}

window.onkeydown = e => {
	if (e.key == "Enter") {
		if (audio.currentTime*1000+audio.playbackRate*500 < loadedMap.notes[0].s) audio.currentTime = loadedMap.notes[0].s/1000-1*audio.playbackRate;
	}
	if (e.key == "Tab") {
		return false;
	}
	if (e.key == "Escape") {
		if (audio.paused) audio.play()
		else audio.pause()
	}
	if (keybinds[loadedMap.general.keys].includes(e.key.toLowerCase()) && keysPressed[e.key.toLowerCase()] == 0) {
		//a= new Audio("hit.wav");
		//a.volume = 0.2;
		//a.play();
		for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
			if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) var noteTest = loadedMap.notes.indexOf(loadedMap.notes.filter(e => e.l == i)[0]);
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
								notesHit++;
								hitsMax++;
								if (variableSpeed) audio.playbackRate *= variableSpeedMax;
							} else {
								lastHit = "300";
								health += health300;
								totalAcc += acc300;
								notesHit++;
								hits300++;
							}
						} else {
							lastHit = "200";
							health += health200;
							totalAcc += acc200;
							notesHit++;
							hits200++;
						}
					} else {
						lastHit = "100";
						health += health100;
						totalAcc += acc100;
						notesHit++;
						hits100++;
					}
				} else {
					lastHit = "50";
					health += health50;
					totalAcc += acc50;
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
				notesHit++;
				hitsMiss++;
				combo = 0;
				if (variableSpeed) audio.playbackRate *= variableSpeedMiss;
			}
			health = Math.max(health, 0)
			health = Math.min(health, 100)
			lastHitT = audio.currentTime*1000;
			if (window.loadedMap.notes[noteTest].e) {
				window.loadedMap.notes[noteTest].triggered = true;
			} else {
				window.loadedMap.notes = window.loadedMap.notes.slice(0, noteTest).concat(window.loadedMap.notes.slice(noteTest+1, window.loadedMap.notes.length));
			}
		}
	}
	for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
		if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) keysPressed[keybinds[loadedMap.general.keys][i]] = 1;
	}
}

window.onkeyup = e => {
	for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
		if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) var noteTest = loadedMap.notes.indexOf(loadedMap.notes.filter(e => e.l == i)[0]);
	}
	if (noteTest > -1 && loadedMap.notes[noteTest].triggered && Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < missWindow) {
		if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window50) {
			if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window100) {
				if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window200) {
					if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < window300) {
						if (Math.abs(loadedMap.notes[noteTest].e-audio.currentTime*1000) < windowMax) {
							lastHit = "Max";
							health += healthMax;
							totalAcc += accMax;
							notesHit++;
							hitsMax++;
							if (variableSpeed) audio.playbackRate *= variableSpeedMax;
						} else {
							lastHit = "300";
							health += health300;
							totalAcc += acc300;
							notesHit++;
							hits300++;
						}
					} else {
						lastHit = "200";
						health += health200;
						totalAcc += acc200;
						notesHit++;
						hits200++;
					}
				} else {
					lastHit = "200";
					health += health200;
					totalAcc += acc200;
					notesHit++;
					hits200++;
				}
			} else {
				lastHit = "200";
				health += health200;
				totalAcc += acc200;
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
			notesHit++;
			hits200++;
		}
		health = Math.max(health, 0)
		health = Math.min(health, 100)
		lastHitT = audio.currentTime*1000;
		window.loadedMap.notes = window.loadedMap.notes.slice(0, noteTest).concat(window.loadedMap.notes.slice(noteTest+1, window.loadedMap.notes.length));
	} else if (noteTest > -1 && loadedMap.notes[noteTest].triggered) {
		if (loadedMap.notes[noteTest].e-audio.currentTime*1000 > 0) {
			lastHit = "miss";
			if (variableSpeed) audio.playbackRate *= variableSpeedMiss;
			health += healthMiss;
			totalAcc += accMiss;
			hitsMiss++;
			combo = 0;
		} else {
			lastHit = "200";
			health += health200;
			totalAcc += acc200;
			hits200++;
		}
		notesHit++;
		health = Math.max(health, 0)
		health = Math.min(health, 100)
		lastHitT = audio.currentTime*1000;
		window.loadedMap.notes = window.loadedMap.notes.slice(0, noteTest).concat(window.loadedMap.notes.slice(noteTest+1, window.loadedMap.notes.length));
	}
	for (var i = 0; i < keybinds[loadedMap.general.keys].length; i++) {
		if (e.key.toLowerCase() == keybinds[loadedMap.general.keys][i]) keysPressed[keybinds[loadedMap.general.keys][i]] = 0;
	}
}