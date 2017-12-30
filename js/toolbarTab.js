// Creates the toolbar tab when small setting is enabled
function toolbarTab() {

	var menu = document.getElementById("smallmenu");
	var smallbox = document.getElementById("smallbox");

	var newInput = document.createElement("input");
	var newButton = document.createElement("button");
	var newImage = document.createElement("img");

	newInput.id = "smallinput";
	newInput.spellcheck = false;

	newButton.id = "smallbookmark";
	newButton.disabled = true;

	newImage.id = "smalladd";
	newImage.src = SOURCE.add;

	// Adds functionality to the input box and add button
	addInputs(false, newInput, newButton, newImage);

	// Deletes all elements from the previous tab
	trimElement(smallbox);

	newButton.appendChild(newImage);
	smallbox.appendChild(newInput);
	smallbox.appendChild(newButton);

	// Places the cursor within the input box
	newInput.focus();

}
