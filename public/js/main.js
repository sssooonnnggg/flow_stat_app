$(function() {
    
    initDateTimePicker();

    var video = echarts.init(document.getElementById('video'));
    var web = echarts.init(document.getElementById('web'));
    var game = echarts.init(document.getElementById('game'));
    var user = echarts.init(document.getElementById('user'));

    video_option = {
        tooltip: {},
        radar: {
            // shape: 'circle',
            indicator: [
               { name: '视频流媒体初始播放成功率', max: 6500},
               { name: '视频流媒体初始缓冲延时', max: 16000},
               { name: '视频流媒体播放停顿率', max: 30000},
               { name: '视频流媒体停顿频次', max: 38000},
               { name: '视频流媒体停顿占比', max: 52000},
               { name: '视频流媒体下载速度', max: 25000}
            ]
        },
        series: [{
            type: 'radar',
            data : [
                {
                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                    name : '视频流媒体体验趋势总览'
                }
            ]
        }]
    };

    video.setOption(video_option);

    $('#video').click(function() {
        window.location.href = '/video';
    });

    web_option = {
        tooltip: {},
        radar: {
            // shape: 'circle',
            indicator: [
               { name: '页面响应成功率', max: 100},
               { name: '页面响应延时', max: 100},
               { name: '页面显示成功率', max: 100},
               { name: '页面显示延时', max: 100},
               { name: '页面下载速率', max: 100},
            ]
        },
        series: [{
            type: 'radar',
            data : [
                {
                    value : [25, 80, 70, 100, 90],
                    name : 'WEB网站体验趋势总览'
                }
            ]
        }]
    };

    web.setOption(web_option);

    game_option = {
        tooltip: {},
        radar: {
            // shape: 'circle',
            indicator: [
               { name: '游戏响应成功率', max: 100},
               { name: '游戏响应延时', max: 100},
               { name: '游戏显示成功率', max: 100},
               { name: '游戏显示延时', max: 100},
               { name: '游戏下载速率', max: 100},
            ]
        },
        series: [{
            type: 'radar',
            data : [
                {
                    value : [80, 80, 80, 80, 80],
                    name : '游戏体验总览'
                }
            ]
        }]
    };

    game.setOption(game_option); 

    user_option = {
        tooltip: {},
        radar: {
            // shape: 'circle',
            indicator: [
               { name: '发送邮件', max: 100},
               { name: '观看视频', max: 100},
               { name: '玩游戏', max: 100},
               { name: '即时通信', max: 100},
               { name: '其他', max: 100},
            ]
        },
        series: [{
            type: 'radar',
            data : [
                {
                    value : [90, 50, 90, 50, 90],
                    name : '用户行为分析'
                }
            ]
        }]
    };

    user.setOption(user_option); 

});