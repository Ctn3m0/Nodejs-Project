var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPostSchema = new Schema({
    title: String,
    body: String,
    // username: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,//which means that the value is supposed to be a valid Mongo object id
        ref: 'User',
        require: true
    },
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: String
});

var BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;//can only export one variable
//when other files require this file they know to grap BlogPost

// The BlogPost model was used to store the data in the database