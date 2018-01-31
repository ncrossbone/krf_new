/*!
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.SiteListWindow', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
    ],

    id:'siteList-win',

    win : null,
    
    init : function(){
        this.launcher = {
            text: 'Size List Window',
            iconCls:'icon-grid'
        };
        
//        win.on("beforeclose", function windSitreNChartClose(){
//			var windowSiteNChart = Ext.getCmp("windowSiteNChart");
//			if(windowSiteNChart != undefined){
//				windowSiteNChart.hide();
//			}
//			var currCtl = SetBtnOnOff("btnSiteListWindow");
//			me.hide();
//			return false;
//		});
        
        // 클릭한 지점으로 이동
        $KRF_APP.addListener($KRF_EVENT.MOVE_COMMON, this.moveCommon, this);
    }, 

    createWindow : function(config){
        var desktop = this.app.getDesktop();
        win = desktop.getWindow('siteList-win');
        var cfg = Ext.applyIf(config || {}, {
			            id: 'siteList-win',
			            title: '지점 목록',
//			            cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
			            width:340,
			            height:480,
			            iconCls: 'icon-grid',
			            animCollapse:false,
			            constrainHeader:true,
			            style:"padding-top:10px",
			            layout: 'fit',
			            maximizable : false,
			            items: [{
			        		xtype: 'treepanel',
			        		id: 'siteListTree',
			        		rootVisible:false,
			        		cls: 'khLee-x-grid-cell',
			        		columns: [{
			                    xtype: 'treecolumn', //this is so we know which column will show the tree
			                    text: '지점',
			                    width: 220,
			                    sortable: true,
			                    dataIndex: 'text',
			                    locked: true,
			                    listeners: {
			                    	click: function(grid, rowIndex, colIndex, actionItem, node, record, row){
			        	            	if(node.record.data.leaf == true){
			        						if(node.record.data.id != undefined){
			        							// 집수구역, 지점 이동, 리치정보 하이라이트
//			        							me.moveCommon(record);
			        							$KRF_APP.fireEvent($KRF_EVENT.MOVE_COMMON, record);
			        						}
			        					}
			        	            }
			                    }
			                }, {
			                    text: '정보',
			                    width: 60,
			                    menuDisabled: true,
			                    xtype: 'actioncolumn',
			                    tooltip: '지점정보',
			                    align: 'center',
			                    icon: './resources/images/button/icon_branch.gif',
			                    iconCls: ' khLee-x-default-btn', // 앞에 한칸 띄워야 함!!
			                    handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
			                    	var test = record.data.text;
			                    	var chkText = record.id;
			                    	var parentId = record.data.parentId;

			                    	ShowWindowSiteNChart(1, chkText, test, parentId, record.data.chartBtnDisabled);
			                    	
			                    	// 집수구역, 지점 이동, 리치정보 하이라이트
			                    	$KRF_APP.fireEvent($KRF_EVENT.MOVE_COMMON, record);
//			        				me.moveCommon(record);
			                    },
			                    // Only leaf level tasks may be edited
			                    isDisabled: function(view, rowIdx, colIdx, item, record) {
			                    	
			                    	if(record.data.infoBtnDisabled != undefined){
			                    		return record.data.infoBtnDisabled;
			                    	} else{
			                    		return !record.data.leaf;
			                    	}
			                    }
			                }, {
			                    text: '차트',
			                    width: 60,
			                    menuDisabled: true,
			                    tooltip: '차트정보',
			                    xtype: 'actioncolumn',
			                    align: 'center',
			                    icon: './resources/images/button/icon_chart.gif',
			                    iconCls: ' khLee-x-default-btn',
			                    handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
			                    	var test = record.data.text;
			                    	var chkText = record.id;
			                    	var parentId = record.data.parentId;
			                    	
			                    	ShowWindowSiteNChart(0, chkText, test, parentId);
			                    	
			                    	var clickText = record.raw.text;
			                    	var clickId = record.raw.id;
			                    	var clickData = clickText.split('(');
			                    	var clickParentId = record.raw.parentId;

			                    	setActionInfo(clickParentId[0] , clickParentId , clickData[0] , clickId , "차트검색");

			                    	// 집수구역, 지점 이동, 리치정보 하이라이트
			                    	$KRF_APP.fireEvent($KRF_EVENT.MOVE_COMMON, record);
//			        				me.moveCommon(record);
			                    },
			                    isDisabled: function(view, rowIdx, colIdx, item, record) {
			                    	
			                    	if(record.data.chartBtnDisabled != undefined){
			                    		
			                    		return record.data.chartBtnDisabled;
			                    	} else{
			                    		return !record.data.leaf;
			                    	}
			                    }
			                }/* 외부망 리포트 삭제 */, {
			                    text: '검색',
			                    width: 50,
			                    xtype: 'actioncolumn',
			                    tooltip: '검색결과',
			                    align: 'center',
			                    icon: './resources/images/button/icon_seah.gif',
			                    iconCls: ' khLee-x-serch-btn', // 앞에 한칸 띄워야 함!!
			                    handler: function(grid, rowIndex, colIndex, actionItem, node, record, row) {
			                    	//Ext.ShowSearchResult("grid-tab-2", "하천수");
			                    	$KRF_APP.btnFlag = "noDate";
			                    	var treeCtl = Ext.getCmp("siteListTree");
			                    	var siteIds = "";
			                    	var parentId = "";
			                    	//var gridId = "grid_" + record.data.id;
			                    	// 집수구역, 지점 이동, 리치정보 하이라이트
			                    	$KRF_APP.fireEvent($KRF_EVENT.MOVE_COMMON, record);
//			        				me.moveCommon(record);
			                    	//PollLoadSearchResult
			                    	if(record.id.length == 1){
			                    		var me = $KRF_APP.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
			                    		
			                    		var childRecord = record.childNodes;
			                    		
			                    		for(var i = 0; i < childRecord.length; i++){
			                    			var gridId = "grid_" + childRecord[i].data.id;
			                    			
			                    			me.setSiteIds(childRecord[i], true);
			                    			
			                            	//if(ChkSearchCondition("지점코드찾기", siteIds, parentId, record.data.text, gridId)){
			                            		
			                            		// 버튼 On/Off
			                    				currCtl = Ext.getCmp("btnSearchResult");
			                    				if(currCtl.btnOnOff == "off"){
			                    					SetBtnOnOff("btnSearchResult");
			                    				}
			                    				
			                    				var pNm = me.parentIds[0].parentId;
			                    				
			                    				pNm = pNm.substring(0,1);
			                    				
			                    				// 검색결과창 띄우기
			                    				ShowSearchResult(me.siteIds, me.parentIds, childRecord[i].data.text, gridId , "");
			                            		
			                            	//}
			                    		}
			                    	} else{
			                    		var me = $KRF_APP.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
			                    		
			                    		var gridId = "grid_" + record.data.id;
			                    		
			                    		me.setSiteIds(record, true);

			                        	//if(ChkSearchCondition("지점코드찾기", siteIds, parentId, record.data.text, gridId)){
			                        		
			                        		// 버튼 On/Off
			                				currCtl = Ext.getCmp("btnSearchResult");
			                				if(currCtl.btnOnOff == "off"){
			                					SetBtnOnOff("btnSearchResult");
			                				}
			                				
			                				var pNm = me.parentIds[0].parentId;
			                				
			                				pNm = pNm.substring(0,1);
			                				// 검색결과창 띄우기
			                				ShowSearchResult(me.siteIds, me.parentIds, record.data.text, gridId , "");
			                				
			                				var year = "2013";
			                				//검색결과 "검색"시 부하량 표출
			                				if(record.id == "pollLoad"){
			                					PollLoadSearchResult("");
			                				}else if(record.id == "pollution_01"
			                						||record.id == "pollution_02"
			                						||record.id == "pollution_03"
			                						||record.id == "pollution_04"
			                						||record.id == "pollution_05"
			                						||record.id == "pollution_06"
			                						||record.id == "pollution_07"){
			                					
			                					PollutionSearchResult("",record.id,record.data.title,record.data.storeNm,year);
			                				}else if(record.id == "pollution"){
			                					
			                					for(var i = 0 ; i < record.childNodes.length;i++){
			                						PollutionSearchResult("",record.childNodes[i].data.id
			                								,record.childNodes[i].data.title
			                								,record.childNodes[i].data.storeNm,year);
			                					}	
			                				}
			                    	}
			                    	if(record.id == "pollution_01"
		        					  	||record.id == "pollution_02"
		        						  ||record.id == "pollution_03"
		        						  ||record.id == "pollution_04"
		        						  ||record.id == "pollution_05"
		        						  ||record.id == "pollution_06"
		        						  ||record.id == "pollution_07"){
		        				  
		        					  	var clickId = record.raw.id;
		        					  	var clickParentId = record.raw.parentId;
		        					  
		        					  	setActionInfo(clickParentId , "오염원" , clickId , "" , "검색결과");
		        				  	}else{
		        				      	var clickText = record.raw.text;
		        				      	var clickId = record.raw.id;
		        				      	var clickData = clickText.split('(');
		        					  	var clickParentId = record.raw.parentId;
		        					  
		        					  	setActionInfo(clickParentId[0] , clickParentId , clickData[0] , clickId , "검색결과");
		        				  	}
			                    },
			                    isDisabled: function(view, rowIdx, colIdx, item, record) {
			                    	
			                    	if(record.data.srchBtnDisabled != undefined){
			                    		return record.data.srchBtnDisabled;
			                    	}
			                    }
			                }, {
			                    text: '관련리치',
			                    width: 105,
			                    //xtype: 'templatecolumn',
			                    tooltip: '관련리치',
			                    dataIndex: 'catDId',
			                    renderer: function(val){
			                    	var retVal = "";
			                    	if(val != undefined)
			                    		retVal = val;
			                    	return '<a href="#">' + retVal + '</a>';
			                    },
			                    align: 'center',/*
			                    hidden: true*/
			                    listeners: {
			                    	click: function(grid, rowIndex, colIndex, actionItem, node, record, row){
			        	            	if(record.data.leaf == true){
			        						if(record.data.id != undefined){
			        							
			        							currCtl = Ext.getCmp("btnSearchResult");
			        	        				if(currCtl.btnOnOff == "off"){
			        	        					SetBtnOnOff("btnSearchResult");
			        	        				}
			        							
			        							// 집수구역, 지점 이동, 리치정보 하이라이트
			        	        				$KRF_APP.fireEvent($KRF_EVENT.MOVE_COMMON, record);
//			        							me.moveCommon(record);
			        						}
			        					}
			        	            }
			                    }
			                }]
			        	}]
			        });
        
        if(!win){
            win = desktop.createWindow(cfg);
        }
        return win;
    },
    siteIds: '',
	parentIds: [],
	catIds: '',
	
	// 사이트 아이디 셋팅 (record : tree node, isInit : siteIds 변수 초기화 여부)
	setSiteIds: function(record, isInit){
//		var me = this;
		var me = $KRF_APP.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
		
		if(isInit == true){
			me.parentIds = [];
			me.siteIds = "";
		}
		
		var childRecords = record.childNodes;
		
		if(childRecords != undefined && childRecords.length > 0){
			for(var i = 0; i < childRecords.length; i++){
				me.setSiteIds(childRecords[i], false);
			}
		} else{
			if(me.siteIds != ""){
				me.siteIds += ", ";
			}
			me.parentIds.push({'parentId': record.parentNode.data.id, 'siteId': record.data.id}); 
			me.siteIds += "'" + record.data.id + "'";
		}
    },
    
    setCatIds: function(record, isInit){
    	var me = $KRF_APP.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
    	
    	var childRecords = undefined;
    	
    	if(isInit == true){
    		me.catIds = "";
    		var treeCtl = Ext.getCmp("siteListTree");
    		var rootNode = treeCtl.store.root;
    		childRecords = rootNode.childNodes;
    	}
    	else{
    		childRecords = record.childNodes;
    	}
    	
    	/*
    	if(isInit == true){
    		me.catIds = "";
    	}
    	
    	childRecords = record.childNodes;
    	*/
    	
    	if(childRecords != undefined && childRecords.length > 0){
			for(var i = 0; i < childRecords.length; i++){
				me.setCatIds(childRecords[i], false);
			}
		}
		else{
			if(me.catIds != ""){
				me.catIds += ", ";
			}
 
			me.catIds += "'" + record.data.catDId + "'";
		}
    },
	
	listeners:{
        close:function(){
            var currCtl = Ext.getCmp("btnSiteListWindow");
            if(currCtl.btnOnOff == "on"){
            	SetBtnOnOff(currCtl.id);
            }
        }
    },
	
	moveCommon: function(record){
		
		var me = $KRF_APP.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
		
		// 집수구역 이동
		var nodeId = record.data.catDId;
		siteMovePoint("Cat", nodeId);
		
		// 지점이동
		nodeId = record.data.id;
		var parentNodeId = record.data.parentId;
		siteMovePoint(parentNodeId, nodeId);
		
		// 리치정보 띄우기
		me.setCatIds(record, true);
		ShowSearchResultReach(me.catIds);
		Ext.defer(function(){
			ReachSelectedFocus(record.data.catDId);
		}, 1000, this);
	}
});

