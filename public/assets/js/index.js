"use strict";
Raven.config('https://182252dacaca486e94c6f22580a88e6d@sentry.io/157629').install();
showLoading(true);

$(document).ready(function () {
    var dataStatus = dataInit();
    if (dataStatus) {
        setTimeout(function() {
            showLoading(false);
            setTimeout(function() {
                $(".container.op-0").removeClass("op-0");
            }, 500);
        }, 1500);
    };
    $("#tableFetch").click(function() {
        var date = $("#datepicker").datepicker("getFormattedDate");
        if (date == "") {
            alert("请选择查询日期！");
            return false;
        } else {
            tableInit();
        }
    });
    $("#userRefresh").on("click", function() {
        window.location.reload();
    });
});

function dataInit () {
    // datepicker初始化
    $('#datepicker').datepicker({
        format: "yyyy-mm-dd",
        weekStart: 1,
        maxViewMode: 3,
        todayBtn: true,
        language: "zh-CN",
        daysOfWeekDisabled: "0,2,3,5,6",
        autoclose: true,
        orientation: "bottom auto"
    });
    return true;
}

function tableInit() {
    
    $('#table').bootstrapTable('destroy');
    $('#table').bootstrapTable({
        cache: false,
        dataType: "json",
        url: "/get-score",
        method: "get",
        search: false,
        sortable: true,
        striped: true,
        uniqueId: "time",
        columns: [{
            field: "room_number",
            title: "宿舍号",
            sortable: true
        }, {
            field: "first_score",
            title: "一评成绩"
        }, {
            field: "second_score",
            title: "二评成绩"
        }, {
            field: "average",
            title: "平均分",
            sortable: true
        } ],
        queryParamsType : "",
        queryParams: function queryParams(params) {   //设置查询参数
            var param = {
                date: $("#datepicker").datepicker("getFormattedDate"),
                room: $("#roompicker").val()
            };
            return param;
        }
    });

}

function loadingResize() {
    var yScroll = document.documentElement.clientHeight;
    var spinnerMargin = ((parseInt(yScroll)-60)/2)+"px";
    $("div.spinner").css("margin", spinnerMargin+" auto");
}

function showLoading(status) {
    if (status) {
        var yScroll = document.documentElement.clientHeight;
        var spinnerMargin = ((parseInt(yScroll)-60)/2)+"px";
        $("div.spinner").css("margin", spinnerMargin+" auto");
        $("div#loading").fadeIn("normal");
    } else {
        $("div#loading").fadeOut("normal");
    };
}