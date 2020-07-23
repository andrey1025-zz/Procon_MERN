const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tempFilesSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    modifiedOn: {
        type: Date,
        default: Date.now
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { versionKey: false });
const tempFilesModel = mongoose.model("TempFiles", tempFilesSchema, "TempFiles");
module.exports = tempFilesModel;
