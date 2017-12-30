// Calls upon the background page to save keylinks and settings on popup unload
addEventListener("unload", function () {
	chrome.extension.getBackgroundPage().saveStorage(KEYLINKS, SETTINGS);
}, true);
