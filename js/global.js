var FOLDERS = [];

var KEYWORD;
var KEYLINKS;

var OLDKEYWORD;
var OLDURL;

// Current type of sorting
var SORTING = "name";
var REVERSE = false;

// There are no keylinks to manage
var EMPTYMANAGE = true;

// There are no bookmarks to import
var EMPTYIMPORT = true;

// Holds the current displayed page state
// settings, import, manage, add, change, toolbar
var PAGE = "";

// Describes a blank icon, used as an image source when no icon should be displayed
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

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
	lightred	: "#FFB2B2",
	yellow		: "#FFD800"

}

// Holds the user settings retrieved from storage
var SETTINGS;


// Each individual user setting
var CLOSE 			= false;
var SUGGESTIONS = false;
var STATS 			= false;
var SORT 				= false;
var SMALL 			= false;
var AUTO 				= false;
var REPLACE 		= false;
