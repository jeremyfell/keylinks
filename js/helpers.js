function getKeywordFromLink(link) {
	for (var keyword in KEYLINKS) {
		if (KEYLINKS[keyword].link === link) {
			return keyword;
		}
	}
	return "";
}

// Generates a suggested keyword based on the page's title
function titleSuggestion(tabTitle) {
	var title = tabTitle.substr(0, 15).toLowerCase();

	// If there are multiple words, only take the first
	if (title.indexOf(" ") > -1) {
		title = title.substr(0, title.indexOf(" "));
	}

	// Get rid of non alphanumeric characters
	title = title.replace(/[^a-zA-Z0-9]/g, "");

	// If the generated title suggestion is already a keyword, do not make a suggestion
	if (KEYLINKS[title]) title = "";

	return title;
}

// If max write operations are exceeded, alert the user
function errorCheck(entry) {
	if (chrome.runtime.lastError) {
		if (chrome.runtime.lastError.message === "This request exceeds the MAX_WRITE_OPERATIONS_PER_MINUTE quota.") {
			alert("Too many save or delete operations have been performed in the last minute.\nChrome can only perform 120 operations a minute (2 per second).\nJust wait a minute, and try again.");
		} else if (chrome.runtime.lastError.message === "This request exceeds the MAX_WRITE_OPERATIONS_PER_HOUR quota.") {
			alert("Too many save or delete operations have been performed in the last hour.\nChrome can only perform 1800 operations an hour (1 every 2 seconds).\nUnfortunately, you must wait an hour, and try again.");
		}
	}
}

// Removes all child elements of an element
function trimElement(element) {
	while (element.lastChild) {
		element.lastChild.remove();
	}
}

// Resets the tab, according to what the current tab is
function resetCurrentTab() {
	CURRENT_TAB === "toolbar" ? toolbarTab() : addTab();
}

// Resets the colors of all menu buttons when one is pressed, and delete any extra elements in the menu
function resetMenu() {
	var menuButtons = document.getElementsByClassName("menu-button");
	var menu = document.getElementById("menu");

	for (var i = 0; i < 4; i++) {
		menuButtons[i].disabled = false;
	}

	while (menu.childNodes.length > 5) {
		menu.lastChild.remove();
	}

}

// Resets the colors of all sort buttons when one is pressed
function resetSortMenu() {
	var menuButtons = document.getElementsByClassName("menu-button");
	menuButtons[4].disabled = false;
	menuButtons[5].disabled = false;
	menuButtons[6].disabled = false;
	menuButtons[4].title = "Name";
	menuButtons[5].title = "Date";
	menuButtons[6].title = "Use";
}
