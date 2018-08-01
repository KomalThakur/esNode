const esService = require('./service');

async function getUniqueSessions(req, res, next) {
	try {
		console.log(req.header);
		const sessions = await esService.getUniqueSessions(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.sendStatus(200);
		res.send(sessions);

	} catch (error) {
		next(error);
	}
}
module.exports = {
	getUniqueSessions
}