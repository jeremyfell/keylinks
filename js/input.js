/*/////////////////////////
Functions controlling input
*//////////////////////////

// Check if keyword is already used by a saved bookmark
function invalidKeyword(keyword) {
	return (KEYLINKS[keyword] && keyword !== OLD_KEYWORD);
}

// Check if current keyword is valid, and able to be saved
function checkInput(item) {
	var keyword = item.value;
	var button = item.parentNode.lastChild;
	var image = item.parentNode.lastChild.firstChild;

	// Can most likely simplify all these if and else statements into a better control flow

	if (CURRENT_TAB === "import") {

		if (keyword.length === 0 || keyword.length > 25 || invalidKeyword(keyword)) {

			// Keyword is not valid, disable the import button
			image.src = BLANK_IMAGE;
			button.disabled = true;

		} else {

			// Keyword is valid, enable the import button
			image.src = SOURCE.add;
			button.disabled = false;

		}

	}

	if ((item.id === "addinput" || item.id === "smallinput") && (CURRENT_TAB === "add" || CURRENT_TAB === "tooladd")) {

		if (keyword.length === 0 || keyword.length > 25 || invalidKeyword(keyword)) {
			// Disables the add keylink button
			item.parentNode.lastChild.disabled = true;
		} else {
			// Enables the add keylink button
			item.parentNode.lastChild.disabled = false;
		}

	}


	if (keyword.length > 25 || invalidKeyword(keyword)) {

			// Keyword is not valid, make border or background red
			if (item.id == "addinput" || item.id == "smallinput") {
				item.style.borderColor = COLORS.red;
			} else {
				item.style.backgroundColor = COLORS.lightRed;
			}

			return false;

	} else {

			// Keyword is valid, get rid of border or background color
			if (item.id == "addinput" || item.id == "smallinput") {
				item.style.borderColor = null;
			} else {
				item.style.backgroundColor = null;
			}

			return true;

	}
}

// Generates a suggested keyword based on the page's title
function titleSuggestion(tabTitle) {
			title = tabTitle.substr(0, 15).toLowerCase();

			// If there are multiple words, only take the first
			if (title.indexOf(" ") > -1) {
				title = title.substr(0, title.indexOf(" "));
			}

			// Get rid of non alphanumeric characters
			title = title.replace(/[^a-zA-Z0-9]/g, "");

			// If the generated title suggestion is already a keyword, do not make a suggestion
			if (KEYLINKS[keyword]) title = "";

			return title;
}


// Configures input and button for add and toolbar tabs
function addInputs(defaultPopup, newInput, newButton, newImage) {
	var unusedLink = true;
	var currentKeyword;

	newInput.setAttribute("type", "text");
	newInput.setAttribute("maxlength", "100");

	// Check that the input is valid when any changes are made
	newInput.addEventListener("input", function() {checkInput(this)});

	chrome.tabs.getSelected(function(tab) {
		var url = tab.url;

		// Checks if the current tab's url is already associated with a keylink
		for (var keyword in KEYLINKS) {
			if (KEYLINKS[keyword].link === url) {
				currentKeyword = keyword;
				unusedLink = false;
				break;
			}
		}

		if (unusedLink) {

			if (defaultPopup) {
				CURRENT_TAB = "add";
				document.getElementById("menutitle").innerHTML = "Add Bookmark";
			} else {
				CURRENT_TAB = "tooladd";
			}

			newButton.disabled = true;

			newImage.src = SOURCE.add;
			newImage.title = "Add";
			newImage.dataset.add = "true";

			newInput.addEventListener("keydown", function(e) {
				checkInput(this);

				if (!this.parentNode.lastChild.disabled && e.which === 13) {

					var keyword = this.value;
					this.value = "";
					this.parentNode.lastChild.disabled = true;
					saveKeylink(keyword, url);

					(this.id === "addinput") ? addTab() : toolbarTab();

					if (SETTINGS.CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB) window.close();

				}
			});

			newButton.addEventListener("click", function() {
				if (!this.disabled) {

					var keyword = this.parentNode.firstChild.value;
					this.parentNode.firstChild.value = "";
					this.disabled = true;
					saveKeylink(keyword, url);

					(this.id === "addbookmark") ? addTab() : toolbarTab();

					if (SETTINGS.CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB) window.close();

				}
			});

		} else {



			if (defaultPopup) {
				CURRENT_TAB = "change";
				document.getElementById("menutitle").innerHTML = "Change Bookmark";
			} else {
				CURRENT_TAB = "toolchange";
			}

			newInput.value = currentKeyword;
			OLD_KEYWORD = currentKeyword;

			newButton.disabled = false;

			newImage.src = SOURCE.deleting;
			newImage.title = "Delete";

			// If the input is in the default popup and the keylink stats option is enabled, display keylink stats
			if (defaultPopup && SETTINGS.SHOW_KEYLINK_STATS_IN_ADD_TAB) keylinkStatistics(menu, currentKeyword);

			newInput.addEventListener("focus", function() {
				this.select();
				OLD_KEYWORD = this.value;
			});

			newInput.addEventListener("keydown", function(e) {
				if (e.which === 13) this.blur();
			});

			newInput.addEventListener("change", function() {
				if (this.value === "" || !checkInput(this)) {

					this.value = OLD_KEYWORD;
					this.style.borderColor = null;

				} else {

					var keyword = this.parentNode.firstChild.value;

					// Resets the time created and uses for the changed keylink, may want to modify this later
					saveKeylink(keyword, KEYLINKS[OLD_KEYWORD]);
					deleteKeylink(OLD_KEYWORD);

					if (SETTINGS.CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB) window.close();

				}
			});

			newButton.addEventListener("click", function() {
				deleteKeylink(this.parentNode.firstChild.value);

				(this.id === "addbookmark") ? addTab() : toolbarTab();

				if (SETTINGS.CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB) window.close();
			});
		}

		// Suggests a possible keyword based on the webpage title
		if (SETTINGS.SUGGEST_KEYWORDS_WHEN_ADDING_KEYLINK && newButton.disabled) {
			var title = titleSuggestion(tab.title);

			newButton.disabled = false;
			newInput.value = title;

			checkInput(newInput);
		}

		newInput.select();

	});

}
