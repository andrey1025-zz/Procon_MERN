const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String
    },
    expires: {
        type: Date
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    createdByIp: String,
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
}, { versionKey: false });

schema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired;
});

module.exports = mongoose.model('RefreshToken', schema, "RefreshToken");