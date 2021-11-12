import { model, Schema } from "mongoose";
import { docType } from "../types/docs.type";
import * as mongoose from "mongoose";

//Define Model
const docSchema = new Schema < docType > (
    {
        model: { type: mongoose.Schema.Types.ObjectId, ref: "Model" },
        modelName: { type: String, required: true },
        data: { type: String, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

export const docsModel = model("Docs", docSchema);