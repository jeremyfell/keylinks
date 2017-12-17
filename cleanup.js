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
	if ((PAGE === "import" && !EMPTYIMPORT) || (PAGE === "manage" && SORT && !EMPTYMANAGE) || (PAGE === "change" && STATS) || (PAGE === "settings")) {
		document.getElementById("menu").removeChild(document.getElementById("menu").lastChild);
		if (PAGE === "change" && STATS) {
			document.getElementById("menu").removeChild(document.getElementById("menu").lastChild);
		}
	}
}