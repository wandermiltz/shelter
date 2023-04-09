const petCardsContainer = document.getElementById('pet-cards-carousel');
const petModalContainer = document.getElementById('pet-modal-container');
const rightCarouselButton = document.getElementById('right-carousel-button');
const leftCarouselButton = document.getElementById('left-carousel-button');

async function getPetCardsData() {
	const petCards = './data/pet-cards.json';
	const res = await fetch(petCards);
	const data = await res.json();
	return data;
}

let petCardsData = await getPetCardsData();

function generatePetCardHtml(cardObj) {

	let name = cardObj.name;
	let img = cardObj.img;
	let type = cardObj.type;
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

async function insertPetCardHtml(petCardIndex) {
	let cardObj = petCardsData[petCardIndex]
	let petCardHtml = generatePetCardHtml(cardObj);
	petCardsContainer.insertAdjacentHTML('afterbegin', petCardHtml);

	let currentCard = document.getElementById(cardObj.name)
	currentCard.addEventListener('click', (e) => {
		petModalContainer.classList.add('open')
		console.log('modal opens')
		let petModalHtml = generatePetCardModalHtml(cardObj)
		petModalContainer.innerHTML = petModalHtml
	})
}

function getRandomNum(max, min) {
	return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandomSequenceCompared(min, max, sequenceLength, arrToCompare = []) {
	let numArr = [];
	while (numArr.length !== sequenceLength) {
		let num = getRandomNum(max, min);
		if ((numArr.indexOf(num) !== - 1) || (arrToCompare.indexOf(num) !== - 1)) continue;
		numArr.push(num);
	}
	return numArr;
}

function getInitCardSet() {
	let rightCardSet = getRandomSequenceCompared(0, 7, 3);
	let currCardSet = [...rightCardSet];
	rightCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	let leftCardSet = [...currCardSet];
	console.log('left', leftCardSet)
	currCardSet = [...rightCardSet];
	console.log('curr', currCardSet);
	rightCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	console.log('right', rightCardSet);

	return [leftCardSet, currCardSet, rightCardSet];
}

function animateMoveCardRight() {
	document.getElementById('pet-cards-carousel').animate([
		{ transform: 'translateX(0)' },
		{ transform: 'translateX(-1000px)' }
	], {
		duration: 700
	})
}

function animateMoveCardLeft() {
	document.getElementById('pet-cards-carousel').animate([
		{ transform: 'translateX(0)' },
		{ transform: 'translateX(1000px)' }
	], {
		duration: 700
	})
}

function moveCardsByRightButton(leftCardSet, currCardSet, rightCardSet) {

	animateMoveCardRight()

	// left <- curr
	leftCardSet = [...currCardSet];
	console.log('left', leftCardSet);
	// curr <- right
	currCardSet = [...rightCardSet];
	console.log('curr', currCardSet);
	// generate new right
	rightCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	console.log('right', rightCardSet);

	return [leftCardSet, currCardSet, rightCardSet]
}

function moveCardsByLeftButton(leftCardSet, currCardSet, rightCardSet) {

	animateMoveCardLeft();

	// curr -> right
	rightCardSet = [...currCardSet];
	console.log('left', leftCardSet);
	// left -> curr
	currCardSet = [...leftCardSet];
	console.log('curr', currCardSet);
	// generate new left
	leftCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	console.log('right', leftCardSet);

	return [leftCardSet, currCardSet, rightCardSet]
}

let fullCardSetOuter = getInitCardSet();
let currCardSetOuter = fullCardSetOuter[1];
console.log('currOuter', currCardSetOuter);

currCardSetOuter.forEach(cardIndex => {
	insertPetCardHtml(cardIndex);
})

rightCarouselButton.addEventListener('click', (event) => {
	let cardSetMovedByRightButton = moveCardsByRightButton(...fullCardSetOuter);
	console.log('movedRight', cardSetMovedByRightButton);
	petCardsContainer.innerHTML = '';
	let currCardSetMoved = cardSetMovedByRightButton[1];
	console.log('currCardSetMovedRight', cardSetMovedByRightButton[1]);
	currCardSetMoved.forEach(el => {
		insertPetCardHtml(el);
	})
	fullCardSetOuter = cardSetMovedByRightButton;
})

leftCarouselButton.addEventListener('click', (event) => {
	let cardSetMovedByLeftButton = moveCardsByLeftButton(...fullCardSetOuter);
	console.log('movedLeft', cardSetMovedByLeftButton);
	let currCardSetMoved = cardSetMovedByLeftButton[1];
	console.log('currCardSetMovedLeft', cardSetMovedByLeftButton[1]);
	petCardsContainer.innerHTML = '';
	currCardSetMoved.forEach(el => {
		insertPetCardHtml(el);
	})
	fullCardSetOuter = cardSetMovedByLeftButton;
})