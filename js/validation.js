// Check if keyword is already used by a saved bookmark
function invalidKeyword(keyword) {
	return (KEYLINKS[keyword] && keyword !== OLD_KEYWORD);
}

function validateImportKeywordInput(inputBox) {
	var keyword = inputBox.value;
	var button = inputBox.parentNode.lastChild;
	var icon = inputBox.parentNode.lastChild.firstChild;

	if (keyword.length === 0 || keyword.length > 25 || invalidKeyword(keyword)) {
		icon.src = BLANK_IMAGE;
		button.disabled = true;
	} else {
		icon.src = SOURCE.add;
		button.disabled = false;
	}

	return validateKeywordInput(inputBox, keyword);

}

function validateAddKeywordInput(inputBox) {
	var keyword = inputBox.value;
	var button = inputBox.parentNode.lastChild;

	button.disabled = (keyword.length === 0 || keyword.length > 25 || invalidKeyword(keyword));

	return validateKeywordInput(inputBox, keyword);

}

function validateEditKeywordInput(inputBox) {
	var keyword = inputBox.value;
	return validateKeywordInput(inputBox, keyword);
}

function validateKeywordInput(inputBox, keyword) {
	if (keyword.length > 25 || invalidKeyword(keyword)) {
		inputBox.classList.add("input-invalid");
		return false;
	} else {
		inputBox.classList.remove("input-invalid");
		return true;
	}
}
