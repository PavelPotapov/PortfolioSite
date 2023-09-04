{
	const btnTheme = document.querySelector(".toggle_theme-checker").children[0]
	const body = document.querySelector("body")

	btnTheme.addEventListener("click", function (event) {
		btnTheme.classList.toggle("toggle_theme_checker--circle--left")
		btnTheme.classList.toggle("toggle_theme_checker--circle--right")
		body.classList.toggle("light")
		body.classList.toggle("dark")
		if (localStorage.getItem("colorTheme") === "light") {
			localStorage.setItem("colorTheme", "dark")
		} else if (localStorage.getItem("colorTheme") === "dark") {
			localStorage.setItem("colorTheme", "light")
		} else {
			localStorage.setItem("colorTheme", "dark")
		}
	})

	window.onunload = function () {
		localStorage.setItem("colorTheme", "light")
		return ""
	}
}
