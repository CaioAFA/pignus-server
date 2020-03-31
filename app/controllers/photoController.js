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
	var originalPhotoData = req.files.photo;
	const originalPhotoTempPath = originalPhotoData.path;

	// Check for guns
	axios.post(app.config.aiServerUrl + '/check', {
		photoPath: originalPhotoTempPath
	})
	.then(async (result) => {
		const hasGunChance = result.data.result.chance;

		if(hasGunChance > 0.69){
			// Change the photo name to not overwrite another file
			const date = new Date();
			const timeStamp = date.getTime();

			const originalPhotoNewName = `${timeStamp}_${originalPhotoData.originalFilename}`;
			const originalPhotoNewPath = `./app/public/photos/${originalPhotoNewName}`;

			const photoWithBoundingBoxPath = `${result.data.result.photoWithBoundingBoxPath}`;
			const photoWithBoundingBoxNewName = `${timeStamp}_bb_${originalPhotoData.originalFilename}`;
			const photoWithBoundingBoxNewPath = `./app/public/photos/${photoWithBoundingBoxNewName}`;

			// Move the original photo file and the photo with bounding boxed to ./app/public/photos directory
			fs.copyFileSync(originalPhotoTempPath, originalPhotoNewPath);
			fs.copyFileSync(photoWithBoundingBoxPath, photoWithBoundingBoxNewPath);

			// Insert incident in Database
			const incidentModel = new app.app.models.incidentModel(app);
			try{
				await incidentModel.save({timestamp: date, originalPhotoPath: originalPhotoNewName, photoWithBoundingBoxPath: photoWithBoundingBoxNewName, chance: hasGunChance});
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