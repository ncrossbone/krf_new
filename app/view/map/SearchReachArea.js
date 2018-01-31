/* 검색설정 상류 체크 시 이벤트지점부터 상류 무조건 검색
 * 중권역, 댐/보 체크 */
Ext.define("krf_new.view.map.SearchReachArea", {
	getFeaturesWithEvent: function(evt, callbackMethod){
		
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
			
			var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["CAT_DID","MB_ID"];
			query.geometry = evt;
			
			queryTask.execute(query, function(featureSet){
				
				if(featureSet.features.length == 0){
				}
				
				callbackMethod(featureSet.features);
			});
		});
	},
	getFeaturesWithWhere: function(where, callbackMethod){
		
		require(["esri/tasks/query",
	         "esri/tasks/QueryTask"], function(Query, QueryTask){
			
			var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachAreaLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["CAT_DID","MB_ID"];
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