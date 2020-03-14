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