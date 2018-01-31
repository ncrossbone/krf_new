Ext.define('krf_new.view.south.pollution.SearchResultGrid_pollution_02', {
	
	extend: 'Ext.container.Container',
	
	xtype: 'searchResultGrid_pollution_02',
	
	id: 'searchResultpollution_02_container',
	
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
				text      : '업주명',
				dataIndex : 'MANAGER',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '축종',
				dataIndex : 'LIVESTOCK_NM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '사육두수',
				dataIndex : 'LIVESTOCK_CNT',
				width: 150,
				filter: {type: 'numeric'}
				//filter: {type: 'numeric'}
			},{	 
				text      : '축사면적(㎡)',
				dataIndex : 'LIVESTOCK_AREA',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '법적규제 여부',
				dataIndex : 'REGS',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '법적규제일',
				dataIndex : 'REGS_DATE',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '방류선',
				columns:[{	 
					text      : '환경기초시설',
					dataIndex : 'DISCHARGE_FACI_NM',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '행정구역코드',
					dataIndex : 'DISCHARGE_ADM_CD',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '하천명',
					dataIndex : 'DISCHARGE_RIVER_NM',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '개별 및 공공처리',
				columns:[{	 
					text      : '처리방법',
					dataIndex : 'INDIV_PURI_METHOD',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리량(톤/일)',
					dataIndex : 'INDIV_PURI_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리비용(천원)',
					dataIndex : 'INDIV_PURI_MONEY',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '퇴비화',
				columns:[{	 
					text      : '처리공법',
					dataIndex : 'INDIV_COMPOST_METHOD',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리량(톤/일)',
					dataIndex : 'INDIV_COMPOST_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리비용(천원)',
					dataIndex : 'INDIV_COMPOST_MONEY',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '액비화',
				columns:[{	 
					text      : '처리공법',
					dataIndex : 'INDIV_LIQUID_METHOD',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리량(톤/일)',
					dataIndex : 'INDIV_LIQUID_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리비용(천원)',
					dataIndex : 'INDIV_LIQUID_MONEY',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '공공처리',
				columns:[{	 
					text      : '차집유형',
					dataIndex : 'ENTRUST_PUB_COLMETHOD',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '편입일자',
					dataIndex : 'ENTRUST_PUB_DT',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '시설명',
					dataIndex : 'ENTRUST_PUB_FACI_NM',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리량(톤/일)',
					dataIndex : 'ENTRUST_PUB_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리비용(천원)',
					dataIndex : 'ENTRUST_PUB_MONEY',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '재활용',
				columns:[{	 
					text      : '처리량(톤/일)',
					dataIndex : 'ENTRUST_REUSE_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리비용(천원)',
					dataIndex : 'ENTRUST_REUSE_MONEY',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '해양배출',
				columns:[{	 
					text      : '처리량(톤/일)',
					dataIndex : 'ENTRUST_SEA_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리비용(천원)',
					dataIndex : 'ENTRUST_SEA_MONEY',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '가출분뇨처리업자',
				columns:[{	 
					text      : '처리량(톤/일)',
					dataIndex : 'ENTRUST',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '기타',
				columns:[{	 
					text      : '처리방법',
					dataIndex : 'ETC_METHOD',
					width: 150,
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리량(톤/일)',
					dataIndex : 'ETC_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				},{	 
					text      : '처리비용(천원)',
					dataIndex : 'ETC_MONEY',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
					//filter: {type: 'numeric'}
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '기타',
				dataIndex : 'ETC',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '무처리량(톤/일)',
				dataIndex : 'NO_TRT_AMT',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '고형축분뇨처리방법',
				dataIndex : 'LEX_METHOD',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '기타축분뇨처리방법',
				dataIndex : 'LEX_METHOD_ETC',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '살포지역용도',
				dataIndex : 'SPRAY_LANDUSE',
				width: 150,
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