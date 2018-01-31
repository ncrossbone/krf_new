/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea_Name_Rich', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-searchArea_Name_Rich',
	
	id: 'westSearchAreaNameRich',

	controller: 'searchArea_NameController_Rich',
	
	title: '명칭으로 찾기',
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
			height: 102,
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
					id: 'nameSearch_Rich',
					xtype: 'label',
					cls: 'khLee-x-label-default',
					html: '<img src="./resources/images/button/blit_st_02.png" /> <b>시작위치</b> ',
					width: 70
				}, {
					id: 'textSearchText_Start',
					xtype: 'textfield',
					cls: 'dj_stextfield',
					displayField: 'name',
					valueField: 'id',
					width: 120
				}, {
					xtype: 'container',
					width: 10
				},{
					id: 'btnSearchText_Start',
					xtype: 'button',
					lnkCmbId: 'nameSearch',
					cls: 'khLee-x-button-search'
				}]
			},{
				xtype: 'container',
				height: 5
			},{
				xtype: 'container',
				layout: {
					type: 'hbox'
				},
				items: [{
					id: 'nameSearch_End',
					xtype: 'label',
					cls: 'khLee-x-label-default',
					html: '<img src="./resources/images/button/blit_st_03.png" /> <b>끝  위치</b> ',
					width: 70
				}, {
					id: 'textSearchText_End',
					xtype: 'textfield',
					cls: 'dj_etextfield',
					displayField: 'name',
					valueField: 'id',
					width: 120
				}, {
					xtype: 'container',
					width: 10
				},{
					id: 'btnSearchText_End',
					xtype: 'button',
					lnkCmbId: 'nameSearch_End',
					cls: 'khLee-x-button-search'
				}]
			}, {
				xtye: 'container',
				id: 'smartButton',
				style: 'border: 0px !important; padding: 0px; text-align: right; height: 17px;',
				html: '<a href="#"><img src="./resources/images/button/txtSetup.png"  /></a>',
				listeners: { el: { click: 'onClickSmart' } }   //검색설정보기
			}]
		}]
	}]

});