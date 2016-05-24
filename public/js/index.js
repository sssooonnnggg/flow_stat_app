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

    $('#nav-input').typeahead(
        {
            source:
                [
                    {id: "/index", name: "首页"}, 
                    {id: "/video?id=1", name: "视频流媒体初始播放成功率"},
                    {id: "/video?id=2", name: "视频流媒体初始缓冲延时"},
                    {id: "/video?id=3", name: "视频流媒体播放停顿率"},
                    {id: "/video?id=4", name: "视频流媒体停顿频次"},
                    {id: "/video?id=5", name: "视频流媒体停顿占比"},
                    {id: "/video?id=6", name: "视频流媒体下载速度"},
                    {id: "/account", name: "用户管理"},
                ], 
            autoSelect: true
        }); 


    $("#nav-input").change(function() {
        var current = $("#nav-input").typeahead("getActive");
        if (current.id == "/index") {
            window.location.href = current.id;
        }
        else {
            $('#frameContent').attr('src', current.id);
            $("#nav-input").val('');
        }
    });
});