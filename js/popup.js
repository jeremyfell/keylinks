/*/////////////////////////////////
Functions controlling popup startup
*//////////////////////////////////

// Sets up the popup for the smaller toolbar view
function toolbarSetup() {

	var menu = document.createElement("div");
	var newDiv = document.createElement("div");
	var newButton = document.createElement("button");
	var newImage = document.createElement("img");

	menu.id = "smallmenu";
	newDiv.id = "smallbox";
	newButton.className = "menu-button";
	newButton.id = "options";
	newButton.title = "Options";

	// Button to expand toolbar view to the full popup view
	newButton.addEventListener("click", function() {
		document.getElementsByTagName("html")[0].className = "popup";
		document.body.className = "popup";
		document.body.removeChild(document.body.lastChild);
		defaultSetup();
	});

	newImage.className = "menu-tab-icon";
	newImage.id = "optionsicon";
	newImage.src = SOURCE.options;

	newButton.appendChild(newImage);
	menu.appendChild(newButton);
	menu.appendChild(newDiv);
	document.body.appendChild(menu);

	document.getElementsByTagName("html")[0].className = "toolbar";
	document.body.className = "toolbar";

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

	menu.id = "menu";
	content.id = "content";

	settingsTabButton.className = "menu-button";
	importTabButton.className = "menu-button";
	manageTabButton.className = "menu-button";
	addTabButton.className = "menu-button";

	settingsTabButton.id = "settingstab";
	importTabButton.id = "importtab";
	manageTabButton.id = "managetab";
	addTabButton.id = "addtab";

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
