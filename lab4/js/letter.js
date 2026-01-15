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

window.onload = function() {
	const letterForm  = document.getElementById("letter-form");
	letterForm.addEventListener("submit", submitForm);
};

function submitForm(e) {
	e.preventDefault();

	
	letterData = new LetterData(
		document.getElementById("letter-mail").value,
		document.getElementById("letter-name").value,
		document.getElementById("letter-contents").value,
		false);	
	letterData.log();
}
