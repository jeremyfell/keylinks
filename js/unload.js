// Calls upon the background page to save keylinks and settings on popup unload
addEventListener("unload", function () {
	var background = chrome.extension.getBackgroundPage();
	
	background.saveStorage(KEYLINKS, SETTINGS);
}, true);