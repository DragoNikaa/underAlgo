document.getElementById("start-button").addEventListener("click", handleStartButtonClick);
document.getElementById("next-step-button").addEventListener("click", handleNextStepButtonClick);
document.getElementById("restart-button").addEventListener("click", () => {
	window.location.reload();
});

async function handleStartButtonClick() {
	const testCaseData = getSelectedTestCaseData();
	if (!testCaseData) return;
	try {
		const data = await sendStartRequest(testCaseData);
		if (!data) return;
		hideElements("test-cases", "start-button");
		showElements("next-step-button", "restart-button");
		prepareAnimationDisplay(data.input);
		animateAlgorithmStep(data.step.variables);
		updateActiveLine(data.step.line);
	} catch (error) {
		console.error(error);
		alert("Something went wrong. Please try again.");
	}
}

async function handleNextStepButtonClick() {
	try {
		const data = await sendNextStepRequest();
		animateAlgorithmStep(data.step.variables);
		const output = data.step.output;
		if (output !== undefined) {
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
	if (response.status === 422) {
		handleResponseErrors(data.errors)
		return;
	}
	return data;
}

function getCSRFToken() {
	return document.querySelector("[name=csrfmiddlewaretoken]").value;
}

function getEndpoint(pathSegment) {
	return window.location.href + pathSegment;
}

function handleResponseErrors(errors) {
	errors.forEach(error => {
		const fieldName = error.field;
		const inputId = `${fieldName}-input`;
		const userMessage = error.message;
		const inputValue = error.input;
		const devMessage = `Invalid value in input "${fieldName}": ${inputValue}. Reason: ${userMessage}`;
		handleValidationError(inputId, userMessage, devMessage);
	});
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
		displayMessageInElement("radio-error-message", "Even algorithms need directions – pick a test case to continue.");
		console.warn("No test case selected.");
		return;
	}
	displayMessageInElement("radio-error-message", "");
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
			clearValidationError(input.id);
		} catch (error) {
			handleValidationError(input.id, "Invalid format. Algorithm confused.", error);
			isInputValid = false;
		}
	});
	return isInputValid ? body : null;
}

function handleValidationError(inputId, userMessage, devMessage) {
	highlightInvalidInput(inputId);
	displayMessageInElement(getMessageElementId(inputId), userMessage);
	console.error(devMessage);
}

function clearValidationError(inputId) {
	unhighlightInput(inputId);
	displayMessageInElement(getMessageElementId(inputId), "");
}

function highlightInvalidInput(inputId) {
	const inputElement = document.getElementById(inputId);
	inputElement.classList.add("invalid-input");
}

function unhighlightInput(inputId) {
	const inputElement = document.getElementById(inputId);
	inputElement.classList.remove("invalid-input");
}

function displayMessageInElement(elementId, message) {
	const element = document.getElementById(elementId);
	element.textContent = message;
}

function getMessageElementId(inputId) {
	return inputId.replace("input", "error-message");
}

function hideElements(...elementIds) {
	for (const elementId of elementIds) {
		const element = document.getElementById(elementId);
		element.classList.add("hidden");
	}
}

function showElements(...elementIds) {
	for (const elementId of elementIds) {
		const element = document.getElementById(elementId);
		element.classList.remove("hidden");
	}
}

function updateOutput(output) {
	const outputElement = document.getElementById("output-container");
	outputElement.textContent = `output = ${output}`;
}

function disableButton(buttonId) {
	const button = document.getElementById(buttonId);
	button.disabled = true;
}

function updateActiveLine(lineNumber) {
	removeActiveLine();
	const line = document.getElementById(`line_${lineNumber}`);
	if (line) line.classList.add("active-line");
}

function removeActiveLine() {
	const activeLine = document.querySelector("#lines > .active-line");
	if (activeLine) activeLine.classList.remove("active-line");
}