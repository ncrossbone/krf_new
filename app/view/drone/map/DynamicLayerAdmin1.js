Ext.define('krf_new.view.drone.map.DynamicLayerAdmin1', {
	map:null, 
	layer:null,
	layerAviation:null,
	layerChl:null,
	layerPhyco:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
		
		me.layerAviation = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.MapserviceUrlAviation);
		me.layerAviation.id = "AciationLayer";
		me.layerAviation.visible = true;
		me.map.addLayer(me.layerAviation);
		me.layerAviation.setVisibility(false);
		
		
		me.layerChl = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.MapserviceUrlChlo);
		me.layerChl.id = "Chlorophyll_a";
		me.layerChl.visible = true;
		me.map.addLayer(me.layerChl);
		me.layerChl.setVisibility(false);
		
		
		me.layerPhyco = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.MapserviceUrlPhyco);
		me.layerPhyco.id = "Phycocyanin";
		me.layerPhyco.visible = true;
		me.map.addLayer(me.layerPhyco);
		me.layerPhyco.setVisibility(false);
		

        me.layer = new esri.layers.ArcGISDynamicMapServiceLayer($KRF_DEFINE.MapserviceUrl1);
		me.layer.id = "DynamicLayer3";
		me.layer.visible = true;
		me.map.addLayer(me.layer);
		me.layer.setVisibility(false);
    }
});