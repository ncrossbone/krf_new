/**
* North Controller
*/
Ext.define('krf_new.view.east.ChartPanelDateController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.chartPanelDateController',
	
	control: {
		'#f_Chart': {
			change: 'onComboGubunChange'
		}
	},
	
	onComboGubunChange: function() {
		//alert("dd");
		var itemCtl = Ext.getCmp("selectItem");															
		var f_Chart = Ext.getCmp("f_Chart");
		if(f_Chart.lastValue == "1"){
			
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'AMT_PHYS', name: '방류량_물리적'}
				,{id: 'AMT_BIO', name: '방류량_생물학적'}
				,{id: 'AMT_HIGHTEC', name: '방류량_고도'}
				,{id: 'ITEM_BOD', name: 'BOD'}
				,{id: 'ITEM_COD', name: 'COD'}
				,{id: 'ITEM_SS', name: 'SS'}
				,{id: 'ITEM_TN', name: 'TN'}
				,{id: 'ITEM_TP', name: 'TP'}
				,{id: 'ITEM_COLI', name: '대장균군수'}]
			});
			itemCtl.setValue("AMT_PHYS");
		}else if(f_Chart.lastValue == "2" || f_Chart.lastValue == "3"){
			
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'ITEM_AMT', name: '유량'}
				,{id: 'ITEM_BOD', name: 'BOD'}
				,{id: 'ITEM_COD', name: 'COD'}
				,{id: 'ITEM_SS', name: 'SS'}
				,{id: 'ITEM_TN', name: 'TN'}
				,{id: 'ITEM_TP', name: 'TP'}
				,{id: 'ITEM_COLI', name: '대장균군수'}]
			});	
			itemCtl.setValue("ITEM_AMT");
		}else if(f_Chart.lastValue == "4"){
			
			var store = Ext.create('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: 'ITEM_AMT', name: '유량'}
				,{id: 'ITEM_BOD', name: 'BOD'}
				,{id: 'ITEM_COD', name: 'COD'}
				,{id: 'ITEM_SS', name: 'SS'}
				,{id: 'ITEM_TN', name: 'TN'}
				,{id: 'ITEM_TP', name: 'TP'}
				,{id: 'ITEM_COLI', name: '대장균군수'}
				,{id: 'ITEM_BYPASS_AMT', name: '미처리배제유량'}]
			});	
			itemCtl.setValue("ITEM_AMT");
		}
		
		itemCtl.bindStore(store);
	},
	
	onSearchChartData: function() {
		//alert("dd");
		ShowWindowSiteNChart("", "", "", "");
	}
});