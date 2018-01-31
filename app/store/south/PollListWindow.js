Ext.define('krf_new.store.south.PollListWindow', {
		
		extend: 'Ext.data.TreeStore',

		autoLoad: true,

		proxy: {
			type: 'ajax',
			url: 'resources/data/PollListWindow.json',
			reader: {
				type: 'json'
			}
		},
		constructor: function(){
			this.callParent();
		},
		listeners: {
			beforeload: function(store) {
				return;
			}
		}
	}
);
