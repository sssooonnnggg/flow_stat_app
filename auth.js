var sqlite3 = require('sqlite3').verbose();

// 连接数据库
var db = new sqlite3.Database('userdata.db'); 

var user = {};

exports.auth = function(username, password, fn){
	db.get('select * from userdata where username = ? and password = ? and status = 1', [username, password], function(err, row){
		console.log(row);
		if(row){
			user["username"] = row["username"];
			user["password"] = row["password"];
			user["role"] = row["role"];
			user["status"] = row["status"];
			fn(user);	
		} else {
			fn();
		}
	});
}

exports.listUsers = function(users, fn){
	db.all('select * from userdata', function(err, rows){
		for(index in rows){
			users.push({
				username:rows[index].username,
				password:rows[index].password,
				role:rows[index].role,
				status:rows[index].status
			});	
		}
		fn();
	})
}

exports.updateUserDatas = function(userDatas, fn){
	db.serialize(function() {
		db.run('delete from userdata');
		for (index in userDatas) {
			var sqlStr = 'insert into userdata (username, password, role, status) ';
			sqlStr += 'values(';
			sqlStr = sqlStr + "'" + userDatas[index].username + "',";
			sqlStr = sqlStr + "'" + userDatas[index].password + "',";
			sqlStr = sqlStr + "'" + userDatas[index].role + "',";
			sqlStr = sqlStr + userDatas[index].status + ")";
			console.log(sqlStr);
			db.run(sqlStr, function(error) {
				if (error) {
					fn(-1);
					return;
				}
			});
		}

		fn(1);
	});
}