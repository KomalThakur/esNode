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
		res.status(200).send(JSON.stringify(sessions));

	} catch (error) {
		next(error);
	}
}

async function getTimeBasedBotSuccessRate(req, res, next) {
	try {
		
		const success_rate = await esService.getTimeBasedBotSuccessRate(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", success_rate);
		res.status(200).send(JSON.stringify(success_rate));

	} catch (error) {
		next(error);
	}
}

async function getBotSuccessRate(req, res, next) {
	try {
		
		const success_rate = await esService.getBotSuccessRate(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", success_rate);
		res.status(200).send(success_rate.toString());

	} catch (error) {
		next(error);
	}
}

async function getTimeBasedAverageInboundMessages(req, res, next) {
	try {
		
		const avg_inbound_msg = await esService.getTimeBasedAverageInboundMessages(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", avg_inbound_msg);
		res.status(200).send(JSON.stringify(avg_inbound_msg));

	} catch (error) {
		next(error);
	}
}

async function getAverageInboundMessages(req, res, next) {
	try {
		
		const avg_inbound_msg = await esService.getAverageInboundMessages(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", avg_inbound_msg);
		res.status(200).send(avg_inbound_msg.toString());

	} catch (error) {
		next(error);
	}
}

async function getMedianMessages(req, res, next) {
	try {
		
		const median_messages = await esService.getMedianMessages(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", median_messages);
		res.status(200).send(JSON.stringify(median_messages));

	} catch (error) {
		next(error);
	}
}

async function getTimeBasedMedianMessages(req, res, next) {
	try {
		
		const median_messages = await esService.getTimeBasedMedianMessages(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", median_messages);
		res.status(200).send(JSON.stringify(median_messages));

	} catch (error) {
		next(error);
	}
}

async function getUserInteraction(req, res, next) {
	try {
		
		const user_interactions = await esService.getUserInteraction(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", user_interactions);
		res.status(200).send(JSON.stringify(user_interactions));

	} catch (error) {
		next(error);
	}
}

async function getTimeBasedUserInteraction(req, res, next) {
	try {
		
		const user_interactions = await esService.getTimeBasedUserInteraction(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", user_interactions);
		res.status(200).send(JSON.stringify(user_interactions));

	} catch (error) {
		next(error);
	}
}

async function getMissedIntents(req, res, next) {
	try {
		
		const missed_intents = await esService.getMissedIntents(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", missed_intents);
		res.status(200).send(missed_intents.toString());

	} catch (error) {
		next(error);
	}
}

async function getMissedIntents(req, res, next) {
	try {
		
		const missed_intents = await esService.getMissedIntents(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", missed_intents);
		res.status(200).send(missed_intents.toString());

	} catch (error) {
		next(error);
	}
}

async function getTimeBasedMissedIntents(req, res, next) {
	try {
		
		const missed_intents = await esService.getTimeBasedMissedIntents(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", missed_intents);
		res.status(200).send(JSON.stringify(missed_intents));

	} catch (error) {
		next(error);
	}
}

async function getMostUsedModules(req, res, next) {
	try {
		
		const most_used_modules = await esService.getMostUsedModules(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", most_used_modules);
		res.status(200).send(JSON.stringify(most_used_modules));

	} catch (error) {
		next(error);
	}
}

async function getTimeBasedMostUsedModules(req, res, next) {
	try {
		
		const most_used_modules = await esService.getTimeBasedMostUsedModules(req);
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		
		console.log("controller sessions : ", most_used_modules);
		res.status(200).send(JSON.stringify(most_used_modules));

	} catch (error) {
		next(error);
	}
}

module.exports = {
	getUniqueSessions,
	getTimeBasedUniqueSessions,
	getTimeBasedBotSuccessRate,
	getBotSuccessRate,
	getTimeBasedAverageInboundMessages,
	getAverageInboundMessages,
	getMedianMessages,
	getTimeBasedMedianMessages,
	getUserInteraction,
	getTimeBasedUserInteraction,
	getMissedIntents,
	getTimeBasedMissedIntents,
	getMostUsedModules,
	getTimeBasedMostUsedModules
}