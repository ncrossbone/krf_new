Ext.define('krf_new.view.south.pollution.SearchResultGrid_pollution_04', {
	
	extend: 'Ext.container.Container',
	
	xtype: 'searchResultGrid_pollution_04',
	
	id: 'searchResultpollution_04_container',
	
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
					////console.info(parentCtl);
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
//						console.info(value);
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
				text      : '개별처리시설유형',
				dataIndex : 'TP_TYPE',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '토지이용면적 합계(㎡)',
				dataIndex : 'AREA_SUM',
				width: 150,
				filter: {type: 'numeric'}
				//filter: {type: 'numeric'}
			},{	 
				text      : '전 면적(㎡)',
				dataIndex : 'AREA_RICE',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '답 면적(㎡)',
				dataIndex : 'AREA_FIELD',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '과수원 면적(㎡)',
				dataIndex : 'AREA_FLUIT',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '목장용지 면적(㎡)',
				dataIndex : 'AREA_STOCKFARM',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '임야 면적(㎡)',
				dataIndex : 'AREA_FOREST',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '광천지 면적(㎡)',
				dataIndex : 'AREA_SPA',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '염전 면적(㎡)',
				dataIndex : 'AREA_SALTFIELD',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '대지 면적(㎡)',
				dataIndex : 'AREA_PLATEAU',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '공장용지 면적(㎡)',
				dataIndex : 'AREA_FACTORY',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '학교용지 면적(㎡)',
				dataIndex : 'AREA_EDUCATION',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '주차장 면적(㎡)',
				dataIndex : 'AREA_PARKING',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '주유소용지 면적(㎡)',
				dataIndex : 'AREA_OILING',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '창고용지 면적(㎡)',
				dataIndex : 'AREA_WAREHOUSE',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '도로 면적(㎡)',
				dataIndex : 'AREA_ROAD',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '철도용지 면적(㎡)',
				dataIndex : 'AREA_RAILROAD',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '하천 면적(㎡)',
				dataIndex : 'AREA_RIVER',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '제방 면적(㎡)',
				dataIndex : 'AREA_EMBANKMENT',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '구거 면적(㎡)',
				dataIndex : 'AREA_WATERROAD',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '유지 면적(㎡)',
				dataIndex : 'AREA_WATERRANGE',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '양어장 면적(㎡)',
				dataIndex : 'AREA_FISHFARM',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '수도용지 면적(㎡)',
				dataIndex : 'AREA_WATER',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '공원 면적(㎡)',
				dataIndex : 'AREA_PARK',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '체육용지 면적(㎡)',
				dataIndex : 'AREA_HEALTH',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '유원지 면적(㎡)',
				dataIndex : 'AREA_AMUSEMENTPARK',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '종교용지 면적(㎡)',
				dataIndex : 'AREA_RELIGION',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '사적지 면적(㎡)',
				dataIndex : 'AREA_HISTORICAL',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '묘지 면적(㎡)',
				dataIndex : 'AREA_GRAVEYARD',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '잡종지 면적(㎡)',
				dataIndex : 'AREA_MIXED',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '골프장면적(㎡)',
				dataIndex : 'GOLF_RANGE',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
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