// File System library
const fs = require('fs');
const axios = require('axios');

module.exports.getPhoto = (app, req, res) => {
	const photoUrl = `./app/public/photos/${req.params.photoName}`;

	fs.readFile(photoUrl, (err, photo) => {
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}

		// Setting the status code and content-type
		res.writeHead(200, {
			'content-type' : 'image/jpg'
		});

		res.end(photo);
	});
}

module.exports.uploadPhoto = (app, req, res) => {
	var photoData = req.files.photo;

	// Change the photo name to not overwrite another file
	const date = new Date();
	const timeStamp = date.getTime();

	const tempPhotoPath = photoData.path;

	// Check for guns
	axios.post(app.config.aiServerUrl + '/check', {
		photoPath: tempPhotoPath
	})
	.then(async (result) => {
		const hasGunChance = result.data.chance;

		if(hasGunChance > 0.69){
			const photoNewPath = `./app/public/photos/${timeStamp}_${photoData.originalFilename}`;

			// Move the file to ./app/public/photos directory
			await fs.rename(tempPhotoPath, photoNewPath, (err) => {
				if(err){
					console.log(err);
					return res.status(500).send(err);
				}
			});

			// Insert incident in Database
			const incidentModel = new app.app.models.incidentModel(app);
			try{
				await incidentModel.save({timestamp: date, photoPath: photoNewPath, chance: hasGunChance});
				res.status(200).send('Success');
			}
			catch(error){
				console.log(error);
				return res.status(500).send(error);
			}
		}
		else{
			res.status(200).send('Success');
		}
	})
	.catch((error) => {
		console.error(error)
	})
}