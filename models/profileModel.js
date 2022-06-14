const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    name : {
        required : true,
        type : String
    },
    address : {
            line : {
                type : String
            },
            city : {
                type : String
            },
            state : {
                type : String
            },
            country : {
                type : String
            }
    },
    age : {
        type : Number
    },
    gender : {
        type : String
    },
    mobile : {
        type : Number,
        // validate: {
        //     validator: function(v) {
        //         return /d{10}/.test(v);
        //     },
        //     message: '{VALUE} is not a valid 10 digit number!'
        // }
    },
    favSport : [ String ],

})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile