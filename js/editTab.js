

function configureSortMenu(menu, sortedKeylinks) {
	var sortButtonsContainer = document.createElement("div");

	var sortByNameButton = document.createElement("button");
	var sortByDateButton = document.createElement("button");
	var sortByUseButton = document.createElement("button");

	var sortByNameTypeIcon = document.createElement("img");
	var sortByDateTypeIcon = document.createElement("img");
	var sortByUseTypeIcon = document.createElement("img");

	var sortByNameArrowIcon = document.createElement("img");
	var sortByDateArrowIcon = document.createElement("img");
	var sortByUseArrowIcon = document.createElement("img");

	var sortTypeButtons = [sortByNameButton, sortByDateButton, sortByUseButton];

	sortButtonsContainer.id = "sort-button-container";

	sortByNameButton.dataset.sortType = "name";
	sortByDateButton.dataset.sortType = "date";
	sortByUseButton.dataset.sortType = "use";

	sortByNameButton.className = "menu-button";
	sortByDateButton.className = "menu-button";
	sortByUseButton.className = "menu-button";

	sortByNameButton.title = "Name";
	sortByDateButton.title = "Date Created";
	sortByUseButton.title = "Use";

	// The default sorting direction for each type of sorting
	sortByNameButton.dataset.reverse = "false";
	sortByDateButton.dataset.reverse = "true";
	sortByUseButton.dataset.reverse = "true";

	sortByNameTypeIcon.className = "menu-sort-type-icon";
	sortByDateTypeIcon.className = "menu-sort-type-icon";
	sortByUseTypeIcon.className = "menu-sort-type-icon";

	sortByNameTypeIcon.src = SOURCE.name;
	sortByDateTypeIcon.src = SOURCE.date;
	sortByUseTypeIcon.src = SOURCE.use;

	sortByNameTypeIcon.draggable = false;
	sortByDateTypeIcon.draggable = false;
	sortByUseTypeIcon.draggable = false;


	sortByNameArrowIcon.className = "menu-sort-arrow-icon";
	sortByDateArrowIcon.className = "menu-sort-arrow-icon";
	sortByUseArrowIcon.className = "menu-sort-arrow-icon";

	sortByNameArrowIcon.src = BLANK_IMAGE;
	sortByDateArrowIcon.src = BLANK_IMAGE;
	sortByUseArrowIcon.src = BLANK_IMAGE;

	sortByNameArrowIcon.draggable = false;
	sortByDateArrowIcon.draggable = false;
	sortByUseArrowIcon.draggable = false;

	// Add click listeners to each sorting button
	for (var i = 0; i < sortTypeButtons.length; i++) {
		var button = sortTypeButtons[i];
		button.addEventListener("click", function() {
			resetSortMenu();
			this.classList.add("selected-button");

			if (CURRENT_SORT_TYPE !== this.dataset.sortType) {
				CURRENT_SORT_TYPE = this.dataset.sortType;
				REVERSE_SORTING = (this.dataset.reverse === "true");
			} else {
				REVERSE_SORTING = !REVERSE_SORTING;
			}
			editTab();
		});
	}


	if (CURRENT_SORT_TYPE === "name") {

		// Sort alphabetically
		sortByNameButton.className = "menu-button selected-button";
		sortByNameArrowIcon.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			sortByNameButton.title = "Name (Z-A)";
		} else {
			sortByNameButton.title = "Name (A-Z)";
			sortByNameArrowIcon.style.webkitTransform = "rotate(180deg)";
		}

		sortedKeylinks.sort(function(a,b) {return (a.keyword.toLowerCase() < b.keyword.toLowerCase()) ? -1 : 1;});

	} else if (CURRENT_SORT_TYPE === "date") {

		// Sort by date
		sortByDateButton.className = "menu-button selected-button";
		sortByDateArrowIcon.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			sortByDateButton.title = "Date Created (Latest)";
		} else {
			sortByDateButton.title = "Date Created (Earliest)";
			sortByDateArrowIcon.style.webkitTransform = "rotate(180deg)";
		}

		sortedKeylinks.sort(function(a,b) {return (a.timeCreated < b.timeCreated) ? -1 : 1;});

	} else {

		// Sort by uses
		sortByUseButton.className = "menu-button selected-button";
		sortByUseArrowIcon.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			sortByUseButton.title = "Use (Highest)";
		} else {
			sortByUseButton.title = "Use (Lowest)";
			sortByUseArrowIcon.style.webkitTransform = "rotate(180deg)";
		}

		sortedKeylinks.sort(function(a,b) {return (a.timesUsed < b.timesUsed) ? -1 : 1;});

	}

	if (REVERSE_SORTING) sortedKeylinks.reverse();

	sortByNameButton.appendChild(sortByNameTypeIcon);
	sortByDateButton.appendChild(sortByDateTypeIcon);
	sortByUseButton.appendChild(sortByUseTypeIcon);

	sortByNameButton.appendChild(sortByNameArrowIcon);
	sortByDateButton.appendChild(sortByDateArrowIcon);
	sortByUseButton.appendChild(sortByUseArrowIcon);

	sortButtonsContainer.appendChild(sortByNameButton);
	sortButtonsContainer.appendChild(sortByDateButton);
	sortButtonsContainer.appendChild(sortByUseButton);

	menu.appendChild(sortButtonsContainer);
}

function getSortedItems(newList, sortedKeylinks) {
	for (var i = 0; i < sortedKeylinks.length; i++) {

		var keylink = sortedKeylinks[i];

		var newListItem = document.createElement("li");
		var editKeywordInput = document.createElement("input");
		var visitLinkButton = document.createElement("button");
		var visitLinkIcon = document.createElement("img");
		var editLinkInput = document.createElement("input");
		var deleteKeylinkButton = document.createElement("button");
		var deleteKeylinkIcon = document.createElement("img");

		editKeywordInput.setAttribute("type", "text");
		editKeywordInput.value = keylink.keyword;
		editKeywordInput.className = "edit-keyword-input";
		editKeywordInput.setAttribute("maxlength", "100");

		editKeywordInput.addEventListener("focus", function() {
			OLD_KEYWORD = this.value;
		});

		editKeywordInput.addEventListener("change", function() {
			if (this.value === "" || !validateEditKeywordInput(this)) {

				// Keyword is invalid, revert to previous keyword
				this.value = OLD_KEYWORD;
				this.style.backgroundColor = null;

			} else {

				// Keyword is valid, delete old keyword and add new one
				saveKeylink(this.value, KEYLINKS[OLD_KEYWORD].link);
				deleteKeylink(OLD_KEYWORD);

			}
		});

		editKeywordInput.addEventListener("keydown", function(e) {if (e.which === 13) this.blur();});
		editKeywordInput.addEventListener("input", function(e) {validateEditKeywordInput(this)});
		editKeywordInput.spellcheck = false;

		visitLinkButton.className = "visit-link-button";
		visitLinkButton.title = "Visit link";
		visitLinkButton.addEventListener("click", function() {
			// Creates a new tab with the url associated with that button's row
			chrome.tabs.create({url: this.parentNode.childNodes[2].value})
		});

		visitLinkIcon.src = SOURCE.equal;
		visitLinkIcon.className = "equal-icon";
		visitLinkIcon.draggable = false;

		editLinkInput.setAttribute("type", "text");
		editLinkInput.spellcheck = false;
		editLinkInput.value = keylink.link;
		editLinkInput.className = "edit-link-input";
		editLinkInput.addEventListener("focus", function() {
			this.dataset.oldLink = this.value;
		});

		editLinkInput.addEventListener("keydown", function(e) {
			if (e.which === 13) this.blur();
		});

		editLinkInput.addEventListener("change", function() {
			if (this.value === "") {
				this.value = this.dataset.oldLink;
			} else {
				var link = this.parentNode.childNodes[2].value;
				var keyword = this.parentNode.firstChild.value;
				KEYLINKS[keyword].link = link;
			}
		});

		// Adds additionnal title info to each list item
		// If sorting by date, displays the time the keylink was created
		// If sorting by uses, displays the number of times the keylink has been used
		if (CURRENT_SORT_TYPE === "date") {
			var date = new Date(keylink.timeCreated);
			editLinkInput.title = "Created " + date.toLocaleTimeString() + ", " + date.toDateString();
		} else if (CURRENT_SORT_TYPE === "use") {
			editLinkInput.title = "Used " + keylink.timesUsed + " time" + (keylink.timesUsed === 1 ? "" : "s");
		}

		deleteKeylinkButton.className = "delete-keylink-button";
		deleteKeylinkButton.title = "Delete keylink";
		deleteKeylinkButton.addEventListener("click", function() {
			deleteKeylink(this.parentNode.firstChild.value);
			this.parentNode.remove();
			if (CURRENT_KEYLINKS === DEFAULT_KEYLINK_COUNT) editTab();
		});

		deleteKeylinkIcon.src = SOURCE.deleting;
		deleteKeylinkIcon.className = "edit-delete-icon visible";
		deleteKeylinkIcon.draggable = false;

		newListItem.className = "edit-keylink-container";

		visitLinkButton.appendChild(visitLinkIcon);
		deleteKeylinkButton.appendChild(deleteKeylinkIcon);

		newListItem.appendChild(editKeywordInput);
		newListItem.appendChild(visitLinkButton);
		newListItem.appendChild(editLinkInput);
		newListItem.appendChild(deleteKeylinkButton);

		newList.appendChild(newListItem);

	}
}


// Create edit bookmarks tab when bookmark icon is pressed
function editTab() {

	var menu = document.getElementById("menu");
	var content = document.getElementById("content");
	var editKeylinksList = document.createElement("ul");

	var sortedKeylinks = [];

	// Tab setup
	resetMenu();
	CURRENT_TAB = "edit";
	document.getElementById("edit-tab-button").disabled = true;
	document.getElementById("menu-title").innerHTML = "Edit Keylinks";

	editKeylinksList.id = "edit-keylinks-list";

	// Takes all keylinks from the main object, and puts them into an array so that they can be sortedKeylinks
	for (var keyword in KEYLINKS) {
		sortedKeylinks.push({
			"keyword": keyword,
			"link": KEYLINKS[keyword].link,
			"timeCreated": KEYLINKS[keyword].timeCreated,
			"timesUsed": KEYLINKS[keyword].timesUsed
		});
	}

	if (sortedKeylinks.length === 0) {

		// No keylinks have been added yet
		var emptyHeader = document.createElement("p");
		var emptyText = document.createElement("p");

		NO_KEYLINKS_TO_EDIT = true;

		emptyHeader.className = "empty-tab-header";
		emptyText.className = "empty-tab-text";
		emptyHeader.innerHTML = "You don't have any keylinks yet!"
		emptyText.innerHTML = "To add some, use the Add tab to create one for your current page,<br>or the Import tab to create some from your existing bookmarks.";

		trimElement(content);

		content.appendChild(emptyHeader);
		content.appendChild(emptyText);

	} else {

		NO_KEYLINKS_TO_EDIT = false;

		if (SETTINGS.sortingOptions) {
			// Sets up the sorting buttons in the menu
			configureSortMenu(menu, sortedKeylinks);
		} else {
			// Default sort is alphabetically by keyword
			sortedKeylinks.sort(function(a,b) {return (a.keyword.toLowerCase() < b.keyword.toLowerCase()) ? -1 : 1;});
		}

		// Creates and displays the list of sortedKeylinks keylinks
		getSortedItems(editKeylinksList, sortedKeylinks);

		// Deletes all elements from the previous tab
		trimElement(content);

		content.appendChild(editKeylinksList);

	}

}
