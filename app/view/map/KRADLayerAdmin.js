Ext.define("krf_new.view.map.KRADLayerAdmin", {
	
	kradServiceUrl: "",
	
	map: null,
	popup: null,
	mapClickObj: null,
	mapClickEvt: null,
	btnObj: null,
	btnId: "",
	drawOption: "",
	eventType: "", // 이벤트 타입 (Reach, Point, Line 등)
	stEvtArr: [], // 시작위치 이벤트 그래픽 배열
	edEvtArr: [], // 끝위치 이벤트 그래픽 배열
	stEvtTypes: [], // 시작위치 이벤트 타입 (Reach, Point, Line 등)
	edEvtTypes: [], // 끝위치 이벤트 타입 (Reach, Point, Line 등)
	clickedReachLines: [], // 최초 클릭된(맵 클릭시마다) 리치라인 배열
	rchIds: [], // 최초 클릭된(맵 클릭시마다) 리치 아이디 배열
	stRchIds: [], // 시작위치 리치 아이디 배열
	stRchDids: [], 
	edRchIds: [], // 끝위치 리치 아이디 배열
	edRchDids: [],
	arrDownGrp: [], // 하류 그래픽 배열
	arrLineGrp: [], // 리치라인 그래픽 배열
	arrAreaGrp: [], // 집수구역 그래픽 배열
	arrCommGrp: [], // 공통하류 배열
	tmpEvtLineGrp: [], // KRAD 라인 이벤트 임시 배열
	arrEvtLineGrp: [], // KRAD 라인 이벤트 그래픽 배열
	
	cmDnRchDid: [], // 양지점 공통으로 만나는 하류지점
	cmRiRchDid: [], // 양지점 공통으로 만나는 하류지점 오른쪽 상류
	cmLeRchDid: [], // 양지점 공통으로 만나는 하류지점 왼쪽 상류
	
	isNotBon: false, //공통하루에 시작지점이 존재함
	isNotBon1: false, //공통하루에 시작지점이 존재함
	isNotBon2: false, //공통하루에 시작지점이 존재함
	
	realTimeStBtnChk: true,
	realTimeEnBtnChk: true,
	
	arrDownGrpStart: "",
	arrDownGrpStartBon: "",
	arrDownGrpEnd: "",
	arrDownGrpEndBon: "",
	
	arr1RRchDid:"",
	arr1LRchDid:"",
	arr2RRchDid:"",
	arr2LRchDid:"",
	
	bonLine : [],
	
	bonStLine : "",
	bonEnLine : "",
	
	clickFS: [],
	
	falseDid1: "",
	falseDid2: "",
	
	downGrpLayer: null, // 하류 그래픽
	tmpGrpLayer: null, // 임시 그래픽 레이어
	symGrpLayer: null, // 심볼 그래픽 레이어
	lineGrpLayer: null, // 리치라인 그래픽 레이어
	areaGrpLayer: null, // 집수구역 그래픽 레이어
	
	stSymbol: null, // 시작위치 심볼
	edSymbol: null, // 끝위치 심볼
	
	reachLineSym: null, // 리치 라인 심볼
	reachAreaSym: null, // 리치 집수구역 심볼
	
	overSymbol_P: null, // 마우스 오버 심볼 포인트
	drawSymbol_P: null, // krad point 심볼
	overSymbol_L: null, // 마우스 오버 심볼 라인
	tempSymbol_L: null, // 임시 drow 심볼
	drawSymbol_L: null, // krad line 심볼
	drawSymbol_A: null, // krad area 심볼
	drawSymbol_D: null, // 하류 심볼
	
	kradInfo: [],
	
	isShowPopup: false, // 팝업 오픈 여부
	isSearchStop: false, // 검색 종료 플래그
	clickPopBtnId: "", // 클릭된 컨텍스트 메뉴 버튼 아이디
	
	searchConfigInfoJson: null, // 검색설정 JSON
	
	constructor: function(map) {
		
		var me = this;
        me.map = map;
        
		me.setKRADInfo();
		
		me.setDynamicLayer();
		
		require(["esri/symbols/SimpleMarkerSymbol",
		         "esri/symbols/SimpleLineSymbol",
		         "esri/symbols/SimpleFillSymbol",
		         "dojo/_base/Color",
		         "esri/layers/GraphicsLayer",
		         "esri/symbols/PictureMarkerSymbol"],
				function(SimpleMarkerSymbol,
						SimpleLineSymbol,
						SimpleFillSymbol,
						Color,
						GraphicsLayer,
						PictureMarkerSymbol){
			
			me.drawSymbol_P = new SimpleMarkerSymbol();
			me.drawSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.drawSymbol_P.setSize(10);
			me.drawSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.overSymbol_P = new SimpleMarkerSymbol();
			me.overSymbol_P.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
			me.overSymbol_P.setSize(20);
			me.overSymbol_P.setColor(new Color([255,0,0,1]));
			
			me.overSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 8);
			me.tempSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 5);
			me.drawSymbol_L = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 5);
			
			me.drawSymbol_D = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 0, 0.5]), 5); // 하류 심볼
			
			me.drawSymbol_A = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2), new Color([0, 0, 255, 0.3]));
			me.drawSymbol_empty = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 255]), 2);

			me.stSymbol = new PictureMarkerSymbol({
	 		    "angle": 0,
	 		    "yoffset": 14,
	 		    "type": "esriPMS",
	 		    "url": "./resources/images/symbol/btn_start01.png",
	 		    "contentType": "image/png",
	 		    "width": 20,
	 		    "height": 28
	 		});
			
			me.edSymbol = new PictureMarkerSymbol({
			    "angle": 0,
			    "yoffset": 14,
			    "type": "esriPMS",
			    "url": "./resources/images/symbol/btn_end01.png",
			    "contentType": "image/png",
			    "width": 20,
			    "height": 28
			});
			
			me.reachLineSym = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
			me.reachAreaSym = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([0, 0, 0]), 2),
					new Color([255, 255, 0, 0.3]));
			
			me.downGrpLayer = new GraphicsLayer();
			me.downGrpLayer.id = "downGrpLayer";
			me.downGrpLayer.visible = true;
			me.map.addLayer(me.downGrpLayer);
			
			me.lineGrpLayer = new GraphicsLayer();
			me.lineGrpLayer.id = "lineGrpLayer";
			me.lineGrpLayer.visible = true;
			me.map.addLayer(me.lineGrpLayer);
			
			me.areaGrpLayer = new GraphicsLayer();
			me.areaGrpLayer.id = "areaGrpLayer";
			me.areaGrpLayer.visible = true;
			me.map.addLayer(me.areaGrpLayer);
			
			me.tmpGrpLayer = new GraphicsLayer();
			me.tmpGrpLayer.id = "tmpGrpLayer";
			me.tmpGrpLayer.visible = true;
			me.map.addLayer(me.tmpGrpLayer);
			
			me.symGrpLayer = new GraphicsLayer();
			me.symGrpLayer.id = "symGrpLayer";
			me.symGrpLayer.visible = true;
			me.map.addLayer(me.symGrpLayer);
		});
    },
    
    clickCnt: function(clickType){
    	var me = this;
    	
    	var reachClose = Ext.getCmp('reach_close');
    	reachClose.setVisible(true);
    	
    	if(me.clickFS.length != 0){
    		for(var i = 0 ; i < me.clickFS.length ; i++){
    			
    			if(clickType == "startPoint"){
    				if(me.clickFS[i] == "startPoint"){
        				alert("시작지점이 존재합니다");
        				me.realTimeStBtnChk = false;
        			}
    			}
    			if(clickType == "endPoint"){
    				if(me.clickFS[i] == "endPoint"){
        				alert("끝지점이 존재합니다.");
        				me.realTimeEnBtnChk = false;
        			}
    			}
    		}
    		
    		if(me.realTimeStBtnChk && me.realTimeEnBtnChk){
    			if(clickType == "startPoint"){
					realTimeStBtnChk = true;
	    		}else if(clickType == "endPoint"){
	    			realTimeEnBtnChk = true;
	    		}
	    		me.clickFS.push(clickType);
    		}
    	}else{
    		if(clickType == "startPoint"){
				realTimeStBtnChk = true;
    		}else if(clickType == "endPoint"){
    			realTimeEnBtnChk = true;
    		}
    		me.clickFS.push(clickType);
    	}
    },
    
    setKradOnOff: function(kradLayer){
    	var me = this;
    	me.dynamicLayer.setVisibleLayers(kradLayer);
    },
    
    setDynamicLayer: function(){
    	
    	var me = this;
    	me.dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(me.kradServiceUrl);
		me.dynamicLayer.id = "kradLayerAdmin"; // view.west.WestTabLayer의 각 탭 페이지 id와 일치시키자..
		me.dynamicLayer.visible = true;
		me.map.addLayer(me.dynamicLayer);
		me.dynamicLayer.setVisibleLayers([-1]);
		
    },
    setKRADInfo: function(){
    	
    	var me = this;
    	
    	me.kradServiceUrl = $KRF_DEFINE.kradMapservicUrl;
    },
    // Context Menu 팝업 생성
    showPopup: function(){
    	
    	var me = this;
    	
    	var x = me.mapClickEvt.x + 10;
    	var y = me.mapClickEvt.y;
    	
    	var bodyWidth = Ext.getBody().getWidth();
    	var bodyHeight = Ext.getBody().getHeight();
    	var popWidth = 80;
    	var popHeight = 120;
    	
    	if(x > bodyWidth - popWidth){
    		x = bodyWidth - popWidth - 10;
    	}
    	
    	if(y > bodyHeight - popHeight){
    		y = bodyHeight - popHeight - 10;
    	}
    	
    	// 팝업 닫기
    	me.closePopup();
    	
    	if(me.popup == undefined || me.popup == null){
    		
			me.popup = Ext.create("KRF_DEV.view.krad.kradEvtPop", {
				id: "kradEvtPop",
				width: popWidth,
				height: popHeight,
				x: x,
				y: y
			}).show();
    	}
    },
    closePopup: function(){
    	
    	if(this.popup != undefined && this.popup != null){
    		
    		this.popup.close();
    		this.popup = null;
    	}
    },
    /* 맵 클릭 이벤트 켜기
     * [params drawOption]	: 그리기 옵션 ("startPoint", "endPoint", "" 등)
     * [params isShowPopup]	: 컨텍스트 메뉴 팝업 보이기 여부 */
    onMapClickEvt: function(drawOption, btnId){
    	
    	initKradEvt();
    	
    	var me = this;
    	
    	if(drawOption != undefined && drawOption != null && drawOption != ""){
    		me.drawOption = drawOption;
    	}
    	
    	/* 버튼 On, Off */
    	if(btnId != undefined && btnId != null && btnId != ""){
    		if(drawOption!="startPoint" && drawOption!="endPoint"){
    			
    			me.btnObj = SetBtnOnOff(btnId);
    		}else{
    			if(me.btnObj!=null){
    				
    				if(btnId!=me.btnId){
    					if(Ext.getCmp(btnId).btnOnOff=="off"){
    						me.btnObj =	SetBtnOnOff(btnId,"on");
    					}else{
    						return;
    					}
    				}else{
    					//같은 버튼 클릭했을 떄
    					return;
    				}
    			}else{
    				//처음 버튼 눌렀을 때
    				me.btnObj = SetBtnOnOff(btnId);
    			}
    		}
    	}
    	me.btnId = btnId;
    	
    	var isMapClickEvt = false;
    	me.isShowPopup = false;
    	
    	if(me.btnObj != undefined && me.btnObj != null){
    		
	    	/* 커서 설정 */
	    	if(me.btnObj.btnOnOff == "on"){
	    		isMapClickEvt = true;
	    		me.isShowPopup = true;
	    		Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/'+me.drawOption+'.cur),auto');
	    	}
	    	/* 커서 설정 끝 */
	    	
	    	if(isMapClickEvt == true){
		    	/* 클릭 이벤트 설정 */
		    	require(["dojo/on"],
						function(on){
		    		
		    		/* 지도 이동을 염두에 두고 down일때 이벤트 지정 */
		    		me.mapMdownObj = on(me.map, "mouse-down", function(evt){
		    			
		    			if((evt.which && evt.which == 3) || (evt.button && evt.button == 2)){
			    		} else{ // 오른클릭이 아닐때만 이벤트 입력
		    				me.mapClickEvt = evt;
		    			}
		    		});
		    		
			    	me.mapClickObj = on(me.map, "mouse-up", function(evt){
			    		
			    		if(me.mapClickEvt != undefined && me.mapClickEvt != null){
			    			
				    		if(me.mapClickEvt.x != evt.x || me.mapClickEvt.y != evt.y){
				    			
				    			// 지도 이동 시 팝업 띄우지 않는다. 해당 리치 정보도 담지않는다. me.setRchIdsWithEvent();, me.showPopup(); 안들어가게..
				    			me.isShowPopup = false;
				    		} else{
				    			
				    			if(me.map.getLevel() < 11){
				    				alert("현재 축척에서는 지원되지 않습니다. 확대해주세요.");
				    				// 이벤트 초기화
				    				initKradEvt();
				    				me.isShowPopup = false;
				    				SetBtnOnOff(btnId, "off");
				    				return;
				    			} else{
				    				me.isShowPopup = true;
				    			}
				    		}
			    		}
			    		
			    		if((evt.which && evt.which == 3) || (evt.button && evt.button == 2)){
			    		} else{
			    			// 검색설정 JSON 셋팅 (_krad.searchConfigInfoJson)
			    			me.getSearchConfigInfo();
			    			
			    			/* 검색설정 "상류" 체크 시 */
			    			if($KRF_APP.coreMap._krad.searchConfigInfoJson.isUpDraw == true){
			    				
			    				$KRF_APP.coreMap._rchUpSearch.searchWithEvent(evt);
			    				// 종료 검색 체크
			    				me.isStopCheck();
			    			} else{ /* 검색설정 "상류" 체크 시 끝 */
			    				
			    				if(me.isShowPopup == true){
					    			me.setRchIdsWithEvent();
					    		} else{
					    			me.closePopup();
					    		}
			    			}
			    		}
			    	});
		    	});
		    	/* 클릭 이벤트 설정 끝 */
	    	} else{
	    		me.closePopup();
	    	}
    	}
    },
    /* 맵 클릭 이벤트 끄기 */
    offMapClickEvt: function(){
    	
    	var me = this;
    	
    	if(me.mapMdownObj != undefined && me.mapMdownObj != null){
    		me.mapMdownObj.remove();
    		me.mapMdownObj = null;
    	}
    	
    	if(me.mapClickObj != undefined && me.mapClickObj != null){
			me.mapClickObj.remove();
			me.mapClickObj = null;
		}
    },
    onMapDragEvt: function(drawOption, btnId){
    	
    	initKradEvt();
    	
    	var me = this;
    	
    	if(drawOption != undefined && drawOption != null && drawOption != ""){
    		
    		me.drawOption = drawOption;
    	}
    	
    	/* 버튼 On, Off */
    	if(btnId != undefined && btnId != null && btnId != ""){
    		
    		me.btnObj = SetBtnOnOff(btnId);
    	}
    	
    	me.isShowPopup = false;
    	
    	$KRF_APP.global.Obj.showSimpleTooltip("선택할 영역을 드래그하세요.");
    	var isLevel = false;
    	require(["esri/toolbars/draw",
	         "dojo/on"], function(Draw, on, bundle){
    		
    		var mapClickObj = on(me.map, "mouse-up", function(evt){
    			
        		if(me.map.getLevel() < 11){
    				mapClickObj.remove();
    				return;
    			}
        	});
    		
    		var selectionToolbar = new Draw(me.map, { showTooltips: false });
    		
    		if(me.drawOption == "extent"){
    			selectionToolbar.activate(Draw.EXTENT);
    		} else if(me.drawOption == "circle"){
    			selectionToolbar.activate(Draw.CIRCLE);
    		}
    		
    		on(selectionToolbar, "DrawEnd", function (evt) {
    			if(me.map.getLevel() < 11){
    				alert("현재 축척에서는 지원되지 않습니다. 확대해주세요.");
    			}else{
    				me.mapClickEvt = evt;
    				me.setRchIdsWithEvent();
    			}
    			selectionToolbar.deactivate();
    			SetBtnOnOff(btnId, "off");
    			$KRF_APP.global.Obj.hideSimpleTooltip();
    		});
    	});
    },
    offMapDragEvt: function(){
    	$KRF_APP.global.Obj.hideSimpleTooltip();
    },
    /* 이벤트(클릭, 드래그 등)로 리치라인에서 리치아이디 가져오기
     * 이벤트에 리치라인이 포함되지 않으면 집수구역 조회
     * 조회 완료 후 컨텍스트 메뉴 팝업 오픈 */
    setRchIdsWithEvent: function(){
    	
    	var me = this;
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/geometry/Point",
    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
    		
	    	var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			if(me.mapClickEvt == undefined || me.mapClickEvt == null){
				
				alert("클릭 이벤트가 지정되지 않았습니다.");
				return;
			}
			
			if((me.mapClickEvt.type != undefined && me.mapClickEvt.type == "point") || 
			   (me.mapClickEvt.mapPoint != undefined && me.mapClickEvt.mapPoint.type != undefined && me.mapClickEvt.mapPoint.type == "point")){
				
	        	var centerPoint = new Point(me.mapClickEvt.mapPoint.x, me.mapClickEvt.mapPoint.y, me.mapClickEvt.mapPoint.spatialReference);
	        	var mapWidth = me.map.extent.getWidth();
	        	var pixelWidth = mapWidth / me.map.width;
	        	var tolerance = 10 * pixelWidth;
	        	
	        	var queryExtent = new Extent(1, 1, tolerance, tolerance, me.mapClickEvt.mapPoint.spatialReference);
	        	query.geometry = queryExtent.centerAt(centerPoint);
	    	} else{
				if(me.mapClickEvt.mapPoint != undefined && me.mapClickEvt.mapPoint != null){
					query.geometry = me.mapClickEvt.mapPoint;
				}
				else{
					query.geometry = me.mapClickEvt;
				}
			}
			
			me.rchIds = [];
			me.clickedReachLines = [];
			
			// 이벤트로 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length > 0){
					me.execLineFeature(featureSet);
				} else{
					
					var areaQueryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
					var areaQuery = new Query();
					areaQuery.returnGeometry = true;
					areaQuery.outFields = ["*"];
					areaQuery.geometry = query.geometry;
					
					// 이벤트로 집수구역 조회
					areaQueryTask.execute(areaQuery, function(areaFS){
						
						if(areaFS.features.length > 0){
							
							var lineQueryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
							var lineQuery = new Query();
							lineQuery.returnGeometry = false;
							lineQuery.outFields = ["*"];
							lineQuery.where = "CAT_DID IN (";
							
							for(var i = 0; i < areaFS.features.length; i++){
								lineQuery.where += "'" + areaFS.features[i].attributes.CAT_DID + "', ";
							}
							
							lineQuery.where = lineQuery.where.substring(0, lineQuery.where.length - 2) + ")";
							// 조건으로 리치라인 조회
							lineQueryTask.execute(lineQuery, function(lineFS){
								
								if(lineFS.features.length > 0){
									me.execLineFeature(lineFS);
								} else{
									alert("해당 구역에 리치라인을 찾을 수 없습니다.");
								}
							});
						}
					});
				}
			});
    	});
    },
    execLineFeature: function(featureSet){
    	var me = this;
    	
        if(me.drawOption == "endPoint" || me.drawOption == "startPoint"){
        	
        	var feature = featureSet.features[0];
        	
        	me.rchIds.push(feature.attributes.RCH_ID);
			me.clickedReachLines.push(feature); // 최초 클릭된(맵 클릭시마다) 리치라인 배열
		
			if($KRF_APP.coreMap._krad.kradInfo.length == 0){
				me.setClickEvt($KRF_APP.coreMap._krad.mapClickEvt, "Reach");
				// 이벤트 초기화
				initKradEvt();
			} else{
				me.showPopup();
			}
        }else{

        	for(var i = 0; i < featureSet.features.length; i++){
        		
        		var feature = featureSet.features[i];
    			
        		if(me.drawOption == "addPoint" || me.drawOption == "extent" || me.drawOption == "circle"){
        			
        			var catDid = feature.attributes.CAT_DID;
        			
        			// 그래픽 그리기
        			me.drawGraphic(feature, "reachLine");
        			// 집수구역 그리기
        			me.setReachArea(catDid);
        			// 버튼 끄기
        			SetBtnOnOff(me.btnObj.id, "off");
        			// 이벤트 초기화
    				initKradEvt();
        		} else if(me.drawOption == "removePoint"){
        			
    				// 라인 지운다
    				me.removeGraphic(feature, "reachLine");
    				// 집수구역 지운다
    				me.removeGraphic(feature, "reachArea");
        			// 버튼 끄기
        			SetBtnOnOff(me.btnObj.id, "off");
        			// 이벤트 초기화
    				initKradEvt();
    			}
    		}
        }
        
    	if(me.drawOption == "addPoint" || me.drawOption == "extent" || me.drawOption == "circle" || me.drawOption == "removePoint"){
	    	// 검색 종료 체크
			me.isStopCheck();
    	}
    },
    drawTempGrp: function(paramEvtType){
    	
    	var me = this;
    	
    	// 템프 그래픽 이벤트 끄기
    	me.offTmpGrpEvt();
    	
    	// 이벤트 타입 설정 (Point, Line 등)
    	me.eventType = paramEvtType;
    	
    	require(["esri/tasks/QueryTask",
		         "esri/tasks/query",
		         "esri/layers/GraphicsLayer",
		         "dojo/on"],
		         function(QueryTask,
		        		 Query,
		        		 GraphicsLayer,
		        		 on){
    		
	    	for(var i = 0; i < me.kradInfo.length; i++){
	
    			var extDataId = me.kradInfo[i].EXT_DATA_ID;
    			var eventType = me.kradInfo[i].EVENT_TYPE;
    			var layerId = "";
    			var qWhere = "";
    			
    			if(eventType == paramEvtType){
    				
    				if(paramEvtType == "Point"){
    					layerId = me.kradInfo[i].PE_LAYER_ID;
    				}
    				
    				if(paramEvtType == "Line"){
    					layerId = me.kradInfo[i].LO_LAYER_ID;
    				}
    				
    				qWhere = "EXT_DATA_ID = '" + extDataId + "' AND RCH_ID IN (";
    				
    				for(var idCnt = 0; idCnt < me.rchIds.length; idCnt++){
    					qWhere += "'" + me.rchIds[idCnt] + "', ";
    				}
    				
    				qWhere = qWhere.substring(0, qWhere.length - 2) + ")";
				}
    			
    			if(layerId == null || layerId == ""){
    				continue;
    			}
				
				var queryTask = new QueryTask(me.kradServiceUrl + "/" + layerId);
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["*"];
				query.where = qWhere;
				queryTask.execute(query, function(featureSet){
					
					var features = featureSet.features;
					
					if(features != undefined && features.length > 0){
						
						for(var fCnt = 0; fCnt < features.length; fCnt++){
							
							var graphic = features[fCnt];
							
							if(paramEvtType == "Point"){
								
								graphic.setSymbol(me.drawSymbol_P);
								me.tmpGrpLayer.add(graphic);
							}
							
							if(paramEvtType == "Line"){
								
								var extId = graphic.attributes.EXT_DATA_ID;
								var orgId = graphic.attributes.ORG_ID;
								
								var kInfoIdx = me.kradInfo.map(function(obj){
									return obj.EXT_DATA_ID;
								}).indexOf(extId);
								
								if(kInfoIdx > -1){
									var queryTaskLine = new QueryTask(me.kradServiceUrl + "/" + me.kradInfo[kInfoIdx].LO_LAYER_ID);
									var queryLine = new Query();
									queryLine.returnGeometry = true;
									queryLine.outFields = ["*"];
									queryLine.where = "EXT_DATA_ID = '" + extId + "' AND ORG_ID = " + orgId;
									
									queryTaskLine.execute(queryLine, function(lineSet){
										
										me.tmpEvtLineGrp = [];
										
										for(var fCnt2 = 0; fCnt2 < lineSet.features.length; fCnt2++){
											
											lineSet.features[fCnt2].setSymbol(me.tempSymbol_L);
											me.tmpGrpLayer.add(lineSet.features[fCnt2]);
											
											var eIdx = me.tmpEvtLineGrp.map(function(obj){
												return obj.attributes.LINE_EVENT_ID;
											}).indexOf(lineSet.features[fCnt2].attributes.LINE_EVENT_ID);
											
											if(eIdx == -1){
												
												lineSet.features[fCnt2].attributes.drawOption = me.drawOption;
												me.tmpEvtLineGrp.push(lineSet.features[fCnt2]);
											}
										}
									});
								}
							}
						}
					}
				});
	    	}
    	});
    	// KRAD 이벤트 생성
		me.onTmpGrpEvt(paramEvtType);
    },
    // 임시 그래픽 레이어 (tmpGrpLayer) 이벤트 켜기
    onTmpGrpEvt: function(paramEvtType){
    	
    	var me = this;
    	
    	require(["esri/tasks/QueryTask",
		         "esri/tasks/query",
		         "esri/layers/GraphicsLayer",
		         "dojo/on",
		         "esri/InfoTemplate"],
		         function(QueryTask,
		        		 Query,
		        		 GraphicsLayer,
		        		 on,
		        		 InfoTemplate){
    		
	    	me.mOverObj = on(me.tmpGrpLayer, "mouse-over", function(evt){
				
	    		if(paramEvtType == "Point"){
	    			
		    		var infoIdx = me.kradInfo.map(function(obj){
		    			return obj.EXT_DATA_ID;
		    		}).indexOf(evt.graphic.attributes.EXT_DATA_ID);
		    		
		    		var siteNm = evt.graphic.attributes.지점명 != undefined ? evt.graphic.attributes.지점명 : (evt.graphic.attributes.시설명 != undefined ? evt.graphic.attributes.시설명 : "");
		    		var siteAddr = evt.graphic.attributes.주소 != undefined ? evt.graphic.attributes.주소 : "";
		    		var siteCorp = evt.graphic.attributes.조사기관 != undefined ? evt.graphic.attributes.조사기관 : (evt.graphic.attributes.운영기관 != undefined ? evt.graphic.attributes.운영기관 : "");
		    		
		    		var infoTitle = "";
		    		if(infoIdx > -1){
		    			infoTitle = me.kradInfo[infoIdx].TITLE;
		    		}
		    		var infoContent = "지&nbsp;점&nbsp;&nbsp;명 : " + siteNm + "<br>";
		    		infoContent += "주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 : " + siteAddr + "<br>";
		    		infoContent += "운영기관 : " + siteCorp;
		    		
		    		var template = new InfoTemplate(infoTitle, infoContent);
		    		evt.graphic.setInfoTemplate(template)
		    		
		    		me.map.infoWindow.setContent(evt.graphic.getContent());
		    		me.map.infoWindow.setTitle(evt.graphic.getTitle());
		    		me.map.infoWindow.show(evt.screenPoint,
		    		me.map.getInfoWindowAnchor(evt.screenPoint));
		    		
		    		evt.graphic.setSymbol(me.overSymbol_P);
	    		} else if(paramEvtType = "Line"){
	    			
	    			var graphics = me.tmpEvtLineGrp;
	    			
	    			for(var i = 0; i < graphics.length; i++){
	    				graphics[i].setSymbol(me.overSymbol_L);
	    			}
	    		}
	    	});
		
			me.mOutObj = on(me.tmpGrpLayer, "mouse-out", function(evt){
				
				if(paramEvtType == "Point"){
					me.map.infoWindow.hide();
		    		evt.graphic.setSymbol(me.drawSymbol_P);
				} else if(paramEvtType == "Line"){
					
					var graphics = me.tmpEvtLineGrp;
	    			
	    			for(var i = 0; i < graphics.length; i++){
	    				graphics[i].setSymbol(me.tempSymbol_L);
	    			}
				}
	    	});
		
			me.mClickObj = on(me.tmpGrpLayer, "mouse-down", function(evt){
				// 변수 셋팅 및 하류조회
				me.setClickEvt(evt, paramEvtType);
	    	});
			
			/* 마우스 업 시 infowindow hidden */
			var mUpObj = on(me.map, "mouse-up", function(evt){
				
				var obj = me.map.infoWindow;
				var hCnt = 0;
				
				// 1초 체크
				var timerObj = window.setInterval(function(){
					obj.hide();
					hCnt++;
					if(hCnt > 10){
						window.clearInterval(timerObj);
						mUpObj.remove();
					}
				}, 100);
			});
    	});
    },
    // 임시 그래픽 레이어 (tmpGrpLayer) 이벤트 끄기
    offTmpGrpEvt: function(){
    	
    	var me = this;
    	
    	if(me.mOverObj != undefined && me.mOverObj != null){
    		me.mOverObj.remove();
    	}
    	
    	if(me.mOutObj != undefined && me.mOutObj != null){
    		me.mOutObj.remove();
    	}
    	
    	if(me.mClickObj != undefined && me.mClickObj != null){
    		me.mClickObj.remove();
    	}
    },
    // 변수 셋팅, 이벤트 끄기 및 하류조회
    setClickEvt: function(evt, eventType){
    	
    	var me = this;
    	
		// 임시 그래픽 이벤트 끄기 및 그래픽 삭제
		me.offTmpGrpEvt();
		// 맵클릭 이벤트 끄기
		$KRF_APP.coreMap._krad.offMapClickEvt();
    	
    	var geo = null;
		var rchIds = [];
		var siteNms = [];
		var rchId = "";
		var rchDid = "";
		var siteNm = "";
		
		if(eventType == "Point"){
			
			geo = evt.graphic.geometry;
			
			rchId = evt.graphic.attributes.RCH_ID;
			siteNm = evt.graphic.attributes.지점명 != undefined ? evt.graphic.attributes.지점명 :
				(evt.graphic.attributes.시설명 != undefined ? evt.graphic.attributes.시설명 : "");
			
			rchIds.push(rchId);
			siteNms.push(siteNm);
		} else if(eventType == "Line"){
			
			geo = evt.mapPoint;
			
			/* 선택 라인 배열에 넣기 2차 */
			me.arrEvtLineGrp.push(me.tmpEvtLineGrp);
			var graphics = me.tmpEvtLineGrp;
			
			graphics.sort(function(a, b){
				return a.attributes.EVENT_ORDER - b.attributes.EVENT_ORDER;
			});
			
			for(var i = 0; i < graphics.length; i++){
				
				// event order 처음(상류), 마지막(하류)만 셋팅
				if(i == 0 || i == graphics.length - 1){
					rchId = graphics[i].attributes.RCH_ID;
					rchIds.push(rchId);
					siteNms.push("");
				}
			}
		} else if(eventType == "Reach"){
			
			geo = me.mapClickEvt.mapPoint;
			
			var rIdx = me.clickedReachLines.length - 1;
			//console.info(me.clickedReachLines[rIdx].attributes);
			rchId = me.clickedReachLines[rIdx].attributes.RCH_ID;
			rchIds.push(rchId);
			rchDid = me.clickedReachLines[rIdx].attributes.RCH_DID;
			siteNm = me.clickedReachLines[rIdx].attributes.지점명 != undefined ? me.clickedReachLines[rIdx].attributes.지점명 :
				(me.clickedReachLines[rIdx].attributes.시설명 != undefined ? me.clickedReachLines[rIdx].attributes.시설명 : 
				(me.clickedReachLines[rIdx].attributes.RIV_NM != undefined ? me.clickedReachLines[rIdx].attributes.RIV_NM : ""));
			siteNms.push(siteNm);
		}
		
		me.drawSymbol(geo); // 심볼 그리기
		for(var i = 0; i < rchIds.length; i++){
			
			if(me.drawOption == "startPoint"){
				// 시작위치 하천명 셋팅
				SetStEdSiteName("start", siteNms[i]);
				
				// 시작위치 KRAD Event 배열 넣기
				me.stEvtArr.push(evt.graphic);
				
				// 시작위치 RCH_ID 배열 넣기
				me.stRchIds.push(rchIds[i]);
				
				if(rchDid != ""){
					
					var idx = me.stRchDids.indexOf(rchDid);
					if(idx == -1){
						me.stRchDids.push(rchDid);
					}
				}
				
				// 시작위치 이벤트 타입 배열 넣기 (Reach, Point, Line 등)
				me.stEvtTypes.push(eventType);
			}
			
			if(me.drawOption == "endPoint"){
				
				// 시작위치 하천명 셋팅
				SetStEdSiteName("end", siteNms[i]);
				
				// 끝위치 KRAD Event 배열 넣기
				me.edEvtArr.push(evt.graphic);
				
				// 끝위치 RCH_ID 배열 넣기
				me.edRchIds.push(rchIds[i]);
				
				if(rchDid != ""){
					
					var idx = me.edRchDids.indexOf(rchDid);
					if(idx == -1){
						me.edRchDids.push(rchDid);
					}
				}
				
				// 끝위치 이벤트 타입 배열 넣기 (Reach, Point, Line 등)
				me.edEvtTypes.push(eventType);
			}
			
			if(rchDid != ""){
				// 하류 및 공통하류 셋팅
				me.setDownAndComm([rchDid], [], 0, "RCH_DID");
				
			} else{
				// 하류 및 공통하류 셋팅
				me.setDownAndComm(rchIds, [], 0, "RCH_ID");
				
			}
		}
    },
    /* 심볼그리기 */
    drawSymbol: function(evt){
    	
    	var me = this;
    	
    	if(me.drawOption == "startPoint" || me.drawOption == "endPoint"){
    		
	    	require(["esri/graphic"], function(Graphic){
	    		
	    		var graphic = null;
	    		var btnId = null;
	    		
	    		if(me.drawOption == "startPoint"){
	    			btnId = "btnMenu04";
	    			graphic = new Graphic(evt, me.stSymbol);
	    		}
	    		if(me.drawOption == "endPoint"){
	    			btnId = "btnMenu05";
	    			graphic = new Graphic(evt, me.edSymbol);
	    		}
	    		
	    		me.symGrpLayer.add(graphic); // 그래픽 추가
	    		
	    		// 커서 디폴트
	        	Ext.get('_mapDiv__gc').setStyle('cursor','default');
	        	// 버튼 off
	        	SetBtnOnOff(btnId, "on");
	    	});
    	}
    },
    removeLastSymbol: function(){
    	
    	// 마지막 심볼 삭제
		this.symGrpLayer.remove(this.symGrpLayer.graphics[this.symGrpLayer.graphics.length - 1]);
    },
    chkGeoTrib: function(geoTrib){
    	
    	/** 검색설정(본류, 지류) 체크 **/
		var confInfo = localStorage['_searchConfigInfo_'];
		if(confInfo != undefined && confInfo != null){
			
			var jsonConf = JSON.parse(confInfo);
			
			// 지류검색이 아닐때
			if(jsonConf.isJiDraw == false){
				
				if(geoTrib != 0){
					
					return false;
				}
			}
		}
		
		return true;
		/** 검색설정(본류, 지류) 체크 끝 **/
    },
    /* 하류 및 공통하류 셋팅 */
    setDownAndComm: function(rchIds, tmpArr, cnt, colNm){
    	var me = this;
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"],
    	         function(Query,
    	        		 QueryTask){
    		
    		var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			query.where = colNm;
			
			query.where += " IN ("
			
			for(var i = 0; i < rchIds.length; i++){
				query.where += "'" + rchIds[i] + "', ";
			}
			
			query.where = query.where.substring(0, query.where.length - 2) + ")";
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				if(featureSet.features.length > 0){
					
					for(var fCnt = 0; fCnt < featureSet.features.length; fCnt++){
						
						var feature = featureSet.features[fCnt];
						var rchDid = feature.attributes.RCH_DID;
						var tmpIdx = tmpArr.map(function(obj){
							return obj.attributes.RCH_DID;
						}).indexOf(rchDid);
						if(tmpIdx == -1){
							
							cnt++;
							
							var isEndLD = false;
							var isEndRD = false;
							
							tmpArr.push(feature);
							
				    		var ldRchDid = feature.attributes.LD_RCH_DID;
				    		if(ldRchDid != undefined && ldRchDid.trim() != ""){
				    			// 좌측 하류 검색 (재귀호출)
					    		me.setDownAndComm([ldRchDid], tmpArr, cnt, "RCH_DID");
				    		} else{
				    			// 좌측하류 검색 종료
				    			isEndLD = true;
				    		}
				    		
				    		var rdRchDid = feature.attributes.RD_RCH_DID;
				    		if(rdRchDid != undefined && rdRchDid.trim() != ""){
				    			// 우측 하류 검색 (재귀호출)
					    		me.setDownAndComm([rdRchDid], tmpArr, cnt, "RCH_DID");
				    		} else{
				    			// 우측하류 검색 종료
				    			isEndRD = true;
				    		}
				    		
				    		// 좌/우측 하류 검색 종료 시
				    		if(isEndLD == true && isEndRD == true){
				    			
				    			/* 좌/우측 하류 동시 존재 시 한번만 입력되도록 push 플래그 설정 */
				    			var isPush = true;
				    			
				    			// 시작지점 끝지점이 동일할경우 break
				    			for(var dnCnt = 0; dnCnt < me.arrDownGrp.length; dnCnt++){
				    				if(me.arrDownGrp[dnCnt][0].attributes.RCH_DID == tmpArr[0].attributes.RCH_DID){
				    					isPush = false;
				    					break;
				    				}
				    			}
				    			/* 좌/우측 하류 동시 존재 시 한번만 입력되도록 push 플래그 설정 끝 */
				    			
				    			var lastIdx = -1;
				    			
				    			//시작지점 끝지점 루프돌면서 각 해당하는 리치아이디를 찾아낸다?? 만약없으면?
				    			for(var dnCnt = 0; dnCnt < me.arrDownGrp.length; dnCnt++){
				    				var isBreak = false;
				    				
				    				for(var tmpCnt = 0; tmpCnt < tmpArr.length; tmpCnt++){
				    					
				    					var tmpRchDid = tmpArr[tmpCnt].attributes.RCH_DID;
				    					var commIdx = me.arrDownGrp[dnCnt].map(function(obj){
				    						return obj.attributes.RCH_DID;
				    					}).indexOf(tmpRchDid);
				    					if(commIdx > -1){
				    						var cIdx = me.arrCommGrp.map(function(obj){
				    							return obj.attributes.RCH_DID;
				    						}).indexOf(tmpRchDid);
				    						
				    						if(cIdx == -1){
				    							
				    							// 좌/우측 하류 동시 존재 시 한번만 입력되도록..
				    							if(isPush == true){
				    								// 공통 하류 배열 담기..
				    								me.arrCommGrp.push(tmpArr[tmpCnt]);
				    							}
				    						}
				    						
				    						// tmpCnt : 좌/우 측 하류 번호    lastIdx : 동일 하류번호
				    						if(tmpCnt > lastIdx){
				    							
				    							lastIdx = tmpCnt;
				    						}
				    						//루프 멈춤
				    						isBreak = true;
				    						break;
				    					}
				    				}
				    				
				    				if(isBreak = true){
				    					break;
				    				}
				    			}
				    			
				    			if(lastIdx > -1){
				    				// 시작위치, 끝위치 선택 완료 시
					    			if(me.stRchIds.length > 0 && me.edRchIds.length > 0){
					    				for(var i = 0; i < me.arrCommGrp.length; i++){
					    					
						    				var commRchDid = me.arrCommGrp[i].attributes.RCH_DID;
						    				var commGeoTrib = me.arrCommGrp[i].attributes.GEO_TRIB;
						    				
						    				var isGeoTrib = me.chkGeoTrib(commGeoTrib);
						    				if(isGeoTrib == false){
						    					
						    					alert("선택된 시작위치, 끝위치 사이에 본류가 흐르지 않습니다.\r\n검색설정을 확인하세요.");
						    					// 마지막 심볼 삭제
						    					me.removeLastSymbol();
						    					return;
						    				} else{
						    					
						    					//공통 하류 rchDid 담기
			    								me.cmDnRchDid.push(tmpRchDid);
			    								
			    								//공통 하류 지점에 우측상류
			    								me.cmRiRchDid.push(tmpArr[tmpCnt].attributes.LU_RCH_DID);
			    								
			    								//공통 하류 지점에 좌측상류
			    								me.cmLeRchDid.push(tmpArr[tmpCnt].attributes.RU_RCH_DID);
			    								
			    								//공통 하류 지점에 좌/우 상류에 본류가 있는지 체크
			    								//me.searchGeoBonLine();
	    										// 상류 검색
						    					me.setReachUpLine(commRchDid, 0, false);
						    					
						    					// 종료 검색 체크
						    					me.isStopCheck();
						    				}
					    				}
					    			}
				    			} else{
				    				if(me.arrDownGrp.length > 0){
				    					alert("위치간 만나는 하류가 없습니다.");
				    					// 마지막 심볼 삭제
				    					me.removeLastSymbol();
				    					return;
				    				}
				    			}
				    			
				    			// 좌/우측 하류 동시 존재 시 한번만 입력되도록..
				    			if(isPush == true){
					    			// 하류 그래픽 배열에 담기
					    			me.arrDownGrp.push(tmpArr);
				    			}
				    		}
						}
					}
				}
			});
    	});
    },
    searchCnt: 0, // 검색 카운트
    
    /* 상류 리치라인 조회 및 그리기
     * rchDid: 검색될 리치 아이디(DID)
     * cnt: 상류검색 카운트 */
    setReachUpLine: function(rchDid, cnt){
    	
    	var me = this;    	
    	
    	/* 초기화 시 검색 종료 */
    	if(me.searchStopCheck(cnt) == false){ return false };
    	
    	me.searchCnt++; // 검색 카운트 증가

    	rchDid = rchDid.replace(/ /gi, "");
    	
    	if(rchDid == ""){
    		return;
    	}
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"],
    	         function(Query,
    	        		 QueryTask){
    		
	    	var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.where = "RCH_DID = '" + rchDid + "'";
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length > 0){
					
					var feature = featureSet.features[0];
					var rchId = feature.attributes.RCH_ID; //KRF 리치 아이디
					var rchDid = feature.attributes.RCH_DID; // 분활코드 아이디
					var catDid = feature.attributes.CAT_DID; //집수구역 분활코드
					var geoTrib = feature.attributes.GEO_TRIB; //하천차수
					
					var stIdx = me.stRchIds.indexOf(rchId); //시작위치 리치아이디	 
					var edIdx = me.edRchIds.indexOf(rchId);	//끝위치 리치아이디
					var stDidx = me.stRchDids.indexOf(rchDid);
					var edDidx = me.edRchDids.indexOf(rchDid);
					
					var fal1Did = me.falseDid1.indexOf(rchDid);
					var fal2Did = me.falseDid2.indexOf(rchDid);
					
					var kradUpDown = "";
					var evtType = "";
					var isSearch = false;
					
					/* 검색, 그리기 조건 설정 */
					var evtType = "";
					var arrIdx = -1; // 배열 인덱스
					var eLineIdx = -1; // 라인 이벤트 인덱스
					var dnIdx = -1;
					for(var i = 0; i < me.arrDownGrp.length; i++){
						
						// 하류 배열 인덱스
						dnIdx = me.arrDownGrp[i].map(function(obj){
							return obj.attributes.RCH_DID;
						}).indexOf(rchDid);
						if(dnIdx > -1){
							
							break;
						}
					}
					
					if(cnt == 0){
						
						if(me.clickFS[0] == "startPoint"){
							me.arrDownGrpStart = 0;
							me.arrDownGrpEnd = 1;
						}else if(me.clickFS[1] == "startPoint"){
							me.arrDownGrpStart = 1;
							me.arrDownGrpEnd = 0;
						}

		    			// 1.본류가 흐르는지 지류가 호르는지 찾는다 지류대  2.지류 대 지류 검색시 공통하류에서 좌측 / 우측 상류를 bonLine에 담는다.
	    				for(var arrList = 0 ; arrList < me.arrDownGrp[me.arrDownGrpStart].length; arrList ++){
	    					if(me.arrDownGrp[me.arrDownGrpStart][arrList].attributes.RCH_DID == me.cmRiRchDid ||
	    							me.arrDownGrp[me.arrDownGrpStart][arrList].attributes.RCH_DID == me.cmLeRchDid){ //공통하류의 오른쪽 상류 아이디
	    						me.bonStLine = me.arrDownGrp[me.arrDownGrpStart][arrList].attributes;
	    						if(me.arrDownGrp[me.arrDownGrpStart][arrList].attributes.GEO_TRIB == 0){
	    							me.isNotBon1 = false;
	    						}else{
	    							me.isNotBon1 = true;
	    						}
	    					}
	    				}
		    			
	    				for(var arrList2 = 0 ; arrList2 < me.arrDownGrp[me.arrDownGrpEnd].length; arrList2 ++){
	    					if(me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes.RCH_DID == me.cmRiRchDid ||
	    							me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes.RCH_DID == me.cmLeRchDid){  //공통하류의 왼쪽 상류 아이디
	    	    				
	    						me.bonEnLine = me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes;
	    	    				if(me.arrDownGrp[me.arrDownGrpEnd][arrList2].attributes.GEO_TRIB == 0){
	    							me.isNotBon2 = false;
	    						}else{
	    							me.isNotBon2 = true;
	    						}
	    					}
	    				}
		    			
		    			if(me.isNotBon1 == true && me.isNotBon2 == true){
		    				me.isNotBon = true;
		    			}else{
		    				me.isNotBon = false;
		    			}

						var startArrayCut = [];
						var endArrayCut = [];
						
		    			for(var a = 0;a < me.arrDownGrp[me.arrDownGrpStart].length;a++){
							if(me.arrDownGrp[me.arrDownGrpStart][a].attributes.GEO_TRIB == me.bonStLine.GEO_TRIB){
								
								startArrayCut.push(a);
							}
						}
		    			
		    			for(var b = 0;b < me.arrDownGrp[me.arrDownGrpEnd].length;b++){
							if(me.arrDownGrp[me.arrDownGrpEnd][b].attributes.GEO_TRIB == me.bonEnLine.GEO_TRIB){
								
								endArrayCut.push(b);
							}
						}
		    			
		    			var linefalse1 = false;
						var linefalse2 = false;
		    			
		    			if(endArrayCut[0] != undefined){
		    				var point2bonRchDid = me.arrDownGrp[me.arrDownGrpEnd][endArrayCut[0]].attributes.RCH_DID; // 하류를 따라가다 가장처음만나는 본류1
		    				me.arr2RRchDid = me.arrDownGrp[me.arrDownGrpEnd][endArrayCut[0]].attributes.LU_RCH_DID;
							me.arr2LRchDid = me.arrDownGrp[me.arrDownGrpEnd][endArrayCut[0]].attributes.RU_RCH_DID;
							
							for(var d = 0 ; d < me.arrDownGrp[me.arrDownGrpEnd].length ; d++){
								if(me.arrDownGrp[me.arrDownGrpEnd][d].attributes.RCH_DID == me.arr2RRchDid){
									linefalse2 = true;
								}
							}
							
							if(linefalse2 == false){
								me.falseDid2 = me.arr2RRchDid;
							}else{
								me.falseDid2 = me.arr2LRchDid;
							}
		    			}
		    			
		    			if(startArrayCut[0] != undefined){
		    				var point1bonRchDid = me.arrDownGrp[me.arrDownGrpStart][startArrayCut[0]].attributes.RCH_DID; // 하류를 따라가다 가장처음만나는 본류2
		    				me.arr1RRchDid = me.arrDownGrp[me.arrDownGrpStart][startArrayCut[0]].attributes.LU_RCH_DID;
							me.arr1LRchDid = me.arrDownGrp[me.arrDownGrpStart][startArrayCut[0]].attributes.RU_RCH_DID;
							
							for(var c = 0 ; c < me.arrDownGrp[me.arrDownGrpStart].length ; c++){
								if(me.arrDownGrp[me.arrDownGrpStart][c].attributes.RCH_DID == me.arr1RRchDid){
									linefalse1 = true;
								}
							}
							
							if(linefalse1 == false){
								me.falseDid1 = me.arr1RRchDid;
							}else{
								me.falseDid1 = me.arr1LRchDid;
							}
		    			}
					
					}
					// 최초 검색된 하류에 속해있거나 본류가 아니면 검색 계속..
					// 본류이면서 검색된 하류에 속해있지 않으면 검색 안함
					if(dnIdx > -1 || geoTrib != 0){
						
						// 공통 하류는 그리지 않음 (cnt == 0)
						if(cnt > 0){
							
							evtType = "Reach";
						}
						
						/* 라인 이벤트 그래픽 판단 */
						for(arrIdx = 0; arrIdx < me.arrEvtLineGrp.length; arrIdx++){
							
							eLineIdx = me.arrEvtLineGrp[arrIdx].map(function(obj){
								
								return obj.attributes.RCH_ID;
							}).indexOf(rchId);
							
							if(eLineIdx > -1){
								
								evtType = "Line";
								break;
							}
						}
						isSearch = true;
					}
					// 시작위치 또는 끝위치 일때
					
					if(stDidx != -1 || edDidx != -1 || stIdx != -1 || edIdx != -1 || rchDid == me.falseDid1 || rchDid == me.falseDid2){
						
						if(stIdx > -1){ // 시작위치 일 때
							evtType = me.stEvtTypes[stIdx];
						} else if(edIdx > -1){ // 끝위치 일 때
							evtType = me.edEvtTypes[edIdx];
						}
						
						if(cnt == 0){
							isSearch = true;
							kradUpDown = "up";
						}else{
							if(evtType != "Reach"){
								isSearch = false;
							}else{
								if(stDidx != -1 || edDidx != -1  ){
									isSearch = false;
								}
								
								if(rchDid == me.falseDid1 || rchDid == me.falseDid2){
									if(me.falseDid1 == me.stRchDids || me.falseDid1 == me.edRchDids
											|| me.falseDid2 == me.stRchDids || me.falseDid2 == me.edRchDids){
										isSearch = true;
									}else{
										isSearch = false;
									}
									
								}
								
							}
							kradUpDown = "down";
						}
						
					}
					if(stDidx != -1 || edDidx != -1 || stIdx != -1 || edIdx != -1){
						
						if(stIdx > -1){ // 시작위치 일 때
							
							evtType = me.stEvtTypes[stIdx];
						}
						else if(edIdx > -1){ // 끝위치 일 때
							
							evtType = me.edEvtTypes[edIdx];
						}
						
						if(cnt == 0){
							
							isSearch = true;
							kradUpDown = "up";
						}else{
							
							if(evtType != "Reach"){
								isSearch = false;
							}else{
								if(stDidx != -1 || edDidx != -1  ){
									isSearch = false;
								}
							}
							
							if(rchDid == me.falseDid1 || rchDid == me.falseDid2){
								isSearch = false;
							}
							
							kradUpDown = "down";
						}
					}
					
					/* 검색, 그리기 조건 설정 끝 */
					var isGeoTrib = me.chkGeoTrib(geoTrib);
					
					if(isGeoTrib == false){
						evtType = "none";
					}
					
					// 이벤트 타입에 따라 그리기 유형 다르게.. ***********
					if(evtType == "Reach"){
						// 그래픽 그리기
						if(rchDid != me.falseDid1 && rchDid != me.falseDid2){
							me.drawGraphic(feature, "reachLine");
							// 집수구역 그리기
							me.setReachArea(catDid);
						}
					} else if(evtType == "Point"){
						
						// KRAD 라인, 집수구역 조회 및 그리기
						me.setKradPointGrp(rchId, kradUpDown);
					} else if(evtType == "Line"){
						
						if(arrIdx > -1 && eLineIdx > -1){
							// 그래픽 그리기
							me.drawGraphic(me.arrEvtLineGrp[arrIdx][eLineIdx], "kradLine");
							
							var evtId = me.arrEvtLineGrp[arrIdx][eLineIdx].attributes.LINE_EVENT_ID;
							var extId = me.arrEvtLineGrp[arrIdx][eLineIdx].attributes.EXT_DATA_ID;
							
							// 시작위치 또는 끝위치 일때
							if(stIdx != -1 || edIdx != -1){
								// 라인이벤트 집수구역 그리기
								me.setKradAreaGrp(evtId, extId);
							}
							else{
								// 집수구역 그리기
								me.setReachArea(catDid);
							}
						}
					}
					
					if(isSearch == true){
						
						cnt++;
						var luRchDid = feature.attributes.LU_RCH_DID;
	    				
	    				if(luRchDid != undefined && luRchDid.trim() != "" ){
		    				// 좌측 상류 검색 (재귀호출)
							me.setReachUpLine(luRchDid, cnt);
							
	    				}
						
	    				var ruRchDid = feature.attributes.RU_RCH_DID;
	    				
	    				if(ruRchDid != undefined && ruRchDid.trim() != "" ){
	    					// 우측 상류 검색 (재귀호출)
	    					me.setReachUpLine(ruRchDid, cnt);
	    				}
					} else{
					}
				}
			});
    	});
    },
    tmpSearchCnt: 0, // 검색 카운트 체크용
    afterChkCnt: 0, // 목록창, 결과창 띄운 후 체크 카운트
    // 검색 종료 체크
    isStopCheck: function(){
    	
    	var me = this;
    	var originTimer = null;
    	var checkedTimer = null;
    	
    	// 타이머 돌리기 0.2초
    	originTimer = setInterval(chkCnt = function(){
    		
    		// 검색 카운트 같으면
			if(me.searchCnt == me.tmpSearchCnt){
        		
				if(originTimer != null){
					// 타이머 중지
					clearInterval(originTimer);
				}
				
				// 지점 목록 창 띄우기
				$KRF_APP.fireEvent($KRF_EVENT.SHOW_SITE_LIST_WINDOW,{searchText:'selectReach'});
//        		Ext.ShowSiteListWindow("selectReach");
        		
        		// 검색결과 창 띄우기
        		ShowSearchResultReach("");
        		
        		// 임시 그래픽 이벤트 종료
        		me.offTmpGrpEvt();
        		me.tmpGrpLayer.clear();
				
        		// 0.5초 뒤에 실행 체크했을때도 같으면
				Ext.defer(clear = function(){
					
					if(me.searchCnt == me.tmpSearchCnt){
		        		
		        		// 0.2초 단위 타이머
		        		var checkedTimer = setInterval(afterChk = function(){
		        			
		        			me.afterChkCnt++;
		        			
		        			// 타이머 작동 10초 뒤 타이머 종료
		        			if(me.afterChkCnt >= 10){
		        				
		        				if(checkedTimer != null){
		        					clearInterval(checkedTimer);
		        				}
		        				me.afterChkCnt = 0;
		        			} else{
			        			// 결과 창 띄운 후 10초간 검색 카운트에 변화 있으면 재귀호출
			        			if(me.searchCnt != me.tmpSearchCnt){
			        				
			        				if(checkedTimer != null){
			        					clearInterval(checkedTimer);
			        				}
				        			me.isStopCheck();
				        		}
		        			}
		        		}, 1000);
					}
					else{
						
						if(originTimer != null){
							// 타이머 중지
							clearInterval(originTimer);
						}
						if(checkedTimer != null){
        					clearInterval(checkedTimer);
        				}
						me.isStopCheck();
					}
				}, 1000, this);
			} else{
				// 검색카운트 다르면 체크용 변수에 저장
				me.tmpSearchCnt = me.searchCnt;
			}
		}, 1000);
    },
    /* 그래픽 그리기 */
    drawGraphic: function(graphic, grpType){
    	
    	var me = this;
    	var reachAdmin = $KRF_APP.coreMap.reachLayerAdmin_v3_New;
    	
    	if(grpType == "reachLine"){
    		
    		me.drawGraphic2(graphic, me.reachLineSym, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);
    	}
    	
    	if(grpType == "reachArea"){
    		
    		me.drawGraphic2(graphic, me.reachAreaSym, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
    	}
    	
    	if(grpType == "kradLine"){
    		
    		me.drawGraphic2(graphic, me.drawSymbol_L, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);
    	}
    	
    	if(grpType == "kradArea"){
    		
    		me.drawGraphic2(graphic, me.drawSymbol_A, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
    	}
    	
    	if(grpType == "kradEmpty"){
    		
    		me.drawGraphic2(graphic, me.drawSymbol_empty, me.areaGrpLayer, [], []);
    	}
    },
    drawGraphic2: function(graphic, symbol, layer, arrObj, reachArr){
    	
    	var me = this;
    	
    	var currId = graphic.attributes.LINE_EVENT_ID != undefined ? graphic.attributes.LINE_EVENT_ID :
    		(graphic.attributes.AREA_EVENT_ID != undefined ? graphic.attributes.AREA_EVENT_ID :
    			(graphic.attributes.RCH_DID != undefined ? graphic.attributes.RCH_DID : 
    				(graphic.attributes.RCH_ID != undefined ? graphic.attributes.RCH_ID : graphic.attributes.CAT_DID)));
    		
		var idx = arrObj.map(function(obj){
			
			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
	    		(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
	    			(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID : 
	    				(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
	    					obj.attributes.CAT_DID)));
			
			return objId;
		}).indexOf(currId);
		
		if(idx == -1){
			
			// 그래픽 그린다.
			graphic.setSymbol(symbol);
			layer.add(graphic);
			
			// 배열에 넣기
			arrObj.push(graphic);
			// 리치 배열 넣기
			reachArr.push(graphic);
		}
    },
    /* 그래픽 지우기 */
    removeGraphic: function(graphic, grpType){
    	
    	var me = this;
    	var reachAdmin = $KRF_APP.coreMap.reachLayerAdmin_v3_New;
    	
    	if(grpType == "reachLine"){
    		
    		me.removeGraphic2(graphic, me.lineGrpLayer, me.arrLineGrp, reachAdmin.arrLineGrp);
    	}
    	
    	if(grpType == "reachArea"){
    		
    		me.removeGraphic2(graphic, me.areaGrpLayer, me.arrAreaGrp, reachAdmin.arrAreaGrp);
    	}
    },
    removeGraphic2: function(graphic, layer, arrObj, reachArr){
    	
    	var me = this;
    	
    	var currId = graphic.attributes.LINE_EVENT_ID != undefined ? graphic.attributes.LINE_EVENT_ID :
    		(graphic.attributes.AREA_EVENT_ID != undefined ? graphic.attributes.AREA_EVENT_ID :
    			(graphic.attributes.RCH_DID != undefined ? graphic.attributes.RCH_DID : 
    				(graphic.attributes.RCH_ID != undefined ? graphic.attributes.RCH_ID : graphic.attributes.CAT_DID)));
    	
    	var grpIdx = layer.graphics.map(function(obj){
			
			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
	    		(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
	    			(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID : 
	    				(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
	    					obj.attributes.CAT_DID)));
			
			return objId;
		}).indexOf(currId);
    	
		var idx = arrObj.map(function(obj){
			
			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
	    		(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
	    			(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID : 
	    				(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
	    					obj.attributes.CAT_DID)));
			
			return objId;
		}).indexOf(currId);
		
		var rchIdx = reachArr.map(function(obj){
			
			var objId = obj.attributes.LINE_EVENT_ID != undefined ? obj.attributes.LINE_EVENT_ID :
	    		(obj.attributes.AREA_EVENT_ID != undefined ? obj.attributes.AREA_EVENT_ID :
	    			(obj.attributes.RCH_DID != undefined ? obj.attributes.RCH_DID : 
	    				(obj.attributes.RCH_ID != undefined ? obj.attributes.RCH_ID :
	    					obj.attributes.CAT_DID)));
			
			return objId;
		}).indexOf(currId);
		
		if(grpIdx > -1){
			
			layer.remove(layer.graphics[grpIdx]);
		}
		
		if(idx > -1){
			
			// 배열에서 삭제
			arrObj.splice(idx, 1);
		}
		
		if(rchIdx > -1){
			
			// 리치 배열에서 삭제
			reachArr.splice(rchIdx, 1);
		}
    },
    /* 리치 집수구역 셋팅 */
    setReachArea: function(catDid){
    	
    	var me = this;
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"], function(Query, QueryTask){
    		
	    	var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];

			query.where = "CAT_DID = '" + catDid + "'";
			
			// 집수구역 조회
			queryTask.execute(query, function(featureSet){
				
				for(var i = 0; i < featureSet.features.length; i++){
					
					// 집수구역 그리기
					var feature = featureSet.features[i];
					me.drawGraphic(feature, "reachArea");
				}
			});
    	});
    },
    // KRAD 라인, 집수구역 조회 및 그리기
    setKradPointGrp: function(rchId, kradUpDown){
    	
    	var me = this;
		
    	var extDataId = "";
		var eventOrder = "";
    	var stIdx = me.stRchIds.indexOf(rchId);
		var edIdx = me.edRchIds.indexOf(rchId);
		
		if(stIdx > -1){
			
			extDataId = me.stEvtArr[stIdx].attributes.EXT_DATA_ID;
			eventOrder = me.stEvtArr[stIdx].attributes.EVENT_ORDER;
		}
		else if(edIdx > -1){
			
			extDataId = me.edEvtArr[edIdx].attributes.EXT_DATA_ID;
			eventOrder = me.edEvtArr[edIdx].attributes.EVENT_ORDER;
		}
		
		var kInfoIdx = me.kradInfo.map(function(obj){
			return obj.EXT_DATA_ID;
		}).indexOf(extDataId);
		
		if(kInfoIdx > -1){
			
			var eventType = me.kradInfo[kInfoIdx].EVENT_TYPE;
			var peLayerId = null;
			var leLayerId = null;
			var aeLayerId = null;
			
			if(eventType == "Point"){
				
				peLayerId = me.kradInfo[kInfoIdx].PE_LAYER_ID;
				leLayerId = me.kradInfo[kInfoIdx].LE_LAYER_ID;
				aeLayerId = me.kradInfo[kInfoIdx].AE_LAYER_ID;
				
				require(["esri/tasks/query",
		    	         "esri/tasks/QueryTask"],
		    	         function(Query,
		    	        		 QueryTask){
					
					var queryTaskLE = new QueryTask(me.kradServiceUrl + "/" + leLayerId);
					var queryLE = new Query();
					var queryEmpty = new Query();
					queryLE.returnGeometry = true;
					queryEmpty.returnGeometry = true;
					queryLE.outFields = ["*"];
					queryEmpty.outFields = ["*"];
					queryLE.where = "RCH_ID = '" + rchId + "'";
					queryEmpty.where = "RCH_ID = '" + rchId + "'";
					if(kradUpDown == "up"){
						queryLE.where += " AND EVENT_ORDER <= " + eventOrder;
						queryEmpty.where += " AND EVENT_ORDER > " + eventOrder;
					}
					if(kradUpDown == "down"){
						queryLE.where += " AND EVENT_ORDER > " + eventOrder;
						queryEmpty.where += " AND EVENT_ORDER <= " + eventOrder;
					}
					queryTaskLE.execute(queryLE, function(fSetLE){
						
						var features = fSetLE.features;
						
						if(features != undefined && features.length > 0){
							
							for(var fCnt = 0; fCnt < features.length; fCnt++){
								
								// 그래픽 그리기
								me.drawGraphic(features[fCnt], "kradLine");
							}
							
							var queryTaskAE = new QueryTask(me.kradServiceUrl + "/" + aeLayerId);
							
							queryTaskAE.execute(queryLE, function(fSetAE){
								
								if(fSetAE.features != undefined && fSetAE.features.length > 0){
									
									for(var faCnt = 0; faCnt < fSetAE.features.length; faCnt++){
										
										// 그래픽 그리기
										me.drawGraphic(fSetAE.features[faCnt], "kradArea");
									}
								}
								
								queryTaskAE.execute(queryEmpty, function(fSetEmpty){
									
									if(fSetEmpty.features.length > 0){
										
										for(var emCnt = 0; emCnt < fSetEmpty.features.length; emCnt++){
											
											// 그래픽 그리기
											me.drawGraphic(fSetEmpty.features[emCnt], "kradEmpty");
										}
									}
								});
							});
						}
					});
				});
			}
		}
    },
    // 라인 이벤트의 집수구역 그리기
    setKradAreaGrp: function(evtId, extId){
    	
    	var me = this;
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"],
    	         function(Query,
    	        		 QueryTask){
    		
	    	var kInfoIdx = me.kradInfo.map(function(obj){
				return obj.EXT_DATA_ID;
			}).indexOf(extId);
	    	
	    	if(kInfoIdx > -1){
				
				var eventType = me.kradInfo[kInfoIdx].EVENT_TYPE;
				var aoLayerId = me.kradInfo[kInfoIdx].AO_LAYER_ID; 
				var aeLayerId = me.kradInfo[kInfoIdx].AE_LAYER_ID;
	    	
		    	var queryTask = new QueryTask(me.kradServiceUrl + "/" + aoLayerId);
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["*"];
				query.where = "AREA_EVENT_ID = '" + evtId + "'";
				queryTask.execute(query, function(featureSet){
					
					var queryTaskAE = new QueryTask(me.kradServiceUrl + "/" + aeLayerId);
					queryTaskAE.execute(query, function(fSetAE){
						
						var aeFeatures = fSetAE.features; // AE 피처
						
						var drawType = "";
						
						if(aeFeatures.length == 0){
							
							drawType = "reachArea";
						}
						else{
							
							drawType = "kradArea";
							
							query.where = "CAT_DID = '" + aeFeatures[0].attributes.CAT_DID + "' AND AREA_EVENT_ID <> '" + evtId + "'";
							queryTaskAE.execute(query, function(fSet){
								
								if(fSet.features.length > 0){
									
									for(var i = 0; i < fSet.features.length; i++){
										
										// 그래픽 그리기
										me.drawGraphic(fSet.features[i], "kradEmpty");
									}
								}
							});
						}
						
						var features = featureSet.features; // AO 피처
						
						for(var i = 0; i < features.length; i++){
							
							// 그래픽 그리기
							me.drawGraphic(features[i], drawType);
						}
					});
				});
	    	}
    	});
    },
    /* KRAD 조회 여부 */
	fIsKRADSearch: function(){
		
		//console.info(localStorage['_searchConfigInfo_']);
		if(localStorage['_searchConfigInfo_'] != undefined && localStorage['_searchConfigInfo_'] != null){
			
			var sConfInfo = JSON.parse(localStorage['_searchConfigInfo_']);
			
			if(sConfInfo.isKrad != undefined && sConfInfo.isKrad != null){
				return sConfInfo.isKrad;
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
	},
    // KRAD 전체 그래픽, 이벤트 및 변수 초기화
    clearKradAll: function(){
    	
    	var me = this;
    	
    	if(me.map.infoWindow != undefined && me.map.infoWindow != null){
    		me.map.infoWindow.hide();
    	}
    	
    	/* 그래픽 클리어 */
    	me.clearGraphic();
    	
    	/* 팝업 닫기 */
    	me.closePopup();
    	
    	/* 이벤트 클리어 */
    	me.offMapClickEvt(); // 맵 클릭 이벤트 끄기
		me.offTmpGrpEvt(); // 임시 그래픽 레이어 (tmpGrpLayer) 이벤트 끄기
    	
    	/* 전역변수 클리어 */
		me.clearVariable();
    },
    /* 그래픽 클리어 */
    clearGraphic: function(){
    	
    	var me = this;
    	
    	if(me.tmpGrpLayer != undefined && me.tmpGrpLayer != null){
    		me.tmpGrpLayer.clear();
    	}
    	
    	if(me.symGrpLayer != undefined && me.symGrpLayer != null){
    		me.symGrpLayer.clear();
    	}
    	
    	if(me.lineGrpLayer != undefined && me.lineGrpLayer != null){
    		me.lineGrpLayer.clear();
    	}
    	
    	if(me.areaGrpLayer != undefined && me.areaGrpLayer != null){
    		me.areaGrpLayer.clear();
    	}
    },
    clearVariable: function(){
    	
    	var me = this;
    	
    	me.mapClickEvt = null;
    	me.btnObj = null;
    	
    	me.drawOption = "";
    	me.eventType = ""; // 이벤트 타입 (Reach, Point, Line 등)
    	me.stEvtArr = []; // 시작위치 이벤트 그래픽 배열
    	me.edEvtArr = [];  // 끝위치 이벤트 그래픽 배열
    	me.stEvtTypes = []; // 시작위치 이벤트 타입 (Reach, Point, Line 등)
    	me.edEvtTypes = []; // 끝위치 이벤트 타입 (Reach, Point, Line 등)
    	me.clickedReachLines = []; // 최초 클릭된(맵 클릭시마다) 리치라인 배열
    	me.rchIds = []; // 최초 클릭된(맵 클릭시마다) 리치 아이디 배열
    	me.stRchIds = []; // 시작위치 리치 아이디 배열
    	me.stRchDids = [];
    	me.edRchIds = []; // 끝위치 리치 아이디 배열
    	me.edRchDids = [];
    	me.arrDownGrp = []; // 하류 그래픽 배열
    	me.arrLineGrp = []; // 리치라인 그래픽 배열
    	me.arrAreaGrp = []; // 집수구역 그래픽 배열
    	me.arrCommGrp = []; // 공통하류 그래픽 배열
    	me.tmpEvtLineGrp = []; // 라인 이벤트 임시 배열
    	me.arrEvtLineGrp = []; // 라인 이벤트 리치 배열
    	
    	var reachAdmin = $KRF_APP.coreMap.reachLayerAdmin_v3_New;
    	
    	reachAdmin.arrLineGrp = []; // 기존 리치 라인 그래픽 배열
    	reachAdmin.arrAreaGrp = []; // 기존 리치 집수구역 그래픽 배열
    },
    searchStopCheck: function(cnt){
    	
    	var me = this;
    	
    	/* 초기화 시 검색 종료 */
    	if(cnt == 0){
    		
    		me.isSearchStop = false;
    	}
    	
    	if(me.isSearchStop == true){
    		
    		var sec = 0;
    		var timer = setInterval(function(){
    			
    			sec++;
    			ResetButtonClick(); // 초기화
    			
    			// 2초 후 검색 종료 플래그 변경
    			if(sec >= 2){
    				
    				clearInterval(timer);
    				me.isSearchStop = false;
    			}
    		}, 1000);
    		
    		return false;
    	}
    	/* 초기화 시 검색 종료 끝 */
    	
    	return true;
    },
    getSearchConfigInfo: function(){
    	
    	var searchConfig = Ext.getCmp("searchConfig");
    	this.searchConfigInfoJson = searchConfig.getLocalStorage();
    	
    }
});