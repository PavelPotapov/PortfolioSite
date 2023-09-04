const btnReset = document.querySelector("#btn-reset")

btnReset.addEventListener("click", function (event) {
	localStorage.clear()
	location.reload()
})
