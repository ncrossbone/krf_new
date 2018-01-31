Ext.define('krf_new.view.east.SiteInfoPanel', {
	extend : 'Ext.panel.Panel',
	
	xtype : 'east-siteinfopanel',
	
	id: 'siteInfoPanel',
	
	title: '지점 정보',
	header: false,
	
	layout: {
		type: 'fit'
	},
		
	//bodyStyle: 'background-color: white;',
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	width: 450,
	height: 300,

	items: [{
		xtype: 'grid',
		id: 'siteinfotest',
		plugins: 'gridfilters',
		cls: 'khLee-x-column-header-text',
		height: 215,
		header: {
		height: 5
		},
		filter: {
	            value:1,    // 0 is false, 1 is true
	            active:true // turn on the filter
	        },
		title: '검색결과',
		header: false,
		//store: 'KRF_DEV.store.east.SiteInfoPanel',
		//store: Ext.create('KRF_DEV.store.east.SiteInfoPanel'),
		columns: [{
			text      : '구분',
			dataIndex : 'column',
			menuDisabled: true,
			//width: 150
			width: "40%"
		}, {
			text      : '내용',
			dataIndex : 'cont',
			menuDisabled: true,
			//width: 240
			width: "60%"
		}]
	}],
	initComponent: function(){
		this.callParent();
		
	}
	
});