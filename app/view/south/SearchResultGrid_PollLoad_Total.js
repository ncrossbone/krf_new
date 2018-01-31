Ext.define('krf_new.view.south.SearchResultGrid_PollLoad_Total', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
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
				text      : '대권역',
				dataIndex : '',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '중권역',
				dataIndex : '',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '표준유역',
				dataIndex : '',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '구분',
				dataIndex : '',
				width: 150
				//filter: {type: 'numeric'}
			},{
				text : '발생',
				columns: [{
					text     : 'BOD',
					dataIndex: '',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TN',
					dataIndex: '',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TP',
					dataIndex: '',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}]
			
				
			},{
				text : '배출',
				columns: [{
					text     : 'BOD',
					dataIndex: '',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TN',
					dataIndex: '',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}, {
					text     : 'TP',
					dataIndex: '',
					width: 100,
					filter: {type: 'numeric'/*, fields: {}*/}
				}]
			}]
		}]
	}],
	initComponent: function(){
		
		this.callParent();
		
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});