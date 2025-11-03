const markedNumbers = new Set([])
const ballsToListen = document.querySelectorAll(".clickable-number")
const sheetNumbers = document.querySelectorAll('.sheet-number')
const LOCALSTORAGE_KEY = 'markedNumbers'

alertify.defaults.notifier.position = 'top-center';
alertify.defaults.closable = false

function markElements() {
	window.scrollTo(0, 0)
	sheetNumbers.forEach(element => {
		element.classList.remove('marked')
	})

	ballsToListen.forEach(element => {
		element.classList.remove('markedNumberBall')
	})

	markedNumbers.forEach(number => {
		sheetNumbers.forEach(element => {
			if (element.textContent === number) {
				element.classList.add('marked')
			}
		})
		ballsToListen.forEach(element => {
			if (element.textContent === number) {
				element.classList.add('markedNumberBall')
			}
		})
		saveGame()
	})
}

ballsToListen.forEach(element => {
	element.addEventListener('click', () => {
		const numberToMark = element.textContent
		if (markedNumbers.has(numberToMark)) {
			alertify.confirm('¿Eliminar marca del número ' + numberToMark + '?', function () {
				markedNumbers.delete(numberToMark)
				alertify.warning('Marca eliminada: ' + numberToMark, 'warning', 10)
				markElements()
			})
		} else {
			markedNumbers.add(numberToMark)
			alertify.notify('Marcado: ' + numberToMark, 'success', 10)
			markElements()
		}
		markElements()
	})
});

function restartGame() {
	alertify.confirm('¿Reiniciar el juego?', function () {
		markedNumbers.clear()
		markElements()
		saveGame()
		alertify.success('Juego reiniciado', 'success', 10)
	})
}

function fullscreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen()
	} else {
		document.documentElement.requestFullscreen()
	}
}


function saveGame() {
	localStorage.setItem(LOCALSTORAGE_KEY, Array.from(markedNumbers).join(','))
}

function loadGame() {
	const savedGame = localStorage.getItem(LOCALSTORAGE_KEY)
	if (savedGame) {
		markedNumbers.clear()
		savedGame.split(',').forEach(number => {
			markedNumbers.add(number)
		})
		markElements()
	}
}

loadGame()
markElements()