var db = require('./db');


module.exports = {
	
	getAll: function(uid,callback){
		var sql = "select * from result where studentid=?";
		db.getResults(sql, [uid],function(results){
			callback(results);
		});
	},
	
	
	
}