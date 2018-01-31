Ext.define('krf_new.view.map.GraphicsLayerAdmin', {
	map: null, 
	tb: null,
	markerSymbol: null,
	lineSymbol: null,
	fillSymbol: null,
	startSymbol: null,
	endSymbol: null,
	btnId: null,
	isMulti: null,
	endBtnCnt: 0,
	
	constructor: function(map) {
        var me = this;
        me.map = map;
        
        this.initToolbar(me);
        
        require([
                 "esri/symbols/SimpleMarkerSymbol",
                 "esri/symbols/SimpleLineSymbol",
                 "esri/symbols/PictureFillSymbol",
                 "esri/symbols/CartographicLineSymbol",
                 "esri/Color"
                ],
        		function(SimpleMarkerSymbol, SimpleLineSymbol, PictureFillSymbol, CartographicLineSymbol, Color){
		            this.markerSymbol = new SimpleMarkerSymbol();
		            this.markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
		            this.markerSymbol.setColor(new Color("#00FFFF"));
		            this.lineSymbol = new CartographicLineSymbol(
		            		CartographicLineSymbol.STYLE_SOLID,
		            		new Color([255,0,0]), 10, 
		            		CartographicLineSymbol.CAP_ROUND,
		            		CartographicLineSymbol.JOIN_MITER, 5
		            );
		
		            this.fillSymbol = new PictureFillSymbol(
		            		window.baseUrl + "/resources/images/symbol/btn_start01.png",
		            		new SimpleLineSymbol(
		            				SimpleLineSymbol.STYLE_SOLID,
		            				new Color('#000'), 
		            				1
		            		), 
		            		42, 
		            		42
		            );
		            
		            this.startSymbol = new esri.symbol.PictureMarkerSymbol({
					    "angle": 0,
					    "yoffset": 14,
					    "type": "esriPMS",
					    "url": window.baseUrl + "/resources/images/symbol/btn_start01.png",
					    "contentType": "image/png",
					    "width": 20,
					    "height": 28
					});
		            
		            this.endSymbol = new esri.symbol.PictureMarkerSymbol({
					    "angle": 0,
					    "yoffset": 14,
					    "type": "esriPMS",
					    "url": window.baseUrl + "/resources/images/symbol/btn_end01.png",
					    "contentType": "image/png",
					    "width": 20,
					    "height": 28
					});
        		}
        );
        
        $KRF_APP.addListener($KRF_EVENT.POINT_DRAW_CLICK, me.pointDrawClickHandler, me.map);
        $KRF_APP.addListener($KRF_EVENT.DRAW_END, me.drawEndHandler, me.map);
    },
    
    pointDrawClickHandler: function(drawStyle, btnId, isMulti){
    	var me = $KRF_APP.coreMap;
    	me.graphicsLayerAdmin.btnId = btnId;
    	me.graphicsLayerAdmin.isMulti = isMulti;
    	me.map.disableMapNavigation();
    	me.graphicsLayerAdmin.tb.activate(drawStyle);
    },
    
    initToolbar: function(me){
    	require(["esri/toolbars/draw"], function(Draw){
    		me.tb = new Draw(me.map);
    		me.tb.on("draw-end", me.addGraphic);
    	});
    },
    
    addGraphic: function(evt){
    	var me = $KRF_APP.coreMap;
    	
    	if(me.graphicsLayerAdmin.isMulti == false){
    		me.graphicsLayerAdmin.tb.deactivate();
    		me.map.enableMapNavigation();
    	}
        var symbol;
        if ( evt.geometry.type === "point") {
        	if(me.graphicsLayerAdmin.isMulti == false)
        		symbol = startSymbol;
        	else
        		symbol = endSymbol;
        } else if(evt.geometry.type === "multipoint"){
        	symbol = endSymbol;
        } else if ( evt.geometry.type === "line" || evt.geometry.type === "polyline") {
        	symbol = lineSymbol;
        }
        else {
        	symbol = fillSymbol;
        }

        require(["esri/graphic"], function(Graphic){
        	me.map.graphics.add(new Graphic(evt.geometry, symbol));
        	if(me.graphicsLayerAdmin.isMulti == false){
	        	if(me.graphicsLayerAdmin.btnId != null){
		        	var btn = Ext.getCmp(me.graphicsLayerAdmin.btnId);
		        	btn.setSrc(btn.src.replace("_on.png", ".png"));
		        	me.graphicsLayerAdmin.btnId = null;
		        	Ext.get('_mapDiv__gc').setStyle('cursor','default');
		        	// 끝위치 버튼 클릭 횟수 초기화 
		        	me.graphicsLayerAdmin.endBtnCnt = 0;
		        	// 레이어 On/Off
		        	$KRF_APP.fireEvent($KRF_EVENT.REACH_TEST_ON_OFF, $KRF_EVENT.DYNAMIC_LAYER_REACH_TEST, "start", 1);
	        	}
        	}
        	else{
        		// 끝위치 버튼 클릭 횟수 증가
        		me.graphicsLayerAdmin.endBtnCnt++;
        		// 레이어 On/Off
        		$KRF_APP.fireEvent($KRF_EVENT.REACH_TEST_ON_OFF, $KRF_EVENT.DYNAMIC_LAYER_REACH_TEST, $KRF_EVENT.END, me.graphicsLayerAdmin.endBtnCnt);
        	}
        });
    },
    
    drawEndHandler: function(){
    	var me = $KRF_APP.coreMap;
    	me.graphicsLayerAdmin.tb.deactivate();
    	me.map.enableMapNavigation();
    	// 끝위치 버튼 클릭 횟수 초기화 
    	me.graphicsLayerAdmin.endBtnCnt = 0;
    }
});