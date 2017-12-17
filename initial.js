// Retrieves keylinks and settings from storage and starts setup
function initial() {
	chrome.storage.sync.get(["keylinks", "settings"], function(storage) {
	
		KEYLINKS = storage.keylinks;
		SETTINGS = storage.settings;
		
		// If there are no keylinks, create a new object to hold them
		if (KEYLINKS === undefined) {
			KEYLINKS = {};
		}
		
		// If there are no settings, create an object with the default settings
		if (SETTINGS === undefined) {
			SETTINGS = {
				"close"			: false,
				"suggestions"	: true,
				"stats"			: true,
				"sort"			: true,
				"small"			: false,
				"replace"		: false
			};
		}
		
		CLOSE 		= SETTINGS.close;
		SUGGESTIONS = SETTINGS.suggestions;
		STATS 		= SETTINGS.stats;
		SORT 		= SETTINGS.sort;
		SMALL 		= SETTINGS.small;
		AUTO 		= SETTINGS.auto;
		REPLACE		= SETTINGS.replace;
		
		SMALL ? toolbarSetup() : defaultSetup();
	});
}

initial();