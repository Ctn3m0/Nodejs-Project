const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req,res) => {
    const {username, password} = req.body;//to do req.body we need to install body-parser
    
    User.findOne({username: username}, (error, user) =>{
        if(user){// miễn là giá trị trong if tồn tại thì nó luôn đúng
            // console.log(user);
            bcrypt.compare(password, user.password, (error, same)=>{
                if(same){
                    // console.log(req.session);
                    req.session.userId = user._id; // tạo thêm entry session.userID
                    // The session package saves this data on
                    // the user ’ s browser so that each time the user makes a request, this cookie
                    // will be sent back to the server with the authenticated id. This is how we know
                    // if a user is logged in. 
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                };
            })
        } else{
            res.redirect('/auth/login');
        };
    })
}

// we use bcrypt.compare instead of a equality check e.g. ===. This is to
// keep us safe from a hacker trick called a timing attack.