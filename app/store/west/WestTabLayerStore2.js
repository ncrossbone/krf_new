Ext.define('krf_new.store.west.WestTabLayerStore2', {
	
	extend: 'Ext.data.TreeStore',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'resources/data/west/WestTabLayerData2.json',
		reader: {
			type: 'json'
		}
	}
});
