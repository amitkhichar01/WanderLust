const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
    .then((res) => {
        console.log("Database started");
    })
    .catch((err) => {
        console.log("server");
    });

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "655878574a7d2d4016d0f537",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data inserted");
};
initDB();
