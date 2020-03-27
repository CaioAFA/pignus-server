function incidentModel(app){
	this.dbConnection = app.config.dbConfig;

	// Ex de utilização:
	/*
		const incidentModel = new app.app.models.incidentModel(app);
		incidentModel.save({timestamp: '1998-12-29 00:00:00', photoPath: './var/naosei', chance: '0.7'});
	*/
	this.save = (incidentData) => {
		const valuesToInsert = [
			[
				incidentData.timestamp,
				incidentData.originalPhotoPath,
				incidentData.photoWithBoundingBoxPath,
				incidentData.chance
			]
		]
		const saveQuery = "" +
			'INSERT ' +
			'INTO incident (timestamp, original_photo_path, photo_path, chance) ' +
			'VALUES (?)';
		this.dbConnection.query(saveQuery, valuesToInsert, (error) => {
			if(error){
				throw error;
			}
		})
	}

	this.getLastsNIncidents = (numberOfIncidents) => {
		const getLastsNIncidentsQuery = "" +
			"SELECT * " +
			"FROM incident " +
			"ORDER BY idincident DESC " +
			`LIMIT ${numberOfIncidents}`;

		return new Promise((resolve, reject) => {
			this.dbConnection.query(getLastsNIncidentsQuery, (error, lastsNIncidentes) => {
				if(error){
					return reject(error);
				}
				resolve(lastsNIncidentes);
			});
		});
	}

	this.searchIncidents = (startDayInTimestamp, endDayInTimestamp) => {
		const sql = `
			SELECT *
			FROM incident
			WHERE timestamp BETWEEN '${startDayInTimestamp}' AND '${endDayInTimestamp}'
			ORDER BY idincident DESC
		`;

		return new Promise((resolve, reject) => {
			this.dbConnection.query(sql, (error, result) => {
				if(error){
					reject(error);
				}
				resolve(result);
			});
		});
	}
}

module.exports = () => {
	return incidentModel;
}