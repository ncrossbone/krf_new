/* 검색설정 상류 체크 시 이벤트지점부터 상류 무조건 검색
 * 중권역, 댐/보 체크 */
Ext.define("krf_new.view.map.SearchReachUp", {
	mbId: "",
	searchWithEvent: function(evt){
		
		var me = this;
		
		if(evt.mapPoint != undefined && evt.mapPoint.type != undefined){
			
			evt = evt.mapPoint;
		}
		
		var mapClickEvt = $KRF_APP.coreMap._krad.mapClickEvt;
		
		if(mapClickEvt.mapPoint != undefined){
			
			mapClickEvt = mapClickEvt.mapPoint;
		}
		
		// 맵 펜(이동) 시 리턴
		if(evt.x != mapClickEvt.x || evt.y != mapClickEvt.y){
			
			return false;
		}
		
		// 맵 클릭 이벤트 끄기
		$KRF_APP.coreMap._krad.offMapClickEvt();
		
		 // 심볼 그리기
		$KRF_APP.coreMap._krad.drawSymbol(evt);
		
		$KRF_APP.coreMap._rchLine.getFeaturesWithEvent(evt, function(features){
			
			for(var i = 0; i < features.length; i++){
				
				me.searchUpWithFeature(features[i], 0);
				// 종료 검색 체크
				//_krad.isStopCheck();
			}
		});
    },
    // 상류검색, 그래픽 그리기
    searchUpWithFeature: function(lineFeature, cnt){
    	var me = this;
    	
    	/* 초기화 시 검색 종료 */
    	if($KRF_APP.coreMap._krad.searchStopCheck(cnt) == false){ return false };
    	
    	$KRF_APP.coreMap._krad.searchCnt++; // 검색 카운트 증가

    	// 리치 아이디 속성
    	var rchDid = lineFeature.attributes.RCH_DID.replace(/ /gi, "");
    	
    	if(rchDid == ""){
    		
    		return;
    	}
    	
    	var isDrawGraphic = false;
    	var isUpSearch = false;
    	
    	var luRchDid = lineFeature.attributes.LU_RCH_DID.replace(/ /gi, ""); // 좌측 상류 아이디
    	var ruRchDid = lineFeature.attributes.RU_RCH_DID.replace(/ /gi, ""); // 우측 상류 아이디
    	var catDid = lineFeature.attributes.CAT_DID.replace(/ /gi, ""); // 집수구역 아이디
    	
    	// 본류/지류 속성
    	var geoTrib = lineFeature.attributes.GEO_TRIB;
    	// 본류 체크 여부
    	var isBonDraw = $KRF_APP.coreMap._krad.searchConfigInfoJson.isBonDraw;
    	// 지류 체크 여부
    	var isJiDraw = $KRF_APP.coreMap._krad.searchConfigInfoJson.isJiDraw;
    	// 중권역 체크 여부
    	var isMWDraw = $KRF_APP.coreMap._krad.searchConfigInfoJson.isMWDraw;
    	// 댐/보 체크 여부
    	var isDaemBoDraw = $KRF_APP.coreMap._krad.searchConfigInfoJson.isDaemBoDraw;
    	
    	/* 본류/지류 체크 여부 확인 */
    	if(geoTrib == 0){
    		
    		if(isBonDraw == true){
    			
    			isDrawGraphic = true;
    			isUpSearch = true;
    		}
    	} else{
    		if(isJiDraw == true){
    			
    			isDrawGraphic = true;
    			isUpSearch = true;
    		} else{
    			
    			if(cnt == 0){
    				
	    			alert("해당 위치는 본류에 속하지 않습니다. 검색설정을 확인하세요.");
	    			// 마지막 심볼 삭제
	    			$KRF_APP.coreMap._krad.removeLastSymbol();
	    			return false;
    			}
    		}
    	}
    	/* 본류/지류 체크 여부 확인 끝 */
    		
    		// 현재 line feature 집수구역 조회
    	$KRF_APP.coreMap._rchArea.getFeaturesWithWhere("CAT_DID = '" + catDid + "'", function(areaFeatures){

			if(areaFeatures.length > 0){
				
				for(var i = 0; i < areaFeatures.length; i++){

	    			/* 중권역 체크 여부 확인 */
	    			if(isMWDraw == true){
	    				
	    				var tmpMbId = areaFeatures[i].attributes.MB_ID.replace(/ /gi, ""); // 중권역 아이디
	    				
	    				// 최초 중권역 아이디 셋팅
	    				if(cnt == 0){
	    					
	    					me.mbId = tmpMbId;
	    				}
	    				
	    				// 최초 중권역 아이디와 현재 Feature 중권역 아이디가 다를 때
	    				if(me.mbId != tmpMbId){
	    					
	    					isDrawGraphic = false;
	    	    			isUpSearch = false;
	    				}
	    			}
	    			/* 중권역 체크 여부 확인 끝 */
				}
			}
			
			/* 댐/보 체크 여부 확인 */
			if(isDaemBoDraw == false){
				
				// 그래픽 그리기
	    		me.drawGraphic(isDrawGraphic, lineFeature, areaFeatures);
	    		
	    		cnt++; // 상류 검색 전 카운트 증가
	    		
	    		// 좌측 상류 검색
	    		me.searchUpWithWhere(isUpSearch, "RCH_DID = '" + luRchDid + "'", cnt);
	    		// 우측 상류 검색
	    		me.searchUpWithWhere(isUpSearch, "RCH_DID = '" + ruRchDid + "'", cnt);
			} /* 댐/보 체크 여부 확인 끝 */
			else{
				
				/* 현재 line feature 상류 막고있는 리치노드 조회 */
				// LD_RCH_DID : 노드 기준으로 하류 좌측 유출 아이디
				$KRF_APP.coreMap._rchNode.getFeaturesWithWhere("LD_RCH_DID = '" + rchDid + "'", function(ldNodeFeatures){
					
					// LD_RCH_DID : 노드 기준으로 하류 좌측 유출 아이디
					$KRF_APP.coreMap._rchNode.getFeaturesWithWhere("RD_RCH_DID = '" + rchDid + "'", function(rdNodeFeatures){
	    				
	    				var ldDamFlag = "";
	    				var ldBoFlag = "";
	    				var rdDamFlag = "";
	    				var rdBoFlag = "";
	    				
	    				for(var i = 0; i < ldNodeFeatures.length; i++){
	    					
	    					ldDamFlag = ldNodeFeatures[i].attributes.DAM_FLAG;
	    					ldBoFlag = ldNodeFeatures[i].attributes.BO_FLAG;
	    					
	    					if(ldDamFlag == "1" || ldBoFlag == "1"){
	    						
	    						isDrawGraphic = true;
		    	    			isUpSearch = false;
	    					}
	    				}
	    				
	    				for(var i = 0; i < rdNodeFeatures.length; i++){
	    					
	    					rdDamFlag = rdNodeFeatures[i].attributes.DAM_FLAG;
	    					rdBoFlag = rdNodeFeatures[i].attributes.BO_FLAG;
	    					
	    					if(rdDamFlag == "1" || rdBoFlag == "1"){
	    						
	    						isDrawGraphic = true;
		    	    			isUpSearch = false;
	    					}
	    				}
	    				
	    				// 그래픽 그리기
	    	    		me.drawGraphic(isDrawGraphic, lineFeature, areaFeatures);
	    	    		
	    	    		cnt++; // 상류 검색 전 카운트 증가
	    	    		
	    	    		// 좌측 상류 검색
	    	    		me.searchUpWithWhere(isUpSearch, "RCH_DID = '" + luRchDid + "'", cnt);
	    	    		// 우측 상류 검색
	    	    		me.searchUpWithWhere(isUpSearch, "RCH_DID = '" + ruRchDid + "'", cnt);
	    			});
				});
				/* 현재 line feature 상류 막고있는 리치노드 조회 끝 */
			}
    	});
    },
    drawGraphic: function(isDrawGraphic, lineFeature, areaFeatures){
    	//console.info(me.mbId);
		if(isDrawGraphic == true){
			
    		/* 라인 그래픽 그리기 */
			$KRF_APP.coreMap._krad.drawGraphic(lineFeature, "reachLine");
			
			/* 집수구역 그래픽 그리기 */
			for(var i = 0; i < areaFeatures.length; i++){
				
				$KRF_APP.coreMap._krad.drawGraphic(areaFeatures[i], "reachArea");
			}
		}
    },
    searchUpWithWhere: function(isUpSearch, where, cnt){
    	var me = this;
    	
    	if(isUpSearch == true){
    		
			// 상류 리치라인 조회
    		$KRF_APP.coreMap._rchLine.getFeaturesWithWhere(where, function(features){
    			
    			for(var i = 0; i < features.length; i++){
    				
    				// 상류검색, 그래픽 그리기
    				me.searchUpWithFeature(features[i], cnt);
    				// 종료 검색 체크
					//_krad.isStopCheck();
    			}
    		});
    	}
    }
});