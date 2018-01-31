/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.SearchConfigHeader', {

	extend: 'Ext.window.Window',
	id: 'searchConfigHeader',
	cls:'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	width: 100,
	height: 10,
	x: 387,
	y: 170,
	title:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▼",
	//plain: true, // 요게 있어야 background: transparent 먹음..
	header:{
		listeners:{
			el:{
				click:function(){
					Ext.getCmp("searchConfigHeader").setStyle('z-index','30000');
				}
			}
		}
	},
	resizable:false,
	draggable: false,
	closable: false,
	sortable: false,
	style: "border: 0px;"

});