/* ABOUT ME */
const textSpanFirstLetter = document.querySelector(".firstLetter")
const textSpanSecondLetter = document.querySelector(".secondLetter")
const h1 = document.querySelector(".aboutMe > h1")
const textSpan = document.querySelector(".aboutMe__title")

let textForH1 = "Hi! 👋"
let textForSpan = "Потапов Павел. "
let textForMainFirst = "Меня зовут"
let textForMainSecond =
	"Я люблю создавать приложения. Я также интересуюсь криптовалютами, frontend разработкой, играю в футбол, в Dota2. Люблю играть на гитаре."

/* WORK */
const dataWork = [
	[
		"Январь 2023 - Текущий момент",
		"Июнь 2021 — Январь 2023",
		"Ноябрь 2020 — Август 2021",
		"Июль 2020 — Ноябрь 2020",
		"Июль 2020 — Январь 2021",
		"Сентябрь 2016 — Июль 2020",
	],

	[
		"🏄 В свободном плавании",
		"😎 Руководитель",
		"🏃‍♂️ Projectmanager",
		"👨‍💻 Программист",
		"📈 Productmanager",
		"👨‍🎓 Выпускник ЮУрГУ",
	],

	[
		`Подрабатываю учителем программирования на Python. Изучаю frontend, делаю микрозаказы в этой области. Создаю интересные мне PET-проекты. Прокачиваю скилы, хочу стать мастером front-a`,
		`Свой бизнес. Создал свой успешный проект, развивал его. Школа программирования для детей juniorcode.ru в Челябинске. Много рук и много ног 🙃. Развивал проект с нуля. Нанимал людей, обучал сотрудников, искал способы продвижения, выстраивал продажи. Открыл 2 школы в городе. После 1.5 лет работы продал бизнес. До сих пор он работает и развивается, но уже без меня.`,
		`Вел проекты. В основном сайты и разработка кастомных crm систем для клиентов. Большое количество живого общения с ЛПР заказчика. Одновременно в работе было до 12 проектов разного уровня сложности. Разрабатывал ТЗ, прототипы, составлял договора, следил за сроками выполнения проекта, ставил задачи команде. Урегулировал спорные и конфликтные ситуации с клиентами. Получил иммунитет к стрессовой и нервной работе.`,
		`Работа в команде разработчиков. Писали сайт frontend части. ASP.NET, PgAdmin4, vanilla JS. Ушел по собственному желанию в project.`,
		`Прошел курсы в “Управленческом клубе” на product-manager, организованные внутри IT-сообщества “Корпус”, в ходе которых получил основные навыки, для работы в области product-management. Благодаря этим курсам попал в команду проекта Mediastamp (от компании EveryPixel). Параллельно работал программистом.`,
		`Высшее образование: Южно-Уральский государственный университет, факультет Математика, механика и компьютерные технологии, специальность Прикладная математика и информатика (бакалавр).`,
	],
]

async function typeWorkText() {
	let data = document.querySelector(".work__list")
	Array.from(data.children).forEach((elem, index1) => {
		Array.from(elem.children).forEach(async (elem, index) => {
			await typeText(elem, dataWork[index][index1], 15)
		})
	})
	localStorage.setItem("isShownWork", "true")
}

/* Используем эту функцию в файле changetheme.js, когда меняем секцию на WORK */
function typeWorkTextImmediately() {
	let data = document.querySelector(".work__list")
	Array.from(data.children).forEach((elem, index1) => {
		Array.from(elem.children).forEach((elem, index) => {
			pasteText(elem, dataWork[index][index1], 15)
		})
	})
}

/* Используем эту функцию в файле changetheme.js, когда меняем секцию на PROJECT */
// function typeProjectTextImmediately() {
// 	let data = document.querySelector(".project__content")
// 	pasteText(data, dataProject)

// }

/* ------------------------------------------------------- */

/* Универсальная функция печати текста */
function typeText(elem, text, delay) {
	return new Promise((resolve, reject) => {
		let i = 0
		let id = setInterval(() => {
			if (i == text.length) {
				clearInterval(id)
				resolve()
			} else {
				elem.innerHTML += text[i]
				i++
			}
		}, delay)
	})
}

/* немедленная вставка текста  */
function pasteText(elem, text) {
	elem.innerHTML = text
}

/* функция для задержки */
let delay = (ms) =>
	new Promise((resolve, reject) => {
		setTimeout(() => resolve(), ms)
	})

/* если было показано preview, то вставляем текст мгновенно в разделе home и в разделе project */
if (localStorage.getItem("isShownPreview") === "true") {
	typeAllTextImmediately()
} else {
	/* делаем задержку для preview */
	delay(4000).then(() => {
		typeAllText()
	})
}

function typeAllTextImmediately() {
	pasteText(h1, textForH1)
	pasteText(textSpanFirstLetter, textForMainFirst)
	pasteText(textSpan, textForSpan)
	pasteText(textSpanSecondLetter, textForMainSecond)
}

async function typeAllText() {
	await typeText(h1, textForH1.split(""), 30)
	await typeText(textSpanFirstLetter, textForMainFirst.split(""), 30)
	await typeText(textSpan, textForSpan.split(""), 30)
	await typeText(textSpanSecondLetter, textForMainSecond.split(""), 30)
}
