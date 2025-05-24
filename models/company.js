
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');



const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
    },
    gender:
    {
        type: String

    },
    pan:
    {
        type: String

    },
    aadhar:
    {
        type: String

    },
    dob:
    {
        type: Date,

    },
    country_code:
    {
        type: String,

    },
    mobile:
    {
        type: Number,


    },
    whatsapp_no:
    {
        type: Number,

    },
    password:
    {
        type: String
    },
    email_verify:
    {
        type: Number,

    },
    profileImage:
    {
        type: String
    },
    referral_code:
    {
        type: String,

    },
    status:
    {
        type: Boolean,
        default: true
    },
    role:
    {
        type: String
    },
    reference_code:
    {
        type: String,

    },
    created_by:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    updated_by:
    {
        type: Number,
        default: 0
    },
    created_by_admin:
    {
        type: Number,
        default: 0
    },
    deactivated_by:
    {
        type: Number,
    },
    otp:
    {
        type: String

    },
    otp_verification:
    {
        type: Number,
        default: 0
    },
    is_social: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    token : {
        type: String,
        default: null
    }


}, { timestamps: true });


companySchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}); 

//model is getting excuted for the collection.
const Company = new mongoose.model("companies", companySchema);
// module is getting exported from here.
module.exports = Company;




