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



function configureAddKeylinkInput(defaultPopup, addKeywordInput, addKeylinkButton, addKeylinkIcon, url) {

	if (defaultPopup) document.getElementById("menu-title").innerHTML = "Add Bookmark";

	addKeylinkButton.disabled = true;

	addKeylinkIcon.src = SOURCE.add;
	addKeylinkIcon.title = "Add";

	addKeywordInput.addEventListener("input", function() {
		validateAddKeywordInput(this);
	})

	addKeywordInput.addEventListener("keydown", function(e) {
		if (e.which === 13) this.parentNode.lastChild.click();
	});

	addKeylinkButton.addEventListener("click", function() {

			var keyword = this.parentNode.firstChild.value;
			this.parentNode.firstChild.value = "";
			this.disabled = true;

			saveKeylink(keyword, url);
			resetCurrentTab();

			if (SETTINGS.closePopup) window.close();
	});
}

function configureChangeKeylinkInput(defaultPopup, changeKeywordInput, changeKeylinkButton, changeKeylinkIcon, currentKeyword) {

	if (defaultPopup) {
		document.getElementById("menu-title").innerHTML = "Change Bookmark";
		// If the input is in the default popup and the keylink stats option is enabled, display keylink stats
		if (SETTINGS.keylinkStats) keylinkStatistics(menu, currentKeyword);
	}

	changeKeywordInput.value = currentKeyword;
	OLD_KEYWORD = currentKeyword;

	changeKeylinkButton.disabled = false;

	changeKeylinkIcon.src = SOURCE.deleting;
	changeKeylinkIcon.title = "Delete";

	changeKeywordInput.addEventListener("focus", function() {
		this.select();
		OLD_KEYWORD = this.value;
	});

	changeKeywordInput.addEventListener("keydown", function(e) {
		if (e.which === 13) this.blur();
	});

	changeKeywordInput.addEventListener("change", function() {
		if (!this.value || !validateAddKeywordInput(this)) {

			this.value = OLD_KEYWORD;

		} else {

			var keyword = this.parentNode.firstChild.value;

			// Resets the time created and uses for the changed keylink, may want to modify this later
			saveKeylink(keyword, KEYLINKS[OLD_KEYWORD].link);
			deleteKeylink(OLD_KEYWORD);

			if (SETTINGS.closePopup) window.close();

		}
	});

	changeKeylinkButton.addEventListener("click", function() {

		deleteKeylink(this.parentNode.firstChild.value);
		resetCurrentTab();

		if (SETTINGS.closePopup) window.close();
	});
}


// Configures input and button for add and toolbar tabs
function addInputs(defaultPopup, keywordInput, modifyButton, modifyIcon) {

	keywordInput.setAttribute("type", "text");
	keywordInput.setAttribute("maxlength", "100");

	// Check that the input is valid when any changes are made
	keywordInput.addEventListener("input", function() {validateAddKeywordInput(this)});

	chrome.tabs.getSelected(function(tab) {
		var url = tab.url;
		var currentKeyword = getKeywordFromLink(url);

		if (currentKeyword === "") {
			configureAddKeylinkInput(defaultPopup, keywordInput, modifyButton, modifyIcon, url);

			// Suggests a possible keyword based on the webpage title
			if (SETTINGS.keywordSuggestions) {
				var title = titleSuggestion(tab.title);
				keywordInput.value = title;
				validateAddKeywordInput(keywordInput);
			}

		} else {
			configureChangeKeylinkInput(defaultPopup, keywordInput, modifyButton, modifyIcon, currentKeyword);
		}

		keywordInput.select();

	});

}
