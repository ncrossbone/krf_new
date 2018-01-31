/* 검색설정 상류 체크 시 이벤트지점부터 상류 무조건 검색
 * 중권역, 댐/보 체크 */
Ext.define("krf_new.view.map.SearchReachNode", {
	getFeaturesWithWhere: function(where, callbackMethod){
		
		require(["esri/tasks/query",
	         "esri/tasks/QueryTask"], function(Query, QueryTask){
			var queryTask = new QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + $KRF_DEFINE.reachNodeLayerId); // 집수구역 URL
			var query = new Query();
			query.returnGeometry = true;
			query.outFields = ["CAT_DID","DAM_FLAG","BO_FLAG"];
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