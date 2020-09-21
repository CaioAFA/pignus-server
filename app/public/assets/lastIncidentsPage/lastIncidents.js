function closeIncidentInformation(){
	document.getElementById("magnifiedImageDiv").style.display = "none";			
}

function openIncidentInformation(image){
	document.getElementById("magnifiedImage").src = image.src;
	document.getElementById("magnifiedImageDiv").style.display = "block";
}