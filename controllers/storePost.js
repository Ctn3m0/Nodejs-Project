const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,'..','public/assets/img',image.name),async (error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/assets/img/' + image.name,
            userid: req.session.userId// xem lai phan login and out
        });
        res.redirect('/');
    })
}
//We also need to add ‘ .. ’ to path.resolve because we have to go up one folder