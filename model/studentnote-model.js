var db = require('./db');


module.exports = {
	
	getAll: function(callback){
		var sql = "select * from studentnote";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	}
	
	
	
}