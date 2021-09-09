var BlogPost = require('../models/BlogPost');

module.exports = async (req, res) =>{
    const blogposts = await BlogPost.find({}).populate('userid');// ??populate
    //automatically references the specified document with the userid in the collection.
    // Populated paths are no longer set to their original _id , their value is replaced with the mongoose document returned from the database by performing a separate query before returning the results.
    // Arrays of refs work the same way. Just call the populate method on the query and an array of documents will be returned in place of the original _ids.
    // tức là bây giờ có thể tra document hay dùng tên document bằng userid
    // console.log(req.session);
    res.render('index',{
        blogposts
    })
};