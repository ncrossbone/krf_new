/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea', {
	
	extend: 'Ext.panel.Panel',

	xtype: 'west-searchArea',
	
//	title: '위치 검색',
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'container',
		layout: {
			type: 'fit',
			align: 'center'
		},
		items: [{
			xtype: 'west-searchArea_Button'
		}]
	}, {
		xtype: 'container',
		id: 'searchAreaContents',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'west-searchArea_Water'
		}, {
			xtype: 'west-searchArea_ADM'
		}
		, {
			xtype: 'west-searchArea_Name'
		}
		, {
			xtype: 'container',
			items: [{
				xtype: 'west-searchArea_Name_Rich'
			}, {
				xtype: 'west-searchArea-list_Total'
			}, {
				xtype: 'west-searchArea-list'
			}]
		}]
	}],
	
	listeners: {
		
		resize: function(){
		}
	}
});