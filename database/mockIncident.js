const app = require('../config/serverConfig');

const incidentModel = new app.app.models.incidentModel(app);
for(let i = 0; i < 5; i++){
	incidentModel.save({timestamp: '1998-12-29 00:00:00', photoPath: './var/naosei', percentage: `${1 / (i + 1)}`});
}
