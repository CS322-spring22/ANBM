const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        coverPicture: {
            type: String,
            default: "",
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            max: 50,
        },
        pronoun: {
            type: String,
            max: 50,
        },
        location: {
            type: String,
            max: 50,
        },
        age: {
            type: Number,
            max: 50,
        },
        genre: {
            type: String,
            max: 50
        },
        instrument: {
            type: String,
            max: 50
        },
        relationships: {
            type: Number,
            enum: [1, 2, 3]
        }
    },
    { timestamps: true }
);

module.exports = User= mongoose.model("User", UserSchema);
