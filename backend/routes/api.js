
const { Router } = require('express');

const router = Router();

/**
 * Middlewares imports
 */

/**
 * Controllers imports
 */
const { CreatePlayer, ReadPlayer } = require('./controllers');
const { CreateTournament, ReadTournament, ResultTournament } = require('./controllers');

/**
 * Routes
 */

router.post('/tournament', CreateTournament);
router.get('/tournament', ReadTournament);
router.get('/tournament/result', ResultTournament);

router.post('/player', CreatePlayer);
router.get('/player', ReadPlayer);


module.exports = router;
