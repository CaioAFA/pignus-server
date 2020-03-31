function createUser(){
	const usernameDiv = document.getElementById('usernameInput');
	const passwordDiv = document.getElementById('passwordInput');

	const username = usernameDiv.value;
	const password = passwordDiv.value;

	// Validation
	if(!username){
		return usernameDiv.focus();
	}

	if(!password){
		return passwordDiv.focus();
	}

	// POST to server
	const xhr = new XMLHttpRequest();

	xhr.onload = () => {
		if(xhr.status == 200){
			alert('Usuário criado com sucesso!');
			location.reload();
		}
		else{
			alert('Erro na criação do usuário.');
			showPostResponseDiv();
			editPostResponseDiv(xhr.response);
		}
	}

	xhr.open('POST', '/user');
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify({
		username: username,
		password: password
	}))
}

function showPostResponseDiv(){
	document.getElementById('postResponseDiv').style.display = 'block';
}

function hidePostResponseDiv(){
	document.getElementById('postResponseDiv').style.display = 'none';
}

function editPostResponseDiv(content){
	document.getElementById('postResponseDiv').innerHTML = content;
}