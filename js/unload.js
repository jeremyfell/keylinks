// Calls upon the background page to save keylinks and settings on popup unload
addEventListener("unload", function () {
	var background_page = chrome.extension.getBackgroundPage();

	background_page.saveStorage(KEYLINKS, SETTINGS);
}, true);
