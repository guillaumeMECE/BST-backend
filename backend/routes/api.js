
const { Router } = require('express');

const router = Router();

/**
 * Middlewares imports
 */
const { scrapper } = require('@middlewares');

/**
 * Controllers imports
 */

// AUTH IMPORT
const { ScrappingFromUrl } = require('./controllers');
const { SignInWithGoogle } = require('./controllers');


const { CreateRecipe, ReadRecipe, ReadOneRecipe } = require('./controllers');

const { CreatePlayer, ReadPlayer } = require('./controllers');
const { CreateTournament, ReadTournament } = require('./controllers');

/**
 * Routes
 */

router.post('/tournament', CreateTournament);
router.get('/tournament', ReadTournament);

router.post('/player', CreatePlayer);
router.get('/player', ReadPlayer);

router.post('/recipe', scrapper, CreateRecipe);
router.post('/recipe/read', ReadRecipe);
router.post('/recipe/readone', ReadOneRecipe);

router.post('/signin/google', SignInWithGoogle);
router.post('/scrapper', ScrappingFromUrl);

module.exports = router;
