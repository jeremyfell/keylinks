// Saves a new keylink
function addKeylink(keyword, url) {
	var background_page = chrome.extension.getBackgroundPage();
	var time = new Date().getTime();

	KEYLINKS[keyword] = {
		link: url,
		time_created: time,
		times_used: 0
	}

	background_page.iconUpdate(true, url);
}

// Deletes a saved bookmark
function deleteKeylink(element) {
	var background_page = chrome.extension.getBackgroundPage();
	var keyword = element.parentNode.firstChild.value;
	var url = KEYLINKS[keyword].link;

	delete KEYLINKS[keyword];

	if (element.className === "managebutton") {
		element.parentNode.parentNode.removeChild(element.parentNode);

		if (!document.getElementById("managebookmarks").firstChild) {
			manageTab();
		}
	}

	background_page.iconUpdate(false, url);
}
