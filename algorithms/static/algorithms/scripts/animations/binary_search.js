function prepareAnimationDisplay(input) {
	displayTarget(input.target);
	displayNumbers(input.numbers);
	createVariablesSegments(["left", "right", "middle"], -1, input.numbers.length);
}

function animateAlgorithmStep(variables) {
	Object.entries(variables).forEach(([variableName, variableValue]) => {
		updateVariableSegment(variableName, variableValue);
		updateNumbersDisplay(variableName, variableValue);
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
	const segment = createVariableSegment("number", index);
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

function updateVariableSegment(variableName, variableValue) {
	clearPreviousVariableSegment(variableName);
	displayVariableInSegment(variableName, variableValue);
}

function clearPreviousVariableSegment(variableName) {
	const currentClass = `current-${variableName}`;
	const segment = document.querySelector(`.${currentClass}`);
	if (segment) {
		segment.textContent = "";
		segment.classList.remove(currentClass);
	}
}

function displayVariableInSegment(variableName, variableValue) {
	const segmentId = getSegmentId(variableName, variableValue);
	const segment = document.getElementById(segmentId);
	segment.textContent = `${variableName} = ${variableValue}`;
	segment.classList.add(`current-${variableName}`);
}

function updateNumbersDisplay(variableName, variableValue) {
	const styleClass = `${variableName}-number-style`;
	unhighlightPreviousNumber(styleClass);
	const segmentId = getSegmentId("number", variableValue);
	const segment = document.getElementById(segmentId);
	if (segment) highlightNumber(segment, styleClass);
}

function unhighlightPreviousNumber(styleClass) {
	const segments = document.querySelectorAll("#numbers-container > *");
	segments.forEach(segment => {
		segment.classList.remove(styleClass);
	});
}

function highlightNumber(segment, styleClass) {
	segment.classList.add(styleClass);
}

function getSegmentId(name, index) {
	return `${name}${index}`;
}