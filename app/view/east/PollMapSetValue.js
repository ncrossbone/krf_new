Ext.define('krf_new.view.east.PollMapSetValue', {
	extend : 'Ext.window.Window',
	
	xtype : 'east-PollMapSetValue',
	
	id: 'pollMapSetValue',
	//params: this.record,
	
	//title: '지점 목록',
	
	title: '부하량 지도 보기설정',
	
	cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
	//bodyStyle: 'border: 0px;',
	
	layout: {
		type: 'fit'
	},
	
	width: 260,
	height: 165,
	
	items:[{
    	xtype: 'container',
    	y: 10,
    	x: 10,
    	layout: {
    		type: 'vbox',
    		align: 'left',
    		pack: 'middle'
    	},
    	items: [{
        	xtype: 'container',
        	layout: {
        		type: 'hbox',
        		align: 'left',
        		pack: 'left'
        	},
        	items: [{
				xtype: 'label',
				text: '기   간  : ',
				width: 50
			},{
				xtype: 'combo',
				id : 'setPollYear',
				store: ['', '2010', '2011', '2012', '2013'],
				value: '2013',
				//labelWidth: 30,
				//labelAlign: 'right',
				width: 65,
				height: 25
			}]
    	},{
			xtype: 'container',
			height: 5
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'middle',
	        		pack: 'middle'
	        	},
	        	items: [{
					xtype: 'container'
					
	        	},{
					xtype: 'label',
					text: '항   목  : ',
					width: 50
				},{
					xtype: 'combo',
					id : 'setPollItems',
					valueField: 'id',
					displayField: 'name',
					store: Ext.create('Ext.data.Store', {
						fields: ['id', 'name'],
						data: [{id: 'GNR_FLOW_S', name: '발생유량합계'}
							    ,{id: 'GNR_BOD_S', name: '발생BOD합계'}
						    ,{id: 'GNR_TN_S', name: '발생TN합계'}
							,{id: 'GNR_TP_S', name: '발생TP합계'}
							,{id: 'OUT_FLOW_S', name: '배출유량합계'}
							,{id: 'OUT_BOD_S', name: '배출BOD합계'}
							,{id: 'OUT_TN_S', name: '배출TN합계'}
							,{id: 'OUT_TP_S', name: '배출TP합계'}]
					}),
					value: 'GNR_BOD_S',
					width: 185,
					height: 25
				}]
	    	}]
    	},{
			xtype: 'container',
			height: 10
		},{
    		items:[{
    			xtype: 'container',
	        	layout: {
	        		type: 'hbox',
	        		align: 'right',
	        		pack: 'middle'
        		},
	        	items: [{
					xtype: 'container',
					width: 194
				},{
					xtype: 'image',
					width: 34,
					height: 19,
					src: './resources/images/button/icon_seah.gif',
					listeners:{
						el:{
							click: function(){
								
								catTMLayerOnOff("on");
							}
						}
					}
				}]
    		}]
		},{
			xtype: 'container',
			height: 10
		},{
			xtype: 'container',
        	layout: {
        		type: 'hbox',
        		align: 'left',
        		pack: 'left'
        	},
        	items:[{
				xtype: 'image',
				width: 34,
				height: 10,
				style: 'margin: 3px !important;',
				src: './resources/images/button/opacity.png'
			}, {
				xtype: 'container',
				width: 5
			},{
        		xtype: 'label',
				text: '0%'
			}, {
				xtype: 'container',
				width: 5
			},{
    			xtype: 'slider',
    			hideLabel: true,
    	        useTips: false,
    	        width: 90,
    	        value:100,
    	        increment: 10,
    	        minValue: 0,
    	        maxValue: 100,
    	        listeners: {
    	    		change: function(slider, thumb, oldValue, newValue) {
    	    			
    	    			var coreMap = GetCoreMap();
    	    			
    	    			coreMap.tmLayerAdmin.tmGraphicLayerCat.setOpacity(thumb*0.01);
						coreMap.tmLayerAdmin.tmLabelLayerCat.setOpacity(thumb*0.01);
    	    		}
    	    	}
    	        	
    		},{
				xtype: 'container',
				width: 5
			},{
        		xtype: 'label',
				text: '100%'
			},{
				xtype: 'container',
				width: 5
			},{
				xtype: 'image',
				width: 34,
				height: 10,
				style: 'margin: 3px !important;',
				src: './resources/images/button/remark.png',
				listeners:{
					el:{
						click: function(){
							var tmLegendWindow = Ext.getCmp("tmLegendWindow");
					    	// 레전드 윈도우 보이기
							if(tmLegendWindow.hidden == true){
								tmLegendWindow.setHidden(false);
							}else{
								tmLegendWindow.setHidden(true);
							}
					    	
						}
					}
				}
			}]

    		
		
		}]
    }]

	
});