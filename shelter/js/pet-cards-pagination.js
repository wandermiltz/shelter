const petCardsContainer = document.getElementById('pet-cards-container');
const pgBtnRight = document.getElementById('pg-btn-right');
const pgBtnLeft = document.getElementById('pg-btn-left');

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
	return Math.floor(min + Math.random() * (max + 1 - min))
}

function getRandomSequence(min, max, sequenceLength) {
	let numArr = []
	while (numArr.length !== sequenceLength) {
		let num = getRandomNum(max, min);
		if (numArr.indexOf(num) !== - 1) continue;
		numArr.push(num);
	}
	console.log(numArr)
	return numArr;
}

async function generateFullPetCardsSet() {

	const data = await getPetCardsData();
	let arrOfCardSequences = []

	for (let i = 0; i < 6; i++) {
		let randomSequence = getRandomSequence(0, 7, 8)
		let arrOfRandomCards = []
		for (let i = 0; i < data.length; i++) {
			arrOfRandomCards.push(data[randomSequence[i]])
		}
		arrOfCardSequences.push(arrOfRandomCards)
	}
	console.log(arrOfCardSequences)
	return arrOfCardSequences
}

let fullPetCardsSet = await generateFullPetCardsSet()
console.log(fullPetCardsSet)

async function insertPetCardHtml(pageIndex) {
	for (let j = 0; j < fullPetCardsSet[pageIndex].length; j++) {
		let petCardHtml = await generatePetCardHtml(fullPetCardsSet[pageIndex][j])
		petCardsContainer.insertAdjacentHTML('afterbegin', petCardHtml)
	}
}

let pageIndex = 0
insertPetCardHtml(pageIndex)

pgBtnRight.addEventListener('click', el => {
	pageIndex += 1
	petCardsContainer.innerHTML = ''
	insertPetCardHtml(pageIndex)
})