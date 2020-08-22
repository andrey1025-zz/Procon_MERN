const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        maxlength: 100
    },
    lastName: {
        type: String,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    },
    dob: {
        type: Date
    },
    mobile: {
        type: String,
        maxlength: 11
    },
    address: {
        type: String,
        maxlength: 255
    },
    experience: {
        type: String,
        maxlength: 5000
    },
    photo: {
        type: String,
        maxlength: 255
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "checked"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { versionKey: false });
const userModel = mongoose.model("User", userSchema, "Users");
module.exports = userModel;
