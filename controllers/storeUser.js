const User = require('../models/User');
const path = require('path');

module.exports = (req, res) =>{
    User.create(req.body, (error, user) => {
        if(error){
            //console.log(Object.keys(error.errors));
            const validationErrors = Object.keys(error.errors).map(key => 
                error.errors[key].message
                // console.log(key) => username & password
            );
            req.flash('validationErrors', validationErrors); //to use flash remember req.flash
            req.flash('data',req.body);
            //console.log(req.body);
            // console.log(req.flash('data')); // [ { username: 'ctn3m03', password: 'dfdsgdsf' } ]
            // req.session.validationErrors = validationErrors;
            //Object.keys: return keys
            //error.errors because error has more than just errors
            //The JavaScript map function is used to invoke a function for every element of an array in order
            //error.errors[key] here is pass or/and username object error
            return res.redirect('/auth/register');//validate fail in schema
        };
        // console.log(error);
        res.redirect('/');
    });
}