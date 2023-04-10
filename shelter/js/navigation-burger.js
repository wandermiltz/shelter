const burger = document.querySelector('.navigation__burger');
const nav = document.querySelector('.navigation__list');
const darken = document.querySelector('.darken');
const body = document.querySelector('body');

function toggleMenu() {
	burger.classList.toggle('navigation__burger_active');
	nav.classList.toggle('navigation__list_active');
	darken.classList.toggle('darken_active');
	body.classList.toggle('stop-scroll');
}

function removeMenu() {
	burger.classList.remove('navigation__burger_active');
	nav.classList.remove('navigation__list_active');
	darken.classList.remove('darken_active');
	body.classList.remove('stop-scroll');
}

document.addEventListener('click', (event) => {
	const withinBoundaries = event.composedPath().includes(burger);
	if (!withinBoundaries) {
		removeMenu()
	};
});

burger.addEventListener('click', (event) => {
	toggleMenu()
});