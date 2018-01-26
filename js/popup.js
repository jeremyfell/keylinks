/*/////////////////////////////////
Functions controlling popup startup
*//////////////////////////////////

// Sets up the popup for the smaller toolbar view
function toolbarSetup() {

	var menu = document.createElement("div");
	var content = document.createElement("div");
	var optionsButton = document.createElement("button");
	var optionsIcon = document.createElement("img");

	document.documentElement.className = "toolbar";
	document.body.className = "toolbar";

	menu.id = "toolbar-menu";
	content.id = "toolbar-content";
	optionsButton.className = "menu-button";
	optionsButton.id = "options-button";
	optionsButton.title = "Options";

	// Button to expand toolbar view to the full popup view
	optionsButton.addEventListener("click", function() {
		document.documentElement.className = "popup";
		document.body.className = "popup";
		document.body.lastChild.remove();
		defaultSetup();
	});

	optionsIcon.className = "menu-tab-icon";
	optionsIcon.id = "options-icon";
	optionsIcon.src = SOURCE.options;
	optionsIcon.draggable = false;

	optionsButton.appendChild(optionsIcon);
	menu.appendChild(optionsButton);
	menu.appendChild(content);
	document.body.appendChild(menu);

	toolbarTab();

}

//Sets up the popup for the default full view
function defaultSetup() {

	var menu = document.createElement("div");
	var content = document.createElement("div");

	var settingsTabButton = document.createElement("button");
	var importTabButton = document.createElement("button");
	var manageTabButton = document.createElement("button");
	var addTabButton = document.createElement("button");

	var settingsTabIcon = document.createElement("img");
	var importTabIcon = document.createElement("img");
	var manageTabIcon = document.createElement("img");
	var addTabIcon = document.createElement("img");

	var menuTitleContainer = document.createElement("div");
	var menuTitle = document.createElement("p");

	document.documentElement.className = "popup";
	document.body.className = "popup";

	menu.id = "menu";
	content.id = "content";

	settingsTabButton.className = "menu-button";
	importTabButton.className = "menu-button";
	manageTabButton.className = "menu-button";
	addTabButton.className = "menu-button";

	settingsTabButton.id = "settings-tab-button";
	importTabButton.id = "import-tab-button";
	manageTabButton.id = "manage-tab-button";
	addTabButton.id = "add-tab-button";

	settingsTabButton.title = "Settings";
	importTabButton.title = "Import";
	manageTabButton.title = "Manage";
	addTabButton.title = "Add";

	settingsTabButton.addEventListener("click", function() {settingsTab()});
	importTabButton.addEventListener("click", function() {importTab()});
	manageTabButton.addEventListener("click", function() {manageTab()});
	addTabButton.addEventListener("click", function() {addTab()});

	settingsTabIcon.className = "menu-tab-icon";
	importTabIcon.className = "menu-tab-icon";
	manageTabIcon.className = "menu-tab-icon";
	addTabIcon.className = "menu-tab-icon";

	settingsTabIcon.id = "settings-tab-icon";
	importTabIcon.id = "import-tab-icon";
	manageTabIcon.id = "manage-tab-icon";
	addTabIcon.id = "add-tab-icon";

	settingsTabIcon.src = SOURCE.settings;
	importTabIcon.src = SOURCE.importing;
	manageTabIcon.src = SOURCE.manage;
	addTabIcon.src = SOURCE.add;

	settingsTabIcon.draggable = false;
	importTabIcon.draggable = false;
	manageTabIcon.draggable = false;
	addTabIcon.draggable = false;

	menuTitleContainer.id = "menu-title-container";
	menuTitle.id = "menu-title";

	menuTitleContainer.appendChild(menuTitle);

	settingsTabButton.appendChild(settingsTabIcon);
	importTabButton.appendChild(importTabIcon);
	manageTabButton.appendChild(manageTabIcon);
	addTabButton.appendChild(addTabIcon);

	menu.appendChild(settingsTabButton);
	menu.appendChild(importTabButton);
	menu.appendChild(manageTabButton);
	menu.appendChild(addTabButton);
	menu.appendChild(menuTitleContainer);

	document.body.appendChild(menu);
	document.body.appendChild(content);

	addTab();

}
