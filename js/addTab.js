// Display the date the keylink was created and how many times it has been used in the top-right of the Add tab
function keylinkStatistics(keyword) {
	var menu = document.getElementById("menu");

	var createdText = document.createElement("p");
	var usesText = document.createElement("p");

	var time = KEYLINKS[keyword].timeCreated;
	var date = new Date(time);
	var uses = KEYLINKS[keyword].timesUsed;

	createdText.className = "keylink-statistics-text";
	usesText.className = "keylink-statistics-text";

	createdText.innerHTML = "Created " + date.toString().substring(4, 15);
	createdText.title = date.toString().substring(16,24);
	usesText.innerHTML = "Used " + String(uses) + " time" + (uses === 1 ? "" : "s");

	menu.appendChild(createdText);
	menu.appendChild(usesText);
}

// Creates add bookmark tab when plus icon is pressed
function addTab() {

	var menu = document.getElementById("menu");
	var content = document.getElementById("content");

	var addTabContainer = document.createElement("div");
	var addKeywordInput = document.createElement("input");
	var addKeylinkButton = document.createElement("button");
	var addKeylinkIcon = document.createElement("img");

	// Tab setup
	resetMenu();
	CURRENT_TAB = "add";
	document.getElementById("add-tab-button").disabled = true;

	addTabContainer.id = "add-tab-container";
	addKeywordInput.id = "add-keyword-input";
	addKeywordInput.spellcheck = false;
	addKeylinkButton.id = "add-keylink-button";
	addKeylinkIcon.className = "add-icon";
	addKeylinkIcon.draggable = false;

	// Adds functionality to the input box and add button
	configureKeylinkInput(true, addKeywordInput, addKeylinkButton, addKeylinkIcon);

	// Deletes all elements from the previous tab
	trimElement(content);

	// Append new elements to the popup
	addKeylinkButton.appendChild(addKeylinkIcon);
	addTabContainer.appendChild(addKeywordInput);
	addTabContainer.appendChild(addKeylinkButton);
	content.appendChild(addTabContainer);

	// Places the cursor within the input box
	addKeywordInput.focus();

}
