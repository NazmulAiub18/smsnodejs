var express = require('express');
var studentModel = require.main.require('./model/student-model');
var teacherModel = require.main.require('./model/teacher-model');
var adminModel = require.main.require('./model/admin-model');
var subjectModel = require.main.require('./model/subject-model');
var teachernoticeModel = require.main.require('./model/teachernotice-model');
var router = express.Router();


//ROUTES
router.get('*', function(req, res, next){
	if(req.session.uid != null){
		adminModel.get(req.session.uid, function(data){
			req.session.un = data.name;
			//console.log('Name: '+req.session.un);
		});
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/', function(req, res){
	adminModel.get(req.session.uid, function(data){
		res.render('adminhome/index', data);
})});

router.get('/student', function(req, res){

	studentModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/student', data);
	});
});

router.post("/student", function(req, res){

	var user = {
		id: req.body.id,
		status: req.body.status
	};
	studentModel.updateStatus(user, function(status){

		if(status){
			res.redirect('/adminhome/student');
		}else{
			res.redirect('/adminhome/student');
		}
	});
});

router.get('/teacher', function(req, res){

	teacherModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			uList: results
		};
		res.render('adminhome/teacher', data);
	});
});

router.post("/teacher", function(req, res){

	var user = {
		id: req.body.id,
		status: req.body.status
	};
	teacherModel.updateStatus(user, function(status){

		if(status){
			res.redirect('/adminhome/teacher');
		}else{
			res.redirect('/adminhome/teacher');
		}
	});
});

router.get('/subject', function(req, res){
	
		var data = {
			name: req.session.un
		};
		res.render('adminhome/subject', data);
});

router.post("/subject", function(req, res){

	var subject = {
		subjectname: req.body.subjectname.trim().toUpperCase(),
		cls: req.body.cls
	};
	//console.log('Subject Name: '+subject.subjectname);
	subjectModel.insert(subject, function(status){

		if(status){
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome/subject');
		}
	});
});

router.get('/assignteacher', function(req, res){
	
		subjectModel.getAll(1, function(result){
			
			teacherModel.getAll(function(results){
	
			var data = {
				name: req.session.un,
				uList: result,
				tList: results
		};
		res.render('adminhome/assignteacher', data);
	});	
	});
});

router.post('/assignteacher', function(req, res){
	
		if(req.body.cls)
		{
			subjectModel.getAll(req.body.cls, function(result){
			
				teacherModel.getAll(function(results){
	
				var data = {
						name: req.session.un,
						uList: result,
						tList: results
				};
				res.render('adminhome/assignteacher', data);
			});	
			});
		}
		else
		{
			var data = {
				id: req.body.subjectid,
				teachername: req.body.teachername
			};
			subjectModel.update(data, function(status){

				if(status){
					res.redirect('/adminhome');
				}else{
					res.redirect('/adminhome/assignteacher');
				}
			});
		}
});

router.get('/sendnotice', function(req, res){

	teacherModel.getAll(function(results){
	
		var data = {
			name: req.session.un,
			tList: results
		};
		res.render('adminhome/sendnotice', data);
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
			res.redirect('/adminhome');
		}else{
			res.redirect('/adminhome/sendnotice');
		}
	});
});

router.get('/studentreport', function(req, res){
	
		studentModel.getMaxResultF(function(result){
			studentModel.get(result.studentid, function(results){
			var data = {
				name: req.session.un,
				mark: result.firstterm,
				uList: results
		};
		res.render('adminhome/studentreport', data);
	});	
	});
});

router.post('/studentreport', function(req, res){
	
		if(req.body.result)
		{
			if(req.body.result == "3")
			{
				studentModel.getMaxResultFi(function(result){
					studentModel.get(result.studentid, function(results){
					var data = {
						name: req.session.un,
						mark: result.finalterm,
						uList: results
				};
				res.render('adminhome/studentreport', data);
			});	
			});
			}
			else if(req.body.result == "2")
			{
				studentModel.getMaxResultS(function(result){
					studentModel.get(result.studentid, function(results){
					var data = {
						name: req.session.un,
						mark: result.secondterm,
						uList: results
				};
				res.render('adminhome/studentreport', data);
			});	
			});
			}
			else
			{
				studentModel.getMaxResultF(function(result){
					studentModel.get(result.studentid, function(results){
					var data = {
						name: req.session.un,
						mark: result.firstterm,
						uList: results
				};
				res.render('adminhome/studentreport', data);
			});	
			});
			}
		}
		else
		{
			studentModel.getMaxResultF(function(result){
					studentModel.get(result.studentid, function(results){
					var data = {
						name: req.session.un,
						mark: result.firstterm,
						uList: results
				};
				res.render('adminhome/studentreport', data);
			});	
			});
		}
});

router.get('/search', function(req, res){
	
		var data = {
			name: req.session.un
		};
		res.render('adminhome/search', data);
});

router.post('/search', function(req, res){

	var d = req.body;
	if(d.sel == "2")
	{
		studentModel.getAllMatched(d.txt, function(results){
			console.log(results);
			var data = {
				uList: results
			};
			res.render('adminhome/search1', data);
		});
	}
	else
	{
		teacherModel.getAllMatched(d.txt, function(results){
	
			var data = {
				uList: results
			};
			res.render('adminhome/search1', data);
		});
	}
});


module.exports = router;






