var current_url = "https://localhost:7000";
var current_img = "https://localhost:7241/"; 
makeScript = function (url) {
	var script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	document.getElementById('mainDiv').appendChild(script);
};