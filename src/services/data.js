const { Data } = require('../models/Data');

//TODO replace with real data service according to exam description

async function getAll() {
    return Data.find().lean();
};

async function getById(id) {
    return Data.findById(id).lean();
};

async function create(data, authorId) {
//TODO extract properties from view model
    const record = new Data({
        prop: data.prop,
        author: authorId
    });

    await record.save();

    return record;
};

async function update(id, data, userId ) {
    const record = await Data.findById(id);

    if (!record) {
        throw new Error("Record not found " + id);
    };

    if (record.author.toString() != userId) {
        throw new Error("Access denied");
    };

    //TODO replace with real properties

    await record.save();

    return;
};

async function deleteById(id, userId) {
    const record = await Data.findById(id);
    if (!record) {
        throw new Error("Record not found " + id);
    };

    if (record.author.toString() != userId) {
        throw new Error("Access denied");
    };

    await Data.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}