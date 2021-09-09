var express = require('express');
var app = new express();
var ejs = require('ejs');
var mongoose = require('mongoose');
var expressSession = require('express-session');
const flash = require('connect-flash'); //new req will delete the err
// var bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));

const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newPostController = require('./controllers/newPost');//do cùng cấp nên ./ ? go down 1 level? ../ means go up 1 level
const searchController = require('./controllers/search');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');

global.loggedIn = null; //global variable will be accessible from all ejs file

// With the flash middleware, all requests will have a req.flash() function that
// can be used for flash messages. In flash(), we specify that validation errors
// will be stored in the 'validationErrors' key

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

var fileUpload = require('express-fileupload');
app.use(fileUpload());

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(expressSession({
    secret: 'keyboard cat'
    //secret string is used by the express-session package to sign and encrypt the session ID
    //cookie being shared with the browser.
}));

app.use(flash());

app.use("*", (req, res, next)=>{ // '*' this is a wildcard, means on all requests this middleware should be executed
    // req.session.userId = user._id;
    loggedIn = req.session.userId;
    next();
});

//validate if the form isn't filled
const validateMiddleWare = require('./middleware/validationMiddleware');
app.use('/posts/store',validateMiddleWare);

app.get('/', homeController);
// app.get('/',async (req,res)=>{
//     // console.log(req.params);
//     // console.log(req);
//     //res.sendFile(path.resolve(__dirname, 'pages/index.html'));
//     var blogposts = await BlogPost.find({});
//     // console.log(blogposts);
//     res.render('index',{
//         blogposts //whenever the key name and
//         //value name are the same (e.g. blogposts: blogposts), we can shorten it
//     });
// });

// app.get('/about', (req, res)=>{
//     //res.sendFile(path.resolve(__dirname, 'pages/about.html'));
//     res.render('about');
// });
app.get('/post/:id', getPostController);
// app.get('/post/:id',async (req, res)=>{ //:id is the param here, we append a parameter to the route for a single post
//     //res.sendFile(path.resolve(__dirname, 'pages/post.html'));
//     console.log(req.params);// parameters after /post/ can be retrieved with req.params
//     var blogpost = await BlogPost.findById(req.params.id);
//     res.render('post',{
//         blogpost
//     });
// });
// app.get('/contact', (req, res)=>{
//     //res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
//     res.render('contact');
// });

app.get('/posts/new', authMiddleware, newPostController);
// app.get('/new', (req, res)=>{
//     res.render('create');
// })

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);

app.post('/posts/store', authMiddleware, storePostController);
// app.post('/posts/store',async (req, res)=>{
//     // let image = req.files.image;
//     // console.log(image.name);
//     // image.mv(path.resolve(__dirname, '/public/assets/img', image.name), async (error)=>{
//     //     await BlogPost.create(req.body);
//     //     res.redirect('/')
//     // });
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname,'public/assets/img',image.name),async (error)=>{
//         await BlogPost.create({
//             ...req.body,
//             image: '/assets/img/' + image.name
//         });
//         res.redirect('/');
//     })
//     //Spread syntax (...): Spread syntax can be used when all elements from an object or array need to be included in a list of some kind.
//     //image.mv moves the uploaded file to public/img directory with the name from image.name
//     //mv - a function to move the file elsewhere on your server
//     //express-fileupload adds the files property to the req object
//     //console.log(req.body);  to do req.body we need to install body-parser
// });
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);

app.post('/search', searchController);
app.post('/stores/user', redirectIfAuthenticatedMiddleware, storeUserController);
// Here, we handle a POST request which is generally used to request an
// addition to the state of the server unlike GET where we simply get resources.
// A user POSTs a blog entry, a photo, signing up for an account, buying an
// item etc. POST is used to create records on servers. For modifying existing
// records, we use the PUT request.
app.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserController)

app.use((req, res) => res.render('notfound')); //after registration of all routes at the end of the file
//With this middleware like route, Express will go through all the routes and if
//it can't find one that matches, it will render the not found page.

app.listen(4000, ()=>{
    console.log('app listen on port 4000 hehe');
});
