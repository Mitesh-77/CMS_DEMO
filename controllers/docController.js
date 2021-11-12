const docsModel = require("../schema/doc_schema").docsModel;

module.exports.getDocByModelName = async (name) => {
    const data = await docsModel.find({ modelName: name });
    console.log(data);
    return data;
};

module.exports.addData = async (
    modelName,
    modelId,
    data
) => {
    await docsModel.create({
        modelName,
        model: modelId,
        data,
    });
    return;
};

module.exports.updateData = async (
    dataId,
    data
) => {
    await docsModel.findByIdAndUpdate(
        { _id: dataId },
        { $set: { "data": data } }
    );
    return;
};

module.exports.deleteData = async (id) => {
    await docsModel.findByIdAndDelete(id);
}
