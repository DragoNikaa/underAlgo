function prepareAnimationDisplay(input) {
	displayTarget(input.target);
	displayNumbers(input.numbers);
	createVariablesSegments(["left", "right", "middle"], -1, input.numbers.length);
}

function animateAlgorithmStep(variables) {
	Object.entries(variables).forEach(([variableName, variableValue]) => {
		updateActiveVariableSegment(variableName, variableValue);
	});
}

function displayTarget(target) {
	const container = document.getElementById("target-container");
	container.textContent = `target = ${target}`;
}

function displayNumbers(numbers) {
	const container = document.getElementById("numbers-container");
	numbers.forEach((number, index) => {
		const segment = createNumberSegment(number, index);
		container.appendChild(segment);
	});
}

function createVariablesSegments(variableNames, firstIndex, lastIndex) {
	variableNames.forEach(variableName => {
		const container = document.getElementById(`${variableName}-container`);
		for (let index = firstIndex; index <= lastIndex; index++) {
			const segment = createVariableSegment(variableName, index);
			container.appendChild(segment);
		}
	});
}

function createNumberSegment(number, index) {
	const segment = createVariableSegment(number, index);
	segment.textContent = number;
	segment.classList.add("number-segment");
	return segment;
}

function createVariableSegment(variableName, index) {
	const segment = document.createElement("div");
	segment.id = getSegmentId(variableName, index);
	segment.classList.add("row-segment");
	return segment;
}

function updateActiveVariableSegment(variableName, variableValue) {
	clearVariableSegments(variableName);
	displayVariableInSegment(variableName, variableValue);
}

function clearVariableSegments(variableName) {
	const containerId = `${variableName}-container`;
	const segments = document.querySelectorAll(`#${containerId} > *`);
	segments.forEach(segment => {
		segment.textContent = "";
	});
}

function displayVariableInSegment(variableName, variableValue) {
	const segmentId = getSegmentId(variableName, variableValue);
	const segment = document.getElementById(segmentId);
	segment.textContent = `${variableName} = ${variableValue}`;
}

function getSegmentId(name, index) {
	return `${name}${index}`;
}