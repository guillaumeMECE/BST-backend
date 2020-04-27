
const axios = require('axios');

const { TournamentModel } = require('@models');
const { utils } = require('@core');
/**
 * Request structure
 */
// req = { body: { tag: 'xxx' } }
// res = { json: { } }

/**
 * SECURE : Params and Body
 */
const secure = async (req) => {

    const inputs = {};

    inputs.tag = utils.generateTag();

    if (req.body.name === undefined || req.body.name === null) {
        throw new Error('Name undefined/null');
    }
    inputs.name = req.body.name;

    if (req.body.author === undefined || req.body.author === null) {
        throw new Error('Author undefined/null');
    }
    inputs.author = req.body.author;

    if (req.body.mode === undefined || req.body.mode === null) {
        throw new Error('Mode undefined/null');
    }
    inputs.mode = req.body.mode;

    if (req.body.description === undefined || req.body.description === null) {
        throw new Error('Description undefined/null');
    }
    inputs.description = req.body.description;

    if (req.body.players === undefined || req.body.players === null) {
        throw new Error('Players undefined/null');
    }
    inputs.players = req.body.players;

    if (req.body.timestamp_start === undefined || req.body.timestamp_start === null) {
        throw new Error('timestamp_start undefined/null');
    }
    inputs.timestamp_start = req.body.timestamp_start;

    if (req.body.timestamp_end === undefined || req.body.timestamp_end === null) {
        throw new Error('timestamp_end undefined/null');
    }
    inputs.timestamp_end = req.body.timestamp_end;

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        const output = await TournamentModel.create(inputs);

        return output;
    } catch (error) {
        throw new Error('Error while getting name'.concat(' > ', error.message));
    }
};

const Create = async (req, res) => {
    try {
        const inputs = await secure(req);

        const output = await process(inputs);

        res.status(200).json({ output });
    } catch (error) {
        console.log('ERROR MESSAGE :', error.message);
        console.log('ERROR :', error);
        res.status(400).json({ 'message': error.message });
    }
};

module.exports = Create;
