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
	var newButton1 = document.createElement("button");
	var newButton2 = document.createElement("button");
	var newButton3 = document.createElement("button");
	var newButton4 = document.createElement("button");
	var newImage1 = document.createElement("img");
	var newImage2 = document.createElement("img");
	var newImage3 = document.createElement("img");
	var newImage4 = document.createElement("img");
	var newDiv2 = document.createElement("div");
	var newP = document.createElement("p");

	menu.id = "menu";
	content.id = "content";

	newButton1.className = "menu-button";
	newButton2.className = "menu-button";
	newButton3.className = "menu-button";
	newButton4.className = "menu-button";

	newButton1.id = "settingstab";
	newButton2.id = "importtab";
	newButton3.id = "managetab";
	newButton4.id = "addtab";

	newButton1.title = "Settings";
	newButton2.title = "Import";
	newButton3.title = "Manage";
	newButton4.title = "Add";

	newButton1.addEventListener("click", function() {settingsTab()});
	newButton2.addEventListener("click", function() {importTab()});
	newButton3.addEventListener("click", function() {manageTab()});
	newButton4.addEventListener("click", function() {addTab()});

	newImage1.className = "menu-tab-icon";
	newImage2.className = "menu-tab-icon";
	newImage3.className = "menu-tab-icon";
	newImage4.className = "menu-tab-icon";

	newImage1.id = "settingsicon";
	newImage2.id = "importicon";
	newImage3.id = "manageicon";
	newImage4.id = "addicon";

	newImage1.src = SOURCE.settings;
	newImage2.src = SOURCE.importing;
	newImage3.src = SOURCE.manage;
	newImage4.src = SOURCE.add;

	newDiv2.id = "menu-title-container";
	newP.id = "menu-title";
	newDiv2.appendChild(newP);

	newButton1.appendChild(newImage1);
	newButton2.appendChild(newImage2);
	newButton3.appendChild(newImage3);
	newButton4.appendChild(newImage4);

	menu.appendChild(newButton1);
	menu.appendChild(newButton2);
	menu.appendChild(newButton3);
	menu.appendChild(newButton4);
	menu.appendChild(newDiv2);

	document.body.appendChild(menu);
	document.body.appendChild(content);

	addTab();
	
}
