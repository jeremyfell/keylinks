// Storage constants
MAX_KEYLINKS = 500;
MAX_BYTES = 100000;
CURRENT_KEYLINKS = 1;
CURRENT_BYTES = 48;
DEFAULT_KEYLINK_COUNT = 2;
DEFAULT_BYTE_COUNT = 0;
KEYLINK_OVERHEAD = 48;
STORAGE_KEY = "___KEYLINKS_STORAGE_COUNT___";
SETTINGS_KEY = "___KEYLINKS_USER_SETTINGS___";

DEFAULT_SETTINGS = {
	"CLOSE_POPUP_AFTER_KEYLINK_CHANGES_IN_ADD_TAB"				: false,
	"SHOW_KEYWORD_SUGGESTIONS_IN_OMNIBOX"									: true,
	"SHOW_KEYLINK_STATS_IN_ADD_TAB"												: true,
	"SHOW_SORTING_OPTIONS_IN_MANAGE_TAB"									: true,
	"USE_SMALL_POPUP_ON_STARTUP"													: false,
	"SUGGEST_KEYWORDS_WHEN_ADDING_KEYLINK"								: false,
	"ALLOW_LINK_REPLACING_IN_ADD_TAB"											: false
};

// All user keylinks
var KEYLINKS = {};
// Holds the user settings retrieved from storage
var SETTINGS = {};


// Holds the previous keyword, when a keyword is changed, so that it can be reverted if it is set to an invalid value
var OLD_KEYWORD;

// Holds the current displayed page state
// settings, import, manage, add, change, toolbar
var CURRENT_TAB = "";

// Holds all user bookmark folders
var BOOKMARK_FOLDERS = [];

// Current type of sorting
var CURRENT_SORTING_PARAMETER = "name";
var REVERSE_SORTING = false;

// There are no keylinks to manage
var NO_KEYLINKS_TO_MANAGE = true;

// There are no bookmarks to import
var NO_BOOKMARKS_TO_IMPORT = true;


// Describes a blank icon, used as an image source when no icon should be displayed
var BLANK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

// Source paths for each icon
var SOURCE = {
	add				: "../svg/add.svg",
	arrow			: "../svg/arrow.svg",
	check			: "../svg/check.svg",
	date			: "../svg/date.svg",
	deleting	: "../svg/delete.svg",
	equal			: "../svg/equal.svg",
	exporting	: "../svg/export.svg",
	importing	: "../svg/import.svg",
	manage		: "../svg/manage.svg",
	name			: "../svg/name.svg",
	options		: "../svg/options.svg",
	replace		: "../svg/replace.svg",
	settings	: "../svg/settings.svg",
	use				: "../svg/use.svg"
};

var COLORS = {
	red				: "#FF0000",
	light_red	: "#FFB2B2",
	yellow		: "#FFD800"
}
