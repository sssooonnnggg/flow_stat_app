kqiCharts = {};
curKqiChart = echarts.init(document.getElementById('video-container'));
gaugeChart = echarts.init(document.getElementById('gauge-container'));
mapChart = echarts.init(document.getElementById('map-container'));
barChart = echarts.init(document.getElementById('bar-container'));

date = [];
data = [];

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

    var divId = $('.tab-btn,  .active').attr("id");
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

    // 指定图表的配置项和数据
    option = {
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






