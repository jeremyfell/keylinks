// Removes all child elements of an element
function trimElement(item) {
	while (item.lastChild) {
		item.removeChild(item.lastChild);
	}
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

// Resets the colors of all menu buttons when one is pressed
function clearTabs() {
	var buttons = document.getElementsByClassName("menubutton");

	for (var b = 0; b < buttons.length; b++) {
		var button = buttons[b];
		button.disabled = false;
	}

	// Can probably simpify this, maybe test for the existence of each individual element and delete it if it exists
	// Maybe while menu has more than 5 child elements (4 main buttons and title), remove last child element
	if (
		(CURRENT_TAB === "import" && !NO_BOOKMARKS_TO_IMPORT) ||
		(CURRENT_TAB === "manage" && SETTINGS.SHOW_SORTING_OPTIONS_IN_MANAGE_TAB && !NO_KEYLINKS_TO_MANAGE) ||
		(CURRENT_TAB === "change" && SETTINGS.SHOW_KEYLINK_STATS_IN_ADD_TAB) ||
		(CURRENT_TAB === "settings")
	) {
		document.getElementById("menu").removeChild(document.getElementById("menu").lastChild);
		if (CURRENT_TAB === "change" && SETTINGS.SHOW_KEYLINK_STATS_IN_ADD_TAB) {
			document.getElementById("menu").removeChild(document.getElementById("menu").lastChild);
		}
	}
}
