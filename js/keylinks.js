function getKeylinks() {
	chrome.storage.sync.get(null, function(storage) {

		for (var key in storage) {
			if (key === STORAGE_KEY) {
				CURRENT_KEYLINKS = storage[key].keylinkCount;
				CURRENT_BYTES = storage[key].byteCount;
			} else if (key === SETTINGS_KEY) {
				SETTINGS = Object.assign({}, storage[key]);
			} else {
				KEYLINKS[key] = storage[key];
			}
		}

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

	});
}

// Saves a new keylink
function saveKeylink(keyword, url) {
	var bytes = keyword.length + url.length + KEYLINK_OVERHEAD;
	var background_page = chrome.extension.getBackgroundPage();
	var time = new Date().getTime();
	var storageChanges = {};

	KEYLINKS[keyword] = {
		"link": url,
		"timeCreated": time,
		"timesUsed": 0
	}

	CURRENT_KEYLINKS++;
	CURRENT_BYTES += bytes;

	storageChanges[keyword] = {
		"link": url,
		"timeCreated": time,
		"timesUsed": 0
	}

	storageChanges[STORAGE_KEY] = {"keylinkCount" : CURRENT_KEYLINKS, "byteCount": CURRENT_BYTES};

	background_page.iconUpdate(true, url);
	chrome.storage.sync.set(storageChanges, function(entry) {errorCheck(entry)});

}

// Deletes a saved bookmark
function deleteKeylink(element) {
	var keyword = element.parentNode.firstChild.value;
	var url = KEYLINKS[keyword].link;
	var bytes = keyword.length + url.length + KEYLINK_OVERHEAD;
	var storageChanges = {};
	var background_page = chrome.extension.getBackgroundPage();

	delete KEYLINKS[keyword];

	if (element.className === "managebutton") {
		element.parentNode.parentNode.removeChild(element.parentNode);

		if (!document.getElementById("managebookmarks").firstChild) {
			manageTab();
		}
	}

	CURRENT_KEYLINKS--;
	CURRENT_BYTES -= bytes;

	storageChanges[STORAGE_KEY] = {"keylinkCount" : CURRENT_KEYLINKS, "byteCount": CURRENT_BYTES};
	chrome.storage.sync.set(storageChanges);
	chrome.storage.sync.remove(keyword, function(entry) {errorCheck(entry)});

	background_page.iconUpdate(false, url);
}
