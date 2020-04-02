function deleteUser(idUser){
	const xhr = new XMLHttpRequest();
	
	xhr.onload = () => {
		if(xhr.status === 200){
			location.reload();
		}
	}

	xhr.open('DELETE', `/user/${idUser}`);
	xhr.send();
}