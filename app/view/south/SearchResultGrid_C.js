Ext.define('krf_new.view.south.SearchResultGrid_C', {
	
	extend: 'Ext.container.Container',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_C',
	
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
				layerId : 'C',
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
					text      : '측정소코드',
					dataIndex : 'PT_NO',
					hidden: true,
					hideable: false, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text      : '지점명',
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
				}, {
					text      : '체취년도',
					dataIndex : 'WMYR',
					width: 110,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, { 
					text      : '반기',
					dataIndex : 'WMWK',
					width: 70,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, { 
					text      : '채취월',
					dataIndex : 'WMOM',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{ 
					text      : '채취일',
					dataIndex : 'WMOD',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '재취시간',
					dataIndex : 'WMCTM',
					hidden: true,
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '오염단계',
					dataIndex : 'POLL_STEP',
					hidden: true,
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, {
					text : '최고수심',
					columns: [{
						text     : '측정값(m)',
						dataIndex: 'CURR_DOW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DOW',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOW'));
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
					text : '표층-측정 수심(m)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DOW_SURF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOW_SURF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DOW_SURF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOW_SURF'));
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
					text : '표층-수온(℃)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TEMP_SURF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TEMP_SURF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TEMP_SURF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TEMP_SURF'));
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
					text : '표층-DO',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DO_SURF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DO_SURF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DO_SURF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DO_SURF'));
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
					text : '표층-ph',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PH_SURF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PH_SURF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PH_SURF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PH_SURF'));
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
					text : '표층-전기전도도',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_EC_SURF',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'EC_SURF'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_EC_SURF',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'EC_SURF'));
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
					text : '저층-수심',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DOW_LOW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOW_LOW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DOW_LOW',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOW_LOW'));
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
					text : '저층-수온',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TEMP_LOW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TEMP_LOW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TEMP_LOW',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TEMP_LOW'));
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
					text : '저층-DO',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DO_LOW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DO_LOW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DO_LOW',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DO_LOW'));
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
					text : '저층-ph',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PH_LOW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PH_LOW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PH_LOW',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PH_LOW'));
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
					text : '저층-전기전도도',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_EC_LOW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'EC_LOW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_EC_LOW',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (25℃ μS/㎝)</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'EC_LOW'));
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
					text : '투명도',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TRANSPARENCY',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TRANSPARENCY'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TRANSPARENCY',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (m)</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TRANSPARENCY'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				},{

					text : '입도-모래(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FSD',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FSD'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FSD',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FSD'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 110.0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '입도-실트(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FST',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FST'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FST',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FST'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 49.5,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '입도-점토(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FCL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FCL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FCL',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FCL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 5.5,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '함수율(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_WTC',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'WTC'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_WTC',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'WTC'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 33.0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '완전연소가능량(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PCA',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PCA'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PCA',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PCA'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 4.7,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : '완전연소 가능량 등급',
					hidden: true,
					dataIndex : 'PCA_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'COD(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_COD',
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
							chartRangeMax: 0.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'TOC(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TOC',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOC'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TOC',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOC'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 1.1,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'T-N(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TN',
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
							chartRangeMax: 1430.0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'T-N 등급',
					hidden: true,
					dataIndex : 'TN_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, {

					text : 'T-P(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TP',
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
							chartRangeMax: 790.0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'T-P 등급',
					hidden: true,
					dataIndex : 'TP_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, {

					text : 'SRP(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_SRP',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SRP'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_SRP',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SRP'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 7.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Pb(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PB',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PB'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PB',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PB'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 41.0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'Pb 등급',
					hidden: true,
					dataIndex : 'TP_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'Zn(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ZN',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ZN'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ZN',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ZN'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 146.3,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'Zn 등급',
					hidden: true,
					dataIndex : 'TP_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'Cu(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CU',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CU'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CU',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CU'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 35.2,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'Cu 등급',
					hidden: true,
					dataIndex : 'CU_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'Cr(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CR',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CR'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CR',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CR'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 82.5,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'Cr 등급',
					hidden: true,
					dataIndex : 'CR_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'Ni(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_NI',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NI'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_NI',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NI'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 33.0,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'Ni 등급',
					hidden: true,
					dataIndex : 'NI_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'As(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_AS',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AS'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_AS',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AS'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 10.7,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'As 등급',
					hidden: true,
					dataIndex : 'AS_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'Cd(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CD',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CD'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CD',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CD'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0.4,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'Cd 등급',
					hidden: true,
					dataIndex : 'CD_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'Hg(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_HG',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HG'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_HG',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HG'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0.1,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, { 
					text      : 'HG 등급',
					hidden: true,
					dataIndex : 'Hg_CLASS',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{

					text : 'Al(%)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_AL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_AL',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 10.5,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Li(㎎/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_LI',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'LI'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_LI',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'LI'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Chlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Dichlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_2_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'2_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_2_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'2_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Trichlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_3_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'3_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_3_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'3_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Tetrachlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_4_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'4_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_4_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'4_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Pentachlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_5_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'5_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_5_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'5_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Hexachlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_6_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'6_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_6_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'6_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Heptachlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_7_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'7_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_7_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'7_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Octachlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_8_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'8_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_8_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'8_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Nonachlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_9_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'9_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_9_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'9_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Decachlorobiphenyl(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_10_CL_2_PHENYL',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'10_CL_2_PHENYL'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_10_CL_2_PHENYL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'10_CL_2_PHENYL'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Total PCBs(㎍/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TOT_PCBS',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOT_PCBS'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TOT_PCBS',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOT_PCBS'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Naphthalene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_NAPTHALENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NAPTHALENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_NAPTHALENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NAPTHALENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Acenaphthylene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ACENAPTHALENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ACENAPTHALENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ACENAPTHALENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ACENAPTHALENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Acenaphthene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ACENAPTHENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ACENAPTHENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ACENAPTHENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ACENAPTHENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Fluorene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FLUORENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FLUORENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FLUORENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FLUORENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Phenanthrene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PHENANTHRENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PHENANTHRENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PHENANTHRENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PHENANTHRENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Anthracene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ANTHRACENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ANTHRACENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ANTHRACENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ANTHRACENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Fluoranthene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FLUORANTHENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FLUORANTHENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FLUORANTHENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FLUORANTHENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Pyrene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PYRENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PYRENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PYRENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PYRENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Benzo[a]anthracene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BENZO_A_ANTHRACENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_A_ANTHRACENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BENZO_A_ANTHRACENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_A_ANTHRACENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Chrysene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CRYSENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CRYSENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CRYSENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CRYSENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Benzo[b]fluoranthene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BENZO_B_FLUORANTHENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_B_FLUORANTHENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BENZO_B_FLUORANTHENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_B_FLUORANTHENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Benzo[k]fluoranthene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BENZO_F_FLUORANTHENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_F_FLUORANTHENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BENZO_F_FLUORANTHENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_F_FLUORANTHENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Benzo[a]pyrene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BENZO_A_PYRENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_A_PYRENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BENZO_A_PYRENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_A_PYRENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Indeno[1,2,3-cd]pyrene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_INDENO_1_2_3_CD_PYRENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'INDENO_1_2_3_CD_PYRENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_INDENO_1_2_3_CD_PYRENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'INDENO_1_2_3_CD_PYRENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Dibenzo[a,h]anthracene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DIBENZO_A_H_ANTHRACENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DIBENZO_A_H_ANTHRACENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DIBENZO_A_H_ANTHRACENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DIBENZO_A_H_ANTHRACENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Benzo[g,h,i]perylene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BENZO_G_H_I_PERYLENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_G_H_I_PERYLENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BENZO_G_H_I_PERYLENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZO_G_H_I_PERYLENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Total PAHs(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TOTAL_PAHS',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOTAL_PAHS'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TOTAL_PAHS',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOTAL_PAHS'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : "o,p'-DDE(㎍/㎏)",
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_O_P_DDE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'O_P_DDE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_O_P_DDE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'O_P_DDE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : "p,p'-DDE(㎍/㎏)",
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_P_P_DDE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'P_P_DDE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_P_P_DDE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'P_P_DDE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : "o,p'-DDD(㎍/㎏)",
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_P_P_DDD',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'P_P_DDD'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_P_P_DDD',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'P_P_DDD'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : "o,p'-DDT(㎍/㎏)",
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_O_P_DDT',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'O_P_DDT'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_O_P_DDT',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'O_P_DDT'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : "p,p'-DDT(㎍/㎏)",
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_P_P_DDT',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'P_P_DDT'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_P_P_DDT',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'P_P_DDT'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Total DDTs(㎍/㎏)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TOTAL_DDT',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOTAL_DDT'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TOTAL_DDT',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOTAL_DDT'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '1,1,1-Trichloroethane(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_1_1_1_TRICHLOROETHANE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'1_1_1_TRICHLOROETHANE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_1_1_1_TRICHLOROETHANE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'1_1_1_TRICHLOROETHANE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : '1,2-Dichloroethane(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_1_2_DICHLOROETHANE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'1_2_DICHLOROETHANE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_1_2_DICHLOROETHANE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'1_2_DICHLOROETHANE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Benzene(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BENZENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BENZENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Carbon tetrachloride(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CARBON_TETRA_CHLORIDE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CARBON_TETRA_CHLORIDE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CARBON_TETRA_CHLORIDE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CARBON_TETRA_CHLORIDE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Chloroform(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CHLOROFORM',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CHLOROFORM'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CHLOROFORM',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CHLOROFORM'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Ethylbenzene(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ETHYL_BENZENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ETHYL_BENZENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ETHYL_BENZENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ETHYL_BENZENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Methyl Chloride(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_METHYL_CHLORIDE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'METHYL_CHLORIDE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_METHYL_CHLORIDE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'METHYL_CHLORIDE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Tetrachloroethylene(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TETRA_CHLORO_ETHYLENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TETRA_CHLORO_ETHYLENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TETRA_CHLORO_ETHYLENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TETRA_CHLORO_ETHYLENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Trichloroethylene(㎍/㎏)',

					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TRI_CHLORO_ETHYLENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TRI_CHLORO_ETHYLENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TRI_CHLORO_ETHYLENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TRI_CHLORO_ETHYLENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'Toluene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TOLUENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOLUENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TOLUENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOLUENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'm,p-Xylene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_M_P_XYLENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'M_P_XYLENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_M_P_XYLENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'M_P_XYLENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				},{

					text : 'o-Xylene(㎍/㎏)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_O_XYLENE',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'O_XYLENE'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_O_XYLENE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} (㎍/㎏) </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'O_XYLENE'));
							            return yVal;
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 63.8,
							chartRangeMin: 0,
							spotRadius: 1,
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				
				}, {
					text      : '조사기관',
					dataIndex : 'CODE_CTN',
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