var db = require('./db');


module.exports = {
	get: function(userId, callback){
		var sql = "select * from teacher where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from teacher";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	}
}