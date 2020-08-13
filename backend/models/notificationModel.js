const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId
    },
    to: {
        type: Schema.Types.ObjectId
    },
    message: {
        type: String
    },
    taskId:{
        type:Schema.Types.ObjectId
    },
    projectId:{
        type:Schema.Types.ObjectId
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    },
    count: {
        type: Number,
        default: 1
    },
    type: {
        type: Number,
        default: 0
    }
}, { versionKey: false });
const notificationModel = mongoose.model("Notification", notificationSchema, "Notifications");
module.exports = notificationModel;
