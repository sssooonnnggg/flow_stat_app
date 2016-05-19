$(function() {
    $('.video').click(function() {
        var id = $(this).attr('index');
        $('#frameContent').attr('src', '/video?'+'id='+id);
        $('.active').removeClass('active');
        if ($(this).hasClass('list-group-item')) {
            $(this).addClass('active');
        }
    });

    $('#main').click(function() {
        $('.active').removeClass('active');
        $('#frameContent').attr('src', '/main');
    });

    $('#account').click(function() {
        $('.active').removeClass('active');
        $('#frameContent').attr('src', '/account');
    });
});