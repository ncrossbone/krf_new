Ext.define('krf_new.view.map.TMLegendWindow', {
	extend : 'Ext.window.Window',
	
	xtype : 'tmlegendwindow',
	id: 'tmLegendWindow',
	title: '범례',
	constrain: true,
	//cls: 'khLee-window-panel-header khLee-x-window-default ',
	//bodyStyle: 'border: 0px;',
//	closable:false,
//	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
//    style:"border:solid 10px #E6E6E6;",
	layout: {
		type: 'fit'
	},
	header:{
        items:[
//        	{
//	            xtype:'image',
//	            src:'./resources/images/button/btn_close.png',
//	            style:'padding-right:13px !important; cursor:pointer;',
//	            listeners:{
//	                el:{
//	                    click:function(){
//	                        Ext.getCmp("tmLegendWindow").hide();
//	                    }
//	                }
//	            }
//	        }
        	]
    },
	width: 230,
	height: 290,
	
	x: 120,
	y: 700,
	
	items: [{
		xtype: "panel",
		border:false,
		id: "tmLegendPanel",
		html: '<div id="tmLegend" style="padding-top: 20px;"></div>'
	}]
});