const mongoose = require('mongoose');

// Enum for Climate Status
const climateEnum = ["hot","humid","rainy","cold"];

const climateSchema = new mongoose.Schema({
    climate:{
        type: String,
        enum: climateEnum,
        default: 'hot',
        validate: {
            validator: function(value) {
              return climateEnum.includes(value);
            }
        }
    },
    area_code : {
        type:Number,
        required:true,
        validate: {
            validator: function(value) {
              return value >= 100 && value <= 1000;
            },
            message: 'area-code must be between 100 and 1000'
        }
    },
    temperature :{
        type:Number,
        required:true
    },
    humidity :{
        type:Number,
        required:true
    },
    chances_of_rain :{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model("Climate",climateSchema);