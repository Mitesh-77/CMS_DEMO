const mongoose = require('mongoose')
const modelController = require("../controllers/modelController");
const collection = []
modelController.getAllModels().then(response => {
    for (let i = 0; i < response.length; i++) {
        collection.push({ title: response[i].name })
    }
})

module.exports = {
    mongoDbUrl: `mongodb+srv://user:User%40123@cluster0.m1fvc.mongodb.net/CMS?authSource=admin&replicaSet=atlas-116p88-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`,
    PORT: process.env.PORT || 4003,
    db: collection,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');

        next();
    }
};