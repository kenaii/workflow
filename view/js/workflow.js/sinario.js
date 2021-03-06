function sinario1() {
	return {
		"class": "go.GraphLinksModel",
		"nodeCategoryProperty": "type",
		"linkFromPortIdProperty": "frompid",
		"linkToPortIdProperty": "topid",
		"nodeDataArray": [ 
			{"id":"11", "type":"Database", "name":"airkorea", "key":-10, "loc":{"class":"go.Point", "x":330, "y":-90}},
			{"key":"tb1015", "parent_key":"11", "name":"airkorea_2010", "type":"Table", "loc":{"class":"go.Point", "x":440, "y":-90}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-1, "loc":{"class":"go.Point", "x":550, "y":0}, "tooltip":"Join"},
			{"id":"1", "type":"Database", "name":"nps", "key":-4, "loc":{"class":"go.Point", "x":110, "y":90}},
			{"key":"tb68", "parent_key":"1", "name":"nps_t20_2010", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":90}},
			{"type":"Filter", "name":"Filter", "key":-2, "loc":{"class":"go.Point", "x":330, "y":90}, "condition":"msick_cd=j45,j46", "filter":[ {"column_name":"msick_cd", "operator":"=", "value":"j45,j46"} ], "logical":[]},
			{"type":"Result", "name":"Result1_1511156434518", "key":-8, "loc":{"class":"go.Point", "x":440, "y":90}, "highlight":false, "selected_columns":[ {"column_name":"spec_id_sno", "type":"varchar"},{"column_name":"dmd_tp_cd", "type":"varchar"},{"column_name":"dmd_frm_cd", "type":"varchar"},{"column_name":"fom_tp_cd", "type":"varchar"},{"column_name":"jid", "type":"varchar"},{"column_name":"sex_tp_cd", "type":"varchar"},{"column_name":"pat_age", "type":"varchar"},{"column_name":"insup_tp_cd", "type":"varchar"},{"column_name":"maidcl_cd", "type":"varchar"},{"column_name":"msick_cd", "type":"varchar"},{"column_name":"ssick_cd", "type":"varchar"},{"column_name":"dgrslt_tp_cd", "type":"varchar"},{"column_name":"dgsbjt_cd", "type":"varchar"},{"column_name":"shw_sbjt_cd", "type":"varchar"},{"column_name":"dmd_drg_no", "type":"varchar"},{"column_name":"fst_ipat_dd", "type":"varchar"},{"column_name":"ipat_ariv_pth_tp_cd", "type":"varchar"},{"column_name":"oinj_tp_cd", "type":"varchar"},{"column_name":"recu_ddcnt", "type":"varchar"},{"column_name":"vst_ddcnt", "type":"varchar"},{"column_name":"recu_fr_dd", "type":"varchar"},{"column_name":"recu_to_dd", "type":"varchar"},{"column_name":"rvd_rpe_tamt_amt", "type":"varchar"},{"column_name":"rvd_slf_brdn_amt", "type":"varchar"},{"column_name":"rvd_insup_brdn_amt", "type":"varchar"},{"column_name":"sopr_yn", "type":"varchar"},{"column_name":"prcl_sym_tp_cd", "type":"varchar"},{"column_name":"yid", "type":"varchar"},{"column_name":"year", "type":"varchar"},{"column_name":"data_set", "type":"varchar"},{"column_name":"agg", "type":"varchar"},{"column_name":"selectionpob", "type":"varchar"},{"column_name":"samplingweight", "type":"varchar"},{"column_name":"sido_cd", "type":"varchar"},{"column_name":"cl_cd", "type":"varchar"},{"column_name":"org_df", "type":"varchar"},{"column_name":"ykiho_date", "type":"varchar"},{"column_name":"bed_grade", "type":"varchar"},{"column_name":"per_50bed_doctor", "type":"varchar"},{"column_name":"per_50bed_dental", "type":"varchar"},{"column_name":"per_50bed_oriental", "type":"varchar"},{"column_name":"per_50bed_nurse", "type":"varchar"},{"column_name":"ct", "type":"varchar"},{"column_name":"mri", "type":"varchar"},{"column_name":"pet", "type":"varchar"} ], "unselected_columns":[]},
			{"type":"Result", "name":"Result2_1511156446249", "key":-9, "loc":{"class":"go.Point", "x":660, "y":0}}
		],
		"linkDataArray": [ 
			{"from":-10, "to":"tb1015", "frompid":"", "topid":""},
			{"from":-4, "to":"tb68", "frompid":"", "topid":""},
			{"from":"tb68", "to":-2, "frompid":"OUT", "topid":""},
			{"from":-2, "to":-8, "frompid":"OUT", "topid":""},
			{"from":-8, "to":-1, "frompid":"OUT", "topid":"R"},
			{"from":"tb1015", "to":-1, "frompid":"OUT", "topid":"L"},
			{"from":-1, "to":-9, "frompid":"OUT", "topid":""}
		]
	};
}

function sinario2() {
	return { "class": "go.GraphLinksModel",
		"nodeCategoryProperty": "type",
		"linkFromPortIdProperty": "frompid",
		"linkToPortIdProperty": "topid",
		"nodeDataArray": [ 
			{"id":"5", "type":"Database", "name":"nhic", "key":-5, "loc":{"class":"go.Point", "x":110, "y":-90}},
			{"key":"tb51", "parent_key":"5", "name":"nhic_t40_2009", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":-450}},
			{"key":"tb50", "parent_key":"5", "name":"nhic_t40_2008", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":-270}},
			{"key":"tb52", "parent_key":"5", "name":"nhic_t40_2010", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":-90}},
			{"key":"tb28", "parent_key":"5", "name":"nhic_t20_2010", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":180}},
			{"key":"tb53", "parent_key":"5", "name":"nhic_t40_2011", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":720}},
			{"type":"Filter", "name":"Filter", "key":-2, "loc":{"class":"go.Point", "x":330, "y":-540}},
			{"type":"Filter", "name":"Filter", "key":-8, "loc":{"class":"go.Point", "x":330, "y":-360}},
			{"type":"Result", "name":"Result1_1511188468949", "key":-9, "loc":{"class":"go.Point", "x":440, "y":-540}},
			{"type":"Result", "name":"Result2_1511188470542", "key":-10, "loc":{"class":"go.Point", "x":440, "y":-360}},
			{"type":"Distinct", "name":"Distinct", "key":-4, "loc":{"class":"go.Point", "x":550, "y":-540}},
			{"type":"Distinct", "name":"Distinct", "key":-12, "loc":{"class":"go.Point", "x":550, "y":-360}},
			{"type":"Result", "name":"Result3_1511188480878", "key":-13, "loc":{"class":"go.Point", "x":660, "y":-540}},
			{"type":"Result", "name":"Result4_1511188482750", "key":-14, "loc":{"class":"go.Point", "x":660, "y":-360}},
			{"type":"Filter", "name":"Filter", "key":-15, "loc":{"class":"go.Point", "x":330, "y":-270}},
			{"type":"Result", "name":"Result5_1511188499912", "key":-16, "loc":{"class":"go.Point", "x":440, "y":-270}},
			{"type":"Distinct", "name":"Distinct", "key":-17, "loc":{"class":"go.Point", "x":550, "y":-270}},
			{"type":"Result", "name":"Result6_1511188505006", "key":-18, "loc":{"class":"go.Point", "x":660, "y":-270}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-1, "loc":{"class":"go.Point", "x":770, "y":-450}},
			{"type":"Result", "name":"Result7_1511188522495", "key":-20, "loc":{"class":"go.Point", "x":880, "y":-450}},
			{"type":"Filter", "name":"Filter", "key":-21, "loc":{"class":"go.Point", "x":330, "y":-180}},
			{"type":"Result", "name":"Result8_1511188538838", "key":-22, "loc":{"class":"go.Point", "x":440, "y":-180}},
			{"type":"Distinct", "name":"Distinct", "key":-23, "loc":{"class":"go.Point", "x":550, "y":-180}},
			{"type":"Result", "name":"Result9_1511188545525", "key":-24, "loc":{"class":"go.Point", "x":660, "y":-180}},
			{"type":"Merge", "name":"Merge", "key":-3, "loc":{"class":"go.Point", "x":770, "y":-270}},
			{"type":"Result", "name":"Result10_1511188588400", "key":-26, "loc":{"class":"go.Point", "x":1100, "y":-270}},
			{"type":"Filter", "name":"Filter", "key":-27, "loc":{"class":"go.Point", "x":990, "y":-450}},
			{"type":"Result", "name":"Result11_1511188596311", "key":-28, "loc":{"class":"go.Point", "x":1100, "y":-450}},
			{"type":"Filter", "name":"Filter", "key":-29, "loc":{"class":"go.Point", "x":330, "y":0}},
			{"type":"Result", "name":"Result12_1511188610680", "key":-30, "loc":{"class":"go.Point", "x":440, "y":0}},
			{"type":"Filter", "name":"Filter", "key":-31, "loc":{"class":"go.Point", "x":330, "y":180}},
			{"type":"Result", "name":"Result13_1511188626527", "key":-32, "loc":{"class":"go.Point", "x":440, "y":180}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-33, "loc":{"class":"go.Point", "x":550, "y":90}},
			{"type":"Result", "name":"Result14_1511188655879", "key":-34, "loc":{"class":"go.Point", "x":660, "y":90}},
			{"type":"Distinct", "name":"Distinct", "key":-35, "loc":{"class":"go.Point", "x":770, "y":90}},
			{"type":"Result", "name":"Result15_1511188668504", "key":-36, "loc":{"class":"go.Point", "x":880, "y":90}},
			{"type":"Aggregation", "name":"Aggregation", "key":-6, "loc":{"class":"go.Point", "x":990, "y":90}},
			{"type":"Result", "name":"Result16_1511188680064", "key":-38, "loc":{"class":"go.Point", "x":1100, "y":90}},
			{"key":"tb29", "parent_key":"5", "name":"nhic_t20_2011", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":360}},
			{"type":"Filter", "name":"Filter", "key":-40, "loc":{"class":"go.Point", "x":330, "y":270}},
			{"type":"Filter", "name":"Filter", "key":-41, "loc":{"class":"go.Point", "x":330, "y":450}},
			{"type":"Result", "name":"Result17_1511188740313", "key":-42, "loc":{"class":"go.Point", "x":440, "y":270}},
			{"type":"Result", "name":"Result18_1511188741544", "key":-43, "loc":{"class":"go.Point", "x":770, "y":450}},
			{"type":"Distinct", "name":"Distinct", "key":-44, "loc":{"class":"go.Point", "x":550, "y":270}},
			{"type":"Result", "name":"Result19_1511188757953", "key":-45, "loc":{"class":"go.Point", "x":1100, "y":270}},
			{"type":"Result", "name":"Result20_1511188767049", "key":-46, "loc":{"class":"go.Point", "x":440, "y":630}},
			{"type":"Filter", "name":"Filter", "key":-47, "loc":{"class":"go.Point", "x":330, "y":630}},
			{"type":"Filter", "name":"Filter", "key":-48, "loc":{"class":"go.Point", "x":330, "y":720}},
			{"type":"Result", "name":"Result21_1511188803314", "key":-49, "loc":{"class":"go.Point", "x":440, "y":720}},
			{"type":"Distinct", "name":"Distinct", "key":-50, "loc":{"class":"go.Point", "x":550, "y":630}},
			{"type":"Distinct", "name":"Distinct", "key":-51, "loc":{"class":"go.Point", "x":550, "y":720}},
			{"type":"Result", "name":"Result22_1511188822817", "key":-52, "loc":{"class":"go.Point", "x":660, "y":630}},
			{"type":"Result", "name":"Result23_1511188824346", "key":-53, "loc":{"class":"go.Point", "x":660, "y":720}},
			{"type":"Filter", "name":"Filter", "key":-54, "loc":{"class":"go.Point", "x":330, "y":810}},
			{"type":"Result", "name":"Result24_1511188846725", "key":-55, "loc":{"class":"go.Point", "x":770, "y":810}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-56, "loc":{"class":"go.Point", "x":990, "y":630}},
			{"type":"Result", "name":"Result25_1511188886676", "key":-57, "loc":{"class":"go.Point", "x":1100, "y":630}},
			{"type":"Merge", "name":"Merge", "key":-58, "loc":{"class":"go.Point", "x":990, "y":450}},
			{"type":"Filter", "name":"Filter", "key":-59, "loc":{"class":"go.Point", "x":330, "y":90}},
			{"type":"Result", "name":"Result26_1511188944819", "key":-60, "loc":{"class":"go.Point", "x":440, "y":90}},
			{"type":"Distinct", "name":"Distinct", "key":-61, "loc":{"class":"go.Point", "x":550, "y":180}},
			{"type":"Result", "name":"Result27_1511188979493", "key":-62, "loc":{"class":"go.Point", "x":660, "y":180}},
			{"type":"Result", "name":"Result28_1511188990357", "key":-63, "loc":{"class":"go.Point", "x":1100, "y":450}},
			{"type":"Distinct", "name":"Distinct", "key":-64, "loc":{"class":"go.Point", "x":1210, "y":450}},
			{"type":"Result", "name":"Result29_1511188999933", "key":-65, "loc":{"class":"go.Point", "x":1320, "y":450}},
			{"type":"Merge", "name":"Merge", "key":-66, "loc":{"class":"go.Point", "x":1320, "y":0}},
			{"type":"Result", "name":"Result30_1511189067423", "key":-67, "loc":{"class":"go.Point", "x":1430, "y":0}},
			{"type":"Distinct", "name":"Distinct", "key":-68, "loc":{"class":"go.Point", "x":1540, "y":0}},
			{"type":"Result", "name":"Result31_1511189107886", "key":-69, "loc":{"class":"go.Point", "x":1650, "y":0}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-70, "loc":{"class":"go.Point", "x":1430, "y":-180}},
			{"type":"Result", "name":"Result32_1511189142966", "key":-71, "loc":{"class":"go.Point", "x":1650, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-72, "loc":{"class":"go.Point", "x":1210, "y":630}},
			{"type":"Result", "name":"Result33_1511189162102", "key":-73, "loc":{"class":"go.Point", "x":1320, "y":630}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-74, "loc":{"class":"go.Point", "x":1430, "y":540}},
			{"type":"Result", "name":"Result34_1511189169073", "key":-75, "loc":{"class":"go.Point", "x":1540, "y":540}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-76, "loc":{"class":"go.Point", "x":1760, "y":-90}},
			{"type":"Result", "name":"Result35_1511189187894", "key":-77, "loc":{"class":"go.Point", "x":1870, "y":-90}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-78, "loc":{"class":"go.Point", "x":1650, "y":540}},
			{"type":"Result", "name":"Result36_1511189208262", "key":-79, "loc":{"class":"go.Point", "x":1870, "y":540}},
			{"type":"Join", "name":"Join", "left_table":"", "right_table":"", "key":-80, "loc":{"class":"go.Point", "x":2090, "y":180}},
			{"type":"Result", "name":"Result37_1511189228048", "key":-81, "loc":{"class":"go.Point", "x":2200, "y":180}}
		],
		"linkDataArray": [ 
			{"from":-5, "to":"tb51", "frompid":"", "topid":""},
			{"from":-5, "to":"tb50", "frompid":"", "topid":""},
			{"from":-5, "to":"tb52", "frompid":"", "topid":""},
			{"from":-5, "to":"tb28", "frompid":"", "topid":""},
			{"from":-5, "to":"tb53", "frompid":"", "topid":""},
			{"from":"tb51", "to":-2, "frompid":"OUT", "topid":""},
			{"from":"tb51", "to":-8, "frompid":"OUT", "topid":""},
			{"from":-2, "to":-9, "frompid":"OUT", "topid":""},
			{"from":-8, "to":-10, "frompid":"OUT", "topid":""},
			{"from":-9, "to":-4, "frompid":"OUT", "topid":""},
			{"from":-10, "to":-12, "frompid":"OUT", "topid":""},
			{"from":-12, "to":-14, "frompid":"OUT", "topid":""},
			{"from":-4, "to":-13, "frompid":"OUT", "topid":""},
			{"from":"tb50", "to":-15, "frompid":"OUT", "topid":""},
			{"from":-15, "to":-16, "frompid":"OUT", "topid":""},
			{"from":-16, "to":-17, "frompid":"OUT", "topid":""},
			{"from":-17, "to":-18, "frompid":"OUT", "topid":""},
			{"from":-13, "to":-1, "frompid":"OUT", "topid":"L"},
			{"from":-18, "to":-1, "frompid":"OUT", "topid":"R"},
			{"from":-1, "to":-20, "frompid":"OUT", "topid":""},
			{"from":"tb52", "to":-21, "frompid":"OUT", "topid":""},
			{"from":-21, "to":-22, "frompid":"OUT", "topid":""},
			{"from":-22, "to":-23, "frompid":"OUT", "topid":""},
			{"from":-23, "to":-24, "frompid":"OUT", "topid":""},
			{"from":-14, "to":-3, "frompid":"OUT", "topid":"IN"},
			{"from":-24, "to":-3, "frompid":"OUT", "topid":"IN"},
			{"from":-3, "to":-26, "frompid":"OUT", "topid":""},
			{"from":-20, "to":-27, "frompid":"OUT", "topid":""},
			{"from":-27, "to":-28, "frompid":"OUT", "topid":""},
			{"from":"tb52", "to":-29, "frompid":"OUT", "topid":""},
			{"from":-29, "to":-30, "frompid":"OUT", "topid":""},
			{"from":"tb28", "to":-31, "frompid":"OUT", "topid":""},
			{"from":-31, "to":-32, "frompid":"OUT", "topid":""},
			{"from":-30, "to":-33, "frompid":"OUT", "topid":"L"},
			{"from":-32, "to":-33, "frompid":"OUT", "topid":"R"},
			{"from":-33, "to":-34, "frompid":"OUT", "topid":""},
			{"from":-34, "to":-35, "frompid":"OUT", "topid":""},
			{"from":-35, "to":-36, "frompid":"OUT", "topid":""},
			{"from":-36, "to":-6, "frompid":"OUT", "topid":""},
			{"from":-6, "to":-38, "frompid":"OUT", "topid":""},
			{"from":-5, "to":"tb29", "frompid":"", "topid":""},
			{"from":"tb29", "to":-40, "frompid":"OUT", "topid":""},
			{"from":"tb29", "to":-41, "frompid":"OUT", "topid":""},
			{"from":-40, "to":-42, "frompid":"OUT", "topid":""},
			{"from":-41, "to":-43, "frompid":"OUT", "topid":""},
			{"from":-42, "to":-44, "frompid":"OUT", "topid":""},
			{"from":-44, "to":-45, "frompid":"OUT", "topid":""},
			{"from":"tb53", "to":-47, "frompid":"OUT", "topid":""},
			{"from":"tb53", "to":-48, "frompid":"OUT", "topid":""},
			{"from":-47, "to":-46, "frompid":"OUT", "topid":""},
			{"from":-48, "to":-49, "frompid":"OUT", "topid":""},
			{"from":-46, "to":-50, "frompid":"OUT", "topid":""},
			{"from":-49, "to":-51, "frompid":"OUT", "topid":""},
			{"from":-50, "to":-52, "frompid":"OUT", "topid":""},
			{"from":-51, "to":-53, "frompid":"OUT", "topid":""},
			{"from":"tb53", "to":-54, "frompid":"OUT", "topid":""},
			{"from":-54, "to":-55, "frompid":"OUT", "topid":""},
			{"from":-43, "to":-56, "frompid":"OUT", "topid":"L"},
			{"from":-55, "to":-56, "frompid":"OUT", "topid":"R"},
			{"from":-56, "to":-57, "frompid":"OUT", "topid":""},
			{"from":-53, "to":-58, "frompid":"OUT", "topid":"IN"},
			{"from":"tb52", "to":-59, "frompid":"OUT", "topid":""},
			{"from":-59, "to":-60, "frompid":"OUT", "topid":""},
			{"from":-60, "to":-61, "frompid":"OUT", "topid":""},
			{"from":-61, "to":-62, "frompid":"OUT", "topid":""},
			{"from":-62, "to":-58, "frompid":"OUT", "topid":"IN"},
			{"from":-58, "to":-63, "frompid":"OUT", "topid":""},
			{"from":-63, "to":-64, "frompid":"OUT", "topid":""},
			{"from":-64, "to":-65, "frompid":"OUT", "topid":""},
			{"from":-26, "to":-66, "frompid":"OUT", "topid":"IN"},
			{"from":-45, "to":-66, "frompid":"OUT", "topid":"IN"},
			{"from":-66, "to":-67, "frompid":"OUT", "topid":""},
			{"from":-67, "to":-68, "frompid":"OUT", "topid":""},
			{"from":-68, "to":-69, "frompid":"OUT", "topid":""},
			{"from":-38, "to":-70, "frompid":"OUT", "topid":"R"},
			{"from":-28, "to":-70, "frompid":"OUT", "topid":"L"},
			{"from":-70, "to":-71, "frompid":"OUT", "topid":""},
			{"from":-57, "to":-72, "frompid":"OUT", "topid":""},
			{"from":-72, "to":-73, "frompid":"OUT", "topid":""},
			{"from":-65, "to":-74, "frompid":"OUT", "topid":"L"},
			{"from":-73, "to":-74, "frompid":"OUT", "topid":"R"},
			{"from":-74, "to":-75, "frompid":"OUT", "topid":""},
			{"from":-71, "to":-76, "frompid":"OUT", "topid":"L"},
			{"from":-69, "to":-76, "frompid":"OUT", "topid":"R"},
			{"from":-76, "to":-77, "frompid":"OUT", "topid":""},
			{"from":-75, "to":-78, "frompid":"OUT", "topid":""},
			{"from":-78, "to":-79, "frompid":"OUT", "topid":""},
			{"from":-77, "to":-80, "frompid":"OUT", "topid":"L"},
			{"from":-79, "to":-80, "frompid":"OUT", "topid":"R"},
			{"from":-80, "to":-81, "frompid":"OUT", "topid":""}
		]
	};
}

function sinario3() {
	return { "class": "go.GraphLinksModel",
		"nodeCategoryProperty": "type",
		"linkFromPortIdProperty": "frompid",
		"linkToPortIdProperty": "topid",
		"nodeDataArray": [ 
			{"id":"5", "type":"Database", "name":"nhic", "key":-5, "loc":{"class":"go.Point", "x":220, "y":-180}},
			{"key":"tb30", "parent_key":"5", "name":"nhic_t20_2012", "type":"Table", "loc":{"class":"go.Point", "x":330, "y":-180}},
			{"type":"Result", "name":"Result1_1511187440350", "key":-8, "loc":{"class":"go.Point", "x":440, "y":-180}},
			{"type":"Filter", "name":"Filter", "key":-2, "loc":{"class":"go.Point", "x":550, "y":-180}},
			{"type":"Result", "name":"Result2_1511187448013", "key":-6, "loc":{"class":"go.Point", "x":660, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-7, "loc":{"class":"go.Point", "x":770, "y":-180}},
			{"type":"Result", "name":"Result3_1511187463359", "key":-9, "loc":{"class":"go.Point", "x":880, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-10, "loc":{"class":"go.Point", "x":990, "y":-180}},
			{"type":"Result", "name":"Result4_1511187471519", "key":-11, "loc":{"class":"go.Point", "x":1100, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-12, "loc":{"class":"go.Point", "x":1210, "y":-180}},
			{"type":"Result", "name":"Result5_1511187480223", "key":-13, "loc":{"class":"go.Point", "x":1320, "y":-180}},
			{"type":"Filter", "name":"Filter", "key":-14, "loc":{"class":"go.Point", "x":1430, "y":-180}},
			{"type":"Result", "name":"Result6_1511187490991", "key":-15, "loc":{"class":"go.Point", "x":1540, "y":-180}},
			{"type":"Aggregation", "name":"Aggregation", "key":-16, "loc":{"class":"go.Point", "x":1650, "y":-180}},
			{"type":"Result", "name":"Result7_1511187500974", "key":-17, "loc":{"class":"go.Point", "x":1760, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-18, "loc":{"class":"go.Point", "x":1870, "y":-180}},
			{"type":"Result", "name":"Result8_1511187519704", "key":-19, "loc":{"class":"go.Point", "x":1980, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-20, "loc":{"class":"go.Point", "x":2090, "y":-180}},
			{"type":"Result", "name":"Result9_1511187541104", "key":-21, "loc":{"class":"go.Point", "x":2200, "y":-180}},
			{"type":"Filter", "name":"Filter", "key":-22, "loc":{"class":"go.Point", "x":2310, "y":-270}},
			{"type":"Filter", "name":"Filter", "key":-23, "loc":{"class":"go.Point", "x":2310, "y":-90}},
			{"type":"Result", "name":"Result10_1511187555092", "key":-24, "loc":{"class":"go.Point", "x":2420, "y":-270}},
			{"type":"Result", "name":"Result11_1511187559688", "key":-25, "loc":{"class":"go.Point", "x":2420, "y":-90}}
		],
		"linkDataArray": [ 
			{"from":-5, "to":"tb30", "frompid":"", "topid":""},
			{"from":"tb30", "to":-8, "frompid":"OUT", "topid":""},
			{"from":-8, "to":-2, "frompid":"OUT", "topid":""},
			{"from":-2, "to":-6, "frompid":"OUT", "topid":""},
			{"from":-6, "to":-7, "frompid":"OUT", "topid":""},
			{"from":-7, "to":-9, "frompid":"OUT", "topid":""},
			{"from":-9, "to":-10, "frompid":"OUT", "topid":""},
			{"from":-10, "to":-11, "frompid":"OUT", "topid":""},
			{"from":-11, "to":-12, "frompid":"OUT", "topid":""},
			{"from":-12, "to":-13, "frompid":"OUT", "topid":""},
			{"from":-13, "to":-14, "frompid":"OUT", "topid":""},
			{"from":-14, "to":-15, "frompid":"OUT", "topid":""},
			{"from":-15, "to":-16, "frompid":"OUT", "topid":""},
			{"from":-16, "to":-17, "frompid":"OUT", "topid":""},
			{"from":-17, "to":-18, "frompid":"OUT", "topid":""},
			{"from":-18, "to":-19, "frompid":"OUT", "topid":""},
			{"from":-19, "to":-20, "frompid":"OUT", "topid":""},
			{"from":-20, "to":-21, "frompid":"OUT", "topid":""},
			{"from":-21, "to":-22, "frompid":"OUT", "topid":""},
			{"from":-21, "to":-23, "frompid":"OUT", "topid":""},
			{"from":-22, "to":-24, "frompid":"OUT", "topid":""},
			{"from":-23, "to":-25, "frompid":"OUT", "topid":""}
		]
	};
}

function sinario4() {
	return { "class": "go.GraphLinksModel",
		"nodeCategoryProperty": "type",
		"linkFromPortIdProperty": "frompid",
		"linkToPortIdProperty": "topid",
		"nodeDataArray": [ 
			{"id":"6", "type":"Database", "name":"chs", "key":-6, "loc":{"class":"go.Point", "x":220, "y":-90}},
			{"key":"tb2", "parent_key":"6", "name":"chs_2009", "type":"Table", "loc":{"class":"go.Point", "x":330, "y":-90}},
			{"type":"Result", "name":"Result1_1511188016717", "key":-8, "loc":{"class":"go.Point", "x":440, "y":-90}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-5, "loc":{"class":"go.Point", "x":550, "y":-90}},
			{"type":"Result", "name":"Result2_1511188026606", "key":-7, "loc":{"class":"go.Point", "x":660, "y":-90}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-9, "loc":{"class":"go.Point", "x":770, "y":-90}},
			{"type":"Result", "name":"Result3_1511188035256", "key":-10, "loc":{"class":"go.Point", "x":880, "y":-90}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-11, "loc":{"class":"go.Point", "x":990, "y":-90}},
			{"type":"Result", "name":"Result4_1511188044230", "key":-12, "loc":{"class":"go.Point", "x":1100, "y":-90}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-13, "loc":{"class":"go.Point", "x":1210, "y":-90}},
			{"type":"Result", "name":"Result5_1511188051886", "key":-14, "loc":{"class":"go.Point", "x":1320, "y":-90}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-15, "loc":{"class":"go.Point", "x":1430, "y":-90}},
			{"type":"Result", "name":"Result6_1511188062774", "key":-16, "loc":{"class":"go.Point", "x":1540, "y":-90}}
		],
		"linkDataArray": [ 
			{"from":-6, "to":"tb2", "frompid":"", "topid":""},
			{"from":"tb2", "to":-8, "frompid":"OUT", "topid":""},
			{"from":-8, "to":-5, "frompid":"OUT", "topid":""},
			{"from":-5, "to":-7, "frompid":"OUT", "topid":""},
			{"from":-7, "to":-9, "frompid":"OUT", "topid":""},
			{"from":-9, "to":-10, "frompid":"OUT", "topid":""},
			{"from":-10, "to":-11, "frompid":"OUT", "topid":""},
			{"from":-11, "to":-12, "frompid":"OUT", "topid":""},
			{"from":-12, "to":-13, "frompid":"OUT", "topid":""},
			{"from":-13, "to":-14, "frompid":"OUT", "topid":""},
			{"from":-14, "to":-15, "frompid":"OUT", "topid":""},
			{"from":-15, "to":-16, "frompid":"OUT", "topid":""}
		]
	};
}

function sinario5() {
	return { "class": "go.GraphLinksModel",
		"nodeCategoryProperty": "type",
		"linkFromPortIdProperty": "frompid",
		"linkToPortIdProperty": "topid",
		"nodeDataArray": [ 
			{"id":"7", "type":"Database", "name":"knhanes", "key":-7, "loc":{"class":"go.Point", "x":110, "y":-180}},
			{"key":"tb15", "parent_key":"7", "name":"knhanes_2010", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":-270}},
			{"key":"tb16", "parent_key":"7", "name":"knhanes_2011", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":-180}},
			{"key":"tb17", "parent_key":"7", "name":"knhanes_2012", "type":"Table", "loc":{"class":"go.Point", "x":220, "y":-90}},
			{"type":"Filter", "name":"Filter", "key":-2, "loc":{"class":"go.Point", "x":330, "y":-270}},
			{"type":"Filter", "name":"Filter", "key":-6, "loc":{"class":"go.Point", "x":330, "y":-180}},
			{"type":"Filter", "name":"Filter", "key":-8, "loc":{"class":"go.Point", "x":330, "y":-90}},
			{"type":"Result", "name":"Result1_1511188162108", "key":-9, "loc":{"class":"go.Point", "x":440, "y":-270}},
			{"type":"Result", "name":"Result2_1511188163523", "key":-10, "loc":{"class":"go.Point", "x":440, "y":-180}},
			{"type":"Result", "name":"Result3_1511188165012", "key":-11, "loc":{"class":"go.Point", "x":440, "y":-90}},
			{"type":"Merge", "name":"Merge", "key":-3, "loc":{"class":"go.Point", "x":550, "y":-180}},
			{"type":"Result", "name":"Result4_1511188178766", "key":-12, "loc":{"class":"go.Point", "x":660, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-5, "loc":{"class":"go.Point", "x":770, "y":-180}},
			{"type":"Result", "name":"Result5_1511188183503", "key":-14, "loc":{"class":"go.Point", "x":880, "y":-180}}
		],
		"linkDataArray": [ 
			{"from":-7, "to":"tb15", "frompid":"", "topid":""},
			{"from":-7, "to":"tb16", "frompid":"", "topid":""},
			{"from":-7, "to":"tb17", "frompid":"", "topid":""},
			{"from":"tb16", "to":-6, "frompid":"OUT", "topid":""},
			{"from":"tb17", "to":-8, "frompid":"OUT", "topid":""},
			{"from":"tb15", "to":-2, "frompid":"OUT", "topid":""},
			{"from":-2, "to":-9, "frompid":"OUT", "topid":""},
			{"from":-6, "to":-10, "frompid":"OUT", "topid":""},
			{"from":-8, "to":-11, "frompid":"OUT", "topid":""},
			{"from":-9, "to":-3, "frompid":"OUT", "topid":"IN"},
			{"from":-10, "to":-3, "frompid":"OUT", "topid":"IN"},
			{"from":-11, "to":-3, "frompid":"OUT", "topid":"IN"},
			{"from":-3, "to":-12, "frompid":"OUT", "topid":""},
			{"from":-12, "to":-5, "frompid":"OUT", "topid":""},
			{"from":-5, "to":-14, "frompid":"OUT", "topid":""}
		]
	};
}

function sinario6() {
	return { "class": "go.GraphLinksModel",
		"nodeCategoryProperty": "type",
		"linkFromPortIdProperty": "frompid",
		"linkToPortIdProperty": "topid",
		"nodeDataArray": [ 
			{"id":"10", "type":"Database", "name":"khpind", "key":-9, "loc":{"class":"go.Point", "x":330, "y":-180}},
			{"key":"tb589", "parent_key":"10", "name":"khpind_panelind_2008", "type":"Table", "loc":{"class":"go.Point", "x":440, "y":-180}},
			{"type":"Add", "name":"Derive", "mode":1, "key":-5, "loc":{"class":"go.Point", "x":550, "y":-180}},
			{"type":"Result", "name":"Result1_1511188283630", "key":-8, "loc":{"class":"go.Point", "x":660, "y":-180}},
			{"type":"Aggregation", "name":"Aggregation", "key":-6, "loc":{"class":"go.Point", "x":770, "y":-180}},
			{"type":"Result", "name":"Result2_1511188290805", "key":-7, "loc":{"class":"go.Point", "x":880, "y":-180}}
		],
		"linkDataArray": [ 
			{"from":-9, "to":"tb589", "frompid":"", "topid":""},
			{"from":"tb589", "to":-5, "frompid":"OUT", "topid":""},
			{"from":-5, "to":-8, "frompid":"OUT", "topid":""},
			{"from":-8, "to":-6, "frompid":"OUT", "topid":""},
			{"from":-6, "to":-7, "frompid":"OUT", "topid":""}
		]
	};
}
