(function () {
	const burger = document.querySelector('.navigation__burger')
	const nav = document.querySelector('.navigation__list')

	function toggleMenu() {
		burger.classList.toggle('navigation__burger_active')
		nav.classList.toggle('navigation__list_active')
	}

	function removeMenu() {
		burger.classList.remove('navigation__burger_active')
		nav.classList.remove('navigation__list_active')
	}

	document.addEventListener('click', el => {
		const withinBoundaries = el.composedPath().includes(burger);
		if (!withinBoundaries) {
			removeMenu()
		}
	})

	burger.addEventListener('click', () => {
		toggleMenu()
	})

}())