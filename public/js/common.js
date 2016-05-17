function initDateTimePicker() {
    var defaultOption = {
        format:'yyyy-mm-dd',
        minView:'month',
        language:  'zh-CN',
        autoclose: 1,
        format: 'yyyy-mm-dd',
        minView: 'month',
    };
    $('#startDate').datetimepicker(defaultOption);
    $('#endDate').datetimepicker(defaultOption);
};