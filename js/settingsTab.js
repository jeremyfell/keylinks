
// Exports all keylinks as bookmarks in a folder named Keylinks within the Other Bookmarks folder
function exportBookmarks() {
	folder_name = prompt("Export all keylinks to a folder under Other Bookmarks\nSpecify the folder name:");

	// If the cancel button was pressed
	if (folder_name == null) {
		document.getElementById("export").blur();
		return;
	}

	// Default folder name if none is specified
	if (folder_name === "") folder_name = "Keylinks";


	chrome.bookmarks.create({title: folder_name}, function(parent_folder) {

		// Creates each bookmark in the folder
		for (var keyword in KEYLINKS) {
			chrome.bookmarks.create({title: keyword, url: KEYLINKS[keyword].link, parentId: parent_folder.id});
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

	var newDiv1 = document.createElement("div");
	var newDiv2 = document.createElement("div");
	var newDiv3 = document.createElement("div");
	var newDiv4 = document.createElement("div");
	var newDiv5 = document.createElement("div");
	var newDiv6 = document.createElement("div");
	var newDiv7 = document.createElement("div");
	var newDiv8 = document.createElement("div");

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
	CURRENT_TAB = "settings";
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

	newDiv1.className = "settings-container";
	newDiv2.className = "settings-container";
	newDiv3.className = "settings-container";
	newDiv4.className = "settings-container";
	newDiv5.className = "settings-container";
	newDiv6.className = "settings-container";
	newDiv7.className = "settings-container";
	newDiv8.className = "settings-container";

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

	newCheckbox1.id = "SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX";
	newCheckbox2.id = "CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB";
	newCheckbox3.id = "SHOW_SORTING_OPTIONS_IN_MANAGE_TAB";
	newCheckbox4.id = "SHOW_KEYLINK_STATS_IN_ADD_TAB";
	newCheckbox5.id = "USE_SMALL_POPUP_ON_STARTUP";
	newCheckbox6.id = "SUGGEST_KEYWORDS_WHEN_ADDING_KEYLINK";
	newCheckbox7.id = "ALLOW_LINK_REPLACING_IN_ADD_TAB";

	newImage1.className = "checkicon";
	newImage2.className = "checkicon";
	newImage3.className = "checkicon";
	newImage4.className = "checkicon";
	newImage5.className = "checkicon";
	newImage6.className = "checkicon";
	newImage7.className = "checkicon";

	newImage1.src = BLANK_IMAGE;
	newImage2.src = BLANK_IMAGE;
	newImage3.src = BLANK_IMAGE;
	newImage4.src = BLANK_IMAGE;
	newImage5.src = BLANK_IMAGE;
	newImage6.src = BLANK_IMAGE;
	newImage7.src = BLANK_IMAGE;

	// Sets the default states of all settings checkboxes according to the current saved settings
	if (SETTINGS.SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX) {
		newCheckbox1.className = "checkon";
		newImage1.src = SOURCE.check;
	}

	if (SETTINGS.CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB) {
		newCheckbox2.className = "checkon";
		newImage2.src = SOURCE.check;
	}

	if (SETTINGS.SHOW_SORTING_OPTIONS_IN_MANAGE_TAB) {
		newCheckbox3.className = "checkon";
		newImage3.src = SOURCE.check;
	}

	if (SETTINGS.SHOW_KEYLINK_STATS_IN_ADD_TAB) {
		newCheckbox4.className = "checkon";
		newImage4.src = SOURCE.check;
	}

	if (SETTINGS.USE_SMALL_POPUP_ON_STARTUP) {
		newCheckbox5.className = "checkon";
		newImage5.src = SOURCE.check;
	}

	if (SETTINGS.SUGGEST_KEYWORDS_WHEN_ADDING_KEYLINK) {
		newCheckbox6.className = "checkon";
		newImage6.src = SOURCE.check;
	}

	if (SETTINGS.ALLOW_LINK_REPLACING_IN_ADD_TAB) {
		newCheckbox7.className = "checkon";
		newImage7.src = SOURCE.check;
	}

	// Creates listeners to handle mouse hover and element focus for all settings checkboxes
	for (var i = 0; i < checkboxes.length; i++) {
		var checkbox = checkboxes[i];

		checkbox.addEventListener("mouseenter", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = SOURCE.check;
			}
		});

		checkbox.addEventListener("mouseleave", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = BLANK_IMAGE;
			}
		});

		checkbox.addEventListener("focusin", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = SOURCE.check;
			}
		});

		checkbox.addEventListener("focusout", function() {
			if (this.className === "checkoff") {
				this.firstChild.src = BLANK_IMAGE;
			}
		});

		checkbox.addEventListener("click", function() {
			SETTINGS[this.id] = !SETTINGS[this.id];
			this.className = (this.className === "checkoff" ? "checkon" : "checkoff")
			this.blur();

		});
	}

	// Creates click listeners to open each link in a new tab
	links = newP8.childNodes;
	for (var i = 1; i < links.length; i += 2) {
		links[i].addEventListener("click", function() {
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

	newDiv1.appendChild(newP1);
	newDiv1.appendChild(newCheckbox1);
	newDiv2.appendChild(newP2);
	newDiv2.appendChild(newCheckbox2);
	newDiv3.appendChild(newP3);
	newDiv3.appendChild(newCheckbox3);
	newDiv4.appendChild(newP4);
	newDiv4.appendChild(newCheckbox4);
	newDiv5.appendChild(newP5);
	newDiv5.appendChild(newCheckbox5);
	newDiv6.appendChild(newP6);
	newDiv6.appendChild(newCheckbox6);
	newDiv7.appendChild(newP7);
	newDiv7.appendChild(newCheckbox7);
	newDiv8.appendChild(newP8);

	content.appendChild(newDiv1);
	content.appendChild(newDiv2);
	content.appendChild(newDiv3);
	content.appendChild(newDiv4);
	content.appendChild(newDiv5);
	content.appendChild(newDiv6);
	content.appendChild(newDiv7);
	content.appendChild(newDiv8);
}
