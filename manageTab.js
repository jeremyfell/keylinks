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
	
	newArrow1.src = BLANK;
	newArrow2.src = BLANK;
	newArrow3.src = BLANK;
	
	// Add click listeners to each sorting button
	for (var b = 0; b < buttons.length; b++) {
		var button = buttons[b];
		button.addEventListener("click", function() {
			clearSort();
			this.className = "menubutton selected";
			if (SORTING !== this.id) {
				SORTING = this.id;
				REVERSE = (this.dataset.reverse === "true");
			} else {
				REVERSE = !REVERSE;
			}
			manageTab();
		});
	}
	
	
	if (SORTING === "name") {
	
		// Sort alphabetically
		newButton1.className = "menubutton selected";
		newArrow1.src = SOURCE.arrow;
		
		if (REVERSE) {
			newButton1.title = "Name (Z-A)";
		} else {
			newButton1.title = "Name (A-Z)";
			newArrow1.style.webkitTransform = "rotate(180deg)";
		}
		
		sorted.sort(function(a,b) {return (a[0].toLowerCase() < b[0].toLowerCase()) ? -1 : 1;});
		
	} else if (SORTING === "date") {
		
		// Sort by date
		newButton2.className = "menubutton selected";
		newArrow2.src = SOURCE.arrow;
		
		if (REVERSE) {
			newButton2.title = "Date Created (Latest)";
		} else {
			newButton2.title = "Date Created (Earliest)";
			newArrow2.style.webkitTransform = "rotate(180deg)";
		}
		
		sorted.sort(function(a,b) {return (a[2] < b[2]) ? -1 : 1;});
	
	} else {
		
		// Sort by uses
		newButton3.className = "menubutton selected";
		newArrow3.src = SOURCE.arrow;
		
		if (REVERSE) {
			newButton3.title = "Use (Highest)";
		} else {
			newButton3.title = "Use (Lowest)";
			newArrow3.style.webkitTransform = "rotate(180deg)";
		}
		
		sorted.sort(function(a,b) {return (a[3] < b[3]) ? -1 : 1;});
	
	}
	
	if (REVERSE) sorted.reverse();
	
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
	for (var s = 0; s < sorted.length; s++) {
	
		var key = sorted[s];
		
		var newListItem = document.createElement("li");
		var newDiv = document.createElement("div");
		var newInput1 = document.createElement("input");
		var newButton1 = document.createElement("button");
		var newImage1 = document.createElement("img");
		var newInput2 = document.createElement("input");
		var newButton2 = document.createElement("button");
		var newImage2 = document.createElement("img");
		
		newInput1.setAttribute("type", "text");
		newInput1.value = key[0];
		newInput1.className = "managekeyword";
		newInput1.setAttribute("maxlength", "100");
		
		newInput1.addEventListener("focus", function() {OLDKEYWORD = this.value;});
		
		newInput1.addEventListener("change", function() {
			if (this.value === "" || !checkInput(this)) {
				
				// Keyword is invalid, revert to previous keyword
				this.value = OLDKEYWORD;
				this.style.backgroundColor = null;
			
			} else {
				
				// Keyword is valid, delete old keyword and add new one
				var keyword = this.value;
				KEYLINKS[keyword] = KEYLINKS[OLDKEYWORD];
				delete KEYLINKS[OLDKEYWORD];
			
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
		newInput2.value = key[1];
		newInput2.className = "managelink";
		newInput2.addEventListener("focus", function() {OLDURL = this.value});
		newInput2.addEventListener("keydown", function(e) {if (e.which === 13) this.blur();});
		newInput2.addEventListener("change", function() {
			if (this.value === "") {
				this.value = OLDURL;
				console.log(OLDURL);
			} else {
				var keyurl = this.parentNode.childNodes[2].value;
				KEYWORD = this.parentNode.firstChild.value;
				KEYLINKS[KEYWORD][0] = keyurl;
			}
		});

		// Adds additionnal title info to each list item
		// If sorting by date, displays the time the keylink was created
		// If sorting by uses, displays the number of times the keylink has been used
		if (SORTING === "date") {
			var date = new Date(sorted[s][2]);
			newInput2.title = "Created " + date.toLocaleTimeString() + ", " + date.toDateString();
		} else if (SORTING === "use") {
			newInput2.title = "Used " + sorted[s][3] + " time" + (sorted[s][3] === 1 ? "" : "s");
		}

		newButton2.className = "managebutton";
		newButton2.addEventListener("click", function() {deleteBookmark(this)});
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
	PAGE = "manage";
	document.getElementById("managetab").disabled = true;
	document.getElementById("menutitle").innerHTML = "Manage Keylinks";
	
	newList.id = "managebookmarks";
	
	// Takes all keylinks from the main object, and puts them into an array so that they can be sorted
	for (var key in KEYLINKS) {
		sorted.push([key, KEYLINKS[key][0], KEYLINKS[key][1], KEYLINKS[key][2]]);
	}
	
	if (sorted.length === 0) {
	
		// No keylinks have been added yet
		var newP1 = document.createElement("p");
		var newP2 = document.createElement("p");
		
		EMPTYMANAGE = true;
		
		newP1.className = "emptymain";
		newP2.className = "emptybody";
		newP1.innerHTML = "You don't have any keylinks yet!"
		newP2.innerHTML = "To add some, use the Add tab to create one for your current page,<br>or the Import tab to create some from your existing bookmarks.";
		
		trimElement(content);
		
		content.appendChild(newP1);
		content.appendChild(newP2);
		
	} else {
	
		EMPTYMANAGE = false;
		
		if (SORT) {
			// Sets up the sorting buttons in the menu
			sortingSetup(menu, sorted);
		} else {
			// Default sort is alphabetically
			sorted.sort(function(a,b) {return (a[0].toLowerCase() < b[0].toLowerCase()) ? -1 : 1;});
		}
		
		// Creates and displays the list of sorted keylinks
		getSortedItems(newList, sorted);
		
		// Deletes all elements from the previous tab
		trimElement(content);
		
		content.appendChild(newList);
		
	}
	
}