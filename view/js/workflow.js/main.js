$(document).ready(function () {
	init();
	//$('[data-toggle="tooltip"]').tooltip(); 
	$('.nav-tabs li:nth-child(1) a').click(function() {
		load_db();
	});		

	$('#container').css('display', 'block');

	$('#btnJsonShow').click(function() {	
		console.log(save());
	});
	
	$('#btnExecute').click(function() {
		var is_complete = false;
	    myDiagram.nodes.each(function(node) {
	    	if(!linksAll(node)) {
	    		is_complete = true;
	    		return false;
	    	}
      	});
      	if (myDiagram.nodes.count <= 0) {
	    	alert('Please draw your workflow');
	    }
	    else {
			if (is_complete) {
	    		alert('Please complete your workflow');
	    	}   
		    else {
				findErrorFromEachNodes();
				if(!findErrorFromDiagram()) {
					$("#create_request").css("display", "block");
					$('#create_request').css('left', ($('#container').width()/2 - 400) + 'px');
					$('#create_request').css('top', ($('#container').height()/2 - 425) + 'px');
					if ($(this).val() === "1") {
						$("#create_dataset").css("display", "none");
						$("#create_run_dataset").css("display", "none");	
					}
				}
				else {
					alert('Please fix your errors!!!');
				}
				console.log(executeFlow());
			}	
		}
		
	});
	
	$('#create_cancel').click(function() {
		$("#create_request").css("display", "none");
	});		
});

function init() {
	var $ = go.GraphObject.make;
	
    myDiagram =
      $(go.Diagram, "content",
        {
			contentAlignment: go.Spot.LeftCenter,
			allowDrop: true, 
			allowCopy: false,
			"undoManager.isEnabled": false,
            nodeSelectionAdornmentTemplate:
              $(go.Adornment, "Auto", 
                $(go.Shape, "Rectangle", { fill: "transparent", stroke: "rgba(128,128,128,0.5)", strokeDashArray: [5, 5], width: 85, height: 85 }),
                $(go.Placeholder)
              ),
			dragSelectingTool: null,			
        }
      );

	myDiagram.grid = 
    $(go.Panel, "Grid", 
      { gridCellSize: new go.Size(110, 90) },
      $(go.Shape, "BarV", { fill: "rgba(255, 255, 255, 0.1)", width: 80 }),
      $(go.Shape, "BarH", { fill: "rgba(255, 255, 255, 0.1)", height: 70 })
	);

	myDiagram.toolManager.draggingTool.isGridSnapEnabled = true;

	// initialize the Palette that is on the left side of the page	
	myPalette2 =
      $(go.Palette, "left-side", 
        {
			contentAlignment: go.Spot.TopCenter,
			layout: $(go.LayeredDigraphLayout, { direction: 0 }),	
			"animationManager.duration": 800,
			nodeTemplateMap: myDiagram.nodeTemplateMap,
			dragSelectingTool: null,
			/*autoScale: go.Diagram.Uniform,*/
			maxSelectionCount: 1,
			allowZoom: false,
			// when a node is selected, draw a big yellow circle behind it
            nodeSelectionAdornmentTemplate:
              $(go.Adornment, "Auto",
                { layerName: "Grid" },  // the predefined layer that is behind everything else
                $(go.Shape, "Circle", { fill: null, stroke: null }),
                $(go.Placeholder)
              )
        });
				
	// when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function(e) {
		var button = document.getElementById("SaveButton");
		if (button) button.disabled = !myDiagram.isModified;
		var idx = document.title.indexOf("*");
		if (myDiagram.isModified) {
			if (idx < 0) document.title += "*";
		} else {
			if (idx >= 0) document.title = document.title.substr(0, idx);
		}
    });
	
	myDiagram.addModelChangedListener(function(evt) {
		if (evt.change === go.ChangedEvent.Insert) {
			//console.log(evt.propertyName + " added node with key: " + evt.newValue.key);
		} else if (evt.change === go.ChangedEvent.Remove) {
			//console.log(evt.propertyName + " removed node with key: " + evt.oldValue.key);
		}
	});
	
	var cnt_result = 0;
	myDiagram.addDiagramListener("ExternalObjectsDropped", function(e) {	
		e.subject.each(function(part) {
			if (part.data.type === "Result") {
				myDiagram.startTransaction("setName");
				myDiagram.model.setDataProperty(part.data, "name", "Result" + (++cnt_result) + "_" + Date.now());
				myDiagram.commitTransaction("setName");
			}
		});	
	});
	
	myDiagram.addDiagramListener("LinkDrawn", function(e) {
		var node = myDiagram.findNodeForKey(e.subject.part.data.to);
		switch (node.data.type) {
			case "Merge": deleteMergeData(node.data.key); break;
			case "Result": autoFillResult(node.data.key); break;		
		}
	});
  	
	myDiagram.addModelChangedListener(function(e) {
		if (e.change === go.ChangedEvent.Remove && e.propertyName === "linkDataArray") {
			console.log("-b-");
			console.log(e.Hr);
			console.log("-b-");
		}
	})

	myDiagram.addDiagramListener("ObjectDoubleClicked", function(e) {
		var part = e.subject.part;
		if (!(part instanceof go.Link)) {
			switch (part.data.type) {
				case "Database": showTable(part.data.id); break;
				case "Join": showJoin(part.data.key); break;
				case "Filter": showFilter(part.data.key); break;
				case "Merge": showMerge(part.data.key); break;
				case "Deduplication": showDeduplication(part.data.key); break;
				case "Add": showNewColumn(part.data.key); break;
				case "Aggregation": showAggregation(part.data.key); break;
				case "Rank": showRank(part.data.key); break;
				case "Result": showResult(part.data.key); break;		
			}
		}
	});
	/*
	function isUnoccupied(r, node) {
		var diagram = node.diagram;

		// nested function used by Layer.findObjectsIn, below
		// only consider Parts, and ignore the given Node and any Links
		function navig(obj) {
		  var part = obj.part;
		  if (part === node) return null;
		  if (part instanceof go.Link) return null;
		  return part;
		}

		// only consider non-temporary Layers
		var lit = diagram.layers;
		while (lit.next()) {
		  var lay = lit.value;
		  if (lay.isTemporary) continue;
		  if (lay.findObjectsIn(r, navig, null, true).count > 0) return false;
		}
		return true;
	}

	// a Part.dragComputation function that prevents a Part from being dragged to overlap another Part
	function avoidNodeOverlap(node, pt, gridpt) {
		// this assumes each node is fully rectangular
		var bnds = node.actualBounds;
		var loc = node.location;
		// see if the area at the proposed location is unoccupied
		// use PT instead of GRIDPT if you want to ignore any grid snapping behavior
		var x = gridpt.x - (loc.x - bnds.x);
		var y = gridpt.y - (loc.y - bnds.y);
		var r = new go.Rect(x, y, bnds.width, bnds.height);
		// maybe inflate R if you want some space between the node and any other nodes
		if (isUnoccupied(r.inflate(-1, -1), node)) return gridpt;  // OK
		return loc;  // give up -- don't allow the node to be moved to the new location
	}
	*/
	function makePort(name, leftside, maxlinks = true) {
		var port = $(go.Shape, "Rectangle",
		{
			fill: "gray", stroke: null,
			desiredSize: new go.Size(8, 8),
			portId: name,  // declare this object to be a "port"
			cursor: "pointer"  // show a different cursor to indicate potential link point
		});
		if (maxlinks) {
			port.toMaxLinks = 1;
		}
		
		var lab = $(go.TextBlock, name,  // the name of the port
                  { font: "5pt sans-serif" });

		var panel = $(go.Panel, "Horizontal",
                    { margin: new go.Margin(2, 0) });

		// set up the port/panel based on which side of the node it will be on
		if (leftside) {
			port.toSpot = go.Spot.Left;
			port.toLinkable = true;
			lab.margin = new go.Margin(1, 0, 0, 1);
			panel.alignment = go.Spot.TopLeft;
			panel.add(port);
			panel.add(lab);
		} else {
			port.fromSpot = go.Spot.Right;
			port.fromLinkable = true;
			lab.margin = new go.Margin(1, 1, 0, 0);
			panel.alignment = go.Spot.TopRight;
			panel.add(lab);
			panel.add(port);
		}
		return panel;
    }

	function makeTemplate(typename, shape, icon, inports, outports) {
	    shape === "Hexagon" ? angle = 90 : angle = 0;
	    var node = $(go.Node, "Vertical", {
	            width: 80,
	            height: 70,
	            /*dragComputation: avoidNodeOverlap,*/
	            mouseDrop: function(e, node) { // disallow dropping anything onto an "item"
	                node.diagram.currentTool.doCancel();
	            }
	        }, new go.Binding("location", "loc").makeTwoWay(),
	        $(go.Panel, "Spot",
	            $(go.Panel, "Auto", {
	                    width: 50,
	                    height: 50
	                },
	                $(go.Shape, shape, {
	                    fill: "white",
	                    stroke: "#4286f4",
	                    strokeWidth: 2,
	                    spot1: go.Spot.TopLeft,
	                    spot2: go.Spot.BottomRight,
	                    angle: angle
	                }, new go.Binding("fill", "highlight", function(v) {
	                    return v ? "pink" : "white";
	                }), new go.Binding("stroke", "highlight", function(v) {
	                    return v ? "red" : "#4286f4";
	                })),
	                $(go.Panel, "Table",
	                    $(go.Picture, icon, {
	                        row: 1,
	                        width: 20,
	                        height: 20,
	                        imageStretch: go.GraphObject.Uniform,
	                        margin: new go.Margin(0, 0, 0, 0),
	                    })
	                )
	            ),
	            $(go.Panel, "Vertical", {
	                    alignment: go.Spot.Left,
	                    alignmentFocus: new go.Spot(0, 0.5, -8, 0)
	                },
	                inports),
	            $(go.Panel, "Vertical", {
	                    alignment: go.Spot.Right,
	                    alignmentFocus: new go.Spot(1, 0.5, 8, 0)
	                },
	                outports)
	        ),
	        $(go.TextBlock, {
	                margin: 3,
	                isMultiline: false,
	                maxLines: 1,
	                editable: false,
	                maxSize: new go.Size(90, 40),
	                stroke: "black",
	                font: "bold 8pt sans-serif"
	            },
	            new go.Binding("text", "name").makeTwoWay()), {
	            contextMenu: // define a context menu for each node
	                $(go.Adornment, "Vertical", // that has one button
	                    $("ContextMenuButton",
	                        $(go.TextBlock, "JSON"), {
	                            click: function(e, obj) {
	                                save();
	                            }
	                        })
	                    // more ContextMenuButtons would go here
	                ) // end Adornment
	        }, {
	            toolTip: // define a tooltip for each node that displays the color as text
	                $(go.Adornment, "Auto",
	                    $(go.Shape, {
	                        fill: "#FFFFCC"
	                    }),
	                    $(go.TextBlock, {
	                            margin: 4
	                        },
	                        new go.Binding("text", "name"),
	                        new go.Binding("text", "tooltip"))
	                ) // end of Adornment
	        }
	    );
		myDiagram.nodeTemplateMap.add(typename, node);
	}
	   
	makeTemplate("Database", "DiskStorage", "img/workflow.icons/ic_db.svg", [], [makePort("", false)]);
	makeTemplate("Table", "DividedEvent", "img/workflow.icons/ic_table.svg", [makePort("", true)], [makePort("OUT", false)]);
	makeTemplate("Join", "Rectangle", "img/workflow.icons/ic_join.svg", [makePort("L", true), makePort("R", true)], [makePort("OUT", false)]);
	makeTemplate("Merge", "CreateRequest", "img/workflow.icons/ic_merge.svg", [makePort("IN", true, false)], [makePort("OUT", false)]);
	makeTemplate("Deduplication", "Hexagon", "img/workflow.icons/ic_deduplication.svg", [makePort("", true)], [makePort("OUT", false)]);
	makeTemplate("Add", "StopSign", "img/workflow.icons/ic_add.svg", [makePort("", true)], [makePort("OUT", false)]);
	makeTemplate("Filter", "Circle", "img/workflow.icons/ic_filter.svg", [makePort("", true)], [makePort("OUT", false)]);
	makeTemplate("Aggregation", "Terminator", "img/workflow.icons/ic_aggregation.svg", [makePort("", true)], [makePort("OUT", false)]);
	makeTemplate("Rank", "AndGate", "img/workflow.icons/ic_sort.svg", [makePort("", true)], [makePort("OUT", false)]);
	makeTemplate("Snp", "Card", "img/workflow.icons/ic_snp.svg", [makePort("", true)], [makePort("OUT", false)]);
	makeTemplate("Result", "Octagon", "img/workflow.icons/ic_result.svg", [makePort("", true)], [makePort("OUT", false)]);
	
	myDiagram.linkTemplate =
    $(go.Link,
      $(go.Shape, "Rectangle", { stroke: "gray" }),  // the link shape
      $(go.Shape, { toArrow: "OpenTriangle", stroke: "gray" }) // the arrowhead
    );
	
	load_db();
		
	var data = get_data();
		
	data.nodeDataArray = [];
	myDiagram.model = go.Model.fromJson(data);
	
	if (sinario != null) {
		myDiagram.model = go.Model.fromJson(sinario);
	}
	
	data.nodeDataArray = [{"type":"Join", "name":"Join", "left_table": "", "right_table":""}, {"type":"Filter", "name":"Filter"}, {"type":"Merge", "name":"Union"}, {"type":"Deduplication", "name":"Deduplication"}, {"type":"Add", "name":"New Column", "mode": 1}, {"type":"Aggregation", "name":"Aggregation"}, {"type":"Rank", "name":"Sort"}, {"type":"Snp", "name":"Snp"}, {"type":"Result", "name":"Result"}];
	myPalette2.model = go.Model.fromJson(data);
	
	myDiagram.toolManager.linkingTool.linkValidation = validateLink;
	
	function validateLink(fromnode, fromport, tonode, toport) {
		if (fromnode.data.type === "Database" && tonode.data.type === "Table") {			
			return tonode.data.parent_key === fromnode.data.id;
		}
		if (fromnode.data.type != "Database" && tonode.data.type === "Table") {
			return false;
		}
		if (fromnode.data.type === "Database" && tonode.data.type != "Table") {
			return false;
		}
		if (fromnode.data.type === "Join" || fromnode.data.type === "Filter" || fromnode.data.type === "Merge" || fromnode.data.type === "Deduplication" || fromnode.data.type === "Add" || fromnode.data.type === "Aggregation") {
			if (tonode.data.type === "Join" || tonode.data.type === "Filter" || tonode.data.type === "Merge" || tonode.data.type === "Deduplication" || tonode.data.type === "Add" || tonode.data.type === "Aggregation") {
				return false;
			}
		}
		if (fromnode.data.type === "Result" && tonode.data.type === "Result") {
			return false;
		}
		if (fromnode.data.type === "Table" && tonode.data.type === "Result") {
			return false;
		}

		if (tonode.data.type === "Deduplication" /* || tonode.data.type === "Aggregation" */) {
			if (fromnode.findTreeParentNode().data.type != "Rank") {
				return false;
			}
		}
		return true;
	}
}

// Show the diagram's model in JSON format that the user may edit
function save() {	
	var save = myDiagram.model.toJson();
	myDiagram.isModified = false;
	return save;	
}

sinario = null;
function run(url) {
	switch (url) {
		case 1: sinario = sinario1(); break;
		case 2: sinario = sinario2(); break;
		case 3: sinario = sinario3(); break;
		case 4: sinario = sinario4(); break;
		case 5: sinario = sinario5(); break;
		case 6: sinario = sinario6(); break;
	}
}

function loadFromDb(url) {
	$.ajax({
		async: false,
		method: "GET",
		url: "../controller/ajax.php?datasetUID=" + url,
		dataType: "json",
		success: function(table_data) {
			console.log(table_data);
			if (table_data != null ) {
				sinario = JSON.parse(table_data[0]['workflowJSON']);
				datasetUID = url;
				getSavedDataFromDb(url);
			}
		}
	});	
}

function getSavedDataFromDb(url) {
	$.ajax({
		method: "GET",
		url: "../controller/ajax.php?tr_dataset_list=" + url,
		dataType: "json",
		success: function(data) {
			console.log(data);
			if (data != null) {
				$("input[name=category]").val(data[0].datasetCategory);
				$("input[name=subject]").val(data[0].datasetSubject);
				$("textarea[name=contents]").val(data[0].datasetContents);
				$("input[name=inputTag]").val(data[0].datasetTag);
				$("input[name=openState][value='" + data[0].openState + "']").prop("checked",true);
				$("input[name=dataSetVersion]").val(data[0].versionInfo);
				$("input[name=userName]").val(data[0].userName);
				$("input[name=userEmail]").val(data[0].userEmail);
				$("input[name=managerName]").val(data[0].managerName);
		 		$("input[name=managerEmail]").val(data[0].managerEmail);
	 		}
		}
	});

	$.ajax({
		method: "GET",
		url: "../controller/ajax.php?tr_workflow_datasetuid=" + url,
		dataType: "json",
		success: function(data) {
			console.log("tr_workflow_datasetuid: ");
			console.log(data[0]["cnt"]);
			if (data[0]["cnt"] > 0) {
				$("#btnExecute").text("정보를 표시하다");
				$("#btnExecute").val(1);	
	 		}
		}
	});

}

function download(param) {
	if (param > 0 && param < 7) {
		if (param == 4 || param == 6) {
			alert('We are processing!');
		}
		else {
			location.href = "result_sinario" + param + ".csv"; 
		}
	}
}

function executeFlow() {			
	queries = [], query = {}, extraction = {};

	var save = myDiagram.model.toJson();
	myDiagram.isModified = false;
	var json = JSON.parse(save);
	var arr = [];
	for (p in json.linkDataArray) {
		obj = json.linkDataArray[p];
		var from_node = myDiagram.findNodeForKey(obj.from);
		if(from_node.data.type === "Database") {
			arr.push(from_node.data.key);
		}
	}
	var db_list = arr.filter(function(item, pos) {
		return arr.indexOf(item)== pos; 
	});
	
	for (key in db_list) {
		generateQuery(db_list[key]);	
	}

	/** -- remove duplicate queries -- **/
	for (i = 0; i < queries.length; i ++) {
		for (j = i - 1; j >= 0 && i < queries.length; j --) {
			if (queries[i]["query"] === queries[j]["query"]) {
				queries.splice(j, 1);
				i = i - 1;
				break;			
			}
		}
 	}

 	var jsonObj = {"serverRequest": {"scenarioQueryList": queries}};

 	console.log(jsonObj);
	return JSON.stringify(jsonObj);
}

function generateQuery(arr) {
	if(arr) {
		var node = 	myDiagram.findNodeForKey(arr);
		var root = node.findTreeRoot();		

		node.findTreeChildrenNodes().each(function(child) {
			if (child.data.type === "Table") {
				query["2"] = " FROM " + root.data.name + "." + child.data.name;	
			}
			if (child.data.type === "Filter") {
				if (typeof child.data.condition != "undefined") {
					query["3"] = " WHERE " + child.data.condition;
				}
				var parent = child.findTreeParentNode();
				var db_name = (parent.data.type === "Result" ? "workflow" : root.data.name);
				query["2"] = " FROM " + db_name + "." + parent.data.name; 
			}
			if (child.data.type === "Add") {
				var except = true;
				child.findNodesConnected("OUT").each(function(result) {
					if (result.data.type === "Result") {
						for(i in result.data.unselected_columns) {
							if(result.data.unselected_columns[i].column_name === child.data.new_column.column_name) {
								except = false;
							}
						}
					}
				});
				if (except) {
					if (typeof child.data.condition != "undefined") {
						query["2"] = "," + child.data.condition;
						extraction["2"] = "," + child.data.new_column.column_name;
					}
					var parent = child.findTreeParentNode();
					var db_name = (parent.data.type === "Result" ? "workflow" : root.data.name);
					query["2"] = query["2"] + " FROM " + db_name + "." + parent.data.name;
				}
				else {
					var parent = child.findTreeParentNode();
					query["2"] = " FROM " + node.data.name + "." + parent.data.name;	
				}
			}
			if (child.data.type === "Deduplication") {
				var parent = child.findTreeParentNode();
				var db_name = (parent.data.type === "Result" ? "workflow" : root.data.name);
				query["2"] = " FROM " + db_name + "." + parent.data.name;
				console.log(parent.findTreeParentNode());		
			}
			if (child.data.type === "Aggregation") {
				var parent = child.findTreeParentNode();
				var db_name = (parent.data.type === "Result" ? "workflow" : root.data.name);
				query["2"] = " FROM " + db_name + "." + parent.data.name;
			}
			if (child.data.type === "Rank") {
				// ehnii eeljind rank bwal l shuud automataar selectlene gj tootsloo gehdee eniig daraa zasna
				if (typeof child.data.condition != "undefined") {
					query["2"] = "," + child.data.condition;
					extraction["2"] = "," + child.data.sort_name;
					/*
					for (j in child.data.created_columns) {
						extraction["2"] = "," + child.data.created_columns[j].column_name;
					}
					*/	
				}
				var parent = child.findTreeParentNode();
				var db_name = (parent.data.type === "Result" ? "workflow" : root.data.name);
				query["2"] = query["2"] + " FROM " + db_name + "." + parent.data.name;
			}
			if (child.data.type === "Result") {
				child.findNodesConnected("").each(function(connected_node) {
					if (connected_node.data.type === "Join") {
						var join_type = " " + connected_node.data.join_type + " ";
						connected_node.findNodesConnected(child.findTreeParentLink().data.frompid).each(function(left_node) {
							connected_node.findNodesConnected("L").each(function(l_node) {
								root = l_node.findTreeRoot();
								var db_name = (l_node.data.type === "Result" ? "workflow" : root.data.name);
								query["2"] = " FROM " + db_name + "." + l_node.data.name + " L";
								left_ds = "L." + connected_node.data.left_join_id + " = ";
							});
							connected_node.findNodesConnected("R").each(function(r_node) {
								root = r_node.findTreeRoot();
								var db_name = (r_node.data.type === "Result" ? "workflow" : root.data.name);
								query["3"] = join_type + db_name + "." + r_node.data.name + " R ON " + left_ds + "R." + connected_node.data.right_join_id;	
							});	
						});
		
						var sel = "";
						var bool = false;
						var selected_columns = child.data.selected_columns;

						extraction["1"] = "SELECT ";
						var sel_ext = "";

						for (i = 0; i < connected_node.data.left_table.length; i ++) {
							bool = false;
							for (j = 0; j < selected_columns.length; j ++) {
								if (connected_node.data.left_table[i]['column_name'] === selected_columns[j]['column_name']) {
									bool = true;
								}
							}
							if (bool) {
								sel += "L." + connected_node.data.left_table[i]['column_name'] + ",";
								sel_ext += connected_node.data.left_table[i]['column_name'] + ",";
							}
						}

						for (i = 0; i < connected_node.data.new_right_columns.length; i ++) {
							bool = false;
							for (j = 0; j < selected_columns.length; j ++) {
								if (connected_node.data.new_right_columns[i]['column_name'] === selected_columns[j]['column_name']) {
									bool = true;
								}
							}
							if (bool) {
								bool = false;
								for (j = 0; j < connected_node.data.right_table.length; j ++) {
									if (connected_node.data.new_right_columns[i]['column_name'] === connected_node.data.right_table[j]['column_name']) {
										bool = true;
									}
								}

								if (bool) {
									sel += "R." + connected_node.data.right_table[i]['column_name'] + ",";
									sel_ext += connected_node.data.right_table[i]['column_name'] + ",";
								}
								else {
									sel += "R." + connected_node.data.right_table[i]['column_name'] + " AS " + connected_node.data.new_right_columns[i]['column_name'] + ",";
									sel_ext += connected_node.data.new_right_columns[i]['column_name'] + ",";
								}

							}
						}

						sel = sel.slice(0, -1);
						sel_ext = sel_ext.slice(0, -1);
						extraction["2"] = sel_ext;
						extraction["3"] = " FROM workflow." + child.data.name;
						
						query["0"] = "CREATE TABLE workflow." + child.data.name + " STORED AS ORC AS ";
						query["1"] = "SELECT " + sel;
					}
					else if(connected_node.data.type === "Deduplication") {
						var result_node = connected_node.findTreeParentNode();
						var sort_node = result_node.findTreeParentNode();
						var sel_ext = "";
						var sel = "";
						for (var i = 0; i < child.data.selected_columns.length; i ++) {
							sel += "L." + child.data.selected_columns[i]['column_name'] + ",";
							sel_ext += child.data.selected_columns[i]['column_name'] + ",";
						}
						sel_ext = sel_ext.slice(0, -1);
						sel = sel.slice(0, -1);
						query["0"] = "CREATE TABLE workflow." + child.data.name + " STORED AS ORC AS ";
						query["1"] = "SELECT " + sel;
						var sub_sel = "";
						var logic = "";
						for (var i = 0; i < connected_node.data.columns.length; i ++) {
							sub_sel += "T." + connected_node.data.columns[i]['column_name'] + ",";
							logic += "L." + connected_node.data.columns[i]['column_name'] + "=R." + connected_node.data.columns[i]['column_name'];
							logic += " AND ";	
						}
						sub_sel = sub_sel.slice(0, -1);
						var mins = "MIN(T." + sort_node.data.sort_name + ") AS " + sort_node.data.sort_name + "_1";
						logic += "L." + sort_node.data.sort_name + "=R." + sort_node.data.sort_name + "_1";
						var db_name = (result_node.data.type === "Result" ? "workflow" : root.data.name);
						query["2"] = " FROM " + db_name + "." + result_node.data.name + " L JOIN (SELECT " + sub_sel + "," + mins + " FROM " + db_name + "." + result_node.data.name + " T GROUP BY " + sub_sel + ") R ON ";
						query["3"] = logic;

						extraction["1"] = "SELECT ";
						extraction["2"] = sel_ext;
						extraction["3"] = " FROM workflow." + child.data.name;	
					}
					/*
					else if (connected_node.data.type === "Aggregation") {
						var result_node = connected_node.findTreeParentNode();
						var sort_node = result_node.findTreeParentNode();
						var as_names = connected_node.data.aggregate;
						var group_by1 = "", group_by2 = "", logic = "";
						for (var i = 0; i < connected_node.data.group_by.length; i ++) {		
							group_by1 += "T1." + connected_node.data.group_by[i]['column_name'] + ",";

							group_by2 += "T2." + connected_node.data.group_by[i]['column_name'] + ",";
							logic += "L." + connected_node.data.group_by[i]['column_name'] + "=R." + connected_node.data.group_by[i]['column_name'];
							if (i < connected_node.data.group_by.length - 1) {
								logic += " AND ";
							}
						}
						group_by1 = group_by1.slice(0, -1);	
						group_by2 = group_by2.slice(0, -1);

						var order_by = "T1." + sort_node.data.sort_name;
						var last_value = "";
						for (var i = 0; i < result_node.data.selected_columns.length; i ++) {		
							last_value += "LAST_VALUE(T1." + result_node.data.selected_columns[i]['column_name'] + ") OVER(PARTITION BY " + group_by1 + " ORDER BY " + order_by + " RANGE BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS " + result_node.data.selected_columns[i]['column_name'] + ",";
						}
						last_value = last_value.slice(0, -1);

						var agg_functions = "", sel = "";
						for (var i = 0; i < as_names.length; i ++) {
							sel += "R." + as_names[i]['name'] + ",";
							agg_functions += as_names[i]['function'] + "(T2." + as_names[i]['column_name'] + ") AS " + as_names[i]['name'] + ","   
						}
						sel = sel.slice(0, -1);
						agg_functions = agg_functions.slice(0, -1);

						var db_name = (result_node.data.type === "Result" ? "workflow" : root.data.name);
						query["0"] = "CREATE TABLE workflow." + child.data.name + " STORED AS ORC AS ";
						query["1"] = "SELECT L.*," + sel + " FROM (SELECT " + last_value;
						query["2"] = " FROM " + db_name + "." + result_node.data.name + " AS T1) L LEFT JOIN (SELECT " + group_by2 + "," + agg_functions + " FROM " + db_name + "." + result_node.data.name + " T2 GROUP BY " + group_by2 + ") R ON ";
						query["3"] = logic; 

						extraction["1"] = "SELECT ";
						extraction["2"] = "*";
						extraction["3"] = " FROM workflow." + child.data.name;					
					}
					*/
					else {
						var sel_columns = "";
						if (node.data.type === "Add") {
							for (i in child.data.selected_columns) {
								if (node.data.new_column.column_name === child.data.selected_columns[i].column_name) {
									continue;
								}
								else {
									sel_columns = sel_columns + child.data.selected_columns[i].column_name + ",";
								}
							}	
						}
						else { 
							if (node.data.type === "Rank") {
								for (i in child.data.selected_columns) {
									if (node.data.sort_name != child.data.selected_columns[i].column_name) {
										sel_columns = sel_columns + child.data.selected_columns[i].column_name + ",";	
									}
								}	
							}
							else { 
								for (i in child.data.selected_columns) {
									sel_columns = sel_columns + child.data.selected_columns[i].column_name + ",";
								}
							}
						}
						sel_columns = sel_columns.slice(0, -1);
						query["0"] = "CREATE TABLE workflow." + child.data.name + " STORED AS ORC AS ";
						var parent = child.findTreeParentNode();
						query["1"] = "SELECT "; 

						query["1"] += sel_columns;

						extraction["1"] = "SELECT " + sel_columns;
						extraction["3"] = " FROM workflow." + child.data.name;
						
						/*
						if (parent.data.type === "Aggregation") {
							var group_by = parent.data.group_by;
							var agg_names = [], agg_functions = [], agg_cols = [];
							for (var i = 0; i < parent.data.aggregate.length; i ++) {
								agg_names.push(parent.data.aggregate[i]['name']);
								agg_functions.push(parent.data.aggregate[i]['function']);
								agg_cols.push(parent.data.aggregate[i]['column_name']);
							}							
							sel_columns = "";
							for (j in child.data.selected_columns) {
								var index = agg_names.indexOf(child.data.selected_columns[j].column_name);
								if (index > -1) {
									sel_columns += agg_functions[index] + "(" + agg_cols[index] + ") AS " + agg_names[index] + ",";
								}
								else {
									sel_columns += child.data.selected_columns[j].column_name + ",";
								}
							}
							sel_columns = sel_columns.slice(0, -1);
							query["1"] = "SELECT " + sel_columns;
							query["3"] = "";
							if (typeof group_by != "undefined") {
								if (group_by.length > 0) {
									var col = "";
									for (i = 0; i < group_by.length; i ++) {
										col += group_by[i].column_name + ",";
									}
									col = col.slice(0, -1);
									query["3"] = " GROUP BY " + col;
								}
							}
						}
						*/
						if (parent.data.type === "Aggregation") {
							query["1"] = "SELECT " + parent.data.condition; 
							var group_by = parent.data.group_by;	
							var order_by = parent.data.order_by;
							query["3"] = "";
							if (typeof group_by != "undefined") {
								if (group_by.length > 0) {
									var col = "";
									for (i = 0; i < group_by.length; i ++) {
										col += group_by[i].column_name + ",";
									}
									col = col.slice(0, -1);
									query["3"] = " GROUP BY " + col;
									query["1"] += "," + col;
								}
			
							}
							/*
							if (typeof order_by != "undefined") {
								if (order_by.length > 0) {
									bool = false;
									for (i = 0; i < order_by.length; i ++) {
										if (order_by[i].type != "") {
											bool = true;
										}
									}
									if (bool) {
										var col = "";
										for (i = 0; i < order_by.length; i ++) {
											if (order_by[i].type != "") {
												col += order_by[i].column_name + " " + order_by[i].type + ",";
											}
										}
										col = col.slice(0, -1);
										query["3"] += " ORDER BY " + col;
									}
								}
							}
							*/
						}
						if (parent.data.type === "Merge") {
							query["1"] = parent.data.query;
							query["2"] = "";
						}
					}

					var sliced_query = "";
					for (obj in query) {
						sliced_query += query[obj];
					}
					query = {};
					
					var myObj1 = new Object();
					myObj1.query = sliced_query;
					myObj1.type = "creation";
						

					var sliced_extra = "";
					for (obj in extraction) {
						sliced_extra += extraction[obj];
					}
					extraction = {};
					var myObj2 = new Object();
					myObj2.query = sliced_extra;
					myObj2.type = "extraction";
					
					queries.push(myObj1);
					queries.push(myObj2);
				});
			}	
			generateQuery(child.data.key);
		});
	}
}

// initialize data that is on the page
function get_data() {
	return { 
		"class": "go.GraphLinksModel",
		"nodeCategoryProperty": "type",
		"linkFromPortIdProperty": "frompid",
		"linkToPortIdProperty": "topid",
		"nodeDataArray": [
		],
		"linkDataArray": []
	};
}

function load_db() {
	$('#table').empty();
	$('#db').empty().append("<span style='display: inline-block; vertical-align: top; padding: 0px; width: 100%;'><div id='tab-database' style='height: 130px; width: 100%;'></div></span>");
	changeTab(2, false);
	var $$ = go.GraphObject.make;
    myPalette1 =
      $$(go.Palette, "tab-database",  
        {
			contentAlignment: go.Spot.Left,
			"animationManager.duration": 800,
			maxSelectionCount: 1,
			allowZoom: false,
			nodeTemplateMap: myDiagram.nodeTemplateMap,
			layout: $$(go.LayeredDigraphLayout, { direction: 90 }),
			dragSelectingTool: null,
			nodeSelectionAdornmentTemplate:
              $$(go.Adornment, "Auto",
                { layerName: "Grid" },  
                $$(go.Shape, "Circle", { fill: null, stroke: null }),
				$$(go.Placeholder)
              )
        });
	
	var data = get_data();	
	
	var dt;
	$.ajax({
		async: false,
		method: "GET",
		url: "../controller/ajax.php?load_db",
		dataType: "json",
		success: function(data) {
			dt = data;
		}
	});
	data.nodeDataArray = dt;
	myPalette1.model = go.Model.fromJson(data);
}

function load_table(db_id) {
	var data = get_data();
		
	$.ajax({
		async: false,
		method: "GET",
		url: "../controller/ajax.php?q=" + db_id,
		dataType: "json",
		success: function(result) {
			data.nodeDataArray = result;
		}
	});
	myPalette1.model = go.Model.fromJson(data);
}

/** -- enable current tab -- **/
function changeTab(i, enable) {
	if(enable) {
		$('.nav-tabs li').eq(i).removeClass('disabled');
		$('.nav-tabs li').eq(i).children().first().attr('data-toggle', 'tab');	
		$('.nav-tabs li').eq(i).children().first().trigger('click');
	}
	else {
		for(j = 1; j <= i; j ++) {
			$('.nav-tabs li').eq(j).addClass('disabled');
			$('.nav-tabs li').eq(j).children().first().removeAttr('data-toggle');	
		}
	}
}

function showTable(db_id) {	
	changeTab(1, true);
	changeTab(2, false);
	$('#db').empty();
	$('#table').empty().append("<span style='display: inline-block; vertical-align: top; padding: 0px; width: 100%;'><div id='tab-database' style='height: 130px; width: 100%;'></div></span>");
	var $$ = go.GraphObject.make;
    myPalette1 =
      $$(go.Palette, "tab-database",  
        {
        	nodeTemplateMap: myDiagram.nodeTemplateMap,
			contentAlignment: go.Spot.Left,
			"animationManager.duration": 800,
			maxSelectionCount: 1,
			allowZoom: false,
			nodeTemplateMap: myDiagram.nodeTemplateMap,
			layout: $$(go.LayeredDigraphLayout, { direction: 90 }),
			dragSelectingTool: null,
			nodeSelectionAdornmentTemplate:
              $$(go.Adornment, "Auto",
                { layerName: "Grid" },  // the predefined layer that is behind everything else
                $$(go.Shape, "Circle", { fill: null, stroke: null }),
                $$(go.Placeholder)
              )	
        });
	load_table(db_id);
}

/* -- start node functions -- */
function getColumnsOfDataSet(key) {
	var node = myDiagram.findNodeForKey(key);
	var selected_columns = [];
	if(node.data.type === "Table") {
		$.ajax({
			async: false,
			method: "GET",
			url: "../controller/ajax.php?f=" + key,
			dataType: "json",
			success: function(data) {
				selected_columns = data;
			}
		});
	}
	else {
		selected_columns = myDiagram.findNodeForKey(key).data.selected_columns;
	}
	return selected_columns;
}

var left_join_table = [], right_join_table = [];
function findNodesForJoin(key) {
	var node = myDiagram.findNodeForKey(key);
	node.findNodesConnected("L").each(function(left_node) {
		left_join_table = getColumnsOfDataSet(left_node.data.key);
	});
	node.findNodesConnected("R").each(function(right_node) {
		right_join_table = getColumnsOfDataSet(right_node.data.key);
	});
}

function showJoin(key) {
	problem_key = [];
	if (detectConnectionForJoin(key)) {
		if(detectErrorFromPreviousNodes(key)) {
			if (checkShowPopup(key)) {
				chosed_node_key = key;
				findNodesForJoin(key);
				var node = myDiagram.findNodeForKey(key);
				$.join_dialog(left_join_table, right_join_table, node.data.join_type, node.data.left_join_id, node.data.right_join_id, node.data.new_right_columns);	
				$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});	
			}
		}
	}
}

function detectConnectionForJoin(key) {
	var node = myDiagram.findNodeForKey(key);	
	var cnt = 0;
	node.findLinksConnected().each(function(link) {
		if (link.data.frompid === "OUT" && (link.data.topid === "L" || link.data.topid === "R")) {
			cnt ++;
		}
	});
	
	if (cnt === 2) {
		showTooltip(key, node.data.type);
		return true;
	}
	else {
		showTooltip(key, "이 노드에 2 개의 노드를 연결해야합니다!");
		return false;
	}
}

function setJoinData(left_join_id, right_join_id, join_type, new_right_columns) {
	highlight(chosed_node_key, !validateSetColumns(left_join_table.concat(right_join_table)));
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "left_join_id", left_join_id);	
	myDiagram.model.setDataProperty(node.data, "right_join_id", right_join_id);	
	myDiagram.model.setDataProperty(node.data, "left_table", left_join_table);	
	myDiagram.model.setDataProperty(node.data, "right_table", right_join_table);
	myDiagram.model.setDataProperty(node.data, "new_right_columns", new_right_columns);
	myDiagram.model.setDataProperty(node.data, "join_type", join_type);
	myDiagram.commitTransaction("updateNode");
	setAutoFillRemainings(node.data.key, left_join_table.concat(new_right_columns));
}

var chosed_node_key;	 

function setFilterData(condition, filter, logical) {
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "condition", condition);	
	myDiagram.model.setDataProperty(node.data, "filter", filter);
	myDiagram.model.setDataProperty(node.data, "logical", logical);		
	myDiagram.commitTransaction("updateNode");
	highlight(chosed_node_key, false);
}

function showFilter(key) {
	problem_key = [];
	if (detectErrorFromPreviousNodes(key)) {
		if (checkShowPopup(key)) {
			chosed_node_key = key;
			var node = myDiagram.findNodeForKey(key);
			var parent = node.findTreeParentNode();
			var filter_columns = getColumnsOfDataSet(parent.data.key);
			$.filter_dialog(filter_columns, node.data.filter, node.data.logical);
			$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});
		}
	}
}

function setDeduplicationData(columns) {
	highlight(chosed_node_key, !validateSetColumns(columns));
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "columns", columns);	
	myDiagram.commitTransaction("updateNode");
	setAutoFillRemainings(node.data.key, columns);
}

function showDeduplication(key) {
	problem_key = [];
	if (detectErrorFromPreviousNodes(key)) {
		if (checkShowPopup(key)) {	
			chosed_node_key = key;
			var node = myDiagram.findNodeForKey(key);
			var parent = node.findTreeParentNode();
			var deduplication_columns = getColumnsOfDataSet(parent.data.key);
			$.deduplication_dialog(deduplication_columns, node.data.columns);
			$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});
		}
	}
}

function showNewColumn(key) {
	if (detectErrorFromPreviousNodes(key)) {
		if(checkShowPopup(key)) {
			chosed_node_key = key;
			var node = myDiagram.findNodeForKey(key);
			var parent = node.findTreeParentNode();
			var new_columns = getColumnsOfDataSet(parent.data.key);
			myDiagram.model.setDataProperty(node.data, "columns_info", new_columns);	
			$.new_column_dialog(node.data.name, node.data.mode, node.data.equation, new_columns, node.data.filter, node.data.else_val);
			$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});
		}
	}
}

function setNewColumnData(name, mode, equation = null, condition, filter = null, else_val = null) {
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "name", name);
	myDiagram.model.setDataProperty(node.data, "new_column", {"column_name": name, "type": "varchar"});
	myDiagram.model.setDataProperty(node.data, "mode", mode);
	myDiagram.model.setDataProperty(node.data, "equation", equation);
	myDiagram.model.setDataProperty(node.data, "condition", condition);
	myDiagram.model.setDataProperty(node.data, "filter", filter);
	myDiagram.model.setDataProperty(node.data, "else_val", else_val);
	myDiagram.commitTransaction("updateNode");
	highlight(chosed_node_key, false);
	setAutoFillRemainings(node.data.key, node.data.columns_info.concat(node.data.new_column));
}

function setAutoFillRemainings(key, columns) {
	var node = myDiagram.findNodeForKey(key);
	node.findNodesConnected("OUT").each(function(child) {
		if (child.data.type === "Result") {	
			var next_selected = [];
			for(i = 0; i < columns.length; i ++) {
				var bool = false;	
				for(j = 0; j < child.data.unselected_columns.length; j ++) {
					if (child.data.unselected_columns[j]["column_name"] === columns[i]["column_name"] && child.data.unselected_columns[j]["type"] === columns[i]["type"]) {
						bool = true;
					}						
				}
				if (!bool) {
					next_selected.push(columns[i]);
				}
			}
			highlight(child.data.key, !validateSetColumns(next_selected));
			myDiagram.startTransaction("updateNode");
			myDiagram.model.setDataProperty(child.data, "selected_columns", next_selected);	
			myDiagram.commitTransaction("updateNode");
			setFillChildResults(child.data.key);		
		}
	});	
}

function showMerge(key) {
	if (detectErrorFromPreviousNodes(key)) {
		if (checkShowPopup(key)) {
			chosed_node_key = key;
		
			var json = {"objects": {"columns": [], "tables": []}};
		
			var node = myDiagram.findNodeForKey(key);
			node.findNodesConnected("IN").each(function(node) {
				var bool = true;
				var col = new Object();
				
				if (node.data.type === "Result") {
					json.objects.tables.push("workflow." + node.data.name);
					col.cols = node.data.selected_columns;
					bool = false;
				}		

				if (node.data.type === "Table") {
					$.ajax({
						async: false,
						method: "GET",
						url: "../controller/ajax.php?f=" + node.data.key,
						dataType: "json",
							success: function(data) {
								var root = node.findTreeRoot();
								json.objects.tables.push(root.data.name + "." + node.data.name);
								col.cols = data;
							}
						});
					bool = false;
				}
				json.objects.columns.push(col);
			});
			console.log("merge test---");
			console.log(json);				
			console.log("merge test---");
			$.merge_dialog(json, node.data.merged_data);
			$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});
		}
	}
}

function setMergeData(json, merged_columns, query) {
	highlight(chosed_node_key, !validateSetColumns(merged_columns));
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "merged_data", json);
	myDiagram.model.setDataProperty(node.data, "merged_columns", merged_columns);
	myDiagram.model.setDataProperty(node.data, "query", query);
	myDiagram.commitTransaction("updateNode");
	setAutoFillRemainings(node.data.key, merged_columns);
}

function showAggregation(key) {	
	if (detectErrorFromPreviousNodes(key)) {
		if (checkShowPopup(key)) {
			chosed_node_key = key;
			var node = myDiagram.findNodeForKey(key);
			var parent = node.findTreeParentNode();
			var columns = getColumnsOfDataSet(parent.data.key);
			//myDiagram.startTransaction("updateNode");
			//myDiagram.model.setDataProperty(node.data, "columns", columns);
			//myDiagram.commitTransaction("updateNode");
			console.log("test123AGG:");
			console.log(columns);
			$.aggregation_dialog(columns, node.data.aggregate, node.data.group_by);
			$(".chosen").chosen();
			$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});
		}
	}
}

function setAggregationData(condition, aggregate, created_columns, group_by) {
	highlight(chosed_node_key, !validateSetColumns(columns));
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "condition", condition);	
	myDiagram.model.setDataProperty(node.data, "aggregate", aggregate);
	//myDiagram.model.setDataProperty(node.data, "created_columns", created_columns);
	myDiagram.model.setDataProperty(node.data, "columns", created_columns);
	myDiagram.model.setDataProperty(node.data, "group_by", group_by);		
	myDiagram.commitTransaction("updateNode");
	setAutoFillRemainings(node.data.key, created_columns);
}

function showRank(key) {	
	if (detectErrorFromPreviousNodes(key)) {
		if (checkShowPopup(key)) {
			chosed_node_key = key;
			var node = myDiagram.findNodeForKey(key);
			var parent = node.findTreeParentNode();
			var columns = getColumnsOfDataSet(parent.data.key);
			myDiagram.model.setDataProperty(node.data, "columns", columns);
			$.rank_dialog(node.data.sort_name, columns, node.data.ranks);
			$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});
		}
	}
}

function setRankData(sort_name, condition, ranks) {
	//highlight(chosed_node_key, !validateSetColumns(created_columns));
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "sort_name", sort_name);	
	myDiagram.model.setDataProperty(node.data, "condition", condition);	
	myDiagram.model.setDataProperty(node.data, "ranks", ranks);
	myDiagram.commitTransaction("updateNode");
	setAutoFillRemainings(node.data.key, node.data.columns.concat([{'column_name': sort_name, 'type': 'varchar'}]));
}

function autoFillResult(key) {
	findNodeForResult(key);
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(key);	
	myDiagram.model.setDataProperty(node.data, "selected_columns", result_columns);
	myDiagram.model.setDataProperty(node.data, "unselected_columns", []);	
	myDiagram.commitTransaction("updateNode");
}

function showResult(key) {		
	problem_key = [];
	var parent = myDiagram.findNodeForKey(key).findTreeParentNode();
	if (detectErrorFromPreviousNodes(parent.data.key)) {
		if (checkShowPopup(key)) {
			chosed_node_key = key;
			findNodeForResult(key);
			var node = myDiagram.findNodeForKey(key);
			var selected_columns = node.data.selected_columns;
			if(typeof selected_columns === "undefined") {
				selected_columns = result_columns;
			}
			$.result_dialog(node.data.name, result_columns, selected_columns);
			$('#dialog').draggable({containment: "parent"}).resizable({containment: "parent"});
		}
	}
}

var result_columns = [];
function findNodeForResult(key) {
	result_columns = [];

	var node = myDiagram.findNodeForKey(key);
	var root = node.findTreeRoot();
	if (root.data.type != "Database") {
		return;
	}

	var table = null;
	var bool = true;
	while(bool) {
		var node = myDiagram.findNodeForKey(key);
		node.findNodesConnected("").each(function(node) {
			key = node.data.key;
			if (node.data.type === "Table") {
				table = node.data.key;
				bool = false;
			}
			if (node.data.type === "Add") {
				if (typeof node.data.new_column != "undefined") {
					result_columns = node.data.columns_info.concat(node.data.new_column);
				}
				bool = false;
			}
			if (node.data.type === "Merge") {
				result_columns = node.data.merged_columns;
				bool = false;
			}
			if (node.data.type === "Join") {
				if (typeof node.data.new_right_columns != "undefined") {
					result_columns = node.data.left_table.concat(node.data.new_right_columns);
				}
				bool = false;
			}
			if (node.data.type === "Aggregation") {
				result_columns = node.data.columns;
				/*
				if (typeof node.data.created_columns != "undefined") {
					result_columns = node.data.columns.concat(node.data.created_columns);
				}
				*/
				bool = false;
			}
			if (node.data.type === "Rank") {
				if (typeof node.data.sort_name != "undefined") {
					console.log(node.data.columns);
					result_columns = node.data.columns.concat([{'column_name': node.data.sort_name, 'type': 'varchar'}]);
				}
				bool = false;
			}
			if (node.data.type === "Result") {
				result_columns = node.data.selected_columns;
				bool = false;
			}		
		});	
	}
	if (table != null) {
		$.ajax({
			async: false,
			method: "GET",
			url: "../controller/ajax.php?f=" + table,
			dataType: "json",
			success: function(data) {
				result_columns = data;
			}
		});
	}
	console.log(result_columns);
	return;
}

function setResultData(name, selected_columns, unselected_columns) {
	highlight(chosed_node_key, !validateSetColumns(selected_columns));
	myDiagram.startTransaction("updateNode");
	var node = myDiagram.findNodeForKey(chosed_node_key);	
	myDiagram.model.setDataProperty(node.data, "name", name);
	myDiagram.model.setDataProperty(node.data, "selected_columns", selected_columns);	
	myDiagram.model.setDataProperty(node.data, "unselected_columns", unselected_columns);	
	myDiagram.commitTransaction("updateNode");
	setFillChildResults(chosed_node_key);	
}

function setFillChildResults(key) {
	var node = myDiagram.findNodeForKey(key);
	var next_selected = [];
	node.findNodesConnected("OUT").each(function(child) {
		next_selected = [];
		if (child.data.type === "Filter") {
			correspondingParentForFilter(child);
			child.findNodesConnected("OUT").each(function(child3) {
				if(child3.data.type === "Result") {	
					for(i = 0; i < node.data.selected_columns.length; i ++) {
						var bool = false;	
						for(j = 0; j < child3.data.unselected_columns.length; j ++) {
							if (child3.data.unselected_columns[j]["column_name"] === node.data.selected_columns[i]["column_name"] && child3.data.unselected_columns[j]["type"] === node.data.selected_columns[i]["type"]) {
								bool = true;
							}						
						}
						if (!bool) {
							next_selected.push(node.data.selected_columns[i]);
						}
					}
					highlight(child3.data.key, !validateSetColumns(next_selected));
					myDiagram.startTransaction("updateSelectedColumns");
					myDiagram.model.setDataProperty(child3.data, "selected_columns", next_selected);	
					myDiagram.commitTransaction("updateSelectedColumns");
					setFillChildResults(child3.data.key);
				}
			});
		}
		/*
		if (child.data.type === "Distinct") {		
			var distinct_columns = child.data.columns;
			if (typeof distinct_columns != "undefined") {
				next_selected = [];
				var columns = node.data.selected_columns;
				for(i = 0; i < columns.length; i ++) {
					check = false;
					for(j = 0; j < distinct_columns.length; j ++) {		
						if (columns[i]['column_name'] == distinct_columns[j]['column_name'] && columns[i]['type'] == distinct_columns[j]['type']) {
							check = true;
						}
					}
					if (check) {
						next_selected.push(columns[i]);
					}
				}
			}
			highlight(child.data.key, !validateSetColumns(next_selected));
			myDiagram.startTransaction("updateDistinctdColumns");
			myDiagram.model.setDataProperty(child.data, "columns", next_selected);	
			myDiagram.commitTransaction("updateDistinctColumns");
			setAutoFillRemainings(child.data.key, next_selected);
		}
		*/
		if (child.data.type === "Aggregation") {
			correspondingParentForAggregation(child);
		}
		if (child.data.type === "Join") {
			if(detectConnectionForJoin(child.data.key)) {
				if (typeof child.data.new_right_columns != "undefined") {
					var left_parent_sl;
					child.findNodesConnected("L").each(function(result) {
						if (result.data.type === "Result") {
							if (typeof result.data.selected_columns != "undefined" && result.data.selected_columns.length > 0) {
								left_parent_sl = result.data.selected_columns;
							}	
						}
					}); 
					child.findNodesConnected("R").each(function(result) {
						if (result.data.type === "Result") {
							if (typeof result.data.selected_columns != "undefined" && result.data.selected_columns.length > 0) {
								var right_table_new = [], new_right_table_new = [];
								var sl_col_right = result.data.selected_columns;
								for(var i = 0; i < child.data.right_table.length; i ++) {
									var check_right = false;
									for (var j = 0; j < sl_col_right.length; j ++ ) { 
										if (child.data.right_table[i]['column_name'] === sl_col_right[j]['column_name']) {
											check_right = true;
										}
									}
									if (check_right) {
										right_table_new.push(child.data.right_table[i]);
										new_right_table_new.push(child.data.new_right_columns[i]);
									}
								}
								console.log(";;");
								console.log(right_table_new);
								console.log(new_right_table_new);
								console.log(";;");
								myDiagram.startTransaction("updateJoinNode");		
								myDiagram.model.setDataProperty(child.data, "right_table", right_table_new);
								myDiagram.model.setDataProperty(child.data, "new_right_columns", new_right_table_new);
								myDiagram.commitTransaction("updateJoinNode");
								correspondingParentForJoin(child, left_parent_sl, right_table_new);
								setAutoFillRemainings(child.data.key, child.data.left_table.concat(new_right_table_new));
							}
						}
					});
				}
			}
		}
	});
}

function correspondingParentForFilter(node) {
	var filter = node.data.filter;
	if (typeof filter != "undefined") {
		var parent = node.findTreeParentNode();
		var columns = getColumnsOfDataSet(parent.data.key);
		var a, b = false;
		for (i = 0; i < filter.length; i ++) {
			a = false;
			for (j = 0; j < columns.length; j ++) {
				if (filter[i]['column_name'] === columns[j]['column_name']) {
					a = true;
				}		
			}
			if (a === false) {
				b = true;
				break;
			}
		}
		highlight(node.data.key, b);
	}
}

function correspondingParentForAggregation(node) {
	var aggregate = node.data.aggregate;
	if (typeof aggregate != "undefined") {
		var parent = node.findTreeParentNode();
		var columns = getColumnsOfDataSet(parent.data.key);
		var a, b = false;
		for (i = 0; i < aggregate.length; i ++) {
			a = false;
			for (j = 0; j < columns.length; j ++) {
				if (aggregate[i]['column_name'] === columns[j]['column_name']) {
					a = true;
				}		
			}
			if (a === false) {
				b = true;
				break;
			}
		}
		highlight(node.data.key, b);
	}
}

function correspondingParentForJoin(node, left_tbl_col, right_tbl_col) {
	var left_jid = node.data.left_join_id;
	var right_jid = node.data.right_join_id;

	var a, b = false;
	for (var i = 0; i < left_tbl_col.length; i ++) {
		if (left_tbl_col[i]['column_name'] === left_jid) {
			a = true;
		}
	}
	for (var i = 0; i < right_tbl_col.length; i ++) {
		if (right_tbl_col[i]['column_name'] === right_jid) {
			b = true;
		}
	}
	if (a === false || b === false) {
		highlight(node.data.key, true);
	}
}

var data = {};	
function highlight(key, bool) {
	var model = myDiagram.model;
	model.startTransaction("highlight");
	model.setDataProperty(myDiagram.findNodeForKey(key).data, "highlight", bool);
	model.commitTransaction("highlight");
}

function showTooltip(key, message) {
	var model = myDiagram.model;
	model.startTransaction("tooltip");
	model.setDataProperty(myDiagram.findNodeForKey(key).data, "tooltip", message);
	model.commitTransaction("tooltip");
}

function validateSetColumns(columns) {
	return columns.length > 0;
}

var problem_key = [];
function detectErrorFromPreviousNodes(key) {	
	var node = myDiagram.findNodeForKey(key);
	if (node.data.type === "Table") { 
		$.ajax({
			async: false,
			method: "GET",
			url: "../controller/ajax.php?f=" + node.data.key,
			dataType: "json",
			success: function(table_data) {
				if (table_data === null) {
					problem_key.push(node.data.key);
				}	
			}
		});
	}
	if (node.data.type === "Result") {
		if ((typeof node.data.selected_columns  === "undefined" || node.data.selected_columns.length <= 0)) {
			problem_key.push(node.data.key);
		}
		var parent = node.findTreeParentNode();
		detectErrorFromPreviousNodes(parent.data.key);
	}
	if (node.data.type === "Join") {
		if(!detectConnectionForJoin(node.data.key)) {
			problem_key.push(node.data.key);
		}
		else {
			if (typeof node.data.new_right_columns === "undefined") {
				problem_key.push(node.data.key);
			}
		}
		node.findLinksConnected().each(function(link) {
			if (link.data.topid === "L") {
				//problem_key.push(link.data.key);
				detectErrorFromPreviousNodes(link.data.from);
			}
			if (link.data.topid === "R") {
				console.log("test2");
				detectErrorFromPreviousNodes(link.data.from);
			}
		});
	}
	if (node.data.type === "Filter") {
		var parent = node.findTreeParentNode();
		detectErrorFromPreviousNodes(parent.data.key);
	}
	if (node.data.type === "Add") {
		if ((typeof node.data.new_column === "undefined") || (typeof node.data.columns_info  === "undefined" || node.data.columns_info.length <= 0)) {
			problem_key.push(node.data.key);
		}
		var parent = node.findTreeParentNode();
		detectErrorFromPreviousNodes(parent.data.key);	
	}
	
	if (node.data.type === "Distinct") {
		if ((typeof node.data.columns  === "undefined" || node.data.columns.length <= 0)) {
			problem_key.push(node.data.key);
		}
		var parent = node.findTreeParentNode();
		detectErrorFromPreviousNodes(parent.data.key);	
	}
	
	if (node.data.type === "Merge") {
		if ((typeof node.data.merged_columns  === "undefined" || node.data.merged_columns.length <= 0)) {
			problem_key.push(node.data.key);
		}
		node.findNodesConnected("IN").each(function(parent) {
			detectErrorFromPreviousNodes(parent.data.key);
		});		
	}
	
	if (node.data.type === "Aggregation") {
		if ((typeof node.data.columns  === "undefined" || node.data.columns.length <= 0)) {
			problem_key.push(node.data.key);
		}
		var parent = node.findTreeParentNode();
		detectErrorFromPreviousNodes(parent.data.key);
	}
	
	return true;
}

function checkShowPopup(key) {
	console.log("problem_keys");
	console.log(problem_key);
	if (problem_key.length === 0) {
		return true;
	}
	var data = null;
	var node = myDiagram.findNodeForKey(key);
	if (node.data.type === "Result") {
		var parent = node.findTreeParentNode();
		if (parent.data.type === "Table") {
			$.ajax({
				async: false,
				method: "GET",
				url: "../controller/ajax.php?f=" + parent.data.key,
				dataType: "json",
				success: function(table_data) {
					data = table_data;
				}
			});
		}
		if (parent.data.type === "Join") {
			if(detectConnectionForJoin(parent.data.key)) {
				data = parent.data.left_table.concat(parent.data.right_table);
			}
		}
		if (parent.data.type === "Add") {
			data = parent.data.new_column;
		}
		if (parent.data.type === "Distinct") {
			data = parent.data.columns;	
		}
		if (parent.data.type === "Merge") {
			data = parent.data.merged_columns;
		}
		if (parent.data.type === "Result") {
			data = parent.data.selected_columns;
		}
		if (parent.data.type === "Filter") {
			var parent_of_filter = parent.findTreeParentNode();
			if (parent_of_filter.data.type === "Table") {
				$.ajax({
					async: false,
					method: "GET",
					url: "../controller/ajax.php?f=" + parent_of_filter.data.key,
					dataType: "json",
					success: function(table_data) {
						data = table_data;
					}
				});
			}
			if (parent_of_filter.data.type === "Result") {
				data = parent_of_filter.data.selected_columns;
			}
		}
	}
	if (node.data.type === "Join") {
		if(detectConnectionForJoin(node.data.key)) {
			node.findNodesConnected("L").each(function(result) {
				if (result.data.type === "Result") {
					if (typeof result.data.selected_columns != "undefined" && result.data.selected_columns.length > 0) {
						data = result.data.selected_columns;
					}
					else {
						data = null;
					}
				}
				else {
					if (result.data.type === "Table") {
						$.ajax({
							async: false,
							method: "GET",
							url: "../controller/ajax.php?f=" + result.data.key,
							dataType: "json",
							success: function(table_data) {
								data = table_data;
							}
						});
						console.log("join left input");
						console.log(data);
					}
				}
			});
			node.findNodesConnected("R").each(function(result) {
				if (data != null) {
					if (result.data.type === "Result") {
						if (typeof result.data.selected_columns != "undefined" && result.data.selected_columns.length > 0) {
							data = data.concat(result.data.selected_columns);
						}
						else {
							data = null;
						}
					}
					else {
						if (result.data.type === "Table") {
							if (data != null) {
								$.ajax({
									async: false,
									method: "GET",
									url: "../controller/ajax.php?f=" + result.data.key,
									dataType: "json",
									success: function(table_data) {
										//data = data.concat(table_data);
										data = table_data;
									}
								});	
								console.log("join right input");
								console.log(data);		
							}							
						}
					}
				}
			});
		}
	}
	if (node.data.type === "Add") {
		var parent = node.findTreeParentNode();
		if (parent.data.type === "Result") {
			if (typeof parent.data.selected_columns != "undefined" && parent.data.selected_columns.length > 0) {
				data = parent.data.selected_columns;
			}
			else {
				data = null;
			}
		}
		else {
			if (parent.data.type === "Table") {
				$.ajax({
					async: false,
					method: "GET",
					url: "../controller/ajax.php?f=" + parent.data.key,
					dataType: "json",
					success: function(table_data) {
						data = table_data;
					}
				});							
			}
		}
	}
	if (node.data.type === "Distinct") {
		var parent = node.findTreeParentNode();
		if (parent.data.type === "Result") {
			if (typeof parent.data.selected_columns != "undefined" && parent.data.selected_columns.length > 0) {
				data = parent.data.selected_columns;
			}
			else {
				data = null;
			}
		}
		else {
			if (parent.data.type === "Table") {
				$.ajax({
					async: false,
					method: "GET",
					url: "../controller/ajax.php?f=" + parent.data.key,
					dataType: "json",
					success: function(table_data) {
						data = table_data;
					}
				});							
			}
		}
	}
	if (node.data.type === "Merge") {
		node.findNodesConnected("IN").each(function(parent) {
			if (parent.data.type === "Result") {
				if (typeof parent.data.selected_columns != "undefined" && parent.data.selected_columns.length > 0) {
					data = parent.data.selected_columns;
				}
				else {
					data = null;
				}
			}
			else {
				if (parent.data.type === "Table") {
					$.ajax({
						async: false,
						method: "GET",
						url: "../controller/ajax.php?f=" + parent.data.key,
						dataType: "json",
						success: function(table_data) {
							data = table_data;
						}
					});							
				}
			}
		});	
	}
	if (node.data.type === "Aggregation") {
		var parent = node.findTreeParentNode();
		if (parent.data.type === "Result") {
			if (typeof parent.data.selected_columns != "undefined" && parent.data.selected_columns.length > 0) {
				data = parent.data.selected_columns;
			}
			else {
				data = null;
			}
		}
		else {
			if (parent.data.type === "Table") {
				$.ajax({
					async: false,
					method: "GET",
					url: "../controller/ajax.php?f=" + parent.data.key,
					dataType: "json",
					success: function(table_data) {
						data = table_data;
					}
				});							
			}
		}
	}
	console.log("show check popup:");
	console.log(data);
	if (data === "null" || data === null || typeof data === "undefined" || data.length <= 0) {		
		var problem_key_list = problem_key.filter(function(item, pos){
			return problem_key.indexOf(item)== pos; 
		});
		for (p in problem_key_list) {
			console.log(problem_key_list[p]);
			highlight(problem_key_list[p], true);
		}
		return false;
	}		
	return true;
}

function linksAll(x) {
	var is_complete = true;
	if (x instanceof go.Node) {
		if (x.data.type != "Database") {
			var bool = true;
		    x.findNodesInto().each(function(node) {
				bool = false;
		    });
		  	if (bool) {
		  		console.log("Urdaa ymarch holboltgui node");
		  		is_complete = false;
				//highlight(x.data.key, true);
		  	}
	  	}
	  	if (x.data.type != "Result") {
	  		var bool = true;
		    x.findNodesOutOf().each(function(node) {
				bool = false;
		    });
		  	if (bool) {
		  		console.log("Ardaa ymarch holboltgui node");
		  		is_complete = false;
				//highlight(x.data.key, true);
		  	}
	  	}
  	}
  	return is_complete;
}

function findErrorFromDiagram() {
	var bool = false;
	myDiagram.nodes.each(function(node) { 
		if (node.data.highlight === true) {
			bool = true;
		}
	});
	return bool;
}

function findErrorFromEachNodes() {
	var error_key = [];
	myDiagram.nodes.each(function(node) { 
		if (node.data.type === "Table") { 
			$.ajax({
				async: false,
				method: "GET",
				url: "../controller/ajax.php?f=" + node.data.key,
				dataType: "json",
				success: function(table_data) {
					if (table_data === null) {
						error_key.push(node.data.key);
					}	
				}
			});
		}
		if (node.data.type === "Result") {
			if ((typeof node.data.selected_columns  === "undefined" || node.data.selected_columns.length <= 0)) {
				error_key.push(node.data.key);
			}
		}
		if (node.data.type === "Join") {
			if(!detectConnectionForJoin(node.data.key)) {
				error_key.push(node.data.key);
			}
			else {
				if (typeof node.data.new_right_columns === "undefined") {
					error_key.push(node.data.key);
				}
			}
		}
		if (node.data.type === "Filter") {
		}
		if (node.data.type === "Add") {
			if ((typeof node.data.new_column === "undefined") || (typeof node.data.columns_info  === "undefined" || node.data.columns_info.length <= 0)) {
				error_key.push(node.data.key);
			}
		}
		
		if (node.data.type === "Distinct") {
			if ((typeof node.data.columns  === "undefined" || node.data.columns.length <= 0)) {
				error_key.push(node.data.key);
			}
		}
		
		if (node.data.type === "Merge") {
			if ((typeof node.data.merged_columns  === "undefined" || node.data.merged_columns.length <= 0)) {
				error_key.push(node.data.key);
			}		
		}
		
		if (node.data.type === "Aggregation") {
			if ((typeof node.data.columns  === "undefined" || node.data.columns.length <= 0)) {
				error_key.push(node.data.key);
			}
		}
	});

	var problem_key_list = error_key.filter(function(item, pos){
		return error_key.indexOf(item)== pos; 
	});
	for (p in problem_key_list) {
		highlight(problem_key_list[p], true);
	}
}

function deleteMergeData(key) {
	var node = myDiagram.findNodeForKey(key);
	if (typeof node.data.merged_data != "undefined") {
		myDiagram.startTransaction("updateNode");
		myDiagram.model.setDataProperty(node.data, "merged_data", undefined);
		myDiagram.model.setDataProperty(node.data, "merged_columns", undefined);
		myDiagram.model.setDataProperty(node.data, "query", undefined);
		myDiagram.commitTransaction("updateNode");
	}
}
