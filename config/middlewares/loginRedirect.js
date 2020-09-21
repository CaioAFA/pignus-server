module.exports = (app) => {
	app.use((req, res, next) => {
		if(req.method != 'GET')
			return next();
		
		if(req.originalUrl == '/login'){
			return next();
		}

		if(!req.session.isAuthenticated){
			return res.redirect('/login');
		}
		next();
	});
}