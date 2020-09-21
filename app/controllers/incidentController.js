export async function getIncidents(app, req, res){
	const numberOfIncidents = req.params.numberOfIncidents;
	try{
		const incidentModel = new app.app.models.incidentModel(app);
		const lastsNIncidents = await incidentModel.getLastsNIncidents(numberOfIncidents);
		res.status(200).send(lastsNIncidents);		
	}
	catch(error){
		res.status(500).send(error);
	}
}

export function renderSearchPage(app, req, res){
	res.render('incidents/search')
}

export async function searchIncidents(app, req, res){
	const startDayInTimestamp = convertToMysqlTimestamp(req.query.startDay);
	const endDayInTimestamp = convertToMysqlTimestamp(req.query.endDay);
	try{
		const incidentModel = new app.app.models.incidentModel(app);
		const result = await incidentModel.searchIncidents(startDayInTimestamp, endDayInTimestamp);
		res.status(200).send(result);
	}
	catch(error){
		res.status(500).send(error);
	}
}

export async function getIncidentInfo(app, req, res){
	const idIncident = req.query.idIncident;
	const incidentModel = new app.app.models.incidentModel(app); 

	try{
		const incidentInfo = await incidentModel.getIncidentInfo(idIncident);
		res.status(200).send(incidentInfo);
	}
	catch(error){
		console.log(error);
		res.status(500).send(error);
	}
}

// Converts date from dd/mm/yyyy to MySQL timestamp format to perform a query (yyyy/mm/dd)
function convertToMysqlTimestamp(date){
	var dateParts = date.split("/");
	return `${+dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
}

export function renderLastIncidents(app, req, res){
	res.render('incidents/lastIncidents')
}