const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    title: {
        type: String,
        required: true
    },

    txt_size: {
        type: String,
    },

    txt_font_family: {
        type: String,
    },

    txt_color: {
        type: String,
    },


});

module.exports = mongoose.model('category', CategorySchema)