
const axios = require('axios');

const { TournamentModel } = require('@models');
const { utils, secureInput } = require('@core');
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

    if (req.body.date === undefined || req.body.date === null) {
        throw new Error('date undefined/null');
    }
    inputs.date = req.body.date;

    if (req.body.t_start === undefined || req.body.t_start === null) {
        throw new Error('t_start undefined/null');
    }
    inputs.t_start = req.body.t_start;

    if (req.body.t_end === undefined || req.body.t_end === null) {
        throw new Error('t_end undefined/null');
    }
    inputs.t_end = req.body.t_end;

    return inputs;
};

/**
 * PROCESS :
 */
const process = async (inputs) => {
    try {
        const tournament = inputs;
        tournament.timestamp_start = secureInput.generateDate(tournament.date, tournament.t_start);
        // tournament.timestamp_start = new Date(t_start);
        tournament.timestamp_end = secureInput.generateDate(tournament.date, tournament.t_end);
        // tournament.timestamp_end = new Date(t_end);

        const output = await TournamentModel.create(tournament);

        // const res = await axios.get(`https://api.brawlstars.com/v1/players/%23${inputs.tag}`, {
        //     headers: {
        //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjIxYzJjMjE3LWFmYWQtNDBhOC04Yjc2LTc0MjA3MDRmNDI4ZCIsImlhdCI6MTU4ODI0NDEyNCwic3ViIjoiZGV2ZWxvcGVyLzliYzhkNjYxLWZmMDgtZjJjMS01NTJmLTI2NzM5YTBlZjU0ZSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTQuNzIuMTIuMSIsIjU0LjcyLjc3LjI0OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.GaAVbDa0_uVUhhV5CIQgT99LzMIvJs6eynTYbPVbp96PXT4jhtxWCCi_lHw4PqeQTmk7x8tSj8Fo6HGJGPEgog'
        //     },
        //     proxy: {
        //         host: 'eu-west-static-03.quotaguard.com',
        //         port: 9293,
        //         auth: {
        //             username: 'i6y3wiydfa7ieo',
        //             password: 'bb2ebeh87jjgozue4r5kppdky89e8h'
        //         }
        //     },
        // });
        // eslint-disable-next-line no-param-reassign
        // inputs.name = res.data.name;
        // output = await PlayerModel.create(inputs);

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
