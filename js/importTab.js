// Adds bookmark in import tab and removes it from the list
function importBookmark(inputBox) {
	var link = inputBox.dataset.link;
	var keyword = inputBox.value;
	var importBookmarksList = document.getElementById("import-bookmarks-list");
	var bookmarkListItems = importBookmarksList.childNodes;

	// Resets the input box value and resets validation, in case any input box had the keyword that was just saved
	for (var i = 0; i < bookmarkListItems.length; i++) {

		var bookmarkItem = bookmarkListItems[i];
		bookmarkItem.firstChild.value = "";
		validateImportKeywordInput(bookmarkItem.firstChild);

	}

	inputBox.parentNode.remove();

	if (bookmarkListItems.length > 1) {
		importBookmarksList.firstChild.firstChild.focus();
	} else {
		importTab();
	}

	//item.parentNode.parentNode.removeChild(item.parentNode);
	saveKeylink(keyword, link);
}

function getBookmarkItems(list, sorted) {
	for (var s = 0; s < sorted.length; s++) {

		var bookmark = sorted[s];
		var bookmarkListItem = document.createElement("li");
		var importKeywordInput = document.createElement("input");
		var visitLinkButton = document.createElement("button");
		var visitLinkIcon = document.createElement("img");
		var importTitleInput = document.createElement("input");
		var importBookmarkButton = document.createElement("button");
		var importBookmarkIcon = document.createElement("img");

		importKeywordInput.setAttribute("type", "text");
		importKeywordInput.className = "import-keyword-input";
		importKeywordInput.setAttribute("maxlength", "100");

		importKeywordInput.addEventListener("keydown", function(e) {
			if (e.which === 13) this.parentNode.lastChild.click();
		});

		importKeywordInput.addEventListener("input", function() {validateImportKeywordInput(this)});

		importKeywordInput.spellcheck = false;
		importKeywordInput.dataset.link = bookmark.url;

		visitLinkButton.className = "visit-link-button";
		visitLinkButton.title = "Visit link";

		visitLinkButton.addEventListener("click", function() {
			chrome.tabs.create({url: this.parentNode.childNodes[2].title})
		});

		visitLinkIcon.src = SOURCE.equal;
		visitLinkIcon.className = "equal-icon";
		visitLinkIcon.draggable = false;

		importTitleInput.setAttribute("type", "text");
		importTitleInput.setAttribute("disabled", "disabled");
		importTitleInput.value = bookmark.title;
		importTitleInput.title = bookmark.url;
		importTitleInput.className = "import-title-input";
		importTitleInput.spellcheck = false;

		importBookmarkButton.className = "import-bookmark-button";
		importBookmarkButton.disabled = true;
		importBookmarkButton.title = "Create keylink";
		importBookmarkButton.addEventListener("click", function() {
			importBookmark(this.parentNode.firstChild);
		});


		importBookmarkIcon.src = BLANK_IMAGE;
		importBookmarkIcon.className = "import-add-icon hidden";
		importBookmarkIcon.draggable = false;

		bookmarkListItem.className = "import-bookmark-container";

		visitLinkButton.appendChild(visitLinkIcon);
		importBookmarkButton.appendChild(importBookmarkIcon);

		bookmarkListItem.appendChild(importKeywordInput);
		bookmarkListItem.appendChild(visitLinkButton);
		bookmarkListItem.appendChild(importTitleInput);
		bookmarkListItem.appendChild(importBookmarkButton);

		list.appendChild(bookmarkListItem);
	}
}

// Gets all bookmarks, not currently saved, from a specific bookmark folder
function getBookmarks(id) {

	var content = document.getElementById("content");
	var select = document.getElementById("bookmark-folders-selection-box");
	var list = document.getElementById("import-bookmarks-list");

	trimElement(list);

	chrome.bookmarks.getChildren(id, function(folder) {

		var sortedBookmarks = [];

		// Put all bookmarks from folder that are not already keylinks into sortedBookmarks
		for (var i = 0; i < folder.length; i++) {
			var bookmark = folder[i];
			var check = true;
			for (var keyword in KEYLINKS) {
				if (bookmark.url === KEYLINKS[keyword].link) {
					check = false;
					break;
				}
			}

			if (bookmark.url && check) {
				sortedBookmarks.push(bookmark);
			}

			// Consider changing this so that at the top if !bookmark.url, then continue, and the modify bottom if to just test for check
		}

		// Sort bookmarks alphabetically
		sortedBookmarks.sort(function(a,b) {return (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 1;});

		// Create and display list of bookmarks
		getBookmarkItems(list, sortedBookmarks);

		// Focus on the first input box of the first bookmark item
		list.firstChild.firstChild.focus();

	});

}

// Recursively gets all bookmark folders that have at least 1 bookmark not currently saved
function getFolders(tree) {

	if (tree.children) {

		for (var t = 0; t < tree.children.length; t++) {

			var branch = tree.children[t];

			if (branch.children && branch.title !== "") {

				var check = false;

				for (var b = 0; b < branch.children.length; b++) {

					var twig = branch.children[b];
					var bookmarkcheck = true;

					for (var keyword in KEYLINKS) {

						if (twig.url === KEYLINKS[keyword].link) {
							bookmarkcheck = false;
						}

					}

					if (twig.url && bookmarkcheck) {
						check = true;
						break;
					}

				}

				if (check) {
					BOOKMARK_FOLDERS.push([branch.title, branch.id]);
				}
			}

			getFolders(branch);

		}
	}

}

// Creates import bookmark tab when import icon is pressed
function importTab() {

	var menu = document.getElementById("menu");
	var content = document.getElementById("content");
	var newSelect = document.createElement("select");
	var newList = document.createElement("ul");

	// Tab setup
	resetMenu();
	CURRENT_TAB = "import";
	document.getElementById("import-tab-button").disabled = true;
	document.getElementById("menu-title").innerHTML = "Import Bookmarks";

	newSelect.id = "bookmark-folders-selection-box";
	newSelect.addEventListener("change", function() {getBookmarks(this.options[this.selectedIndex].value)});
	newList.id = "import-bookmarks-list";

	chrome.bookmarks.getTree(function(tree) {

		BOOKMARK_FOLDERS = [];
		getFolders(tree[0]);

		if (BOOKMARK_FOLDERS.length > 0) {

			NO_BOOKMARKS_TO_IMPORT = false;

			// For each bookmark folder, add it as an option in the dropdown menu
			for (var index = 0; index < BOOKMARK_FOLDERS.length; index++) {

				var folder = BOOKMARK_FOLDERS[index];
				var newOption = document.createElement("option");

				newOption.innerHTML = folder[0];
				newOption.setAttribute("value", folder[1]);
				newSelect.appendChild(newOption);

			}

			trimElement(content);

			menu.appendChild(newSelect);
			content.appendChild(newList);

			getBookmarks(newSelect.options[newSelect.selectedIndex].value);

		} else {

			// All bookmarks in all folders have already been imported, or there are no bookmarks
			var newP1 = document.createElement("p");
			var newP2 = document.createElement("p");

			NO_BOOKMARKS_TO_IMPORT = true;

			newP1.className = "empty-tab-header";
			newP2.className = "empty-tab-text";
			newP1.innerHTML = "You don't have any Chrome bookmarks to import!";
			newP2.innerHTML = "That's okay, you can use the Add tab to create one for your current page.";

			trimElement(content);

			content.appendChild(newP1);
			content.appendChild(newP2);

		}
	});

}
