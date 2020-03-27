async function searchIncident(){
	const startDayDiv = document.getElementById('startDay');
	const endDayDiv = document.getElementById('endDay');
	const maxNumberOfIncidentsDiv = document.getElementById('maxNumberOfIncidents');

	const startDay = startDayDiv.value;
	const endDay = endDayDiv.value;
	const maxNumberOfIncidents = maxNumberOfIncidentsDiv.value;

	// Validations
	if(!startDay){
		return startDayDiv.focus();
	}

	if(!endDay){
		return endDayDiv.focus();
	}

	const result = await getIncidents(startDay, endDay, maxNumberOfIncidents);
	console.log(result);
}

function getIncidents(startDay, endDay, maxNumberOfIncidents){
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.onload = function(){
			resolve(xhr);
		}

		var getUrl = '/searchIncidents?';
		if(startDay){
			getUrl += `startDay=${startDay}`;
			if(endDay){
				getUrl += `&endDay=${endDay}`;
			}
			if(maxNumberOfIncidents){
				getUrl += `&maxNumberOfIncidents=${maxNumberOfIncidents}`;
			}
		}

		xhr.open('GET', getUrl);
		xhr.send();
	});
}