document.getElementById("start-button").addEventListener("click", handleStartButtonClick);
document.getElementById("next-step-button").addEventListener("click", handleNextStepButtonClick);
document.getElementById("restart-button").addEventListener("click", () => window.location.reload());

async function handleStartButtonClick() {
	const testCaseData = getSelectedTestCaseData();
	if (!testCaseData) return;
	try {
		const data = await sendStartRequest(testCaseData);
		if (!data) return;
		hideElements("test-cases");
		showElements("animation", "explanation");
		prepareAnimationDisplay(data.input);
		await handleAnimationStep(data.step);
		updateActiveLine(data.step.line);
	} catch (error) {
		console.error(error);
		alert("Something went wrong. Please try again.");
	}
}

async function handleNextStepButtonClick() {
	try {
		const data = await sendNextStepRequest();
		await handleAnimationStep(data.step);
		const output = data.step.output;
		if (output !== null) {
			updateOutput(output);
			disableButton("next-step-button");
		}
		updateActiveLine(data.step.line);
	} catch (error) {
		console.error(error);
		alert("Something went wrong. Please try again.");
	}
}

function sendStartRequest(testCaseData) {
	const endpoint = getEndpoint("start");
	const bodyData = {
		"test_case": testCaseData,
	};
	return sendRequest(endpoint, bodyData);
}

function sendNextStepRequest() {
	const endpoint = getEndpoint("next-step");
	return sendRequest(endpoint);
}

async function sendRequest(endpoint, bodyData = null) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": getCSRFToken(),
		},
	};
	if (bodyData) options.body = JSON.stringify(bodyData);
	const response = await fetch(endpoint, options);
	const data = await response.json();
	if (response.status === 422)
		data.errors.forEach(error => handleValidationError(error.field, error.input, error.message));
	else return data;
}

function getCSRFToken() {
	return document.querySelector("[name=csrfmiddlewaretoken]").value;
}

function getEndpoint(pathSegment) {
	return window.location.href + pathSegment;
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
	const customInputs = document.querySelectorAll(".custom-input");
	customInputs.forEach(input => {
		const fieldName = input.id.replace("-input", "");
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
	addClassToElements("invalid-input", `${fieldName}-input`);
	displayTextInElement(`${fieldName}-error-message`, userMessage);
	showElements(`${fieldName}-error-row`);
	console.error(`Invalid value in input "${fieldName}": "${inputValue}".\nReason: "${devMessage}".`);
}

function clearValidationError(fieldName) {
	removeClassFromElements("invalid-input", `${fieldName}-input`);
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
	if (lineNumber) addClassToElements("active-line", `code-line_${lineNumber}`);
}

function unhighlightActiveLine() {
	const activeLine = document.querySelector("#code-lines > .active-line");
	if (activeLine) activeLine.classList.remove("active-line");
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}