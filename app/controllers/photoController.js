// File System library
import { readFile, copyFileSync } from 'fs';
import { post } from 'axios';

export function getPhoto(app, req, res) {
	const photoUrl = `./app/public/photos/${req.params.photoName}`;

	readFile(photoUrl, (err, photo) => {
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

export function uploadPhoto(app, req, res) {
	var originalPhotoData = req.files.photo;
	const originalPhotoTempPath = originalPhotoData.path;

	// Check for guns
	post(app.config.aiServerUrl + '/check', {
		photoPath: originalPhotoTempPath
	})
	.then(async (result) => {
		const hasGunChance = result.data.result.chance;

		if(hasGunChance > 50){
			// Change the photo name to not overwrite another file
			const date = new Date();
			const timeStamp = date.getTime();

			const originalPhotoNewName = `${timeStamp}_${originalPhotoData.originalFilename}`;
			const originalPhotoNewPath = `./app/public/photos/${originalPhotoNewName}`;

			const photoWithBoundingBoxPath = `${result.data.result.photoWithBoundingBoxPath}`;
			const photoWithBoundingBoxNewName = `${timeStamp}_bb_${originalPhotoData.originalFilename}`;
			const photoWithBoundingBoxNewPath = `./app/public/photos/${photoWithBoundingBoxNewName}`;

			// Move the original photo file and the photo with bounding boxed to ./app/public/photos directory
			copyFileSync(originalPhotoTempPath, originalPhotoNewPath);
			copyFileSync(photoWithBoundingBoxPath, photoWithBoundingBoxNewPath);

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