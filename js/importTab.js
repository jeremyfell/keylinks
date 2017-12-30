// Adds bookmark in import tab and removes it from the list
function importAdd(item) {
	var url = item.parentNode.childNodes[2].title;
	KEYWORD = item.parentNode.firstChild.value;

	for (var i = 0; i < item.parentNode.parentNode.childNodes.length; i++) {

		var listItem = item.parentNode.parentNode.childNodes[i];
		listItem.firstChild.value = "";

		// Necessary?
		checkInput(listItem.firstChild);

	}

	if (item.parentNode.parentNode.childNodes.length > 1) {
		item.parentNode.parentNode.childNodes[1].firstChild.focus();
	} else {
		importTab();
	}

	item.parentNode.parentNode.removeChild(item.parentNode);
	addKeylink(url);
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
		newInput1.className = "importkeyword";
		newInput1.setAttribute("maxlength", "100");

		newInput1.addEventListener("keydown", function(e) {
			checkInput(this);
			if (this.parentNode.lastChild.firstChild.src.indexOf(SOURCE.add) != -1 && e.which === 13) {
				importAdd(this);
			}
		});

		newInput1.addEventListener("keyup", function() {checkInput(this)});
		newInput1.addEventListener("keypress", function() {checkInput(this)});
		newInput1.addEventListener("paste", function() {checkInput(this)});

		newInput1.spellcheck = false;

		newButton1.className = "linkbutton";
		newButton1.title = "Visit link";

		newButton1.addEventListener("click", function() {
			chrome.tabs.create({url: this.parentNode.childNodes[2].title})
		});

		newImage1.src = SOURCE.equal;
		newImage1.className = "link";

		newInput2.setAttribute("type", "text");
		newInput2.setAttribute("disabled", "disabled");
		newInput2.value = bookmark.title;
		newInput2.title = bookmark.url;
		newInput2.className = "importtitle";
		newInput2.spellcheck = false;

		newButton2.className = "importbutton";
		newButton2.disabled = true;
		newButton2.title = "Create keylink";
		newButton2.addEventListener("click", function() {if (!this.disabled) importAdd(this.parentNode.firstChild)});


		newImage2.src = BLANK_IMAGE;
		newImage2.className = "importadd hidden";

		newListItem.className = "importbookmark";

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
	var select = document.getElementById("folders");
	var list = document.getElementById("importbookmarks");

	trimElement(list);

	chrome.bookmarks.getChildren(id, function(folder) {

		var sorted = [];

		// Put all bookmarks from folder that are not already keylinks into sorted
		for (var index = 0; index < folder.length; index++) {
			var bookmark = folder[index];
			var check = true;
			for (var key in KEYLINKS) {
				if (bookmark.url === KEYLINKS[key][0]) {
					check = false;
					break;
				}
			}

			if (bookmark.url && check) {
				sorted.push(bookmark);
			}

			// Consider changing this so that at the top if !bookmark.url, then continue, and the modify bottom if to just test for check
		}

		// Sort bookmarks alphabetically
		sorted.sort(function(a,b) {return (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 1;});

		// Create and display list of bookmarks
		getBookmarkItems(list, sorted);

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

					for (var key in KEYLINKS) {

						var keyurl = KEYLINKS[key][0];

						if (twig.url === keyurl) {
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
	clearTabs();
	CURRENT_PAGE = "import";
	document.getElementById("importtab").disabled = true;
	document.getElementById("menutitle").innerHTML = "Import Bookmarks";

	newSelect.id = "folders";
	newSelect.addEventListener("change", function() {getBookmarks(this.options[this.selectedIndex].value)});
	newList.id = "importbookmarks";

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
			
			newP1.className = "emptymain";
			newP2.className = "emptybody";
			newP1.innerHTML = "You don't have any Chrome bookmarks to import!";
			newP2.innerHTML = "That's okay, you can use the Add tab to create one for your current page.";

			trimElement(content);

			content.appendChild(newP1);
			content.appendChild(newP2);

		}
	});

}
