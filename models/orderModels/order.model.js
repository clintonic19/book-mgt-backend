const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Order Schema

const orderSchema  = new Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    address:{
        city: {type: String, required: true},
        country: {type: String, required: true},
        state: {type: String, required: true},
        zipcode: {type: String, required: true},
    },

    phone:{
        type: Number,
        required: true
    },

    productIds: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Book',
                        required: true
                    }
                ],
                
    totalPrice: {
        type: Number,
        required: true
    }

}, {timestamps: true} )

module.exports = mongoose.model('Order', orderSchema);