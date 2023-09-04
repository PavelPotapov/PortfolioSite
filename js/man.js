/*clientWidth уже определена, надо замкнуть */
{
	class Picture {
		constructor(
			pictureDirection,
			pictureSpeed,
			node,
			constrainLeft,
			constrainRight
		) {
			this.pictureDirection = 0
				? pictureDirection == "left"
				: 1 /* 0 - влево 1 - вправо*/
			this.pictureSpeed = pictureSpeed
			this.node = node
			this.x = 0
			this.isShown = true
			this.constrainLeft =
				constrainLeft /* ограничитель по левой стороне. Когда фигура доходит до этой величины, она разворачивается */
			this.constrainRight = constrainRight /* ограничитель по правой стороне. */
		}

		/* костыль в помойку */
		move() {
			setInterval(() => {
				if (
					this.x > this.constrainRight - this.constrainLeft - 58 &&
					this.pictureDirection == 1
				) {
					this.pictureDirection = 0
					this.node.classList.toggle("man-scale")
				}

				if (this.x < 0 && this.pictureDirection == 0) {
					this.pictureDirection = 1
					this.node.classList.toggle("man-scale")
				}

				if (this.pictureDirection == 0) {
					this.x -= this.pictureSpeed
					this.node.style.left = this.x + "px"
				}

				if (this.pictureDirection == 1) {
					this.x += this.pictureSpeed
					this.node.style.left = this.x + "px"
				}
				this.node.style.backgroundPositionX =
					42 * Math.floor(this.x / 42) + "px"
			}, 10)
		}
	}

	const man = document.querySelector(".man")
	const work = document.querySelector(".work")

	checkStateTwo()

	function checkStateTwo() {
		let id = setInterval(() => {
			if (STATE == 2) {
				clearInterval(id)
				let p1 = new Picture(
					0,
					1,
					man,
					work.offsetLeft,
					work.offsetLeft + work.offsetWidth
				)
				p1.move()
			}
		}, 0)
		return id
	}
}
