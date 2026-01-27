

class LetterData {
	
	constructor (mail, name, contents, needReply) {
		this.mail = mail;
		this.name = name;
		this.contents = contents;
		this.needReply = needReply;
	}

	log () {
		let message = `
mail: ${this.mail}
name: ${this.name}
need-reply: ${this.needReply}
contents:
\t${this.contents}`;

		console.log(message);
	}
}

let letterForm = null;
let inputMailForm = null;
let inputContentsForm = null;
let inputReplyForm = null;
let inputNameForm = null;
let errorMessageParagraph = null;
let submitButton = null;

window.onload = function() {
	
	letterForm  = document.getElementById("letter-form");
	letterForm.addEventListener("submit", submitForm);

	inputMailForm = document.getElementById("letter-mail");
	inputMailForm.addEventListener("input", showErrorsIfAny);

	inputContentsForm = document.getElementById("letter-contents");
	inputContentsForm.addEventListener("input", showErrorsIfAny);

	inputReplyForm = document.getElementById("letter-reply");
	
	inputNameForm = document.getElementById("letter-name");
	inputNameForm.addEventListener("input", showErrorsIfAny);

	errorMessageParagraph = this.document.getElementById("form-error-message");

	submitButton = this.document.getElementById("send-button");
};

async function submitForm(e) {
	e.preventDefault();
	
	let letterData = new LetterData(
		inputMailForm.value,
		inputNameForm.value,
		inputContentsForm.value,
		inputReplyForm.checked);	
	let result = clientSideCheck(letterData);
	errorMessageParagraph.innerHTML = result.errorString;
	if(result.correct)
	{
		try
		{
			submitButton.style.opacity = "0.3";
			letterForm.onsubmit = (e) => {e.preventDefault();};
			await 
				fetch("http://localhost:8080/form", 
				{
					method: "POST",
					body: JSON.stringify(letterData),
					mode: "cors"
				})
				.then((
					response) => 
					{
    					if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
					}
				);
			window.location.href = "index.html";
		}		
		catch(err) {
			submitButton.style.opacity = "1";
			letterForm.onsubmit = submitForm;
			errorMessageParagraph.innerHTML = `<h3 style="color:var(--warning);">ERROR: ${err.message}</h3>`;
		}
	}
	else
	{
		errorMessageParagraph.innerHTML = `<h3 style="color:var(--warning);">ERROR: The form is filled incorrectly... We will not send it.</h3>`;
	}
}


function showErrorsIfAny(e) {
	e.preventDefault();

	let letterData = new LetterData(
		inputMailForm.value,
		inputNameForm.value,
		inputContentsForm.value,
		inputReplyForm.checked);
	
	let result = clientSideCheck(letterData);
	errorMessageParagraph.innerHTML = result.errorString;
}

function clientSideCheck(letterData) {
	let result = {
		correct: true,
		errorString: `<h3 style="margin: 2px; color:var(--good)">MAIL WRITING SUPPORT</h3><ul style="font-size:14px;">`,
	};
	console.log(letterData);
	let hasContents = (letterData.contents.length > 5);
	if (!hasContents)
	{
		result.errorString += `<li>WRITE MORE: your mail is too short... write something...</li>`;
		result.correct = false;		
	}
	else
	{
		result.errorString += `<li><b style="color:var(--good);">EXCELENT WRITING!</b></li>`;
	}
	let hasEmail = (letterData.mail.length > 0);
	if (!hasEmail)
	{
		result.correct = false;
		result.errorString += `<li>NO EMAIL: add an email, please...</li>`;
	}
	else
	{
		let mailIsValid = isEmailValid(letterData.mail);
		if(!mailIsValid)
		{
			result.errorString += `<li>TYPO IN MAIL: you misrtyped your mail (ex. of the correct one: <i style="color:var(--warning)">froggit@frogmail.com</i>)</li>`;
			result.correct = false;
		}
		else
		{
			result.errorString += `<li><b style="color:var(--good);">YOU HAVE A GREAT EMAIL!</b></li>`;
		}
	}
	let isSigned = (letterData.name.length > 0);
	if(!isSigned)
	{
		result.errorString += `<li>SIGN THE LETTER: You should sign your mail before sending it</li>`;
		result.correct = false;
	}
	else
	{
		result.errorString += `<li><b style="color:var(--good);">PROFOUNDLY SIGNED!</b></li>`
	}
	result.errorString += `</ul>`;
	return result;
}
