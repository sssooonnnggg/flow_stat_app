// 基于准备好的dom，初始化echarts实例
var curKqiChart = echarts.init(document.getElementById('video2'));
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
        show: true,
        feature: {
            dataZoom: {},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data:['视频MOS值']
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data : date
    },
    grid:   {
        x : 55,
        y : 50,
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
            name:'网页MOS值',
            type:'line',
            data:data
        }
    ]
};

var defaultOption = {
    format:'yyyy-mm-dd hh:00',
    minView:'day',
    language:  'zh-CN',
    autoclose: 1,
    minView: 'day',
};

var formatMap = {
    '小时' : {
        format:'yyyy-mm-dd hh:00',
        minView:'day',
        language:  'zh-CN',
        autoclose: 1,
        minView: 'day',
    },
    '天' : {
        format:'yyyy-mm-dd',
        minView:'month',
        language:  'zh-CN',
        autoclose: 1,
        minView: 'month',
    },
    '月' : {
        format:'yyyy-mm',
        minView:'year',
        language:  'zh-CN',
        autoclose: 1,
        minView: 'year',
        startView: 'year',
    },
}

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

$(function(){
    $('#datetimepicker1').datetimepicker(defaultOption);
    $('#datetimepicker2').datetimepicker(defaultOption);

    $('.select-time').change(function() {
        var checkValue=$(".select-time").val();
        $('#datetimepicker1').datetimepicker('remove');
        $('#datetimepicker2').datetimepicker('remove');
        $('#datetimepicker1').datetimepicker(formatMap[checkValue]);
        $('#datetimepicker2').datetimepicker(formatMap[checkValue]);
        $('#datetimepicker1').datetimepicker('update', date1);
        $('#datetimepicker2').datetimepicker('update', date2);
    });

    $('#datetimepicker1').datetimepicker().on('changeDate', function(ev){
        date1 = ev.date;
    });


    $('#datetimepicker2').datetimepicker().on('changeDate', function(ev){
        date2 = ev.date;
    });
});

$('#btn-search').click(function(){

    $('.video-kqi-param').show();

    var constFormatter = ["{value} %", "{value} ms", "{value} kbps"];

    for (var i = 1; i < 4; i++) {
        var chartId = "kqi-" + i;
        kqiCharts[chartId] = {
            date:[],
            data:[],
            formatter:"",
        };
        randomAxis(kqiCharts[chartId].date, kqiCharts[chartId].data);
        kqiCharts[chartId].formatter = constFormatter[i - 1];
    }

    var divId = $('.video-kqi-param-on').attr("id");
    option.xAxis.data = kqiCharts[divId].date;
    option.series[0].data = kqiCharts[divId].data;
    option.yAxis.axisLabel.formatter = kqiCharts[divId].formatter;
    curKqiChart.setOption(option);
})

$('.video-kqi-param').click(function(){
    $('.video-kqi-param-on').removeClass('video-kqi-param-on');
    $(this).addClass('video-kqi-param-on');

    var divId = $(this).attr("id");
    option.xAxis.data = kqiCharts[divId].date;
    option.series[0].data = kqiCharts[divId].data;
    option.yAxis.axisLabel.formatter = kqiCharts[divId].formatter;
    curKqiChart.setOption(option);
})

