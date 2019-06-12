var db = require('./db');


module.exports = {
	
	getAll: function(callback){
		var sql = "select * from teachernotice";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},
	
	
	insert: function(data, callback){
		var sql = "insert into teachernotice values(null, ?, ?, ?)"
		db.execute(sql, [data.tid, data.sub, data.notice], function(success){
			callback(success);
		});
	}
}