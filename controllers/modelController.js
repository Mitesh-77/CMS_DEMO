const modelModel = require("../schema/model_schema").modelModel;

module.exports.createModel = async (name, schema) => {
    const doc = await modelModel.create({ name, modelSchema: schema });
    return await doc.save();
};

module.exports.getAllModels = async () => {
    return await modelModel.find({});
};

module.exports.getModelByName = async (name) => {
    return await modelModel.findOne({ name });
};
module.exports.updateSchemaByName = async (name, properties, required) => {
    console.log(properties, required)
    const w = await modelModel.findOneAndUpdate(
        { name },
        { $set: { "modelSchema.properties": properties, "modelSchema.required": required } }
    );
};
