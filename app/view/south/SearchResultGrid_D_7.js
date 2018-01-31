Ext.define('krf_new.view.south.SearchResultGrid_D_7', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_D_7',
	
	height: '100%',
	width: '100%',
	gridId: null,
	
	initComponent: function(){
		
		this.items = [{
			xtype: 'container',
			id: 'grid-container_'+this.gridId,
			width: '100%',
			height: '100%',
			items: [{
				xtype: 'grid',
				layerId : 'D007',
				//id: 'grdSearchResult',
				//id: this.up('container').up('container'),
				plugins: ['bufferedrenderer', 'gridfilters'],
				cls: 'khLee-x-column-header-text',
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
					text      : '대권역',
					dataIndex : 'WS_NM',
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
					width: 110
				},{
					text      : '중권역',
					dataIndex : 'AM_NM',
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
					width: 110
				},{
					text      : '소권역',
					dataIndex : 'AS_NM',
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
					width: 110
				},{
					text      : '관측소코드',
					dataIndex : 'PT_NO',
					filter: {type: 'numeric'/*, fields: {}*/},
					width: 110
				}, {
					text      : '측정소명',
					dataIndex : 'PT_NM',
					width: 100,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
					listeners: {
						click: function(tblView, el, rowCnt, colCnt, row){
							////console.info(this.findParentByType("grid").parentIds);
							var gridCtl = this.findParentByType("grid")
							var parentIds = gridCtl.parentIds;
							var siteId = row.record.data.PT_NO;
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
				},{
					text      : '관측일자',
					dataIndex : 'WMCYMD',
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}},
					width: 110
				}, {
					text : '보 상류수위(m)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_SWL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SWL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_SWL',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SWL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'0:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '보 하류수위(m)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_OWL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'OWL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_OWL',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'OWL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'0:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '저수량(백만㎥)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_SFW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SFW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_SFW',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SFW'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '공용량(백만㎥)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ECPC',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ECPC'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ECPC',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ECPC'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '유입량(백만㎥)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_INF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'INF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_INF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'INF'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '총 방류량(㎥/sec)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TOTOTF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOTOTF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TOTOTF',
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
							        	yVal = Ext.util.Format.number(global, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOTOTF'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '발전 방류량(㎥/sec)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_EGOTF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'EGOTF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_EGOTF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'EGOTF'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '가동보 방류량(㎥/sec)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_GTOTF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'GTOTF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_GTOTF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'GTOTF'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '고정보 방류량(㎥/sec)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CBOTF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CBOTF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CBOTF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CBOTF'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '어도 방류량(㎥/sec)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FWOTF',
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FWOTF'));
						},
						width: 100,
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FWOTF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FWOTF'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '기타 방류량(㎥/sec)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ETCOTF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ETCOTF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ETCOTF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ETCOTF'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}]
			}]
		}];
		
		
		this.callParent();
		
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("D7", this.down("grid"));
	}
});