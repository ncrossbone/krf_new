/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.drone.DroneDetailExp', {
	extend: 'Ext.panel.Panel',
    
    xtype: 'center-dronedetailexp',
    
    id: "droneDetailExp",
    
    headerPosition: 'left',
    
    header: {
    	html: "<img src='./resources/images/drone/icon_notice01.png'/>",
    	width: 90,
		height: 27,
		style: " padding-top: 5px; padding-left:11px; background:rgba(0, 0, 0, 0.8);", // 백그라운드 투명
    },
    
    bodyStyle: "background:rgba(0, 0, 0, 0.8); !important;",  
    
    draggable: true,
    
    height: 27,
    
    layout: {
    	type: "hbox",
		align:"center"  
    },
    
    items: [{
    	xtype: 'panel',
    	id: "expToolbar",
    	/* 헤더 셋팅 Open, Close 버튼 */
    	header: {
        	html: "<img src='./resources/images/drone/icon_arrow_up.png' style='padding-left: 9px;/'>",
        	listeners: {
        		el: {
        			click: function(){
        				
        				var expToolbar = Ext.getCmp("expToolbar");
        				if(expToolbar.expanded == false || expToolbar.collapsed == "right"){

        					expToolbar.expand();
        					expToolbar.updateHeaderPosition("right");
        					expToolbar.header.setHtml("<img src='./resources/images/drone/icon_arrow_up.png' style='padding-left: 6px;/'>");
        					expToolbar.setWidth(448);
        					expToolbar.up("panel").setWidth(528);
        				} else{
        					expToolbar.collapse();
        					expToolbar.updateHeaderPosition("left");
        					expToolbar.header.setHtml("<img src='./resources/images/drone/icon_bar.png' /><img src='./resources/images/drone/icon_arrow_down.png' style='padding-left: 5px;/'>");
        					expToolbar.setWidth(40);
        					expToolbar.up("panel").setWidth(120);
        				}
        			}
        		}
        	},
    		width: 40,
    		style: "padding: 0 !important; background-color: transparent;", // 백그라운드 투명
        },
        // 헤더 셋팅 Open, Close 버튼 끝 
        bodyStyle: "padding: 0 !important; background-color: transparent;", // 백그라운드 투명
    	layout: {
    		type: "hbox" 
    	},
    	headerPosition: 'right',
    	expanded: true,
    	width: 448,
    	items: [{
    		xtype: "container",
    		width: 15
    		
    	},{
    		xtype: "label",
    		id: "expLabelId",
    		text : "주의사항 내용이 한줄로 들어 갑니다.",
    		style:{
    			color: "#ffffff"
    		}
    	}]
    }],
    
    initComponent: function(){
    	
    	this.callParent();
    	
    	var totWidth = 0;
    	
    	Ext.each(this.items.items, function(){
    		totWidth += this.width;
    	});
    	
    	totWidth += this.header.width;
    	this.width = totWidth;
	},
    
    // VComboBox 초기화
    initVComboBox: function(comboCtl){
    	
    	var x = 0;
		var y = 14;
		
		if(comboCtl != undefined){
			comboCtl.removeAll();
	    	comboCtl.x = x;
	    	comboCtl.y = y;
	    	comboCtl.initComponent();
		}
    	
    }
});