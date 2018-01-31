Ext.define('krf_new.view.map.LegendWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'map-legendwindow',
	
	id: 'legendwindow',
	//imgSrc: './resources/images/legend/standard01.png',
	//imgWidth: 209,
	//imgHeight: 275,
	
	header: false,
	title: '범례',
	
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	
	layout: {
		type: 'absolute'
	},

	items: [{
		xtype: 'image',
		initComponent: function(){
			this.callParent();
			this.src = this.up("window").imgSrc;
			this.width = this.up("window").imgWidth;
			this.height = this.up("window").imgHeight;
		}
	}, {
		xtype: 'image',
		width: 10,
		height: 10,
		src: './resources/images/button/btn_close.png',
		style: 'cursor: pointer !important;',
		listeners: {
			el: {
				click: function(a, b, c, d, e, f, g, h, i){
					var closeCtl = Ext.getCmp(b.id);
					closeCtl.up("window").close();
				}
			}
		},
		initComponent: function(){
	    	
			this.callParent();
			
			this.x = this.up("window").imgWidth - 15;
			this.y = 15;
		}
	}]
});