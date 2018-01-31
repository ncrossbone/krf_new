Ext.define('krf_new.view.south.SearchResultGrid_D_3', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_D_3',
	
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
				layerId : 'D003',
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
					text : '유량(CMS)',
					columns: [{
						text     : '측정값',
						dataIndex: 'CURR_FW',
						width: 100,
						renderer: function(value){
							return Ext.util.Format.number(value, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FW'));
						},
						filter: {type: 'numeric'/*, fields: {}*/}
					}, {
						text: '추이변화',
						width: 80,
						dataIndex: 'CHART_FW',
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
							        	yVal = Ext.util.Format.number(yVal, $KRF_APP.global.AttrFn.getAttrFormat(this.config.layerId,'FW'));
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