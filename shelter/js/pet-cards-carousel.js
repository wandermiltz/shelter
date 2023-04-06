const petCardsContainer = document.getElementById('pet-cards-container');

async function getPets() {

	const petCards = './data/pet-cards.json';
	const res = await fetch(petCards);
	const data = await res.json();

	let img = data[0].img;
	let name = data[0].name;
	let type = data[0].type;
	let breed = data[0].breed;
	let description = data[0].description;
	let age = data[0].age;
	let inoculations = data[0].inoculations;
	let diseases = data[0].diseases;
	let parasites = data[0].parasites;

	let html = `<div>
	<img src="${img}" alt="${name} - ${type} - ${breed}">
	<div>${name}</div>
	<div>${type} - ${breed}</div>
	<div>${description}</div>
	<div>Age: ${age}</div>
	<div>Inoculations: ${inoculations}</div>
	<div>Diseases: ${diseases}</div>
	<div>Parasites: ${parasites}</div>
	</div>`;
	petCardsContainer.insertAdjacentHTML('afterbegin', html);
}


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


getInitCardSet()
getPets()