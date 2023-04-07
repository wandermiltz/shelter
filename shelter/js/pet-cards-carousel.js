const petCardsContainer = document.getElementById('pet-cards-container');

async function getPetCardsData() {
	const petCards = './data/pet-cards.json';
	const res = await fetch(petCards);
	const data = await res.json();
	return data;
}

async function generatePetCardHtml(petCardIndex) {
	const data = await getPetCardsData();
	// console.log(data);
	let name = data[petCardIndex].name;
	let img = data[petCardIndex].img;
	let type = data[petCardIndex].type;
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
	// console.log(petCardHtml);
	return petCardHtml;
}

async function insertPetCardHtml(petCardIndex) {
	let petCardHtml = await generatePetCardHtml(petCardIndex)
	petCardsContainer.insertAdjacentHTML('afterbegin', petCardHtml);
}

// let img = data[0].img;
// let name = data[0].name;
// let type = data[0].type;
// let breed = data[0].breed;
// let description = data[0].description;
// let age = data[0].age;
// let inoculations = data[0].inoculations;
// let diseases = data[0].diseases;
// let parasites = data[0].parasites;

// <img src="${img}" alt="${name} - ${type} - ${breed}">
// <div>${name}</div>
// <div>${type} - ${breed}</div>
// <div>${description}</div>
// <div>Age: ${age}</div>
// <div>Inoculations: ${inoculations}</div>
// <div>Diseases: ${diseases}</div>
// <div>Parasites: ${parasites}</div>`;


function getRandomNum(max, min) {
	return Math.floor(min + Math.random() * (max + 1 - min))
}

function getRandomSequenceCompared(min, max, sequenceLength, arrToCompare = []) {
	let numArr = []
	while (numArr.length !== sequenceLength) {
		let num = getRandomNum(max, min);
		if ((numArr.indexOf(num) !== - 1) || (arrToCompare.indexOf(num) !== - 1)) continue;
		numArr.push(num);
	}
	return numArr;
}

function getInitCardSet() {
	//1
	let nextCardSet = getRandomSequenceCompared(0, 7, 3);
	//2
	let currCardSet = [...nextCardSet];
	//3
	nextCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	//4
	let prevCardSet = [...currCardSet];
	console.log('prev', prevCardSet)
	//5
	currCardSet = [...nextCardSet];
	console.log('curr', currCardSet)
	//6
	nextCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	console.log('next', nextCardSet)

	return [prevCardSet, currCardSet, nextCardSet]
}

let initCardSet = getInitCardSet()

let currentCardSet = initCardSet[1]
console.log(currentCardSet)

currentCardSet.forEach(el => {
	insertPetCardHtml(el)
})
