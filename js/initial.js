// Retrieves keylinks and settings from storage and starts popup setup
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
				"CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB"				: false,
				"SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX"									: true,
				"SHOW_KEYLINK_STATS_IN_ADD_TAB"												: true,
				"SHOW_SORTING_OPTIONS_IN_MANAGE_TAB"									: true,
				"USE_SMALL_POPUP_ON_STARTUP"													: false,
				"SUGGEST_KEYWORDS_WHEN_ADDING_KEYLINK"								: false,
				"ALLOW_LINK_REPLACING_IN_ADD_TAB"											: false
			};
		}

		SETTINGS.USE_SMALL_POPUP_ON_STARTUP ? toolbarSetup() : defaultSetup();
	});
}

initial();
