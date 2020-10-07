function closeIncidentInformation(){
	document.getElementById("magnifiedImageDiv").style.display = "none";
	document.getElementById("main").style.filter = "blur(0px)";			
}

function openIncidentInformation(image){
	document.getElementById("magnifiedImage").src = image.src;
	document.getElementById("magnifiedImageDiv").style.display = "block";
	document.getElementById("main").style.filter = "blur(8px)";
}