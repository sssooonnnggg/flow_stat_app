$(function() {
	$('.list-group-item').click(function() {
		$('.list-group-item, .active').removeClass('active');
		$(this).addClass('active');
	});
});