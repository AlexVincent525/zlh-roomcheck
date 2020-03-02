<!doctype html>
<html class="no-js" lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Score Login</title>
        <meta name="msapplication-TileImage" content="/favicon.ico">
        <link rel="icon" href="/favicon.ico" sizes="32x32">
        <link rel="icon" href="/favicon.ico" sizes="192x192">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon-precomposed" href="/favicon.ico">
        <link rel="stylesheet" href="/assets/admin/css/vendor/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/admin/css/vendor/animate.css">
        <link rel="stylesheet" href="/assets/admin/css/vendor/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/admin/js/vendor/animsition/css/animsition.min.css">
        <link rel="stylesheet" href="/assets/admin/css/minovate.min.css">
        <link rel="stylesheet" href="/assets/admin/css/custom.css">
        <meta name="csrf_token" id="token" content="{{ csrf_token() }}">
    </head>
    <body id="minovate" class="appWrapper" style="background-color:#616F77">
        <div id="wrap" class="animsition">
            <div class="page page-core page-login">
                <div class="text-center"><h3 class="text-light text-white"><span class="text-cyan"><strong>Score</strong></span> Login<span class="text-cyan"></span></h3></div>
                <div class="text-center"><h3 class="text-light text-white"><span class="text-cyan"></span>宿舍成绩 <span class="text-cyan"><strong>后台登录</strong></span></h3></div>
                <div class="container w-360 p-15 bg-white mt-40 text-center">
                    <h2 class="text-light text-cyan"><strong>登录</strong></h2>
                    <form name="loginForm">
                        <div class="form-group">
                            <input type="text" name="student_number" class="form-control underline-input" placeholder="学号 / Student No.">
                        </div>
                        <div class="form-group">
                            <input type="password" name="password" class="form-control underline-input" placeholder="密码 / Password">
                        </div>
                        <div class="form-tips" id="form-tip">
                            <span class="badge bg-lightred" id="titleBadge" style="padding:3px 7px"> ! </span>
                            <span class="form-tips text-lightred" id="titleTips">用户名或密码错误，请检查后再试。</span>
                        </div>
                        <div class="form-group mt-20">
                            <button id="login" class="btn btn-cyan b-0 br-2 m-auto block">登录</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header text-center">
                        <h3 class="modal-title custom-font text-lightred" id="defaultModal-title"></h3>
                    </div>
                    <div class="modal-body text-center" id="defaultModal-body"></div>
                    <div class="modal-footer">
                        <button class="btn btn-lightred btn-ef btn-ef-4 btn-ef-4c" data-dismiss="modal"><i class="fa fa-arrow-left"></i> 取消</button>
                    </div>
                </div>
            </div>
        </div>
        <script src="/assets/admin/js/vendor/jquery/jquery-1.11.2.min.js"></script>
        <script src="/assets/admin/js/vendor/bootstrap/bootstrap.min.js"></script>
        <script src="/assets/vendor/raven-v3.14.0/raven.min.js"></script>
        <script src="/assets/admin/js/vendor/jRespond/jRespond.min.js"></script>
        <script src="/assets/admin/js/vendor/animsition/js/jquery.animsition.min.js"></script>
        <script src="/assets/admin/js/minovate.min.js"></script>
        <script src="/assets/admin/js/login.js"></script>
    </body>
</html>