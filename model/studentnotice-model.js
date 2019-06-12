var db = require('./db');


module.exports = {
	
	getAll: function(callback){
		var sql = "select * from studentnotice";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	}
	
	
	
}