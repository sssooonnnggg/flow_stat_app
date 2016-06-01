
function generateRandomData() {
    var table = $('#qoe-body');
    table.children().remove();
    var html = '';
    for ( var i = 0; i < 20; ++i) {
        var time = '<td>2016-06-01 ' + 
            ('0' + Math.floor(Math.random() * 24)).slice(-2) + ':' + 
            ('0' + Math.floor(Math.random() * 60)).slice(-2) + '</td>';
        var user = '<td>jlkjlkjlkj</td>';
        var srcIp = '<td>192.168.1.' + Math.floor(Math.random() * 256) + '</td>';
        var srcPort = '<td>80</td>';
        var dstIp = '<td>192.168.1.' + Math.floor(Math.random() * 256) + '</td>';
        var dstPort = '<td>8080</td>';
        var stopTime = '<td>' + Math.floor(Math.random() * 100) + '</td>';
        var site = '<td>Youku</td>';
        var status = '<td>播放</td>';
        html = html + '<tr>' + time + user + srcIp + srcPort + dstIp + dstPort + stopTime + site + status + '</tr>';       
    }
    table.html(html);
}

$(function() {
    initDateTimePicker();
    generateRandomData();
    
    $('#search-btn').click(function() {
        generateRandomData();
    });
});