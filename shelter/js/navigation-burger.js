(function () {
	const burger = document.querySelector('.navigation__burger');
	const nav = document.querySelector('.navigation__list');
	const darken = document.querySelector('.darken');

	function toggleMenu() {
		burger.classList.toggle('navigation__burger_active');
		nav.classList.toggle('navigation__list_active');
		darken.classList.toggle('darken_active');
	}

	function removeMenu() {
		burger.classList.remove('navigation__burger_active');
		nav.classList.remove('navigation__list_active');
		darken.classList.remove('darken_active');
	}

	document.addEventListener('click', el => {
		const withinBoundaries = el.composedPath().includes(burger);
		if (!withinBoundaries) {
			removeMenu()
		};
	});

	burger.addEventListener('click', () => {
		toggleMenu()
	});

}())