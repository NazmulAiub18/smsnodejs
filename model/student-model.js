var db = require('./db');


module.exports = {
	get: function(userId, callback){
		var sql = "select * from student where id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from student";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	getAllMatched: function(txt, callback){
		var sql = "SELECT * FROM student WHERE name LIKE '"+txt+"%'";
		console.log(sql);
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	updateStatus: function(user, callback){
		var sql = "update student set status=? where id=?";
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
	getMaxResultF: function(callback){
		var sql = "select studentid, firstterm from result where firstterm = (select max(firstterm) from result)";
		db.getResults(sql, [], function(results){
			if(results.length >0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},
	
	getMaxResultS: function(callback){
		var sql = "select studentid, secondterm from result where secondterm = (select max(secondterm) from result)";
		db.getResults(sql, [], function(results){
			if(results.length >0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},
	
	getMaxResultFi: function(callback){
		var sql = "select studentid, finalterm from result where finalterm = (select max(finalterm) from result)";
		db.getResults(sql, [], function(results){
			if(results.length >0){
				callback(results[0]);
			}else{
				callback([]);
			}
		});
	},
	
}