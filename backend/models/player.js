
const { Schema, model } = require('mongoose');

const name = 'Player';

const attributes = {
    tag:
    {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    }
};

const options = {};

const PlayerSchema = new Schema(attributes, options);

const PlayerModel = model(name, PlayerSchema);

module.exports = PlayerModel;
