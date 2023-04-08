import { getRandomNum, getPetCardsData, generatePetCardHtml, insertPetCardHtml } from './pet-cards-carousel.js'

let petsCardSet = [];

async function generatePetCardSet() {
	const data = await getPetCardsData();

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < 6; j++) {
			petsCardSet.push(data[i]);
		}
	}
}
generatePetCardSet()
console.log(petsCardSet)

function getRandomSequence(min, max, sequenceLength) {
	let numArr = []
	while (numArr.length !== sequenceLength) {
		let num = getRandomNum(max, min);
		if (numArr.indexOf(num) !== - 1) continue;
		numArr.push(num);
	}
	return numArr;
}

let initRandomCardSequence = getRandomSequence(0, 47, 47)

console.log(initRandomCardSequence)

// document.addEventListener('load', petsCardSet);