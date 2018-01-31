Ext.define('krf_new.store.drone.FeatureStoreLayerAdmin2', {
	extend: 'Ext.data.Store',
	
	fields: [
	         'layerNm',
	         'layerCd',
	         'tmX',
	         'tmY'
	     ],
	searchType: '',
	remoteSort: true,
	
	listeners: {
		load: function(map) {
			var me = this;
		    me.map = map;
			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.MapserviceUrl1 + "/" + $KRF_DEFINE.featureLayerId); // 레이어 
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "수계코드 = 10 AND 측정소코드 NOT LIKE '1018%'";
			query.outFields = ["*"];
			
			queryTask.execute(query,  function(results){
				var jsonStr = "	 {\"data\": [	";
				for(var layerNum = 0 ; layerNum < results.features.length ; layerNum++ ){
					jsonStr +=  " {  \"layerNm\"  :	 \""+results.features[layerNum].attributes.측정소명+ "\" ,  	\n";
					jsonStr +=  "   \"layerCd\"  :	 \""+results.features[layerNum].attributes.측정소코드+ "\" ,  	\n";
					jsonStr +=  "   \"tmX\"  :	 \""+results.features[layerNum].attributes.TM_X+ "\" ,  	\n";
					jsonStr +=  "   \"level\"  :	 \"10\" ,  	\n";
					jsonStr +=  "   \"tmY\"  :	 \""+results.features[layerNum].attributes.TM_Y+ "\" }  	\n";
					
					if(results.features.length != layerNum){
						if(results.features.length - 1 == layerNum){
							jsonStr += " ";
						}else{
							jsonStr += " , ";
						}
					}
				}
				jsonStr += "]}";
				var jsonData = Ext.util.JSON.decode(jsonStr);
				me.map.setData(jsonData.data);
			});
		    
			queryTask.on("complete", function(featureSet) {
			});
		}
	}
});//
