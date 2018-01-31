Ext.define('krf_new.view.south.SearchResultGrid_PollLoad_Result', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	require: ['Ext.grid.plugin.BufferRenderer'],
	
	xtype: 'searchResultPollLoad',
	
	id: 'searchResultPollLoad_container',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			plugins: ['bufferedrenderer', 'gridfilters'],
			//plugins: ['gridfilters'], // bufferedrenderer 쓰면 그리드 스크롤링(gridCtl.getView().getRow(rowIdx).scrollIntoView();)이 잘 안먹음, rowindex가 높을때..(한강, 한강서울 검색확인) -- 임시
			siteIds: "",
			parentIds: [],
			header: {
				height: 5
			},
			title: '검색결과',
			siteId: '',
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				me.setWidth(parentCtl.getWidth() - 10);
				me.setHeight(parentCtl.getHeight() - 110);
				
				parentCtl.on("resize", function(){
					//////console.info(parentCtl);
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
				
			},
			
			columns: [{	 
				text      : '대권역',
				dataIndex : 'WS_NM',
				
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '중권역',
				dataIndex : 'AM_NM',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '표준유역',
				dataIndex : 'SW_NAME',
				autoSizeColumn: true,
				listeners: {
					click: function(tblView, el, rowCnt, colCnt, row){
						
						var value = Ext.getCmp("pollLoadSelect").value;
						var coreMap = GetCoreMap();
						var tmLayerAdmin = coreMap.tmLayerAdmin;
						
						//console.info(coreMap);
						
		        		if(value == 11){
		        			return;
		        		}else if(value == 22){	
		        			var swNm = row.record.data.SW_NAME;
		        			var catStore = null;
		        			
		        			var coreMap = GetCoreMap();
		        			
		        			var catDids = []; 
		        			var catDids_All = [];
		        			for(var i = 0; i < coreMap.tmLayerAdmin.tmGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.tmLayerAdmin.tmGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				if(coreMap.tmLayerAdmin.tmGraphicLayerCat.graphics[i].attributes.SB_NM == swNm){
		        					catDids.push(coreMap.tmLayerAdmin.tmGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				}
		        			}
		        			
		        			
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", tmLayerAdmin.initOpacity);
		        			}
		        			
		        			
		        			for(var j = 0; j < catDids.length;j++){
		        				var polySymbol = $("#polySymbol_" + catDids[j]);
				        		polySymbol[0].setAttribute("opacity", tmLayerAdmin.mouseOverOpacity);
		        			}
		        			
						}else{
							var cat_did = row.record.data.CAT_DID;
							
							
							var catDids_All = [];
		        			for(var i = 0; i < coreMap.tmLayerAdmin.tmGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.tmLayerAdmin.tmGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        			}
							
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", tmLayerAdmin.initOpacity);
		        			}
							
							
							var polySymbol = $("#polySymbol_" + cat_did);
			        		polySymbol[0].setAttribute("opacity", tmLayerAdmin.mouseOverOpacity);
						}
						
		        		
		        		
					}
				}
				//filter: {type: 'numeric'}
			},{	 
				text      : '집수구역',
				dataIndex : 'CAT_DID',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '법정동리',
				dataIndex : 'ADDR',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '점유율',
				dataIndex : 'PERCENTAGE',
				autoSizeColumn: true,
				renderer: function(value,b,c,d){
					if(c.data.ADDR == "총계"){
						return value = "";
					}else{
						//console.info("else");
						return Ext.util.Format.number(value, '0.00');
					}
					
				}
				//filter: {type: 'numeric'}
			},{	 
				text      : '구분',
				dataIndex : 'GUBUN',
				autoSizeColumn: true
				//filter: {type: 'numeric'}
			},{
				text : '발생 (kg/일)',
				columns: [{
					text     : 'BOD',
					dataIndex: 'GNR_BOD_SUM',
					width: 100,
					align:'right',
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				}, {
					text     : 'TN',
					dataIndex: 'GNR_TN_SUM',
					align:'right',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				}, {
					text     : 'TP',
					dataIndex: 'GNR_TP_SUM',
					align:'right',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				}]
			
				
			},{
				text : '배출 (kg/일)',
				columns: [{
					text     : 'BOD',
					dataIndex: 'OUT_BOD_SUM',
					align:'right',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				}, {
					text     : 'TN',
					dataIndex: 'OUT_TN_SUM',
					align:'right',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				}, {
					text     : 'TP',
					dataIndex: 'OUT_TP_SUM',
					align:'right',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/},
					renderer: function(value){
						return Ext.util.Format.number(value, '0.0000');
					}
				}]
			}],
			
			//소계 css 적용
			viewConfig: {
				 getRowClass: function(record, rowIndex, rowParams, store) {
					 //bold 13px/15px helvetica,arial,verdana,sans-serif
					 if(record.data.GUBUN == "소계"){
						 if(record.data.CAT_DID == "총계"){
							 return 'pdj_total_subTotal';
						 }else if(record.data.SW_NAME == "총계"){
							 return 'pdj_total_subTotal';
						 }else{
							 return 'pdj_subTotal';
						 }
						 ////console.info(record);
						 
					 }
					 
					 if(record.data.CAT_DID == "총계"){
						 ////console.info(record);
						 return 'pdj_total';
					 }
					 
					 if(record.data.SW_NAME == "총계"){
						 return 'pdj_total';
					 }
					 
					 //pdj_total_subTotal
					 
				}
			}
		}]
	}],
	initComponent: function(){
		
		this.callParent();
		
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});