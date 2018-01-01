// Removes all child elements of an element
function trimElement(item) {
	while (item.lastChild) {
		item.removeChild(item.lastChild);
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
	if (
		(CURRENT_PAGE === "import" && !NO_BOOKMARKS_TO_IMPORT) ||
		(CURRENT_PAGE === "manage" && SETTINGS.SHOW_SORTING_OPTIONS_IN_MANAGE_TAB && !NO_KEYLINKS_TO_MANAGE) ||
		(CURRENT_PAGE === "change" && SETTINGS.SHOW_KEYLINK_STATS_IN_ADD_TAB) ||
		(CURRENT_PAGE === "settings")
	) {
		document.getElementById("menu").removeChild(document.getElementById("menu").lastChild);
		if (CURRENT_PAGE === "change" && SETTINGS.SHOW_KEYLINK_STATS_IN_ADD_TAB) {
			document.getElementById("menu").removeChild(document.getElementById("menu").lastChild);
		}
	}
}
