Ext.define('krf_new.view.south.SearchResultGrid', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',

	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer',
	height: '100%',
	width: '100%',
	
	gridId:null,
	
	initComponent: function(){
		this.items = [{
			xtype: 'container',
			id: 'grid-container_'+this.gridId,
			width: '100%',
			height: '100%',
			items: [{
				xtype: 'grid',
				layerId : "A",
				plugins: ['bufferedrenderer', 'gridfilters'],
				cls: 'khLee-x-column-header-text',
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
					text      : '측정소코드',
					dataIndex : 'PT_NO',
					hidden: true,
					hideable: false, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text      : '측정소명',
					dataIndex : 'PT_NM',
					width: 100,
					//filterable: true,
					//filter: {type: 'string'},
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
					text      : '년도',
					dataIndex : 'WMYR',
					width: 50,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, { 
					text      : '월',
					dataIndex : 'WMOD',
					width: 50,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, { 
					text      : '측정일자',
					dataIndex : 'WMCYMD',
					width: 90,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{ 
					text      : '회차',
					dataIndex : 'WMWK',
					width: 90,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{ 
					text      : '수심',
					dataIndex : 'WMDEP',
					//hidden: true,
					//hideable: false, // filter Columns영역에 보이지 않기
					width: 90,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text: '레이어코드',
					dataIndex: 'parentId',
					hidden: true,
					hideable: true, // filter Columns영역에 보이지 않기
					width: 0
				}, {
					text : 'BOD (㎎/L)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BOD',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BOD'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_BOD',
						//data: [4, 3, 4, 6, 2],
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(  //'<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BOD'));
								        	return yVal + " ㎎/L";
							        	}
							        	
							        }
							    }
							    
							),
							//tipTpl: '{x:text("00000년00월00일")}: {y:number("0.00")}',
							chartRangeMax: 5.8,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
							
						}
					}]
				}, {
					text : 'DO (㎎/L)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DO',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOC'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DO',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DOC'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 15.5,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'COD (㎎/L)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_COD',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COD'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COD'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 11.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'T-N (㎎/L)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TN',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TN'));
							}
						},
						filter: 'number'
					}, {
						text: '추이변화',
						dataIndex: 'CHART_TN',
						width: 80,
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TN'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.628,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'T-P (㎎/L)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TP',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TP'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TP'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 0.237,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '수온 (℃)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TEMP',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TEMP'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TEMP',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TEMP'));
								        	return yVal + " ℃";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 28.8,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'pH',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PH',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PH'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PH',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PH'));
								        	return yVal;
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 9.5,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'SS (㎎/L)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_SS',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SS'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'SS'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							renderer: function(value){
								//console.info(value);
							},
							chartRangeMax: 27.7,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '클로로필a (㎎/㎥)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CLOA',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{	
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CLOA'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CLOA',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]} </p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CLOA'));
								        	return yVal + " ㎎/㎥";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 30.4,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'TOC (㎎/L)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TOC',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOC'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TOC'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '유량 (㎥/s)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_AMNT',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMNT'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_AMNT',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AMNT'));
								        	return yVal + " ㎥/s";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'DTN (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DTN',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DNT'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DTN',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DNT'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'NO₃-N (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_NO3N',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NO3N'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_NO3N',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NO3N'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'NH₃-N (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_NH3N',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NH3N'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_NH3N',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NH3N'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'DTP (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DTP',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DTP'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DTP',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DTP'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'PO₄-P (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_POP',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'POP'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_POP',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'POP'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '투명도 (m)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TRANS',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{	
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TRANS'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TRANS',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TRANS'));
								        	return yVal + " m";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '조류 (개체수/㎖)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ALGOL',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ALGOL'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ALGOL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ALGOL'));
								        	return yVal + " 개체수/㎖";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '총대장균군수 (총대장균군수/100㎖)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TCOLI',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TCOLI'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TCOLI',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TCOLI'));
								        	return yVal + " 총대장균군수/100㎖";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '분원성대장균군수 (분원성대장균군수/100㎖)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ECOLI',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ECOLI'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ECOLI',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ECOLI'));
								        	return yVal + " 분원성대장균군수/100㎖";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '안티몬 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ANTIMON',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ANTIMON'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ANTIMON',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ANTIMON'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'phenol (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PHENOL',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PHENOL'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PHENOL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PHENOL'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '색도(도)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_COL',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COL'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_COL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'COL'));
								        	return yVal + " 도";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'N-H (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_NHEX',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NHEX'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_NHEX',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'NHEX'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Fe (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FE',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FE'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FE'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Mn (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_MN',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'MN'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_MN',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'MN'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Cd (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CD',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CD'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CD'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'CN (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CN',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CN'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CN',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CN'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Pb (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PB',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PB'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PB'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Cr6+ (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CR6',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CR6'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CR6',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CR6'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Cr (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CR',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CR'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CR'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'As (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_AS',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AS'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'AS'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Hg (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_HG',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HG'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HG'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Cu (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CU',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CU'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CU'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'Zn (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ZN',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ZN'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ZN'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'F (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FL',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FL'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FL'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'ABS (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_ABS',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ABS'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_ABS',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'ABS'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'cl- (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CL',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CL'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CL',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CL'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'TCE (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TCE',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TCE'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TCE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TCE'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'PCE (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PCE',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PCE'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PCE',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PCE'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '사염화탄소 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CCL4',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CCL4'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CCL4',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CCL4'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '1,2-디클로로에탄 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DCETH',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DCETH'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DCETH',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DCETH'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '디클로로메탄 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DCM',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{	
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DCM'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DCM',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DCM'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '벤젠 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_BENZENE',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZENE'));
							}
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
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'BENZENE'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '클로로포름 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_CHCL3',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CHCL3'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_CHCL3',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'CHCL3'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '유기인 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_OP',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'OP'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_OP',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'OP'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'PCB (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PCB',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PCB'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PCB',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PCB'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'DEHP (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DEHP',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DEHP'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DEHP',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DEHP'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'DIOX (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_DIOX',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DIOX'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_DIOX',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'DIOX'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : '포름알데히드 (㎎/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_HCHO',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HCHO'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_HCHO',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HCHO'));
								        	return yVal + " ㎎/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}, {
					text : 'HCB (㎍/L)',
					hidden: true,
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_HCB',
						width: 105,
						renderer: function(value){
							if(value == 999999999){
								return "정량한계미만";
							}
							else if(value == 888888888){
								return "";
							}
							else{
								return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HCHO'));
							}
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_HCB',
						xtype: 'widgetcolumn',
						widget: {
							xtype: 'sparklineline',
							tipTpl: new Ext.XTemplate(
							    '<tpl for=".">',
							        '<p>측정일자 : {[this.formatX(values.x)]}</p>',
							        '<p>측 정 값 : {[this.formatY(values.y)]}</p>',
							    '</tpl>',
							    {
							    	formatX: $KRF_APP.global.CommFn.dateFormatter,
							        formatY: function(yVal){
							        	if(yVal == null){
							        		return yVal = "";
							        	}else{
							        		yVal = Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HCHO'));
								        	return yVal + " ㎍/L";
							        	}
							        }
							    }
							),
							//tipTpl: 'Value: {y:number("0.00")}',
							chartRangeMax: 6.2,
							chartRangeMin: 0,
							spotRadius: 1,
							tooltipSkipNull : false,  // false : null 포함
							valueSpots: {'-100:': 'red'} // 포인트 간격 ('0:' 0이상인 포인트 찍기)
						}
					}]
				}
				]
			}]
		}];
		this.callParent();
		// 검색조건 컨트롤 초기화
		
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});