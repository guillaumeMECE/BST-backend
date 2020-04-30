const axios = require('axios');

const { PlayerModel } = require('@models');

const { sanitizeDate } = require('./secureInput');

const generateTag = () => {
    return Math.random().toString(36).substring(3);
};

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        // eslint-disable-next-line no-await-in-loop
        await callback(array[index], index, array);
    }
};

const getModeTrunkBattlelog = (items, mode) => {
    const modeTrunkBattlelog = [];

    items.forEach((item) => {
        if (item.battle.mode === mode) {
            modeTrunkBattlelog.push(item);
        }
    });

    return modeTrunkBattlelog;
};

const getTimestampTrunkBattlelog = (items, t_start, t_end) => {
    const timestampTrunkBattlelog = [];

    items.forEach((item) => {
        const sanitizeBattleTime = sanitizeDate(item.battleTime);
        const battleTime = new Date(sanitizeBattleTime.year, sanitizeBattleTime.month, sanitizeBattleTime.day, sanitizeBattleTime.hour, sanitizeBattleTime.min, sanitizeBattleTime.sec);

        if (new Date(t_start) < battleTime && battleTime < new Date(t_end)) {
            timestampTrunkBattlelog.push(item);
        }
    });

    return timestampTrunkBattlelog;
};

const getScoreBattlelog = (items) => {
    let scoreBattlelog = 0;

    items.forEach((item) => {
        if (item.battle.rank === 1) {
            scoreBattlelog += 15;
        } else {
            scoreBattlelog += 11 - item.battle.rank;
        }
    });

    return scoreBattlelog;
};

const comparePlayer = (a, b) => {
    if (a.score < b.score) { return 1; }
    if (a.score > b.score) { return -1; }
    return 0;
};

const getTournamentResult = async (tournament) => {
    const result = [];

    await asyncForEach(tournament.players, async (player) => {

        /**
         * GET battlelog of the player
         */
        // console.log( `Bearer ${process.env.TOKEN_API_BRAWLSTAR}`);
        
        const battlelog = await axios.get(`https://api.brawlstars.com/v1/players/%23${player}/battlelog`, {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjIxYzJjMjE3LWFmYWQtNDBhOC04Yjc2LTc0MjA3MDRmNDI4ZCIsImlhdCI6MTU4ODI0NDEyNCwic3ViIjoiZGV2ZWxvcGVyLzliYzhkNjYxLWZmMDgtZjJjMS01NTJmLTI2NzM5YTBlZjU0ZSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNTQuNzIuMTIuMSIsIjU0LjcyLjc3LjI0OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.GaAVbDa0_uVUhhV5CIQgT99LzMIvJs6eynTYbPVbp96PXT4jhtxWCCi_lHw4PqeQTmk7x8tSj8Fo6HGJGPEgog'
            },
            proxy: {
                host: 'eu-west-static-03.quotaguard.com',
                port: 9293,
                auth: {
                    username: 'i6y3wiydfa7ieo',
                    password: 'bb2ebeh87jjgozue4r5kppdky89e8h'
                }
            },
        });


        /**
         * GET battlelog according to mode
         */
        const modeTrunkBattlelog = getModeTrunkBattlelog(battlelog.data.items, tournament.mode);


        /**
         * GET battlelog according to timestamp
         */
        const timestampTrunkBattlelog = getTimestampTrunkBattlelog(modeTrunkBattlelog, tournament.timestamp_start, tournament.timestamp_end);


        const playerResult = {};
        /**
         * PUT tag in result
         */
        playerResult.tag = player;

        /**
         * PUT player name
         */
        const dbPlayer = await PlayerModel.find({ tag: playerResult.tag }).exec();
        playerResult.name = dbPlayer[0].name;

        /**
         * PUT score player
         */
        playerResult.score = getScoreBattlelog(timestampTrunkBattlelog);

        result.push(playerResult);
    });

    /**
     * SORT Result
     */
    result.sort(comparePlayer);


    // console.log(result);
    // YYYYMMDDTHHMMSS

    return result;
    // return res.data;
};

module.exports = {
    generateTag,
    getTournamentResult,
};
