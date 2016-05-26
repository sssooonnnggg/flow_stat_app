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

function initDateTimePicker() {
    var defaultOption = {
        format:'yyyy-mm-dd hh:00',
        minView:'day',
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

    }
    return text;
}