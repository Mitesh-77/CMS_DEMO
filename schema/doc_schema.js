const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
//import { docType } from "../types/docs.type";

//Define Model
const docSchema = new Schema(
    {
        model: { type: mongoose.Schema.Types.ObjectId, ref: "Model" },
        modelName: { type: String, required: true },
        data: { type: Object, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports.docsModel = model("Docs", docSchema);
