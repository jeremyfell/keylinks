// Creates the toolbar tab when small setting is enabled
function toolbarTab() {

	var menu = document.getElementById("toolbar-menu");
	var content = document.getElementById("toolbar-content");

	var keywordInput = document.createElement("input");
	var addKeylinkButton = document.createElement("button");
	var addKeylinkIcon = document.createElement("img");

	keywordInput.id = "smallinput";
	keywordInput.spellcheck = false;

	addKeylinkButton.id = "smallbookmark";
	addKeylinkButton.disabled = true;

	addKeylinkIcon.className = "add-icon";
	addKeylinkIcon.src = SOURCE.add;

	// Adds functionality to the input box and add button
	addInputs(false, keywordInput, addKeylinkButton, addKeylinkIcon);

	// Deletes all elements from the previous tab
	trimElement(content);

	addKeylinkButton.appendChild(addKeylinkIcon);
	content.appendChild(keywordInput);
	content.appendChild(addKeylinkButton);

	// Places the cursor within the input box
	keywordInput.focus();

}
