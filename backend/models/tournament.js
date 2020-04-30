
const { Schema, model } = require('mongoose');

const name = 'Tournament';

const attributes = {
    tag:
    {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    timestamp_start: {
        type: String
    },
    timestamp_end: {
        type: String
    },
    players: {
        type: [String]
    },
    last_update: {
        type: String
    },
    results: {
        type: [Object]
    }
};

const options = {};

const TournamentSchema = new Schema(attributes, options);

const TournamentModel = model(name, TournamentSchema);

module.exports = TournamentModel;
