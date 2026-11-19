const express = require('express') // import express framework

const app = express(); //Appn creation  
const cors = require('cors') // For - Middleware

const mongoose = require('mongoose')
const crypto = require('crypto').webcrypto;

globalThis.crypto = crypto
                                                        
require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

const blogSchema = new mongoose.Schema({

    title : {
        type : String,
        required : [true, "Title is required field"],
        trim : true,
        minlength : [5, "Title must be at least 5 character"]
    },

    content : {
        type : String,
        required : [true, "Content is required"] ,
        trim : true,
        maxlength : [600, "Content size is full"]
    },

    author : {
        type : String,
        required : [true, "Author is required"]
    },

    category : {
        type : String,
        required : [true, "Category is required"]
    }
}, 

    {
        timestamps : true
    },

);

const blog = mongoose.model("Blogs", blogSchema);

async function startServer() {
    try {
        if(!process.env.MONGODB_URI){
            throw new Error("MongoDb URI missing in env folder file")
        }

        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Mongodb connected")

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
        
    } catch (err) {
        console.log("Error", err.message)
        process.exit(1)
    }
}
startServer()











