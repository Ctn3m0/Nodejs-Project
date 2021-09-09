var BlogPost = require('../models/BlogPost');

module.exports = async (req, res)=>{
    var search = req.body.search;
    var blogposts = await BlogPost.find({
        title: {$regex : search} 
    });
    console.log(blogposts);
    res.render('index',{
        blogposts 
    });
}