/*/////////////////////////
Functions controlling input
*//////////////////////////

// Check if keyword is already used by a saved bookmark
function invalidKeyword(keyword) {
	return (KEYLINKS[keyword] && keyword !== OLDKEYWORD);
}

// Check if current keyword is valid, and able to be saved
function checkInput(item) {
	var keyword = item.value;
	var button = item.parentNode.lastChild;
	var image = item.parentNode.lastChild.firstChild;

	// Can most likely simplify all these if and else statements into a better control flow

	if (PAGE === "import") {

		if (keyword.length === 0 || keyword.length > 25 || invalidKeyword(keyword)) {

			// Keyword is not valid, disable the import button
			image.src = BLANK;
			button.disabled = true;

		} else {

			// Keyword is valid, enable the import button
			image.src = SOURCE.add;
			button.disabled = false;

		}

	}

	if ((item.id === "addinput" || item.id === "smallinput") && (PAGE === "add" || PAGE === "tooladd")) {

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
				item.style.backgroundColor = COLORS.lightred;
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

function titleSuggestion(tabtitle) {
			title = tabtitle.substr(0, 15).toLowerCase();

			// If there are multiple words, only take the first
			if (title.indexOf(" ") > -1) {
				title = title.substr(0, title.indexOf(" "));
			}

			// Get rid of non alphanumeric characters
			title = title.replace(/[^a-zA-Z0-9]/g, "");

			// If the generated title suggestion is already a keyword, do not make a suggestion
			for (var key in KEYLINKS) {
				if (key === title) {
					title = "";
					break;
				}
			}

			return title;
}

// Display the date the keylink was created and how many times it has been used
function keylinkStatistics(menu, currentKeyword) {
	var time = KEYLINKS[currentKeyword][1];
	var date = new Date(time);

	var newP1 = document.createElement("p");
	var newP2 = document.createElement("p");

	newP1.className = "stat";
	newP2.className = "stat";

	newP1.innerHTML = "Created " + date.toString().substring(4, 15);
	newP1.title = date.toString().substring(16,24);
	newP2.innerHTML = "Used " + String(KEYLINKS[currentKeyword][2]) + " times";

	menu.appendChild(newP1);
	menu.appendChild(newP2);
}


// Configures input and button for add and toolbar tabs
function addInputs(defaultPopup, newInput, newButton, newImage) {
	var unusedLink = true;
	var currentKeyword;

	newInput.setAttribute("type", "text");
	newInput.setAttribute("maxlength", "100");

	// Check that the input is valid when a key is pressed, if it is not the enter key
	newInput.addEventListener("keyup", function(e) {if (e.which !== 13) checkInput(this)});

	// Check that the input is valid when any changes are made
	newInput.addEventListener("keypress", function() {checkInput(this)});
	newInput.addEventListener("paste", function() {checkInput(this)});

	chrome.tabs.getSelected(function(tab) {
		var url = tab.url;

		// Checks if the current tab's url is already associated with a keylink
		for (var key in KEYLINKS) {
			if (KEYLINKS[key][0] === url) {
				currentKeyword = key;
				unusedLink = false;
				break;
			}
		}

		if (unusedLink) {

			if (defaultPopup) {
				PAGE = "add";
				document.getElementById("menutitle").innerHTML = "Add Bookmark";
			} else {
				PAGE = "tooladd";
			}

			newButton.disabled = true;

			newImage.src = SOURCE.add;
			newImage.title = "Add";
			newImage.dataset.add = "true";

			newInput.addEventListener("keydown", function(e) {
				checkInput(this);

				if (!this.parentNode.lastChild.disabled && e.which === 13) {

					KEYWORD = this.value;
					this.value = "";
					this.parentNode.lastChild.disabled = true;
					addBookmark(url);

					(this.id === "addinput") ? addTab() : toolbarTab();

					if (CLOSE) window.close();

				}
			});

			newButton.addEventListener("click", function() {
				if (!this.disabled) {

					KEYWORD = this.parentNode.firstChild.value;
					this.parentNode.firstChild.value = "";
					this.disabled = true;
					addBookmark(url);

					(this.id === "addbookmark") ? addTab() : toolbarTab();

					if (CLOSE) window.close();

				}
			});

		} else {



			if (defaultPopup) {
				PAGE = "change";
				document.getElementById("menutitle").innerHTML = "Change Bookmark";
			} else {
				PAGE = "toolchange";
			}

			newInput.value = currentKeyword;

			newButton.disabled = false;

			newImage.src = SOURCE.deleting;
			newImage.title = "Delete";

			// If the input is in the default popup and the keylink stats option is enabled, display keylink stats
			if (defaultPopup && STATS) keylinkStatistics(menu, currentKeyword);

			newInput.addEventListener("focus", function() {this.select(); OLDKEYWORD = this.value;});
			newInput.addEventListener("keydown", function(e) {if (e.which === 13) this.blur();});
			newInput.addEventListener("change", function() {
				if (this.value === "" || !checkInput(this)) {

					this.value = OLDKEYWORD;
					this.style.borderColor = null;

				} else {

					var keyword = this.parentNode.firstChild.value;

					KEYLINKS[keyword] = KEYLINKS[OLDKEYWORD];
					delete KEYLINKS[OLDKEYWORD];

					if (CLOSE) window.close();

				}
			});

			newButton.addEventListener("click", function() {
				deleteBookmark(this);

				(this.id === "addbookmark") ? addTab() : toolbarTab();

				if (CLOSE) window.close();
			});
		}

		// Suggests a possible keyword based on the webpage title
		if (AUTO && newButton.disabled) {
			var title = titleSuggestion(tab.title);

			newButton.disabled = false;
			newInput.value = title;

			checkInput(newInput);
		}

		newInput.select();

	});

}
