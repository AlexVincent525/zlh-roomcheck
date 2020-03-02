<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>宿舍成绩后台管理 - 集大水院自律会</title>
        <meta name="msapplication-TileImage" content="/favicon.ico">
        <link rel="icon" href="/favicon.ico" sizes="32x32">
        <link rel="icon" href="/favicon.ico" sizes="192x192">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon-precomposed" href="/favicon.ico">
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="/new/vendor/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="/new/css/font-awesome.min.css">
        <link rel="stylesheet" href="/new/css/AdminLTE.min.css">
        <link rel="stylesheet" href="/new/css/skins/_all-skins.min.css">
        <link rel="stylesheet" href="/assets/admin/css/animate.min.css">
        <link rel="stylesheet" href="/new/vendor/pace/pace.min.css">
        <link rel="stylesheet" href="/assets/vendor/bootstrap-fileinput/css/fileinput.css">
        <link rel="stylesheet" href="/assets/vendor/bootstrap-fileinput/themes/explorer/theme.css">
        <link rel="stylesheet" href="/assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css">
        <link rel="stylesheet" href="/assets/vendor/sweetalert/sweetalert.css">
        <link rel="stylesheet" href="/new/css/custom.css">
        <meta name="csrf_token" id="token" content="{{ csrf_token() }}">
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>
    <body class="hold-transition skin-blue sidebar-mini fixed">
        <div class="wrapper">
            <header class="main-header">
                <a href="/admin" class="logo">
                    <span class="logo-mini"><b>Sc</b></span>
                    <span class="logo-lg"><b>宿舍成绩</b> 后台管理</span>
                </a>
                <nav class="navbar navbar-static-top">
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-user"></i>
                                    <span style="font-size: 16px" class="hidden-xs">{{ Auth::user()->name }}</span>
                                </a>
                                <ul class="dropdown-menu animated fadeIn">
                                    <li class="user-header">
                                        <i class="fa fa-user fa-5x"></i>
                                        <p>{{ Auth::user()->name }}</p>
                                    </li>
                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a class="btn btn-default btn-flat" role="changepw" tabindex="0" data-toggle="modal" data-target="#changepwModal">更改密码</a>
                                        </div>
                                        <div class="pull-right">
                                            <a href="/admin/logout" class="btn btn-default btn-flat" role="logout">注销</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <aside class="main-sidebar">
                <section class="sidebar">
                    <ul class="sidebar-menu">
                        <li class="header">导览</li>
                        <li class="active">
                            <a href="/admin">
                                <i class="fa fa-home"></i> <span>控制台</span>
                            </a>
                        </li>
                    </ul>
                </section>
            </aside>

            <div class="content-wrapper">
                <section class="content-header">
                    <h1>
                        控制台
                        <small>// Overview your status.</small>
                    </h1>
                    <ol class="breadcrumb">
                        <li class="active"><a href="/admin"><i class="fa fa-dashboard"></i> 控制台</a></li>
                    </ol>
                </section>

                <section class="content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="small-box bg-aqua">
                                <div class="inner">
                                    <h3>{{ $allFileNumber }}</h3>
                                    <p>总文件数</p>
                                </div>
                                <div class="icon">
                                    <i class="fa fa-file"></i>
                                </div>
                            </div>
                            <div class="box">
                                <div class="box-header">
                                    <h3 class="box-title">上传成绩表格</h3>
                                </div>
                                <div class="box-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group date">
                                                <input id="datepicker" type="text" class="form-control text-center" placeholder="请选择日期">
                                                <button role="dateComfirm" class="btn btn-success dateComfirm">确认日期</button>
                                                <button role="dateReset" class="btn btn-info dateReset">重置日期</button>
                                            </div>
                                            <div class="form-group file">
                                                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                                                <input id="file-1" type="file" multiple class="file" data-overwrite-initial="false" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="box expanded-box collapsed-box">
                                <div class="box-header">
                                    <h3 class="box-title">最近上传文件</h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse">
                                            <i class="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="box-body">
                                    <table id="fileList" class="table table-striped">
                                        <tbody>
                                            <tr>
                                                <th>#</th>
                                                <th>上传用户</th>
                                                <th>名称</th>
                                                <th>上传时间</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <ul class="timeline">
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <footer class="main-footer">
                <div class="pull-right hidden-xs">
                    <b>Version</b> 0.2.1 - 20170415
                </div>
                <strong> Developed By <a href="https://blog.alexv525.com/">Alex Vicnent</a>.</strong> 2014-2017 All rights reserved.
            </footer>
            <aside class="control-sidebar control-sidebar-dark">
                <div class="tab-content">
                    <div class="tab-pane" id="control-sidebar-home-tab"></div>
                </div>
            </aside>
            <div class="control-sidebar-bg"></div>
        </div>
        <!-- Modal Section -->
        <div class="modal fade" id="defaultModal" tabindex="-1" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title text-center" id="defaultModal-title"></h4>
                    </div>
                    <div class="modal-body text-center" id="defaultModal-body"></div>
                    <div class="modal-footer" id="defaultModal-footer">
                        <button type="button" class="btn btn-outline" data-dismiss="modal">确认</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="changepwModal" tabindex="-1" role="dialog" aria-labelledby="changepwModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title text-center custom-font text-lightred" id="changepwModal-title">更改密码</h3>
                    </div>
                    <div class="modal-body text-center" id="changepwModal-body">
                        <span>原密码　：<input type="password" class="text-center" id="changepwModal-body-oldpw" placeholder="输入您的旧密码"></span>
                        <hr />
                        <span>新密码　：<input type="password" class="text-center" id="changepwModal-body-newpw" maxlength="16" placeholder="最长16位字符"></span>
                        <span>确认密码：<input type="password" class="text-center" id="changepwModal-body-renewpw" maxlength="16" placeholder="重新输入新密码"></span>
                    </div>
                    <div class="modal-footer" id="changepwModal-footer">
                        <button class="btn btn-success" id="passwordConfirm" disabled><i class="fa fa-arrow-right"></i> 确认</button>
                        <button class="btn btn-danger" data-dismiss="modal"><i class="fa fa-arrow-left"></i> 取消</button>
                    </div>
                </div>
            </div>
        </div>
        <script src="/new/vendor/jQuery/jquery-2.2.3.min.js"></script>
        <script src="/new/vendor/bootstrap/js/bootstrap.min.js"></script>
        <script src="/assets/vendor/raven-v3.14.0/raven.min.js"></script>
        <script src="/new/vendor/slimScroll/jquery.slimscroll.min.js"></script>
        <script src="/new/vendor/fastclick/fastclick.min.js"></script>
        <script src="/new/vendor/pace/pace.min.js"></script>
        <script src="/assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script src="/assets/vendor/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>
        <script src="/assets/vendor/bootstrap-fileinput/js/fileinput.min.js"></script>
        <script src="/assets/vendor/bootstrap-fileinput/js/locales/zh.js"></script>
        <script src="/assets/vendor/bootstrap-fileinput/themes/explorer/theme.js"></script>
        <script src="/assets/vendor/sweetalert/sweetalert.min.js"></script>
        <script src="/new/js/app.min.js"></script>
        <script src="/new/js/demo.js"></script>
    </body>
</html>
