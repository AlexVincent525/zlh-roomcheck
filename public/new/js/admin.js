"use strict";

$(document).ready(function(){
	$('input[type=checkbox]').iCheck({
		checkboxClass: 'icheckbox_flat'
	});
	$('input[data-kind=paid]')
	.on('ifClicked', function() {
		var $this = $(this);
		var checkStatus = $this.is(':checked');
		var changeType = "paid";
		if (checkStatus == true) {
			var changeStatus = 1;
		} else {
			var changeStatus = 0;
		}
		var fileId = $this.attr('data-file-id');
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
			}
		});
		$.ajax({
			url: '/admin/fileStatus/change',
			type: 'POST',
			dataType: 'JSON',
			cache: false,
			timeout: 3000,
			data: "fileId=" + fileId + "&change=" + changeType + "&status=" + changeStatus,
			success: function (data) {
				if (data.status != 1) {
					paidFailedShow();
					updateCheckbox($this, checkStatus);
				}
			},
			error: function () {
				paidFailedShow();
				updateCheckbox($this, checkStatus);
			}
		});
	});
})