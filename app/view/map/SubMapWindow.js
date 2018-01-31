Ext.define('krf_new.view.map.SubMapWindow', {
	extend : 'Ext.window.Window',
	xtype : 'sub-map-win',
	id: 'subMapWindow',
	title: '소화천',
	constrain: true,
	layout: {
		type: 'fit'
	},
	width: 460,
	height: 330,
	x: 120,
	y: 700,
	listeners: {
	    move: function(theWin,xP,yP,theOp) {
	    },
	    resize: function(win, width, height){
	    },
	    render: function(){
	    },
	    afterrender: function(){
	    },
	    show: function(){
	    	$KRF_APP.subMap.mapRendered();
	    }
	},
	items: [{ xtype: "app-map-coreMap" , id:'_subMapDiv_'}]
});