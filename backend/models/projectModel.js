const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        maxlength: 100
    },
    location: {
        type: String,
        maxlength: 100
    },
    model: {
        type: String,
        required: true,
        maxlength: 255
    },
    status: {
        type: String,
        maxlength: 100,
        default: 'inprogress'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, // Project Manger Id
    superintendent: {
        type: Array,
        default: []
    }, // Superintendent Id
    tasks: {
        type: Array
    }, 
    coverImage: {
        type: String,
        maxlength: 255
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
const projectModel = mongoose.model("Project", projectSchema, "Projects");
module.exports = projectModel;