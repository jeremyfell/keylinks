var KEYLINKS = {};
var SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX = false;
var SETTINGS_KEY = "___KEYLINKS_USER_SETTINGS___";

// Path to page displayed for entering an invalid keylink in the omnibox
var BROKEN_PAGE = "../html/broken.html";

/*////////////////////
Functions for storage
*/////////////////////

// Retrieves keylinks and the ketword suggestion in omnibox setting from storage into the background page
function updateBackgroundPageStorage() {
	chrome.storage.sync.get(null, function(storage) {

		for (var key in storage) {
			if (key === SETTINGS_KEY) {
				SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX = storage[SETTINGS_KEY].SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX;
			} else {
				KEYLINKS[key] = storage[key];
			}
		}

	});
}


/*//////////////////
Functions for icons
*///////////////////

// Sets bookmark status icon when a tab is created or updated
function iconChange(tabId, changeInfo, tab) {
	if (changeInfo.status === "loading" || changeInfo.status === "created") {
		var check = false;
		for (var keyword in KEYLINKS) {
			if (KEYLINKS[keyword].link === tab.url) {
				check = true;
				break;
			}
		}
		iconSwitch(check, tabId);
	}
}

// Double check whether it needs to examine all tabs
// Updates bookmark status icon when a new bookmark is added
function iconUpdate(bookmark, url) {
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			var tab = tabs[i];
			if (tab.url === url) {
				iconSwitch(bookmark, tab.id);
			}
		}
	});
}

function iconSwitch(bookmarked, id) {

	if (bookmarked) {

		chrome.browserAction.setIcon({
			path: "icons/keylink19.png",
			tabId: id
		});

	} else {

		chrome.browserAction.setIcon({
			path: "icons/link19.png",
			tabId: id
		});

	}

}

/*////////////
Tab listeners
*/////////////

//Calls iconChange when a tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	iconChange(tabId, changeInfo, tab);
});

//Calls iconChange when a tab is created
chrome.tabs.onCreated.addListener(function(tab) {
	iconChange(tab.id, {status: "created", url: tab.url}, tab);
});

/*////////////////
Omnibox listeners
*/////////////////

//Takes user to the link associated with the keyword
chrome.omnibox.onInputEntered.addListener(function(keyword) {

	if (KEYLINKS[keyword]) {

		// If the keyword is valid, go to the associated link, increment total uses, and save keylinks
		var link = KEYLINKS[keyword].link;
		var storageChanges = {};
		KEYLINKS[keyword].timesUsed++;
		storageChanges[keyword]= KEYLINKS[keyword];
		chrome.tabs.update({url: link});
		chrome.storage.sync.set(storageChanges);

	} else {

		// If the keyword is invalid, go to the broken link page
		chrome.tabs.update({url: chrome.extension.getURL(BROKEN_PAGE)});

	}

});


//Multiple variables with same name, should change
//Shows keyword suggestions
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {

	if (SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX && text.length > 0) {

		var matches = [];

		// Finds all keywords that have the omnibox text at the start
		for (keyword in KEYLINKS) {
			if (keyword.lastIndexOf(text, 0) === 0 && text.length <= keyword.length) { // lastIndexOf could possibly be replaced with just firstIndexOf === 0
				matches.push(keyword);
			}
		}

		if (matches.length > 0) {

			var bestFiveSuggestions = [];

			// Sorts the possible matches by how many times they have been used
			matches.sort(function compare(a, b) {return (a.timesUsed < b.timesUsed) ? -1 : 1;});

			// Adds the 5 most used matches to the suggestions, or less if there are less matches
			for (var i = 0; i < matches.length && i < 5; i++) {
				match = matches[i];
				bestFiveSuggestions.push({content: match, description: match});
			}

			// Pushes the suggestions to be displayed underneath the omnibox
			suggest(bestFiveSuggestions);

		}
	}
});

updateBackgroundPageStorage();
