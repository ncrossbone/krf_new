Ext.define('krf_new.view.common.TabControl', {
	
	extend : 'Ext.panel.Panel',
	
	
	requires: [ 'krf_new.view.common.TabControlController'],
  
	xtype : 'common-tabcontrol',
	
	controller: 'tabControlController',
	
	id: 'tabControl',

	gridId:null,
	
	header: false,
	
	items: [{
		xtype: 'container',
		id: "tabCondition",
		//title: 'test',
		layout: {
			type: 'hbox',
			align: 'middle',
			pack: 'end'
		},
		height: 30,
		items: [{
			xtype: 'container',
			id: 'resultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype:"combo",
				id:"select_B001",
				store:Ext.create('Ext.data.Store',{
					fields:['label','value'],
					data:[['미확정자료 보기','01'],['확정자료 보기','02']]
				}),
				displayField:'label',
				valueField:'value',
				width:150,
				editable:false,
				hidden:true,
				value:"01"
			},{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				text: '기간'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbStartYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbStartMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'combo',
				id: 'cmbStartBan',
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: '1', name: '상'}
						,{id: '2', name: '하'}]
				}),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				id: 'startLabel',
				text: '월'
			},{
				xtype:"panel",
				id:"startDayTime",
				border:false,
				hidden:true,
				layout:{
						type:"hbox",
						align: 'middle'
				},
				items:[{
					xtype:'combo',
					id:"startDay",
					store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
					editable:false,
					value:"30",
					width:50
				},{
					xtype:"label",
					text:"일"
				},{
					xtype:'combo',
					id:"startTime",
					store: $KRF_APP.global.CommFn.bindComboHour("Asc", ""),
					editable:false,
					width:50
				},{
					xtype:"label",
					text:"시"
				}]
			},{
				xtype: 'container',
				width: 10
			},{
				xtype: 'label',
				text: '~'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbEndYear',
				store: $KRF_APP.global.CommFn.bindComboYear(2010, "Desc", ""),
				width: 80,
				height: 25
			}, {
				xtype: 'label',
				text: '년'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'combo',
				id: 'cmbEndMonth',
				store: $KRF_APP.global.CommFn.bindComboMonth("Asc", ""),
				width: 50,
				height: 25
			}, {
				xtype: 'combo',
				id: 'cmbEndBan',
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: '1', name: '상'}
						,{id: '2', name: '하'}]
				}),
				width: 50,
				height: 25
			}, {
				xtype: 'label',
				id: 'endLabel',
				text: '월'
			},{
				xtype:"panel",
				border:false,
				hidden:true,
				id:"endDayTime",
				layout:{
					type:"hbox",
					align:"center"
				},
				items:[{
					xtype:'combo',
					id:"endDay",
					store: $KRF_APP.global.CommFn.bindComboDay("Asc", ""),
					editable:false,
					value:"30",
					width:50
				},{
					xtype:"label",
					text:"일"
				},{
					xtype:'combo',
					id:"endTime",
					store: $KRF_APP.global.CommFn.bindComboHour("Asc", ""),
					editable:false,
					value:"23",
					width:50
				},{
					xtype:"label",
					text:"시"
				}]
			},{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							
							var fName = Ext.getCmp("F_CHANGE");
							var tabCtl = Ext.getCmp("searchResultTab");
							tabCtl = tabCtl.items.items[1];
							var activeTab = tabCtl.getActiveTab();
							
							// 검색조건 셋팅 (필수!!)
							$KRF_APP.global.TabFn.searchConditionSet(activeTab.down("grid"));
							
							var gridContainer = activeTab.items.items[0];
							var gridCtl = gridContainer.items.items[0];
							if(gridCtl.parentIds[0].parentId == undefined){
								var parentId =  gridCtl.parentIds
							}else{
								var parentId = gridCtl.parentIds[0].parentId
							}
							
							var gridId = activeTab.id.replace("_container", ""); // _container는 common.ShowSearchResult 에서 붙이는걸로...
							
							$KRF_APP.btnFlag = "date";
							
							var title = activeTab.title.split('(');
							
							setActionInfo(parentId[0] , parentId , title[0], "" , "검색결과");
							
							ShowSearchResult(gridCtl.siteIds, parentId, "", gridId, fName.value, undefined, false);
						}
					}
				}
			},{
				xtype: 'container',
				width: 10
			},,{
				xtype: 'combo',
				id: 'F_CHANGE',
				valueField: 'id',
				displayField: 'name',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: '1', name: '방류유량'}
						,{id: '2', name: '직접이송량'}
						,{id: '3', name: '총유입량'}
						,{id: '4', name: '관거이송량'}]
				}),
				//store: ['', '관거이송량','방류유량','직접이송량','총유입량'],
				value: '방류유량',
				width: 100,
				height: 19,
				hidden: true,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					change: function(){
						
						$KRF_APP.btnFlag = "noDate";
						
						var fName = Ext.getCmp("F_CHANGE");
						var tabCtl = Ext.getCmp("searchResultTab");
						tabCtl = tabCtl.items.items[1];
						var activeTab = tabCtl.getActiveTab();
						var gridContainer = activeTab.items.items[0];
						var gridCtl = gridContainer.items.items[0];
						if(gridCtl.parentIds[0].parentId == undefined){
							var parentId =  gridCtl.parentIds
						}else{
							var parentId = gridCtl.parentIds[0].parentId
						}
						
						var gridId = activeTab.id.replace("_container", ""); // _container는 common.ShowSearchResult 에서 붙이는걸로...
						
						ShowSearchResult(gridCtl.siteIds, parentId, "", gridId,fName.value);
					}
				}
			
					
			}]
		},{
			xtype: 'container',
			width: 10
		},{ //방유량 검색 조건 / 집수구역
			xtype: 'container',
			id: 'pollResultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			//flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollLoadSelect',
				valueField: 'id',
				displayField: 'name',
				//id: 'cmbStartYear',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: '11', name: '총괄표'}
						,{id: '22', name: '표준유역단위 보기'}
						,{id: '33', name: '집수구역단위 보기'}
						,{id: '44', name: '집수구역단위 상세보기'}]
				}),
				value: '11',
				width: 170,
				height: 25
			}]
		},{
			xtype: 'container',
			width: 10
		},{
			//방유량  (년도/검색)버튼
			xtype: 'container',
			id: 'pollSearchTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollYear',
				store: ['2013', '2012', '2011', '2010'],
				value: '2013',
				width: 80,
				height: 25
			},  {
				xtype: 'container',
				width: 10
			},{

				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							//pdj
							var pollLoadSelect = Ext.getCmp("pollLoadSelect");
							PollLoadSearchResult(pollLoadSelect.lastValue);
							
							setActionInfo("pollLoad" , "pollLoad" , "부하량", "" , "검색결과");
							
							//PollLoadSearchResult();
						}
					}
				}
			
			}]
		},
		
		
		//오염원  (년도/검색)버튼
		{ 
			xtype: 'container',
			id: 'pollutionResultTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			//flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollutionSelect',
				valueField: 'id',
				displayField: 'name',
				//id: 'cmbStartYear',
				store: Ext.create('Ext.data.Store', {
					fields: ['id', 'name'],
					data: [{id: '11', name: '총괄표'}
						,{id: '22', name: '표준유역단위 보기'}
						,{id: '33', name: '집수구역단위 보기'}
						,{id: '44', name: '집수구역단위 상세보기'}]
				}),
				value: '11',
				width: 170,
				height: 25
			}]
		},{
			xtype: 'container',
			width: 10
		},{
			xtype: 'container',
			id: 'pollutionSearchTab',
			layout: {
				type: 'hbox',
				align: 'middle',
				pack: 'left'
			},
			flex: 1,
			height: 30,
			items: [{
				xtype: 'combo',
				id: 'pollutionYear',
				store: ['2013', '2012', '2011'],
				value: '2013',
				width: 80,
				height: 25
			},  {
				xtype: 'container',
				width: 10
			},{

				xtype: 'image',
				src: './resources/images/button/icon_seah.gif', //검색
				width: 34,
				height: 19,
				style: 'cursor:pointer;border:0px !important;',
				listeners: {
					el: {
						click: function(){
							
							
							
							var tabCtl = Ext.getCmp("searchResultTab");
							tabCtl = tabCtl.items.items[1];
							var activeTab = tabCtl.getActiveTab();
							
							var pollutionYear = Ext.getCmp("pollutionYear").value;
							//pdj
							var pollutionSelect = Ext.getCmp("pollutionSelect");
							
							setActionInfo("pollution" , "pollution" , "오염원", "" , "검색결과");
							
							PollutionSearchResult(pollutionSelect.lastValue,activeTab.recordId,activeTab.title,activeTab.storeNm,pollutionYear);
						}
					}
				}
			
			}]
		
			
			
		
		},/*{
			xtype: 'image',
			width: 48,
			height: 14,
			src: './resources/images/button/btn01.gif' // 라벨
		}, {
			xtype: 'container',
			width: 10
		}, {
			xtype: 'combo',
			store: ['항목선택', 'BOD', 'DO', 'COD', 'T-N', 'T-P', '수온'],
			value: '항목선택',
			listeners: {
				change: function(combo, newVal, oldVal){
					// 피처 레이어 생성/갱신
					//KRF_DEV.getApplication().fireEvent('Reach_TestOnOff', "DynamicLayerAdmin_ReachTest", newVal, 1);
					KRF_DEV.getApplication().fireEvent('selectMapDisplayType',  newVal, 1);
				}
			},
			width: 100,
			height: 25
		},*/ {
			xtype: 'container',
			width: 120
		}, {
			xtype: 'image',
			width: 83,
			height: 25,
			src: './resources/images/button/btn_exl.gif', // 엑셀 다운
			listeners: { el: { click: function(){
				
				// 로딩바 띄우기
				var winCtl = Ext.getCmp("searchResultWindow");
//				var winCtl = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.RESULT.id);
				winCtl.mask("loading", "loading...");
				
				var tabCtl = Ext.getCmp("searchResultTab");
				tabCtl = tabCtl.items.items[1];
				var activeTab = tabCtl.getActiveTab();
				var gridContainer = activeTab.items.items[0];
				var grid = gridContainer.down('gridpanel');
//				console.info(gridContainer);
//				console.info(grid);
//				if(!grid.download){
//					grid.download = 'sleep';
//				}
				
				var colArr = grid.getColumnManager().getColumns();
				
				var tabpanels = Ext.getCmp("tabpanels");
				
				var ClNodeName = tabpanels.activeTab.id;
				var ClNode = tabpanels.activeTab.parentId;
				var ClTitle =  tabpanels.activeTab.title;
				ClTitle = ClTitle.split('(');
				
				if(tabpanels.activeTab.id == "searchResultPollLoad_container"){
					var value = Ext.getCmp("pollLoadSelect").value;
					
					if(value == "11" ){
						colArr.splice(3,4);
					}else if(value == "22"){
						colArr.splice(3,3);
					}else if(value == "33"){
						colArr.splice(4,2);
					}else{
						colArr = colArr;
					}
					
					ClNodeName = ClNodeName.split('_');
					ClNodeName = ClNodeName[0];
					
				}else{
					if(ClNodeName.split('_')[0] == "searchResultpollution"){
						ClNodeName = ClNodeName.split('_');
						ClNodeName = ClNodeName[0]
					}else{
						ClNodeName = ClNodeName.split('_');
						ClNodeName = ClNodeName[1];
					}
				}
				
				//엑셀다운 클릭 session
				setActionInfo(ClNode , "" , ClTitle[0] , ClNodeName , "엑셀다운");
				
				var hItem = grid.getHeaderContainer().config.items;
				var gItem = [];
				for(var i=0; i<hItem.length; i++){
					var item = hItem[i];
					if(item.columns){
						gItem.push(item);
					}
				}
				
				var headName = [];
				var header = [];
				var datas = [];
				
				var dataArr = grid.getView().store.data.items
				if(!dataArr){
					dataArr = store.data.map[1].value;
					
				}
				for(var i=0; i<dataArr.length; i++){
					// khLee 수정 값 변경
					var strData = JSON.stringify(dataArr[i].data);
					
					//고려 해봐야함
					if(strData == "888888888" || strData == "999999999"){
						strData = strData.replace(/888888888/gi, "\"\"");
						strData = strData.replace(/999999999/gi, "\"정량한계미만\"");
					}
					
					var convertData = JSON.parse(strData);
					//datas.push(dataArr[i].data);
					datas.push(convertData);
				}
				
				var removeMem = []
				if(datas.length>0){
					var data = datas[0];
					for(var mem in data){
						if(data[mem] instanceof Array){
							removeMem.push(mem);
						}
					}
					
					// khLee parentId (레이어코드) 제외
					removeMem.push("parentId");
					//console.info(colArr);
					for(var i=0; i<colArr.length; i++){
						if(colArr[i].dataIndex!=""){
							var add = true;
							for(var k=0; k<removeMem.length; k++){
								if(removeMem[k]==colArr[i].dataIndex){
									add = false;
									break;
								}
								
							}
							
							if(add){
								var preText = '';
								for(var k=0; k<gItem.length; k++){
									var gCols = gItem[k];
									for(var j=0; j<gCols.columns.length; j++){
										var gc = gCols.columns[j];
										if(gc.dataIndex==colArr[i].dataIndex){
											preText = gCols.text;
											break;
										}
									}
								}
								headName.push(preText + colArr[i].text);
								header.push(colArr[i].dataIndex);
							}
						}
					}
					//(kg/일)
					for(var i = 0; i < headName.length; i++){
						if(headName[i].indexOf("(kg/일)") > -1)
							headName[i] = headName[i].replace("(kg/일)", "") + " (kg/일)";
					}
				}else{
					for(var i=0; i<colArr.length; i++){
						if(colArr[i].dataIndex!=""){
							var preText = '';
							for(var k=0; k<gItem.length; k++){
								var gCols = gItem[k];
								for(var j=0; j<gCols.columns.length; j++){
									var gc = gCols.columns[j];
									if(gc.dataIndex==colArr[i].dataIndex){
										preText = gCols.text;
										break;
									}
								}
							}
							headName.push(preText + colArr[i].text);
							header.push(colArr[i].dataIndex);
						}
					}
				}
				
				//if(grid.download=='sleep'){
					this.status = 'download';
					//"./resources/jsp/excelDown.jsp"
					/*$.post(_API.excelDown, {headName:JSON.stringify(headName), header:JSON.stringify(header), datas:JSON.stringify(datas)}, function(data){
						//grid.download = 'download';
						$('#__fileDownloadIframe__').remove();
						$('body').append('<iframe src='+data.url+' id="__fileDownloadIframe__" name="__fileDownloadIframe__" width="0" height="0" style="display:none;"/>');
						
						// 로딩바 숨김
						winCtl.unmask();
			   		},"json").error(function(){
			   			//grid.download = 'download';
			   		});*/
                    var catLayerNm = $KRF_APP.global.CommFn.catLayerNmMap[ClNode];
                    catLayerNm = catLayerNm == null ? "":catLayerNm+"_";
                    $KRF_APP.global.CommFn.excelDown(catLayerNm+ClTitle[0] ,headName,header,datas);
					winCtl.unmask();
//				}else{
//					alert("다운로드중입니다.");
//				}
				
			} } }
		}, {
			xtype: 'container',
			width: 10
		}]
	}, {
		xtype: 'tabpanel',
		id: 'tabpanels',
		//title: 'tab1',
		style: 'background-color: #157fcb;',
		//closable: true,
		cls: 'khLee-tab-active khLee-tab-unselectable khLee-tab',
		listeners:{
			'tabchange': function (tabPanel, tab){
				
				// 그리드별 조회조건 컨트롤 셋팅
				$KRF_APP.global.TabFn.searchConditionCtl(tab.down("grid"));
				
				//미확정자료 콤보박스 분기 - ph
				var b001 = Ext.getCmp("select_B001");
				var startDayTime = Ext.getCmp("startDayTime");
				var endDayTime = Ext.getCmp("endDayTime");
				
				var cmbStartYear = Ext.getCmp("cmbStartYear");
				var cmbEndYear = Ext.getCmp("cmbEndYear");
				
				var cmbStartMonth = Ext.getCmp("cmbStartMonth");
				var cmbEndMonth = Ext.getCmp("cmbEndMonth");
				
				var cmbStartBan = Ext.getCmp("cmbStartBan");
				var cmbEndBan = Ext.getCmp("cmbEndBan");
				
					if(tab.id=="grid_B001_container" || tab.idCheck=="B001"){
						b001.setHidden(false);
						startDayTime.setHidden(false);
						endDayTime.setHidden(false);
						
						cmbStartYear.setValue(tab.items.items[0].items.items[0].items.items[0].store.startYear);
						cmbStartMonth.setValue(tab.items.items[0].items.items[0].items.items[0].store.startMonth);
						Ext.getCmp("startDay").setValue(tab.items.items[0].items.items[0].items.items[0].store.startDay);
						Ext.getCmp("startTime").setValue(tab.items.items[0].items.items[0].items.items[0].store.startTime);
						
						cmbEndYear.setValue(tab.items.items[0].items.items[0].items.items[0].store.endYear);
						cmbEndMonth.setValue(tab.items.items[0].items.items[0].items.items[0].store.endMonth);
						Ext.getCmp("endDay").setValue(tab.items.items[0].items.items[0].items.items[0].store.endDay);
						Ext.getCmp("endTime").setValue(tab.items.items[0].items.items[0].items.items[0].store.endTime);
						
					}else{
						b001.setHidden(true);
						startDayTime.setHidden(true);
						endDayTime.setHidden(true);
					}
				if(tab.parentId != "F"){
					//console.info("!!");
					var hiddenGrid = Ext.getCmp("F_CHANGE");
					
					var store = ['2010','2011','2012','2013','2014','2015','2016','2017','2018'];
					
					if(tab.parentId == "D" || tab.parentId == "B" ){
						if(tab.items.items[0].items.items[0].items.items[0].store.data.length == 0){
							Ext.getCmp("cmbStartYear").setValue("2017");
							Ext.getCmp("cmbStartMonth").setValue("01");
	    					Ext.getCmp("cmbEndYear").setValue("2017");
	    					Ext.getCmp("cmbEndMonth").setValue("04");
						}else{
							Ext.getCmp("cmbStartYear").setValue(tab.items.items[0].items.items[0].items.items[0].store.startYear); 
							Ext.getCmp("cmbStartMonth").setValue(tab.items.items[0].items.items[0].items.items[0].store.startMonth);
							Ext.getCmp("cmbEndYear").setValue(tab.items.items[0].items.items[0].items.items[0].store.endYear);
							Ext.getCmp("cmbEndMonth").setValue(tab.items.items[0].items.items[0].items.items[0].store.endMonth);
						}
					}else if(tab.parentId == "C"){
						if(tab.items.items[0].items.items[0].items.items[0].store.data.length == 0){
							Ext.getCmp("cmbStartYear").setValue("2017");
							Ext.getCmp("cmbStartBan").setValue("상");
	    					Ext.getCmp("cmbEndYear").setValue("2017");
	    					Ext.getCmp("cmbEndBan").setValue("하");
						}else{
							Ext.getCmp("cmbStartYear").setValue(tab.items.items[0].items.items[0].items.items[0].store.startYear); 
							Ext.getCmp("cmbStartBan").setValue(tab.items.items[0].items.items[0].items.items[0].store.startMonth);
							Ext.getCmp("cmbEndYear").setValue(tab.items.items[0].items.items[0].items.items[0].store.endYear);
							Ext.getCmp("cmbEndBan").setValue(tab.items.items[0].items.items[0].items.items[0].store.endMonth);
						}
					}else{
						if(tab.items.items[0].items.items[0].store.data.length == 0){
							Ext.getCmp("cmbStartYear").setValue("2017"); 
	    					Ext.getCmp("cmbStartMonth").setValue("01");
	    					Ext.getCmp("cmbEndYear").setValue("2017");
	    					Ext.getCmp("cmbEndMonth").setValue("04");
						}else{
							Ext.getCmp("cmbStartYear").setValue(tab.items.items[0].items.items[0].store.startYear); 
							Ext.getCmp("cmbStartMonth").setValue(tab.items.items[0].items.items[0].store.startMonth);
							Ext.getCmp("cmbEndYear").setValue(tab.items.items[0].items.items[0].store.endYear);
							Ext.getCmp("cmbEndMonth").setValue(tab.items.items[0].items.items[0].store.endMonth);
						}
					}
					
					hiddenGrid.setHidden(true);
				}else{
					var hiddenGrid = Ext.getCmp("F_CHANGE");
					
					var store = ['2012','2013'];
					
					var cmbStartYear = Ext.getCmp("cmbStartYear");
					var cmbEndYear = Ext.getCmp("cmbEndYear");
					
					cmbStartYear.setStore(store);
					cmbEndYear.setStore(store);
					if(tab.items.items[0].items.items[0].items.items[0].store.data.length == 0){
						Ext.getCmp("cmbStartYear").setValue("2013"); 
    					Ext.getCmp("cmbStartMonth").setValue("01");
    					Ext.getCmp("cmbEndYear").setValue("2013");
    					Ext.getCmp("cmbEndMonth").setValue("12");
					}else{
						Ext.getCmp("cmbStartYear").setValue(tab.items.items[0].items.items[0].items.items[0].store.startYear); 
						Ext.getCmp("cmbStartMonth").setValue(tab.items.items[0].items.items[0].items.items[0].store.startMonth);
						Ext.getCmp("cmbEndYear").setValue(tab.items.items[0].items.items[0].items.items[0].store.endYear);
						Ext.getCmp("cmbEndMonth").setValue(tab.items.items[0].items.items[0].items.items[0].store.endMonth);
						Ext.getCmp("F_CHANGE").setRawValue(tab.items.items[0].items.items[0].items.items[0].store.gubunNm);
					}
					
					hiddenGrid.setHidden(false);
				}
				
				var resultTab = Ext.getCmp("resultTab"); 		 //일반 검색pollResultTab
				var pollSearchTab = Ext.getCmp("pollSearchTab"); //부하량 (년도/검색)
				var pollResultTab = Ext.getCmp("pollResultTab"); //부하량 집수구역별 검색조건
				
				var pollutionSearchTab = Ext.getCmp("pollutionSearchTab"); //방유량 (년도/검색)
				var pollutionResultTab = Ext.getCmp("pollutionResultTab"); //방유량 집수구역별 검색조건
				
				//부하량 or 일반검색시 tab change
				if(tab.id == "searchResultPollLoad_container"){
					resultTab.setHidden(true);		//일반 검색pollResultTab
					pollSearchTab.setHidden(false);
					pollResultTab.setHidden(false);	//부하량 검색조건
					
					pollutionSearchTab.setHidden(true);
					pollutionResultTab.setHidden(true);	//방유량 검색조건
					
				}else if(tab.id == "searchResultpollution_01_container"
					||tab.id == "searchResultpollution_02_container"
					||tab.id == "searchResultpollution_03_container"
					||tab.id == "searchResultpollution_04_container"
					||tab.id == "searchResultpollution_05_container"
					||tab.id == "searchResultpollution_06_container"
					||tab.id == "searchResultpollution_07_container"){
					
					//일반 검색
					resultTab.setHidden(true);		
					
					//부하량 검색조건
					pollSearchTab.setHidden(true);
					pollResultTab.setHidden(true);	
					
					//오염원 검색조건
					pollutionSearchTab.setHidden(false);
					pollutionResultTab.setHidden(false);	
					
				}else{
					
					if(tab.id=="searchResultReach_container"){
						Ext.getCmp("resultTab").hide();
					}else{
						Ext.getCmp("resultTab").show();
					}
					
					var startLabel = Ext.getCmp("startLabel");
					var endLabel = Ext.getCmp("endLabel");
					
					if(tab.parentId == "C"){
						startLabel.setText("반기");
						endLabel.setText("반기");
						cmbStartMonth.setHidden(true);
						cmbEndMonth.setHidden(true);
						cmbStartBan.setHidden(false);
						cmbEndBan.setHidden(false);
					}else{
						startLabel.setText("월");
						endLabel.setText("월");
						cmbStartMonth.setHidden(false);
						cmbEndMonth.setHidden(false);
						cmbStartBan.setHidden(true);
						cmbEndBan.setHidden(true);
					}

					//resultTab.setHidden(false);		//일반 검색pollResultTab
					
					pollSearchTab.setHidden(true);	//방유량 (년도/검색)
					pollResultTab.setHidden(true);	//방유량 검색조건
					
					//오염원 검색조건
					pollutionSearchTab.setHidden(true);
					pollutionResultTab.setHidden(true);	
				}
				
				var storevalue = Ext.getCmp(tab.id);
				if(storevalue != undefined){
					var pollutiongrdCtl = storevalue.items.items[0]; // 그리드 컨테이너
					pollutiongrdCtl = pollutiongrdCtl.items.items[0]; // 그리드 컨트롤
					
					var pollutionSelect = Ext.getCmp("pollutionSelect");
					
					if(pollutiongrdCtl.store.selectValue == undefined || pollutiongrdCtl.store.selectValue == ""){
						pollutionSelect.setValue("11");
					}else{
						pollutionSelect.setValue(pollutiongrdCtl.store.selectValue);
					}
					
					var pollutionYear = Ext.getCmp("pollutionYear");
					if(pollutiongrdCtl.store.year == undefined || pollutiongrdCtl.store.year == ""){
						pollutionYear.setValue("2013");
					}else{
						pollutionYear.setValue(pollutiongrdCtl.store.year);
					}
				}
			}
		}
	}]
});