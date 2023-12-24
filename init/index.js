const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect(
        "mongodb+srv://amitkhichar100:ekEi8hLG7uZIxH60@cluster0.2uxwkik.mongodb.net/wanderLust?retryWrites=true&w=majority"
    );
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
        owner: "658436f053da6d5c16eed6e9",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data inserted");
};
initDB();
