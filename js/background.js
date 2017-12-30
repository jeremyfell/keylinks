var KEYLINKS;
var SETTINGS;

/*////////////////////
Functions for storage
*/////////////////////

//Retrieves keylinks and settings from storage
function updateStorage() {
	chrome.storage.sync.get(["keylinks","settings"], function(storage) {
		KEYLINKS = storage.keylinks;
		SETTINGS = storage.settings;
	});
}

//Saves keylinks and settings to storage
function saveStorage(keylinks, settings) {
	chrome.storage.sync.set({"keylinks": keylinks, "settings" : settings}, function() {
		updateStorage();
	});
}

/*//////////////////
Functions for icons
*///////////////////

// Sets bookmark status icon when a tab is created or updated
function iconChange(tabId, changeInfo, tab) {
	if (changeInfo.status === "loading" || changeInfo.status === "created") {
		var check = false;
		for (var key in KEYLINKS) {
			if (KEYLINKS[key][0] === tab.url) {
				check = true;
				break;
			}
		}
		iconSwitch(check, tabId);
	}
}

// Updates bookmark status icon when a new bookmark is added
function iconUpdate(bookmark, url) {
	chrome.tabs.query({}, function(tabs) {
		for (var t = 0; t < tabs.length; t++) {
			var tab = tabs[t];
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
		var keylink = KEYLINKS[keyword];
		var keyurl = keylink[0];
		KEYLINKS[keyword][2]++;
		chrome.tabs.update({url: keyurl});
		chrome.storage.sync.set({"keylinks": KEYLINKS});

	} else {

		// If the keyword is invalid, go to the broken link page
		chrome.tabs.update({url: chrome.extension.getURL("../html/broken.html")});

	}

});


//Multiple variables with same name, should change
//Shows keyword suggestions
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {

	suggestions = SETTINGS.suggestions;

	if (suggestions && text.length > 0) {

		var matches = [];

		// Finds all keywords that have the omnibox text at the start
		for (key in KEYLINKS) {
			if (key.lastIndexOf(text, 0) === 0 && text.length <= key.length) { // lastIndexOf could possibly be replaced with just firstIndexOf === 0
				matches.push(key);
			}
		}

		if (matches.length > 0) {

			var suggestions = [];
			// Sorts the possible matches by how many times they have been used
			matches.sort(function compare(a, b) {return (a[2] < b[2]) ? -1 : 1;});

			// Adds the 5 most used matches to the suggestions, or less if there are less matches
			for (var m = 0; m < matches.length && m < 5; m++) {
				match = matches[m];
				suggestions.push({content: match, description: match});
			}

			// Pushes the suggestions to be displayed underneath the omnibox
			suggest(suggestions);

		}
	}
});

updateStorage();
