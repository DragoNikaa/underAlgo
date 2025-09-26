function addClearButtonListeners() {
	clearSelectionsOnClick("clear-difficulty-button", "difficulty");
	clearSelectionsOnClick("clear-categories-button", "category");
}

function clearSelectionsOnClick(buttonId, inputName) {
	document.getElementById(buttonId).addEventListener("click", () => {
		const inputs = document.querySelectorAll(`input[name=${inputName}]`);
		inputs.forEach(input => input.checked = false);
	});
}

function fillFormWithUrlParams(form) {
	const params = getUrlParams();
	params.forEach((value, key) => {
		const inputs = form.querySelectorAll(`input[name=${key}]`);
		fillInput(inputs, value);
	});
}

function getUrlParams() {
	const params = new URLSearchParams(window.location.search);
	params.delete("page");
	return params;
}

function fillInput(inputs, value) {
	inputs.forEach(input => {
		if (input.type === "radio" || input.type === "checkbox") {
			if (input.value === value) {
				input.checked = true;
				return;
			}
		} else input.value = value;
	});
}