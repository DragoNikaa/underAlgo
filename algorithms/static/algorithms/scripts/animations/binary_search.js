function prepareAnimationDisplay(input) {
	displayTarget(input.target);
	displayNumbers(input.numbers);
	reserveSpaceForVariables();
}

async function animateAlgorithmStep(variables) {
	await handleChangedVariables(variables.changed);
	handleToChangeVariables(variables.to_change);
}

function displayTarget(target) {
	const valueElement = document.getElementById("target-value");
	valueElement.textContent = target;
	showElements("target-container");
}

function displayNumbers(numbers) {
	const container = document.getElementById("numbers-container");
	const firstSegment = createInvisibleNumberSegment(-1);
	container.appendChild(firstSegment);
	numbers.forEach((number, index) => {
		const segment = createNumberSegment(number, index);
		container.appendChild(segment);
	});
	const lastSegment = createInvisibleNumberSegment(numbers.length);
	container.appendChild(lastSegment);
}

function createNumberSegment(number, index) {
	const segment = document.createElement("div");
	segment.textContent = number;
	segment.id = `number${index}`;
	return segment;
}

function createInvisibleNumberSegment(index) {
	const segment = createNumberSegment("\u00A0", index);
	segment.classList.add("invisible");
	return segment;
}

function reserveSpaceForVariables() {
	const containers = document.querySelectorAll(".variable-container");
	containers.forEach(container => {
		container.classList.add("invisible");
		container.classList.remove("hidden");
	});
}

async function handleChangedVariables(changed) {
	if (!changed) return;
	for (const [name, value] of Object.entries(changed)) {
		removeClassFromElements("blink", `${name}-container`);
		await updateVariableDisplay(name, value);
	}
}

function handleToChangeVariables(toChange) {
	if (!toChange) return;
	toChange.forEach(name => {
		addClassToElements("blink", `${name}-container`);
	});
}

async function updateVariableDisplay(name, value) {
	const variableContainer = document.getElementById(`${name}-container`);
	if (variableContainer.classList.contains("invisible")) {
		displayVariableAtStartPosition(name, value, variableContainer);
	} else {
		await slideVariableToNextPosition(name, value, variableContainer);
	}
}

function displayVariableAtStartPosition(name, value, variableContainer) {
	updateVariableValue(name, value);
	moveVariableToStartPosition(name, value, variableContainer);
	makeElementsVisible(`${name}-container`);
	addClassToElements(`${name}-number-style`, `number${value}`);
}

function updateVariableValue(name, value) {
	const valueElement = document.getElementById(`${name}-value`);
	valueElement.textContent = value;
}

function moveVariableToStartPosition(name, value, variableContainer) {
	const numberSegment = document.getElementById(`number${value}`);
	const numberSegmentRect = numberSegment.getBoundingClientRect();
	const parentRect = variableContainer.parentElement.getBoundingClientRect();
	const offset = numberSegmentRect.left + numberSegmentRect.width / 2 - variableContainer.offsetWidth / 2 - parentRect.left;
	variableContainer.style.left = `${offset}px`;
}

async function slideVariableToNextPosition(name, value, variableContainer) {
	const valueElement = document.getElementById(`${name}-value`);
	const previousValue = parseFloat(valueElement.textContent);
	const step = previousValue < value ? 1 : -1;
	const styleClass = `${name}-number-style`;

	for (let index = previousValue + step; index !== value + step; index += step) {
		await slideVariableToNextIndex(index, step, variableContainer, valueElement, styleClass);
	}
}

async function slideVariableToNextIndex(index, step, variableContainer, valueElement, styleClass) {
	const previousNumberSegment = document.getElementById(`number${index - step}`);
	const nextNumberSegment = document.getElementById(`number${index}`);
	const offset = calculateOffset(previousNumberSegment, nextNumberSegment, step);
	updateContainer(variableContainer, offset, valueElement, index);
	updateNumberSegment(previousNumberSegment, nextNumberSegment, styleClass);
	await sleep(800);
}

function calculateOffset(previousNumberSegment, nextNumberSegment, step) {
	const previousHalfWidth = previousNumberSegment.offsetWidth / 2;
	const nextHalfWidth = nextNumberSegment.offsetWidth / 2;
	const offset = previousHalfWidth + nextHalfWidth;
	return step === 1 ? offset : -offset;
}

function updateContainer(container, offset, valueElement, value) {
	updateContainerPosition(container, offset);
	valueElement.textContent = value;
}

function updateContainerPosition(container, offset) {
	const currentLeftPosition = parseFloat(container.style.left);
	container.style.left = (currentLeftPosition + offset) + "px";
}

function updateNumberSegment(previousSegment, nextSegment, styleClass) {
	previousSegment.classList.remove(styleClass);
	nextSegment.classList.add(styleClass);
}