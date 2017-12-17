// Saves a bookmark
function addBookmark(url) {
	var background_page = chrome.extension.getBackgroundPage();
	var time = new Date().getTime();

	KEYLINKS[KEYWORD] = [url, time, 0];
	background_page.iconUpdate(true, url);
}

// Deletes a saved bookmark
function deleteBookmark(item) {
	var background_page = chrome.extension.getBackgroundPage();
	var keyword = item.parentNode.firstChild.value;
	var url = KEYLINKS[keyword][0];

	delete KEYLINKS[keyword];

	if (item.className === "managebutton") {
		item.parentNode.parentNode.removeChild(item.parentNode);

		if (!document.getElementById("managebookmarks").firstChild) {
			manageTab();
		}
	}

	background_page.iconUpdate(false, url);
}
