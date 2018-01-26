
// Exports all keylinks as bookmarks in a folder within the Other Bookmarks folder
function exportBookmarks() {
	var folderName = prompt("Export all keylinks to a folder under Other Bookmarks\nSpecify the folder name:");

	// If the cancel button was pressed
	if (folderName === null) {
		document.getElementById("export-button").blur();
		return;
	}

	// Default folder name if none is specified
	if (folderName === "") folderName = "Keylinks";

	chrome.bookmarks.create({title: folderName}, function(parentFolder) {

		// Creates each bookmark in the folder
		for (var keyword in KEYLINKS) {
			chrome.bookmarks.create({title: keyword, url: KEYLINKS[keyword].link, parentId: parentFolder.id});
		}

		// Opens a new tab at the chrome bookmarks page
		chrome.tabs.create({url: "chrome://bookmarks"});

	});
}

// Called when the user clicks on a setting button in the settings tab
// Toggles the setting value and saves the change to storage
function toggleSetting(setting) {
	var storageChanges = {};
	SETTINGS[setting] = !SETTINGS[setting];
	storageChanges[SETTINGS_KEY] = SETTINGS;
	chrome.storage.sync.set(storageChanges, function(entry) {errorCheck(entry)});
}

// Creates the settings tab when the gear icon is pressed
function settingsTab() {

	var content = document.getElementById("content");
	var menu = document.getElementById("menu");

	var exportButton = document.createElement("button");
	var exportButtonIcon = document.createElement("img");

	var omniboxSuggestionsContainer = document.createElement("div");
	var closePopupContainer = document.createElement("div");
	var sortingOptionsContainer = document.createElement("div");
	var keylinkStatsContainer = document.createElement("div");
	var toolbarPopupContainer = document.createElement("div");
	var keywordSuggestionsContainer = document.createElement("div");
	var creditsContainer = document.createElement("div");

	var omniboxSuggestionsText = document.createElement("p");
	var closePopupText = document.createElement("p");
	var sortingOptionsText = document.createElement("p");
	var keylinkStatsText = document.createElement("p");
	var toolbarPopupText = document.createElement("p");
	var keywordSuggestionsText = document.createElement("p");
	var creditsText = document.createElement("p");

	var omniboxSuggestionsCheckbox = document.createElement("button");
	var closePopupCheckbox = document.createElement("button");
	var sortingOptionsCheckbox = document.createElement("button");
	var keylinkStatsCheckbox = document.createElement("button");
	var toolbarPopupCheckbox = document.createElement("button");
	var keywordSuggestionsCheckbox = document.createElement("button");

	var omniboxSuggestionsIcon = document.createElement("img");
	var closePopupIcon = document.createElement("img");
	var sortingOptionsIcon = document.createElement("img");
	var keylinkStatsIcon = document.createElement("img");
	var toolbarPopupIcon = document.createElement("img");
	var keywordSuggestionsIcon = document.createElement("img");

	var settingCheckboxes = [omniboxSuggestionsCheckbox, closePopupCheckbox, sortingOptionsCheckbox, keylinkStatsCheckbox, toolbarPopupCheckbox, keywordSuggestionsCheckbox];

	// Tab setup
	resetMenu();
	CURRENT_TAB = "settings";
	document.getElementById("settings-tab-button").disabled = true;
	document.getElementById("menu-title").innerHTML = "Settings";

	exportButton.className = "menu-button";
	exportButton.id = "export-button";
	exportButton.title = "Export keylinks as bookmarks";

	exportButtonIcon.className = "menu-tab-icon";
	exportButtonIcon.id = "export-icon";
	exportButtonIcon.src = SOURCE.exporting;
	exportButtonIcon.draggable = false;

	exportButton.addEventListener("click", function() {
		exportBookmarks();
	});

	omniboxSuggestionsContainer.className = "setting-container";
	closePopupContainer.className = "setting-container";
	sortingOptionsContainer.className = "setting-container";
	keylinkStatsContainer.className = "setting-container";
	toolbarPopupContainer.className = "setting-container";
	keywordSuggestionsContainer.className = "setting-container";
	creditsContainer.className = "setting-container";

	omniboxSuggestionsText.innerHTML = "Keyword suggestions in omnibox";
	closePopupText.innerHTML = "Close popup after adding, changing or deleting a bookmark";
	sortingOptionsText.innerHTML = "Show sorting options in Edit tab";
	keylinkStatsText.innerHTML = "Show bookmark details in Add tab";
	toolbarPopupText.innerHTML = "Start extension with smaller and more basic popup";
	keywordSuggestionsText.innerHTML = "Keyword suggestions when adding a bookmark";

	omniboxSuggestionsText.title = "When entering a keyword in the omnibox,\nyou will see suggestions for keylinks you\nhave currently saved.";
	closePopupText.title = "The extension popup will close automatically\nwhen you add, change or delete a keylink\nusing the Add tab.";
	sortingOptionsText.title = "You will see additional options for sorting\nkeylinks by name, by date created, and by\nuse, in the Edit tab.";
	keylinkStatsText.title = "Shows stats in the Add tab such as when\nthe keylink was created, and how many\ntimes you have used it.";
	toolbarPopupText.title = "Starts the extension as a smaller, more basic\npopup, with an Options button to access\nthe full popup.";
	keywordSuggestionsText.title = "Suggests keywords for a webpage when adding a bookmark";

	omniboxSuggestionsText.className = "settings-text";
	closePopupText.className = "settings-text";
	sortingOptionsText.className = "settings-text";
	keylinkStatsText.className = "settings-text";
	toolbarPopupText.className = "settings-text";
	keywordSuggestionsText.className = "settings-text";

	creditsText.id = "credits";
	creditsText.innerHTML = 	"Icons by <a href='http://www.flaticon.com/authors/google'>Google</a> and <a href='http://www.flaticon.com/authors/freepik'>Freepik</a>" +
						" via <a href='http://www.flaticon.com'>flaticon</a>, licensed by <a href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons BY 3.0'>" +
						"CC BY 3.0</a>. Report any bugs to keylinks.help@gmail.com";

	omniboxSuggestionsCheckbox.className = "disabled-setting";
	closePopupCheckbox.className = "disabled-setting";
	sortingOptionsCheckbox.className = "disabled-setting";
	keylinkStatsCheckbox.className = "disabled-setting";
	toolbarPopupCheckbox.className = "disabled-setting";
	keywordSuggestionsCheckbox.className = "disabled-setting";

	omniboxSuggestionsCheckbox.id = "keywordSuggestions";
	closePopupCheckbox.id = "closePopup";
	sortingOptionsCheckbox.id = "sortingOptions";
	keylinkStatsCheckbox.id = "keylinkStats";
	toolbarPopupCheckbox.id = "toolbarPopup";
	keywordSuggestionsCheckbox.id = "keywordSuggestions";

	omniboxSuggestionsIcon.className = "setting-icon";
	closePopupIcon.className = "setting-icon";
	sortingOptionsIcon.className = "setting-icon";
	keylinkStatsIcon.className = "setting-icon";
	toolbarPopupIcon.className = "setting-icon";
	keywordSuggestionsIcon.className = "setting-icon";

	omniboxSuggestionsIcon.src = BLANK_IMAGE;
	closePopupIcon.src = BLANK_IMAGE;
	sortingOptionsIcon.src = BLANK_IMAGE;
	keylinkStatsIcon.src = BLANK_IMAGE;
	toolbarPopupIcon.src = BLANK_IMAGE;
	keywordSuggestionsIcon.src = BLANK_IMAGE;

	omniboxSuggestionsIcon.draggable = false;
	closePopupIcon.draggable = false;
	sortingOptionsIcon.draggable = false;
	keylinkStatsIcon.draggable = false;
	toolbarPopupIcon.draggable = false;
	keywordSuggestionsIcon.draggable = false;

	// Sets the default states of all settings checkboxes according to the current saved settings
	if (SETTINGS.keywordSuggestions) {
		omniboxSuggestionsCheckbox.className = "enabled-setting";
		omniboxSuggestionsIcon.src = SOURCE.checkmark;
	}

	if (SETTINGS.closePopup) {
		closePopupCheckbox.className = "enabled-setting";
		closePopupIcon.src = SOURCE.checkmark;
	}

	if (SETTINGS.sortingOptions) {
		sortingOptionsCheckbox.className = "enabled-setting";
		sortingOptionsIcon.src = SOURCE.checkmark;
	}

	if (SETTINGS.keylinkStats) {
		keylinkStatsCheckbox.className = "enabled-setting";
		keylinkStatsIcon.src = SOURCE.checkmark;
	}

	if (SETTINGS.toolbarPopup) {
		toolbarPopupCheckbox.className = "enabled-setting";
		toolbarPopupIcon.src = SOURCE.checkmark;
	}

	if (SETTINGS.keywordSuggestions) {
		keywordSuggestionsCheckbox.className = "enabled-setting";
		keywordSuggestionsIcon.src = SOURCE.checkmark;
	}

	// Creates listeners to handle mouse hover and element focus for all settings checkboxes
	for (var i = 0; i < settingCheckboxes.length; i++) {
		var checkbox = settingCheckboxes[i];

		checkbox.addEventListener("mouseenter", function() {
			if (this.className === "disabled-setting") {
				this.firstChild.src = SOURCE.checkmark;
			}
		});

		checkbox.addEventListener("mouseleave", function() {
			if (this.className === "disabled-setting") {
				this.firstChild.src = BLANK_IMAGE;
			}
		});

		checkbox.addEventListener("focusin", function() {
			if (this.className === "disabled-setting") {
				this.firstChild.src = SOURCE.checkmark;
			}
		});

		checkbox.addEventListener("focusout", function() {
			if (this.className === "disabled-setting") {
				this.firstChild.src = BLANK_IMAGE;
			}
		});

		checkbox.addEventListener("click", function() {
			toggleSetting(this.id);
			this.className = (this.className === "disabled-setting" ? "enabled-setting" : "disabled-setting")
			this.blur();
		});
	}

	// Creates click listeners to open each link in a new tab
	var creditsLinks = creditsText.childNodes;
	for (var i = 1; i < creditsLinks.length; i += 2) {
		creditsLinks[i].addEventListener("click", function() {
			chrome.tabs.create({url: this.href});
		});
	}

	trimElement(content);

	exportButton.appendChild(exportButtonIcon);

	menu.appendChild(exportButton);

	omniboxSuggestionsCheckbox.appendChild(omniboxSuggestionsIcon);
	closePopupCheckbox.appendChild(closePopupIcon);
	sortingOptionsCheckbox.appendChild(sortingOptionsIcon);
	keylinkStatsCheckbox.appendChild(keylinkStatsIcon);
	toolbarPopupCheckbox.appendChild(toolbarPopupIcon);
	keywordSuggestionsCheckbox.appendChild(keywordSuggestionsIcon);

	omniboxSuggestionsContainer.appendChild(omniboxSuggestionsText);
	omniboxSuggestionsContainer.appendChild(omniboxSuggestionsCheckbox);
	closePopupContainer.appendChild(closePopupText);
	closePopupContainer.appendChild(closePopupCheckbox);
	sortingOptionsContainer.appendChild(sortingOptionsText);
	sortingOptionsContainer.appendChild(sortingOptionsCheckbox);
	keylinkStatsContainer.appendChild(keylinkStatsText);
	keylinkStatsContainer.appendChild(keylinkStatsCheckbox);
	toolbarPopupContainer.appendChild(toolbarPopupText);
	toolbarPopupContainer.appendChild(toolbarPopupCheckbox);
	keywordSuggestionsContainer.appendChild(keywordSuggestionsText);
	keywordSuggestionsContainer.appendChild(keywordSuggestionsCheckbox);
	creditsContainer.appendChild(creditsText);

	content.appendChild(omniboxSuggestionsContainer);
	content.appendChild(closePopupContainer);
	content.appendChild(sortingOptionsContainer);
	content.appendChild(keylinkStatsContainer);
	content.appendChild(toolbarPopupContainer);
	content.appendChild(keywordSuggestionsContainer);
	content.appendChild(creditsContainer);
}
