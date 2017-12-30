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
				"close"				: false,
				"suggestions"	: true,
				"stats"				: true,
				"sort"				: true,
				"small"				: false,
				"replace"			: false
			};
		}

		CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB 			= SETTINGS.close;
		SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX = SETTINGS.suggestions;
		SHOW_KEYLINK_STATS_IN_ADD_TAB 			= SETTINGS.stats;
		SHOW_SORTING_OPTIONS_IN_MANAGE_TAB 				= SETTINGS.sort;
		USE_SMALL_POPUP_ON_STARTUP 			= SETTINGS.small;
		SUGGEST_KEYWORDS_WHEN_ADDING_KEYLINK 				= SETTINGS.auto;
		REPLACE			= SETTINGS.replace;

		USE_SMALL_POPUP_ON_STARTUP ? toolbarSetup() : defaultSetup();
	});
}

initial();
