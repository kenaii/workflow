<?php
	error_reporting(0);
	require_once "../config/db_connect.php";
	
	if($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (isset($_GET['update_process_state_by_uid'])) {
			$query = "UPDATE tr_dataset_list SET processDate = NOW(), processState = " . $_GET['process_state'] . " WHERE datasetUID = " .$_GET['update_process_state_by_uid'];
			if($result = mysql_query($query)) {
				echo json_encode(1);
			}			
			else {
				echo json_encode(NULL);
			}		
		}
		else {
			if (isset($_GET['datasetUID'])) {
				$query = "SELECT workflowJSON FROM tr_dataset_workflow WHERE datasetUID=". $_GET['datasetUID'];
				$result_array = array();
				if($result = mysql_query($query)) {
					while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
						$result_array[] = $row;
					};
					if (count($result_array) > 0) {
						echo json_encode($result_array);	
					}
					else {
						echo json_encode(NULL);
					}
				}			
			}
			else {
				if (isset($_GET['category'])) {
					if ($_GET['request_type'] == 1) {
						$query = "INSERT INTO tr_dataset_list(datasetID, datasetCategory, datasetSubject, datasetContents, datasetTag, userID, username, userEmail, managerName, managerEmail, linkID, signDate, dataState, processState, openState, dataType, whoState, versionInfo, delState) VALUES(0, '" . $_GET['category'] . "', '" . $_GET['subject'] . "', '" . $_GET['contents'] . "', '" .  $_GET['input_tag'] . "', '" . $_GET['user_id'] . "', '" . $_GET['user_name'] . "', '" . $_GET['user_email'] . "', '" . $_GET['manager_name'] . "', '" . $_GET['manager_email'] . "', 0, NOW(), " . $_GET['data_state'] . ", " . $_GET['process_state'] . ", '". $_GET['open_state'] . "', 2, 1, '" . $_GET['version_info'] . "', '1')";
						if($result = mysql_query($query)) {
							echo json_encode(mysql_insert_id());
						}			
						else {
							echo json_encode(NULL);
						}
					}
					else {
						if ($_GET['request_type'] == 2) {
							$query = "UPDATE tr_dataset_list SET datasetID = 0, datasetCategory = '" . $_GET['category'] . "', datasetSubject='" . $_GET['subject'] . "', datasetContents = '" . $_GET['contents'] . "', datasetTag = '" .  $_GET['input_tag'] . "', userID = '" . $_GET['user_id'] . "', username = '" . $_GET['user_name'] . "', userEmail = '" . $_GET['user_email'] . "', managerName = '" . $_GET['manager_name'] . "', managerEmail = '" . $_GET['manager_email'] . "', linkID = 0, signDate = NOW(), processDate = " .  $_GET['process_date'] . ", dataState = " . $_GET['data_state'] . ", processState = " . $_GET['process_state'] . ", openState = '". $_GET['open_state'] . "', dataType = 2, whoState = 1, versionInfo = '" . $_GET['version_info'] . "', delState = '1' WHERE datasetUID = " .$_GET['uid'];
							if($result = mysql_query($query)) {
								echo json_encode(1);
							}			
							else {
								echo json_encode(NULL);
							}
						}
					}
				}
				else {
					if (isset($_GET['tr_dataset_list'])) {
						$query = "SELECT * FROM tr_dataset_list WHERE datasetUID=". $_GET['tr_dataset_list'];
						$result_array = array();
						if($result = mysql_query($query)) {
							while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
								$result_array[] = $row;
							};
							if (count($result_array) > 0) {
								echo json_encode($result_array);	
							}
							else {
								echo json_encode(NULL);
							}
						}	
					}
					else {
						if (isset($_GET['tr_workflow_datasetuid'])) {
							$query = "SELECT COUNT(datasetUID) as cnt FROM tr_workflow WHERE datasetUID=". $_GET['tr_workflow_datasetuid'];
							$result_array = array();
							if($result = mysql_query($query)) {
								while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
									$result_array[] = $row;
								};
								if (count($result_array) > 0) {
									echo json_encode($result_array);	
								}
								else {
									echo json_encode(NULL);
								}
							}	
						}
						else {
							/* load db & tables & columns */
							if(isset($_GET['load_db'])) {
								$query = "SELECT edl_idx as 'id', 'Database' as 'type', edl_eng_name as 'name' FROM chu_db_list";
							}
							if(isset($_GET['q'])) {
								if ($_GET['q'] == 2) {
									$query = "SELECT CONCAT('tb', etl_idx) as 'key', " . $_GET['q'] . " as parent_key, etl_ref as name, 'Table' as type FROM chu_tb_list WHERE edl_idx = '". $_GET['q'] ."' ORDER BY etl_ref <> 'nis_t20_2009', etl_ref <> 'nis_t30_2009', etl_ref <> 'nis_t40_2009', etl_ref <> 'nis_t53_2009'"; 	
								}		
								else {
									$query = "SELECT CONCAT('tb', etl_idx) as 'key', " . $_GET['q'] . " as parent_key, etl_ref as name, 'Table' as type FROM chu_tb_list WHERE edl_idx = '". $_GET['q'] ."'";	
								}
							}
							if(isset($_GET['f'])) {
								$query = "SELECT ecl_eng_name as column_name, 'varchar' as type FROM chu_col_list_ref WHERE etl_idx = substring('" . $_GET['f'] . "', 3)";
							}
							$result_array = array();
							if($result = mysql_query($query)) {
						
								while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
									$result_array[] = $row;
								};
								if (count($result_array) > 0) {
									echo json_encode($result_array);	
								}
								else {
									echo json_encode(NULL);
								}
							}
						}
					}	
				}
			}
		}
	}
	
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['saveWorkflow'])) {
			$query;
			if ($_POST['saveWorkflow']['request_type'] == 1) {
				$query = "INSERT INTO tr_dataset_workflow(datasetUID, workflowJSON) VALUES(" . $_POST['saveWorkflow']['datasetUID'] . ", '" . mysql_real_escape_string($_POST['saveWorkflow']['workflowJSON']) . "')";
			}
			else {
				if ($_POST['saveWorkflow']['request_type'] == 2) {
					$query = "UPDATE tr_dataset_workflow SET workflowJSON = '" . mysql_real_escape_string($_POST['saveWorkflow']['workflowJSON']) . "' WHERE datasetUID = " . $_POST['saveWorkflow']['datasetUID'];
				}
			}
			if($result = mysql_query($query)) { 
				echo json_encode(1); 
			}
			else { 
				echo json_encode(NULL); 
			}
		}
		else {
			if (isset($_POST['tr_workflow'])) {
				$query = "INSERT INTO tr_workflow(datasetUID, tw_json, tw_regdate) VALUES(" . $_POST['tr_workflow']['datasetUID'] . ", '" . mysql_real_escape_string($_POST['tr_workflow']['workflowJSON']) . "', NOW())";
				if($result = mysql_query($query)) {
					echo json_encode(1);
				}
				else {
					echo json_encode(NULL);
				}
			}
		}
	}
?>