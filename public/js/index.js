$(function() {
    $('#video').click(function() {
        $('#frameContent').attr('src', '/video');
        $('.active').removeClass('active');
        if ($(this).hasClass('list-group-item')) {
            $(this).addClass('active');
        }
    });

    $('#main').click(function() {
        $('#frameContent').attr('src', '/main');
    });
});