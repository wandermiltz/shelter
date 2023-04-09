const petCardsContainer = document.getElementById('pet-cards-container');
const pgBtnRight = document.getElementById('pg-btn-right');
const pgBtnLeft = document.getElementById('pg-btn-left');
const pageNumber = document.getElementById('page-number');
const pgBtnToFirst = document.getElementById('pg-btn-left-to-first');
const pgBtnToLast = document.getElementById('pg-btn-right-to-last');

async function getPetCardsData() {
	const petCards = './data/pet-cards.json';
	const res = await fetch(petCards);
	const data = await res.json();
	return data;
}

async function generatePetCardHtml(obj) {
	let name = obj.name;
	let img = obj.img;
	let type = obj.type;
	let petCardHtml = `<div class="pet-card">
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

function getRandomNum(max, min) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomSequence(min, max, sequenceLength) {
	let numArr = [];
	while (numArr.length !== sequenceLength) {
		let num = getRandomNum(max, min);
		if (numArr.indexOf(num) !== - 1) continue;
		numArr.push(num);
	}
	return numArr;
}

async function generateFullPetCardsSet(maxPageIndex, cardsPerPageCount) {

	const data = await getPetCardsData();
	let arrOfCardSequences = []

	for (let i = 0; i <= maxPageIndex; i++) {
		let randomSequence = getRandomSequence(0, 7, cardsPerPageCount);
		let arrOfRandomCards = [];
		for (let i = 0; i < cardsPerPageCount; i++) {
			arrOfRandomCards.push(data[randomSequence[i]]);
		}
		arrOfCardSequences.push(arrOfRandomCards);
	}
	return arrOfCardSequences;
}

async function insertPetCardHtml(pageIndex) {
	for (let j = 0; j < fullPetCardsSet[pageIndex].length; j++) {
		let petCardHtml = await generatePetCardHtml(fullPetCardsSet[pageIndex][j]);
		petCardsContainer.insertAdjacentHTML('afterbegin', petCardHtml);
	}
}

let pageIndex = 0;
let maxPageIndex = 0;
let cardsPerPageCount = 0;
let fullPetCardsSet = [];

if (window.innerWidth < 768) {
	console.log('check on 320px');
	maxPageIndex = 15;
	cardsPerPageCount = 3;

	fullPetCardsSet = await generateFullPetCardsSet(maxPageIndex, cardsPerPageCount);
	console.log('fullPetCardsSet', fullPetCardsSet);
	insertPetCardHtml(pageIndex);

} else if (window.innerWidth <= 1200) {
	console.log('check on 768px');
	maxPageIndex = 7;
	cardsPerPageCount = 6;

	fullPetCardsSet = await generateFullPetCardsSet(maxPageIndex, cardsPerPageCount);
	console.log('fullPetCardsSet', fullPetCardsSet);
	insertPetCardHtml(pageIndex);

} else {
	console.log('check on 1280px');
	maxPageIndex = 5;
	cardsPerPageCount = 8;

	fullPetCardsSet = await generateFullPetCardsSet(maxPageIndex, cardsPerPageCount);
	console.log('fullPetCardsSet', fullPetCardsSet);
	insertPetCardHtml(pageIndex);
}

function changeOnMedia() {
	if (window.innerWidth < 768) {
		maxPageIndex = 15;
		cardsPerPageCount = 3;

	} else if (window.innerWidth <= 1200) {
		maxPageIndex = 7;
		cardsPerPageCount = 6;

	} else {
		maxPageIndex = 5;
		cardsPerPageCount = 8;
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

pgBtnRight.addEventListener('click', el => {
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

pgBtnLeft.addEventListener('click', el => {
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

pgBtnToFirst.addEventListener('click', el => {
	pageIndex = 0
	petCardsContainer.innerHTML = '';
	insertPetCardHtml(pageIndex);
	pageNumber.innerHTML = `${pageIndex + 1}`;

	disableBtn(pgBtnLeft);
	disableBtn(pgBtnToFirst);

	enableBtn(pgBtnRight);
	enableBtn(pgBtnToLast);
})


pgBtnToLast.addEventListener('click', el => {
	pageIndex = maxPageIndex;
	petCardsContainer.innerHTML = '';
	insertPetCardHtml(pageIndex);
	pageNumber.innerHTML = `${pageIndex + 1}`;

	disableBtn(pgBtnRight);
	disableBtn(pgBtnToLast);

	enableBtn(pgBtnLeft);
	enableBtn(pgBtnToFirst);
})
