// Saves a bookmark
function addBookmark(url) {
	var background = chrome.extension.getBackgroundPage();
	var date = new Date();
	var time = date.getTime();
	KEYLINKS[KEYWORD] = [url, time, 0];
	background.iconUpdate(true, url);
}

// Deletes a saved bookmark
function deleteBookmark(item) {
	var background = chrome.extension.getBackgroundPage();
	var keyword = item.parentNode.firstChild.value;
	var url = KEYLINKS[keyword][0];
	
	delete KEYLINKS[keyword];
	
	if (item.className === "managebutton") {
		item.parentNode.parentNode.removeChild(item.parentNode);
		
		if (!document.getElementById("managebookmarks").firstChild) {
			manageTab();
		}
	}
	
	background.iconUpdate(false, url);
}