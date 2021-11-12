const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');
const Headers = require('../models/HeaderModel')

module.exports = {

    index: async (req, res) => {

        const posts = await Post.find();
        const headers = await Headers.find();
        const categories = await Category.find();

        res.render('default/index', { headers: headers, posts: posts, categories: categories });
    },

    loginGet: (req, res) => {
        res.render('default/login');
    },

    loginPost: (req, res) => {
        res.send("Congratulations, you've successfully submitted the data.");
    },

    registerGet: (req, res) => {
        res.render('default/register');
    },

    registerPost: (req, res) => {
        res.send("Successfully Registered.");
    }

};