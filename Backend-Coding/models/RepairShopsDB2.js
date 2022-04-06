const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for BikeRacks (like create table in SQL)
const shopSchema = new Schema({
    shop_id : {
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
    contact: {
        type: String,
        require: false
    },
    name : {
        type: String,
        require: true
    }
}, {timestamps: true});


const repairshopsDB2 = mongoose.model('repairshops', shopSchema);
module.exports = repairshopsDB2;