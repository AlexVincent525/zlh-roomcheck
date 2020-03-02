"use strict";
Raven.config('https://182252dacaca486e94c6f22580a88e6d@sentry.io/157629').install();
var check_date = "";

$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
        }
    });

    dataInit();

    $("button[role='dateReset']").on("click", function() {
        $("#datepicker").removeAttr("disabled");
        $("button[role='dateComfirm']").removeAttr("disabled");
        $("#datepicker").val("");
        $(".form-group.file").fadeOut();
    });
    $("button[role='dateComfirm']").on("click", function() {
        if ($("#datepicker").val() == "") {
            swal("错误！", "请选择日期", "error");
        } else {
            $("#datepicker").attr("disabled","disabled");
            $("button[role='dateComfirm']").attr("disabled","disabled");
            var check_date = $("#datepicker").val();
            fileUploadInit("file-1", check_date);
            $(".form-group.file").fadeIn();
        };
    });
    $("#datepicker").on("change", function() {
        var check_date = $("#datepicker").val();
    });
    $("#changepwModal-body-renewpw").on("keyup",function() {
        var $newpw = $("#changepwModal-body-newpw").val();
        var $renewpw = $("#changepwModal-body-renewpw").val();
        if ($newpw == $renewpw && $renewpw != null) {
            $("#passwordConfirm").removeAttr("disabled");
        } else {
            $("#passwordConfirm").attr("disabled", "disabled");
        };
    });
    $("#passwordConfirm").on("click", function() {
        changepw();
    });
    $("#defaultModal").on('hide.bs.modal', function() {
        location.reload();
    });

});


function dataInit () {
    // datepicker初始化
    $('#datepicker').datepicker({
        autoclose: true,
        daysOfWeekDisabled: "0,2,3,5,6",
        format: "yyyy-mm-dd",
        language: "zh-CN",
        maxViewMode: 3,
        orientation: "bottom auto",
        todayHighlight: true,
        weekStart: 1
    });
}

function changepw() {
    var old_password = $("#changepwModal-body-oldpw").val();
    var new_password = $("#changepwModal-body-newpw").val();
    $.ajax({
        url: '/admin/change-password',
        type: 'POST',
        dataType: 'JSON',
        cache: false,
        timeout: 3000,
        data: {
            "old_password": old_password,
            "new_password": new_password
        },
        success: function (data) {
            if (data.status == 1) {
                window.location.href ="/admin";
            } else if (data.status == 0) {
                changeFailedShow(0);    //Password Incorrect.
            }
        },
        error: function () {
            changeFailedShow(1);    //Network Error.
        }
    });
}

function fileUploadInit(element, check_date) {

    $("div.form-group.file").append('<input id="file-1" type="file" multiple class="file" data-overwrite-initial="false">');
    var element = "#"+element;
    $(element).fileinput("destroy");
    $(element).fileinput({
        uploadUrl: '/admin/upload',
        theme: "explorer",
        allowedFileExtensions: ['xls', 'xlsx'],
        fileActionSettings: {
            showUpload: false,
            showRemove: false,
            showZoom: false
        },
        minFileCount: 1,
        maxFileCount: 3,
        overwriteInitial: false,
        language: 'zh',
        showCaption: false,
        showRemove: true,
        uploadExtraData: {
            'check_date': check_date
        }
    }).on('fileuploaded', function() {
        swal("上传成功！", "成绩将在稍后进行处理...", "success")
    });

}

function changeFailedShow(status) {
    $("#changepwModal").modal("hide");
    $("#defaultModal-title").text("");
    $("#defaultModal-body").empty();
    if (status == 0) {
        // Password Incorrect.
        $("#defaultModal-title").text("更改密码失败");
        $("#defaultModal-body").append('<span>原密码错误，请检查正确后重试。</span>');
    } else if (status == 1) {
        $("#defaultModal-title").text("更改密码失败");
        $("#defaultModal-body").append('<span>连接失败，请检查网络连接后重试。</span>');
    };
    $("#defaultModal").modal("show");
}