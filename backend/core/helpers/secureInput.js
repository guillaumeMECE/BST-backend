
const sanitizeString = (textRaw) => {
    let result = null;

    const textRawToString = textRaw.toString();
    const textRawTrim = textRawToString.trim();
    // const textRawToLowerCase = textRawTrim.toLowerCase();

    result = textRawTrim;

    return result;
};

const sanitizeName = (textRaw) => {
    let result = null;

    const textRawSanitizeString = sanitizeString(textRaw);
    const textRawFirstCharUpperCase = textRawSanitizeString.substr(0, 1).toUpperCase();
    const textRawWithoutFirstChar = textRawSanitizeString.substr(1);
    const textRawConcat = textRawFirstCharUpperCase.concat(textRawWithoutFirstChar);

    result = textRawConcat;

    return result;
};

const generateUsername = (firstname, lastname, company) => {
    const rdm = Math.random().toString(36).substring(7);
    return firstname.concat('-', lastname, '-', company, '-', rdm);
};

const generateDate = (yyyymmdd, hhmm) => {
    // YYYY-MM-DD 
    // HH:MM
    const sanitizeBattleTime = {};
    const yyyymmddThhmm = yyyymmdd.concat('T', hhmm, ':00');

    // sanitizeBattleTime.year = yyyymmdd.slice(0, 4);
    // sanitizeBattleTime.month = yyyymmdd.slice(5, 7);
    // sanitizeBattleTime.month = parseInt(sanitizeBattleTime.month, 10) - 1;
    // sanitizeBattleTime.day = yyyymmdd.slice(8, 10);
    // sanitizeBattleTime.hour = hhmm.slice(0, 2);
    // sanitizeBattleTime.hour = parseInt(sanitizeBattleTime.hour, 10) + 2;
    // sanitizeBattleTime.min = hhmm.slice(3, 5);
    // console.log(battleTime);
    console.log(yyyymmddThhmm);
    return yyyymmddThhmm;
};

const sanitizeDate = (battleTime) => {
    // YYYYMMDDTHHMMSS.000Z
    const sanitizeBattleTime = {};
    sanitizeBattleTime.year = battleTime.slice(0, 4);
    sanitizeBattleTime.month = battleTime.slice(4, 6);
    sanitizeBattleTime.month = parseInt(sanitizeBattleTime.month, 10) - 1;
    sanitizeBattleTime.day = battleTime.slice(6, 8);
    sanitizeBattleTime.hour = battleTime.slice(9, 11);
    sanitizeBattleTime.hour = parseInt(sanitizeBattleTime.hour, 10) + 2;
    sanitizeBattleTime.min = battleTime.slice(11, 13);
    sanitizeBattleTime.sec = battleTime.slice(13, 15);
    // console.log(battleTime);
    // console.log(sanitizeBattleTime);
    return sanitizeBattleTime;
};


module.exports = {
    sanitizeString,
    sanitizeName,
    generateUsername,
    sanitizeDate,
    generateDate
};
