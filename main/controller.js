const esService = require('./service');

async function getUniqueSessions(req, res, next) {
	try {
		console.log(req.header);
		await esService.getUniqueSessions(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.status(200);
		res.send('success');

	} catch (error) {
		next(error);
	}
}
module.exports = {
	getUniqueSessions
}