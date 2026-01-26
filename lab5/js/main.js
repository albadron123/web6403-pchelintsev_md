//===some CMS-stuff here
const basicFrogLines = [
	"Hi there! Thanks for visiting the webpage!",
	"Yo yo yo! Don't forget to subscribe to the mailing list down there!",
	"What's up! I'm just a joke telling machine",
];

//===end of some CMS-stuff


async function searchForRandomJoke()
{
	try
	{
		url = "https://official-joke-api.appspot.com/random_joke";
		response = await fetch(url);
		jokeJson = await response.json();
		return jokeJson;
	}
	catch (e)
	{
		return {setup: `Aha! I think I remembered joke... hmmmm...`, punchline: `Hmmm... no I forgot it (${e})...`};
	}
}

//===DOM elements
let mailingList;
let errorCheck;
let mailingListForm;
let submitMailingList;

//===important objects 
let dialogueAnimation = null;
let rotateAnimation = null;
		
//===important vars

let selectedString = "hello world";
let printedCount = 0;
let isPrinting = false;
let dialogueBox = null;
let animationId = 0;

let tellingJoke = false;
let injokefunction = false;

let showEmailError = false;

window.onload = function() {
	//---init objects and events

	dialogueBox = document.getElementById("dialogue-box");
	hideAll = document.getElementById("hide-all");
	hideAll.style.display = "none";

	mailingList = document.getElementById("input-mailing-list");
	mailingList.oninput = emailChanged;

	errorCheck = document.getElementById("main-email-error-check");

	mailingListForm = this.document.getElementById("form-mailing-list");
	mailingListForm.onsubmit = submitEmail;


	submitMailingList = this.document.getElementById("submit-mailing-list");
	//---init animations

	dialogueAnimation = 
	{
			obj: dialogueBox,
			animationId: 0,
			animationName: "dialogue-animation-"
	};

	rotateAnimation = 
	{
		obj: mailingListForm,
		animationId: 0,
		animationName: "container-shake-"
	};

	nextLine();
	BoredomCheck();
};



//===General purpose functions

function animateObject(anim) {
	/*
	Works on objects that look like this:
		animationInfo = 
		{
			obj: someObject,
			animationId: 0,
			animationName: "some-animation-"
		};
	*/
	if(anim.animationId == 0) {
		anim.animationId = 1;
	}
	else {
		anim.animationId = 0;
	}
	anim.obj.style.animationName = anim.animationName + anim.animationId;
}



//===Mailing list work 

async function submitEmail(event)
{
	event.preventDefault();
	let email = mailingList.value;
	let isValid = isEmailValid(email);

	if(isValid)
	{
		try
		{
			submitMailingList.style.opacity = "0.3";
			mailingListForm.onsubmit = (e) => {e.preventDefault();};
			await 
				fetch("http://localhost:8080/mailinglist", 
				{
					method: "POST",
					body: JSON.stringify({mail: email}),
					mode: "cors"
				})
				.then((
					response) => 
					{
    					if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
					}
				);
			//email sumbitted
			let successText = document.createElement("div");
			successText.style.textAlign = "center";
			successText.innerHTML = 
				`<h2>Thanks for submitting your email address!<h2><h4>We will send you a confirmation letter on <i style="color:var(--warning);">${email}</i> soon!</h4>`;
			mailingListForm.replaceWith(successText);
		}
		catch (e)
		{
			animateObject(rotateAnimation);	
			console.log(`failed to submit: ${e}`);
			submitMailingList.style.opacity = "1";
			mailingListForm.onsubmit = submitEmail;
		}
	}
	if (!isValid)
	{
		animateObject(rotateAnimation);
	}
}

function emailChanged()
{
	let email = mailingList.value;
	let isValid = isEmailValid(email);
	if(isValid && showEmailError)
	{
		showEmailError = false;
		errorCheck.style.height = "0";
		errorCheck.style.opacity = "0";
		errorCheck.style.display = "none";
		errorCheck.style.animationName = "error-check-animation-hide";
	}
	if (!isValid && !showEmailError)
	{
		showEmailError = true;
		errorCheck.style.height = "auto";
		errorCheck.style.opacity = "1";
		errorCheck.style.display = "block";
		errorCheck.style.animationName = "error-check-animation-show";
	}
}

function isEmailValid(email)
{
	// this regexp was found on the internet!!!
	let validEmailRegExp = 
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return (email.toLowerCase().match(validEmailRegExp) != null);
}

//===Dialogue controller work

function rnd(max) {
	return Math.floor(Math.random() * max);
}

function animateDialogueBox() {
	animateObject(dialogueAnimation);
}



async function BoredomCheck()
{
	/*
	This loops ad infinitum and checks whether the frog is bored (not telling jokes after presskey)
	If this is true then we start the joke telling loop
	*/ 
	while(true)
	{
		if(!injokefunction && !tellingJoke && !isPrinting)
		{
			tellJoke();
		}
		await(delay(10000));
	}
}

async function tellJoke() {
	tellingJoke = true;
	injokefunction = true;
	while(true)
	{
	response = await searchForRandomJoke(); if(!tellingJoke) {injokefunction = false; return;}
	selectedString = response.setup;
	printedCount = 0;
	animateDialogueBox();
	await printText(); if(!tellingJoke) {injokefunction = false; return;}
	await delay(2000); if(!tellingJoke) {injokefunction = false; return;}
	selectedString = response.punchline;
	printedCount = 0;
	animateDialogueBox();
	await printText(); if(!tellingJoke) {injokefunction = false; return;}
	await delay(300); if(!tellingJoke) {injokefunction = false; return;}
	}
}

function nextLine() {
	tellingJoke = false;
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
