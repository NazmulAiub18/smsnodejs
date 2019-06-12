var express = require('express');
var router = express.Router();


//ROUTES

router.get('/', function(req, res){
	req.session.uid = null;
	res.redirect('/login');
});

module.exports = router;






