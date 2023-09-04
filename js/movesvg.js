const canvasDraw = document.querySelector("#movePicture")

let clientWidth = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight

window.addEventListener(
	"resize",
	function (event) {
		clientWidth = document.documentElement.clientWidth
		/*здесь же надо пробежаться по всем картинкам и обновить для них поле clinetWidth и уменьшать их ширину */
	},
	true
)

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min
}

class Picture {
	constructor(
		pictureUrl,
		pictureSize,
		pictureDirection,
		pictureSpeed,
		picturePos,
		constrainLeft,
		constrainRight
	) {
		this.pictureUrl = pictureUrl
		this.pictureSize = pictureSize
		this.pictureDirection = 0
			? pictureDirection == "left"
			: 1 /* 0 - влево 1 - вправо*/
		this.pictureSpeed = pictureSpeed
		this.picturePos = picturePos
		this.node
		this.x
		this.y
		this.isShown = true /* важно, чтобы было true, показана ли картинка, если нет, то через некоторую задержку запуститься генерация новой позиции картинки и она станет true*/
		this.isDrag = false /* находится ли объект в состоянии drag */
		this.constrainLeft = false /* ограничитель по левой стороне. Когда фигура доходит до этой величины, она разворачивается */ 
		this.constrainRight = false /* ограничитель по правой стороне. */ 
	}

	createNodeElement(tag, classes = [], content) {
		this.node = document.createElement(tag)

		if (classes.length) {
			this.node.classList.add(...classes)
		}
		if (content) {
			this.node.textContent = content
		}

		this.node.src = this.pictureUrl /*вставляем картинку*/
		this.node.style.position = "absolute" /* картинка выходит из потока */
		this.node.style.zIndex = 0
		this.node.width =
			this.pictureSize /* Устанавливаем нужный размер картинки */

		if (this.picturePos) {
			this.node.style.left = this.picturePos[0] + "px"
			this.node.style.top = this.picturePos[1] + "px"
			this.x = this.picturePos[0]
			this.y = this.picturePos[1]
		} else {
			this.randomPosition()
		}
		this.createDragEvent()
		canvasDraw.appendChild(this.node)
	}

	move() {
		setInterval(() => {
			if (this.isShown && !this.isDrag) {
				if (this.x > clientWidth && this.pictureDirection == 1) {
					this.isShown = false /* картинка скрыта */
					this.randomPositionBehindViewPort()
				}

				if (this.x < -this.node.width && this.pictureDirection == 0) {
					this.isShown = false /* картинка скрыта */
					this.randomPositionBehindViewPort()
				}

				if (this.pictureDirection == 0) {
					this.x -= this.pictureSpeed
					this.node.style.left = this.x + "px"
				}

				if (this.pictureDirection == 1) {
					this.x += this.pictureSpeed
					this.node.style.left = this.x + "px"
				}
				//console.log(this.x, this.node, this.node.style.left)
			}
		}, 1)
	}

	randomDirection() {
		return getRandomInt(0, 2)
	}

	/* возвращает случайные координаты будущей картинки */
	randomPosition() {
		let pos = [
			getRandomInt(-this.node.width, clientWidth + this.node.width),
			getRandomInt(0, clientHeight - this.node.height*2),
		]
		this.node.style.left = pos[0] + "px"
		this.node.style.top = pos[1] + "px"
		this.x = pos[0]
		this.y = pos[1]
	}

	randomPositionBehindViewPort() {
		setTimeout(() => {
			let x, y
			/* Либо слева либо справа */
			let res = getRandomInt(1, 3)
			if (res == 1) {
				x = -this.node.width /* встаем слева */
				this.pictureDirection = 1 /*пойдем вправо  */
			} else {
				x = clientWidth + 10 /* встаем справа */
				this.pictureDirection = 0 /*пойдем влево  */
			}

			y = getRandomInt(
				0,
				clientHeight - this.node.height
			) /* случайная высота */

			this.x = x
			this.y = y
			this.pictureSpeed = getRandomArbitrary(
				0.2,
				1
			) /* случайная скорость в диапазоне 0.2 - 1 */
			this.node.style.left = this.x + "px"
			this.node.style.top = this.y + "px"
			this.isShown = true
		}, getRandomInt(100, 1000))
	}

	/* пока не используется */
	checkShown() {
		return (
			this.left >= -this.node.width &&
			this.right <= clientWidth + this.node.width
		)
	}

	/* создаю Drag */
	createDragEvent() {
		this.node.onmousedown = (event) => {
			// (1) отследить нажатие
			// (2) подготовить к перемещению:

			// передвинуть мяч под координаты курсора
			// и сдвинуть на половину ширины/высоты для центрирования
			let moveAt = (pageX, pageY) => {
				this.isDrag = true /* переводим в состояние Drag */
				this.node.style.left = pageX - this.node.offsetWidth / 2 + "px"
				this.node.style.top = pageY - this.node.offsetHeight / 2 + "px"
				this.x = pageX - this.node.offsetWidth / 2
				this.y = pageY - this.node.offsetHeight / 2
			}
			moveAt(event.pageX, event.pageY)
			function onMouseMove(event) {
				moveAt(event.pageX, event.pageY)
			}

			// (3) перемещать по экрану
			document.addEventListener("mousemove", onMouseMove)

			// (4) положить объект, удалить более ненужные обработчики событий
			this.node.onmouseup = (event) => {
				this.isDrag = false
				document.removeEventListener("mousemove", onMouseMove)
				this.node.onmouseup = null
			}
		}
		/* убирает стандартное поведение браузера */
		this.node.ondragstart = () => {
			return false
		}
	}
}

/* 
Оптимальные значения скорости варьируются от 0.2 до 1, при задержке выполнения в 1
*/

const pictures = []

for (let i = 0; i < 10; i++) {
	let direction = getRandomInt(0, 3)
	if (direction == 1) {
		direction = "left"
	} else {
		direction = "right"
	}
	let a = new Picture(
		`../PortfolioSite/img/cloud${i + 1}.svg`,
		getRandomInt(150, 400),
		direction,
		getRandomArbitrary(0.2, 1)
	)
	a.createNodeElement("img", [])
	pictures.push(a)
}

pictures.forEach((elem) => {
	elem.move()
})
