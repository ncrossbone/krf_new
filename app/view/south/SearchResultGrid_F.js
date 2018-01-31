Ext.define('krf_new.view.south.SearchResultGrid_F', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_F',
	
	height: '100%',
	width: '100%',
	gridId:null,
	
	initComponent: function(){
		this.items =  [{
			xtype: 'container',
			id: 'grid-container_'+this.gridId,
			width: '100%',
			height: '100%',
			items: [{
				xtype: 'grid',
				layerId : 'F',
				//id: 'grdSearchResult_F',
				//id: this.up('container').up('container'),
				plugins: ['bufferedrenderer', 'gridfilters'],
				cls: 'khLee-x-column-header-text',
				//id : 'ResultGrid_F',
				height: 215,
				loadMask: true,
				//plugins: 'bufferedrenderer',
				siteIds: "",
				parentIds: [],
				//height: '100%',
				header: {
					height: 5
				},
				title: '검색결과',
				siteId: '',
				//store: 'KRF_DEV.store.south.SearchResultGrid',
				//store: Ext.create('KRF_DEV.store.south.SearchResultGrid'),
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
					text      : '측정소코드',
					dataIndex : 'FACI_CD',
					hidden: true,
					hideable: false, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text      : '측정소명',
					dataIndex : 'FACI_NM',
					width: 100,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
					listeners: {
						click: function(tblView, el, rowCnt, colCnt, row){
							////console.info(this.findParentByType("grid").parentIds);
							var gridCtl = this.findParentByType("grid")
							var parentIds = gridCtl.parentIds;
							var siteId = row.record.data.FACI_CD;
							var parentId = "";
							
							for(var i = 0; i < parentIds.length; i++){
								if(siteId == parentIds[i].siteId){
									parentId = parentIds[i].parentId;
								}
							}
							
							if(parentId == ""){
								siteMovePoint(parentIds, siteId);
							}else{
								siteMovePoint(parentId, siteId);
							}
							
						}
					}
				}, {
					text      : '운영일자',
					dataIndex : 'WORK_DT_VAL',
					width: 110,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, { 
					text      : '관거번호',
					dataIndex : 'PIPE_NUM',
					hidden : true,
					width: 90,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, { 
					text      : '관거유형',
					dataIndex : 'PIPE_TYPE',
					hidden : true,
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{ 
					text      : '유입원',
					dataIndex : 'IN_PL_TYPE',
					hidden : true,
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '방류구분번호',
					dataIndex : 'DISCHARGE_NUM',
					hidden : true,
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, {
					text : '방류량_물리적(㎥/일)',
					columns: [{
						text     : '측정값',
						dataIndex: 'DISCHARGE_AMT_PHYS_VAL',
						hidden : true,
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT_PHYS'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DISCHARGE_AMT_PHYS',
						hidden : true,
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT_PHYS'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '방류량_생물학적(㎥/일)',
					columns: [{
						text     : '측정값',
						dataIndex: 'DISCHARGE_AMT_BIO_VAL',
						hidden : true,
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT_BIO'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DISCHARGE_AMT_BIO',
						hidden : true,
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT_BIO'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '방류량_고도(㎥/일)',
					columns: [{
						text     : '측정값',
						dataIndex: 'DISCHARGE_AMT_HIGHTEC_VAL',
						hidden : true,
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT_HIGHTEC'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DISCHARGE_AMT_HIGHTEC',
						hidden : true,
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT_HIGHTEC'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '유량(㎥/일)',
					columns: [{
						text     : '측정값',
						dataIndex: 'AMT_VAL',
						hidden : true,
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_AMT',
						hidden : true,
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMT'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'BOD(㎎/ℓ)',
					columns: [{
						text     : '측정값',
						dataIndex: 'BOD_VAL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BOD'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BOD',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BOD'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				},{

					text : 'COD(㎎/ℓ)',
					columns: [{
						text     : '측정값',
						dataIndex: 'COD_VAL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COD'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_COD',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COD'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'SS(㎎/ℓ)',
					columns: [{
						text     : '측정값',
						dataIndex: 'SS_VAL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SS'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_SS',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SS'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'TN(㎎/ℓ)',
					columns: [{
						text     : '측정값',
						dataIndex: 'TN_VAL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TN'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TN',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TN'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'TP(㎎/ℓ)',
					columns: [{
						text     : '측정값',
						dataIndex: 'TP_VAL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TP'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TP',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TP'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '대장균군수(총대장균군수)',
					columns: [{
						text     : '측정값',
						dataIndex: 'COLI_VAL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COLI'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_COLI',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COLI'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '미처리배제유량(㎥/일)',
					columns: [{
						text     : '측정값',
						dataIndex: 'BYPASS_AMT_VAL',
						hidden : true,
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BYPASSAMT'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BYPASS_AMT',
						hidden : true,
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} ㎎/L</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BYPASSAMT'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, {
					text      : '연계처리시설명',
					dataIndex : 'CONNECT_FACI_NM',
					hidden : true,
					width: 110,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text      : '방류수소독방법',
					dataIndex : 'DISCHARGE_DISINFECT',
					hidden : true,
					width: 110,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text      : '연계처리시설명',
					dataIndex : 'DISCHARGE_FACI_NM',
					hidden : true,
					width: 110,
					filter: {type: 'numeric'/*, fields: {}*/}
				}]
			}]
		}];
		this.callParent();
		
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});