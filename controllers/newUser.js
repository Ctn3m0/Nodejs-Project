module.exports = (req, res) =>{
    var username = "";
    var password = "";
    const data = req.flash('data')[0];

    if(typeof data != "undefined"){ //We then check if req.flash('data') is
        // undefined which will be the case whenever we first visit the new user form
        username = data.username
        password = data.password
        // console.log(req.flash('data'));
    }

    res.render('register',{
        errors: req.flash('validationErrors'),
        // errors: req.session.validationErrors
        username: username,
        password: password
    })
}