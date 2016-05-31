$(function() {
    
    initDateTimePicker();

    var video = echarts.init(document.getElementById('video'));
    var web = echarts.init(document.getElementById('network'));
    var game = echarts.init(document.getElementById('game'));
    var user = echarts.init(document.getElementById('user'));

    var video_score = echarts.init(document.getElementById('video-score'));
    var web_score = echarts.init(document.getElementById('web-score'));

    video_option = {
        tooltip: {},
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color:'#333'
                }
            },
            indicator: [
               { name: '视频流媒体初始播放成功率(%)', max: 6500},
               { name: '视频流媒体初始缓冲延时(ms)', max: 16000},
               { name: '视频流媒体播放停顿率(%)', max: 30000},
               { name: '视频流媒体停顿频次(次)', max: 38000},
               { name: '视频流媒体停顿占比(%)', max: 52000},
               { name: '视频流媒体下载速度(KB)', max: 25000}
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

    video.on('click', function(params) {
      //alert(JSON.stringify(params));
      if(params.name == '视频流媒体初始播放成功率(%)') {
        window.location.href = '/video?id=1';
      } else if (params.name == '视频流媒体初始缓冲延时(ms)') {
        window.location.href = '/video?id=2';
      } else if (params.name == '视频流媒体播放停顿率(%)') {
        window.location.href = '/video?id=3';
      } else if (params.name == '视频流媒体停顿频次(次)') {
        window.location.href = '/video?id=4';
      } else if (params.name == '视频流媒体停顿占比(%)') {
        window.location.href = '/video?id=5';
      } else if (params.name == '视频流媒体下载速度(KB)') {
        window.location.href = '/video?id=6';
      }
    });

    /*$('#video, #video-tab').click(function() {
        window.location.href = '/video?id=1';
    });

    $('#network, #netwrok-tab').click(function() {
        window.location.href = '/network?id=1';
    });*/

    web_option = {
        tooltip: {},
        radar: {
            name: {
                textStyle: {
                    color:'#333'
                }
            },
            indicator: [
               { name: '页面响应成功率(%)', max: 100},
               { name: '页面响应延时(ms)', max: 100},
               { name: '页面显示成功率(%)', max: 100},
               { name: '页面显示延时(ms)', max: 100},
               { name: '页面下载速率(KB)', max: 100},
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

    web.on('click', function(params) {
      //alert(JSON.stringify(params));
      if(params.name == '页面响应成功率(%)') {
        window.location.href = '/network?id=1';
      } else if (params.name == '页面响应延时(ms)') {
        window.location.href = '/network?id=2';
      } else if (params.name == '页面显示成功率(%)') {
        window.location.href = '/network?id=3';
      } else if (params.name == '页面显示延时(ms)') {
        window.location.href = '/network?id=4';
      } else if (params.name == '页面下载速率(KB)') {
        window.location.href = '/network?id=5';
      };
    });

    video_score_option = {
      series: [
          {
              type:'pie',
              radius: ['70%', '78%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: true,
                      position: 'center',
                          textStyle: {
                          fontSize: '20',
                          fontWeight: 'bold'
                      }
                  },
                  emphasis: {
                      show: true,
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              itemStyle: {
                  normal: {
                      color:function(param) {
                              if(param.dataIndex === 0) {
                                  return "#4cc3a5";
                              }
                              else {
                                  return "#eee";
                              }
                          }
                      }
              },
              data:[
                  {value:75, name:'75'},
                  {value:25, name:''},
              ]
          }
      ]
  };

  video_score.setOption(video_score_option);

  video_score_option.series[0].data = [
      {value:95, name:'95'},
      {value:5, name:''},
    ];
  web_score.setOption(video_score_option);

    /*game_option = {
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

    user.setOption(user_option); */

});