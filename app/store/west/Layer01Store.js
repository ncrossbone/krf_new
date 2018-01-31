Ext.define('krf_new.store.west.Layer01Store', {
	
	extend: 'Ext.data.TreeStore',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'resources/data/west/Layer01Data.json',
		reader: {
			type: 'json'
		}
	},
	
	constructor: function(){
		this.callParent();
	},
	
	listeners: {
	}
});
