const { Int32 } = require('mongodb');
const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for BikeRacks (like create table in SQL)
const rackSchema = new Schema({
    rack_id : {
        type: Number,
        require: false
    },
    lat : {
        type: Decimal128,
        require: true
    },
    long : {
        type: Decimal128,
        require: true
    },
    user_email: {
        type: String,
        require: true
    },
    verified : {
        type: Boolean,
        require: true
    }
}, {timestamps: true});


const bikeracksDB2 = mongoose.model('bikeracks', rackSchema);
module.exports = bikeracksDB2;