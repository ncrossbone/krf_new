Ext.define('krf_new.view.south.pollution.SearchResultGrid_pollution_07', {
	
	extend: 'Ext.container.Container',
	
	xtype: 'searchResultGrid_pollution_07',
	
	id: 'searchResultpollution_07_container',
	
	height: '100%',
	width: '100%',
	closable: true,
	closeText: '×',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			//plugins: ['bufferedrenderer', 'gridfilters'],
			plugins: ['bufferedrenderer', 'gridfilters'],
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
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
				
			},
			
			columns: [{	 
				text      : '조사년도',
				dataIndex : 'YYYY',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '대권역',
				dataIndex : 'WS_NM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '중권역',
				dataIndex : 'MB_NM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '표준유역',
				dataIndex : 'SB_NM',
				width: 150,
				listeners:{

					click: function(tblView, el, rowCnt, colCnt, row){
						
						var value = Ext.getCmp("pollutionSelect").value;
						var coreMap = GetCoreMap();
						var pollutionLayerAdmin = coreMap.pollutionLayerAdmin;
						
		        		if(value == 11){
		        			return;
		        		}else if(value == 22){	
		        			var swNm = row.record.data.SB_NM;
		        			
		        			var catStore = null;
		        			
		        			var coreMap = GetCoreMap();
		        			
		        			var catDids = []; 
		        			var catDids_All = [];
		        			for(var i = 0; i < coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				if(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.SB_NM == swNm){
		        					catDids.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				}
		        			}
		        			
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.initOpacity);
		        			}
		        			
		        			for(var j = 0; j < catDids.length;j++){
		        				var polySymbol = $("#polySymbol_" + catDids[j]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.mouseOverOpacity);
		        			}
		        			
						}else{
							var cat_did = row.record.data.CAT_DID;
							
							var catDids_All = [];
		        			for(var i = 0; i < coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        			}
							
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.initOpacity);
		        			}
							
							var polySymbol = $("#polySymbol_" + cat_did);
			        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.mouseOverOpacity);
						}
					}
				}
				//filter: {type: 'numeric'}
			},{	 
				text      : '집수구역',
				dataIndex : 'CAT_DID',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '법정동리',
				dataIndex : 'ADDR',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '점유율',
				dataIndex : 'FINAL_PERCENTAGE',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '관할기관명',
				dataIndex : 'INST_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '업소명',
				dataIndex : 'IND_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '대표자',
				dataIndex : 'IND_OWNER',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '사업자등록번호',
				dataIndex : 'IND_ID',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '기타수질오염원분류',
				dataIndex : 'OT_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '처리방법',
				dataIndex : 'EH_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '폐수방류량(㎥/일)',
				dataIndex : 'WW_AMT',
				width: 150,
				filter: {type: 'numeric'}
				//filter: {type: 'numeric'}
			}],
			
			viewConfig: {
				 getRowClass: function(record, rowIndex, rowParams, store) {
					 //bold 13px/15px helvetica,arial,verdana,sans-serif
					 if(record.data.SB_NM == "총계" || record.data.SB_NM == "소계" || record.data.CAT_DID == "소계"
						 || record.data.ADDR == "총계" || record.data.ADDR == "소계"){
						 return 'pdj_total_subTotal';						 
					 }
				}
			}
		}]
	}]
});