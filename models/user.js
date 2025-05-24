const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Keep only those fields that is necessary for the User's in your project.
//In this below model almost everything that is necessary for the User is defined.
const UserSchema = new mongoose.Schema({
    userName:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
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
    profile_pic:
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
    token : {
        type: String,
        default: null
    }


}, { timestamps: true });

UserSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

//User model is getting excuted for the collection.
const User = new mongoose.model("user", UserSchema);
//User module is getting exported from here.
module.exports = User;




