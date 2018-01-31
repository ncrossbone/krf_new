Ext.define('krf_new.view.south.SearchResultWindow', {
	
	extend : 'Ext.window.Window',
	//xtype : 'common-windowcontrol',
	width: 300,
	height: 300,
	//renderTo: Ext.getBody(),
	
	items: [{
		xtype: 'tabpanel',
		header: false,
		activeTab: 0,
		title: 'dfa',
		items: [{
			id: 'tab1',
			title: 'tab1',
			items: [{
				xtype: 'grid',
				title: 'girdtest'
			}, {
				xtype: 'grid',
				title: 'ddd'
			}]
		}]
	}]
		
});