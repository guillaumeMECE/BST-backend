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
        const battlelog = await axios.get(`https://api.brawlstars.com/v1/players/%23${player}/battlelog`, {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYxYThjM2NjLTIxNTAtNDBiZi1iMjJiLWNmY2FkODAxOTRiZiIsImlhdCI6MTU4NzkzNjcxNCwic3ViIjoiZGV2ZWxvcGVyLzliYzhkNjYxLWZmMDgtZjJjMS01NTJmLTI2NzM5YTBlZjU0ZSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTA5LjEzLjE0Ny42NSIsIjc4LjEyNi4xNzYuMjQ5Il0sInR5cGUiOiJjbGllbnQifV19.iQ0YAJVYMnzqtPxRvH-5yI09m7i2XxU6x12Wpt8ZUTWTxaLO-0zD7d5K_uT-2Zu0fszr_rtJOTKcGwuSxPmlFw'
            }
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
