Ext.define('krf_new.view.south.SearchResultGrid_D_5', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_D_5',
	
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
				layerId : 'D005',
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
					text : '풍향(m/s)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_WD',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'WD'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_WD',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'WD'));
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
					text : '풍속(m/s)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_WS',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'WS'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_WS',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'WS'));
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
					text : '기온',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_TA',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TA'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_TA',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'TA'));
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
					text : '습도',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_HM',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HM'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_HM',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'HM'));
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
					text : '현지기압',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PA',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PA'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PA',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PA'));
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
					text : '해면기압',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_PS',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PS'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_PS',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'PS'));
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
					text : '강수감지',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_RNYN',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'RNYN'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_RNYN',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'RNYN'));
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
					text : '강수량(mm)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_RN1HR',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'RN1HR'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_RN1HR',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'RN1HR'));
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
					text : '누적강수량(mm)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_RNDAY',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'RNDAY'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_RNDAY',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'RNDAY'));
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
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});