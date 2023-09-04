const homeBtn = document.querySelector(".menu__item--home")
const workBtn = document.querySelector(".menu__item--work")
const projectBtn = document.querySelector(".menu__item--project")
const homeSection = document.querySelector(".home")
const workSection = document.querySelector(".work")
const projectSection = document.querySelector(".project")

const menu = [homeBtn, workBtn, projectBtn]

menu.forEach((menuItem) => {
	menuItem.addEventListener("click", (event) => {
		switch (event.target.innerText) {
			case "Home":
				STATE = 1
				showHomeSection()
				break
			case "Work":
				STATE = 2
				showWorkSection()
				break
			case "Project":
				STATE = 3
				showProjectSection()
				break
		}
	})
})

function showHomeSection() {
	homeSection.style.display = "grid"
	workSection.style.display = "none"
	projectSection.style.display = "none"

	homeBtn.classList.add("menu__item--home--active")
	workBtn.classList.remove("menu__item--work--active")
	projectBtn.classList.remove("menu__item--project--active")
}

function showWorkSection() {
	homeSection.style.display = "none"
	workSection.style.display = "block"
	projectSection.style.display = "none"

	if (localStorage.getItem("isShownWork") === "true") {
		typeWorkTextImmediately()
	} else {
		/* делаем задержку для preview */
		delay(100).then(() => {
			typeWorkText()
		})
	}

	homeBtn.classList.remove("menu__item--home--active")
	workBtn.classList.add("menu__item--work--active")
	projectBtn.classList.remove("menu__item--project--active")
}

function showProjectSection() {
	homeSection.style.display = "none"
	workSection.style.display = "none"
	projectSection.style.display = "block"

	homeBtn.classList.remove("menu__item--home--active")
	workBtn.classList.remove("menu__item--work--active")
	projectBtn.classList.add("menu__item--project--active")
}
