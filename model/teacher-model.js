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
	},
	getAllMatched: function(txt, callback){
		var sql = "SELECT * FROM teacher WHERE name LIKE '"+txt+"%'";
		console.log(sql);
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	updateStatus: function(user, callback){
		var sql = "update teacher set status=? where id=?";
		db.execute(sql, [user.status, user.id], function(status){
			if(status){
				var sql = "update alldata set status=? where id=?";
				db.execute(sql, [user.status, user.id], function(status){
				if(status){
					callback(true);
				}
				else
					callback(false);
			});
			}else{
				callback(false);
			}
		});
	},
}