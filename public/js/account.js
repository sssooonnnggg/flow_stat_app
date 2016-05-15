function updateBtnStatus(){
	var selections = $('#table').bootstrapTable('getSelections');
	var len = selections.length;
	if(len == 0){
		$('#btn-remove').attr({"disabled":"disabled"});
		$('#btn-modify').attr({"disabled":"disabled"});
	} else if(len == 1){
		$('#btn-remove').removeAttr('disabled');
		$('#btn-modify').removeAttr('disabled');
	} else {
		$('#btn-remove').removeAttr('disabled');
		$('#btn-modify').attr({"disabled":"disabled"});
	}
}

function usernameExist(username, arr){
	for (index in arr) {
		if (username == arr[index].username)
			return true;
	}

	return false;
}

function roleCellStyle(value, row, index) {

    if (row.role == '管理员') {
        return {
            css: {'color' : 'red'}
        };
    };

    return {};
}

function statusCellStyle(value, row, index) {

    if (row.status == '禁用') {
        return {
            css: {'color' : '#ccc'}
        };
    };

    return {};
}


$(function(){

	var roleMap = {
		'管理员' : 'admin',
		'普通用户' : 'user'
	};

	var statusMap ={
		'禁用' : 0,
		'启用' : 1
	};

	$('#btn-remove').attr({"disabled":"disabled"});
	$('#btn-modify').attr({"disabled":"disabled"});

	$('#table').on('check.bs.table', function (e, row) {
		updateBtnStatus();
	})
	.on('uncheck.bs.table', function (e, row) {
		updateBtnStatus();
	})
	.on('check-all.bs.table', function (e) {
        updateBtnStatus();
    })
    .on('uncheck-all.bs.table', function (e) {
        updateBtnStatus();
    });

    $('#btn-remove').click(function(event) {
    	var table = $('#table');
    	var ids = $.map(table.bootstrapTable('getSelections'), function (row) {
            return row.username;
        });
        table.bootstrapTable('remove', {
            field: 'username',
            values: ids
        });
    });

    $('#btn-add').click(function(event) {
    	$('#modal-failed').hide();
    	$('#addModal').modal('show');
    });

    $('#btn-add-ok').click(function(event) {
    	var addModal = $('#addModal');
    	$('#modal-failed').hide();
    	var username = $('#input-username').val();
    	var password = $('#input-password').val();
    	var role = $('#input-role').val();
    	var status = $('#input-status').val();
    	var tableData = $('#table').bootstrapTable('getData');
    	if(username=='' || password=='') {
    		$('#modal-failed').text('用户名和密码不能为空').fadeIn();
    	} else if (usernameExist(username, tableData)) {
    		$('#error-message');
    		$('#modal-failed').text('用户名已存在').fadeIn();
    	} else {
    		addModal.modal('hide');
    		$('#table').bootstrapTable('append', [{
    				username : username,
    				password : password,
    				role : role,
    				status : status
    			}]);
    	}
    });

    $('#btn-modify').click(function(event) {
    	$('#modifyModal').modal('show');
    	$('#modal-failed2').hide();
    	$('#input-username2').attr({'disabled':'disabled'});

    	var currentRow = $.map($('#table').bootstrapTable('getSelections'), function(row) {
    		return row;
    	});

    	$('#input-username2').val(currentRow[0].username);
    	$('#input-password2').val(currentRow[0].password);
    	$('#input-role2').val(currentRow[0].role);
    	$('#input-status2').val(currentRow[0].status);
    });

    $('#btn-modify-ok').click(function(event) {
    	var modifyModal = $('#modifyModal');
    	var username = $('#input-username2').val();
    	var password = $('#input-password2').val();
    	var role = $('#input-role2').val();
    	var status = $('#input-status2').val();
    	var tableData = $('#table').bootstrapTable('getData');
    	if(password=='') {
    		$('#modal-failed2').text('密码不能为空').fadeIn();
    	} else {
    		modifyModal.modal('hide');
    		var currentRow = $.map($('#table').bootstrapTable('getSelections'), function(row) {
	    		return row;
	    	});
	    	var index = $('.selected').attr('data-index');
	    	$('#table').bootstrapTable('updateRow', {
	    		index : index,
	    		row : {
		    		username : username,
		    		password : password,
		    		role : role,
		    		status : status
		    	}
	    	})
    	}
    });

    $('#btn-apply').click(function(event) {
    	var datas = $('#table').bootstrapTable('getData');

    	// 字符串转化为数据库里的值
    	for (index in datas) {
    		datas[index].role = roleMap[datas[index].role];
    		datas[index].status = statusMap[datas[index].status];
    	}
    	
    	// 交给服务器处理
    	$.ajax({
    		url: '/account',
    		type: 'post',
    		contentType: 'application/json; charset=utf-8',
    		dataType:'json',
    		data: JSON.stringify(datas),
    		success : function(json) {
    			if (json.status == -1) {
    				$('#apply-failed').fadeIn();
    			} else if (json.status == 1) {
    				$('#apply-success').fadeIn();
    			}
    		}
    	});
    	
    });

});
