const User = require('../models/User');

module.exports = (req, res, next)=>{
    User.findById(req.session.userId, (error, user)=>{
        if(error || !user) //check if we have taken the user from the database and check if user exist
            return res.redirect('/');
        
        next();
    })
}