const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ButtonSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    btn_id: {
        type: String
    },

    btn_clr: {
        type: String
    },

    btn_link: {
        type: String
    },

    btn_text_size: {
        type: String
    },

    btn_font_family: {
        type: String
    },

    btn_text_clr: {
        type: String
    },


});

module.exports = mongoose.model('button', ButtonSchema)