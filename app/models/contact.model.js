const mongoose = require('mongoose')

const contacSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type:String,
        required: [true, "Please add the contact name"]
    },
    email:{
        type:String,
        required: [true, "Please add the contact email address"]
    },
    phone:{
        type:String,
        required: [true, "Please add the contact phone number"]
    },
},{
    timestamps: true
})

contacSchema.method("toJSON", function(){
    const {__v, _id, ...object} = this.toObject()
    object.id = _id;

    return object
})

module.exports = mongoose.model("Contact", contacSchema)