Ext.define('krf_new.view.center.drone.LegendPhy', {
	
	extend: 'Ext.window.Window',
	id: 'phyLegend',
	xtype: 'legendphy-panel',
	
	height: 54,
	width: 232,
	
	title: '피코시아닌 범례',
	header: false,
	
	layout: {
		type: 'absolute'
	},
	
	cls: 'khLee-window-panel-header-expand',
	style: 'border-width: 0px !important; background: #fff !important;',
	
	items: [{
		xtype: 'image',
		id: 'LegendPhyimgLegend',
		src: './resources/images/drone/legend/standard02.png',
		style: 'border:0px;',
		height: 54,
		width: 232
	}]
});