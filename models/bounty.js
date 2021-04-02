"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const BountySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
});

const Bounty = mongoose.model("Bounty", BountySchema);

module.exports = Bounty;