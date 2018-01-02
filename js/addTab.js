// Display the date the keylink was created and how many times it has been used
function keylinkStatistics(menu, current_keyword) {
	var time = KEYLINKS[current_keyword].time_created;
	var date = new Date(time);
	var uses = KEYLINKS[current_keyword].times_used;

	var newP1 = document.createElement("p");
	var newP2 = document.createElement("p");

	newP1.className = "stat";
	newP2.className = "stat";

	newP1.innerHTML = "Created " + date.toString().substring(4, 15);
	newP1.title = date.toString().substring(16,24);
	newP2.innerHTML = "Used " + String(uses) + " time" + (uses === 1 ? "" : "s");

	menu.appendChild(newP1);
	menu.appendChild(newP2);
}

// Creates add bookmark tab when plus icon is pressed
function addTab() {

	var menu = document.getElementById("menu");
	var content = document.getElementById("content");

	var newDiv = document.createElement("div");
	var newInput = document.createElement("input");
	var newButton = document.createElement("button");
	var newImage = document.createElement("img");

	// Tab setup
	clearTabs();
	document.getElementById("addtab").disabled = true;

	newDiv.id = "addbox";
	newInput.id = "addinput";
	newInput.spellcheck = false;
	newButton.id = "addbookmark";
	newImage.id = "addadd";

	// Adds functionality to the input box and add button
	addInputs(true, newInput, newButton, newImage);

	// Deletes all elements from the previous tab
	trimElement(content);

	// Append new elements to the popup
	newButton.appendChild(newImage);
	newDiv.appendChild(newInput);
	newDiv.appendChild(newButton);
	content.appendChild(newDiv);

	// Places the cursor within the input box
	newInput.focus();

}
