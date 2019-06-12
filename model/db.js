var mysql = require('mysql');

var config = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'myschool'
};

var con = "";

function getConnection(callback){
	con = mysql.createConnection(config);
	con.connect(function(err){
		if(err){
			console.log('connection error: '+err.stack);
		}else{
			console.log('connection id: '+con.threadId);
		}
	});	

	callback(con);
}


module.exports = {
	getResults: function(sql, params, callback){
		getConnection(function(connection){

			if(params == ""){
				connection.query(sql, function(err, results){

					if(err){
						callback([]);
					}else{
						callback(results);
					}
				});

			}else{
				connection.query(sql, params, function(err, results){
					if(err){
						callback([]);
					}else{
						callback(results);
					}
				});
			}

			connection.end(function(err){
				console.log('connection ending ...');
			});
		});
	},
	execute: function(sql, params, callback){

		if(params == ''){
			getConnection(function(connection){
			connection.query(sql, function(err, status){
				if(err){
					callback(status);
				}else{
					callback(status);
				}
			});

			connection.end(function(err){
					console.log('connection ending ...');
				});
			});
		}else{
			getConnection(function(connection){
			connection.query(sql, params, function(err, status){
				if(err){
					callback(status);
				}else{
					callback(status);
				}
			});

			connection.end(function(err){
					console.log('connection ending ...');
				});
			});
		}

	}
};
