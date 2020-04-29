
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

    if (req.params.tag === undefined || req.params.tag === null) {
        inputs.tag = 'all';
    } else {
        inputs.tag = req.params.tag;
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
            const res = await TournamentModel.find({ tag: inputs.tag }).lean().exec();
            // eslint-disable-next-line prefer-destructuring
            output = res[0];

            /**
             * GET Tournament Results DONT REFRESH IF TOURNAMENT END 45min AGO
             */
            const maxTimeToRefresh = new Date(output.timestamp_end).setMinutes(new Date(output.timestamp_end).getMinutes() + 45);
            const actualTime = new Date(Date.now()).setHours(new Date(Date.now()).getHours() + 2);
            if (new Date(actualTime) < new Date(maxTimeToRefresh)) {
                output.results = await utils.getTournamentResult(output);
                await TournamentModel.updateOne({ tag: inputs.tag }, { results: output.results }).exec();
            }
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
