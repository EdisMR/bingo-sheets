const sheetNumbersToListen = document.querySelectorAll(".sheet-number")
const markedNumbers = new Set([])
const LOCALSTORAGEDATANAME = "markedNumbersdata"

sheetNumbersToListen.forEach(element => {
	element.addEventListener('click', (event) => {
		const dataName = event.target.dataset.id
		if (markedNumbers.has(dataName)) {
			markedNumbers.delete(dataName)
		} else {
			markedNumbers.add(dataName)
		}
		saveLocalStorageData()
		markUiElements()
	})
});

function markUiElements() {
	// First, reset all numbers to their default state
	sheetNumbersToListen.forEach(numberElement => {
		numberElement.classList.remove('marked');
	});

	// Then, mark the selected numbers
	markedNumbers.forEach(id => {
		const elementToMark = document.querySelector(`[data-id="${id}"]`);
		if (elementToMark) {
			elementToMark.classList.add('marked');
		}
	})
}

function saveLocalStorageData() {
	localStorage.setItem(LOCALSTORAGEDATANAME, JSON.stringify(Array.from(markedNumbers)))
}

function loadLocalStorageData() {
	const data = localStorage.getItem(LOCALSTORAGEDATANAME)
	if (data) {
		const loadedArray = JSON.parse(data);
		// We can't reassign markedNumbers because it's a const,
		// but we can clear it and add the loaded items.
		markedNumbers.clear();
		loadedArray.forEach(number => markedNumbers.add(number));
		markUiElements();
	}
}

// Load data when the script runs
loadLocalStorageData();


function restartGame() {
	let confirmation = window.confirm("¿Seguro que quieres reiniciar el juego?")
	if (confirmation) {
		markedNumbers.clear()
		saveLocalStorageData()
		markUiElements()
	}
}

function fullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen()
	} else {
		document.documentElement.requestFullscreen()
	}
}