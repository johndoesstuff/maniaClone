function makeImg(e) { var img = new Image(); img.src = "skins/chocomint/" + e; return img; }

window.skins.chocomint = {
	bgColor : "#141414",
	keycolors : {
		1: [0],
		2: [0,0],
		3: [0,2,0],
		4: [0,1,1,0],
		5: [0,1,2,1,0],
		6: [0,1,0,0,1,0],
		7: [0,1,0,2,0,1,0],
		8: [0,1,0,2,2,0,1,0],
		9: [0,1,0,1,2,1,0,1,0],
		10: [0,1,2,1,0,0,1,2,1,0],
		11: [0,1,2,1,0,2,0,1,2,1,0],
		12: [0,1,2,1,0,1,1,0,1,2,1,0],
		13: [0,1,2,1,0,1,2,1,0,1,2,1,0],
		14: [0,1,2,1,0,1,2,2,1,0,1,2,1,0],
		15: [0,1,0,1,0,1,2,1,2,1,0,1,0,1,0],
		16: [0,1,0,1,0,1,2,1,1,2,1,0,1,0,1,0],
		17: [0,1,1,0,1,2,2,1,2,1,2,2,1,0,1,1,0],
		18: [0,1,1,0,1,2,2,1,0,0,1,2,2,1,0,1,1,0],
	},
	offset: 1,
	widthMult: 1.25,
	keyFront: false,
	keys : [
		{
			true: makeImg("keydown.png"),
			false: makeImg("key.png"),
		},
		{
			true: makeImg("keydown.png"),
			false: makeImg("key.png"),
		},
		{
			true: makeImg("keydown.png"),
			false: makeImg("key.png"),
		},
	],
	notes : [
		{
			note: makeImg("note1.png"),
			mid: makeImg("hold1.png"),
			end: makeImg("end1.png"),
		},
		{
			note: makeImg("note2.png"),
			mid: makeImg("hold2.png"),
			end: makeImg("end2.png"),
		},
		{
			note: makeImg("note3.png"),
			mid: makeImg("hold3.png"),
			end: makeImg("end3.png"),
		},
	],
	hitMiss : makeImg("miss.png"),
	hitMax : makeImg("max.png"),
	hit50 : makeImg("50.png"),
	hit100 : makeImg("100.png"),
	hit200 : makeImg("200.png"),
	hit300 : makeImg("300.png"),
	skip : makeImg("skip.png"),
	rankX : makeImg("rank_x.png"),
	rankS : makeImg("rank_s.png"),
	rankA : makeImg("rank_a.png"),
	rankB : makeImg("rank_b.png"),
	rankC : makeImg("rank_c.png"),
	rankD : makeImg("rank_d.png"),
	combo : [
		makeImg("combo-0.png"),
		makeImg("combo-1.png"),
		makeImg("combo-2.png"),
		makeImg("combo-3.png"),
		makeImg("combo-4.png"),
		makeImg("combo-5.png"),
		makeImg("combo-6.png"),
		makeImg("combo-7.png"),
		makeImg("combo-8.png"),
		makeImg("combo-9.png"),
	],
}