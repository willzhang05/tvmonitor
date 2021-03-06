"use strict";
var scale = 1.5,
	w = window.innerWidth,
	h = window.innerHeight,
	dia = false,
	exp = false,
	hov = false,
	tempW, tempH, tempM;
setScale();
displayClock();
window.onresize = function() {
	w = window.innerWidth;
	h = window.innerHeight;
	console.log(w);
	setScale();
}
document.getElementById("add-card-wrapper").onmouseover = function(e) {
    var button = document.getElementById("add-card-wrapper");
	if(parseInt(window.getComputedStyle(button).opacity) <= 0.1) {
		unfade(button);
	}
	hov = true;
};
setInterval(function(){
	var button = document.getElementById("add-card-wrapper");
	if(!hov && parseFloat(window.getComputedStyle(button).opacity) >= 1) {
		fade(button);
	}
	hov = false;  
}, 3000);
function fade(element) {
		var op = 1;  // initial opacity
		var timer = setInterval(function () {
			if (op <= 0.1){
				clearInterval(timer);
				element.style.opacity = '0';
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.1;
		}, 5);
}
function unfade(element) {
		var op = 0.1;  // initial opacity
		var timer = setInterval(function () {
			if (op >= 1){
				clearInterval(timer);
			}
			element.style.opacity = op;
			element.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += op * 0.1;
		}, 5);
}
function setScale() {
	var element = document.getElementById('schedule'),
		style = window.getComputedStyle(element),
		top = style.getPropertyValue('-webkit-transform');
	console.log(top);
	scale =  w * (1.5/1280);
	console.log(scale);
	element.style["-webkit-transform"] = "scale(" + scale + ")";
	element.style["-moz-transform"] = "scale(" + scale + ")";
	element.style["-o-transform"] = "scale(" + scale + ")";
	element.style["-ms-zoom"] = scale + "";
	scale = 1280 / (1.49 * w);
	element.style.width =  (scale * 100) + "%";
}
function displayClock(){var time = setTimeout("displayTime()", 1000)}
function displayTime() {
	document.getElementById("time").innerHTML = new Date().toLocaleTimeString();
	var t = displayClock();
}
function toggleCardDialog() {
	var dlg = document.getElementById("card-dialog");
	if(dia) {
		dlg.style.opacity = "0";
		dlg.style.display = "none";
		dia = false;
	} else {
		dlg.style.opacity = "1";
		dlg.style.display = "block";
		dia = true;	
	}
}
function toggleModExpand(card, expand) {
	if(exp) {
		card.style.width = tempW;
		card.style.height = tempH;
		card.style.margin = tempM;
		card.style.zIndex = "15";
		expand.style.backgroundImage = "url('icons/ic_expand_less_black_48px.svg')";
		exp = false;
	} else {
		tempW = card.style.width;
		tempH = card.style.height;
		tempM = card.style.margin;
		if((card.className).indexOf("plex") > -1) {
			card.style.float = "none";
			card.style.marginLeft = "-30%";
			card.style.marginTop = "-68px";
			card.style.position = "absolute";
			card.style.zIndex = "100000000";
			card.style.width = "100%";
			card.style.height = "100%";
		} else {
			card.style.left = "30%";
			card.style.top = "48px";
			card.style.width = "70%";
			card.style.height = "100%";
			card.style.margin = "-0.25px";
		}
		expand.style.backgroundImage = "url('icons/ic_expand_more_black_48px.svg')";
		exp = true;
	}
}
/*<a class="twitter-timeline" data-dnt="true" href="https://twitter.com/rejectedtjTODAY" data-widget-id="667454451305836544">Tweets by @rejectedtjTODAY</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>*/
var Module = class {
	constructor(s) {
		var parent = document.getElementById("content"),
		modWrap = document.createElement("div"),
		mod = document.createElement("div"),
		bar = document.createElement("div"),
		label = document.createElement("div"),
		expand = document.createElement("button"),
		exit = document.createElement("button"),
		button = document.getElementById("add-card-wrapper");
		modWrap.className = s + " card";
		mod.className = s.substring(0, s.length - 8);
		s = s.substring(0, s.length - 8);
		bar.className = "window-bar";
		label.className = "window-label";
		expand.className = "expand-button";
		exit.className = "exit-button";
		exit.onclick = function() {modWrap.remove()};
		if(s == "nagios") {
			var frame = document.createElement("iframe");
			frame.id = "monitor";
			frame.src = "https://monitor.tjhsst.edu";
			mod.appendChild(frame);
			bar.style.backgroundColor = "#4CAF50";
		} else if(s == "kanboard") {
			var frame = document.createElement("iframe");
			frame.id = "kanboard";
			frame.src = "https://kanboard.tjhsst.edu/?controller=board&action=readonly&token=38f38e592d33edeeb2256b727d431c0dcfcd1a10bf59e40982da14360293";
			mod.appendChild(frame);
			bar.style.backgroundColor = "#D40000";
		} else if(s.includes("block")) {
			var frame = document.createElement("iframe");
			frame.id = "blocks";
			if(s == "ablock") {
				frame.src = "https://ion.tjhsst.edu/signage/eighth";
			} else if(s == "bblock") {
				frame.src = "https://ion.tjhsst.edu/signage/eighth?block_increment=1";
			}
			mod.appendChild(frame);
			bar.style.backgroundColor = "#bdbdbd";
		} else if(s == "twitter") {
			var twitter = document.createElement("a");
			twitter.className = "twitter-timeline";
			twitter.setAttribute("data-dnt", "true");
			twitter.setAttribute("data-widget-id", "667454451305836544");
			twitter.src = "https://twitter.com/rejectedtjTODAY";
			var script = document.createElement("script");
			script.src = "scripts/twitter.js"
			mod.appendChild(twitter);
			mod.appendChild(script);
			bar.style.backgroundColor = "#2196F3";
		} else if(s == "plex") {
			var frame = document.createElement("iframe");
			frame.id = "stream";
			frame.src = "https://app.plex.tv/web/app";
			mod.appendChild(frame);
			bar.style.backgroundColor = "#F9B232";
		}
		expand.onclick = function() {toggleModExpand(modWrap, expand)};
		modWrap.appendChild(bar);
		label.appendChild(expand);
		bar.appendChild(label);
		bar.appendChild(exit);
		modWrap.appendChild(mod);
		parent.insertBefore(modWrap, button);
	}
}