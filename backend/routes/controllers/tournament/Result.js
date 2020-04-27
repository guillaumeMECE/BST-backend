
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
        throw new Error('tag undefined/null');
    }
    inputs.tag = req.body.tag;

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        const output = await TournamentModel.find({ tag: inputs.tag }).exec();
        
        const res = utils.getTournamentResult(output[0]);
        
        return res;
    } catch (error) {
        throw new Error('Error while getting name'.concat(' > ', error.message));
    }
};

const Result = async (req, res) => {
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

module.exports = Result;
