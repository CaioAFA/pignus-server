function login(){
	const usernameDiv = document.getElementById('usernameInput');
	const passwordDiv = document.getElementById('passwordInput');

	const username = usernameDiv.value;
	const password = passwordDiv.value;

	// Validations
	if(!username){
		return usernameDiv.focus();
	}

	if(!password){
		return passwordDiv.focus();
	}

	sendLoginRequest(username, password);
}

function sendLoginRequest(username, password){
	const userData = {
		username: username,
		password: password
	}

	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/login');
	xhr.onload = function(){
		if(xhr.status == 200){
			window.location = '/incidentsPage/search';
		}

		// Not Authorized
		if(xhr.status == 403){
			const message = xhr.response;
			showResponseDiv(message);
		}
	}
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xhr.send(JSON.stringify(userData));
}

// Add the ENTER key event to do login
document.addEventListener('keypress', (event) => {
	const keyPressed = event.key;

	if(keyPressed == 'Enter'){
		login();
	}
})

function showResponseDiv(message){
	const responseDiv = document.getElementById('responseDiv');
	responseDiv.innerHTML = message;
	responseDiv.display = 'block';
}

function hideResponseDiv(message){
	const responseDiv = document.getElementById('responseDiv');
	responseDiv.display = 'none';
}