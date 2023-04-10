const petCardsContainer = document.getElementById('pet-cards-container');
const pgBtnRight = document.getElementById('pg-btn-right');
const pgBtnLeft = document.getElementById('pg-btn-left');
const pageNumber = document.getElementById('page-number');
const pgBtnToFirst = document.getElementById('pg-btn-left-to-first');
const pgBtnToLast = document.getElementById('pg-btn-right-to-last');

const petModal = document.getElementById('pet-modal');
const petModalContainer = document.getElementById('pet-modal-container');
const modalCloseBtn = document.querySelector('.modal-close-btn');
const overlay = document.querySelector('.overlay');
const html = document.querySelector('html');

async function getPetCardsData() {
	const petCards = './data/pet-cards.json';
	const res = await fetch(petCards);
	const data = await res.json();
	return data;
}

function generatePetCardHtml(obj) {
	let name = obj.name;
	let img = obj.img;
	let type = obj.type;
	let petCardHtml = `<div class="pet-card" id="${name}">
			<div class="pet-card__container">
				<div class="pet-card__img">
					<img src="${img}" alt="${name} - ${type}">
				</div>
				<div class="pet-card__title header-4 header-4_dark">${name}</div>
				<div class="pet-card__button">
					<button class="button button_bordered">Learn more</button>
				</div>
			</div>
		</div>`
	return petCardHtml;
}

function generatePetCardModalHtml(cardObj) {

	let name = cardObj.name;
	let img = cardObj.img;
	let type = cardObj.type;
	let breed = cardObj.breed;
	let age = cardObj.age
	let description = cardObj.description
	let inoculations = cardObj.inoculations
	let diseases = cardObj.diseases
	let parasites = cardObj.parasites

	let petCardModalHtml = `<img class="pet-modal__image" src="${img}" alt="${name} - ${type}">
			<div class="pet-modal__content">
				<h3 class="pet-modal__title header-3">${name}</h3>
				<div class="pet-modal__subtitle header-4 ">
					<span>${type}</span> - <span>${breed}</span>
				</div>
				<div class="pet-modal__paragraph header-5">
				${description}
				</div>
				<ul class="pet-modal__list header-5">
					<li class="pet-modal__list-item">
						<span><b>Age: </b><span>${age}</span></span>
					</li>
					<li class="pet-modal__list-item">
						<span><b>Inoculations: </b><span>${inoculations}</span></span>
					</li>
					<li class="pet-modal__list-item">
						<span><b>Diseases: </b><span>${diseases}</span></span>
					</li>
					<li class="pet-modal__list-item">
						<span><b>Parasites: </b><span>${parasites}</span></span>
					</li>
				</ul>
			</div>`
	return petCardModalHtml;
}

function shuffle(arr) {
	return arr.sort(() => Math.random() - 0.5);
}

async function generateFullPetCardsSet() {
	let data = await getPetCardsData();
	let arr = [];
	for (let i = 1; i <= 6; i++) {
		arr.push(data);
	};
	arr = arr.flat();
	let result = [];
	for (let i = 0; i < arr.length; i = i + 4) {
		result.push(shuffle(arr.slice(i, i + 4)));
	}
	return result.flat();
}

function getChunks(array, chunkSize) {
	let result = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		result.push(array.slice(i, i + chunkSize));
	}
	return result;
}

function openPetCardModal() {
	petModal.classList.add('open')
	petModalContainer.classList.add('open')
	overlay.classList.add('open')
	html.classList.add('stop-scroll');
}

function closePetCardModal() {
	petModal.classList.remove('open')
	petModalContainer.classList.remove('open')
	overlay.classList.remove('open')
	html.classList.remove('stop-scroll');
}

modalCloseBtn.addEventListener('click', (event) => {
	closePetCardModal()
});

overlay.addEventListener('click', (event) => {
	const withinBoundaries = event.composedPath().includes(petModalContainer);
	if (!withinBoundaries) {
		closePetCardModal()
	};
});

petModal.addEventListener('click', (event) => {
	const withinBoundaries = event.composedPath().includes(petModalContainer);
	if (!withinBoundaries) {
		closePetCardModal()
	};
});

function insertPetCardHtml(pageIndex) {
	petCardsContainer.innerHTML = chunkedPetCardsSet[pageIndex].map(pet => generatePetCardHtml(pet)).join('');

	chunkedPetCardsSet[pageIndex].forEach(cardObj => {
		let currentCard = document.getElementById(cardObj.name);
		currentCard.addEventListener('click', (event) => {
			openPetCardModal();
			let petModalHtml = generatePetCardModalHtml(cardObj);
			petModalContainer.innerHTML = petModalHtml;
		})
	})
}

let pageIndex = 0;
let maxPageIndex = 0;
let cardsPerPageCount = 0;
let chunkedPetCardsSet = [];
let fullPetCardsSet = await generateFullPetCardsSet();
console.log('Full CardsSet', fullPetCardsSet)

if (window.innerWidth < 768) {
	console.log('Check for 320px');
	maxPageIndex = 15;
	cardsPerPageCount = 3;

} else if (window.innerWidth <= 1200) {
	console.log('Check for 768px');
	maxPageIndex = 7;
	cardsPerPageCount = 6;

} else {
	console.log('Check for 1280px');
	maxPageIndex = 5;
	cardsPerPageCount = 8;
}

chunkedPetCardsSet = getChunks(fullPetCardsSet, cardsPerPageCount);
insertPetCardHtml(pageIndex);

console.log('Chunked CardsSet', chunkedPetCardsSet);
console.log('Page Count', chunkedPetCardsSet.length);
console.log('Pets per Page Count', cardsPerPageCount);
console.log('Pets on Current Page', chunkedPetCardsSet[pageIndex]);

async function changeOnMedia() {

	let prevCardsPerPageCount = cardsPerPageCount

	if (window.innerWidth < 768) {
		maxPageIndex = 15;
		cardsPerPageCount = 3;
		pageIndex = maxPageIndex;
		pageNumber.innerHTML = `${pageIndex + 1}`;

	} else if (window.innerWidth <= 1200) {
		maxPageIndex = 7;
		cardsPerPageCount = 6;
		pageIndex = maxPageIndex;
		pageNumber.innerHTML = `${pageIndex + 1}`;

	} else {
		maxPageIndex = 5;
		cardsPerPageCount = 8;
		pageIndex = maxPageIndex;
		pageNumber.innerHTML = `${pageIndex + 1}`;
	}

	if (prevCardsPerPageCount !== cardsPerPageCount) {
		chunkedPetCardsSet = getChunks(fullPetCardsSet, cardsPerPageCount);
		insertPetCardHtml(pageIndex);

		console.log('Chunked CardsSet', chunkedPetCardsSet);
		console.log('Page Count', chunkedPetCardsSet.length);
		console.log('Pets per Page Count', cardsPerPageCount);
		console.log('Pets on Current Page', chunkedPetCardsSet[pageIndex]);
	}
}

window.addEventListener('resize', changeOnMedia);

function disableBtn(btn) {
	btn.disabled = true;
	btn.classList.add('pg-button_disabled');
	btn.classList.remove('pg-button_normal');
}

function enableBtn(btn) {
	btn.disabled = false;
	btn.classList.remove('pg-button_disabled');
	btn.classList.add('pg-button_normal');
}

pgBtnRight.addEventListener('click', (event) => {
	if (pageIndex < maxPageIndex) {
		pageIndex += 1;
		petCardsContainer.innerHTML = '';
		insertPetCardHtml(pageIndex);
		pageNumber.innerHTML = `${pageIndex + 1}`;

		enableBtn(pgBtnLeft);
		enableBtn(pgBtnToFirst);

		if (pageIndex == maxPageIndex) {
			disableBtn(pgBtnRight);
			disableBtn(pgBtnToLast);
		}
	} else {
		disableBtn(pgBtnRight);
	}
})

pgBtnLeft.addEventListener('click', (event) => {
	if (pageIndex > 0 && pageIndex <= maxPageIndex) {
		pageIndex -= 1
		petCardsContainer.innerHTML = '';
		insertPetCardHtml(pageIndex);
		pageNumber.innerHTML = `${pageIndex + 1}`;

		enableBtn(pgBtnLeft);
		enableBtn(pgBtnRight);
		enableBtn(pgBtnToFirst);
		enableBtn(pgBtnToLast);

		if (pageIndex == 0) {
			disableBtn(pgBtnLeft);
			disableBtn(pgBtnToFirst);
		}
	} else {
		disableBtn(pgBtnLeft);
	}
})

pgBtnToFirst.addEventListener('click', (event) => {
	pageIndex = 0
	petCardsContainer.innerHTML = '';
	insertPetCardHtml(pageIndex);
	pageNumber.innerHTML = `${pageIndex + 1}`;

	disableBtn(pgBtnLeft);
	disableBtn(pgBtnToFirst);

	enableBtn(pgBtnRight);
	enableBtn(pgBtnToLast);
})

pgBtnToLast.addEventListener('click', (event) => {
	pageIndex = maxPageIndex;
	petCardsContainer.innerHTML = '';
	insertPetCardHtml(pageIndex);
	pageNumber.innerHTML = `${pageIndex + 1}`;

	disableBtn(pgBtnRight);
	disableBtn(pgBtnToLast);

	enableBtn(pgBtnLeft);
	enableBtn(pgBtnToFirst);
})
