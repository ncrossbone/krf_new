/* 검색설정 상류 체크 시 이벤트지점부터 상류 무조건 검색
 * 중권역, 댐/보 체크 */
Ext.define("krf_new.view.map.SearchReachLine", {
	getFeaturesWithEvent: function(evt, callbackMethod){
		
		var me = this;
		
		require(["esri/tasks/query",
	         "esri/tasks/QueryTask",
	         "esri/geometry/Point",
	         "esri/geometry/Extent"], function(Query, QueryTask, Point, Extent){
			
			if(evt.type == "point"){
				
	        	var centerPoint = new Point(evt.x, evt.y, evt.spatialReference);
	        	var mapWidth = $KRF_APP.coreMap._krad.map.extent.getWidth();
	        	var pixelWidth = mapWidth / $KRF_APP.coreMap._krad.map.width;
	        	var tolerance = 10 * pixelWidth;
	        	
	        	var queryExtent = new Extent(1, 1, tolerance, tolerance, evt.spatialReference);
	        	
	        	evt = queryExtent.centerAt(centerPoint);
	    	}
			
			var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["CAT_DID", "RCH_DID", "LU_RCH_DID", "RU_RCH_DID", "GEO_TRIB"];
			query.geometry = evt;
			
			// 리치라인 조회
			queryTask.execute(query, function(lineFeatureSet){
				
				// 집수구역 조회
				$KRF_APP.coreMap._rchArea.getFeaturesWithEvent(evt, function(areaFeatures){
					
					// 이벤트 위치에 리치라인이 없을 때
					if(lineFeatureSet.features.length == 0){
						
						// 이벤트 위치에 집수구역이 있을 때
						if(areaFeatures.length > 0){
							
							var where = "CAT_DID IN (";
							
							for(var i = 0; i < areaFeatures.length; i++){
								
								where += "'" + areaFeatures[i].attributes.CAT_DID + "', ";
							}
							
							where = where.substring(0, where.length - 2) + ")";
							
							// 조건으로 리치라인 조회
							me.getFeaturesWithWhere(where, function(lineFeatures){
								// 콜백
								callbackMethod(lineFeatures);
							});
						}
					} else{
						// 콜백
						callbackMethod(lineFeatureSet.features);
					}
				});
			});
		});
	},
    getFeaturesWithWhere: function(where, callbackMethod){
    	
    	require(["esri/tasks/query",
    	         "esri/tasks/QueryTask"],
    	         function(Query,
    	        		 QueryTask){
    		
	    	var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachLineLayerId); // 리치라인 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["CAT_DID", "RCH_DID", "LU_RCH_DID", "RU_RCH_DID", "GEO_TRIB"];
			query.where = where;
			
			// 리치라인 조회
			queryTask.execute(query, function(featureSet){
				if(featureSet.features.length == 0){
				}
				callbackMethod(featureSet.features);
			});
    	});
    }
});