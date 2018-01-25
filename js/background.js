var KEYLINKS = {};
var OMNIBOX_SUGGESTIONS = false;
var SETTINGS_KEY = "___KEYLINKS_USER_SETTINGS___";

// Path to page displayed for entering an invalid keylink in the omnibox
var BROKEN_PAGE = "../html/broken.html";

/*////////////////////
Functions for storage
*/////////////////////

// Retrieves keylinks and omnibox suggestions setting from storage into the background page
function updateBackgroundPageStorage() {
	chrome.storage.sync.get(null, function(storage) {

		for (var keyword in storage) {
			if (keyword === SETTINGS_KEY) {
				OMNIBOX_SUGGESTIONS = storage[SETTINGS_KEY].keywordSuggestions;
			} else {
				KEYLINKS[keyword] = storage[keyword];
			}
		}

	});
}

/*//////////////////
Functions for icons
*///////////////////

// Sets keylink status icon when a tab is created or updated
function iconChange(tabId, changeInfo, tab) {
	if (changeInfo.status === "loading" || changeInfo.status === "created") {
		var tabHasKeylink = false;
		for (var keyword in KEYLINKS) {
			if (KEYLINKS[keyword].link === tab.url) {
				tabHasKeylink = true;
				break;
			}
		}
		iconSwitch(tabHasKeylink, tabId);
	}
}

// Updates keylink status icon when a new keylink is added
function iconUpdate(tabHasKeylink, link) {

	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {

			var tab = tabs[i];

			if (tab.url === link) {
				iconSwitch(tabHasKeylink, tab.id);
			}

		}
	});

}

function iconSwitch(tabHasKeylink, tabId) {

	var iconChange = {};
	iconChange.tabId = tabId;
	iconChange.path = (tabHasKeylink) ? "icons/keylink19.png" : "icons/link19.png";
	chrome.browserAction.setIcon(iconChange);

}

/*////////////
Tab listeners
*/////////////

// Calls iconChange when a tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	iconChange(tabId, changeInfo, tab);
});

// Calls iconChange when a tab is created
chrome.tabs.onCreated.addListener(function(tab) {
	iconChange(tab.id, {status: "created", url: tab.url}, tab);
});

/*////////////////
Omnibox listeners
*/////////////////

// Takes user to the link associated with the keyword
chrome.omnibox.onInputEntered.addListener(function(keyword) {

	if (KEYLINKS[keyword]) {

		// If the keyword is valid, go to the associated link, increment total uses, and save the keylink
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


// Shows keyword suggestions in the omnibox
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {

	if (OMNIBOX_SUGGESTIONS && text.length > 0) {

		var matchingKeywords = [];

		// Finds all keywords that have the omnibox text at the start
		for (keyword in KEYLINKS) {
			if (keyword.indexOf(text) === 0) {
				matchingKeywords.push(keyword);
			}
		}

		if (matchingKeywords.length > 0) {

			var mostUsedSuggestions = [];

			// Sorts the possible matches by how many times they have been used
			matchingKeywords.sort(function compare(a, b) {return (a.timesUsed < b.timesUsed) ? -1 : 1;});

			// Adds the 5 most used matches to the suggestions, or less if there are less matches
			for (var i = 0; i < matchingKeywords.length && i < 5; i++) {
				var match = matchingKeywords[i];
				mostUsedSuggestions.push({content: match, description: match});
			}

			// Pushes the suggestions to be displayed underneath the omnibox
			suggest(mostUsedSuggestions);

		}
	}
});

updateBackgroundPageStorage();
