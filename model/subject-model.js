var db = require('./db');


module.exports = {
	get: function(subject, callback){
		var sql = "select * from subject where subjectname=? and class=?";
		db.getResults(sql, [subject.subjectname, subject.cls], function(result){

			if(result.length >0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll: function(cls, callback){
		var sql = "select * from subject where class=? and teachername=?";
		db.getResults(sql, [cls, ""], function(results){
			callback(results);
		});
	},

	getAlll: function(callback){
		var sql = "select * from subject";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	insert: function(subject, callback){
		var sql = "insert into subject values(null, ?, ?, ?)"
		db.execute(sql, [subject.subjectname, subject.cls, ""], function(success){
			callback(success);
		});
	},
	update: function(subject, callback){
		var sql = "update subject set teachername=? where id=?";
		db.execute(sql, [subject.teachername, subject.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(subject, callback){
		var sql = "delete from subject where subjectname=? and class=?";
		db.execute(sql, [subject.subjectname, subject.cls], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}