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
			refreshPage(1500);
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

function deleteUser(userId){
	const xhr = new XMLHttpRequest();

	xhr.onload = function(){
		if(xhr.status === 200){
			refreshPage(0);
		}
		else{
			alert(xhr.response);
		}
	}

	xhr.open('DELETE', '/telegramBot/' + userId);
	xhr.send();
}

function sendTestMessage(){
	hideSendTestButton();

	const xhr = new XMLHttpRequest();

	xhr.onload = function(){
		var message;
		if(xhr.status === 200){
			message = 'Mensagem enviada.';
		}
		else{
			message = 'Erro ao enviar mensagem: ';
			message += xhr.response;
		}

		editTestResponseDivContent(message);
		showTestResponseDiv();
		hideTestMessageDiv();
	}

	xhr.open('POST', '/telegramBot/test');
	xhr.send();
}

function openAddUserModal(){
	hideAddUserResponseDiv();
	showAddUserFormDiv();
	showAddUserButton();
	$('#addUserModal').modal();
}

function openTestModal(){
	showTestMessageDiv();
	showSendTestButton();
	hideTestResponseDiv()
	$('#sendTestModal').modal();
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

function showTestMessageDiv(){
	document.getElementById('testMessageDiv').style.display = 'block';
}

function hideTestMessageDiv(){
	document.getElementById('testMessageDiv').style.display = 'none';
}

function showTestResponseDiv(){
	document.getElementById('testResponseDiv').style.display = 'block';
}

function hideTestResponseDiv(){
	document.getElementById('testResponseDiv').style.display = 'none';
}

function hideSendTestButton(){
	document.getElementById('sendTestButton').style.display = 'none';
}

function showSendTestButton(){
	document.getElementById('sendTestButton').style.display = 'block';
}

function editTestResponseDivContent(content){
	document.getElementById('testResponseDiv').innerHTML = content;
}

function refreshPage(miliseconds){
	setTimeout(() => {
		location.reload();
	}, miliseconds)
}