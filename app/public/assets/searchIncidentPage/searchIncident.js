function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchIncident(){
	const startDayDiv = document.getElementById('startDay');
	const endDayDiv = document.getElementById('endDay');

	const startDay = startDayDiv.value;
	const endDay = endDayDiv.value;

	// Validations
	if(!startDay){
		return startDayDiv.focus();
	}

	if(!endDay){
		return endDayDiv.focus();
	}

	hideDiv('table');
	showDiv('spinner');

	try{
		const result = await getIncidents(startDay, endDay);
		const incidents = JSON.parse(result.response);
		renderIncidents(incidents);
		updateNumberOfResults(incidents.length);
	}
	catch(error){
		console.log('Error: ');
		console.log(error);
	}

	showDiv('table');
	hideDiv('spinner');
}

function getIncidents(startDay, endDay, maxNumberOfIncidents){
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();

		xhr.onload = function(){
			if(xhr.status == 200){
				resolve(xhr);
			}
			else{
				reject(xhr);
			}
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

function renderIncidents(incidents){
	const tableBodyDiv = document.getElementById('tableBody');
	var tableNewContent = '';

	incidents.forEach((incident) => {
		tableNewContent += `
            <tr>
                <th scope="row">
                    <img class="thumbnail" src="/photo/${incident.photo_path}">
                </th>
                <td>${formatMysqlTimestamp(incident.timestamp)}</td>
                <td>${(incident.chance * 100).toFixed(2)}%</td>
                <td>
                    <span class="material-icons cursor-pointer" onclick="showIncidentInfo(${incident.idincident})">
                        info
                    </span>
                </td>
            </tr>
		`
	});

	tableBodyDiv.innerHTML = tableNewContent;
}

function formatMysqlTimestamp(timestamp){
	const splittedTimestamp = timestamp.split('T')[0].split('-');
	return `${splittedTimestamp[2]}/${splittedTimestamp[1]}/${splittedTimestamp[0]}`;
}

function hideDiv(idDiv){
	$(`#${idDiv}`).addClass('d-none');
}

function showDiv(idDiv){
	$(`#${idDiv}`).removeClass('d-none');
}

function updateNumberOfResults(numberOfResults){
	document.getElementById('result-text').innerHTML = `Resultados (${numberOfResults})`
}