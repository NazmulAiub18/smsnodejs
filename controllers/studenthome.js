var express = require('express');
var studentModel = require.main.require('./model/student-model');
var subjectModel = require.main.require('./model/subject-model');
var resultModel = require.main.require('./model/result-model');
var studentnoticeModel = require.main.require('./model/studentnotice-model');
var studentnotemodel = require.main.require('./model/studentnote-model');
var router = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.uid != null){
		studentModel.get(req.session.uid, function(data){
			req.session.un = data.name;
			//console.log('Name: '+req.session.un);
		});
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	studentModel.get(req.session.uid, function(data){
		res.render('studenthome/index', data);
})});

router.get('/subject', function(req, res){

	subjectModel.getAlll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('studenthome/subject', data);
	});
});

router.post("/subject", function(req, res){

	var user = {
		id: req.body.id,
		status: req.body.status
	};
	subjectModel.updateStatus(user, function(status){

		if(status){
			res.redirect('/studenthome/subject');
		}else{
			res.redirect('/studenthome/subject');
		}
	});
});

router.get('/result', function(req, res){

	resultModel.getAll(req.session.uid,function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('studenthome/result', data);
	});
});

router.post("/result", function(req, res){

	var user = {
		id: req.body.id,
		status: req.body.status
	};
	resultModel.updateStatus(user, function(status){

		if(status){
			res.redirect('/studenthome/result');
		}else{
			res.redirect('/studenthome/result');
		}
	});
});

router.get('/notice', function(req, res){

	studentnoticeModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('studenthome/notice', data);
	});
});

router.post("/notice", function(req, res){

	var user = {
		id: req.body.id,
		status: req.body.status
	};
	studentnoticeModel.updateStatus(user, function(status){

		if(status){
			res.redirect('/studenthome/notice');
		}else{
			res.redirect('/studenthome/notice');
		}
	});
});

router.get('/note', function(req, res){

	studentnotemodel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('studenthome/note', data);
	});
});

router.post("/note", function(req, res){

	var user = {
		id: req.body.id,
		status: req.body.status
	};
	studentnotemodel.updateStatus(user, function(status){

		if(status){
			res.redirect('/studenthome/note');
		}else{
			res.redirect('/studenthome/note');
		}
	});
});

module.exports = router;






