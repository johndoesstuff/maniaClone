function makeImg(e) { var img = new Image(); img.src = "skins/amogus/" + e; return img; }

window.skins.amogus = {
	bgColor : "black",
	keycolors : {
		1: [0],
		2: [0,1],
		3: [0,1,2],
		4: [0,1,2,3],
		5: [0,2,3,4,5],
		6: [0,1,2,3,4,5],
		7: [0,1,2,3,4,5,6],
		8: [0,1,2,3,4,5,6,7],
		9: [0,1,2,3,4,5,6,7,8],
		10: [0,1,2,3,4,5,6,7,8,9],
		11: [0,1,2,3,4,5,6,7,8,9,10],
		12: [0,1,2,3,4,5,6,7,8,9,10,11],
		13: [0,1,2,3,4,5,6,7,8,9,10,11,0],
		14: [0,1,2,3,4,5,6,7,8,9,10,11,0,1],
		15: [0,1,2,3,4,5,6,7,8,9,10,11,0,1,2],
		16: [0,1,2,3,4,5,6,7,8,9,10,11,0,1,2,3],
		17: [0,1,2,3,4,5,6,7,8,9,10,11,0,1,2,3,4],
		18: [0,1,2,3,4,5,6,7,8,9,10,11,0,1,2,3,4,5],
	},
	offset: 0.75,
	widthMult: 1,
	keyFront: false,
	keys : [
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
		{
			true: makeImg("ventopen.png"),
			false: makeImg("ventclosed.png"),
		},
	],
	notes : [
		{
			note: makeImg("red.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("blue.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("green.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("brown.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("white.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("pink.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("lime.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("black.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("cyan.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("orange.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("purple.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
		},
		{
			note: makeImg("yellow.png"),
			mid: makeImg("hold.png"),
			end: makeImg("tail.png"),
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
		makeImg("d-0.png"),
		makeImg("d-1.png"),
		makeImg("d-2.png"),
		makeImg("d-3.png"),
		makeImg("d-4.png"),
		makeImg("d-5.png"),
		makeImg("d-6.png"),
		makeImg("d-7.png"),
		makeImg("d-8.png"),
		makeImg("d-9.png"),
	],
}