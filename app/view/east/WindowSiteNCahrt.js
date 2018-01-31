Ext.define('krf_new.view.east.WindowSiteNChart', {
    extend: 'Ext.window.Window',
    xtype: 'east-windowsitenchart',
    
    requires : [
	            
	    		'Ext.chart.*',
	    		'Ext.window.MessageBox'
	    		],
	    		
    id: 'windowSiteNChart',
    constrain: true,
    header: {
    	titlePosition: 2,
    	items: [{
    		xtype: 'image',
			//title: '차트정보',
			id: 'tabChart',
			src: './resources/images/tab/tap_01_ov.gif',
			onImg: './resources/images/tab/tap_01_ov.gif',
			offImg: './resources/images/tab/tap_01_off.gif',
			style: 'cursor:pointer; border:0px !important;',
			width: 95,
			height: 28,
			listeners: {
		        el: {
		        	click: function(obj, el, evt){
		        		ChangeTabIndex(0);
		            }
		        }
		    }
    	}, {
			xtype: 'image',
			id: 'tabSite',
			//title: '지점정보',
			src: './resources/images/tab/tap_02_off.gif',
			onImg: './resources/images/tab/tap_02_ov.gif',
			offImg: './resources/images/tab/tap_02_off.gif',
			style: 'cursor:pointer; border:0px !important;',
			width: 95,
			height: 28,
			listeners: {
		        el: {
		        	click: function(obj, el, evt){
		        		ChangeTabIndex(1);
		            }
		        }
		    }
		}]
    },
    
    layout: {
		type: 'vbox'
	},
	
	width: 500,
	height: 350,
	draggable: true,
	 listeners : {//resize될때 chart panel width값 변경
         'resize' : function(win,width,height,opt){
            var chartPanel = Ext.getCmp("chartPanel");
            var siteCharttest = Ext.getCmp("siteCharttest");
            //var siteinfotest = Ext.getCmp("siteinfotest");
            var siteInfoPanel = Ext.getCmp("siteInfoPanel");
            siteInfoPanel.setWidth(width);//정보창 사이즈 조절
            
            chartPanel.setWidth(width);
            chartPanel.setHeight(height);
            siteCharttest.setWidth(width);
            siteCharttest.setHeight(height-80);
          }
	 },
//	cls: 'khLee-window-panel-header khLee-x-window-default ',

	items: [{
		xtype: 'container',
		id: 'infoContents',
		layout: {
			type: 'card'
		},
		items: [{
			xtype: 'east-chartpanel'
		}, {
			xtype: 'east-siteinfopanel'
		}]
	}],
	initComponent: function(){
		this.on("beforeclose", function windSitreNChartClose(){
			var datePanel1 = Ext.getCmp("datePanel1");
			if(datePanel1 != undefined){
				datePanel1.close();
			}
		});
		this.callParent();
	}
});