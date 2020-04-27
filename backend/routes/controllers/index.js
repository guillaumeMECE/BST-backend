/* eslint-disable global-require */

module.exports = {

    SignInWithGoogle: require('./auth/SignInWithGoogle'),

    CreatePlayer: require('./player/Create'),
    ReadPlayer: require('./player/Read'),

    CreateTournament: require('./tournament/Create'),
    ReadTournament: require('./tournament/Read'),

    // Recipe handlers
    CreateRecipe: require('./recipe/Create'),
    ReadRecipe: require('./recipe/Read'),
    ReadOneRecipe: require('./recipe/ReadOne'),

    ScrappingFromUrl: require('./scrapper/ScrappingFromUrl')
};
