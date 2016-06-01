$(function() {

  var upperBoundConfig = {
    'download_speed': 20,
    'resp_delay': 1000,
  };

  function getScore(obj, attr, upperBound, score) {
    var sum = 0;
    var i = 0;
    for (prop in obj) {
      sum = sum + obj[prop][attr];
      i = i + 1;
    }
    console.log(i);
    console.log(sum);
    var average = sum / i;
    return average / upperBound * score;
  }

  function getVideoData() {
    getDataFromBackEnd('queryvideo', function(serverData) {
      var videoData = serverData['data'];
      var radarData = [];
      radarData.push(getScore(videoData, 'init_state', 100, 16.6));
      radarData.push(16.6);
      radarData.push(16.6);
      radarData.push(16.6);
      radarData.push(16.6);
      radarData.push(getScore(videoData, 'download_speed', upperBoundConfig['download_speed'], 16.6));
      var score = 0;
      for (var i = 0; i < radarData.length; ++i) {
        score = score + radarData[i];
      }
      score = Math.floor(score);
      video_option.series[0].data[0].value = radarData;
      video.setOption(video_option);

      var scoreData = video_score_option.series[0];
      scoreData.data[0].value = score;
      scoreData.data[0].name = score;
      scoreData.data[1].value = 100 - score;
      scoreData.data[1].name = 100 - score;
      video_score.setOption(video_score_option);
    });
  };

  function getNetworkData() {
    getDataFromBackEnd('queryhttp', function(serverData) {
      var networkData = serverData['data'];
      var radarData = [];
      radarData.push(getScore(networkData, 'get_state', 100, 20));
      radarData.push(getScore(networkData, 'resp_delay', upperBoundConfig['resp_delay'], 20));
      radarData.push(20);
      radarData.push(20);
      radarData.push(getScore(networkData, 'download_speed', upperBoundConfig['download_speed'], 20));
      var score = 0;
      for (var i = 0; i < radarData.length; ++i) {
        score = score + radarData[i];
      }
      score = Math.floor(score);
      web_option.series[0].data[0].value = radarData;
      web.setOption(web_option);

      var scoreData = web_score_option.series[0];
      scoreData.data[0].value = score;
      scoreData.data[0].name = score;
      scoreData.data[1].value = 100 - score;
      scoreData.data[1].name = 100 - score;
      web_score.setOption(video_score_option);
    });
  }

  $('#search-btn').click(function() {
    getVideoData();
    getNetworkData();
  });

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
          color: '#333'
        }
      },
      indicator: [{
        name: '视频流媒体初始播放成功率(%)',
        max: 16.6
      }, {
        name: '视频流媒体初始缓冲延时(ms)',
        max: 16.6
      }, {
        name: '视频流媒体播放停顿率(%)',
        max: 16.6
      }, {
        name: '视频流媒体停顿频次(次)',
        max: 16.6
      }, {
        name: '视频流媒体停顿占比(%)',
        max: 16.6
      }, {
        name: '视频流媒体下载速度(KB)',
        max: 16.6
      }]
    },
    series: [{
      type: 'radar',
      data: [{
        value: [4300, 10000, 28000, 35000, 50000, 19000],
        name: '视频流媒体体验趋势总览'
      }]
    }]
  };

  video.setOption(video_option);

  video.on('click', function(params) {
    //alert(JSON.stringify(params));
    if (params.name == '视频流媒体初始播放成功率(%)') {
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
          color: '#333'
        }
      },
      indicator: [{
        name: '页面响应成功率(%)',
        max: 20
      }, {
        name: '页面响应延时(ms)',
        max: 20
      }, {
        name: '页面显示成功率(%)',
        max: 20
      }, {
        name: '页面显示延时(ms)',
        max: 20
      }, {
        name: '页面下载速率(KB)',
        max: 20
      }, ]
    },
    series: [{
      type: 'radar',
      data: [{
        value: [25, 80, 70, 100, 90],
        name: 'WEB网站体验趋势总览'
      }]
    }]
  };

  web.on('click', function(params) {
    //alert(JSON.stringify(params));
    if (params.name == '页面响应成功率(%)') {
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
      type: 'pie',
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
          color: function(param) {
            if (param.dataIndex === 0) {
              return "#4cc3a5";
            } else {
              return "transparent";
            }
          }
        }
      },
      data: [{
        value: 0,
        name: '75'
      }, {
        value: 0,
        name: ''
      }, ]
    }]
  };

  web_score_option = {
    series: [
    {
      type: 'pie',
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
          color: function(param) {
            if (param.dataIndex === 0) {
              return "#4cc3a5";
            } else {
              return "transparent";
            }
          }
        }
      },
      data: [{
        value: 0,
        name: '0'
      }, {
        value: 0,
        name: ''
      }, ]
    }]
  };

  getVideoData();
  getNetworkData();

});