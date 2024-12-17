const mongoose = require("mongoose");
const connectionUrl = "mongodb+srv://geethanjaligovindaraju:D3tksEdhP0VRhiFC@node-dev.us6o3.mongodb.net/devTinder"

const connectDb = async () => await mongoose.connect("mongodb+srv://geethanjaligovindaraju:D3tksEdhP0VRhiFC@node-dev.us6o3.mongodb.net/devTinder")

module.exports = connectDb;