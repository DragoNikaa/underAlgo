document.getElementById("step-button").addEventListener("click", function () {
	fetch(window.location.href, {
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			}
		})
		.then(response => response.json())
		.then(data => {
			updateKeyValuePairs("kwargs", data.kwargs);
			updateKeyValuePairs("variables", data.step.variables);
			updateResultAndButton(data.step.result);
			updateHighlightedLine(data.step.line);
		});
});

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

function updateResultAndButton(result) {
	const resultElement = document.getElementById("result");
	const stepButton = document.getElementById("step-button");

	if (result) {
		resultElement.textContent = `result = ${result}`;
		stepButton.textContent = "restart";
	} else {
		resultElement.textContent = "";
		stepButton.textContent = "next";
	}
}

function updateHighlightedLine(lineNumber) {
	clearHighlightedLines();
	const targetLine = document.getElementById(`line_${lineNumber}`);
	targetLine.style.background = "yellow";
}

function clearHighlightedLines() {
	const lines = document.getElementById("lines").querySelectorAll("*");
	lines.forEach(line => {
		line.style.background = "none";
	});
}