function addUser(){
	hideAddUserResponseDiv();

	const usernameDiv = document.getElementById('username');
	const chatIdDiv = document.getElementById('userChatId');

	const username = usernameDiv.value;
	const chatId = chatIdDiv.value;

	// Validations
	if(!username){
		return usernameDiv.focus();
	}
	if(!chatId){
		return chatIdDiv.focus();
	}
	if(chatId.length != 9){
		return chatIdDiv.focus()
	}

	hideAddUserButton();

	const userData = {
		username: username,
		chatId: chatId
	}

	const xhr = new XMLHttpRequest();

	xhr.onload = function(){
		showAddUserResponseDiv();
		hideAddUserFormDiv();
		
		var message;
		if(xhr.status === 200){
			message = 'Usuário adicionado com sucesso.';
			refreshPage();
		}
		else{
			message = 'Erro: ';
			message += xhr.response;
		}
		editContentAddUserResponseDiv(message);
	}

	xhr.open('POST', '/telegramBot/register');
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.send(JSON.stringify(userData));
}

function openAddUserModal(){
	hideAddUserResponseDiv();
	showAddUserFormDiv();
	showAddUserButton();
	$('#addUserModal').modal();
}

function hideAddUserResponseDiv(){
	document.getElementById('addUserResponse').style.display = 'none';
}

function showAddUserResponseDiv(){
	document.getElementById('addUserResponse').style.display = 'block';
}

function editContentAddUserResponseDiv(content){
	const addUserResponseDiv = document.getElementById('addUserResponse').innerHTML = content;
}

function hideAddUserFormDiv(){
	document.getElementById('addUserForm').style.display = 'none';
}

function showAddUserFormDiv(){
	document.getElementById('addUserForm').style.display = 'block';
}

function hideAddUserButton(){
	document.getElementById('addUserButton').style.display = 'none';
}

function showAddUserButton(){
	document.getElementById('addUserButton').style.display = 'block';
}

function refreshPage(){
	setTimeout(() => {
		location.reload();
	}, 1500)
}