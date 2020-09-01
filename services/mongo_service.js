const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const assert = require("assert");
const config = require("./providers/config.js");

// Connection URL
const url = "mongodb://localhost:27017/";
const dbName = config.config.collection;

async function createConnection() {
    let client = await MongoClient.connect(url);
    return await client.db(dbName);
};
exports.findDocument = async(documents) => {
    let db = await createConnection();
    const collection = await db.collection(documents);
    const list = await collection.find().toArray();
    return list;
};
exports.findDocumentByQuery = async(documents, query) => {
    let db = await createConnection();
    const collection = await db.collection(documents);
    const list = await collection.find(query).toArray();
    return list;
};
exports.addOneDocument = async(documents, dataOne) => {
    let db = await createConnection();
    const collection = await db.collection(documents);
    const added = await collection.insertOne(dataOne);
    return added;
};
exports.addManyDocument = async(documents, dataMany) => {
    let db = await createConnection();
    const collection = await db.collection(documents);
    const added = await collection.insertMany(dataMany);
    return added;
};
exports.createDocument = async(doc_name) => {
    let db = await createConnection();
    let results = db.createCollection(collection_name);
    return result;
};
exports.deleteDocument = async(doc_name, obj_id) => {
    let db = await createConnection();
    const collection = await db.collection(doc_name);
    let results = collection.remove({ _id: ObjectID(obj_id) });
    return results;
};

exports.updateDocument = async(doc_name, objectID, dataUpdate) => {
    let db = await createConnection();
    const collection = await db.collection(doc_name);
    let results = collection.updateOne({ _id: ObjectID(objectID) }, { $set: dataUpdate });
    return result;
}