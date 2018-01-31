/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea_Name', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-searchArea_Name',

	controller: 'searchArea_NameController',
	
	title: '명칭으로 찾기',
	
	autoScroll: true,
	
	cls: 'khLee-x-searcharea-water',
	
	layout: {
		type: 'vbox',
		align: 'middle'
	},
	
	items: [{
		xtype: 'container',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'form',
			cls: 'khLee-x-form',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items: [{
					id: 'nameSearch',
					xtype: 'label',
					cls: 'khLee-x-label-default',
					html: '<img src="./resources/images/button/blit_st_01.png" /> <b>명　칭</b> : ',
					width: 70
				}, {
					id: 'textSearchText',
					xtype: 'textfield',
					displayField: 'name',
					valueField: 'id',
					width: 120
				}, {
					xtype: 'container',
					width: 10
				},{
					id: 'btnSearchText',
					xtype: 'button',
					lnkCmbId: 'nameSearch',
					cls: 'khLee-x-button-search'
				}]
			}]
		}]
	}]
});