//DECLARATION
var express  		= require('express');
var login 			= require('./controllers/login');
var adminhome 		= require('./controllers/adminhome');
var studenthome 	= require('./controllers/studenthome');
var teacherhome 	= require('./controllers/teacherhome');
var logout 			= require('./controllers/logout');
var bodyParser 		= require('body-parser');
var exSession 		= require('express-session');
var app 			= express();


//CONFIGURATION
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'smsnodejs', saveUninitialized: true, resave: false}));
app.use('/login', login);
app.use('/adminhome', adminhome);
app.use('/teacherhome', teacherhome);
app.use('/studenthome', studenthome);
app.use('/logout', logout);
app.use('/resource', express.static('resource'));

//ROUTES
app.get('/', (req, res)=> res.send('index page'));


//SERVER STARTUP
app.listen(3000, function(){
	console.log('server started at 3000...');
});
