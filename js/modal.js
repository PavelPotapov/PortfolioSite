const music = document.querySelector(".music")
const modal = document.querySelector(".modal")
const cross = document.querySelector(".cross")

function disableScroll() {
	// Get the current page scroll position
	scrollTop = window.scrollY || document.documentElement.scrollTop
	scrollLeft = window.scrollX || document.documentElement.scrollLeft
	window.onscroll = function () {
		window.scrollTo(scrollLeft, scrollTop)
	}
}

function enableScroll() {
	window.onscroll = function () {}
}

music.addEventListener("click", function (e) {
	modal.classList.add("modal--active")
	disableScroll()
})

cross.addEventListener("click", function (e) {
	modal.classList.remove("modal--active")
	enableScroll()
})
