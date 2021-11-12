const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HeaderSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    file: {
        type: String,
        default: ''
    },


});

module.exports = mongoose.model('header', HeaderSchema)