
const express = require('express');
const router = express.Router();
const esController = require('./controller');

router.get('/unique_sessions', esController.getUniqueSessions);
router.get('/time_based_unique_session', esController.getTimeBasedUniqueSessions);

router.get('/time_based_bot_success_rate', esController.getTimeBasedBotSuccessRate);
router.get('/bot_success_rate', esController.getBotSuccessRate);

router.get('/time_based_average_inbound_messages', esController.getTimeBasedAverageInboundMessages);
router.get('/average_inbound_messages', esController.getAverageInboundMessages);

router.get('/median_messages', esController.getMedianMessages);
router.get('/time_based_median_messages', esController.getTimeBasedMedianMessages);

router.get('/user_interaction', esController.getUserInteraction);
router.get('/time_based_user_interaction', esController.getTimeBasedUserInteraction);

router.get('/missed_intents', esController.getMissedIntents);
router.get('/time_based_missed_intents', esController.getTimeBasedMissedIntents);

router.get('/most_used_modules', esController.getMostUsedModules);
router.get('/time_based_most_used_modules', esController.getTimeBasedMostUsedModules);

module.exports = router;