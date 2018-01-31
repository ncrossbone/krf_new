Ext.define('krf_new.view.east.ChartPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'east-chartpanel',
    
    id: 'chartPanel',
    //renderTo: Ext.getBody(),
    title: '차트정보',
    header: false,
    
    layout: {
		type: 'fit'
	},
	
	width: 450,
	height: 600,
	y: 5,
	
	cls: 'khLee-window-panel-header khLee-x-window-default ',
	
	items : [{
		xtype: 'container',
		layout: {
			type: 'vbox'
		},
		items: [{
			xtype: 'container',
			layout: {
				type: 'hbox'
			},
			width: "100%",
			items: [{
				xtype: 'container',
				width: 10
			}, {
				xtype: 'label',
				id : 'selectName',
				style: 'font-weight: bold; padding-left: 7px; margin: 3px;',
				width: "40%",
				height: 25
			},{
				xtype: 'label',
				id : 'selectItemName',
				style: 'font-family: 돋움;font-size: 12px; margin: 5px;',
				store: Ext.create('krf_new.store.east.SiteChartPanel'),
				text: '',
				width: "32%",
				height: 25
			},{
				xtype: 'image',
				id: 'btnShowSearchWindow',
				listeners: {
					el: {
						click: function(obj, el, evt){
							var btnCtl = Ext.getCmp(el.id);
							var parentCtl = btnCtl.findParentByType("container");
							var dateWinCtl = Ext.getCmp("datePanel1");
							
							
							if(dateWinCtl == undefined){
								dateWinCtl = Ext.create("krf_new.view.east.ChartPanelDate");
							}
							dateWinCtl.show();
							dateWinCtl = undefined;
						}
					}
				},
				width: 45,
				height: 21,
				src: './resources/images/button/btn_date.gif'
			}, {
				xtype: 'label',
				id :  'chartName',
				labelWidth: 60,
				labelAlign: 'right'
			},{

				xtype: 'image',
				id: 'btnImageDown',
				listeners: {
					el: {
						click: function(obj, el, evt){
							var siteCharttest = Ext.getCmp('siteCharttest');
							setActionInfo(siteCharttest.store.parentId , siteCharttest.store.orgParentId , "" , siteCharttest.store.siteCD , "차트저장");
							siteCharttest.download({
								type: 'image/svg+xml',
								filename : 'image'
		                    })
							
						}
					}
				},
				width: 45,
				height: 21,
				src: './resources/images/button/btn_save.gif'
			
			}]
		},  {
			xtype: 'cartesian',
	        id: 'siteCharttest',
	        innerPadding: {
	             left: 30,
	             right:30
	        },
	        width: 450,
	        height: 250,
	        padding: '10 0 0 0',
	        style: {
	            'background' : '#fff'
	        },
	        animate: true,
	        shadow: false,
	        insetPadding: 10,
	       
	        axes: [{
	            type: 'numeric',
	            position: 'left',
	            grid: true,
	            minimum: 0
	        }, {
	            type: 'category',
	            position: 'bottom',
	            grid: true,
	            label: {
	                rotate: {
	                    degrees: -45
	                }
	            }
	        }],
	        
	        series: [{
	        	text: 'month',
	            type: 'line',
	            axis: 'left',
	            xField: 'WMCYMD',
	            yField: 'ITEM_VALUE',
	            marker: true,
	            tips: {
	                trackMouse: true,
	                style: 'background: #FFF',
	                height: 40,
	                showDelay: 0,
	                dismissDelay: 0,
	                hideDelay: 0,
	                renderer: function(tooltip, storeItem) {
	                	var series = Ext.getCmp("siteCharttest");
	                	
	                	var format = '';
	                	var itemNm = storeItem.get('ITEM_NAME');
	                	if(itemNm.indexOf('AMT') > -1){
	                		format = itemNm;
	                	}else{
	                		var itemNms = itemNm.split('_');
	                		format = itemNms[0];
	                		if(itemNms.length > 1){
		                		format = itemNms.slice(1, itemNms.length).join('_');
		                	}	
	                	}
	                	
	                	var maVal = Ext.util.Format.number(storeItem.get(series.series[0]._yField), $KRF_APP.global.AttrFn.getAttrFormat(storeItem.joined[0].parentId,format));
	                	
	                	tooltip.setTitle('측정일 : '+storeItem.get(series.series[0]._xField)+ '<br>' + '측정값 : ' + maVal);
	                }
	            }
	        }]
	    }]
	}],
	
    initComponent: function() {
        this.callParent();
    }
});