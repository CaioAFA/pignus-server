// File System library
const fs = require('fs');

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
	console.log(req.files);

	var photoData = req.files.photo;

	// Change the photo name to not overwrite another file
	const date = new Date();
	const timeStamp = date.getTime();

	const tempPhotoPath = photoData.path;
	const photoNewPath = `./app/public/photos/${timeStamp}_${photoData.originalFilename}`;

	// Move the file to ./app/public/photos directory
	fs.rename(tempPhotoPath, photoNewPath, (err) => {
		if(err){
			console.log(err);
			return res.status(500).send(err);
		}

		console.log('Success.');
	});
}