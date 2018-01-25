

function sortingSetup(menu, sorted) {
	var newDiv1 = document.createElement("div");

	var newButton1 = document.createElement("button");
	var newButton2 = document.createElement("button");
	var newButton3 = document.createElement("button");

	var newImage1 = document.createElement("img");
	var newImage2 = document.createElement("img");
	var newImage3 = document.createElement("img");

	var newArrow1 = document.createElement("img");
	var newArrow2 = document.createElement("img");
	var newArrow3 = document.createElement("img");

	var buttons = [newButton1, newButton2, newButton3];

	newDiv1.id = "sort-button-container";

	newButton1.id = "name";
	newButton2.id = "date";
	newButton3.id = "use";

	newButton1.className = "menu-button";
	newButton2.className = "menu-button";
	newButton3.className = "menu-button";

	newButton1.title = "Name";
	newButton2.title = "Date Created";
	newButton3.title = "Use";

	// The default sorting direction for each type of sorting
	newButton1.dataset.reverse = "false";
	newButton2.dataset.reverse = "true";
	newButton3.dataset.reverse = "true";

	newImage1.className = "menu-sort-type-icon";
	newImage2.className = "menu-sort-type-icon";
	newImage3.className = "menu-sort-type-icon";

	newImage1.src = SOURCE.name;
	newImage2.src = SOURCE.date;
	newImage3.src = SOURCE.use;

	newArrow1.className = "menu-sort-arrow-icon";
	newArrow2.className = "menu-sort-arrow-icon";
	newArrow3.className = "menu-sort-arrow-icon";

	newArrow1.src = BLANK_IMAGE;
	newArrow2.src = BLANK_IMAGE;
	newArrow3.src = BLANK_IMAGE;

	// Add click listeners to each sorting button
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.addEventListener("click", function() {
			resetSortMenu();
			this.classList.add("selected-button");
			if (CURRENT_SORTING_PARAMETER !== this.id) {
				CURRENT_SORTING_PARAMETER = this.id;
				REVERSE_SORTING = (this.dataset.reverse === "true");
			} else {
				REVERSE_SORTING = !REVERSE_SORTING;
			}
			manageTab();
		});
	}


	if (CURRENT_SORTING_PARAMETER === "name") {

		// Sort alphabetically
		newButton1.className = "menu-button selected-button";
		newArrow1.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			newButton1.title = "Name (Z-A)";
		} else {
			newButton1.title = "Name (A-Z)";
			newArrow1.style.webkitTransform = "rotate(180deg)";
		}

		sorted.sort(function(a,b) {return (a.keyword.toLowerCase() < b.keyword.toLowerCase()) ? -1 : 1;});

	} else if (CURRENT_SORTING_PARAMETER === "date") {

		// Sort by date
		newButton2.className = "menu-button selected-button";
		newArrow2.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			newButton2.title = "Date Created (Latest)";
		} else {
			newButton2.title = "Date Created (Earliest)";
			newArrow2.style.webkitTransform = "rotate(180deg)";
		}

		sorted.sort(function(a,b) {return (a.timeCreated < b.timeCreated) ? -1 : 1;});

	} else {

		// Sort by uses
		newButton3.className = "menu-button selected-button";
		newArrow3.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			newButton3.title = "Use (Highest)";
		} else {
			newButton3.title = "Use (Lowest)";
			newArrow3.style.webkitTransform = "rotate(180deg)";
		}

		sorted.sort(function(a,b) {return (a.timesUsed < b.timesUsed) ? -1 : 1;});

	}

	if (REVERSE_SORTING) sorted.reverse();

	newButton1.appendChild(newImage1);
	newButton2.appendChild(newImage2);
	newButton3.appendChild(newImage3);

	newButton1.appendChild(newArrow1);
	newButton2.appendChild(newArrow2);
	newButton3.appendChild(newArrow3);

	newDiv1.appendChild(newButton1);
	newDiv1.appendChild(newButton2);
	newDiv1.appendChild(newButton3);

	menu.appendChild(newDiv1);
}

function getSortedItems(newList, sorted) {
	for (var i = 0; i < sorted.length; i++) {

		var keylink = sorted[i];

		var newListItem = document.createElement("li");
		var newDiv = document.createElement("div");
		var newInput1 = document.createElement("input");
		var newButton1 = document.createElement("button");
		var newImage1 = document.createElement("img");
		var newInput2 = document.createElement("input");
		var newButton2 = document.createElement("button");
		var newImage2 = document.createElement("img");

		newInput1.setAttribute("type", "text");
		newInput1.value = keylink.keyword;
		newInput1.className = "manage-keyword-input";
		newInput1.setAttribute("maxlength", "100");

		newInput1.addEventListener("focus", function() {
			OLD_KEYWORD = this.value;
		});

		newInput1.addEventListener("change", function() {
			if (this.value === "" || !validateKeywordInput(this)) {

				// Keyword is invalid, revert to previous keyword
				this.value = OLD_KEYWORD;
				this.style.backgroundColor = null;

			} else {

				// Keyword is valid, delete old keyword and add new one
				saveKeylink(this.value, KEYLINKS[OLD_KEYWORD].link);
				deleteKeylink(OLD_KEYWORD);

			}
		});

		newInput1.addEventListener("keydown", function(e) {if (e.which === 13) this.blur();});
		newInput1.addEventListener("input", function(e) {validateKeywordInput(this)});
		newInput1.spellcheck = false;

		newButton1.className = "visit-link-button";
		newButton1.title = "Visit link";
		newButton1.addEventListener("click", function() {
			// Creates a new tab with the url associated with that button's row
			chrome.tabs.create({url: this.parentNode.childNodes[2].value})
		});

		newImage1.src = SOURCE.equal;
		newImage1.className = "equal-icon";

		newInput2.setAttribute("type", "text");
		newInput2.spellcheck = false;
		newInput2.value = keylink.link;
		newInput2.className = "manage-link-input";
		newInput2.addEventListener("focus", function() {
			this.dataset.oldLink = this.value;
		});

		newInput2.addEventListener("keydown", function(e) {
			if (e.which === 13) this.blur();
		});

		newInput2.addEventListener("change", function() {
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
		if (CURRENT_SORTING_PARAMETER === "date") {
			var date = new Date(keylink.timeCreated);
			newInput2.title = "Created " + date.toLocaleTimeString() + ", " + date.toDateString();
		} else if (CURRENT_SORTING_PARAMETER === "use") {
			newInput2.title = "Used " + keylink.timesUsed + " time" + (keylink.timesUsed === 1 ? "" : "s");
		}

		newButton2.className = "delete-keylink-button";
		newButton2.title = "Delete keylink";
		newButton2.addEventListener("click", function() {
			deleteKeylink(this.parentNode.firstChild.value);
			this.parentNode.remove();
			if (CURRENT_KEYLINKS === DEFAULT_KEYLINK_COUNT) manageTab();
		});

		newImage2.src = SOURCE.deleting;
		newImage2.className = "manage-delete-icon visible";

		newListItem.className = "manage-keylink-container";

		newButton1.appendChild(newImage1);
		newButton2.appendChild(newImage2);

		newListItem.appendChild(newInput1);
		newListItem.appendChild(newButton1);
		newListItem.appendChild(newInput2);
		newListItem.appendChild(newButton2);

		newList.appendChild(newListItem);

	}
}


// Create manage bookmarks tab when bookmark icon is pressed
function manageTab() {
	
	var menu = document.getElementById("menu");
	var content = document.getElementById("content");
	var newList = document.createElement("ul");

	var sorted = [];

	// Tab setup
	resetMenu();
	CURRENT_TAB = "manage";
	document.getElementById("manage-tab-button").disabled = true;
	document.getElementById("menu-title").innerHTML = "Manage Keylinks";

	newList.id = "manage-keylinks-list";

	// Takes all keylinks from the main object, and puts them into an array so that they can be sorted
	for (var keyword in KEYLINKS) {
		sorted.push({
			keyword: keyword,
			link: KEYLINKS[keyword].link,
			timeCreated: KEYLINKS[keyword].timeCreated,
			timesUsed: KEYLINKS[keyword].timesUsed
		});
	}

	if (sorted.length === 0) {

		// No keylinks have been added yet
		var newP1 = document.createElement("p");
		var newP2 = document.createElement("p");

		NO_KEYLINKS_TO_MANAGE = true;

		newP1.className = "empty-tab-header";
		newP2.className = "empty-tab-text";
		newP1.innerHTML = "You don't have any keylinks yet!"
		newP2.innerHTML = "To add some, use the Add tab to create one for your current page,<br>or the Import tab to create some from your existing bookmarks.";

		trimElement(content);

		content.appendChild(newP1);
		content.appendChild(newP2);

	} else {

		NO_KEYLINKS_TO_MANAGE = false;

		if (SETTINGS.sortingOptions) {
			// Sets up the sorting buttons in the menu
			sortingSetup(menu, sorted);
		} else {
			// Default sort is alphabetically by keyword
			sorted.sort(function(a,b) {return (a.keyword.toLowerCase() < b.keyword.toLowerCase()) ? -1 : 1;});
		}

		// Creates and displays the list of sorted keylinks
		getSortedItems(newList, sorted);

		// Deletes all elements from the previous tab
		trimElement(content);

		content.appendChild(newList);

	}

}
