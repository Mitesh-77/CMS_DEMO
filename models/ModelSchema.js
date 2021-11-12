import { modelModel } from "../schema/model.schema";

export const createModel = async (name, schema) => {
    const doc = await modelModel.create({ name, modelSchema: schema });
    return await doc.save();
};

export const getAllModels = async () => {
    return await modelModel.find({});
};

export const getModelByName = async (name) => {
    return await modelModel.findOne({ name });
};
export const updateSchemaByName = async (name, properties, required) => {
    console.log(properties, required)
    const w = await modelModel.findOneAndUpdate(
        { name },
        { $set: { "modelSchema.properties": properties, "modelSchema.required": required } }
    );
    console.log(w)
};
