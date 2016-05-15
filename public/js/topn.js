// 基于准备好的dom，初始化echarts实例
var curKqiChart = echarts.init(document.getElementById('video2'));
var kqiCharts = {};

var date = [];
var data = [];
var base = +new Date(2015, 9, 3);
var oneDay = 24 * 3600 * 1000;

// 指定图表的配置项和数据
var option = {
    title :{
    },
    tooltip: {
        trigger: 'axis',
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
        data:['新浪','腾讯','网易','搜狐','优酷'],
    },
    xAxis:  {
        type: 'category',
        boundaryGap: false,
        data : date
    },
    grid:   {
        x : 10,
        y : 50,
        x2 : 10,
        y2 : 25,
        containLabel: true,
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} 次'
        }
    },
    series: [
        {
            name:'新浪',
            type:'line',
            data:[],
            areaStyle: {normal: {}},
        },
        {
            name:'腾讯',
            type:'line',
            data:[],
            areaStyle: {normal: {}},
        },
        {
            name:'网易',
            type:'line',
            data:[],
            areaStyle: {normal: {}},
        },
        {
            name:'搜狐',
            type:'line',
            data:[],
            areaStyle: {normal: {}},
        },
        {
            name:'优酷',
            type:'line',
            data:[],
            areaStyle: {normal: {}},
        },
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
    for (var i = 0; i < 5; ++i) {
        data.push([]);
    }
    var step = (date2.valueOf() - date1.valueOf()) / 30;
    for (var i = 0; i < 30; i++) {
        var now = new Date(date1.valueOf() + step * i);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
        for (var j = 0; j < 5; ++j) {
            data[j].push(Math.floor(1000 * (Math.random() * 2 + 12 - j * 2)));
        }
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
    date = [], data = [];
    randomAxis(date, data);
    option.xAxis.data = date;
    option.yAxis.axisLabel.formatter = '{value} kbits/s';
    for (var i = 0; i < 5; ++i) {
        option.series[i].data = data[i];
    }
    curKqiChart.setOption(option);

    tableData = [];
    var target = ['新浪','腾讯','网易','搜狐','优酷'];
    var step = (date2.valueOf() - date1.valueOf()) / 5;
    for (var i = 0; i < 5; i++) {
        var obj = {};
        var now = new Date(date1.valueOf() + step * i);
        var curDate = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
        obj['序号'] = i + 1;
        obj['分析对象'] = '南京';
        obj['流量类型'] = target[i];
        obj['双向流量'] = Math.floor(1000 * (Math.random() * 2 + 12 - i * 2));
        obj['双向带宽'] = Math.floor(1000 * (Math.random() * 2 + 12 - i * 2));
        obj['峰值时刻'] = curDate;
        obj['峰值带宽'] = Math.floor(1000 * (Math.random() * 2 + 12 - i * 2));
        obj['谷值时刻'] = curDate;
        obj['谷值带宽'] = Math.floor(1000 * (Math.random() * 2 + 12 - i * 2));
        tableData.push(obj);
    };

    $('#detail').bootstrapTable({
        data: tableData,
    });
})

