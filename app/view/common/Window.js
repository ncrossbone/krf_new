Ext.define('krf_new.view.common.Window', {
	extend : 'Ext.window.Window',
	
	xtype : 'app-common-window',
	
	cls: 'khLee-x-tab-active',
	
	initComponent : function() {
		
		var tab_panel = Ext.getCmp('datawindow-tabpanel');
		
		if(tab_panel == null || tab_panel == undefined){
			CreateWindow(this.params);
		}
		else{
			AddTab(tab_panel, this.params);
		}
		
		this.callParent();
	}
});

function AddTab(parent, params){
	
	var ctl = Ext.getCmp(params.id);
	
	if(ctl == null || ctl == undefined){
		parent.add({
			xtype: params.xtype,
			//store: params.store,
			title: params.title,
			id: params.id,
			width: '100%'/*,
			height: '100%'*/
			//columns: params.columns,
			//height: params.height
		});
		
		//console.info(parent.items.items);
		ctl = parent.items.items[parent.items.items.length - 1];
	}
	
	parent.setActiveTab(ctl);
}

var windowWidth = 0;
var windowHeight = 0;
var windowX = 0;
var windowY = 0;
var windowMode = "";

function CreateWindow(params){
	
	var center = Ext.getCmp('center_container');
	
	windowWidth = center.getWidth();
	windowHeight = 300;
	windowX = 0;
	windowY = center.getHeight() - center.header.getHeight() - windowHeight;
	windowMode = "normal";
	centerX = center.getX();
	centerY = center.getY();

	center.add({
		xtype: 'window',
		region: 'south',
		id: 'datawindow-container',
		title: 'Tab Window',
		height: windowHeight,
		width: windowWidth,
        frame: true,
		x: windowX,
		y: windowY,
		closable: true,
		tools: [{
			type: 'restore',
			hidden: false,
			handler: function(evt, toolEl, owner, tool){
				var window = owner.up('window');
				
				if(windowMode == "normal"){
					windowWidth = window.getWidth();
					windowHeight = window.getHeight();
					windowX = window.getX();
					windowY = window.getY();
				}
				
				if(windowMode == "minimize")
					window.expand('', false);
				
				windowMode = "normal";
				window.setWidth(windowWidth);
				window.setHeight(windowHeight);
				window.setX(windowX);
				window.setY(windowY);
			}
		}, {
			type: 'maximize',
			handler: function(evt, toolEl, owner, tool){
				var window = owner.up('window');

				if(windowMode == "normal"){
					windowWidth = window.getWidth();
					windowHeight = window.getHeight();
					windowX = window.getX();
					windowY = window.getY();
				}
				
				windowMode = "maximize";
				
				
				window.expand('', false);
				window.setWidth(center.getWidth());
				window.setHeight(center.getHeight());
				window.setX(centerX);
				window.setY(centerY);
				
				//window.alignTo('center-panel', 'tl-br');
			}
		}, {
			type: 'minimize',
			handler: function(evt, toolEl, owner, tool){
				
				var window = owner.up('window');
				
				if(windowMode == "normal"){
					windowWidth = window.getWidth();
					windowHeight = window.getHeight();
					windowX = window.getX();
					windowY = window.getY();
				}
				
				windowMode = "minimize";
				
				window.collapse();
				window.setWidth(150);
				window.alignTo(center, 'bl-bl');
			}
		}],
		items: [{
			xtype: 'tabpanel',
			id: 'datawindow-tabpanel',
			title: params.title,
			width: '100%',
			height: '100%',
			header: false,
			items: [{
				xtype: params.xtype,
				//store: params.store,
				title: params.title,
				id: params.id,
				width: '100%'/*,
				height: '100%'*/
			}]
		}],
		listeners:{
	        close:function(){
	            var currCtl = Ext.getCmp("btnSearchResult");
	            if(currCtl.btnOnOff == "on"){
	            	SetBtnOnOff(currCtl.id);
	            }
	        },
	        resize : function(win,width,height,opt){
                //var grid = Ext.getCmp("grid-tab-2");grdPrototype
                var grid = Ext.getCmp("grdPrototype");
	        	if(grid != undefined){
	        		grid.setHeight(height - 85);
	        		grid.setWidth(width);
	        	}
	        	/*
	        	grid = Ext.getCmp("grid-tab-3");
	        	if(grid != undefined){
	        		grid.setHeight(height - 85);
	        		grid.setWidth(width);
	        	}
	        	
	        	*/
	        }
	    }
	});
}