kqiCharts = {};
curKqiChart = echarts.init(document.getElementById('video-container'));
gaugeChart = echarts.init(document.getElementById('gauge-container'));
mapChart = echarts.init(document.getElementById('map-container'));
barChart = echarts.init(document.getElementById('bar-container'));

date = [];
data = [];

// 获取数据
function getDatas(type, data, fn)
{
    var fined = $('#select-fined').val();
    $.getJSON('http://127.0.0.1:3000/do?type='
        + type
        + '&timer_period=' + findeMap[fined]
        + '&time_from=' + date1.getTime()
        + '&time_end=' + date2.getTime()
        + '&callback=?', function(serverData){
            var videoData = serverData['data'];
            data['video-tab-1'].data.length = 0;
            data['video-tab-2'].data.length = 0;
            data['video-tab-3'].data.length = 0;
            data['video-tab-4'].data.length = 0;
            data['video-tab-5'].data.length = 0;
            data['video-tab-6'].data.length = 0;
            for (var i = 0; i < date.length; ++i) {
                if (date[i] in videoData)
                {
                    var itemData = videoData[date[i]];
                    data['video-tab-1'].data.push(itemData['init_state']);
                    //data['video-tab-2'].data.push(itemData['buffer-delay']);
                    //data['video-tab-3'].data.push(itemData['break-rate']);
                    //data['video-tab-4'].data.push(itemData['break-time']);
                    //data['video-tab-5'].data.push(itemData['break-percent']);
                    data['video-tab-6'].data.push(itemData['download_speed']);
                }
                else
                {
                    data['video-tab-1'].data.push(0);
                    data['video-tab-2'].data.push(0);
                    data['video-tab-3'].data.push(0);
                    data['video-tab-4'].data.push(0);
                    data['video-tab-5'].data.push(0);
                    data['video-tab-6'].data.push(0);
                }
            }
            fn();
        })
}

function getVideoData() {
    getDates(date);
    getDatas('queryvideo', kqiCharts, function() {
        var divId = $('.active').attr("id");
        option.xAxis.data = date;
        option.series[0].data = kqiCharts[divId].data;
        option.yAxis.axisLabel.formatter = kqiCharts[divId].formatter;
        curKqiChart.setOption(option);

        gaugeOption.series[0].data[0].name = kqiCharts[divId].desc;
        gaugeOption.series[0].data[0].value = kqiCharts[divId].value;
        gaugeOption.series[0].detail.formatter = kqiCharts[divId].formatter;
        gaugeChart.setOption(gaugeOption);
    });
}

$(function(){

    // 指定图表的配置项和数据
    option = {
        tooltip: {
            trigger: 'axis',
            formatter:'{c}',
        },
        toolbox: {
            show: false,
            feature: {
                dataZoom: {},
                restore: {},
                saveAsImage: {}
            }
        },
        /*legend: {
            data:['视频MOS值'],
            y:'bottom',
            x:'left',
            padding:[50, 50, 50, 20],
        },*/
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data : date,
            axisLabel: {
                formatter:formateDate,
            }
        },
        grid:   {
            x : 70,
            y : 20,
            x2 : 50,
            y2 : 50
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} 次'
            }
        },
        series: [
            {
                type:'line',
                data:data,
            }
        ]
    };

    var constFormatter = ["{value} %", "{value} ms", "{value} %", "{value} 次", "{value} %", "{value} KB"];
    var desc = ['视频流媒体初始播放成功率', '视频流媒体初始缓冲延时', '视频流媒体播放停顿率', '视频流媒体停顿频次', '视频流媒体停顿占比', '视频流媒体下载速度'];
    var value = [95, 2259, 50, 39, 5, 32000];

    // 初始化一些描述信息
    for (var i = 1; i < 7; i++) {
        var chartId = "video-tab-" + i;
        kqiCharts[chartId] = {
            date:[],
            data:[],
            formatter:"",
        };
        kqiCharts[chartId].formatter = constFormatter[i - 1];
        kqiCharts[chartId].desc = desc[i - 1];
        kqiCharts[chartId].value = value[i - 1];
    }

    initDateTimePicker();

    gaugeOption = {
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '业务指标',
                type: 'gauge',
                detail: {formatter:'{value}%'},
                data: [{value: 92.85, name: '视频流媒体初始播放成功率'}],
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
            }
        ]
    };

    getVideoData();

    // 地图数据
    $.get('json/jiangsu.json', function (jiangsuJson) {
        echarts.registerMap('jiangsu', jiangsuJson);
        mapChart.setOption({
            visualMap: {
                min: 800,
                max: 60000,
                left: '5%',
                text:['高','低'],
                realtime: false,
                calculable: true,
                color: ['rgba(255, 50, 50, 255)','rgba(255, 240, 240, 255)'],
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}<br/>{c}'
            },
            series: [{
                type: 'map',
                map: 'jiangsu',
                label: {
                    normal: {
                        textStyle: {
                            color: '#666'
                        }
                    }
                },
                itemStyle:{
                    normal:{
                        label:{
                            show:true
                        },
                        borderWidth:'0',
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 10
                    },
                    emphasis:{label:{show:true}}
                },
                data:[
                    {name: '南京市', value: 20057.34},
                    {name: '苏州市', value: 15477.48},
                    {name: '常州市', value: 31686.1},
                    {name: '无锡市', value: 6992.6},
                    {name: '徐州市', value: 44045.49},
                    {name: '连云港市', value: 30000.64},
                    {name: '盐城市', value: 37659.78},
                    {name: '淮安市', value: 20000.97},
                    {name: '宿迁市', value: 60000.26},
                    {name: '扬州市', value: 21900.9},
                    {name: '镇江市', value: 4918.26},
                    {name: '南通市', value: 5881.84},
                    {name: '泰州市', value: 9999.84},
                ],
            }]
        });
    });

    barOption = {
        tooltip : {
            trigger: 'axis',
            axisPointer : { 
                type : 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['南京市','苏州市','常州市','无锡市','徐州市','连云港市', '盐城市', '淮安市', '宿迁市', '扬州市', '镇江市', '南通市', '泰州市'],
        },
        series: [
            {
                type: 'bar',
                data: [20057.34, 15477.48, 31686.1, 6992.6, 44045.49, 30000.64, 37659.78, 20000.97, 60000.26, 21900.9, 4918.26, 5881.84, 9999.84],
            },
        ]
    };

    barChart.setOption(barOption);

    $('#search-btn').click(function(){
        getVideoData();
    })

    $('.tab-btn').click(function(){
        var activeTabs = $('.active');
        activeTabs.removeClass('active');
        activeTabs.addClass('inactive');
        $(this).removeClass('inactive');
        $(this).addClass('active');
        var divId = $(this).attr("id");
        option.xAxis.data = date;
        option.series[0].data = kqiCharts[divId].data;
        option.yAxis.axisLabel.formatter = kqiCharts[divId].formatter;
        curKqiChart.setOption(option);

        gaugeOption.series[0].data[0].name = kqiCharts[divId].desc;
        gaugeOption.series[0].data[0].value = kqiCharts[divId].value;
        gaugeOption.series[0].detail.formatter = kqiCharts[divId].formatter;
        gaugeChart.setOption(gaugeOption);
    })

});






