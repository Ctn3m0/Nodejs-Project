var mongoose = require('mongoose');
var BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

// BlogPost.create({
//     title: "The MythBuster's guide to save money on energy bill",
//     body: "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving moner ob energy bills."
// },(error, blogpost)=>{
//     console.log(error, blogpost);
// });

// BlogPost.find({
//     title: "The MythBuster's guide to save money on energy bill"
// },(error, blogpost)=>{
//     console.log(error, blogpost);
// });

var id1 = '61343090846c9c9dfc3c5a29';
var id2 = '613431a5df4bcfa7f40aea23';
// BlogPost.findByIdAndUpdate(id2,{
//     title: "The MythBuster's guide to save money on energy bill"
// }, (error, blogpost)=>{
//     console.log(error, blogpost);
// })

// BlogPost.findByIdAndDelete(id2, (error, blogpost)=>{
//     console.log(error, blogpost);
// });
var search = 'Will';
BlogPost.find({
    title: {$regex : search}
},(error, blogpost)=>{
    console.log(error, blogpost);
});
var hello = '/' + search + '/';
console.log(search); 