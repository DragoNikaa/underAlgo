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
			updateActiveLine(data.step.line);
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