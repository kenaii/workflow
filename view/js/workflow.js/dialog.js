(function($) {		

	$(document).on("click", "#merge_add", function() {
		var json = $.merge_dialog.json;
		var tables = json.objects.tables;
		var cols_h = tables.length;
		var row = $('<tr></tr>').appendTo($('#basicTable'));
		
		for (var j = 0; j < cols_h; j ++) {
			var td = $('<td></td>').appendTo(row); 			
			var cols = json.objects.columns[j].cols;
			
			var sel=$('<select />').attr({}).addClass('form-control merge_col' + j);
			for (k = 0; k < cols.length; k ++) {
				sel.append($('<option/>').text(cols[k]['column_name']));	
			}

			var	in_group=$('<div/>').addClass('input-group');
			($.merge_dialog.rowid > 0 && j === 0) ? in_group.appendTo(td) : null; 
			in_group.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
			($.merge_dialog.rowid > 0 && j === 0) ? sel.appendTo(in_group) : sel.appendTo(td);		
		}
		$.merge_dialog.rowid ++;
	});
	
	function add_merge_save(merged_data) {
		var json = $.merge_dialog.json;
		var tables = json.objects.tables;
		var cols_h = tables.length;
				
		for(i = 0; i < merged_data.objects.columns[0].cols.length; i ++) {
			var row = $('<tr></tr>').appendTo($('#basicTable'));
			for (var j = 0; j < cols_h; j ++) {
				var td = $('<td></td>').appendTo(row); 			
				var cols = json.objects.columns[j].cols;
				
				var sel=$('<select/>').attr({}).addClass('form-control merge_col' + j);
				
				var merged_cols = merged_data.objects.columns[j].cols;
				
				var bool;
			
				for (k = 0; k < cols.length; k ++) {
					bool = false;					
					if (cols[k]['column_name'] === merged_cols[i]['column_name']) {
						bool = true;
					}
					sel.append($('<option/>').attr({'selected': bool}).text(cols[k]['column_name']));	
				}
				var	in_group=$('<div/>').addClass('input-group');
				($.merge_dialog.rowid > 0 && j === 0) ? in_group.appendTo(td) : null; 
				in_group.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
				($.merge_dialog.rowid > 0 && j === 0) ? sel.appendTo(in_group) : sel.appendTo(td);		
			}
			$.merge_dialog.rowid ++;
		}
	}
	
	$(document).on("click", "#case1", function() {	
		caseOneSave();
	});	
	
	function addWhenThree(check_first) {
		var columns = $.new_column_dialog.columns;
		var option2=$('<div/>').addClass('row');
		if (check_first) {
			$('#dialog-sub_content').empty();
			option2.appendTo('#dialog-sub_content');
		}
		else { 
			$(option2).insertBefore('#whenelse');
		}
		$('<div/>').addClass('col-sm-1').append($('<p/>').text('WHEN')).appendTo(option2);
		
		var when_container = $('<div/>').addClass('row');
		var left_controls = $('<div/>').css({'float':'left', 'width':'85%'}).attr({'id': 'when_left_' + $.new_column_dialog.rowid}).addClass('when_left');
			left_controls.appendTo(when_container);
		var right_controls = $('<div/>').css({'float':'right', 'width':'15%', 'margin-top':'13.5px'}).attr({'id': 'when_right_' + $.new_column_dialog.rowid}).addClass('when_right');
			right_controls.appendTo(when_container);
			when_container.insertAfter(option2);		
		var div_then=$('<div/>').addClass('row');
		div_then.insertAfter(when_container);
		$('<div/>').addClass('col-sm-1').append($('<p/>').text('THEN')).appendTo(div_then);
		$('<div/>').addClass('col-sm-2').append($('<input/>').attr({type: 'text'}).addClass('form-control cond_val2')).appendTo(div_then);
		$('<div/>').addClass('col-sm-4').append($('<button/>').attr({id: 'addinsidewhen', 'rowid': $.new_column_dialog.rowid}).addClass('btn btn-default').text('+ Add')).appendTo(div_then);
		
		$.new_column_dialog.nested_rowid[$.new_column_dialog.rowid] = 0;
		addWhenInside($.new_column_dialog.rowid);
		if (check_first) {
			var option5=$('<div />').addClass('row').attr({'id': 'whenelse'});
				option5.appendTo('#dialog-sub_content');
			$('<div/>').addClass('col-sm-1').append($('<p/>').text('ELSE')).appendTo(option5);
			$('<div/>').addClass('col-sm-4').append($('<input/>').attr({type: 'text', id: 'else_val'}).addClass('form-control')).appendTo(option5);
			$('<div/>').addClass('col-sm-4').append($('<button/>').attr('id', 'addwhen').addClass('btn btn-default').text('+ Add')).appendTo(option5);
		}
		$.new_column_dialog.rowid ++;
	}

	$(document).on("click", "#addinsidewhen", function() {
		addWhenInside($(this).attr('rowid'), true);
	});	

	function addWhenInside(id, has_logic=false) {
		var columns = $.new_column_dialog.columns;
		var option3=$('<div/>').addClass('row').append($('<div/>').addClass('col-sm-1'));
		option3.appendTo($('#when_left_' + id));
		var sel_col3=$('<select/>').addClass('form-control column_select');
			for(i = 0; i < columns.length; i ++) {
				sel_col3.append($('<option/>').val('').text(columns[i]['column_name']));	
			}
				
		var row_1 = $('<div/>').addClass('col-sm-4').appendTo(option3);
		var	row_0=$('<div/>').addClass('input-group');
		(id == 0 && $.new_column_dialog.nested_rowid[id] == 0) == true ? null : row_0.appendTo(row_1);
		row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-when-filter" rowid=' + id + '_' + $.new_column_dialog.nested_rowid[id] + ' style="cursor: pointer;"></i></span>');
		
		(id == 0 && $.new_column_dialog.nested_rowid[id] == 0) == true ? sel_col3.appendTo(row_1) : sel_col3.appendTo(row_0);
		
		var sel2=$('<select/>').addClass('form-control operator_select');
			sel2.append($('<option/>').val('').text('='));
			sel2.append($('<option/>').val('').text('>'));
			sel2.append($('<option/>').val('').text('>='));
			sel2.append($('<option/>').val('').text('<'));
			sel2.append($('<option/>').val('').text('<='));
			sel2.append($('<option/>').val('').text('!='));
				
		$('<div/>').addClass('col-sm-2').append(sel2).appendTo(option3);	
		
		var value=$('<input/>').addClass('form-control cond_val1').attr({ type: 'text', id: 'cond_val1'});
		$('<div/>').addClass('col-sm-5').append(value).appendTo(option3);
		if (has_logic) {
			var row=$('<div/>').css({'text-align': 'center', 'padding-top': '5px'});
			row.appendTo('#when_right_' + id);
			
			var sel=$('<select/>').attr({'id': 'logical_filter2_' + id + '_' + $.new_column_dialog.nested_rowid[id]}).addClass('form-control logical').css({'width': '80%', 'margin-left': 'auto', 'margin-right': 'auto'}).append($('<option/>').val('').text('OR'));
			sel.append($('<option/>').text('AND'));
			sel.appendTo(row);
		}
		$.new_column_dialog.nested_rowid[id] ++;
	}

	function addWhenInsideSave(id, column, operator, value, logical) {
		var columns = $.new_column_dialog.columns;
		var option3=$('<div/>').addClass('row').append($('<div/>').addClass('col-sm-1'));
		option3.appendTo($('#when_left_' + id));
		var sel_col3=$('<select/>').addClass('form-control column_select');
			for(k = 0; k < columns.length; k ++) {
				var bool = false;
				if (columns[k]['column_name'] == column) {
					bool = true;
				}
				sel_col3.append($('<option/>').attr({'selected': bool}).val('').text(columns[k]['column_name']));	
			}
				
		var row_1 = $('<div/>').addClass('col-sm-4').appendTo(option3);
		var	row_0=$('<div/>').addClass('input-group');
		(id == 0 && $.new_column_dialog.nested_rowid[id] == 0) == true ? null : row_0.appendTo(row_1);
		row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-when-filter" rowid=' + id + '_' + $.new_column_dialog.nested_rowid[id] + ' style="cursor: pointer;"></i></span>');
		
		(id == 0 && $.new_column_dialog.nested_rowid[id] == 0) == true ? sel_col3.appendTo(row_1) : sel_col3.appendTo(row_0);
		
		var sel2=$('<select/>').addClass('form-control operator_select');
			var operators = ['=', '>', '>=', '<', '<=', '!='];
			for (k = 0; k < operators.length; k ++) {
				var bool = false;
				if (operators[k] == operator) {
					bool = true;
				}	
				sel2.append($('<option/>').val('').attr({'selected': bool}).text(operators[k]));	
			}	
		$('<div/>').addClass('col-sm-2').append(sel2).appendTo(option3);	
		
		var value=$('<input/>').addClass('form-control cond_val1').attr({ type: 'text', id: 'cond_val1'}).val(value);
		$('<div/>').addClass('col-sm-5').append(value).appendTo(option3);
		if (typeof logical != "undefined") {
			var row=$('<div/>').css({'text-align': 'center', 'padding-top': '5px'});
			row.appendTo('#when_right_' + id);
			var bool = false;
			if (logical == "AND") {
				bool = true;
			}
			var sel=$('<select/>').attr({'id': 'logical_filter2_' + id + '_' + $.new_column_dialog.nested_rowid[id]}).addClass('form-control logical').css({'width': '80%', 'margin-left': 'auto', 'margin-right': 'auto'}).append($('<option/>').val('').text('OR'));
			sel.append($('<option/>').text('AND').attr({'selected': bool}));
			sel.appendTo(row);
		}
		$.new_column_dialog.nested_rowid[id] ++;
	}

	function caseOneSave() {
		var columns = $.new_column_dialog.columns;		
		var equation = $.new_column_dialog.equation;
		$('#dialog-sub_content').empty();
		var option1=$('<div />').addClass('row').css({'height': '90%', 'margin-right': '2px', 'margin-top': '15px'});
			option1.appendTo('#dialog-sub_content');
			
		var	left_div = $('<div />').addClass('col-sm-4').css({'height': '100%'});
			left_div.appendTo(option1);
			
		var sel1=$('<select/>').attr({id: 'case_col', size: 10}).css({'width': '100%', 'height': '100%', 'border-radius': '4px', 'border': '1px solid rgb(221, 221, 221)'});
			for(i = 0; i < columns.length; i ++) {
				sel1.append($('<option/>').attr({'data-x': columns[i]['type']}).val('').text(columns[i]['column_name']));
			}
			sel1.appendTo(left_div);
			
		var right_div = $('<div />').addClass('col-sm-8').css({'height': '100%'});
			right_div.appendTo(option1);
			
			$('<div>').css({'height': '100%'}).addClass('col-sm-12').append($('<textarea/>').attr({id: 'equation', spellcheck: false}).css({'height': '100%', 'width': '100%'}).addClass('form-control')).appendTo(right_div);	
			equation != null ? $('#equation').val(equation) : null;
	}
	
	function caseTwoSave(columns, filter, else_val) {
		var columns = $.new_column_dialog.columns;
		var filter = $.new_column_dialog.filter;
		var else_val = $.new_column_dialog.else_val;
		$('#dialog-sub_content').empty();
		for (i = 0; i < filter.length; i ++) {
			var option2=$('<div />').addClass('row');
			if (i === 0) {
				var option1=$('<div />').addClass('row');
				option1.appendTo('#dialog-sub_content');
							
				$('<div/>').addClass('col-sm-1').append($('<p/>').text('CASE')).appendTo(option1);

				option2.appendTo('#dialog-sub_content');
				
				var option4=$('<div />').addClass('row').attr({'id': 'whenelse'});
				option4.appendTo('#dialog-sub_content');

				$('<div/>').addClass('col-sm-1').appendTo(option4);
				$('<div/>').addClass('col-sm-1').append($('<p/>').text('ELSE')).appendTo(option4);
				$('<div/>').addClass('col-sm-4').append($('<input/>').attr({type: 'text', id: 'else_val', value: else_val}).addClass('form-control')).appendTo(option4);
				$('<div/>').addClass('col-sm-4').append($('<button/>').attr('id', 'addwhen').addClass('btn btn-default').text('+ Add')).appendTo(option4);
			}
			else { 
				$(option2).insertBefore('#whenelse');
			}
			$('<div/>').addClass('col-sm-1').append($('<p/>').text('WHEN')).appendTo(option2);
			
			var sel1=$('<select/>').addClass('form-control column_select');		
				for (j = 0; j < columns.length; j ++) {
					bool = false;			
					if (filter[i]['column_name'] == columns[j]['column_name']) {
						bool = true;
					}
					sel1.append($('<option/>').attr({'selected': bool}).val('').text(columns[j]['column_name']));		
				}
				$('<div/>').addClass('col-sm-3').append(sel1).appendTo(option2);
				
			
			operators = ["=", ">", ">=", "<", "<=", "!="];
			var sel2=$('<select/>').addClass('form-control operator_select');
				for (j = 0; j < operators.length; j ++) {
					bool = false;
					if (filter[i]['operator'] == operators[j]) {
						bool = true;
					}
					sel2.append($('<option/>').attr({'selected': bool}).val('').text(operators[j]));
				}
				$('<div/>').addClass('col-sm-2').append(sel2).appendTo(option2);
							
			var value=$('<input/>').addClass('form-control cond_val1').attr({ type: 'text', id: 'cond_val1', value: filter[i]['value']});
			$('<div/>').addClass('col-sm-2').append(value).appendTo(option2);	
								
			$('<div/>').addClass('col-sm-1').append($('<p/>').text('THEN')).appendTo(option2);
			$('<div/>').addClass('col-sm-2').append($('<input/>').attr({type: 'text', value: filter[i]['then']}).addClass('form-control cond_val2')).appendTo(option2);
		}
	}

	function caseThreeSave(columns, filter, else_val) {
		var columns = $.new_column_dialog.columns;
		var filter = $.new_column_dialog.filter.when;
		var else_val = $.new_column_dialog.else_val;
		$('#dialog-sub_content').empty();
		console.log(filter.length);
		for (i = 0; i < filter.length; i ++) {	
			var option2=$('<div/>').addClass('row');
			if (i === 0) {
				option2.appendTo('#dialog-sub_content');
				var option5=$('<div />').addClass('row').attr({'id': 'whenelse'});
					option5.appendTo('#dialog-sub_content');
				$('<div/>').addClass('col-sm-1').append($('<p/>').text('ELSE')).appendTo(option5);
				$('<div/>').addClass('col-sm-4').append($('<input/>').attr({type: 'text', id: 'else_val'}).addClass('form-control').val(else_val)).appendTo(option5);
				$('<div/>').addClass('col-sm-4').append($('<button/>').attr('id', 'addwhen').addClass('btn btn-default').text('+ Add')).appendTo(option5);
			}
			else { 
				$(option2).insertBefore('#whenelse');
			}
			$('<div/>').addClass('col-sm-1').append($('<p/>').text('WHEN')).appendTo(option2);
			
			var when_container = $('<div/>').addClass('row');
			var left_controls = $('<div/>').css({'float':'left', 'width':'85%'}).attr({'id': 'when_left_' + $.new_column_dialog.rowid}).addClass('when_left');
				left_controls.appendTo(when_container);
			var right_controls = $('<div/>').css({'float':'right', 'width':'15%', 'margin-top':'13.5px'}).attr({'id': 'when_right_' + $.new_column_dialog.rowid}).addClass('when_right');
				right_controls.appendTo(when_container);
				when_container.insertAfter(option2);		
			var div_then=$('<div/>').addClass('row');
			div_then.insertAfter(when_container);
			$('<div/>').addClass('col-sm-1').append($('<p/>').text('THEN')).appendTo(div_then);
			$('<div/>').addClass('col-sm-2').append($('<input/>').attr({type: 'text'}).addClass('form-control cond_val2').val(filter[i].then)).appendTo(div_then);
			$('<div/>').addClass('col-sm-4').append($('<button/>').attr({id: 'addinsidewhen', 'rowid': $.new_column_dialog.rowid}).addClass('btn btn-default').text('+ Add')).appendTo(div_then);
			
			$.new_column_dialog.nested_rowid[$.new_column_dialog.rowid] = 0;
			var filt = filter[i];

			for (j = 0; j < filt.columns.length; j ++) {
				addWhenInsideSave($.new_column_dialog.rowid, filt.columns[j], filt.operator[j], filt.values[j], filt.logical[j]);
			}
			$.new_column_dialog.rowid ++;
		}
	}
	
	$(document).on("click", "#case2", function() {
		if (typeof $.new_column_dialog.filter == "undefined" || $.new_column_dialog.filter == null) {
			addWhenThree(true);
		}
		else {
			caseTwoSave();
		}			
	});	
	
	$(document).on("click", "#addwhen", function() {
		addWhenThree(false);
	});

	$(document).on("click", "#apply_", function() {
		$('#btn_close').trigger('click');
	});
	
	$(document).on("click", "#apply_filter", function() {
		var has_err = false;
		$(".column_select").each(function () {
			if($(this).parent().hasClass('has-error')) {
				has_err = true;
			}
		});
		if (has_err === false) {
			var col = [], op = [], cond_val = [], log = [];
			var bool = false;
			
			$(".condition_value").each(function () {
				var isDisabled = $(this).prop('disabled');

				if (isDisabled) {
					cond_val.push("");
				}
				else {
					var val = $(this).val();
					if (val.length < 1) {
						bool = true;
						$(this).parent().addClass("has-error");
					}
					else {
						$(this).parent().removeClass("has-error");
						cond_val.push(val);
					}
				}
			});

			if (bool) {
				return;
			}
			
			$(".column_select").each(function () {
				col.push($(this).find(":selected").text());
			});
			
			$(".operator_select").each(function () {
				op.push($(this).find(":selected").text());
			});	
			
			$(".logical").each(function () {
				log.push($(this).find(":selected").text());
			});	
			
			var condition = "";
			var filter = [];
			for(i = 0; i < col.length; i ++) {
				if (i > 0) {
					condition += " " + log[i-1] + " ";
				}
				if (op[i] === "IS NULL" || op[i] === "IS NOT NULL") {
					condition += col[i] + " " + op[i];
				}
				else {
					var value = cond_val[i];
					if (!$.isNumeric(value)) {
						value = "'" + value + "'";
					}
					condition += col[i] + op[i] + value;	
				} 
					
				filter.push({"column_name": col[i], "operator": op[i], "value": cond_val[i]});
			}
			setFilterData(condition, filter, log);
			$('#btn_close').trigger('click');
		}
	});
	
	$(document).on("click", "#apply_deduplication", function() {
		var checked = [];
		$(".column_check:checked").each(function () {
			checked.push({"column_name": $(this).val(), "type": $(this).attr('data-x')});
		});		
		setDeduplicationData(checked);
		$('#btn_close').trigger('click');
	});
	
	$(document).on("click", "#apply_new_column", function() {
		if($('#case1').is(':checked')) { 
			var eq =  $('#equation').val();
			if (eq.length < 1) {
				$("#equation").parent().addClass("has-error");
				return;
			}
			else {
				$("#equation").parent().removeClass("has-error");
			}
			var lastChar = eq[eq.length - 1];
			if (lastChar == " ") { 			// if last char is space then will remove space of equation
				eq = eq.slice(0, -1);
			}
			if (eq )
			condition = eq + " AS " + $('#new_column_name').val();
			setNewColumnData($('#new_column_name').val(), 1, eq, condition);
		}
		else {
			if($('#case2').is(':checked')) { 
				
				var bool1 = false, bool2 = false, cond_val1 = [], cond_val2 = [];
				$(".cond_val1").each(function () {
					var val = $(this).val();
					if (val.length < 1) {
						bool1 = true;
						$(this).parent().addClass("has-error");
					}
					else {
						$(this).parent().removeClass("has-error");
						cond_val1.push(val);
					}
				});
				
				$(".cond_val2").each(function () {
					var val = $(this).val();
					if (val.length < 1) {
						bool2 = true;
						$(this).parent().addClass("has-error");
					}
					else {
						$(this).parent().removeClass("has-error");
						cond_val2.push(val);
					}
				});
				
				if ($("#else_val").val().length < 1) {
					$("#else_val").parent().addClass("has-error");
					return;
				}
				else {
					$("#else_val").parent().removeClass("has-error");
				}
				if (bool1 || bool2) {
					return;
				}

				var condition = "CASE ";
				var when_json = {"when": []};
				$('.when_left').each(function() {
					condition += "WHEN ";
					var col = [], op = [], log = [], val = [];
					$(this).children().find('.column_select').each(function() {
						col.push($(this).find(":selected").text());
					});

					$(this).children().find('.operator_select').each(function() {
						op.push($(this).find(":selected").text());
					});

					$(this).parent().find('.cond_val1').each(function() {
						val.push($(this).val());
					});

					$(this).parent().find('.when_right').each(function() {
						$(this).children().find('.logical').each(function() {
							log.push($(this).find(":selected").text());
						});
					});

					var then = $(this).parent().next().find('.cond_val2').val();

					for (i = 0; i < col.length; i ++) {
						condition += col[i] + " "; 
						condition += op[i] + " ";
						if ($.isNumeric(val[i])) {
							condition += val[i] + " ";	
						}
						else {
							condition += "'" + val[i] + "' ";
						}

					}
					condition += "THEN '" + then + "' ";

					var single_when = new Object();
					single_when.columns = col;
					single_when.operator = op;
					single_when.logical = log;
					single_when.values = val;
					single_when.then = then;
					when_json.when.push(single_when);
				});
				console.log(when_json);
				var else_val = $('#else_val').val();
				condition += "ELSE '" + else_val + "' END AS " + $('#new_column_name').val();
				console.log(condition);
				setNewColumnData($('#new_column_name').val(), 2, null, condition, when_json, else_val);
			}			
		}
		$('#btn_close').trigger('click');
	});
		
	$(document).on("click", "#apply_merge", function() {
		var json = $.merge_dialog.json;
		
		var tables = json.objects.tables;
		var cols_h = tables.length;
	
		var merge_json = {"objects": {"columns": [], "tables": []}};
		
		var merged_columns = [];
		var query = "";
		
		for (var j = 0; j < cols_h; j ++) {
			var columns_table = [];
			query += "SELECT ";
			$(".merge_col" + j).each(function() {
				columns_table.push({"column_name": $(this).find(":selected").text(), "type": "varchar"});
				query += $(this).find(":selected").text() + ",";
				if (j === 0) {
					merged_columns.push({"column_name": $(this).find(":selected").text(), "type": "varchar"});
				}
			});
			query = query.slice(0, -1) + " FROM " + tables[j];
			if (j < cols_h - 1) {
				query += " UNION ";		
			}
			var col = new Object();
			col.cols = columns_table;
			merge_json.objects.columns.push(col);
		}
		console.log(query);
		merge_json.objects.tables = tables;
		
		setMergeData(merge_json, merged_columns, query);
		$('#btn_close').trigger('click');
	});
	
	$(document).on("click", "#apply_join", function() {
		if ($.join_dialog.new_right_column.length > 0) {
			var join_type = "LEFT JOIN";
			if ($('#inner_join').is(':checked')) {
				join_type = "INNER JOIN"; 
			}
			else {
				if ($('#right_join').is(':checked')) {
					join_type = "RIGHT JOIN";
				}
			}
			setJoinData($('#left_join_id option:selected').text(), $('#right_join_id option:selected').text(), join_type, $.join_dialog.new_right_column, $.join_dialog.as_columns);
			$('#btn_close').trigger('click');
		}
	});

	$(document).on("click", "#apply_aggregation", function() {
		var has_err = false;
		$(".agg_col").each(function () {
			if($(this).parent().hasClass('has-error')) {
				has_err = true;
			}
		});
		if (has_err === false) {
			var bool = false, agg_names = [], created_columns = [];	
			$(".agg_names").each(function () {
				var val = $(this).val();
				if (val.length < 1) {
					bool = true;
					$(this).parent().addClass("has-error");
				}
				else {
					$(this).parent().removeClass("has-error");
					agg_names.push(val);
					created_columns.push({"column_name": val, "type": "varchar"});
				}
			});
			
			if (bool) { return; }
			
			var agg_col = [], agg_func = [];
			$('.agg_col').each(function () {
				agg_col.push($(this).find(":selected").text());
			});		
			
			$('.agg_func').each(function () {
				agg_func.push($(this).find(":selected").text());
			});
			
			var condition = "";
			var aggregate = [];
			
			for (i = 0; i < agg_col.length; i ++) {
				condition += agg_func[i] + "(" + agg_col[i] + ") AS " + agg_names[i] + ",";	
				aggregate.push({"column_name": agg_col[i], "function": agg_func[i], "name": agg_names[i]});
			}
			condition = condition.slice(0, -1);

			var group_by = [];	
			$('#group_by option:selected').each(function() {
				group_by.push({"column_name": $(this).text(), "type": $(this).attr('data-x')});
				created_columns.push({"column_name": $(this).text(), "type": $(this).attr('data-x')});
			});

			setAggregationData(condition, aggregate, created_columns, group_by);
			$('#btn_close').trigger('click');
		}
	});
	
	$(document).on("click", "#apply_sort", function() {		
		var sort_name = $('#sort_name').val();
		if (sort_name.length < 1) {
			$('#sort_name').parent().addClass("has-error");
			return;
		}
		else {
			$('#sort_name').parent().removeClass("has-error");	
		}

		var rank_col = [], order_by = [];
		$('.rank_col').each(function () {
			rank_col.push($(this).find(":selected").text());
		});

		$('.rank_order').each(function () {
			order_by.push($(this).find(":selected").text());	
		});		
		
		var condition = "";
		var ranks = [];
		condition = "ROW_NUMBER() OVER (ORDER BY "; 
		for (i = 0; i < rank_col.length; i ++) {
			condition += rank_col[i] + " " + order_by[i] + ",";	
			ranks.push({"column_name": rank_col[i], "order_by": order_by[i]});
		}
		condition = condition.slice(0, -1);
		condition += ") AS " + sort_name;
		setRankData(sort_name, condition, ranks);
		$('#btn_close').trigger('click');
	});

	$(document).on("click", "#apply_result", function() {
		var selected = [], unselected = [];	
		$('#rightValues option').each(function() {
			selected.push({"column_name": $(this).text(), "type": $(this).attr('data-x')});			
		});
		$('#leftValues option').each(function() {
			unselected.push({"column_name": $(this).text(), "type": $(this).attr('data-x')});			
		});
		setResultData($('#result_name').val(), selected, unselected);
		$('#btn_close').trigger('click');
	});
	
	$(document).on("click", "#cancel", function() {
		$('#btn_close').trigger('click');
	});
	
	$(document).on("click", "#btn_close", function() {
		$('.overlap').remove();
		$('#popup').remove();
		$('#popup').empty();

		$('#dialog').remove();
		$('#dialog').empty();
	});
	
	$(document).on("change", "#rightValues", function () {
		var selectedItem = $("#rightValues option:selected");
		$("#txtRight").val(selectedItem.text());
	});
	
	$(document).on('dblclick', '#case_col', 'option', function() {
		var eq = $('#equation').val();
		var lastChar = eq[eq.length - 1];
		if (lastChar != " " && eq.length > 0) {
			eq += " "; 
		}			
		$('#equation').val(eq + $(this).find(":selected").text() + " ");
    });

	// start popup as
	$(document).on("click", ".popup_as", function() {
		$('#dialog').css('display', 'none');

		var popup_as = $('<div />').attr('id','popup_as');
		$('#container').append(popup_as);

		$('#popup_as').draggable({containment: "parent"}).resizable({containment: "parent"});

		$('#popup_as').css('left', ($('#container').width()/2 - 300) + 'px');
		$('#popup_as').css('top', ($('#container').height()/2 - 420)  + 'px');

		var header = $('<div/>').addClass('dialog-header').appendTo('#popup_as');
			$('<p/>').html('rename').css({'text-transform': 'uppercase', 'padding-left': '15px', 'margin': '0px', 'line-height': '35px'}).appendTo(header);
			$('<div/>').attr('id', 'btn_close_popus_as').addClass('close').appendTo(header);

		var nav = $('<div/>');
			nav.attr('id','popup_as-nav');
			nav.addClass('dialog-nav');
			nav.appendTo('#popup_as');

		var content = $('<div/>');
			content.attr('id','popup_as-content');
			content.addClass('dialog-content');
			content.appendTo('#popup_as');

		var footer = $('<div/>').addClass('dialog-footer').appendTo('#popup_as');
							
		var div1=$('<div/>').css({'display': 'table', 'width': '100%', 'height': '60px'}).appendTo(footer);
		var div2=$('<div/>').css({'display': 'table-cell', 'vertical-align': 'middle', 'text-align': 'right'}).appendTo(div1);
				
		var btn_apply = $('<button/>');
			btn_apply.attr('id', 'apply_popup_as');
			btn_apply.addClass('btn btn-default');
			btn_apply.css({'margin-right': '5px', 'width': '80px'});
			btn_apply.html('OK');
			btn_apply.appendTo(div2);
		
		var btn_cancel = $('<button/>');
			btn_cancel.attr('id', 'cancel_popup_as');
			btn_cancel.addClass('btn btn-default');
			btn_cancel.css({'margin-right': '15px', 'width': '80px'});
			btn_cancel.html('Cancel');
			btn_cancel.appendTo(div2);

		var title = $('<div />').addClass('row');
			title.append($('<div />').addClass('col-sm-5').css({'text-align': 'center'}).append($('<p/>').css({'margin-top': '20px'}).html('Old Column name')));
			title.append($('<div />').addClass('col-sm-2').css({'text-align': 'center'}).append($('<p/>').css({'margin-top': '20px'}).html('AS')));
			title.append($('<div />').addClass('col-sm-5').css({'text-align': 'center'}).append($('<p/>').css({'margin-top': '20px'}).html('New Column name')));
			title.appendTo(nav);

		var sub_content = $('<div/>').attr({id: 'popup_as-sub_content'}).addClass('dialog-sub_content').appendTo($('#popup_as-content'));

		for (i = 0; i < $.join_dialog.duplicate_column.length; i ++) {
			var row=$('<div/>').addClass('row').appendTo(sub_content);

			var old_column=$('<input/>').addClass('form-control old_column').attr({type: 'text', disabled: true, spellcheck: false}).val($.join_dialog.duplicate_column[i]['column_name']);
				$('<div />').addClass('col-sm-5').append(old_column).appendTo(row);
				$('<div />').addClass('col-sm-2').css({'text-align': 'center'}).append($('<p />').html('=')).appendTo(row);
			var new_column=$('<input/>').addClass('form-control as_column').attr({type: 'text', spellcheck: false}).val($.join_dialog.duplicate_column[i]['column_name'] + "_1");
				$('<div />').addClass('col-sm-5').append(new_column).appendTo(row);
		}
	});

	$(document).on("click", "#cancel_popup_as", function() {
		$('#btn_close_popus_as').trigger('click');
	});
	
	$(document).on("click", "#btn_close_popus_as", function() {
		$('#popup_as').remove();
		$('#popup_as').empty();
		$('#dialog').css('display', '-webkit-flex');
	});

	$(document).on("click", "#apply_popup_as", function() {
		var as_col = [];
		var bool = false;
		
		$(".as_column").each(function () {
			var val = $(this).val();
			if (val.length < 1) {
				bool = true;
				$(this).parent().addClass("has-error");
			}
			else {
				$(this).parent().removeClass("has-error");
				as_col.push(val);
			}
		});

		if (bool) {
			return;
		}

		$('#right_controls').empty();

		var right_table = $.join_dialog.right_table;

		console.log(right_table);
		var duplicate_columns = $.join_dialog.duplicate_column;

		var new_right_column = [];

		for (i = 0; i < right_table.length; i ++) {
			var bool = false;
			var k = 0;
			for (j = 0; j < duplicate_columns.length; j ++) {
				if (right_table[i]['column_name'] === duplicate_columns[j]['column_name']) {
					bool = true;
					k = j;						
				}
			}
			if (bool) {
				new_right_column.push({'column_name': as_col[k], 'type': right_table[i]['type']}); 
				add_join(right_table[i]['column_name'] + " AS " + as_col[k], right_table[i]['type'], $('#right_controls'));	
			}
			else {
				new_right_column.push(right_table[i]);
				add_join(right_table[i]['column_name'], right_table[i]['type'], $('#right_controls'));
			}
		}

		var as_columns = [];
		for(i = 0; i < as_col.length; i ++) {
			as_columns.push({'old_column': duplicate_columns[i], 'new_column': {'column_name': as_col[i], 'type': 'varchar'}});
		}

		console.log("---------*------------");
		console.log(as_columns);
		$.join_dialog.as_columns = as_columns;

		$.join_dialog.new_right_column = new_right_column;
		$('#btn_close_popus_as').trigger('click');
	});

	function dialog(id) {
		var overlap = $('<div/>').addClass('overlap');
		$('#container').append(overlap);
		
		var dialog=$('<div/>').attr('id','dialog');
		$('#container').append(dialog);

		$('#dialog').css('left', ($('#container').width()/2 - 300) + 'px');
		$('#dialog').css('top', ($('#container').height()/2 - 420)  + 'px');

		var header = $('<div/>').addClass('dialog-header').appendTo('#dialog');
			$('<p/>').html(id).css({'text-transform': 'uppercase', 'padding-left': '15px', 'margin': '0px', 'line-height': '35px'}).appendTo(header);
			$('<div/>').attr('id', 'btn_close').addClass('close').appendTo(header);

		var nav = $('<div/>');
			nav.attr('id','dialog-nav');
			nav.addClass('dialog-nav');
			nav.appendTo('#dialog');

		var first_row = $('<div/>').attr('id', 'first_row').addClass('row').css({'margin-top': '5px'}).appendTo(nav);
			$('<div/>').addClass('col-sm-2').append($('<img/>').attr('src', 'img/workflow.icons/ic_popup_' + id + '.svg')).appendTo(first_row);
		
		var content = $('<div/>');
			content.attr('id','dialog-content');
			content.addClass('dialog-content');
			content.appendTo('#dialog');

		var footer = $('<div/>').addClass('dialog-footer').appendTo('#dialog');
							
		var div1=$('<div/>').css({'display': 'table', 'width': '100%', 'height': '60px'}).appendTo(footer);
		var div2=$('<div/>').css({'display': 'table-cell', 'vertical-align': 'middle', 'text-align': 'right'}).appendTo(div1);
				
		var btn_apply = $('<button/>');
			btn_apply.attr('id', 'apply_' + id);
			btn_apply.addClass('btn btn-default');
			btn_apply.css({'margin-right': '5px', 'width': '80px'});
			btn_apply.html('저장');
			btn_apply.appendTo(div2);
		
		var btn_cancel = $('<button/>');
			btn_cancel.attr('id', 'cancel');
			btn_cancel.addClass('btn btn-default');
			btn_cancel.css({'margin-right': '15px', 'width': '80px'});
			btn_cancel.html('닫기');
			btn_cancel.appendTo(div2);
	}

	$.join_dialog = function(left_table, right_table, join_type, left_join_id, right_join_id, new_right_columns) {
		console.log(left_join_id + " ::: " + right_join_id);
		$.join_dialog.right_table = right_table;
		$.join_dialog.duplicate_column = [];
		$.join_dialog.new_right_column = [];
		$.join_dialog.as_columns = [];

		dialog('join');
		
		var select_join_type = $('<div />').addClass('col-sm-3').append($('<p/>').text('Select join type:')).appendTo('#first_row');
			
		$('<div/>').addClass('col-sm-2').append("<label class='radio-inline'><input type='radio' name='join_type' id='left_join' checked='true'> LEFT </label>").appendTo('#first_row');
		$('<div/>').addClass('col-sm-2').append("<label class='radio-inline'><input type='radio' name='join_type' id='inner_join'> INNER </label>").appendTo('#first_row');
		$('<div/>').addClass('col-sm-2').append("<label class='radio-inline'><input type='radio' name='join_type' id='right_join'> RIGHT </label>").appendTo('#first_row');
	
		$("#inner_join").prop("checked", (join_type === "INNER JOIN"));	
		$("#right_join").prop("checked", (join_type === "RIGHT JOIN"));
		
		var keys = $('<div/>').addClass('row');
		keys.append($('<div/>').addClass('col-sm-2').append($('<p/>').html('Left:')));
		var key1 = $('<div/>').addClass('col-sm-4').appendTo(keys);
		keys.append($('<div/>').addClass('col-sm-2').append($('<p/>').html('Right:')));
		var key2 = $('<div/>').addClass('col-sm-4').appendTo(keys);		
		keys.appendTo('#dialog-nav');
				
		var sel1 = $('<select/>').attr({id: 'left_join_id'}).addClass('form-control column_select');
		var negch_left =  false;
		for (var i = 0; i < left_table.length; i ++) {
			if (left_table[i]['column_name'] === left_join_id) {
				negch_left = true; 
			}
			sel1.append($('<option/>').attr({ 'selected': (left_table[i]['column_name'] === left_join_id) }).text(left_table[i]['column_name']));		
		}
		if (!negch_left && typeof left_join_id != "undefined") {
			sel1.append($('<option/>').attr({'selected': true, 'disabled': true}).val('').text(left_join_id));					
			sel1.appendTo(key1.addClass("has-error"));
		}
		else {
			sel1.appendTo(key1);
		}

		var negch_right = false;
		var sel2 = $('<select/>').attr({id: 'right_join_id'}).addClass('form-control column_select');
		for (var i = 0; i < right_table.length; i ++) {
			if (right_table[i]['column_name'] === right_join_id) {
				negch_right = true; 
			}
			sel2.append($('<option/>').attr({'selected': (right_table[i]['column_name'] === right_join_id) }).text(right_table[i]['column_name']));	
		}
		if (!negch_right && typeof right_join_id != "undefined") {
			sel2.append($('<option/>').attr({'selected': true, 'disabled': true}).val('').text(right_join_id));					
			sel2.appendTo(key2.addClass("has-error"));
		}
		else {
			sel2.appendTo(key2);
		}
		
		var title = $('<div/>').addClass('row').css({'margin-left': '1px'});
			title.append($('<div/>').addClass('col-sm-3').append($('<p/>').html('Column')));
			title.append($('<div/>').addClass('col-sm-3').append($('<p/>').html('Type')));
			title.append($('<div/>').addClass('col-sm-3').append($('<p/>').html('Column')));
			title.append($('<div/>').addClass('col-sm-3').append($('<p/>').html('Type')));
			title.appendTo('#dialog-nav');

		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));
						
		var left_controls = $('<div/>').addClass('col-sm-6').attr('id', 'left_controls');
		left_controls.appendTo('#dialog-sub_content');
		for (i = 0; i < left_table.length; i ++) {
			add_join(left_table[i]['column_name'], left_table[i]['type'], left_controls);
		}
		
		var right_controls=$('<div />').addClass('col-sm-6').attr('id', 'right_controls');
		right_controls.appendTo('#dialog-sub_content');
		var bool;
		if (typeof new_right_columns == "undefined") {
			for (i = 0; i < right_table.length; i ++) {
				bool = false;
				for (j = 0; j < left_table.length; j ++) {
					if (right_table[i]['column_name'] === left_table[j]['column_name']) {
						bool = true;						
					}
				}
				if (bool) { $.join_dialog.duplicate_column.push(right_table[i]) }
				add_join(right_table[i]['column_name'], right_table[i]['type'], right_controls, bool);	
			}
			if ($.join_dialog.duplicate_column.length == 0) {
				$.join_dialog.new_right_column = right_table;
			}
		}
		else {
			$.join_dialog.new_right_column = new_right_columns;
			for (i = 0; i < right_table.length; i ++) {
				if (right_table[i]['column_name'] === new_right_columns[i]['column_name']) {
					add_join(new_right_columns[i]['column_name'], right_table[i]['type'], right_controls);	
				}
				else {
					add_join(right_table[i]['column_name'] + " AS " + new_right_columns[i]['column_name'], right_table[i]['type'], right_controls);	
				}
			}
		}
	};

	function add_join(column_name, type, side, bool = false) {
		var row = $('<div/>').addClass('row').appendTo(side);
		var	column_col = $('<div/>').addClass('col-sm-7').appendTo(row);

		var	type_col = $('<div/>').addClass('col-sm-5');
			type_col.appendTo(row);
		
		var text_name = $('<p/>').css({'display': 'inline'}).text(column_name);
		text_name.appendTo(column_col);
		if (bool) { $('<p/>').addClass('popup_as').text(" AS ").css({'display': 'inline', 'cursor': 'pointer', 'color': 'red'}).appendTo(column_col); }	

		var text_type = $('<p/>').text(type);
		text_type.appendTo(type_col);
	}

	$.filter_dialog = function(columns, filter, logical) {
		$.filter_dialog.columns = columns;
		$.filter_dialog.count = 0;
		dialog('filter');
		var nav_content = $('<div />').addClass('row');
			nav_content.append($('<div />').addClass('col-sm-3').append($('<p />').html('Column')));
			nav_content.append($('<div />').addClass('col-sm-3').append($('<p />').html('Operator')));
			nav_content.append($('<div />').addClass('col-sm-6').append($('<p />').html('Value')));
			nav_content.appendTo($('#dialog-nav'));

		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));

		var left_controls=$('<div/>').attr('id', 'left_controls').css({'float': 'left', 'width': '85%'});
			left_controls.appendTo($('#dialog-sub_content'));
						
		var add_row=$('<div/>').attr('id', 'contain_add_btn').addClass('row').append($('<div/>').addClass('col-sm-3').append($('<button/>').attr('id', 'add').addClass('btn btn-default').text('+ Add')));
			add_row.appendTo(left_controls);
				
		var right_controls=$('<div/>').attr('id', 'right_controls').css({'float': 'right', 'width': '15%', 'margin-top': '13.5px'});
			right_controls.appendTo($('#dialog-sub_content'));
			
		if (typeof filter == "undefined") {
			add_filter(true);
		}
		if (typeof filter != "undefined") {
			add_filter_save(columns, filter, logical);
		}
	}

	function add_filter_save(columns, filter, logical) {
		for(i = 0; i < filter.length; i ++) {
			$.filter_dialog.count += 1;
			var row=$('<div/>').addClass('row');
			if(i == 0) { $(row).insertBefore('#contain_add_btn'); }
			else { 
				log_bool = false;
				if (logical[i-1] == "AND") {
					log_bool = true;
				}
				add_logical(log_bool); $(row).insertBefore('#contain_add_btn'); 
			} 
				
			var	row_1 = $('<div/>').addClass('col-sm-4');
				row_1.appendTo(row);
				
			var	row_0 = $('<div/>').addClass('input-group');
				i === 0 ? null : row_0.appendTo(row_1); 
				row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
		
			var	row_2 = $('<div/>').addClass('col-sm-3');
				row_2.appendTo(row);
			var	row_3 = $('<div/>').addClass('col-sm-5');
				row_3.appendTo(row);
			
			var sel1 = $('<select/>').attr({'id': 'filter1_' + $.filter_dialog.count}).addClass('form-control column_select');
				var negch_udaa_bgaagui = false;
				for (j = 0; j < columns.length; j ++) {
					bool = false;			
					if (filter[i]['column_name'] == columns[j]['column_name']) {
						bool = true;
						negch_udaa_bgaagui = true;
					}
					sel1.append($('<option/>').attr({'selected': bool}).val('').text(columns[j]['column_name']));		
				}
				if (!negch_udaa_bgaagui) {
					sel1.append($('<option/>').attr({'selected': true, 'disabled': true}).val('').text(filter[i]['column_name']));					
					i === 0 ? sel1.appendTo(row_1.addClass("has-error")) : sel1.appendTo(row_0.addClass("has-error"));
				}
				else {
					i === 0 ? sel1.appendTo(row_1) : sel1.appendTo(row_0);
				}
			
			operators = ["=", ">", ">=", "<", "<=", "!=", "IS NULL", "IS NOT NULL"];
			var sel2=$('<select/>').attr({'id': 'filter2_' + $.filter_dialog.count}).addClass('form-control operator_select');
				for (j = 0; j < operators.length; j ++) {
					bool = false;
					if (filter[i]['operator'] == operators[j]) {
						bool = true;
					}
					sel2.append($('<option/>').attr({'selected': bool}).val('').text(operators[j]));
				}
				sel2.appendTo(row_2);
			
			if (filter[i]['value'] === "") {
				bool = true;
			}
			else {
				bool = false;
			}
			var value=$('<input/>').addClass('form-control condition_value').attr({type: 'text', id: 'cond_filter2_' + $.filter_dialog.count, disabled: bool}).val(filter[i]['value']);
				value.appendTo(row_3);			
		}
	}
	
	function add_filter(check_first) {
		$.filter_dialog.count += 1;
		var row=$('<div/>').addClass('row');
		if(check_first) { 
			$(row).insertBefore('#contain_add_btn'); /*row.appendTo('#left_controls');*/ 
		}
		else { 
			add_logical(); 
			$(row).insertBefore('#contain_add_btn'); 
		} 
				
		var	row_1=$('<div/>').addClass('col-sm-4');
			row_1.appendTo(row);
		
		var	row_0=$('<div/>').addClass('input-group');
			check_first === true ? null : row_0.appendTo(row_1);
			row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
		
		var	row_2=$('<div/>').addClass('col-sm-3');
			row_2.appendTo(row);
		var	row_3=$('<div/>').addClass('col-sm-5');
			row_3.appendTo(row);
		var sel1=$('<select/>').attr({'id': 'filter1_' + $.filter_dialog.count}).addClass('form-control column_select');
			for (i = 0; i < $.filter_dialog.columns.length; i ++) {
				sel1.append($('<option/>').val('').text($.filter_dialog.columns[i]['column_name']));
			}
			check_first === true ? sel1.appendTo(row_1) : sel1.appendTo(row_0);
			
		var sel2=$('<select/>').attr({'id': 'filter2_' + $.filter_dialog.count}).addClass('form-control operator_select');
			sel2.append($('<option/>').val('').text('='));
			sel2.append($('<option/>').val('').text('>'));
			sel2.append($('<option/>').val('').text('>='));
			sel2.append($('<option/>').val('').text('<'));
			sel2.append($('<option/>').val('').text('<='));
			sel2.append($('<option/>').val('').text('!='));
			sel2.append($('<option/>').val('').text('IS NULL'));
			sel2.append($('<option/>').val('').text('IS NOT NULL'));
			sel2.appendTo(row_2);
		
		var value=$('<input/>').addClass('form-control condition_value').attr({ type: 'text', id: 'cond_filter2_' + $.filter_dialog.count});
			value.appendTo(row_3);			
		
		//return row;
	}
	
	function add_logical(bool = false) {
		var row=$('<div/>').css({'text-align': 'center', 'padding-top': '5px'});
			row.appendTo('#right_controls');
			
		var sel=$('<select/>').attr({'id': 'logical_filter1_' + $.filter_dialog.count}).addClass('form-control logical').css({'width': '80%', 'margin-left': 'auto', 'margin-right': 'auto'}).append($('<option/>').val('').text('OR'));
			sel.append($('<option/>').attr({'selected': bool}).val('').text('AND'));
			sel.appendTo(row);
	}

	$(document).on("click", "#add", function() {
		add_filter(false);
	});

	$(document).on("change", ".operator_select", function() {
	  	$(".operator_select option:selected").each(function() {
			var id = $(this).parent().attr("id");
			var cond_id = "#cond_" + id;
      		if ($(this).text() === "IS NULL" || $(this).text() === "IS NOT NULL") {
				$(cond_id).attr("disabled", true);
				$(cond_id).val("");	
				$(cond_id).parent().removeClass("has-error");
      		}
      		else {
      			$(cond_id).attr("disabled", false);
      		}
    	});
	});

	$(document).on("change", ".column_select", function() {
		$(this).parent().removeClass("has-error");
	});

	// handle remove filter
	$(document).on("click", ".delete-filter", function() {
		var logical_id = "#logical_" + $(this).parent().next().attr('id');
		$(logical_id).parent().remove();
		$(this).parent().parent().parent().parent().remove();
	});

	// handle remove filter when case
	$(document).on("click", ".delete-when-filter", function() {
		var id = $(this).attr('rowid');
		var logical_id = "#logical_filter2_" + id;
		$(logical_id).parent().remove();
		$(this).parent().parent().parent().parent().remove();
		var when_left_id = '#when_left_' + id.substring(0, id.indexOf('_'));
		if($(when_left_id).children().length == 0) {
			$(when_left_id).parent().next().remove();
			$(when_left_id).parent().prev().remove();	
			$(when_left_id).parent().remove();
		}
	});

	$.merge_dialog = function(json, merged_data) {
		$.merge_dialog.rowid = 0;
		$.merge_dialog.json = json;
		
		dialog('merge');
			
		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));

		var table = $('<table />').attr({ id: "basicTable" }).addClass('table').append($('<thead/>')).appendTo('#dialog-sub_content');
		
		var thead = table.find("thead");
		var row_h = $('<tr></tr>').appendTo(thead);
		
		tables = json.objects.tables;
		for (i = 0; i < tables.length; i ++) {
			$('<th />').text(tables[i]).appendTo(row_h);
		}
		
		var add_row=$('<div/>').attr('id', 'merge_add_btn').addClass('row').append($('<div/>').addClass('col-sm-3').append($('<button/>').attr('id', 'merge_add').addClass('btn btn-default').text('+ Add')));
			add_row.appendTo('#dialog-sub_content');
			
		if (typeof merged_data != "undefined" && json.objects.tables.length === merged_data.objects.tables.length) {
			add_merge_save(merged_data);
		}
		else {
			$('#merge_add').trigger('click');
		}
	}

	$.deduplication_dialog = function(columns, distinct_columns) {
		dialog('deduplication');
		
		var label1 = $('<label/>').addClass('checkbox-inline').css({'margin-bottom': '20px'}).html('Select all');
		var sel_all = $('<input/>').attr({ type: 'checkbox', id: 'check_select_all' });
			label1.prepend(sel_all);

		var label2 = $('<label/>').addClass('checkbox-inline').css({'margin-bottom': '20px'}).html('Inverse');
		var sel_inverse = $('<input/>').attr({ type: 'checkbox', id: 'check_inverse' });
			label2.prepend(sel_inverse);

		var tool=$('<div />').addClass('row');
			tool.append($('<div />').addClass('col-sm-5').append(label1));
			tool.append($('<div />').addClass('col-sm-7').append(label2));
			tool.appendTo($('#dialog-nav'));

		var title=$('<div />').addClass('row');
			title.append($('<div />').addClass('col-sm-5').append($('<p />').html('Column')));
			title.append($('<div />').addClass('col-sm-7').append($('<p />').html('Type')));
			title.appendTo($('#dialog-nav'));
				
		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));

		for(i = 0; i < columns.length; i ++) {
			check = false;
			if (typeof distinct_columns != "undefined") {
				for(j = 0; j < distinct_columns.length; j ++) {		
					if (columns[i]['column_name'] == distinct_columns[j]['column_name'] && columns[i]['type'] == distinct_columns[j]['type']) {
						check = true;
					}
				}
			}
			add_distinct(columns[i]['column_name'], columns[i]['type'], check);	
		}
	}

	$(document).on('change', '#check_select_all', function() {
		$("#check_inverse").prop('checked', false);
	 	$(".column_check").prop('checked', $(this).prop("checked"));
	});

	$(document).on('change', '#check_inverse', function() {
		$("#check_select_all").prop('checked', false);
		$(".column_check").each(function () {
			$(this).prop('checked', !$(this).prop('checked'));
		});	
	});

	function add_distinct(name, type, check) {
		var row=$('<div/>').addClass('row');
			row.appendTo('#dialog-sub_content');

		var	row_1=$('<div/>').addClass('col-sm-5').appendTo(row);
		var	row_2=$('<div/>').addClass('col-sm-7').appendTo(row);
		
		var label = $('<label/>').addClass('checkbox-inline').html(name);

		var checkbox = $('<input/>').addClass('column_check').attr({ type: 'checkbox', value: name, 'data-x': type });
			checkbox.prop('checked', check);
			label.prepend(checkbox);
			label.appendTo(row_1);

		$('<p/>').text(type).appendTo(row_2);
	}

	$.new_column_dialog = function(derive_name, mode, equation, columns, filter, else_val) {
		$.new_column_dialog.columns = columns;
		$.new_column_dialog.filter = filter;
		$.new_column_dialog.equation = equation;
		$.new_column_dialog.else_val = else_val;
		$.new_column_dialog.rowid = 0;
		$.new_column_dialog.nested_rowid = [];
	
		dialog('new_column');

		var name=$('<div/>').addClass('col-sm-3').appendTo($('#first_row'));	
			$('<p/>').text('New column name').appendTo(name);
	
		$('<div/>').addClass('col-sm-4').append($('<input/>').attr({ type: 'text', id: 'new_column_name', class: 'form-control', value: derive_name, spellcheck: false})).appendTo($('#first_row'));	
		
		var chooser=$('<div>').addClass('row');
			chooser.append($('<div/>').addClass('col-sm-3').append($('<p />').html('Select case:')));
			chooser.append($('<div/>').addClass('col-sm-3').append("<label class='radio-inline'><input type='radio' name='case' id='case1' checked='true'>  case1 </label>"));
			chooser.append($('<div/>').addClass('col-sm-3').append("<label class='radio-inline'><input type='radio' name='case' id='case2'> case2 </label>"));
			chooser.appendTo('#dialog-nav');
	
		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));
					
		if (mode === 1) {
			if (typeof equation == "undefined" || equation == null) {
				$('#case1').trigger('click');
			}
			else { 
				$("#case1").prop("checked", true);
				caseOneSave();
			}
		}
		else { 
			if (typeof filter == "undefined" || filter == null) {
				$('#case1').trigger('click');
			}
			else {
				$("#case2").prop("checked", true);
				//caseTwoSave();
				caseThreeSave();
			}
		}
	};

	$.aggregation_dialog = function(columns, aggregate, group_by) {
		$.aggregation_dialog.columns = columns;
		$.aggregation_dialog.rowid = 0;
		dialog('aggregation');

		var group_by_row = $('<div/>').addClass('row').appendTo('#dialog-nav');	
			$('<div/>').addClass('col-sm-2').append($('<p/>').text('Group by')).appendTo(group_by_row);	
			
		var select_group_by = $('<select>').attr({ id: 'group_by', multiple: 'multiple' }).addClass('chosen form-control');
			select_group_by.append($('<option/>'));

			for(i = 0; i < columns.length; i ++) {
				check = false;
				if (typeof group_by != "undefined") {
					for(j = 0; j < group_by.length; j ++) {
						if (columns[i]['column_name'] == group_by[j]['column_name'] && columns[i]['type'] == group_by[j]['type']) {
							check = true;
						}
					}	
				}
				select_group_by.append($('<option/>').attr({'data-x': columns[i]['type'], selected: check}).val('').text(columns[i]['column_name']));	
			}
			$('<div/>').addClass('col-sm-10').append(select_group_by).appendTo(group_by_row);

		var title=$('<div/>').addClass('row');
		title.append($('<div/>').addClass('col-sm-4').append($('<p/>').html('Column')));
		title.append($('<div/>').addClass('col-sm-3').append($('<p/>').html('Function')));
		title.append($('<div/>').addClass('col-sm-5').append($('<p/>').html('Name')));
		title.appendTo('#dialog-nav');
			
		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));			
		var add_row=$('<div/>').attr('id', 'agg_add_btn').addClass('row').append($('<div/>').addClass('col-sm-3').append($('<button/>').attr('id', 'agg_add').addClass('btn btn-default').text('+ Add')));
			add_row.appendTo('#dialog-sub_content');
			
		if (typeof aggregate != "undefined") {
			add_aggregate_save(aggregate);
		}
		else {
			$('#agg_add').trigger('click');
		}
	}

	function add_aggregate_save(aggregate) {
		columns = $.aggregation_dialog.columns;
		for (i = 0; i < aggregate.length; i ++) {
			var option2=$('<div/>').addClass('row').insertBefore($('#agg_add_btn'));
			
			var	row_1=$('<div/>').addClass('col-sm-4');
			row_1.appendTo(option2);
				
			var	row_0=$('<div/>').addClass('input-group');
			$.aggregation_dialog.rowid === 0 ? null : row_0.appendTo(row_1); 
			row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
					
			var sel1=$('<select/>').addClass('form-control agg_col').attr({rowid: $.aggregation_dialog.rowid});		
				var negch_udaa_bgaagui = false;
				for (j = 0; j < columns.length; j ++) {
					bool = false;
					if (aggregate[i]['column_name'] == columns[j]['column_name']) {
						bool = true;
						negch_udaa_bgaagui = true;
					}
					sel1.append($('<option/>').attr({'selected': bool}).val('').text(columns[j]['column_name']));		
				}			
				if (!negch_udaa_bgaagui) {
					sel1.append($('<option/>').attr({'selected': true, 'disabled': true}).val('').text(aggregate[i]['column_name']));					
					i === 0 ? sel1.appendTo(row_1.addClass("has-error")) : sel1.appendTo(row_0.addClass("has-error"));
				}
				else {
					i === 0 ? sel1.appendTo(row_1) : sel1.appendTo(row_0);
				}
				
			functions = ["SUM", "MIN", "MAX", "MEAN", "COUNT", "VARIANCE", "STDDEV"];
			var sel2=$('<select/>').addClass('form-control agg_func').attr({rowid: $.aggregation_dialog.rowid});
				for (j = 0; j < functions.length; j ++) {
					bool = false;
					if (aggregate[i]['function'] === functions[j]) {
						bool = true;
					}
					sel2.append($('<option/>').attr({'selected': bool}).val('').text(functions[j]));
				}
				$('<div/>').addClass('col-sm-3').append(sel2).appendTo(option2);
					
			var name=$('<input/>').addClass('form-control agg_names').attr({ type: 'text', id: 'name_val'}).val(aggregate[i]['name']);
				$('<div/>').addClass('col-sm-5').append(name).appendTo(option2);
			
			$.aggregation_dialog.rowid ++;
		}
	}

	$(document).on("click", "#agg_add", function() {
		columns = $.aggregation_dialog.columns;
		
		var option2=$('<div/>').addClass('row').insertBefore($('#agg_add_btn'));
		
		var	row_1=$('<div/>').addClass('col-sm-4');
			row_1.appendTo(option2);
			
		var	row_0=$('<div/>').addClass('input-group');
		$.aggregation_dialog.rowid === 0 ? null : row_0.appendTo(row_1); 
		row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
				
		var sel1=$('<select/>').addClass('form-control agg_col').attr({rowid: $.aggregation_dialog.rowid});		
			for (j = 0; j < columns.length; j ++) {
				sel1.append($('<option/>').attr({}).val('').text(columns[j]['column_name']));		
			}			
			$.aggregation_dialog.rowid === 0 ? sel1.appendTo(row_1) : sel1.appendTo(row_0);
			
		functions = ["SUM", "MIN", "MAX", "AVG", "COUNT", "VARIANCE", "STDDEV"];
		var sel2=$('<select/>').addClass('form-control agg_func').attr({rowid: $.aggregation_dialog.rowid});
			for (j = 0; j < functions.length; j ++) {
				sel2.append($('<option/>').attr({}).val('').text(functions[j]));
			}
			$('<div/>').addClass('col-sm-3').append(sel2).appendTo(option2);
				
		var name=$('<input/>').addClass('form-control agg_names').attr({ type: 'text', id: 'name_val'});
			$('<div/>').addClass('col-sm-5').append(name).appendTo(option2);
			
		$.aggregation_dialog.rowid ++;
	});

	$(document).on("change", ".agg_col", function() {
		$(this).parent().removeClass("has-error");
	});
	
	$(document).on("change", ".agg_func", function (e) {
		var $agg_order = $(".agg_order[rowid='" + $(this).attr('rowid') + "']");
		$agg_order.attr("disabled", $(this).find("option:selected").text() === "RANK"); 
	});

	$.rank_dialog = function(sort_name, columns, ranks) {
		$.rank_dialog.columns = columns;
		$.rank_dialog.rowid = 0;
		dialog('sort');
		var name=$('<div/>').addClass('col-sm-2').appendTo($('#first_row'));	
			$('<p/>').text('Sort name').appendTo(name);
			
		$('<div/>').addClass('col-sm-5').append($('<input/>').attr({ type: 'text', id: 'sort_name', class: 'form-control', value: sort_name, spellcheck: false})).appendTo($('#first_row'));	
		
		var title=$('<div/>').addClass('row');
		title.append($('<div/>').addClass('col-sm-7').append($('<p/>').html('Column')));
		title.append($('<div/>').addClass('col-sm-5').append($('<p/>').html('Order by')));
		title.appendTo('#dialog-nav');
			
		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));			
		var add_row=$('<div/>').attr('id', 'rank_add_btn').addClass('row').append($('<div/>').addClass('col-sm-3').append($('<button/>').attr('id', 'rank_add').addClass('btn btn-default').text('+ Add')));
			add_row.appendTo('#dialog-sub_content');
	
		if (typeof ranks != "undefined") {
			add_ranks_save(ranks);
		}
		else {
			$('#rank_add').trigger('click');
		}
	}

	function add_ranks_save(ranks) {
		var columns = $.rank_dialog.columns;
		for (i = 0; i < ranks.length; i ++) {
			var option2=$('<div/>').addClass('row').insertBefore($('#rank_add_btn'));
			
			var	row_1=$('<div/>').addClass('col-sm-7');
			row_1.appendTo(option2);
				
			var	row_0=$('<div/>').addClass('input-group');
			$.rank_dialog.rowid === 0 ? null : row_0.appendTo(row_1); 
			row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
					
			var sel1=$('<select/>').addClass('form-control rank_col').attr({rowid: $.rank_dialog.rowid});		
				var negch_udaa_bgaagui = false;
				for (j = 0; j < columns.length; j ++) {
					bool = false;
					if (ranks[i]['column_name'] == columns[j]['column_name']) {
						bool = true;
						negch_udaa_bgaagui = true;
					}
					sel1.append($('<option/>').attr({'selected': bool}).val('').text(columns[j]['column_name']));		
				}			
				if (!negch_udaa_bgaagui) {
					sel1.append($('<option/>').attr({'selected': true, 'disabled': true}).val('').text(ranks[i]['column_name']));					
					i === 0 ? sel1.appendTo(row_1.addClass("has-error")) : sel1.appendTo(row_0.addClass("has-error"));
				}
				else {
					i === 0 ? sel1.appendTo(row_1) : sel1.appendTo(row_0);
				}

			var order = $('<div/>').addClass('col-sm-5');
			order.appendTo(option2);

			var sel3 = $('<select/>').addClass('form-control rank_order').attr({rowid: $.rank_dialog.rowid});
				order_el = ["DESC", "ASC"];
				for(j = 0; j < order_el.length; j ++) {
					bool = false;
					if (ranks[i]['order_by'] === order_el[j]) {
						bool = true;
					}
					sel3.append($('<option/>').attr({'selected': bool}).val('').text(order_el[j]));
				}
				sel3.appendTo(order);		
		
			$.rank_dialog.rowid ++;
		}
	}

	$(document).on("click", "#rank_add", function() {
		columns = $.rank_dialog.columns;
		
		var option2=$('<div/>').addClass('row').insertBefore($('#rank_add_btn'));
		
		var	row_1=$('<div/>').addClass('col-sm-7');
			row_1.appendTo(option2);
			
		var	row_0=$('<div/>').addClass('input-group');
		$.rank_dialog.rowid === 0 ? null : row_0.appendTo(row_1); 
		row_0.append('<span class="input-group-addon"><i class="fa fa-remove delete-filter" style="cursor: pointer;"></i></span>');
				
		var sel1=$('<select/>').addClass('form-control rank_col').attr({rowid: $.rank_dialog.rowid});		
			for (j = 0; j < columns.length; j ++) {
				sel1.append($('<option/>').attr({}).val('').text(columns[j]['column_name']));		
			}			
			$.rank_dialog.rowid === 0 ? sel1.appendTo(row_1) : sel1.appendTo(row_0);
				
		var order_by = $('<div/>').addClass('col-sm-5');
			order_by.appendTo(option2);
		
		var sel3=$('<select/>').addClass('form-control rank_order').attr({rowid: $.rank_dialog.rowid});
			sel3.append($('<option/>').attr({}).val('').text('DESC'));
			sel3.append($('<option/>').attr({}).val('').text('ASC'));
			sel3.appendTo(order_by);

		$.rank_dialog.rowid ++;
	});

	$.result_dialog = function(result_name, columns, selected_columns) {
		dialog('result');	
				
		var name=$('<div/>').addClass('col-sm-3').appendTo($('#first_row'));	
			$('<p/>').text('Result name').appendTo(name);
	
		$('<div/>').addClass('col-sm-4').append($('<input/>').attr({ type: 'text', id: 'result_name', class: 'form-control', value: result_name, disabled: true, spellcheck: false})).appendTo($('#first_row'));	
		
		var title=$('<div/>').addClass('row').appendTo($('#dialog-nav'));
			$('<div/>').addClass('col-sm-6').append($('<p/>').text('Unselected columns:')).appendTo(title);
			$('<div/>').addClass('col-sm-6').append($('<p/>').text('Selected columms:')).appendTo(title);
			
		var sub_content = $('<div/>').attr({id: 'dialog-sub_content'}).addClass('dialog-sub_content').appendTo($('#dialog-content'));		
		
		var left_controls = $('<div />').addClass('col-sm-5').attr('id', 'left_controls').css({'height': '100%'});
			left_controls.appendTo($('#dialog-sub_content'));
			
		var sel1 = $('<select/>').attr({id: 'leftValues', multiple: 'multiple'}).css({'width': '100%', 'height': '95%', 'border-radius': '4px', 'border': '1px solid rgb(221, 221, 221)'});
			for(i = 0; i < columns.length; i ++) {
				check = false;
				if (typeof selected_columns != "undefined") {
					for(j = 0; j < selected_columns.length; j ++) {
						if (columns[i]['column_name'] === selected_columns[j]['column_name'] && columns[i]['type'] === selected_columns[j]['type']) {
							check = true;
						}
					}
				}
				if (!check) {
					sel1.append($('<option/>').attr({'data-x': columns[i]['type']}).val('').text(columns[i]['column_name']));
				}
			}
			sel1.appendTo(left_controls);
			
		var middle_control = $('<div />').addClass('col-sm-2').attr('id', 'middle_controls');
			middle_control.appendTo($('#dialog-sub_content'));
			
		
		$('<div/>').addClass('col-sm-12').css({'text-align': 'center'}).append($('<input>').attr({type: 'button', value: "<<", id: 'btnAllLeft'}).css({'width': '35px', 'border': '1px solid #ddd', 'background-color': 'inherit', 'margin': '5px'})).appendTo(middle_control);
		$('<div/>').addClass('col-sm-12').css({'text-align': 'center'}).append($('<input>').attr({type: 'button', value: "<-", id: 'btnLeft'}).css({'width': '35px', 'border': '1px solid #ddd', 'background-color': 'inherit', 'margin': '5px'})).appendTo(middle_control);
		$('<div/>').addClass('col-sm-12').css({'text-align': 'center'}).append($('<input>').attr({type: 'button', value: "->", id: 'btnRight'}).css({'width': '35px', 'border': '1px solid #ddd', 'background-color': 'inherit', 'margin': '5px'})).appendTo(middle_control);
		$('<div/>').addClass('col-sm-12').css({'text-align': 'center'}).append($('<input>').attr({type: 'button', value: ">>", id: 'btnAllRight'}).css({'width': '35px', 'border': '1px solid #ddd', 'background-color': 'inherit', 'margin': '5px'})).appendTo(middle_control);
		
		var right_controls = $('<div />').addClass('col-sm-5').attr('id', 'right_controls').css({'height': '100%'});
			right_controls.appendTo($('#dialog-sub_content'));
		
		var sel2 = $('<select/>').attr({id: 'rightValues', multiple: 'multiple'}).css({'width': '100%', 'height': '95%', 'border-radius': '4px', 'border': '1px solid rgb(221, 221, 221)'});
			
			for(i = 0; i < selected_columns.length; i ++) {
				check = false;
				if (typeof selected_columns != "undefined") {
					for(j = 0; j < columns.length; j ++) {
						if (selected_columns[i]['column_name'] === columns[j]['column_name'] && selected_columns[i]['type'] === columns[j]['type']) {
							check = true;
						}
					}
				}
				if (check) {
					sel2.append($('<option/>').attr({'data-x': selected_columns[i]['type']}).val('').text(selected_columns[i]['column_name']));
				}
			}

			sel2.appendTo(right_controls);
	}

	$(document).on("click", "#btnLeft", function () {
		var selectedItem = $("#rightValues option:selected");
		$("#leftValues").append(selectedItem);
	});

	$(document).on("click", "#btnRight", function () {
		var selectedItem = $("#leftValues option:selected");
		$("#rightValues").append(selectedItem);
	});

	$(document).on("click", "#btnAllLeft", function () {
		var selectedItem = $("#rightValues option");
		$("#leftValues").append(selectedItem);
	});

	$(document).on("click", "#btnAllRight", function () {
		var selectedItem = $("#leftValues option");
		$("#rightValues").append(selectedItem);
	});

	return this;
})(jQuery);
