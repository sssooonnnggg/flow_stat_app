var formatMap = {
    '小时' : {
        format:'yyyy-mm-dd hh:00',
        minView:'day',
        language:  'zh-CN',
        autoclose: 1,
    },
    '天' : {
        format:'yyyy-mm-dd',
        minView:'month',
        language:  'zh-CN',
        autoclose: 1,
    },
    '月' : {
        format:'yyyy-mm',
        language:  'zh-CN',
        autoclose: 1,
        minView: 'year',
        startView: 'year',
    },
}

var findeMap = {
    '小时' : 'hour',
    '天' : 'day',
    '月' : 'month'
}

var date1 = new Date(2016, 5, 20);
var date2 = new Date(2016, 5, 27);

function initDateTimePicker() {
    var defaultOption = {
        format:'yyyy-mm-dd hh:00',
        language:  'zh-CN',
        autoclose: 1,
        minView: 'day',
    };
    $('#startDate').datetimepicker(defaultOption);
    $('#endDate').datetimepicker(defaultOption);

    $('#startDate').datetimepicker().on('changeDate', function(ev){
        date1 = ev.date;
    });


    $('#endDate').datetimepicker().on('changeDate', function(ev){
        date2 = ev.date;
    });

    $('#startDate').datetimepicker('update', date1);
    $('#endDate').datetimepicker('update', date2);
};

$(function(){

    $('#select-fined').change(function() {
        var checkValue=$(this).val();
        $('#startDate').datetimepicker('remove');
        $('#endDate').datetimepicker('remove');
        $('#startDate').datetimepicker(formatMap[checkValue]);
        $('#endDate').datetimepicker(formatMap[checkValue]);
        $('#startDate').datetimepicker('update', date1);
        $('#endDate').datetimepicker('update', date2);
    });
});

function formateDate(value, index) {
    var date = new Date(value);
    var text = date.getFullYear() + '-' + (date.getMonth() + 1);
    var fined = $('#select-fined').val();
    if (fined == '小时') {
        text = text + '-' + date.getDate();
        text = text + ' ' + date.getHours() + ':00';         
    } else if (fined == '天') {
        text = text + '-' + date.getDate();
    } else if (fined == '月') {

    };
    return text;
};

// 获取时间数组
function getDates(date)
{
    date.length = 0;
    //data.length = 0;
    var fined = $('#select-fined').val();
    var interval = 0;
    var distance = date2.getTime() - date1.getTime();
    if (fined == '小时') {
        interval = 3600 * 1000;     
    } else if (fined == '天') {
        interval = 3600 * 1000 * 24; 
    } else if (fined == '月') {
        interval = 3600 * 1000 * 24 * 30; 
    };
    var times = (date2.valueOf() - date1.valueOf()) / interval;
    for (var i = 0; i <= times; i++) {
        var now = date1.valueOf() + interval * i;
        date.push(now);
        //data.push(Math.random() * 5 + 8);
    }
};

function getDataFromBackEnd(type, fn)
{
    var fined = $('#select-fined').val();
    $.getJSON('http://127.0.0.1:3000/do?type='
        + type
        + '&timer_period=' + findeMap[fined]
        + '&time_from=' + date1.getTime()
        + '&time_end=' + date2.getTime()
        + '&callback=?', fn);
}

// 获取 url 参数
function getUrlParamValue(key) {
    var searchInfo = window.location.search;
    var arr = searchInfo.split('&');
    //console.log(arr);
    for (var str in arr) {
        var subStr = arr[str].split('=');
        //console.log(subStr);
        if(subStr[0] == key) {
            return subStr[1];
        }
    }
}

// 同步搜索参数
function syncSearchParam() {

    //console.log(window.location.search);

    // 设置日期
    var time_from = getUrlParamValue('time_from');
    var time_end = getUrlParamValue('time_end');
    var fined = decodeURI(getUrlParamValue('time_period'));
    //console.log(time_from, time_end, fined);

    if (time_from != undefined && time_from != '') {
        date1 = new Date(parseInt(time_from));
        date2 = new Date(parseInt(time_end));
        $('#select-fined').val(fined);
    }

}