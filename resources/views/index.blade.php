<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>宿舍成绩查询</title>
    <link rel="stylesheet" type="text/css" href="assets/vendor/bootstrap-v3.3.1/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/vendor/bootstrap-v3.3.1/css/bootstrap-theme.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/vendor/bootstrap-table/bootstrap-table.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/animate.min.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
</head>
<body class="animated fadeIn">
    <div id="loading">
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
            <span>正在加载<br />请稍后...</span>
        </div>
    </div>
	<div class="container op-0">
        <div class="userProfile">
            <div class="userAvatar">
                <a id="userRefresh" class="btn circleBtn">
                    <span class="glyphicon glyphicon-refresh"></span>
                </a>
                <div class="userAvatar avatar">
                    <a href="/">
                        <img src="/assets/image/avatar.png" alt="" />
                    </a>
                </div>
                <a id="userContact" class="btn circleBtn" data-toggle="modal" data-target="#telModal">
                    <span class="glyphicon glyphicon-earphone"></span>
                </a>
            </div>
            <div class="userInfo">
                <h3 class="userName">集大水院自律会</h3>
                <!--<span class="userNotice"><i class="littlered"></i>最新成绩已更新到6月8日</span>-->
            </div>
        </div>
        <div class="billList">
            <div class="billListCategory">
                <a class="billListCategory switched">成绩查询</a>
            </div>
            <div class="billListTable">
            	<div class="listSearch row">
                    <div class="col-md-4" style="margin:10px auto">
                        <span>日　期：</span>
                        <input id="datepicker" type="text" class="form-control datepicker" placeholder="请选择日期" readonly>
                    </div>
                    <div class="col-md-4" style="margin:10px auto">
                        <span>宿舍号：</span>
                        <input id="roompicker" type="text" class="form-control" placeholder="例：13#101、504、7#">
                    </div>
                    <div class="col-md-4">
            		<button id="tableFetch" class="btn" id="search">查询</button>
                    </div>
            	</div>
                <table id="table">
                </table>
            </div>
        </div>
        <div class="modal fade" id="telModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                            &times;
                        </button>
                        <h4 class="modal-title text-center" id="myModalLabel">
                            集美大学水产学院自律会宿管部
                        </h4>
                    </div>
                    <div class="modal-body text-center">
                        负责人联系QQ：2252994060
                    </div>
                </div>
            </div>
        </div>
	</div>
    <script type="text/javascript">
        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(
            unescape("%3Cspan class='hidden' id='cnzz_stat_icon_1261736809'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1261736809' type='text/javascript'%3E%3C/script%3E")
        );
    </script>
    <script src="/assets/vendor/jquery-v1.11.3/jquery.min.js"></script>
    <script src="/assets/vendor/bootstrap-v3.3.1/js/bootstrap.min.js"></script>
    <script src="/assets/vendor/raven-v3.14.0/raven.min.js"></script>
    <script src="/assets/vendor/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="/assets/vendor/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
    <script src="/assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="/assets/vendor/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min.js"></script>
    <script src="/assets/js/index.js"></script>
</body>
</html>