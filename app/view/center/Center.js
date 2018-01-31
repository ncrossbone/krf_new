Ext.define('krf_new.view.center.Center', {
	
	extend: 'Ext.panel.Panel',
	
	requires:['krf_new.view.center.CenterController',
			  'krf_new.view.center.ReachNameToolbar'],
	
	
//	title: '&nbsp;&nbsp;<img src="./resources/images/button/icon_home.png" />',
	
	collapsible: false,
	controller: 'center',
	
	cls: 'khLee-x-header',
	xtype: 'app-default-center',
	
	layout: {
		type: 'absolute'
	},
	items: [{xtype: 'app-map-coreMap', x:0, y:0},
//			{xtype: 'center-dronetoolbar', id: 'droneToolbar', style:'z-index: 30000; position: absolute;', x:0, y:0, hidden:true},
//			{xtype: 'center-dronedetailexp', id: 'droneDetailExp', style:'z-index: 30000; position: absolute;', x:0, y:0, hidden:true},
//			{xtype: 'center-reachtoolbar', id: 'reachToolbar', style:'z-index: 30000; position: absolute;', cls : 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target', x:0, y:0, hidden:true},
			{xtype: 'center-reachnametoolbar', id: 'reachNameToolbar', style:'border-style: none !important; background: transparent none !important; border-width: 2px !important; z-index: 30000; position: absolute !important;', x:179, y:112, hidden:true},
			{xtype: 'legendchl-panel', id: 'chlLegend', hidden:true},
			{xtype: 'legendphy-panel', id: 'phyLegend', hidden:true}
			],
	initComponent: function(){
		this.callParent();
		
		var droneToolbar = Ext.create('krf_new.view.center.drone.DroneToolbar', {
    		x: 10,
    		y: 10
    	});
    	this.add(droneToolbar);
        var droneDetailExp = Ext.create('krf_new.view.center.drone.DroneDetailExp', {
        	x: 153
        });
        this.add(droneDetailExp);
        droneDetailExp.hide();
        droneToolbar.hide();
	}
});