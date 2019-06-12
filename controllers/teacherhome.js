var express = require('express');

var teachersModel = require.main.require('./model/teachersModel');
var teacherviewmodel = require.main.require('./model/teacherviewmodel');
var teachernoticeModel = require.main.require('./model/teachernotice-model');
var teachernoteModel = require.main.require('./model/teachernote-model');
var router = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.uid != null){
		teachersModel.get(req.session.uid, function(data){
			req.session.un = data.name;
		});
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	teachersModel.get(req.session.uid, function(data){
		res.render('teacherhome/index', data);
})});



router.get('/sendnotice', function(req, res){

	teachersModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			tList: results
		};
		res.render('teacherhome/sendnotice', data);
	});
});

router.post("/sendnotice", function(req, res){

	var notice = {
		tid: req.body.tid,
		sub: req.body.sub,
		notice: req.body.message.trim()
	};
	teachernoticeModel.insert(notice, function(status){

		if(status){
			res.redirect('/teacherhome');
		}else{
			res.redirect('/teacherhome/sendnotice');
		}
	});
});


router.get('/sendnote', function(req, res){

	teachersModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			tList: results
		};
		res.render('teacherhome/sendnote', data);
	});
});

router.post("/sendnote", function(req, res){

	var notice = {
		tid: req.body.tid,
		sub: req.body.sub,
		notice: req.body.message.trim()
	};
	teachernoticeModel.insert(notice, function(status){

		if(status){
			res.redirect('/teacherhome');
		}else{
			res.redirect('/teacherhome/sendnote');
		}
	});
});


router.get('/viewnotice', function(req, res){

	teacherviewmodel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			tList: results
		};
		res.render('teacherhome/viewnotice', data);
	});
});

router.post("/viewnotice", function(req, res){

	var notice = {
		tid: req.body.tid,
		sub: req.body.sub,
		notice: req.body.message.trim()
	};
	teacherviewmodel.insert(notice, function(status){

		if(status){
			res.redirect('/viewnotice');
		}else{
			res.redirect('/teacherhome/viewnotice');
		}
	});
});



module.exports = router;






