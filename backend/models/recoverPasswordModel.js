const mongoose = require('mongoose');

const schema = mongoose.Schema;

const recoverPasswordSchema = new schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    tokenVerified: {
        type: Boolean,
        default: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    lastTokenSendTime: {
        type: Date,
        default: Date.now
    },
    expires: {
        type: Date
    }
}, { versionKey: false });

recoverPasswordSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires;
});

const recoverPasswordModel = mongoose.model('RecoverPassword', recoverPasswordSchema, 'RecoverPassword');

module.exports = recoverPasswordModel;