/*/////////////////////////
Functions controlling input
*//////////////////////////

// Check if keyword is already used by a saved bookmark
function invalidKeyword(keyword) {
	return (KEYLINKS[keyword] && keyword !== OLD_KEYWORD);
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
	if (KEYLINKS[title]) title = "";

	return title;
}


function validateImportKeywordInput(inputBox) {
	var keyword = inputBox.value;
	var button = inputBox.parentNode.lastChild;
	var icon = inputBox.parentNode.lastChild.firstChild;

	if (keyword.length === 0 || keyword.length > 25 || invalidKeyword(keyword)) {
		icon.src = BLANK_IMAGE;
		button.disabled = true;
	} else {
		icon.src = SOURCE.add;
		button.disabled = false;
	}

	return validateKeywordInput(inputBox, keyword);

}

function validateAddKeywordInput(inputBox) {
	var keyword = inputBox.value;
	var button = inputBox.parentNode.lastChild;

	button.disabled = (keyword.length === 0 || keyword.length > 25 || invalidKeyword(keyword));

	return validateKeywordInput(inputBox, keyword);

}

function validateManageKeywordInput(inputBox) {
	var keyword = inputBox.value;
	return validateKeywordInput(inputBox, keyword);
}

function validateKeywordInput(inputBox, keyword) {
	if (keyword.length > 25 || invalidKeyword(keyword)) {
		inputBox.classList.add("input-invalid");
		return false;
	} else {
		inputBox.classList.remove("input-invalid");
		return true;
	}
}

// Configures input and button for add and toolbar tabs
function addInputs(defaultPopup, newInput, newButton, newImage) {
	var unusedLink = true;
	var currentKeyword;

	newInput.setAttribute("type", "text");
	newInput.setAttribute("maxlength", "100");

	// Check that the input is valid when any changes are made
	newInput.addEventListener("input", function() {validateAddKeywordInput(this)});

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
				document.getElementById("menu-title").innerHTML = "Add Bookmark";
			} else {
				CURRENT_TAB = "tooladd";
			}

			newButton.disabled = true;

			newImage.src = SOURCE.add;
			newImage.title = "Add";
			newImage.dataset.add = "true";

			newInput.addEventListener("input", function() {
				validateAddKeywordInput(this);
			})

			newInput.addEventListener("keydown", function(e) {
				if (e.which === 13) this.parentNode.lastChild.click();
			});

			newButton.addEventListener("click", function() {

					var keyword = this.parentNode.firstChild.value;
					this.parentNode.firstChild.value = "";
					this.disabled = true;
					saveKeylink(keyword, url);

					(this.id === "addbookmark") ? addTab() : toolbarTab();

					if (SETTINGS.closePopup) window.close();
			});

		} else {



			if (defaultPopup) {
				CURRENT_TAB = "change";
				document.getElementById("menu-title").innerHTML = "Change Bookmark";
			} else {
				CURRENT_TAB = "toolchange";
			}

			newInput.value = currentKeyword;
			OLD_KEYWORD = currentKeyword;

			newButton.disabled = false;

			newImage.src = SOURCE.deleting;
			newImage.title = "Delete";

			// If the input is in the default popup and the keylink stats option is enabled, display keylink stats
			if (defaultPopup && SETTINGS.keylinkStats) keylinkStatistics(menu, currentKeyword);

			newInput.addEventListener("focus", function() {
				this.select();
				OLD_KEYWORD = this.value;
			});

			newInput.addEventListener("keydown", function(e) {
				if (e.which === 13) this.blur();
			});

			newInput.addEventListener("change", function() {
				if (this.value === "" || !validateAddKeywordInput(this)) {

					this.value = OLD_KEYWORD;
					this.style.borderColor = null;

				} else {

					var keyword = this.parentNode.firstChild.value;

					// Resets the time created and uses for the changed keylink, may want to modify this later
					saveKeylink(keyword, KEYLINKS[OLD_KEYWORD]);
					deleteKeylink(OLD_KEYWORD);

					if (SETTINGS.closePopup) window.close();

				}
			});

			newButton.addEventListener("click", function() {
				deleteKeylink(this.parentNode.firstChild.value);

				resetCurrentTab();

				(this.id === "addbookmark") ? addTab() : toolbarTab();

				if (SETTINGS.closePopup) window.close();
			});
		}

		// Suggests a possible keyword based on the webpage title
		if (SETTINGS.keywordSuggestions && newButton.disabled) {
			var title = titleSuggestion(tab.title);

			newButton.disabled = false;
			newInput.value = title;

			validateAddKeywordInput(newInput);
		}

		newInput.select();

	});

}
