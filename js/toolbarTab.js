// Creates the toolbar tab when small setting is enabled
function toolbarTab() {

	var menu = document.getElementById("toolbar-menu");
	var content = document.getElementById("toolbar-content");

	var keywordInput = document.createElement("input");
	var addKeylinkButton = document.createElement("button");
	var addKeylinkIcon = document.createElement("img");

	CURRENT_TAB = "toolbar";

	keywordInput.id = "add-keyword-input";
	keywordInput.spellcheck = false;

	addKeylinkButton.id = "add-keylink-button";
	addKeylinkButton.disabled = true;

	addKeylinkIcon.className = "add-icon";
	addKeylinkIcon.src = SOURCE.add;
	addKeylinkIcon.draggable = false;

	// Adds functionality to the input box and add button
	configureKeylinkInput(false, keywordInput, addKeylinkButton, addKeylinkIcon);

	// Deletes all elements from the previous tab
	trimElement(content);

	addKeylinkButton.appendChild(addKeylinkIcon);
	content.appendChild(keywordInput);
	content.appendChild(addKeylinkButton);

	// Places the cursor within the input box
	keywordInput.focus();

}
