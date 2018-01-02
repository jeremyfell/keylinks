// Resets the colors of all sort buttons when one is pressed
function clearSort() {
	var buttons = document.getElementsByClassName("menubutton");
	buttons[4].disabled = false;
	buttons[5].disabled = false;
	buttons[6].disabled = false;
	buttons[4].title = "Name";
	buttons[5].title = "Date";
	buttons[6].title = "Use";
}

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

	newDiv1.id = "sortbox";

	newButton1.id = "name";
	newButton2.id = "date";
	newButton3.id = "use";

	newButton1.className = "menubutton";
	newButton2.className = "menubutton";
	newButton3.className = "menubutton";

	newButton1.title = "Name";
	newButton2.title = "Date Created";
	newButton3.title = "Use";

	// The default sorting direction for each type of sorting
	newButton1.dataset.reverse = "false";
	newButton2.dataset.reverse = "true";
	newButton3.dataset.reverse = "true";

	newImage1.className = "sorticon";
	newImage2.className = "sorticon";
	newImage3.className = "sorticon";

	newImage1.src = SOURCE.name;
	newImage2.src = SOURCE.date;
	newImage3.src = SOURCE.use;

	newArrow1.className = "arrow";
	newArrow2.className = "arrow";
	newArrow3.className = "arrow";

	newArrow1.src = BLANK_IMAGE;
	newArrow2.src = BLANK_IMAGE;
	newArrow3.src = BLANK_IMAGE;

	// Add click listeners to each sorting button
	for (var b = 0; b < buttons.length; b++) {
		var button = buttons[b];
		button.addEventListener("click", function() {
			clearSort();
			this.className = "menubutton selected";
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
		newButton1.className = "menubutton selected";
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
		newButton2.className = "menubutton selected";
		newArrow2.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			newButton2.title = "Date Created (Latest)";
		} else {
			newButton2.title = "Date Created (Earliest)";
			newArrow2.style.webkitTransform = "rotate(180deg)";
		}

		sorted.sort(function(a,b) {return (a.time_created < b.time_created) ? -1 : 1;});

	} else {

		// Sort by uses
		newButton3.className = "menubutton selected";
		newArrow3.src = SOURCE.arrow;

		if (REVERSE_SORTING) {
			newButton3.title = "Use (Highest)";
		} else {
			newButton3.title = "Use (Lowest)";
			newArrow3.style.webkitTransform = "rotate(180deg)";
		}

		sorted.sort(function(a,b) {return (a.times_used < b.times_used) ? -1 : 1;});

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
		newInput1.className = "managekeyword";
		newInput1.setAttribute("maxlength", "100");

		newInput1.addEventListener("focus", function() {
			OLD_KEYWORD = this.value;
		});

		newInput1.addEventListener("change", function() {
			if (this.value === "" || !checkInput(this)) {

				// Keyword is invalid, revert to previous keyword
				this.value = OLD_KEYWORD;
				this.style.backgroundColor = null;

			} else {

				// Keyword is valid, delete old keyword and add new one
				KEYLINKS[this.value] = KEYLINKS[OLD_KEYWORD];
				delete KEYLINKS[OLD_KEYWORD];

			}
		});

		newInput1.addEventListener("keydown", function(e) {checkInput(this); if (e.which === 13) this.blur();});
		newInput1.addEventListener("keyup", function(e) {checkInput(this)});
		newInput1.addEventListener("keypress", function(e) {checkInput(this)});
		newInput1.addEventListener("paste", function(e) {checkInput(this)});
		newInput1.spellcheck = false;

		newButton1.className = "linkbutton";
		newButton1.addEventListener("click", function() {
			// Creates a new tab with the url associated with that button's row
			chrome.tabs.create({url: this.parentNode.childNodes[2].value})
		});

		newImage1.src = SOURCE.equal;
		newImage1.className = "link";

		newInput2.setAttribute("type", "text");
		newInput2.spellcheck = false;
		newInput2.value = keylink.link;
		newInput2.className = "managelink";
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
				var keyurl = this.parentNode.childNodes[2].value;
				var keyword = this.parentNode.firstChild.value;
				KEYLINKS[keyword].link = keyurl;
			}
		});

		// Adds additionnal title info to each list item
		// If sorting by date, displays the time the keylink was created
		// If sorting by uses, displays the number of times the keylink has been used
		if (CURRENT_SORTING_PARAMETER === "date") {
			var date = new Date(keylink.time_created);
			newInput2.title = "Created " + date.toLocaleTimeString() + ", " + date.toDateString();
		} else if (CURRENT_SORTING_PARAMETER === "use") {
			newInput2.title = "Used " + keylink.times_used + " time" + (keylink.times_used === 1 ? "" : "s");
		}

		newButton2.className = "managebutton";
		newButton2.addEventListener("click", function() {deleteKeylink(this)});
		newButton2.title = "Delete keylink";

		newImage2.src = SOURCE.deleting;
		newImage2.className = "managedelete visible";

		newListItem.className = "managebookmark";

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
	clearTabs();
	CURRENT_TAB = "manage";
	document.getElementById("managetab").disabled = true;
	document.getElementById("menutitle").innerHTML = "Manage Keylinks";

	newList.id = "managebookmarks";

	// Takes all keylinks from the main object, and puts them into an array so that they can be sorted
	for (var keyword in KEYLINKS) {
		sorted.push({
			keyword: keyword,
			link: KEYLINKS[keyword].link,
			time_created: KEYLINKS[keyword].time_created,
			times_used: KEYLINKS[keyword].times_used
		});
	}

	if (sorted.length === 0) {

		// No keylinks have been added yet
		var newP1 = document.createElement("p");
		var newP2 = document.createElement("p");

		NO_KEYLINKS_TO_MANAGE = true;

		newP1.className = "emptymain";
		newP2.className = "emptybody";
		newP1.innerHTML = "You don't have any keylinks yet!"
		newP2.innerHTML = "To add some, use the Add tab to create one for your current page,<br>or the Import tab to create some from your existing bookmarks.";

		trimElement(content);

		content.appendChild(newP1);
		content.appendChild(newP2);

	} else {

		NO_KEYLINKS_TO_MANAGE = false;

		if (SETTINGS.SHOW_SORTING_OPTIONS_IN_MANAGE_TAB) {
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
