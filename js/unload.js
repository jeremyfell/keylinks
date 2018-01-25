// Calls upon the background page to update its keylinks and settings, which may have changed while the popup was open
addEventListener("unload", function () {
	chrome.extension.getBackgroundPage().updateBackgroundPageStorage();
}, true);
