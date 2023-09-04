let percent = 0
let isLoaded = false
const number = document.querySelector(".first-letter")
const contentL = document.querySelector(".left")
const contentR = document.querySelector(".right")
const previewPercent = document.querySelector(".preview-percent")
const preview = document.querySelector(".preview")
const loader = document.querySelector(".loader")

if (localStorage.getItem("isShownPreview") === "true") {
	openWindowInstantly()
}

let idIntervalLoader = setInterval(() => {
	if (!isLoaded) {
		percent += 1
		if (percent >= 100) {
			percent = 100
		}
		number.textContent = percent
		if (document.readyState === "complete" && percent === 13) {
			percent = 80
			setTimeout(() => {
				openWindowSmooth()
			}, 3000)
			localStorage.setItem("isShownPreview", "true")
		}
	}
}, 100)

setTimeout(() => {
	clearInterval(idIntervalLoader)
	/* при баге лоадера */
	contentR.classList.add("right-active")
	contentL.classList.add("left-active")
	previewPercent.style.display = "none"
	loader.style.display = "none"
	isLoaded = true
}, 5000)

function openWindowInstantly() {
	previewPercent.style.display = "none"
	loader.style.display = "none"
	contentR.classList.add("right-open")
	contentL.classList.add("left-open")
	
	isLoaded = true
}

function openWindowSmooth() {
	contentR.classList.add("right-active")
	contentL.classList.add("left-active")
	previewPercent.style.display = "none"
	loader.style.display = "none"
	isLoaded = true
}
