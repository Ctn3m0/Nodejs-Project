const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.plugin(uniqueValidator);// give error this error

// MongoDB's E11000 error is a common source of confusion. This error occurs when two documents have the same value for a field that's defined as unique in your Mongoose schema

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;

// with UserSchema.pre( ‘ save ’… , we tell Mongoose that before we
// save any record into the Users schema or Users collection, execute the
// function passed into the 2nd argument. This lets us change user data before
// saving it into the database

//mongoose makes the UserSchema available via this.
//The second argument specifies the number of roundsof hashing to take place.

// The third argument is the function that is called when the hash completes.
//why (next) => {} doesn't work?