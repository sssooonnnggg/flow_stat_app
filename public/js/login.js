$(function(){

	// 检查是否为 chrome ，如果不是 chrome， 跳转
	if (!isChrome()) {
		window.location.href = "/wrongbrowser";
	}

	$(".btn-lg").click(function(event) {

		var username = $("#username").val();
		var password = $("#password").val();

		$.ajax({
			url: '/login',
			type: 'post',
			dataType: 'json',
			data: {username: username, password: password},
			success:function(json){
				if(json.status == -1){
					$(".login-failed").hide();
					$(".login-failed").fadeIn();
				}
				if(json.status == 1){
					window.location.href = "/index";
				}
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});

	$("input").keyup(function(){
	   $(".login-failed").hide();
	});

	$('input').keypress(function (e) {
		if (e.which == 13) {
			$(".btn-lg").click();
			return false;
		}
	});

})

