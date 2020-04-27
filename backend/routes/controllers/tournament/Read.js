
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

    if (req.body.tag === undefined || req.body.tag === null) {
        inputs.tag = 'all';
    } else {
        inputs.tag = req.body.tag;
    }

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        let output;
        if (inputs.tag === 'all') {
            output = await TournamentModel.find().exec();
        } else {
            output = await TournamentModel.find({ tag: inputs.tag }).exec();
        }

        return output;
    } catch (error) {
        throw new Error('Error while getting all tournament'.concat(' > ', error.message));
    }
};

const Read = async (req, res) => {
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

module.exports = Read;
