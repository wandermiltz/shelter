const petCardsContainer = document.getElementById('pet-cards-carousel');
const rightCarouselButton = document.getElementById('right-carousel-button');
const leftCarouselButton = document.getElementById('left-carousel-button');

async function getPetCardsData() {
	const petCards = './data/pet-cards.json';
	const res = await fetch(petCards);
	const data = await res.json();
	return data;
}

async function generatePetCardHtml(petCardIndex) {
	const data = await getPetCardsData();
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
	return petCardHtml;
}

async function insertPetCardHtml(petCardIndex) {
	let petCardHtml = await generatePetCardHtml(petCardIndex);

	petCardsContainer.insertAdjacentHTML('afterbegin', petCardHtml)
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

	let rightCardSet = getRandomSequenceCompared(0, 7, 3);
	let currCardSet = [...rightCardSet];
	rightCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	let leftCardSet = [...currCardSet];
	console.log('left', leftCardSet)
	currCardSet = [...rightCardSet];
	console.log('curr', currCardSet)
	rightCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	console.log('right', rightCardSet)

	return [leftCardSet, currCardSet, rightCardSet]
}

function animateMoveCardRight() {
	document.getElementById('pet-cards-carousel').animate([
		{ transform: 'translate3D(0, 0, 0)' },
		{ transform: 'translate3D(-1000px, 0, 0)' }
	], {
		duration: 700
	})
}

function animateMoveCardLeft() {
	document.getElementById('pet-cards-carousel').animate([
		{ transform: 'translate3D(0, 0, 0)' },
		{ transform: 'translate3D(1000px, 0, 0)' }
	], {
		duration: 700
	})
}

function moveCardsByRightButton(leftCardSet, currCardSet, rightCardSet) {

	animateMoveCardRight()

	// left <- curr
	leftCardSet = [...currCardSet];
	console.log('left', leftCardSet)
	// curr <- right
	currCardSet = [...rightCardSet];
	console.log('curr', currCardSet)
	// generate new right
	rightCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	console.log('right', rightCardSet)

	return [leftCardSet, currCardSet, rightCardSet]
}

function moveCardsByLeftButton(leftCardSet, currCardSet, rightCardSet) {

	animateMoveCardLeft()

	// curr -> right
	rightCardSet = [...currCardSet];
	console.log('left', leftCardSet)
	// left -> curr
	currCardSet = [...leftCardSet];
	console.log('curr', currCardSet)
	// generate new left
	leftCardSet = getRandomSequenceCompared(0, 7, 3, currCardSet);
	console.log('right', leftCardSet)

	return [leftCardSet, currCardSet, rightCardSet]
}

let fullCardSetOuter = getInitCardSet()
let currCardSetOuter = fullCardSetOuter[1]
console.log('currOuter', currCardSetOuter)

currCardSetOuter.forEach(el => {
	insertPetCardHtml(el)
})

rightCarouselButton.addEventListener('click', el => {
	let cardSetMovedByRightButton = moveCardsByRightButton(...fullCardSetOuter)
	console.log('movedRight', cardSetMovedByRightButton)
	petCardsContainer.innerHTML = ''
	let currCardSetMoved = cardSetMovedByRightButton[1]
	console.log('currCardSetMovedRight', cardSetMovedByRightButton[1])
	currCardSetMoved.forEach(el => {
		insertPetCardHtml(el)
	})
	fullCardSetOuter = cardSetMovedByRightButton
})

leftCarouselButton.addEventListener('click', el => {
	let cardSetMovedByLeftButton = moveCardsByLeftButton(...fullCardSetOuter)
	console.log('movedLeft', cardSetMovedByLeftButton)
	let currCardSetMoved = cardSetMovedByLeftButton[1]
	console.log('currCardSetMovedLeft', cardSetMovedByLeftButton[1])
	petCardsContainer.innerHTML = ''
	currCardSetMoved.forEach(el => {
		insertPetCardHtml(el)
	})
	fullCardSetOuter = cardSetMovedByLeftButton
})