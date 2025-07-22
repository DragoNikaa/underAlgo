document.getElementById("start-button").addEventListener("click", handleStartButtonClick);
document.getElementById("next-step-button").addEventListener("click", handleNextStepButtonClick);

async function handleStartButtonClick() {
	const testCaseId = getSelectedTestCaseId();
	if (!testCaseId) {
		alert("Choose a test case!");
		return;
	}
	try {
		const data = await sendStartRequest(testCaseId);
		hideElements("test-cases", "start-button");
		showElements("next-step-button", "restart-button");
		updateKeyValuePairs("input", data.input);
		updateKeyValuePairs("variables", data.step.variables);
		updateActiveLine(data.step.line);
	} catch (error) {
		alert("Something went wrong. Please try again.");
	}
}

async function handleNextStepButtonClick() {
	try {
		const data = await sendNextStepRequest();
		updateKeyValuePairs("variables", data.step.variables);
		const output = data.step.output;
		if (output) {
			updateOutput(output);
			disableButton("next-step-button");
		}
		updateActiveLine(data.step.line);
	} catch (error) {
		alert("Something went wrong. Please try again.");
	}
}

function sendStartRequest(testCaseId) {
	const endpoint = getEndpoint("start");
	const bodyData = {
		test_case_id: testCaseId,
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
	if (bodyData !== null) {
		options.body = JSON.stringify(bodyData);
	}
	const response = await fetch(endpoint, options);
	return response.json();
}

function getSelectedTestCaseId() {
	const selectedTestCase = document.querySelector("input[name=test-case]:checked");
	return selectedTestCase ? selectedTestCase.value : null;
}

function getCSRFToken() {
	return document.querySelector("[name=csrfmiddlewaretoken]").value;
}

function getEndpoint(pathSegment) {
	return window.location.href + pathSegment;
}

function updateKeyValuePairs(containerId, keyValueMap) {
	const container = document.getElementById(containerId);
	container.innerHTML = "";

	for (const [key, value] of Object.entries(keyValueMap)) {
		const keyValueElement = createKeyValueElement(key, value);
		container.appendChild(keyValueElement);
	}
}

function createKeyValueElement(key, value) {
	const element = document.createElement("div");
	element.textContent = `${key} = ${value}`;
	return element;
}

function updateOutput(output) {
	const outputElement = document.getElementById("output");
	outputElement.textContent = `output = ${output}`;
}

function disableButton(buttonId) {
	button = document.getElementById(buttonId);
	button.disabled = true;
}

function updateActiveLine(lineNumber) {
	removeActiveLine();
	const line = document.getElementById(`line_${lineNumber}`);
	line.classList.add("active-line");
}

function removeActiveLine() {
	const activeLine = document.querySelector("#lines .active-line");
	if (activeLine) {
		activeLine.classList.remove("active-line");
	}
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