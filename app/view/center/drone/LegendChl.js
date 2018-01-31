Ext.define('krf_new.view.center.drone.LegendChl', {
	
	extend: 'Ext.window.Window',
	id: 'chlLegend',
	xtype: 'legendchl-panel',
	
	height: 54,
	width: 232,
	
	title: '클로로필a 범례',
	header: false,
	
	layout: {
		type: 'absolute'
	},
	
	cls: 'khLee-window-panel-header-expand',
	style: 'border-width: 0px !important; background: #fff !important;',
	
	items: [{
		xtype: 'image',
		id: 'LegendChlimgLegend',
		src: './resources/images/drone/legend/standard01.png',
		style: 'border:0px;',
		height: 54,
		width: 232
	}]
});