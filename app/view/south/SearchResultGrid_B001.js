Ext.define('krf_new.view.south.SearchResultGrid_B001', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'south-grid-searchresult',
	
	id: 'searchResultContainer_B001',
	
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
					dataIndex : 'RIVER_ID',
					width: 100,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, {
					text      : '측정소명',
					dataIndex : 'SITE_NAME',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '측정일시',
					dataIndex : 'MSR_DATE',
					width: 70,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '수온(℃)',
					dataIndex : 'F02',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{ 
					text      : '수소이온농도',
					dataIndex : 'F03',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '전기전도도(μS/cm)',
					dataIndex : 'F04',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '용존산소(mg/L)',
					dataIndex : 'F05',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}, { 
					text      : '총유기탄소(mg/L)',
					dataIndex : 'F06',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text : '탁도',
					dataIndex : 'F05',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text : '총질소(mg/L)',
					dataIndex : 'F27',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text : '총인(mg/L)',
					dataIndex : 'F28',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '암모니아성질소(mg/L)',
					dataIndex : 'F36',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '질산성질소(mg/L)',
					dataIndex : 'F37',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '인산염인(mg/L)',
					dataIndex : 'F35',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '클로로필-a(mg/㎥)',
					dataIndex : 'F29',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '벤젠(μg/L)',
					dataIndex : 'F14',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '톨루엔(μg/L)',
					dataIndex : 'F17',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '에틸벤젠(μg/L)',
					dataIndex : 'F19',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '자일렌',
					dataIndex : 'F56',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : 'm,p-자일렌(μg/L)',
					dataIndex : 'F20',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : 'o-자일렌(μg/L)',
					dataIndex : 'F21',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '염화메틸렌(μg/L)',
					dataIndex : 'F22',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '1.1.1-트리클로로에테인(μg/L)',
					dataIndex : 'F23',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '사염화탄소(μg/L)',
					dataIndex : 'F24',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '트리클로로에틸렌(μg/L)',
					dataIndex : 'F25',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '테트라클로로에틸렌(μg/L)',
					dataIndex : 'F26',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '카드뮴(mg/L)',
					dataIndex : 'F74',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '납(mg/L)',
					dataIndex : 'F75',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '구리(mg/L)',
					dataIndex : 'F76',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '아연(mg/L)',
					dataIndex : 'F77',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '페놀(mg/L)',
					dataIndex : 'F06',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '임펄스(pulse)',
					dataIndex : 'F07',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '염화메틸렌(μg/L)',
					dataIndex : 'F12',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '1.1.1-트리클로로에테인(μg/L)',
					dataIndex : 'F13',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '사염화탄소(μg/L)',
					dataIndex : 'F15',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '트리클로로에틸렌(μg/L)',
					dataIndex : 'F16',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '테트라클로로에틸렌(μg/L)',
					dataIndex : 'F18',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '임펄스(우)(pulse)',
					dataIndex : 'F31',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '임펄스(좌)(pulse)',
					dataIndex : 'F32',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '독성지수(좌)',
					dataIndex : 'F57',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '유영속도(좌)',
					dataIndex : 'F58',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '개체수(좌)',
					dataIndex : 'F59',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '독성지수(우)',
					dataIndex : 'F63',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '유영속도(우)',
					dataIndex : 'F64',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '개체수(우)',
					dataIndex : 'F65',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '미생물 독성지수',
					dataIndex : 'F84',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '조류 독성지수',
					dataIndex : 'F87',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '독성도',
					dataIndex : 'F105',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '전기전도도 R1',
					dataIndex : 'F106',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '전기전도도 R2',
					dataIndex : 'F107',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '전기전도도 R3',
					dataIndex : 'F108',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				},{
					text      : '전기전도도 유입수',
					dataIndex : 'F109',
					width: 110,
					filter: {type: 'string', itemDefaults: {emptyText: 'Search for...'}}
				}]
			}]
		}];
		
		this.callParent();
		
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("수질자동측정망", this.down("grid"));
	}
});