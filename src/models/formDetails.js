const mongoose = require("mongoose");
const validator = require ("validator");
userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    minLength:3
},
email:{
    type:String,
    required:true,
    validator(value){
        if(!validator.isEmail(value)){
            throw new Error("invalid email id")
        }
    }
    },
    mobile:{
        type:Number,
        required:true,
        min:10
    },

})
// we need collections
const formData = mongoose.model("formData",userSchema)

module.exports = formData; 

