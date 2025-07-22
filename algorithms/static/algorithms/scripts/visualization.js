document.getElementById("start-button").addEventListener("click", function () {
	const selectedTestCase = document.querySelector("input[name=test-case]:checked");
	if (!selectedTestCase) {
		alert("Choose a test case!");
		return;
	}
	fetch(getFetchUrl("start"), {
			method: "POST",
			headers: {
				"X-CSRFToken": getCSRFToken(),
			},
			body: JSON.stringify({
				test_case_id: selectedTestCase.value,
			})
		})
		.then(response => response.json())
		.then(data => {
			updateKeyValuePairs("input", data.input);
			updateKeyValuePairs("variables", data.step.variables);
			hideElements("test-cases", "start-button");
			showElements("next-step-button", "restart-button");
			updateActiveLine(data.step.line);
		});
});

document.getElementById("next-step-button").addEventListener("click", function () {
	fetch(getFetchUrl("next-step"), {
			method: "POST",
			headers: {
				"X-CSRFToken": getCSRFToken(),
			},
		})
		.then(response => response.json())
		.then(data => {
			updateKeyValuePairs("variables", data.step.variables);
			const output = data.step.output;
			if (output) {
				updateOutput(output);
				disableButton("next-step-button");
			}
			updateActiveLine(data.step.line);
		});
});

function getCSRFToken() {
	return document.querySelector("[name=csrfmiddlewaretoken]").value;
}

function getFetchUrl(pathSegment) {
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