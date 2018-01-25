function getKeylinks() {
	chrome.storage.sync.get(null, function(storage) {

		// Separates storage items into keylinks, the storage count, and the user settings
		for (var keyword in storage) {
			if (keyword === STORAGE_KEY) {
				CURRENT_KEYLINKS = storage[keyword].keylinkCount;
				CURRENT_BYTES = storage[keyword].byteCount;
			} else if (keyword === SETTINGS_KEY) {
				SETTINGS = Object.assign({}, storage[keyword]);
			} else {
				KEYLINKS[keyword] = storage[keyword];
			}
		}

		// If the chrome extension is being used for the first time, setup the storage count and user settings
		// Possibly move to background page
		if (!storage[STORAGE_KEY] || !storage[SETTINGS_KEY]) {

			var storageDefault = {};

			storageDefault[STORAGE_KEY] = {
				keylinkCount: DEFAULT_KEYLINK_COUNT,
				byteCount: DEFAULT_BYTE_COUNT
			}

			CURRENT_KEYLINKS = DEFAULT_KEYLINK_COUNT;
			CURRENT_BYTES = DEFAULT_BYTE_COUNT;

			storageDefault[SETTINGS_KEY] = Object.assign({}, DEFAULT_SETTINGS);

			SETTINGS = Object.assign({}, DEFAULT_SETTINGS);

			chrome.storage.sync.set(storageDefault, function(entry) {errorCheck(entry)});

		}

		SETTINGS.toolbarPopup ? toolbarSetup() : defaultSetup();

	});
}

// Saves a new keylink
function saveKeylink(keyword, link) {
	var bytes = keyword.length + link.length + KEYLINK_OVERHEAD;
	var time = new Date().getTime();
	var storageChanges = {};

	KEYLINKS[keyword] = {
		"link": link,
		"timeCreated": time,
		"timesUsed": 0
	}

	CURRENT_KEYLINKS++;
	CURRENT_BYTES += bytes;

	storageChanges[keyword] = {
		"link": link,
		"timeCreated": time,
		"timesUsed": 0
	}

	storageChanges[STORAGE_KEY] = {"keylinkCount" : CURRENT_KEYLINKS, "byteCount": CURRENT_BYTES};

	chrome.extension.getBackgroundPage().iconUpdate(true, link);
	chrome.storage.sync.set(storageChanges, function(entry) {errorCheck(entry)});

}

// Deletes a saved bookmark
function deleteKeylink(keyword) {
	var link = KEYLINKS[keyword].link;
	var bytes = keyword.length + link.length + KEYLINK_OVERHEAD;
	var storageChanges = {};

	delete KEYLINKS[keyword];

	CURRENT_KEYLINKS--;
	CURRENT_BYTES -= bytes;

	storageChanges[STORAGE_KEY] = {"keylinkCount" : CURRENT_KEYLINKS, "byteCount": CURRENT_BYTES};
	chrome.storage.sync.set(storageChanges);
	chrome.storage.sync.remove(keyword, function(entry) {errorCheck(entry)});

	chrome.extension.getBackgroundPage().iconUpdate(false, link);
}
