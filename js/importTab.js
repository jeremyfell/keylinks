// Adds bookmark in import tab and removes it from the list
function importAdd(item) {
	var url = item.parentNode.childNodes[2].title;
	var keyword = item.parentNode.firstChild.value;

	for (var i = 0; i < item.parentNode.parentNode.childNodes.length; i++) {

		var listItem = item.parentNode.parentNode.childNodes[i];
		listItem.firstChild.value = "";

		// Necessary?
		validateKeywordInput(listItem.firstChild);

	}

	if (item.parentNode.parentNode.childNodes.length > 1) {
		item.parentNode.parentNode.childNodes[1].firstChild.focus();
	} else {
		importTab();
	}

	item.parentNode.parentNode.removeChild(item.parentNode);
	saveKeylink(keyword, url);
}

function getBookmarkItems(list, sorted) {
	for (var s = 0; s < sorted.length; s++) {

		var bookmark = sorted[s];
		var newListItem = document.createElement("li");
		var newInput1 = document.createElement("input");
		var newButton1 = document.createElement("button");
		var newImage1 = document.createElement("img");
		var newInput2 = document.createElement("input");
		var newButton2 = document.createElement("button");
		var newImage2 = document.createElement("img");

		newInput1.setAttribute("type", "text");
		newInput1.className = "import-keyword-input";
		newInput1.setAttribute("maxlength", "100");

		newInput1.addEventListener("keydown", function(e) {
			validateKeywordInput(this);
			if (this.parentNode.lastChild.firstChild.src.indexOf(SOURCE.add) !== -1 && e.which === 13) {
				importAdd(this);
			}
		});

		newInput1.addEventListener("input", function() {validateKeywordInput(this)});

		newInput1.spellcheck = false;

		newButton1.className = "visit-link-button";
		newButton1.title = "Visit link";

		newButton1.addEventListener("click", function() {
			chrome.tabs.create({url: this.parentNode.childNodes[2].title})
		});

		newImage1.src = SOURCE.equal;
		newImage1.className = "equal-icon";

		newInput2.setAttribute("type", "text");
		newInput2.setAttribute("disabled", "disabled");
		newInput2.value = bookmark.title;
		newInput2.title = bookmark.url;
		newInput2.className = "import-title-input";
		newInput2.spellcheck = false;

		newButton2.className = "import-bookmark-button";
		newButton2.disabled = true;
		newButton2.title = "Create keylink";
		newButton2.addEventListener("click", function() {if (!this.disabled) importAdd(this.parentNode.firstChild)});


		newImage2.src = BLANK_IMAGE;
		newImage2.className = "import-add-icon hidden";

		newListItem.className = "import-bookmark-container";

		newButton1.appendChild(newImage1);
		newButton2.appendChild(newImage2);

		newListItem.appendChild(newInput1);
		newListItem.appendChild(newButton1);
		newListItem.appendChild(newInput2);
		newListItem.appendChild(newButton2);

		list.appendChild(newListItem);
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
