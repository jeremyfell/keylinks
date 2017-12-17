REPLACE = true;

// Exports all keylinks as bookmarks in a folder named Keylinks within the Other Bookmarks folder
function exportBookmarks() {
	folderName = prompt("Export all keylinks to a folder under Other Bookmarks\nSpecify the folder name:");
	
	// If the cancel button was pressed
	if (folderName == null) {
		document.getElementById("export").blur();
		return;
	}
	
	// Default folder name if none is specified
	if (folderName == "") folderName == "Keylinks";

	
	chrome.bookmarks.create({title: folderName}, function(parentFolder) {
		var id = parentFolder.id;
		
		// Creates each bookmark in the folder
		for (var key in KEYLINKS) {
			chrome.bookmarks.create({title: key, url: KEYLINKS[key][0], parentId: id});
		}
	
		// Opens a new tab at the chrome bookmarks page
		chrome.tabs.create({url: "chrome://bookmarks"});
		
	});
}

// Creates the settings tab when the gear icon is pressed
function settingsTab() {

	var content = document.getElementById("content");
	var menu = document.getElementById("menu");
	
	var newButton = document.createElement("button");
	var newButtonImage = document.createElement("img");
	
	var newP1 = document.createElement("p");
	var newP2 = document.createElement("p");
	var newP3 = document.createElement("p");
	var newP4 = document.createElement("p");
	var newP5 = document.createElement("p");
	var newP6 = document.createElement("p");
	var newP7 = document.createElement("p");
	var newP8 = document.createElement("p");
	
	var newCheckbox1 = document.createElement("button");
	var newCheckbox2 = document.createElement("button");
	var newCheckbox3 = document.createElement("button");
	var newCheckbox4 = document.createElement("button");
	var newCheckbox5 = document.createElement("button");
	var newCheckbox6 = document.createElement("button");
	var newCheckbox7 = document.createElement("button");
	
	var checkboxes = [newCheckbox1, newCheckbox2, newCheckbox3, newCheckbox4, newCheckbox5, newCheckbox6, newCheckbox7];
	
	var newImage1 = document.createElement("img");
	var newImage2 = document.createElement("img");
	var newImage3 = document.createElement("img");
	var newImage4 = document.createElement("img");
	var newImage5 = document.createElement("img");
	var newImage6 = document.createElement("img");
	var newImage7 = document.createElement("img");
	
	var links;
	
	// Tab setup
	clearTabs();
	PAGE = "settings";
	document.getElementById("settingstab").disabled = true;
	document.getElementById("menutitle").innerHTML = "Settings";
	
	newButton.className = "menubutton";
	newButton.id = "export";
	newButton.title = "Export keylinks as bookmarks";
	
	newButtonImage.className = "menuicon";
	newButtonImage.id = "exporticon";
	newButtonImage.src = SOURCE.exporting;
	
	newButton.addEventListener("click", function() {
		exportBookmarks();
	});
	
	newP1.innerHTML = "Keyword suggestions in omnibox";
	newP2.innerHTML = "Close popup after adding, changing or deleting a bookmark";
	newP3.innerHTML = "Show sorting options in Manage tab";
	newP4.innerHTML = "Show bookmark details in Add tab";
	newP5.innerHTML = "Start extension with smaller and more basic popup";
	newP6.innerHTML = "Keyword suggestions when adding a bookmark";
	newP7.innerHTML = "Replace the link for existing keywords";
	
	newP1.title = "When entering a keyword in the omnibox,\nyou will see suggestions for keylinks you\nhave currently saved.";
	newP2.title = "The extension popup will close automatically\nwhen you add, change or delete a keylink\nusing the Add tab.";
	newP3.title = "You will see additional options for sorting\nkeylinks by name, by date created, and by\nuse, in the Manage tab.";
	newP4.title = "Shows stats in the Add tab such as when\nthe keylink was created, and how many\ntimes you have used it.";
	newP5.title = "Starts the extension as a smaller, more basic\npopup, with an Options button to access\nthe full popup.";
	newP6.title = "Suggests keywords for a webpage when adding a bookmark";
	newP7.title = "Allows you to update the link for an existing keyword from the Add tab or small popup";
	
	newP1.className = "settingstext";
	newP2.className = "settingstext";
	newP3.className = "settingstext";
	newP4.className = "settingstext";
	newP5.className = "settingstext";
	newP6.className = "settingstext";
	newP7.className = "settingstext";
	
	newP8.id = "bugs";
	newP8.innerHTML = 	"Icons by <a href='http://www.flaticon.com/authors/google'>Google</a> and <a href='http://www.flaticon.com/authors/freepik'>Freepik</a>" +
						" via <a href='http://www.flaticon.com'>flaticon</a>, licensed by <a href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons BY 3.0'>" +
						"CC BY 3.0</a>. Report any bugs to keylinks.help@gmail.com";
						
	newCheckbox1.className = "checkoff";
	newCheckbox2.className = "checkoff";
	newCheckbox3.className = "checkoff";
	newCheckbox4.className = "checkoff";
	newCheckbox5.className = "checkoff";
	newCheckbox6.className = "checkoff";
	newCheckbox7.className = "checkoff";
	
	newCheckbox1.id = "suggestions";
	newCheckbox2.id = "close";
	newCheckbox3.id = "sort";
	newCheckbox4.id = "stats";
	newCheckbox5.id = "small";
	newCheckbox6.id = "auto";
	newCheckbox7.id = "replace";
	
	newImage1.className = "checkicon";
	newImage2.className = "checkicon";
	newImage3.className = "checkicon";
	newImage4.className = "checkicon";
	newImage5.className = "checkicon";
	newImage6.className = "checkicon";
	newImage7.className = "checkicon";
	
	newImage1.src = BLANK;
	newImage2.src = BLANK;
	newImage3.src = BLANK;
	newImage4.src = BLANK;
	newImage5.src = BLANK;
	newImage6.src = BLANK;
	newImage7.src = BLANK;
	
	// Sets the default states of all settings checkboxes according to the current saved settings
	if (SUGGESTIONS) {
		newCheckbox1.className = "checkon";
		newImage1.src = SOURCE.check;
	}
	
	if (CLOSE) {
		newCheckbox2.className = "checkon";
		newImage2.src = SOURCE.check;
	}
	
	if (SORT) {
		newCheckbox3.className = "checkon";
		newImage3.src = SOURCE.check;
	}
	
	if (STATS) {
		newCheckbox4.className = "checkon";
		newImage4.src = SOURCE.check;
	}
	
	if (SMALL) {
		newCheckbox5.className = "checkon";
		newImage5.src = SOURCE.check;
	}
	
	if (AUTO) {
		newCheckbox6.className = "checkon";
		newImage6.src = SOURCE.check;
	}
	
	if (REPLACE) {
		newCheckbox7.className = "checkon";
		newImage7.src = SOURCE.check;
	}
	
	// Creates listeners to handle mouse hover and element focus for all settings checkboxes
	for (var c = 0; c < checkboxes.length; c++) {
		var checkbox = checkboxes[c];
		
		checkbox.addEventListener("mouseenter", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = SOURCE.check;
			}
		});
		
		checkbox.addEventListener("mouseleave", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = BLANK;
			}
		});
		
		checkbox.addEventListener("focusin", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = SOURCE.check;
			}
		});
		
		checkbox.addEventListener("focusout", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = BLANK;
			}
		});
	}
	
	// Creates listeners to handle clicks for all settings checkboxes
	newCheckbox1.addEventListener("click", function() {
		SUGGESTIONS = !SUGGESTIONS;
		SETTINGS.suggestions = SUGGESTIONS;
		this.className === "checkoff" ? this.className = "checkon" : this.className = "checkoff";
		this.blur();
	});
	
	newCheckbox2.addEventListener("click", function() {
		CLOSE = !CLOSE;
		SETTINGS.close = CLOSE;
		this.className === "checkoff" ? this.className = "checkon" : this.className = "checkoff";
		this.blur();
	});
	
	newCheckbox3.addEventListener("click", function() {
		SORT = !SORT;
		SETTINGS.sort = SORT;
		this.className === "checkoff" ? this.className = "checkon" : this.className = "checkoff";
		this.blur();
	});
	
	newCheckbox4.addEventListener("click", function() {
		STATS = !STATS;
		SETTINGS.stats = STATS;
		this.className === "checkoff" ? this.className = "checkon" : this.className = "checkoff";
		this.blur();
	});
	
	newCheckbox5.addEventListener("click", function() {
		SMALL = !SMALL;
		SETTINGS.small = SMALL;
		this.className === "checkoff" ? this.className = "checkon" : this.className = "checkoff";
		this.blur();
	});
	
	newCheckbox6.addEventListener("click", function() {
		AUTO = !AUTO;
		SETTINGS.auto = AUTO;
		this.className === "checkoff" ? this.className = "checkon" : this.className = "checkoff";
		this.blur();
	});
	
	newCheckbox7.addEventListener("click", function() {
		REPLACE = !REPLACE;
		SETTINGS.replace = REPLACE;
		this.className === "checkoff" ? this.className = "checkon" : this.className = "checkoff";
		this.blur();
	});
	
	// Creates click listeners to open each link in a new tab
	links = newP8.childNodes;
	for (var l = 1; l < links.length; l+= 2) {
		var link = links[l];
		link.addEventListener("click", function() {
			chrome.tabs.create({url: this.href});
		});
	}
	
	// Deletes all elements from the previous tab
	trimElement(content);
	
	newButton.appendChild(newButtonImage);
	
	newCheckbox1.appendChild(newImage1);
	newCheckbox2.appendChild(newImage2);
	newCheckbox3.appendChild(newImage3);
	newCheckbox4.appendChild(newImage4);
	newCheckbox5.appendChild(newImage5);
	newCheckbox6.appendChild(newImage6);
	newCheckbox7.appendChild(newImage7);
	
	menu.appendChild(newButton);
	
	content.appendChild(newP1);
	content.appendChild(newCheckbox1);
	content.appendChild(newP2);
	content.appendChild(newCheckbox2);
	content.appendChild(newP3);
	content.appendChild(newCheckbox3);
	content.appendChild(newP4);
	content.appendChild(newCheckbox4);
	content.appendChild(newP5);
	content.appendChild(newCheckbox5);
	content.appendChild(newP6);
	content.appendChild(newCheckbox6);
	content.appendChild(newP7);
	content.appendChild(newCheckbox7);
	content.appendChild(newP8);
}