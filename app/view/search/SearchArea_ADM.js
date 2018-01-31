/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea_ADM', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-searchArea_ADM',

	controller: 'searchArea_ADMController',
	
	title: '행정구역으로 찾기',
	
	autoScroll: true,
	cls: 'khLee-x-searcharea-water',
	
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
				id: 'cmbArea1',
//				layerId: _admSidoLayerId,
				xtype: 'combo',
				tarCmbId: 'cmbArea2',
				lnkBtnId: 'btnSearch1',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>시　도</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
				editable: false,
//				store: Ext.create('KRF_DEV.store.west.SearchArea_ADM'),
				displayField: 'name',
				valueField: 'id'
			}, {
				xtype: 'container',
				width: 10
			},{
				id: 'btnSearch1',
				xtype: 'button',
				lnkCmbId: 'cmbArea1',
				disabled: true,
				cls: 'khLee-x-button-move'
			}]
		}, {
			xtype: 'container',
			height: 7
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				id: 'cmbArea2',
//				layerId: _admSigunguLayerId,
				xtype: 'combo',
				tarCmbId: 'cmbArea3',
				lnkBtnId: 'btnSearch2',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>시군구</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
				editable: false,
//				store: Ext.create('KRF_DEV.store.west.SearchArea_ADM'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			},{
				id: 'btnSearch2',
				xtype: 'button',
				lnkCmbId: 'cmbArea2',
				disabled: true,
				cls: 'khLee-x-button-move'
			}]
		}, {
			xtype: 'container',
			height: 7
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			items: [{
				id: 'cmbArea3',
//				layerId: _admDongLayerId,
				xtype: 'combo',
				tarCmbId: '',
				lnkBtnId: 'btnSearch3',
				cls: 'khLee-x-form-item-label-default',
				fieldLabel: '<img src="./resources/images/button/blit_st_01.png" /> <b>읍면동</b> ',
				labelWidth: 60,
				labelAlign: 'right',
				labelPad: 10,
				width: 200,
				editable: false,
//				store: Ext.create('KRF_DEV.store.west.SearchArea_ADM'),
				displayField: 'name',
				valueField: 'id',
				disabled: true
			}, {
				xtype: 'container',
				width: 10
			},{
				id: 'btnSearch3',
				xtype: 'button',
				lnkCmbId: 'cmbArea3',
				disabled: true,
				cls: 'khLee-x-button-move'
			}]
		}, {
			xtype: 'container',
			height: 17
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'end',
				pack: 'middle'
			},
			items: [{
				xtype: 'button',
				id: 'btnADMReset',
				//text: '초기화'
				cls: 'khLee-x-button-reset'
			}, {
				xtype: 'container',
				width: 10
			}, {
				xtype: 'button',
				id: 'btnADMSelect',
				//text: '선택'
				cls: 'khLee-x-button-select'
			}]
		}]
	}]
});