<?php
error_reporting(0);
include_once('../../common.php');
?>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1.0">
</head>
<body>
<div id="container" style="display: none;">
	<div id="header">
		<div style="border: 1px solid #ddd;">		
			<ul class="nav nav-tabs">
				<li class="active"><a data-toggle="tab" href="#db">데이터 베이스</a></li>
				<li class="disabled"><a href="#table">테이블</a></li>		
			</ul>
			<div class="tab-content">
				<div id="db" class="tab-pane active"></div>
				<div id="table" class="tab-pane"></div>
			</div>
		</div>
	</div>

	<div id="main">
		<div id="leftbar">
			<div id="left-side" style="height: 100%;"></div>
		</div>
		
		<div id="rightbar">
			<div id="content" style="height: 100%;"></div>
		</div>
	</div>

	<div id="footer">
		<div style="display: table; width: inherit; height: inherit;">
			<div style="display: table-cell; vertical-align: middle; text-align: right;">
				<button type="button" class="btn btn-primary" id="btnJsonShow">다운로드</button>
				<button type="button" class="btn btn-primary" id="btnExecute" value="0">데이터셋 생성 요청</button>
			</div>
		</div>
	</div>
</div>

<div id="create_request" class="border_box" style="background:#fff; display:none; position:absolute; width:800px; height:850px; padding:30px; border-top:none; margin-bottom:100px; overflow:hidden; z-index:999; font-family:'Noto Sans KR', sans-serif; font-size:12px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
	<form id="signupForm">
		<table align="center" class="input_table">
			<tbody>
			<tr>
				<th>카테고리</th>
				<td><input type="text" name="category" value="테스트카테고리" class="border_none_input" readonly=""></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>제목</th>
				<td><input type="text" id="subject" name="subject" placeholder="제목" value="" class="border_none_input" required></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>설명</th>
				<td><textarea name="contents" placeholder="설명" class="border_none_input" style="resize:none;height:100px;line-height:normal;font-family:'Noto Sans KR', sans-serif;"></textarea></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>태그</th>
				<td><input type="text" id="inputTag" name="inputTag" placeholder="eg,economy,mental health,government" value="" class="border_none_input"></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>공개</th>
				<td style="border:none;">
					<label><input type="radio" value="1" name="openState" checked="checked">공개</label>
					<label><input type="radio" value="2" name="openState" style="margin-left:20px;">비공개</label>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>버전</th>
				<td><input type="text" name="dataSetVersion" placeholder="1.0" value="" class="border_none_input"></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>저자</th>
				<td><input type="text" id="userName" name="userName" placeholder="저자 이름" value="" class="border_none_input"></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>저자 이메일</th>
				<td><input type="text" id="userEmail" name="userEmail" placeholder="bogun@example.com" value="" class="border_none_input"></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>대표저자</th>
				<td><input type="text" name="managerName" placeholder="대표저자 이름" value="" class="border_none_input"></td>
			</tr>
			<tr>
				<td colspan="2" style="border:none;height:0px;padding:0;"></td>
			</tr>
			<tr>
				<th>대표저자 이메일</th>
				<td><input type="text" name="managerEmail" placeholder="bogun@example.com" value="" class="border_none_input"></td>
			</tr>
			</tbody>
		</table>		

		<div class="pull-right">
			<input class="submit_btn" type="button" id="create_dataset" value="워크플로우 임시 저장">	
			<input class="submit_btn" type="button" id="create_run_dataset" value="저장 후 실행">
			<input class="submit_btn" type="button" id="create_cancel" value="닫기">
		</div>
	</form>		
</div>
	
</body>

<script src="js/vendor/jquery-1.12.0.min.js"></script>
<script src="js/vendor/bootstrap.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">	
<link rel="stylesheet" href="css/plugins.css">

<script src="js/workflow.js/go.js"></script>
<script src="js/workflow.js/dialog.js"></script>
<script src="js/workflow.js/main.js"></script>
<script src="js/workflow.js/sinario.js"></script>
<script src="js/workflow.js/jquery.validate.min.js"></script>
<!-- Stylesheets 
-->
<!-- Bootstrap is included in its original form, unaltered -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<!-- The main stylesheet of this template. All Bootstrap overwrites are defined in here -->

<link rel="stylesheet" href="css/main.css">

<link rel="stylesheet" href="css/themes.css">

<script src="js/chosen_v1.8.2/chosen.jquery.js"></script>
<!-- <link rel="stylesheet" href="js/chosen_v1.8.2/chosen.css"> -->

<?php
	echo	
		'<script type="text/javascript">',
			'datasetUID = -1;',
		'</script>';
	if (isset($_GET['sinario'])) {
		echo	
		'<script type="text/javascript">',
			'run('.$_GET['sinario'].');',
		'</script>';
	}
	else {
		if (isset($_GET['datasetUID'])) {
			echo	
			'<script type="text/javascript">',
				'loadFromDb('.$_GET['datasetUID'].');',
			'</script>';
		}	
	}
?>

<style type="text/css">
/* Create request popup style */
.input_table {
    width: 80%;
    margin-top: 10px;
    margin-bottom: 40px;
    border: none;
    border-spacing: 10px;
    border-collapse: separate;
}
.input_table th {
    width: 130px;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: #333;
    font-weight: 400;
    border-radius: 5px;
    text-align: right;
    padding-right: 30px;
    vertical-align: middle;
    overflow: hidden;
}
.input_table td {
    padding: 0;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    color: #606060;
    border: 1px solid #ccc;
    font-weight: 300;
    border-radius: 5px;
    text-align: left;
    background: #fff;
    vertical-align: middle;
    overflow: hidden;
}
.border_none_input {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: none;
    box-sizing: border-box;
	border-radius: 5px;
    padding: 5px;
}
.submit_btn {
    border: solid 1px #e5e5e5;
    color: #333;
    background-color: #fff;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    margin: 0 2px;
    cursor: pointer;
    -webkit-transition-duration: 0.1s;
    transition-duration: 0.1s;
}
.submit_btn:hover { 
	background-color: #119ee6; 
	color: #fff; 
}
.border_box {
    border: solid 1px #e5e5e5;
    box-sizing: border-box;
}
form.signup label.error, label.error {
	color: red;
	font-style: italic
}
</style>
<script>
	/* request_type 1 -> insert, 2 -> update */ 
	function saveDataset(request_type, data_state, process_state = 0, process_date = false) {
		var status = true;
		var category = $("input[name=category]").val();
		var subject = $("input[name=subject]").val();
		var contents = $("textarea[name=contents]").val();
		var input_tag = $("input[name=inputTag]").val();
		var open_state = $("input[name=openState]:checked").val();
		var version_info = $("input[name=dataSetVersion]").val();
		var user_name = $("input[name=userName]").val();
		var user_email = $("input[name=userEmail]").val();
		var manager_name = $("input[name=managerName]").val();
		var manager_email = $("input[name=managerEmail]").val();
		
		var user_id = "<?=$_SESSION['ss_mb_id']?>";
		get_request = "request_type=" + request_type + "&category=" + category + "&subject=" + subject + "&contents=" + contents + "&input_tag=" + input_tag + "&data_state=" + data_state + "&process_state=" + process_state + "&open_state=" + open_state + "&version_info=" + version_info + "&user_id=" + user_id + "&user_name=" + user_name + "&user_email=" + user_email + "&manager_name=" + manager_name + "&manager_email=" + manager_email;
		if (process_date) {
			get_request += "&process_date=NOW()";
		}
		else {
			get_request += "&process_date=null";
		}

		if (request_type === 2 && datasetUID != -1) {
			get_request += "&uid=" + datasetUID;
		}

		if (request_type === 1) {
			var response = getRequestAjax(get_request);
			if (response != null) {
				datasetUID = response;
			}
			else {
				status = false;
			}
		}
		else {
			var response = getRequestAjax(get_request);
			if (response === null) {
				status = false;
			}
		}
		
		if (status === true && datasetUID != -1) { 
			var obj = {"saveWorkflow": {"request_type": request_type, "datasetUID": datasetUID, "workflowJSON": JSON.stringify(save())}};
			if (postRequestAjax(obj) != null) { status = true; } 
			else { status = false; }
		}
		return status;
	}
	
	$(document).on("click", "#create_dataset", function() {
		if($("#signupForm").valid()) {
			var request_type = 2;
			if (datasetUID === -1) {
				request_type = 1;
			}
			if (saveDataset(request_type, 2, 0)) {
				alert("Successfully saved for your workflow with temp mode");
				$("#create_request").css("display", "none");
			}
			else {
				alert("Unsuccessfully saved for your workflow with temp mode");
			}
		}
	});
	
	$(document).on("click", "#create_run_dataset", function() {
		if($("#signupForm").valid()) {
			var status = false;
			if (datasetUID === -1) {
				status = saveDataset(1, 1, 0);
			}
			else {
				status = saveDataset(2, 1, 0, true);
			}
			if (status === true && datasetUID != -1) {
				var generated_queries = JSON.parse(executeFlow());
				generated_queries.serverRequest.datasetUID = datasetUID;
				var obj = {"tr_workflow": {"datasetUID": datasetUID, "workflowJSON": JSON.stringify(generated_queries.serverRequest)}};
				if (postRequestAjax(obj) != null) {
					var get_request = "process_state=5&update_process_state_by_uid=" + datasetUID;
					if (getRequestAjax(get_request) != null) {
						alert("Successfully saved for your workflow with execute mode");
						$("#btnExecute").text("정보를 표시하다");
						$("#btnExecute").val(1);		
						$("#create_request").css("display", "none");
					}
					else { alert("Unsuccessfully saved for your workflow with execute mode"); }
				}
			}
		}
	});

	$("#signupForm").validate({
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().prev());
		},
		rules: {
			subject: "required",
			inputTag: "required",
			userName: "required",
			userEmail: {
				required: true,
				email: true
			} 
		},
		messages: {
			subject: "*",
			inputTag: "*",
			userName: "*",
			userEmail: "*"	
		}
	});

	function getRequestAjax(url) {
		var response = null;
		$.ajax({
			async: false,
			method: "GET",
			url: "../controller/ajax.php?" + url,
			dataType: "json",
			success: function(data) {
				response = data;
				console.log("getRequestAjax successfully");
			},
			error: function(e) {
				console.log('getRequestAjax unsuccessfully');
				console.log(e);
				response = null;
			},
		});
		return response;
	}

	function postRequestAjax(obj) {
		var response = null;
		$.ajax({
			async: false,
			method: "POST",
			url: "../controller/ajax.php",
			dataType: "json",
			data: obj,
			success: function(data) {
				console.log("postRequestAjax successfully");
				response = data;
			},
			error: function(e) {
				console.log('postRequestAjax unsuccessfully:');
				console.log(e);
				response = null;
			},
		});
		return response;
	}

</script>
