module.exports.getIncidents = async function(app, req, res){
	try{
		const numberOfIncidents = req.params.numberOfIncidents;
		const incidentModel = new app.app.models.incidentModel(app);
		const lastsNIncidents = await incidentModel.getLastsNIncidents(numberOfIncidents);
		res.status(200).send(lastsNIncidents);		
	}
	catch(error){
		res.status(500).send(error);
	}
}

module.exports.renderSearchPage = function(app, req, res){
	res.render('incidents/search')
}

module.exports.searchIncidents = function(app, req, res){
	console.log(req.query);
	res.status(200).send('Ok')
}

// Converts date from dd/mm/yyyy to timestamp format
function convertToTimestamp(date){
	var dateParts = date.split("/");
	return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
}