// creating and connecting the server
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Routes");

const app = express();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongodb connected...")
    
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })

});

app.use("/api", routes)