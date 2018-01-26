/*/////////////////////////
Functions configuring input
*//////////////////////////
function configureAddKeylinkInput(defaultPopup, addKeywordInput, addKeylinkButton, addKeylinkIcon, url) {

	if (defaultPopup) document.getElementById("menu-title").innerHTML = "Add Keylink";

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
		document.getElementById("menu-title").innerHTML = "Change Keylink";
		// If the input is in the default popup and the keylink stats option is enabled, display keylink stats
		if (SETTINGS.keylinkStats) keylinkStatistics(currentKeyword);
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
			this.classList.remove("input-invalid");

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
function configureKeylinkInput(defaultPopup, keywordInput, modifyButton, modifyIcon) {

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
