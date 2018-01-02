// Calls upon the background page to save keylinks and settings when the popup unloads
addEventListener("unload", function () {
	var background_page = chrome.extension.getBackgroundPage();
	background_page.setStorage(KEYLINKS, SETTINGS);
}, true);
