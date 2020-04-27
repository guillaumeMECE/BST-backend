
const { Router } = require('express');

const router = Router();

/**
 * Middlewares imports
 */

/**
 * Controllers imports
 */
const { CreatePlayer, ReadPlayer } = require('./controllers');
const { CreateTournament, ReadTournament } = require('./controllers');

/**
 * Routes
 */

router.post('/tournament', CreateTournament);
router.get('/tournament', ReadTournament);

router.post('/player', CreatePlayer);
router.get('/player', ReadPlayer);


module.exports = router;
