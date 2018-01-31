Ext.define("krf_new.view.map.PollutionLayerAdmin", {
	
	pollutionGraphicLayerCat: null,
	pollutionLabelLayerCat: null,
	
	initOpacity: "1", // 기본 투명도
	mouseOverOpacity: "0.4", // 마우스 오버시 투명도
	mouseOverColor: "blue", // 마우스 오버시 색상
	
	basicColor: "gray",
	middleColor: "gray",
	overColor: "transparent",
	
	constructor: function() {
    },
    
    // 집수구역별 오염원 주제도 그리기
    drawTMCatLayer: function(inStrCatDids, year, colName, kind){
    	var me = this;
		require([
		         "esri/tasks/QueryTask",
                 "esri/tasks/query",
                 "esri/layers/GraphicsLayer",
                 "esri/symbols/SimpleFillSymbol",
                 "esri/symbols/SimpleLineSymbol",
                 "esri/Color",
                 "esri/symbols/TextSymbol",
                 "esri/symbols/Font",
                 "esri/graphic",
                 "dojo/on",
                 "esri/symbols/SimpleMarkerSymbol",
                 "esri/geometry/Circle",
                 "esri/symbols/PictureMarkerSymbol",
                 "dojo/dom",
                 "dojo/dom-class"],
		        function(QueryTask,
                		 Query,
                		 GraphicsLayer,
                		 SimpleFillSymbol,
                		 SimpleLineSymbol,
                		 Color,
                		 TextSymbol,
                		 Font,
                		 Graphic,
                		 on,
                		 SimpleMarkerSymbol,
                		 Circle,
                		 PictureMarkerSymbol,
                		 dom,
                		 domClass){
			
			var layerId = "1";
			
			if(year == "2013"){
				layerId = "1";
			}
			var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3_TM +"/" + layerId);
			//console.info(_mapServiceUrl_v3_TM);
			var query = new Query();
	        query.returnGeometry = true;
	        query.outFields = ["*"];
	        query.outSpatialReference = {
	          "wkid": 102100
	        };
	        query.where = "CAT_DID IN (" + inStrCatDids + ")";
	        queryTask.execute(query, function(tmCatFeatureSet){
	        	var tmpCatDids = inStrCatDids.replace(/'/g, "").split(", ");
	        	//각 계에 해당하는 store 생성
	        	 var store = Ext.create('krf_new.store.east.PollutionResult_0'+kind+'_Catdid',{
	    			async:false,
	    			catDid : tmpCatDids,
	    			year: year
	    		});
	        	
	        	if(store == undefined){
	        		return;
	        	}
	    		store.load();
	    		for(var i = 0; i < tmCatFeatureSet.features.length; i++){
	    			for(var j = 0; j < store.data.items.length; j++){
		    			if(tmCatFeatureSet.features[i].attributes.CAT_DID == store.data.items[j].data.CAT_DID){
		    				tmCatFeatureSet.features[i].attributes[colName] = Number(store.data.items[j].data[colName]);
		    			}
	    			}
	    		}
	    		
	    		var unint = "";
	    		if(colName == "POP_SUM" || colName == "UPOP_SUM" || colName == "SPOP_SUM"){
	    			unint = "(명)";
	    		}else if(colName == "LIVESTOCK_CNT"){
	    			unint = "(마리)";
	    		}else if(colName == "WUSE_W_SUM"){
	    			unint = "(㎥/일)";
	    		}else if(colName == "AREA_SUM" || colName == "AREA_REG_TOTAL" || colName == "AREA_INST_TOTAL"){
	    			unint = "(㎡)";
	    		}else if(colName == "FEED_AMT_TOTAL" || colName == "FISH_REG_TOTAL"){
	    			unint = "(kg/년)";
	    		}else if(colName == "PRODUCT_AMT" || colName == "DISCHARGE_AMT" || colName == "WW_AMT"){
	    			unint = "(㎥/일)";
	    		}
	    		
	        	if(me.pollutionGraphicLayerCat == undefined || me.pollutionGraphicLayerCat == null){
		        	// 폴리곤 레이어 생성
		        	me.pollutionGraphicLayerCat = new GraphicsLayer();
		        	me.pollutionGraphicLayerCat.id = "pollutionGraphicLayerCat";
	        	}
	        	
	        	me.pollutionGraphicLayerCat.setVisibility(true);
	        	
	        	if(me.circleGraphicLayer == undefined || me.circleGraphicLayer == null){
		        	// 원형 심볼 레이어
		        	me.circleGraphicLayer = new GraphicsLayer();
		        	me.circleGraphicLayer.id = "circleGraphicLayer";
	        	}
	        	
	        	me.circleGraphicLayer.setVisibility(true);
	        	
	        	if(me.pollutionbarImgGraphicLayer == undefined || me.pollutionbarImgGraphicLayer == null){
		        	// 막대 심볼 레이어
		        	me.pollutionbarImgGraphicLayer = new GraphicsLayer();
		        	me.pollutionbarImgGraphicLayer.id = "pollutionbarImgGraphicLayer";
	        	}
	        	
	        	me.pollutionbarImgGraphicLayer.setVisibility(true);
	        	
	        	if(me.pollutionLabelLayerCat == undefined || me.pollutionLabelLayerCat == null){
		        	// 라벨 레이어 생성
		        	me.pollutionLabelLayerCat = new GraphicsLayer();
		        	me.pollutionLabelLayerCat.id = "pollutionLabelLayerCat";
	        	}
	        	
	        	me.pollutionLabelLayerCat.setVisibility(true);
	        	
	        	// 폴리곤 그래픽 심볼 생성
        		var tmCatFillSymbol = new SimpleFillSymbol(
        				SimpleFillSymbol.STYLE_SOLID,
        				new SimpleLineSymbol(
        						SimpleFillSymbol.STYLE_SOLID,
        						new esri.Color([100, 255, 100]),
        						1
        				),
        				new Color([255, 0, 0, 1])
        		);
        		
	        	var tmCatFeatures = tmCatFeatureSet.features;
	        	var range = 15;
	        	
	        	/* 범위, 값 매핑 오브젝트 생성 */
	        	var quantizeObj = "";
	        	quantizeObj = getQuantizeObj(tmCatFeatureSet, colName, range, kind);
	        	for(var range = 0; range < quantizeObj.length; range++){
	        		//tmCatFeatures == null;
	        		tmCatFeatures = quantizeObj[range].features;
		        	//quantize = getQuantize(minVal, maxVal, range);
		        	for(var i = 0; i < tmCatFeatures.length; i++){
		        		// 폴리곤 그래픽 지정
		        		var tmCatGraphic = tmCatFeatures[i];
		        		// 폴리곤 심볼 지정
		        		tmCatGraphic.setSymbol(tmCatFillSymbol);
		        		// 폴리곤 그래픽 추가
		        		me.pollutionGraphicLayerCat.add(tmCatGraphic);
		        		
		        		/* 폴리곤 중심점 가져오기 */
		        		var centerPoint = getCenterFromGraphic(tmCatGraphic);
		        		
		        		var gnrBodSu = tmCatGraphic.attributes[colName];
		        		
		        		var gnrBodSulabel = gnrBodSu + unint;
		        		// 텍스트 라벨 생성
		        		var tmCatLabelSymbol = new esri.symbol.TextSymbol(gnrBodSulabel).setColor(
		        				new esri.Color([255,255,255])).setAlign(esri.symbol.Font.ALIGN_START).setAngle(0).setFont(
		        						new esri.symbol.Font("9pt", null, null, null, "굴림").setWeight(esri.symbol.Font.WEIGHT_BOLD)).setOffset(0, -20);
		        		// 라벨 그래픽 생성
		        		var tmCatLabelGraphic = new Graphic(centerPoint, tmCatLabelSymbol);
		        		// 집수구역 오염원 속성 데이터 카피
		        		tmCatLabelGraphic.attributes = tmCatGraphic.attributes;
		        		me.pollutionLabelLayerCat.add(tmCatLabelGraphic);
		        		
		        		//var range = quantize(gnrBodSu);
		        		var circle = new Circle({
		        			center: centerPoint,
		        			radius: getCatRangeRadius(range)
		        		});
		        		
		        		// 원형 그래픽 생성
		        		var cirCleGraphic = new Graphic(circle, tmCatFillSymbol);
		        		// 집수구역 오염원 속성 데이터 카피
		        		cirCleGraphic.attributes = tmCatGraphic.attributes;
		        		me.circleGraphicLayer.add(cirCleGraphic);
		        		// 이미지 심볼 생성
		        		var barImgSymbol = new PictureMarkerSymbol(getCatRangeBarSrc(Math.floor(range/2)), 25, 63).setOffset(0, 25);
		        		var barImgGraphic = new Graphic(centerPoint, barImgSymbol);
		        		// 집수구역 오염원 속성 데이터 카피
		        		barImgGraphic.attributes = tmCatGraphic.attributes;
		        		me.pollutionbarImgGraphicLayer.add(barImgGraphic);
		        	}
	        	}
	        	
	        	/* 폴리곤 그래픽 이벤트 */
	        	on(me.pollutionGraphicLayerCat, "graphic-draw", function(evt){
	        		
	        		var attrs = evt.graphic.attributes,
	        			range;
                    range = attrs.range;
                    
                    // 집수구역별 오염원 폴리곤 그래픽 스타일 셋팅
                    me.setAttributeInit(evt.node, "polySymbol_" + attrs.CAT_DID, attrs.color);
                    // 범례와 연계하기 위해 클래스 지정 (가상)
                    evt.node.setAttribute("class", "polySymbol_" + range);
	        	});
	        	
	        	on(me.pollutionGraphicLayerCat, "mouse-over", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		//polySymbol[0].setAttribute("opacity", me.mouseOverOpacity);
	        		me.setPolyFillColor(polySymbol[0], me.mouseOverColor);
	            	
	            	// 범례 스타일 설정
	        		var range = evt.graphic.attributes.range;
	        		me.setAttributeLegend("on", range);
	        	});
	        	
	        	
	        	//클릭 이벤트
	        	on(me.pollutionGraphicLayerCat, "click", function(evt){
	        		var value = Ext.getCmp("pollutionSelect").value;
	        		if(value == 11 || value == 22){
	        			return;
	        		}else{
	        			PollSelectedFocus(evt.graphic.attributes.CAT_DID);
	        		}
	        		
	        		
	        	});
	        	
	        	on(me.pollutionGraphicLayerCat, "mouse-out", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		//polySymbol[0].setAttribute("opacity", me.initOpacity);
	        		var attrs = evt.graphic.attributes;
	        		me.setPolyFillColor(polySymbol[0], attrs.color);
	        		
	            	// 범례 스타일 설정
	        		var range = evt.graphic.attributes.range;
	        		me.setAttributeLegend("off", range);
	        	});
	        	/* 폴리곤 그래픽 이벤트 끝 */
	        	
	        	/* 이미지 그래픽 이벤트 */
	        	on(me.pollutionbarImgGraphicLayer, "mouse-over", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		//polySymbol[0].setAttribute("opacity", me.mouseOverOpacity);
	        		me.setPolyFillColor(polySymbol[0], me.mouseOverColor);
	        		
	        		// 범례 스타일 설정
	        		var range = evt.graphic.attributes.range;
	        		me.setAttributeLegend("on", range);
	        	});
	        	
	        	on(me.pollutionbarImgGraphicLayer, "mouse-out", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		//polySymbol[0].setAttribute("opacity", me.initOpacity);
	        		var attrs = evt.graphic.attributes;
	        		me.setPolyFillColor(polySymbol[0], attrs.color);
	        		
	        		// 범례 스타일 설정
	        		var range = evt.graphic.attributes.range;
	        		me.setAttributeLegend("off", range);
	        	});
	        	/* 이미지 그래픽 이벤트 끝 */
	        	
	        	/* 라벨 그래픽 이벤트 */
	        	on(me.pollutionLabelLayerCat, "graphic-draw", function(evt){
	        		
	        		//////////console.info(evt);
	        		var attrs = evt.graphic.attributes,
	        			range;
	        		
                    range = attrs.range
                    
                    // 라벨 id 셋팅
                    evt.node.setAttribute("id", "labelSymbol_" + attrs.CAT_DID);
                    
                    // 범례와 연계하기 위해 클래스 지정 (가상)
                    evt.node.setAttribute("class", "labelSymbol_" + range);
	        	});

	        	on(me.pollutionLabelLayerCat, "mouse-over", function(evt){
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		//polySymbol[0].setAttribute("opacity", me.mouseOverOpacity);
	        		me.setPolyFillColor(polySymbol[0], me.mouseOverColor);
	        		
	        		// 범례 스타일 설정
	        		var range = evt.graphic.attributes.range;
	        		me.setAttributeLegend("on", range);
	        	});
	        	
	        	on(me.pollutionLabelLayerCat, "mouse-out", function(evt){
	        		
	        		var polySymbol = $("#polySymbol_" + evt.graphic.attributes.CAT_DID);
	        		//polySymbol[0].setAttribute("opacity", me.initOpacity);
	        		var attrs = evt.graphic.attributes;
	        		me.setPolyFillColor(polySymbol[0], attrs.color);
	        		
	        		// 범례 스타일 설정
	        		var range = evt.graphic.attributes.range;
	        		me.setAttributeLegend("off", range);
	        	});
	        	/* 라벨 그래픽 이벤트 끝 */
	        	
	        	/* 원형 그래픽 이벤트 */
	        	on(me.circleGraphicLayer, "graphic-draw", function(evt){
	        		
	        		//////////console.info(evt);
	        		var attrs = evt.graphic.attributes,
	        			range;
	        		
                    range = attrs.range;
                    
                    // 집수구역별 오염원 원형 그래픽 스타일 셋팅
                    me.setAttributeInit(evt.node, "polySymbol_" + attrs.CAT_DID, getCatRangeColor(range));
	        	});
	        	/* 원형 그래픽 이벤트 끝 */
	        	
	        	// 집수구역 오염원 폴리곤 레이어 추가
	        	$KRF_APP.coreMap.map.addLayer(me.pollutionGraphicLayerCat);
	        	
	        	// 집수구역 오염원 원형 레이어 추가 (사용안함)
	        	me.circleGraphicLayer.setVisibility(false);
	        	$KRF_APP.coreMap.map.addLayer(me.circleGraphicLayer);
	        	
	        	// 집수구역 오염원 이미지 레이어 추가
	        	$KRF_APP.coreMap.map.addLayer(me.pollutionbarImgGraphicLayer);
	        	
	        	// 집수구역 오염원 라벨 레이어 추가
	        	$KRF_APP.coreMap.map.addLayer(me.pollutionLabelLayerCat);
	        	
	        	/* 레전드 그리기 */
	        	me.createLegend(quantizeObj,unint);
	        });
		});
    },
    
    // 레전드 그리기
    createLegend: function(quantizeObj,unint){
    	
    	var me = this;
    	// 레전드 윈도우 생성
    	var tmLegendWindow = Ext.create("krf_new.view.map.TMLegendWindow");
    	
    	var cContainer = Ext.getCmp("center_container");
    	
    	// 레전드 윈도우 보이기
    	cContainer.add(tmLegendWindow);
    	
    	tmLegendWindow.show();
    	require(["dojo/dom",
		         "dojo/_base/array",
		         "dojo/number"],
		        function(dom,
		        		 array,
		        		 number){
    		
    		var swatchTemplate =
                '<div style="height:20px; width: 300px; border:1px solid transparent; padding-left: 10px;">' +
                	'<div class="tmLegendSymbol_${range}" borderColor="${borderColor}" style="width:82px; height:20px; ${borderStyle} float: left;">' +
                        '<svg width="80" height="18" version="1.1" xmlns="https://www.w3.org/2000/svg">' +
                        	//'<path d="M 11 11 L 12 11 L 12 12 L 11 12 Z" data-classification="${classification}" />' +
                        	'<rect width="80" height="18" range="${range}" fillcolor="${fillColor}" class="tmLegendSymbol" style="fill:${fill};" />' +
                        '</svg>' +
                    '</div>' +
                    '<div style="width:10px; height:18px; float: left;">' +
                    '</div>' +
                    '<div range="${range}" fillcolor="${fillColor}" class="tmLegendSymbol" style="width:100px; height:18px; border:1px solid transparent; float: left;">' +
                    	'${label}' +
                    '</div>'+
                '</div>';

        	var html = "", inverted, data, legend = dom.byId("tmLegend");
        	
        	quantizeObj.sort(function(a, b){
        		return b.range - a.range;
        	});
        	
        	var chkCnt = 0;
        	
            array.forEach(quantizeObj, function (obj) {

            	if(obj.features[0] != undefined){
            		
	            	var fillColor = obj.features[0].attributes.color;
	            	var borderStyle = "";
	            	
	            	chkCnt++;
	            	
	            	if(chkCnt % 2 != 0){
	            		
	            		borderColor = me.basicColor;
	            		borderStyle = "border:1px solid " + borderColor + ";";
	            	}
	            	else{
	            		borderColor = me.middleColor;
	            		borderStyle = "border:1px solid " + borderColor + ";";
	            	}
	
	                data = {
	                		
	                    //label:number.format(obj.stVal, { places:0 }) + " - " + number.format(obj.edVal, { places:0 }),
	                	label:paddingLeft("&nbsp;", 8, number.format(obj.maxVal, { places:0 }))+unint,
	                	//label:obj.maxVal + " (명)",
	                    fill:fillColor,
	                    fillColor: fillColor,
	                    range:obj.range,
	                    borderColor: borderColor,
	                    borderStyle: borderStyle
	                };
	                
	                html += esri.substitute(data, swatchTemplate);
            	}
            });
            
            var windowHeight = (quantizeObj.length * 20) + 55;
            tmLegendWindow.setHeight(windowHeight);
            
            var windowY = Ext.getBody().getHeight() - tmLegendWindow.getHeight();
            tmLegendWindow.setY(windowY);
            
            legend.innerHTML = legend.innerHTML + html;
            
            var tmLegendSymbol = dojo.query("#tmLegend .tmLegendSymbol");
            
            tmLegendSymbol.on("mouseover", function(evt){
            	
            	var range = evt.target.getAttribute("range");
            	
            	// 범례 스타일 설정
        		me.setAttributeLegend("on", range);
            	
            	// 폴리곤 투명도 조절
            	var polySymbol = $(".polySymbol_" + range);
            	
            	for(var i = 0; i < polySymbol.length; i++){
            		
            		//polySymbol[i].setAttribute("opacity", me.mouseOverOpacity);
            		me.setPolyFillColor(polySymbol[i], me.mouseOverColor);
            	}
            });
            
            tmLegendSymbol.on("mouseout", function(evt){
            	
            	//////////console.info(evt);
            	var range = evt.target.getAttribute("range");
            	var fillColor = evt.target.getAttribute("fillcolor");
            	//////////console.info(fillColor);
            	// 범례 스타일 설정
        		me.setAttributeLegend("off", range);
            	
            	// 폴리곤 투명도 조절
            	var polySymbol = $(".polySymbol_" + range);
            	
            	for(var i = 0; i < polySymbol.length; i++){
            		
            		//polySymbol[i].setAttribute("opacity", me.initOpacity);
	        		me.setPolyFillColor(polySymbol[i], fillColor);
            	}
            });
            
            /*tmLegendSymbol.on("click", function(evt){
            	
            	//////////console.info(evt);
            	var range = evt.target.getAttribute("range");
            	var polySymbol = $(".polySymbol_" + range);
            	
            	for(var i = 0; i < polySymbol.length; i++){
            		
            		//polySymbol[i].setAttribute("stroke", "rgb(0, 150, 150)");
            		//polySymbol[i].setAttribute("stroke-width", "5");
            		//polySymbol[i].setAttribute("box-shadow", "0 0 5px 5px rgb(0, 0, 100)");
            		//polySymbol[i].setAttribute("opacity", "1");
            	}
            });*/
    	});
    },
    
    setAttributeLegend: function(onOff, range){
    	
    	var me = this;
    	
    	var legendDiv = $("#tmLegend .tmLegendSymbol_" + range);
    	
    	if(legendDiv[0] != undefined){
    		
	    	var borderColor = legendDiv[0].getAttribute("borderColor");
	    	
	    	if(onOff == "on"){
	        	legendDiv[0].style.border = "1px solid " + me.overColor;
	    	}
	    	else{
	        	legendDiv[0].style.border = "1px solid " + borderColor;
	    	}
    	}
    },
    
    // 기본 스타일 셋팅
    setAttributeInit: function(el, id, color){
    	
    	
    	var me = this;
    	
    	if(el != undefined && el != null){
    		
    		if(id != ""){
    			el.setAttribute("id", id);
    		}
    		if(color != ""){
    			el.setAttribute("color", color);
    		}
    		el.setAttribute("fill", "currentColor");
    		el.setAttribute("opacity", me.initOpacity);
    		el.setAttribute("stroke", "black");
    		el.setAttribute("stroke-width", "1");
    		el.setAttribute("stroke-opacity", "1");
    		el.setAttribute("stroke-linecap", "round");
    		el.setAttribute("stroke-linejoin", "round");
    	}
    },
    // 폴리곤 필 칼라 셋팅
    setPolyFillColor: function(el, color){
    	if(el != undefined && el != null){
    		el.setAttribute("fill", color);
    	}
    }
});