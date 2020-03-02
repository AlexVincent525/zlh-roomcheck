"use strict";
Raven.config('https://182252dacaca486e94c6f22580a88e6d@sentry.io/157629').install();

$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
        }
    });

    $('#login').click(function() {
        var student_number = $('input[name=student_number]').val();
        var password = $('input[name=password]').val();
        $.ajax({
            url: "/admin/login",
            type: "POST",
            dataType: "JSON",
            cache: false,
            timeout: 3000,
            data: {
                "student_number": student_number,
                "password": password
            },
            success: function (data) {
                if (data.status == 1) {
                    window.location.href ="/admin";
                } else if (data.status == 0) {
                    upFailedShow(true);
                }
            },
            error: function () {
                commonFailedShow();
            }
        });
        return false;
    })
});

function upFailedShow(flag) {
    if (flag) {
        $("#form-tip").css("opacity","1");
    } else {
        $("#form-tip").css("opacity","0");
    }
}
function commonFailedShow() {
    $("#defaultModal-title").html('<strong class="text-lightred">登录失败</strong>');
    $("#defaultModal-body").html('<strong class="text-blue">登录</strong>失败，请稍后再试！');
    $("#defaultModal").modal("show");
}