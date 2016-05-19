
// 基于准备好的dom，初始化echarts实例
var curKqiChart = echarts.init(document.getElementById('video-container'));
var gaugeChart = echarts.init(document.getElementById('gauge-container'));
var kqiCharts = {};

var date = [];
var data = [];
var base = +new Date(2015, 9, 3);
var oneDay = 24 * 3600 * 1000;

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'axis'
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
        data : date
    },
    grid:   {
        x : 70,
        y : 20,
        x2 : 50,
        y2 : 50
    },
    yAxis: {
        max:20,
        type: 'value',
        axisLabel: {
            formatter: '{value} 次'
        }
    },
    series: [
        {
            name:'视频MOS值',
            type:'line',
            data:data
        }
    ]
};

var date1 = new Date();
var date2 = new Date();

function randomAxis(date, data)
{
    date.length = 0;
    data.length = 0;
    var step = (date2.valueOf() - date1.valueOf()) / 20;
    for (var i = 0; i < 20; i++) {
        var now = new Date(date1.valueOf() + step * i);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
        data.push(Math.random() * 5 + 8);
    }
}

function fakeVideoData() {
    var constFormatter = ["{value} %", "{value} ms", "{value} %", "{value} 次", "{value} %", "{value} kbps"];
    var desc = ['视频流媒体初始播放成功率', '视频流媒体初始缓冲延时', '视频流媒体播放停顿率', '视频流媒体停顿频次', '视频流媒体停顿占比', '视频流媒体下载速度'];
    var value = [95, 2259, 50, 39, 5, 32000];

    for (var i = 1; i < 7; i++) {
        var chartId = "video-tab-" + i;
        kqiCharts[chartId] = {
            date:[],
            data:[],
            formatter:"",
        };
        randomAxis(kqiCharts[chartId].date, kqiCharts[chartId].data);
        kqiCharts[chartId].formatter = constFormatter[i - 1];
        kqiCharts[chartId].desc = desc[i - 1];
        kqiCharts[chartId].value = value[i - 1];
    }

    var divId = $('.video-tab-btn,  .active').attr("id");
    option.xAxis.data = kqiCharts[divId].date;
    option.series[0].data = kqiCharts[divId].data;
    option.yAxis.axisLabel.formatter = kqiCharts[divId].formatter;
    curKqiChart.setOption(option);

    gaugeOption.series[0].data[0].name = kqiCharts[divId].desc;
    gaugeOption.series[0].data[0].value = kqiCharts[divId].value;
    gaugeOption.series[0].detail.formatter = kqiCharts[divId].formatter;
    gaugeChart.setOption(gaugeOption);
}

$(function(){

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

    fakeVideoData();

    $('#search-btn').click(function(){
        fakeVideoData();
    })

    $('.tab-btn, .inactive').click(function(){
        var otherTabs = $('.tab-btn, .active');
        otherTabs.removeClass('active');
        otherTabs.addClass('inactive');
        $(this).removeClass('inactive');
        $(this).addClass('active');
        var divId = $(this).attr("id");
        option.xAxis.data = kqiCharts[divId].date;
        option.series[0].data = kqiCharts[divId].data;
        option.yAxis.axisLabel.formatter = kqiCharts[divId].formatter;
        curKqiChart.setOption(option);

        gaugeOption.series[0].data[0].name = kqiCharts[divId].desc;
        gaugeOption.series[0].data[0].value = kqiCharts[divId].value;
        gaugeOption.series[0].detail.formatter = kqiCharts[divId].formatter;
        gaugeChart.setOption(gaugeOption);
    })

});






