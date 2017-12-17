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
	
	newButton.appendChild(newImage);
	newDiv.appendChild(newInput);
	newDiv.appendChild(newButton);
	content.appendChild(newDiv);
	
	// Places the cursor within the input box
	newInput.focus();
	
}