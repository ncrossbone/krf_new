Ext.define('krf_new.global.SimpleTooltip', {

	extend: "Ext.Component",
	
	floating: true,
	
	html: "",
	
	hidden: true,
	
	mouseMoveObj: null,
	mouseDownObj: null,
	mouseUpObj: null,
	mouseOutObj: null,
	
	setContents: function(text){
		
		this.setHtml("<div style='background-color: ivory;'>" + text + "</div>");
	},
	
	onMousemoveEvt: function(){
		
		var me = this;
		
		me.offMousemoveEvt();
		
		require(["esri/toolbars/draw",
	         "dojo/on",
	         "dojo/i18n!esri/nls/jsapi"], function(Draw, on, bundle){
			
			me.mouseMoveObj = on($KRF_APP.coreMap._krad.map, "mouse-move", function(evt){
				
				me.showThis(evt.pageX, evt.pageY);
			});
			
			me.mouseDownObj = on($KRF_APP.coreMap._krad.map, "mouse-down", function(evt){
				
				me.hideThis();
			});
			
			me.mouseUpObj = on($KRF_APP.coreMap._krad.map, "mouse-up", function(evt){
				
				me.showThis(evt.pageX, evt.pageY);
			});
			
			me.mouseOutObj = on($KRF_APP.coreMap._krad.map, "mouse-out", function(evt){
				
				me.hideThis();
			});
		});
	},
	
	offMousemoveEvt: function(){
		
		var me = this;
		
		if(me.mouseMoveObj != undefined && me.mouseMoveObj != null){
			me.mouseMoveObj.remove();
			me.mouseMoveObj = null;
		}
		
		if(me.mouseDownObj != undefined && me.mouseDownObj != null){
			me.mouseDownObj.remove();
			me.mouseDownObj = null;
		}
		
		if(me.mouseUpObj != undefined && me.mouseUpObj != null){
			me.mouseUpObj.remove();
			me.mouseUpObj = null;
		}
		
		if(me.mouseOutObj != undefined && me.mouseOutObj != null){
			me.mouseOutObj.remove();
			me.mouseOutObj = null;
		}
	},
	
	showThis: function(x, y){
		
		var me = this;
		
		me.show();
		
		me.setX(x + 10 - me.getXOffset(x));
		me.setY(y + 10);
	},
	
	hideThis: function(){
		
		var me = this;
		
		me.hide();
	},
	
	getXOffset: function(pageX){
		
		var me = this;
		
		var chkRight = Ext.getBody().getWidth() - pageX - 10;
		var toolTipWidth = me.getWidth();
		var xOffset = 0;
		
		if(chkRight <= toolTipWidth){
			xOffset = toolTipWidth - chkRight;
		}
		
		return xOffset;
	}
});