Ext.define('krf_new.view.map.ReachLayerAdmin_v3_New', {
	
	//lineGrpLayer: null, // 리치라인 레이어
	downLineLayer: null, // 하류 리치라인 레이어
	//areaGrpLayer: null, // 집수구역 레이어
	pointGrpLayer: null, // 포인트 레이어
	symbolGrpLayer: null, // 심볼 레이어 (시작, 끝...)
	
	selLineSymbol: null, // 선택된 라인 심볼
	upLineSymbol: null, // 상류 라인 심볼
	downLineSymbol: null, // 하류 라인 심볼
	areaSymbol: null, // 집수구역 심볼
	startSymbol: null, // 시작위치 심볼
	endSymbol: null, // 끝위치 심볼
	
	selectionToolbar: null, // Draw 툴바
	
	arrStartSym: [], // 시작위치 심볼 그래픽 배열
	arrEndSym: [], // 끝위치 심볼 그래픽 배열
	arrStartLine: [], // 시작위치 라인 배열 (집수구역으로 선택 시 라인이 여러개일 수 있음)
	arrEndLine: [], // 끝위치 라인 배열 (집수구역으로 선택 시 라인이 여러개일 수 있음)
	arrLineGrp: [], // 리치라인 그래픽 배열
	arrAreaGrp: [], // 집수구역 그래픽 배열
	arrStDownLine: [], // 시작위치 하류 배열
	arrEdDownLine: [], // 끝위치 하류 배열
	
	grpCommDownLine: null, // 시작위치, 끝위치 공통 하류(만나는지점) 그래픽 오브젝트
	
	minStartRchDid: '', // 시작위치 라인 최상류 (시작위치 라인이 여러개일 수 있음)
	minEndRchId: '', // 끝위치 라인 최상류 (끝위치 라인이 여러개일 수 있음) 
	
	isStopRequest: false, // 프로세스 중지 요청 플래그
	
	/* 생성자 (심볼 설정, 레이어 생성 등) */
	constructor: function(map) {
		
		var me = this;
		me.map = map;
		
		/*require(["esri/symbols/SimpleLineSymbol",
		         "esri/symbols/SimpleFillSymbol",
		         "esri/symbols/PictureMarkerSymbol",
		         "esri/Color",
		         "esri/toolbars/draw"
		], function (SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Color, Draw) {
			
			me.selLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 5);
			me.upLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([237, 20, 91]), 5);
			me.downLineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 170, 0]), 5);
			me.areaSymbol = 
        		new SimpleFillSymbol(
        							SimpleFillSymbol.STYLE_SOLID,
			        				new SimpleLineSymbol(
						        						SimpleLineSymbol.STYLE_DASHDOT,
									        			new Color([0, 0, 0]),
									        			2
						        						),
			        				new Color([255, 255, 0, 0.3])
        							);
			me.startSymbol = new PictureMarkerSymbol({
	 		    "angle": 0,
	 		    "yoffset": 14,
	 		    "type": "esriPMS",
	 		    "url": "./resources/images/symbol/btn_start01.png",
	 		    "contentType": "image/png",
	 		    "width": 20,
	 		    "height": 28
	 		});
			
			me.endSymbol = new esri.symbol.PictureMarkerSymbol({
			    "angle": 0,
			    "yoffset": 14,
			    "type": "esriPMS",
			    "url": "./resources/images/symbol/btn_end01.png",
			    "contentType": "image/png",
			    "width": 20,
			    "height": 28
			});
			
			require(["esri/layers/GraphicsLayer"], function(GraphicsLayer){
				
	    		me.areaGrpLayer = new GraphicsLayer();
				me.areaGrpLayer.id = "areaGrpLayer";
				me.map.addLayer(me.areaGrpLayer);
				
				me.downLineLayer = new GraphicsLayer();
				me.downLineLayer.id = "downLineLayer";
				me.downLineLayer.visible = true;
				me.map.addLayer(me.downLineLayer);
				
				me.lineGrpLayer = new GraphicsLayer();
				me.lineGrpLayer.id = "lineGrpLayer";
				me.map.addLayer(me.lineGrpLayer);
				
				me.pointGrpLayer = new GraphicsLayer();
				me.pointGrpLayer.id = "pointGrpLayer";
				me.map.addLayer(me.pointGrpLayer);
				
				me.symbolGrpLayer = new GraphicsLayer();
				me.symbolGrpLayer.id = "symbolGrpLayer";
				me.map.addLayer(me.symbolGrpLayer);
			});
		});*/
    },
    
    /* 시작위치 버튼 클릭 */
    onClickStartPoint: function(){
    	var me = this;
    	Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_start01.png) 13 38,auto');
		me.startDraw("startPoint");
    },
    
    /* 끝위치 버튼 클릭 */
    onClickEndPoint: function(){
    	
    	var me = this;
    	Ext.get('_mapDiv__gc').setStyle('cursor','url(./resources/images/symbol/btn_end01.png) 13 38,auto');
		me.startDraw("endPoint");
    },
    
    /* 그리기 시작
     * drawOption: 시작위치, 끝위치, 드래그선택 등 ("startPoint", "endPoint"...) */
    /*startDraw: function(drawOption){
    	
    	var me = this;
    	
    	require(["esri/toolbars/draw",
    	         "dojo/on",
    	         "dojo/i18n!esri/nls/jsapi"], function(Draw, on, bundle){
			
			me.selectionToolbar = new Draw(me.map, { showTooltips: true });
			////console.info(me.selectionToolbar);
			var symbol = null;
			
			if(drawOption == "startPoint"){
				symbol = me.startSymbol;
				//bundle.toolbars.draw.addPoint = "시작위치를 추가하려면 클릭.";
				bundle.toolbars.draw.addPoint = null;
				me.selectionToolbar.activate(Draw.POINT);
			}
			
			if(drawOption == "endPoint"){
				symbol = me.endSymbol;
				bundle.toolbars.draw.addPoint = "끝위치를 추가하려면 클릭.";
				me.selectionToolbar.activate(Draw.POINT);
			}
			
			if(drawOption == "addPoint"){
				bundle.toolbars.draw.addPoint = "라인을 추가하려면 클릭.";
				me.selectionToolbar.activate(Draw.POINT);
			}
			
			if(drawOption == "removePoint"){
				bundle.toolbars.draw.addPoint = "라인을 제거하려면 클릭.";
				me.selectionToolbar.activate(Draw.POINT);
			}
			
			if(drawOption == "extent"){
				bundle.toolbars.draw.freehand = "선택할 영역 드래그.";
				me.selectionToolbar.activate(Draw.EXTENT);
			}
			
			if(drawOption == "circle"){
				bundle.toolbars.draw.addShape = "선택할 영역 드래그.";
				me.selectionToolbar.activate(Draw.CIRCLE);
			}
			
			//console.dir(bundle);
			
			on(me.selectionToolbar, "DrawEnd", function (evt) {

				 draw extention offset 2016-04-05 주석 - map left 고정시키면서 필요없어짐..
				//if(location.host != "10.101.95.14"){
				if(_isOffsetPoint == true){
					////console.info(_isOffsetPoint);
					// 실서버는 적용 안해도 됨.
					//evt = me.getExtentWithOffset(evt); // offset 적용된 geometry 셋팅
				}
				
				
				if(symbol != null && symbol != undefined)
					me.drawSymbol(evt, symbol, drawOption); // 심볼 그리기
				
				if(drawOption == "startPoint" || drawOption == "start"){
					
					me.drawEnd("btnMenu04"); // 그리기 종료
				}
				
				if(drawOption == "endPoint" || drawOption == "end"){
					
					me.drawEnd("btnMenu05"); // 그리기 종료
				}
				
				// 이벤트로 리치 라인 조회
				me.selectLineWithEvent(evt, drawOption);
	        });
		});
    },*/
    startDrawEnd: function(evt, symbol, drawOption){
    	
    	var me = this;
    	
    	if(symbol == undefined || symbol == null){
    		
    		if(drawOption == "startPoint"){
    			symbol = me.startSymbol;
    		}
    		if(drawOption == "endPoint"){
    			symbol = me.endSymbol;
    		}
    	}
    	
    	if(symbol != null && symbol != undefined){
			me.drawSymbol(evt, symbol, drawOption); // 심볼 그리기
    	}
		
		if(drawOption == "startPoint" || drawOption == "start"){
			
			me.drawEnd("btnMenu04"); // 그리기 종료
		}
		
		if(drawOption == "endPoint" || drawOption == "end"){
			
			me.drawEnd("btnMenu05"); // 그리기 종료
		}
		
		// 이벤트로 리치 라인 조회
		me.selectLineWithEvent(evt, drawOption);
    },
    /* 이벤트(클릭, 드래그 등)로 리치라인 조회 
     * 이벤트에 리치라인이 포함되지 않으면 집수구역 조회
     * evt: 이벤트
     * drawOption: 시작위치, 끝위치, 드래그선택 등 ("startPoint", "endPoint"...) */
    selectLineWithEvent: function(evt, drawOption){
    	
    	var me = this;
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/geometry/Point",
    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			if(evt.type == "point"){
				
	        	var centerPoint = new Point(evt.x, evt.y, evt.spatialReference);
	        	var mapWidth = $KRF_APP.coreMap.map.extent.getWidth();
	        	var pixelWidth = mapWidth / $KRF_APP.coreMap.map.width;
	        	var tolerance = 10 * pixelWidth;
	        	
	        	var queryExtent = new Extent(1, 1, tolerance, tolerance, evt.spatialReference);
	        	query.geometry = queryExtent.centerAt(centerPoint);
	    	}
			else{
				
				query.geometry = evt;
			}
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length > 0){
					
					for(var i = 0; i < featureSet.features.length; i++){
						
						var tmpRchDid = featureSet.features[i].attributes.RCH_DID;
						var rivNm = featureSet.features[i].attributes.RIV_NM;
						
						if(drawOption == "startPoint"){
							
							// 시작위치 클릭시 배열에 담기
							me.arrStartLine.push(featureSet.features[i]);
							// 시작위치 최상류 라인 아이디 셋팅
							me.minStartRchDid = tmpRchDid;
							// 시작위치 하천명 셋팅
							SetStEdSiteName("start", rivNm);
						}
						
						if(drawOption == "endPoint"){
							
							// 끝위치 클릭시 배열에 담기
							me.arrEndLine.push(featureSet.features[i]);
							// 끝위치 최상류 라인 아이디 셋팅
							me.minEndRchDid = tmpRchDid;
							// 끝위치 하천명 셋팅
							SetStEdSiteName("end", rivNm);
						}
						
						if(drawOption == "removePoint"){
							// 라인 지운다
							me.removeLine(featureSet.features[i], "lineGrpLayer");
							
							// 지점 목록 창 띄우기
			        		Ext.ShowSiteListWindow("selectReach");
			        		// 검색결과 창 띄우기
			        		ShowSearchResultReach("");
			        		//PollLoadSearchResult("");
						}
						else if(drawOption == "addPoint" || drawOption == "extent" || drawOption == "circle"){
							// 라인 그린다
							me.drawLine(featureSet.features[i], me.upLineSymbol, "lineGrpLayer");
							
							// 지점 목록 창 띄우기
			        		Ext.ShowSiteListWindow("selectReach");
			        		// 검색결과 창 띄우기
			        		ShowSearchResultReach("");
			        		//PollLoadSearchResult("");
						}
					}
					
					if(drawOption == "startPoint" || drawOption == "endPoint"
						|| drawOption == "start" || drawOption == "end"){
						
						// 하류 조회
						var rchDid = featureSet.features[0].attributes.RCH_DID;
						me.selectDownLine(rchDid, drawOption, 0);
					}
				}
				else{
					
					// 리치라인이 없으면 집수구역 조회
					me.selectAreaWithEvent(evt, drawOption);
				}
			});
    	});
    },
    
    /* 조건으로 리치라인 조회
     * where: 조건
     * drawOption: 시작위치, 끝위치, 드래그선택 등 ("startPoint", "endPoint"...) */
    selectLineWithWhere: function(where, drawOption){
    	
    	var me = this;
    	////console.info(where);
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"], function(Query, QueryTask){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.where = where;
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length > 0){
					
					var minRchDid = "";
					var preSeq = 999;
					var rivNm = "";
					
					for(var i = 0; i < featureSet.features.length; i++){
						
						var tmpSeq = featureSet.features[i].attributes.RCH_SN;
						var tmpRchDid = featureSet.features[i].attributes.RCH_DID;
						rivNm = featureSet.features[i].attributes.RIV_NM;
						
						if(preSeq > tmpSeq){
							
							preSeq = tmpSeq;
							minRchDid = tmpRchDid;
						}
					}
					
					if(drawOption == "startPoint"){
						
						// 시작위치 클릭시 배열에 담기
						me.arrStartLine.push(featureSet.features[0]);
						//me.arrStartLine.unshift(featureSet.features[i]);
						// 시작위치 최상류 라인 아이디 셋팅
						me.minStartRchDid = minRchDid; 
						// 시작위치 하천명 셋팅
						SetStEdSiteName("start", rivNm);
					}
					
					if(drawOption == "endPoint"){
						
						// 끝위치 클릭시 배열에 담기
						me.arrEndLine.push(featureSet.features[0]);
						// 끝위치 최상류 라인 아이디 셋팅
						me.minEndRchDid = minRchDid;
						// 끝위치 하천명 셋팅
						SetStEdSiteName("end", rivNm);
					}
					
					if(minRchDid != ""){
						
						if(drawOption == "startPoint" || drawOption == "endPoint"
							|| drawOption == "start" || drawOption == "end"){
							////console.info("Dd");
							// 하류 조회
							Ext.defer(function(){
								
								me.selectDownLine(minRchDid, drawOption, 0);
								
							}, 1);
							
						}
						else{
							
							for(var i = 0; i < featureSet.features.length; i++){
								
								if(drawOption == "removePoint"){
									// 라인 지운다
									me.removeLine(featureSet.features[i], "lineGrpLayer");
									
									// 지점 목록 창 띄우기
					        		Ext.ShowSiteListWindow("selectReach");
					        		// 검색결과 창 띄우기
					        		ShowSearchResultReach("");
					        		//PollLoadSearchResult("");
								}
								else{
									// 라인 그린다
									me.drawLine(featureSet.features[i], me.upLineSymbol, "lineGrpLayer");
									
									// 지점 목록 창 띄우기
					        		Ext.ShowSiteListWindow("selectReach");
					        		// 검색결과 창 띄우기
					        		ShowSearchResultReach("");
					        		//PollLoadSearchResult("");
								}
							}
						}
					}
					else{
						
						alert("리치라인 검색중 오류가 발생하였습니다.");
					}
				}
				else{
					
					alert("리치라인이 존재하지 않습니다.");
				}
			});
    	});
    },
    
    /* 하류 리치라인 조회
     * curRchDid: 검색될 리치 아이디(DID)
     * drawOption: 옵션("startPoint", "endPoint"...)
     * cnt: 하류검색 카운트 */
    selectDownLine: function(curRchDid, drawOption, cnt){
    	
    	var me = this;
    	
    	curRchDid = curRchDid.replace(/ /gi, "");
    	
    	if(curRchDid != ""){
	    	require(["esri/tasks/query",
	    	         "esri/tasks/QueryTask",
	    	         "esri/geometry/Point",
	    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
	    		
		    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
				var query = new Query();
				query.returnGeometry = true;
				query.outFields = ["*"];
				query.where = "RCH_DID = '" + curRchDid + "'";
				
				////console.info(query);
				
				// 리치라인 조회
				queryTask.execute(query, function(featureSet){
					
					if(featureSet.features.length > 0){
						
						var feature = featureSet.features[0];
						var rchDid = feature.attributes.RCH_DID;
						
						if(drawOption == "startPoint" || drawOption == "start"){
							// 시작위치 하류 배열 push
							me.arrStDownLine.push(feature);
						}
						
						if(drawOption == "endPoint" || drawOption == "end"){
							// 끝위치 하류 배열 push
							me.arrEdDownLine.push(feature);
						}
						
						var stLength = me.arrStDownLine.length; // 시작위치 하류 배열 길이
						var edLength = me.arrEdDownLine.length; // 끝위치 하류 배열 길이
						var stSliceIdx = -1; // 시작위치 하류 배열 잘라낼 인덱스
						var edSliceIdx = -1; // 끝위치 하류 배열 잘라낼 인덱스
						
						// 시작위치 하류 배열 길이만큼 루프
						for(var stIdx = 0; stIdx < stLength; stIdx++){
							
							// 끝위치 하류 배열 길이만큼 루프
							for(var edIdx = 0; edIdx < edLength; edIdx++){
								
								var stRchDid = me.arrStDownLine[stIdx].attributes.RCH_DID;
								var edRchDid = me.arrEdDownLine[edIdx].attributes.RCH_DID;

								// 시작위치 하류 배열, 끝위치 하류 배열에서 ID가 일치하는지 체크..
								// 시작위치 하류, 끝위치 하류 만나는 지점..
								if(stRchDid == edRchDid){

									// 만나는 지점 그래픽 오브젝트 전역
									me.grpCommDownLine = me.arrStDownLine[stIdx];
									
									stSliceIdx = stIdx;
									edSliceIdx = edIdx;
									break;
								}
							}
							
							if(stSliceIdx > -1){
								
								break;
							}
						}
						
						/* 시작위치 하류, 끝위치 하류 만나는 지점이 시작위치일때 */
						if(stSliceIdx == 0){
							
							stSliceIdx = 1; // 시작위치 포함
						}
						
						/* 시작위치 하류, 끝위치 하류 만나는 지점이 끝위치일때 */
						if(edSliceIdx == 0){
							
							edSliceIdx = 1; // 끝위치 포함
						}
						
						if(stSliceIdx > -1){
							
							me.arrStDownLine.splice(stSliceIdx); // 시작위치 하류에서 index밑으로 제거
						}
						
						if(edSliceIdx > -1){
							
							me.arrEdDownLine.splice(edSliceIdx); // 끝위치 하류에서 index밑으로 제거
						}

						// 시작위치, 끝위치 만나는 지점이 아니면
						if(stSliceIdx == -1 && edSliceIdx == -1){
				    			
				    			cnt += 1; // 하류검색 카운트 증가
				    			
				    			// 좌측 하류 검색 (재귀호출)
					    		var ldRchDid = feature.attributes.LD_RCH_DID;
					    		me.selectDownLine(ldRchDid, drawOption, cnt);
					    		
					    		// 우측 하류 검색 (재귀호출)
					    		var rdRchDid = feature.attributes.RD_RCH_DID;
					    		me.selectDownLine(rdRchDid, drawOption, cnt);
				    	}
				    	else{
				    		
				    		var dnGeoTrib = feature.attributes.GEO_TRIB;
				    		var rchDid = feature.attributes.RCH_DID;
				    		
				    		/** 검색설정(본류, 지류) 체크 **/
							var confInfo = localStorage['_searchConfigInfo_'];
							
							if(confInfo != undefined && confInfo != null){
								
								var jsonConf = JSON.parse(confInfo);
								
								// 지류검색이 아닐때
								if(jsonConf.isJiDraw == false){
									
									if(dnGeoTrib != 0){
										
										alert("선택된 시작위치, 끝위치 사이에 본류가 흐르지 않습니다.\r\n검색설정을 확인하세요.");
										return;
									}
								}
							}
							/** 검색설정(본류, 지류) 체크 끝 **/
							Ext.defer(function(){
								
								// 상류 검색
					    		me.selectUpLine(rchDid, dnGeoTrib, drawOption, 0); // 처음 호출시 마지막 0파라메터 주의..
					    		//alert("하류 만나는 지점 하천차수 : " + dnGeoTrib);
					    		
					    		// 검색 종료 체크
					    		me.isStopCheck();
								
								//me.defaultDate(droneLayerId,measureDate,drone);
							}, 1);
				    	}
					}
				});
	    	});
    	}
    },
    
    searchCnt: 0, // 검색 카운트
    
    /* 상류 리치라인 조회 및 그리기
     * curRchDid: 검색될 리치 아이디(DID)
     * dnGeoTrib: 공통된(최하위) 하류 object 하천차수(본류:0, 지류:1,2,3,...)
     * cnt: 상류검색 카운트 */
    selectUpLine: function(curRchDid, dnGeoTrib, drawOption, cnt){
    	
    	var me = this;
    	
    	me.searchCnt += 1; // 검색 카운트 증가

    	curRchDid = curRchDid.replace(/ /gi, "");
    	
    	if(curRchDid == ""){
    		
    		return;
    	}
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/geometry/Point",
    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.where = "RCH_DID = '" + curRchDid + "'";
			
			////console.info(_mapServiceUrl_v3 + "/" + _reachLineLayerId);
			////console.info(query.where);
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length > 0){
					
					var feature = featureSet.features[0];
	    			
    				var isUpSearch = true; // 현재 feature 상류 검색 여부
    				var isDraw = true; // 현재 feature그릴지 여부
    				
    				/** 시작위치, 끝위치, 첫 object 등 체크 **/
    				/* 현재 object가 시작위치에 포함 되어 있는지 여부 */
    				var isStRch = false;
    				
    				if(curRchDid == me.minStartRchDid){
    					isStRch = true;
    				}
    				/*
    				for(var i = 0; i < me.arrStartLine.length; i++){
    					
    					if(curRchDid == me.arrStartLine[i].attributes.RCH_DID){
    						
    						// 현재 object가 시작위치에 포함 되어 있으면 true
    						isStRch = true;
    						//break;
    					}
    				}
    				*/
    				/* 현재 object가 시작위치에 포함 되어 있는지 여부 */
					
					/* 현재 object가 끝위치에 포함 되어 있는지 여부 */
    				var isEdRch = false;
    				
    				if(curRchDid == me.minEndRchDid){
    					isEdRch = true;
    				}
    				/*
    				for(var i = 0; i < me.arrEndLine.length; i++){
    					
    					if(curRchDid == me.arrEndLine[i].attributes.RCH_DID){
    						
    						// 현재 object가 끝위치에 포함 되어 있으면 true
    						isEdRch = true;
    						break;
    					}
    				}
    				*/
    				/* 현재 object가 시작위치에 포함 되어 있는지 여부 */
					
					// 첫 object일때 (시작, 끝 공통 하류 지점)
					if(cnt == 0){
						
						// 무조건 상류검색.
						isUpSearch = true;
						
						// 현재 object가 시작위치이거나 끝위치에 포함되어 있으면
						if(isStRch == true || isEdRch == true){
							
							if(drawOption == "start" || drawOption == "end"){
								isDraw = false;
							}
							else{
								isDraw = true;
							}
						}
						else{ // 현재 object가 시작위치도 아니고 끝위치도 아니면
							
							// 그리지 않는다.
							isDraw = false;
						}
					}
					else{ // 첫 object가 아니면
						
						// 무조건 그린다.
						isDraw = true;
						
						// 현재 object가 시작위치이거나 끝위치에 포함되어 있으면
						if(isStRch == true || isEdRch == true){
							
							// 상류검색 안함
							isUpSearch = false;
							
							// 현재 object가 시작위치일 때
							if(isStRch == true){
								
								// 시작위치에 속한 라인이 여러개일때 상류검색 안하는 대신
								if(me.arrStartLine.length > 1){
									
									// 시작위치에 속한 라인 object를 모두 그린다.
									for(var i = 0; i < me.arrStartLine.length; i++){
										
										// 라인 그린다
										me.drawLine(me.arrStartLine[i], me.upLineSymbol, "lineGrpLayer");
									}
								}
								
								//alert(isUpSearch);
							}
							
							// 현재 object가 끝위치일 때
							if(isEdRch == true){
								
								// 끝위치에 속한 라인이 여러개일때 상류검색 안하는 대신
								if(me.arrEndLine.length > 1){
									
									// 끝위치에 속한 라인 object를 모두 그린다.
									for(var i = 0; i < me.arrEndLine.length; i++){
										
										// 라인 그린다
										me.drawLine(me.arrEndLine[i], me.upLineSymbol, "lineGrpLayer");
									}
								}
								
								//alert(isUpSearch);
							}
						}
						else{ // 현재 object가 시작위치도 아니고 끝위치도 아니면
							
							// 상류검색 함
							isUpSearch = true;
						}
					}
					/** 시작위치, 끝위치, 첫 object 등 체크 끝 **/
					
					/** 최하위 노드의 지류인 놈들만 검색하기 **/
					// 시작위치 하류에서 현재 feature 인덱스 찾기
    				var stIdx = -1;
    				var stLength = me.arrStDownLine.length;
					
					for(var i = 0; i < stLength; i++){
						
						if(curRchDid == me.arrStDownLine[i].attributes.RCH_DID){
							
							stIdx = i;
						}
					}
					
					// 끝위치 하류에서 현재 feature 인덱스 찾기
					var edIdx = -1;
					var edLength = me.arrEdDownLine.length;
					
					for(var i = 0; i < edLength; i++){
						
						if(curRchDid == me.arrEdDownLine[i].attributes.RCH_DID){
							
							edIdx = i;
						}
					}
					
					// 현재 feature 하천 차수
					var curGeoTrib = feature.attributes.GEO_TRIB;
					
					// if(cnt != 0 && stIdx == -1 && edIdx == -1 && curGeoTrib <= dnGeoTrib){
					// 본류이면서 시작위치 하류 배열, 끝위치 하류 배열에 속해있지 않으면 검색 종료 Draw종료
					if(cnt != 0 && stIdx == -1 && edIdx == -1 && curGeoTrib == 0){
						
						isUpSearch = false;
						isDraw = false;
					}
					/** 최하위 노드의 지류인 놈들만 검색하기 끝 **/
					
					var stDID = me.arrStDownLine[0].attributes.RCH_DID;
					var edDID = me.arrEdDownLine[0].attributes.RCH_DID;
					
					/** 시작위치, 끝위치 같을 때 그리기만 **/
					// 시작위치, 끝위치가 같으면
					if(stDID == edDID){
						
						// 상류검색 안한다.
						isUpSearch = false;
						// 그린다.
						isDraw = true;
					}
					/** 시작위치, 끝위치 같을 때 그리기만 끝 **/
					
					/** 검색설정(본류, 지류) 체크 **/
					var confInfo = localStorage['_searchConfigInfo_'];
					
					if(confInfo != undefined && confInfo != null){
						
						var jsonConf = JSON.parse(confInfo);
						
						// 지류검색이 아닐때
						if(jsonConf.isJiDraw == false){
							
							// 현재 object가 본류가 아니면
							if(curGeoTrib != 0){
								
								if(isUpSearch == true)
									isUpSearch = false;
								if(isDraw == true)
									isDraw = false;
							}
						}
					}
					/** 검색설정(본류, 지류) 체크 끝 **/
					
					if(isDraw == true){
						
						// 라인 그린다
						me.drawLine(feature, me.upLineSymbol, "lineGrpLayer");
					}
    				
    				if(isUpSearch == true){
    					
    					// 카운트 증가시켜 주자.. 꼭!! (처음 호출때만 0이면됨..)
    					cnt += 1;
    	    			
	    				// 좌측 상류 검색 (재귀호출)
	    				var luRchDid = feature.attributes.LU_RCH_DID;
						me.selectUpLine(luRchDid, dnGeoTrib, drawOption, cnt);
						
	    				// 우측 상류 검색 (재귀호출)
	    				var ruRchDid = feature.attributes.RU_RCH_DID;
	    				////console.info(ruRchDid);
						me.selectUpLine(ruRchDid, dnGeoTrib, drawOption, cnt);
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
    	
    	// 타이머 돌리기 0.1초
    	var obj = setInterval(chkCnt = function(){
    		
			////console.info(me.searchCnt);
    		// 검색 카운트 같으면
			if(me.searchCnt == me.tmpSearchCnt){
        		
				// 타이머 중지
				clearInterval(obj);
				
        		// 1초 뒤에 실행 체크했을때도 같으면
				Ext.defer(clear = function(){
					
					if(me.searchCnt == me.tmpSearchCnt){
						
						// 지점 목록 창 띄우기
		        		Ext.ShowSiteListWindow("selectReach");
		        		
		        		// 검색결과 창 띄우기
		        		ShowSearchResultReach("");
		        		
		        		// 1초 단위 타이머
		        		var timer = setInterval(afterChk = function(){
		        			
		        			me.afterChkCnt++;
		        			
		        			// 타이머 작동 20초 뒤 타이머 종료
		        			if(me.afterChkCnt == 20){
		        				
		        				clearInterval(timer);
		        				me.afterChkCnt = 0;
		        			}
		        			
		        			// 결과 창 띄운 후 20초간 검색 카운트에 변화 있으면 재귀호출
		        			if(me.searchCnt != me.tmpSearchCnt){
			        			
		        				clearInterval(timer);
			        			me.isStopCheck();
			        		}
		        		}, 1000);
					}
					else{
						
						me.isStopCheck();
					}
				}, 100, this);
			}
			else{
				
				// 검색카운트 다르면 체크용 변수에 저장
				me.tmpSearchCnt = me.searchCnt;
			}
		}, 100);
    },
    
    /* 이벤트(클릭, 드래그 등)로 집수구역 조회
     * evt: 이벤트
     * drawOption: 시작위치, 끝위치, 드래그선택 등 ("startPoint", "endPoint"...) */
    selectAreaWithEvent: function(evt, drawOption){
    	
    	var me = this;
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"], function(Query, QueryTask){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.geometry = evt;
			
			// 집수구역 조회
			queryTask.execute(query, function(featureSet){
				
				// CAT_DID 조건으로 라인 조회
				var catDid = featureSet.features[0].attributes.CAT_DID;
				var where = "CAT_DID = '" + catDid + "'";
				me.selectLineWithWhere(where, drawOption);
			});
    	});
    },
    
    /* 라인 feature로 집수구역 조회
     * lineFeature: 라인 오브젝트
     * option: "draw", "remove" */
    selectAreaWithLine: function(lineFeature, option){
    	
    	var me = this;
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"], function(Query, QueryTask){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachAreaLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];

			var catDid = lineFeature.attributes.CAT_DID;
			query.where = "CAT_DID = '" + catDid + "'";
			
			// 집수구역 조회
			queryTask.execute(query, function(featureSet){
				
				for(var i = 0; i < featureSet.features.length; i++){
					
					// 집수구역 그리기
					var feature = featureSet.features[i];
					
					if(option == "draw"){
						////console.info(feature.attributes.CAT_DID);
						////console.info(i);
						me.drawArea(feature, me.areaSymbol, "areaGrpLayer");
					}
					
					if(option == "remove"){
						me.removeArea(feature, "areaGrpLayer");
					}
				}
			});
    	});
    },
    
    ldRchDid: "",
    rdRchDid: "",
    
    /* 이벤트(클릭, 드래그 등)로 리치노드 조회 
     * 이벤트에 리치라인이 포함되지 않으면 리치라인 조회
     * evt: 이벤트
     * drawOption: 시작위치, 끝위치, 드래그선택 등 ("startPoint", "endPoint"...) */
    selectNodeWithEvent: function(evt, drawOption){
    	
    	var me = this;
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask",
    	         "esri/geometry/Point",
    	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
    		
	    	var queryTask = new QueryTask(_mapServiceUrl_v3 + "/" + _reachNodeLayerId); // 리치노드 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["*"];
			
			if(evt.type == "point"){
				
	        	var centerPoint = new Point(evt.x, evt.y, evt.spatialReference);
	        	var mapWidth = $KRF_APP.coreMap.map.extent.getWidth();
	        	var pixelWidth = mapWidth / $KRF_APP.coreMap.map.width;
	        	var tolerance = 10 * pixelWidth;
	        	
	        	var queryExtent = new Extent(1, 1, tolerance, tolerance, evt.spatialReference);
	        	query.geometry = queryExtent.centerAt(centerPoint);
	    	}
			else{
				
				query.geometry = evt;
			}
			
			// 리치노드 조회
			queryTask.execute(query, function(featureSet){
				////console.info(featureSet);
				if(featureSet.features.length > 0){
					
					//for(var i = 0; i < featureSet.features.length; i++){
						
						var tmpRchDid = "";
						var tmpLdRchDid = featureSet.features[0].attributes.LD_RCH_DID;
						tmpLdRchDid = tmpLdRchDid.replace(/ /gi, "");
						
						if(tmpLdRchDid != ""){
							
							tmpRchDid = tmpLdRchDid;
						}
						else{
							
							var tmpRdRchDid = featureSet.features[0].attributes.RD_RCH_DID;
							tmpRdRchDid = tmpRdRchDid.replace(/ /gi, "");
							tmpRchDid = tmpRdRchDid;
						}
						
						var where = "";
						
						if(drawOption == "start"){
							// 시작위치 클릭시 배열에 담기
							me.arrStartLine.push(featureSet.features[0]);
							//me.arrStartLine.unshift(featureSet.features[i]);
							// 시작위치 최상류 라인 아이디 셋팅
							me.minStartRchDid = tmpRchDid;
						}
						
						if(drawOption == "end"){
							
							// 끝위치 클릭시 배열에 담기
							me.arrEndLine.push(featureSet.features[0]);
							//me.arrStartLine.unshift(featureSet.features[i]);
							// 끝위치 최상류 라인 아이디 셋팅
							me.minEndRchDid = tmpRchDid; 
						}
						
						if(tmpRchDid != ""){
							
							where = "RCH_DID = '" + tmpRchDid + "'";
						}
						//alert(where);
						if(where != ""){
							
							me.selectLineWithWhere(where, drawOption);
						}
					//}
				}
				else{
					
					// 리치노드가 없으면 리치라인 조회
					me.selectLineWithEvent(evt, drawOption);
				}
			});
    	});
    },
    
    /* offset 적용된 Extent 가져오기 */
    getExtentWithOffset: function(evt){
    	
    	/* 시작위치, 끝위치, 리치추가, 구간제거 시 
    	 * 좌측 레이어 및 검색창 크기 변경될때 
    	 * 포인트가 좌측으로 치우치는 현상이 있어 계산 로직 추가 */
    	var tileInfo = me.tileInfo;
		var curLevel = me.map.getLevel();
		var resolution = tileInfo.lods[curLevel].resolution;
		
    	var initWidth = Ext.getCmp("west_container").initWidth;
		var leftWidth = Ext.getCmp("west_container").getWidth();
		var isCollapsed = Ext.getCmp("west_container").collapsed;
		
		if(isCollapsed != false)
			leftWidth = 0;
		
		var offset = (initWidth - leftWidth) * resolution;
		////console.info(evt);
		// 위에서 계산된 offset 적용
		if(evt.x != undefined)
			evt.x = evt.x + offset;
		
		if(evt.xmin != undefined)
			evt.xmin = evt.xmin + offset;
		if(evt.xmax != undefined)
			evt.xmax = evt.xmax + offset;
		
		if(evt.cache != undefined){
			
			if(evt.cache.extent != undefined){
				
				evt.cache.extent.xmax = evt.cache.extent.xmax + offset;
				evt.cache.extent.xmin = evt.cache.extent.xmin + offset;
			}
		}
		
		return evt;
		
		if(evt.rings != undefined){
			
			for(var i = 0; evt.rings.length; i++){
				
				var points = evt.rings[i];
				////console.info(points);
				if(points != undefined){
					
					for(var j = 0; j < points.length; j++){
						////console.info(points[j][0]);
						//points[j][0] = points[j][0] + offset;
					}
				}
			}
		}
		
		return evt;
    },
    
    /* 심볼그리기 */
    drawSymbol: function(evt, symbol, drawOption){
    	
    	var me = this;
    	
    	require(["esri/graphic"], function(Graphic){
    		
    		var isDraw = true;
    		var graphic = new Graphic(evt, symbol);
    		
    		if(drawOption == "startPoint" || drawOption == "start"){
    		
    			// 시작위치 심볼 인덱스 검색
	    		for(var i = 0; i < me.arrStartSym.length; i++){
	    			
	    			if(graphic == me.arrStartSym[i]){
	    				
	    				isDraw = false;
	    				break;
	    			}
	    		}
    		}
    		
    		if(drawOption == "endPoint" || drawOption == "end"){
        		
    			// 끝위치 심볼 인덱스 검색
	    		for(var i = 0; i < me.arrEndSym.length; i++){
	    			
	    			if(graphic == me.arrEndSym[i]){
	    				
	    				isDraw = false;
	    				break;
	    			}
	    		}
    		}
    		
    		if(isDraw == true){
    			
    			// 아직 심볼 배열에 넣기 전임을 유의하자..
    			if(me.arrStartSym.length != me.arrEndSym.length){ // 시작위치, 끝위치 심볼 쌍이 다를 때
    				
    				// 시작위치 클릭 됐을때
    				if(drawOption == "startPoint" || drawOption == "start"){
    					
    					// 시작위치 심볼 갯수가 클때만
    					if(me.arrStartSym.length > me.arrEndSym.length){
    						
	    					// 시작위치 심볼 그래픽 제거
	    					me.removeGraphics(me.arrStartSym[me.arrStartSym.length - 1], "symbolGrpLayer");
	    					// 시작위치 심볼 배열에서 제거
	    					me.arrStartSym.splice(me.arrStartSym.length - 1);
							
							me.arrStDownLine = []; // 시작위치 하류 배열 초기화
							me.arrStartLine = []; // 시작위치 라인 배열 초기화
							me.minStartRchDid = ""; // 시작위치 최상류 라인 아이디 초기화
    					}
					}
					
    				// 끝위치 클릭 됐을때
					if(drawOption == "endPoint" || drawOption == "end"){
						
						// 끝위치 심볼 갯수가 클때만
						if(me.arrEndSym.length > me.arrStartSym.length){
							
							// 끝위치 심볼 그래픽 제거
	    					me.removeGraphics(me.arrEndSym[me.arrEndSym.length - 1], "symbolGrpLayer");
	    					// 끝위치 심볼 배열에서 제거
	    					me.arrEndSym.splice(me.arrEndSym.length - 1);
							
							me.arrEdDownLine = []; // 끝위치 하류 배열 초기화
							me.arrEndLine = []; // 끝위치 라인 배열 초기화
							me.minEndRchDid = ""; // 끝위치 최상류 라인 아이디 초기화
						}
					}
    			}
    			else{// 시작위치, 끝위치 심볼 쌍이 같을 때
    				
    				me.arrStDownLine = []; // 시작위치 하류 배열 초기화
					me.arrStartLine = []; // 시작위치 라인 배열 초기화
					me.minStartRchDid = ""; // 시작위치 최상류 라인 아이디 초기화
					
					me.arrEdDownLine = []; // 끝위치 하류 배열 초기화
					me.arrEndLine = []; // 끝위치 라인 배열 초기화
					me.minEndRchDid = ""; // 끝위치 최상류 라인 아이디 초기화
    			}
    			
    			me.addGraphics(graphic, "symbolGrpLayer"); // 그래픽 추가
    			
    			// 여기서 심볼 배열에 넣음..
    			if(drawOption == "startPoint" || drawOption == "start"){
    				
	    			// 시작위치 심볼 배열에 넣기
	    			me.arrStartSym.push(graphic);
    			}
    			
    			if(drawOption == "endPoint" || drawOption == "end"){
    				
	    			// 끝위치 심볼 배열에 넣기
	    			me.arrEndSym.push(graphic);
    			}
    		}
    	});
    },
    
    /* 라인 그리기 */
    drawLine: function(graphic, symbol, layerId){
    	
    	var me = this;
    	var isDraw = true;
    	
    	var curRchDid = graphic.attributes.RCH_DID; // 현재 RCH ID
    	
    	for(var i = 0; i < me.arrLineGrp.length; i++){
    		
    		var preRchDid = me.arrLineGrp[i].attributes.RCH_DID; // 배열 RCH ID
    		
    		if(curRchDid == preRchDid){
    			
    			isDraw = false;
    			break;
    		}
    	}
    	
    	if(isDraw == true){
    		
	    	// 그래픽 그린다.
    		graphic.setSymbol(symbol);
			me.addGraphics(graphic, layerId);
			
			// 배열에 넣기
			me.arrLineGrp.push(graphic);
			////console.info(curRchDid);
			// 해당 집수구역 조회, 그리기
			me.selectAreaWithLine(graphic, "draw");
    	}
    	
    	//160705 pdj 그리기 완료후 검색결과 on
    	SetBtnOnOff("btnSearchResult");
    },
    
    /* 라인 지우기 */
    removeLine: function(graphic, layerId){
    	
    	var me = this;
    	var removeIdx = -1;
    	var removeGrp = null;
    	
    	for(var i = 0; i < me.arrLineGrp.length; i++){
    		
    		var curRchDid = graphic.attributes.RCH_DID; // 현재 RCH ID
    		var preRchDid = me.arrLineGrp[i].attributes.RCH_DID; // 배열 RCH ID
    		
    		if(curRchDid == preRchDid){
    			
    			removeGrp = me.arrLineGrp[i];
    			removeIdx = i;
    			break;
    		}
    	}
    	
    	if(removeGrp != null){
    		
	    	// 그래픽 삭제.
			me.removeGraphics(removeGrp, layerId);
			
			me.arrLineGrp.splice(removeIdx, 1); // 배열에서 제거
			
			// 해당 집수구역 조회, 제거
			me.selectAreaWithLine(graphic, "remove");
    	}
    },
    
    /* 집수구역 그리기 */
    drawArea: function(graphic, symbol, layerId){
    	
    	var me = this;
    	var isDraw = true;
    	
    	for(var i = 0; i < me.arrAreaGrp.length; i++){
    		
    		var curCatDid = graphic.attributes.CAT_DID; // 현재 CAT ID
    		var preCatDid = me.arrAreaGrp[i].attributes.CAT_DID; // 배열 CAT ID
    		
    		if(curCatDid == preCatDid){
    			
    			isDraw = false;
    			break;
    		}
    	}
    	
    	if(isDraw == true){
    		
	    	// 그래픽 그린다.
	    	graphic.setSymbol(symbol);
			me.addGraphics(graphic, layerId);
			
			// 배열에 넣기
			me.arrAreaGrp.push(graphic);
    	}
    },
    
    /* 집수구역 지우기 */
    removeArea: function(graphic, layerId){
    	
    	var me = this;
    	var removeIdx = -1;
    	var removeGrp = null;
    	
    	for(var i = 0; i < me.arrAreaGrp.length; i++){
    		
    		var curCatDid = graphic.attributes.CAT_DID; // 현재 CAT ID
    		var preCatDid = me.arrAreaGrp[i].attributes.CAT_DID; // 배열 CAT ID
    		
    		if(curCatDid == preCatDid){
    			
    			removeGrp = me.arrAreaGrp[i];
    			removeIdx = i;
    			break;
    		}
    	}
    	
    	if(removeGrp != null){
    		
	    	// 그래픽 삭제.
			me.removeGraphics(removeGrp, layerId);
			
			me.arrAreaGrp.splice(removeIdx, 1); // 배열에서 제거
    	}
    },
    
    /* 그래픽 그리기
     * graphic: 그래픽 오브젝트, layerId: 그래픽 레이어 아이디 */
    addGraphics: function(graphic, layerId){
    	
    	require(["esri/layers/GraphicsLayer"], function(GraphicsLayer){
    		
    		var gLayer = $KRF_APP.coreMap.map.getLayer(layerId);
    		
    		if(gLayer == null || gLayer.graphics == undefined){
    			
    			gLayer = new GraphicsLayer();
	        	gLayer.id = layerId;
	        	$KRF_APP.coreMap.map.addLayer(gLayer);
    		}
    		
    		if(graphic){
    			
    			gLayer.add(graphic);
    		}
    	});
    },
    
    // 그래픽 삭제
    removeGraphics: function(graphic, layerId){
    	
    	var me = this;
    	
    	require(["esri/layers/GraphicsLayer"], function(GraphicsLayer){
    		
    		var gLayer = me[layerId];
    		
    		if(gLayer != null && gLayer.graphics != undefined){
    			gLayer.remove(graphic);
    		}
    	});
    },
    
    // 그리기 종료
    drawEnd: function(btnId){
    	
    	me = this;
    	
    	if(me.selectionToolbar != undefined && me.selectionToolbar != null){
    		
	    	me.selectionToolbar.deactivate();
	    	me.selectionToolbar = null;
	    	me.map.enablePan();
    	}
    	
    	Ext.get('_mapDiv__gc').setStyle('cursor','default');
    	
    	if(btnId != null && btnId != undefined){
    		
	    	// 버튼 off
	    	SetBtnOnOff(btnId, "off");
    	}
    },
    
    /* 시작위치, 끝위치, 리치라인, 집수구역 그래픽 레이어 초기화 */
    clearGraphicsLayer: function(){
    	
    	var me = this;
    	
    	// 중지 요청
    	me.isStopRequest = true;
    		
		if(me.downLineLayer != null && me.downLineLayer != undefined){
    		me.downLineLayer.clear(); // 하류 리치라인 초기화
    	}
		
		if(me.lineGrpLayer != null && me.lineGrpLayer != undefined){
    		me.lineGrpLayer.clear(); // 리치라인 초기화
    	}
		
    	if(me.areaGrpLayer != null && me.areaGrpLayer != undefined){
    		me.areaGrpLayer.clear(); // 집수구역 초기화
    	}
    	
    	if(me.symbolGrpLayer != null && me.symbolGrpLayer != undefined){
			me.symbolGrpLayer.clear(); // 심볼 레이어 초기화
		}
		
		if(me.pointGrpLayer != null && me.pointGrpLayer != undefined){
			me.pointGrpLayer.clear(); // 포인트 레이어 초기화
		}
    	
    	me.arrStartSym = []; // 시작위치 심볼 그래픽 배열
    	me.arrEndSym = []; // 끝위치 심볼 그래픽 배열
    	me.arrLineGrp = []; // 리치라인 그래픽 배열
    	me.arrAreaGrp = []; // 집수구역 그래픽 배열
    	me.arrStDownLine = []; // 시작위치 하류 배열
    	me.arrEdDownLine = []; // 끝위치 하류 배열
    	me.arrStartLine = []; // 시작위치 라인 배열
    	me.arrEndLine = []; // 끝위치 라인 배열
    	
    	me.minStartRchDid = ""; // 시작위치 최상류 라인 아이디 초기화
    	me.minEndRchDid = ""; // 끝위치 최상류 라인 아이디 초기화
    	
    	// 시작위치 끝위치 하천명 초기화
    	ResetStEdSiteName();
    }
});
