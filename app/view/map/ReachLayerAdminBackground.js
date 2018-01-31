Ext.define('krf_new.view.map.ReachLayerAdminBackground', {
	map:null, 
	layer:null,
	dynamicLayer1: null,
	
	constructor: function(map) {
		
        var me = this;
        me.map = map;
        
        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.dimServiceUrl, {
        	"opacity": 0.4
        });
        
        me.layer.id = "ReachLayerAdminBackground"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
        me.layer.visible = false;
		me.map.addLayer(me.layer);
    }
});