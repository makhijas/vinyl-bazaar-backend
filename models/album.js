"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    AlbumId: {
        type: String, 
        required: true
    },
    image_url: {
        type: String, 
        required: false 
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;