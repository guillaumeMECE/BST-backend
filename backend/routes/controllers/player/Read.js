
// const axios = require('axios');

const { PlayerModel } = require('@models');

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
        throw new Error('Tag undefined/null');
    }
    inputs.tag = req.body.tag;

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        // const output = {};
        // console.log(process.env.TOKEN_API_BRAWLSTAR);

        const output = await PlayerModel.find({ tag: inputs.tag }).exec();

        // inputs.name = res.data.name;
        // const output = await PlayerModel.create(inputs);

        return output;
    } catch (error) {
        throw new Error('Error while getting name'.concat(' > ', error.message));
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
