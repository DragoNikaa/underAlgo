addListeners();

function addListeners() {
	document.getElementById("start-form").addEventListener("submit", handleStartFormSubmit);
	document.getElementById("next-step-button").addEventListener("click", handleNextStepButtonClick);
	document.getElementById("restart-button").addEventListener("click", () => window.location.reload());
}

async function handleStartFormSubmit(event) {
	event.preventDefault();
	const testCaseData = getSelectedTestCaseData();
	if (!testCaseData) return;
	const data = await sendRequest("start", {
		"test_case": testCaseData,
	});
	if (!data) return;
	hideElements("test-cases");
	showElements("animation", "explanation");
	prepareAnimationDisplay(data.input);
	await handleAnimationStep(data.step);
	updateActiveLine(data.step.line);
}

async function handleNextStepButtonClick() {
	const data = await sendRequest("next-step");
	await handleAnimationStep(data.step);
	const output = data.step.output;
	if (output !== null) {
		updateOutput(output);
		disableButton("next-step-button");
	}
	updateActiveLine(data.step.line);
}

async function sendRequest(endpoint, bodyData = null) {
	const options = getRequestOptions(bodyData);
	try {
		const response = await fetch(endpoint, options);
		const data = await response.json();
		if (response.ok) return data;
		if (response.status === 422)
			data.errors.forEach(error =>
				handleValidationError(error.field, error.input, error.message)
			);
	} catch (error) {
		alert("Something went wrong. Please try again.");
	}
}

function getRequestOptions(bodyData) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
			"X-CSRFToken": document.querySelector("[name=csrfmiddlewaretoken]").value,
		},
	};
	if (bodyData) options.body = JSON.stringify(bodyData);
	return options;
}

function getSelectedTestCaseData() {
	const selectedTestCase = getSelectedTestCase();
	if (!selectedTestCase) return;
	const testCaseId = selectedTestCase.value;
	const testCaseData = {
		"id": testCaseId,
	};
	if (testCaseId === "custom") {
		testCaseData.body = getCustomTestCaseBody();
		if (!testCaseData.body) return;
	}
	return testCaseData;
}

function getSelectedTestCase() {
	const selectedTestCase = document.querySelector("input[name=test-case]:checked");
	if (!selectedTestCase) {
		showElements("radio-error-message");
		console.warn("No test case selected.");
		return;
	}
	hideElements("radio-error-message");
	return selectedTestCase;
}

function getCustomTestCaseBody() {
	const body = {};
	let isInputValid = true;
	const customInputs = document.querySelectorAll("input[name=custom-input]");
	customInputs.forEach(input => {
		const fieldName = input.id.replace("-custom", "");
		try {
			body[fieldName] = JSON.parse(input.value);
			clearValidationError(fieldName);
		} catch (error) {
			handleValidationError(fieldName, input.value, "Invalid format. Algorithm confused.", error);
			isInputValid = false;
		}
	});
	return isInputValid ? body : null;
}

function handleValidationError(fieldName, inputValue, userMessage, devMessage = null) {
	if (!devMessage) devMessage = userMessage;
	addClassToElements("field-error", `${fieldName}-custom`);
	displayTextInElement(`${fieldName}-error-message`, userMessage);
	showElements(`${fieldName}-error-row`);
	console.error(`Invalid value in input "${fieldName}": "${inputValue}".\nReason: "${devMessage}".`);
}

function clearValidationError(fieldName) {
	removeClassFromElements("field-error", `${fieldName}-custom`);
	hideElements(`${fieldName}-error-row`);
}

function displayTextInElement(elementId, message) {
	const element = document.getElementById(elementId);
	element.textContent = message;
}

function hideElements(...elementIds) {
	addClassToElements("hidden", ...elementIds);
}

function showElements(...elementIds) {
	removeClassFromElements("hidden", ...elementIds);
}

function makeElementsInvisible(...elementIds) {
	addClassToElements("invisible", ...elementIds);
}

function makeElementsVisible(...elementIds) {
	removeClassFromElements("invisible", ...elementIds);
}

function addClassToElements(className, ...elementIds) {
	elementIds.forEach(elementId => {
		const element = document.getElementById(elementId);
		if (element) element.classList.add(className);
		else console.error(`Cannot add class "${className}" because element with ID "${elementId}" does not exist.`);
	});
}

function removeClassFromElements(className, ...elementIds) {
	elementIds.forEach(elementId => {
		const element = document.getElementById(elementId);
		if (element) element.classList.remove(className);
		else console.error(`Cannot remove class "${className}" because element with ID "${elementId}" does not exist.`);
	});
}

async function handleAnimationStep(step) {
	disableButton("next-step-button");
	await animateAlgorithmStep(step.variables);
	displayStepExplanation(step.explanation);
	enableButton("next-step-button");
}

function displayStepExplanation(explanation) {
	if (!explanation) return;
	const container = document.getElementById("explanation-content");
	container.innerHTML = parseStyledText(explanation);
}

function parseStyledText(text) {
	const regex = /\[\[(.+?):(.+?)\]\]/g;
	return text.replace(regex, (match, styleClass, content) => `<span class="${styleClass}">${content}</span>`);
}

function disableButton(buttonId) {
	const button = document.getElementById(buttonId);
	button.disabled = true;
}

function enableButton(buttonId) {
	const button = document.getElementById(buttonId);
	button.disabled = false;
}

function updateOutput(output) {
	const outputElement = document.getElementById("output");
	outputElement.textContent += output;
	showElements("output");
}

function updateActiveLine(lineNumber) {
	unhighlightActiveLine();
	if (lineNumber) addClassToElements("active-line", `code-line-${lineNumber}`);
}

function unhighlightActiveLine() {
	const activeLine = document.querySelector("#code-lines > .active-line");
	if (activeLine) activeLine.classList.remove("active-line");
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}