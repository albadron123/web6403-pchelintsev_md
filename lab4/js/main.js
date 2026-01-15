//===some CMS-stuff here
const basicFrogLines = [
	"Hi there! Thanks for visiting the webpage!",
	"Yo yo yo! Don't forget to subscribe to the mailing list down there!",
	"I'm just a frog-bartender waiting for you to make an order",
];

//===end of some CMS-stuff


let selectedString = "hello world";
let printedCount = 0;
let isPrinting = false;
let dialogueBox = null;
let animationId = 0;

window.onload = function() {
	dialogueBox = document.getElementById("dialogue-box");
	hideAll = document.getElementById("hide-all");
	hideAll.style.display = "none";
	nextLine();
};

function rnd(max) {
	return Math.floor(Math.random() * max);
}

function animateDialogueBox() {
	if(animationId == 0) {
		animationId = 1;
	}
	else {
		animationId = 0;
	}
	dialogueBox.style.animationName = "dialogue-animation-" + animationId;
}

function nextLine() {
	selectedString = basicFrogLines[rnd(basicFrogLines.length)];
	printedCount = 0;
	if(!isPrinting)
	{
		isPrinting = true;
		printText();
	}
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function printText() {
	do {
		printedString = selectedString.substring(0, printedCount);
		dialogueBox.innerHTML = `<p>${printedString}</p>`;
		printedCount++;
		await delay(30);
	} while (printedCount <= selectedString.length);
	isPrinting = false;
	return
}	
