"use strict";
Raven.config('https://182252dacaca486e94c6f22580a88e6d@sentry.io/157629').install();
var check_date = $("#datepicker").val();

$(document).ajaxStart(function() {
    Pace.restart();
});

$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
        }
    });
    loadChangelog();
    dataInit();

    $("button[role='dateReset']").on("click", function() {
        dateResetClick();
    });
    $("button[role='dateComfirm']").on("click", function() {
        if ($("#datepicker").val() == "") {
            swal("错误", "请选择日期！", "error");
        } else {
            $("#datepicker").attr("disabled","disabled");
            $("button[role='dateComfirm']").attr("disabled","disabled");
            var check_date = $("#datepicker").val();
            if ($("#file-1").length && $("#file-1").length>0) {
                $("#file-1").fileinput('destroy');
            };
            fileUploadInit("file-1", check_date);
            $(".form-group.file").fadeIn();
        };
    });
    $("#datepicker")
    .on("change", function() {
        var check_date = $("#datepicker").val();
    })
    .on("keyup", function() {
        $(this).val("");
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

function change_layout(cls) {
    $("body").toggleClass(cls);
    AdminLTE.layout.fixSidebar();
    if (cls == "layout-boxed") AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    if ($('body').hasClass('fixed') && cls == 'fixed') {
        AdminLTE.pushMenu.expandOnHover();
        AdminLTE.layout.activate();
    }
    AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
    AdminLTE.controlSidebar._fix($(".control-sidebar"));
}

function change_skin(cls) {
    $.each(my_skins, function(i) {
        $("body").removeClass(my_skins[i]);
    });

    $("body").addClass(cls);
    store('skin', cls);
    return false;
}

function store(name, val) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(name, val);
    } else {
        window.alert('Please use a modern browser to properly view this template!');
    }
}

function get(name) {
    if (typeof(Storage) !== "undefined") {
        return localStorage.getItem(name);
    } else {
        window.alert('Please use a modern browser to properly view this template!');
    }
}

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
    $.ajax({
        url: '/admin/get-file-list',
        type: 'GET',
        dataType: 'JSON',
        cache: false,
        timeout: 3000,
        success: function (data) {
            $.each(data, function(i, data) {
                var fileid = "file-"+data.id;
                $("#fileList>tbody").append('<tr class='+fileid+'>');
                $("#fileList>tbody>tr."+fileid).append("<td>"+data.id+"</td>");
                $("#fileList>tbody>tr."+fileid).append("<td>"+data.upload_user+"</td>");
                $("#fileList>tbody>tr."+fileid).append("<td>"+data.file_name+"</td>");
                $("#fileList>tbody>tr."+fileid).append("<td>"+data.created_at+"</td>");
            });
        },
        error: function () {
            // ErrorHandler
        }
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
                changeResultShow(0);    //Password Changed.
                $("#defaultModal-footer>button").on("click", function() {
                    location.reload();
                })
            } else if (data.status == 0) {
                changeResultShow(1);    //Password Incorrect.
            }
        },
        error: function () {
            changeResultShow(2);    //Network Error.
        }
    });
}

function fileUploadInit(element, check_date) {
    var element = "#"+element;
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
        swal({
            title: "文件上传完成",
            text: "此窗口将在3秒后关闭",
            type: "success",
            timer: 3000,
            showConfirmButton: false
        });
        setTimeout(function() {
            dateResetClick();
        }, 3000);
    });
}

function changeResultShow(status) {
    $("#changepwModal").modal("hide");
    $("#defaultModal-title").text("");
    $("#defaultModal-body").empty();
    if (status == 0) {
        $("#defaultModal").addClass("modal-success");
        $("#defaultModal-title").text("更改密码成功");
        $("#defaultModal-body").append('<span>密码已成功更改。</span>');
    } else if (status == 1) {
        // Password Incorrect.
        $("#defaultModal").addClass("modal-danger");
        $("#defaultModal-title").text("更改密码失败");
        $("#defaultModal-body").append('<span>原密码错误，请检查正确后重试。</span>');
    } else if (status == 2) {
        $("#defaultModal").addClass("modal-danger");
        $("#defaultModal-title").text("更改密码失败");
        $("#defaultModal-body").append('<span>连接失败，请检查网络连接后重试。</span>');
    };
    $("#defaultModal").modal("show");
}

function dateResetClick() {
    $("#datepicker").removeAttr("disabled");
    $("button[role='dateComfirm']").removeAttr("disabled");
    $("#datepicker").val("");
    $("#file-1").fileinput('destroy');
    $(".form-group.file").fadeOut();
}

function loadChangelog() {
    $.getJSON("/changelog.json", function(data) {
        $.each(data.changelog, function(i, changelog) {
            var dateid = "time-label-"+i;
            var logDate = changelog.date;
            $(".timeline").append('<li class="time-label" id='+dateid+'>'
                +'<span class="bg-yellow">'
                +logDate
                +'</span>'
                +'</li>'
            );
            $.each(changelog.rows, function(i, rows) {
                var rowsid = "rows-"+i;
                $(".timeline").append(
                    '<li class="'+dateid+' '+rowsid+'">'
                    +'<i class="fa fa-user bg-blue"></i>'
                    +'<div class="timeline-item">'
                    +'<span class="time"><i class="fa fa-clock-o"></i>'
                    +rows.time
                    +'</span>'
                    +'<h3 class="timeline-header no-border">'
                );
                if (rows.type == "fix") {
                    $("."+dateid+'.'+rowsid+">div>h3").append('<a class="text-red">修复：</a>');
                } else if (rows.type == "enhance") {
                    $("."+dateid+'.'+rowsid+">div>h3").append('<a class="text-green">优化：</a>');
                };
                $("."+dateid+'.'+rowsid+">div>h3").append(rows.content);
            });
        });
    });
}