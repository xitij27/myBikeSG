const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for Accounts (like create table in SQL)
const accSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: false
    },
    isDisabled: {
        type: Boolean,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: false
    }
}, {timestamps: true});

const accountDB2 = mongoose.model('account', accSchema);
module.exports = accountDB2;

