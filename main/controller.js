const esService = require('./service');

async function getUniqueSessions(req, res, next) {
	try {
		
		const sessions = await esService.getUniqueSessions(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", sessions);
		res.status(200).send(sessions.toString());

	} catch (error) {
		next(error);
	}
}

async function getTimeBasedUniqueSessions(req, res, next) {
	try {
		
		const sessions = await esService.getTimeBasedUniqueSessions(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", sessions);
		res.status(200).send(sessions.toString());

	} catch (error) {
		next(error);
	}
}
module.exports = {
	getUniqueSessions,
	getTimeBasedUniqueSessions
}