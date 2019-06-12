var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

//ROUTES
router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){
			
		var user = {
			id: req.body.id,
			password: req.body.pass
		};

		userModel.validate(user, function(result){
			if(result != ""){
				if (result.status == "a")
				{
					req.session.type = result.type;
					req.session.uid = result.id;
					if(result.type == "a")
						res.redirect('/adminhome');
					else if(result.type == "t")
						res.redirect('/teacherhome');
					else if(result.type == "s")
						res.redirect('/studenthome');
					else
						res.redirect('/login');
				}
				
			}else{
				res.redirect('/login');
			}		
		});
		//console.log(results);
});

module.exports = router;






