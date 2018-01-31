Ext.define('krf_new.store.west.Layer02Store', {
	
	extend: 'Ext.data.TreeStore',

	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'resources/data/west/Layer02Data.json',
		reader: {
			type: 'json'
		}
	},
	
	constructor: function(){
		this.callParent();
	},
	
	listeners: {
		// beforeload, load, afterload
		beforeload: function(store) {
			// khLee 추후 동적 레이어 바인딩 고려..
			return;
			var queryTask = new esri.tasks.QueryTask('http://fireftp.iptime.org:6080/arcgis/rest/services/reach/MapServer/f=pjson'); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = "1=1";
			query.outFields = ["*"];
			
			queryTask.execute(query,  function(results){
				
				/* 트리 바인딩 구조 텍스트 만들기 */
				var jsonStr = "[";
				
				Ext.each(results.layers, function(objLayer, idx, objLayers){
					
					// 상위 node일때
					if(objLayer.parentLayerId == -1){
						jsonStr += "{\n";
						jsonStr += "	\"id\": \"" + objLayer.id + "\",\n";
						jsonStr += "	\"text\": \"" + objLayer.name + "\",\n";
						jsonStr += "	\"checked\": false,\n";
						
						// children node가 있을때
						if(objLayer.subLayerIds != null){
							jsonStr += "	\"expanded\": true,\n"; // 펼치기..
							jsonStr += "\n	\"children\": [";
							for(i = 0; i < objLayer.subLayerIds.length; i++){
								jsonStr += "{\n";
								jsonStr += "		\"id\": \"" + objLayers[objLayer.subLayerIds[i]].id + "\",\n";
								jsonStr += "		\"text\": \"" + objLayers[objLayer.subLayerIds[i]].name + "1\",\n";
								jsonStr += "		\"leaf\": true,\n";
								jsonStr += "		\"checked\": false\n";
								jsonStr += "	}, ";
								if(i == objLayer.subLayerIds.length - 1){
									jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
									jsonStr += "]\n}, ";
								}
							}
						}
						// children node가 없을때
						else{
							jsonStr += "	\"leaf\": true"; 
							jsonStr += "\n}, "
						}
					}
					
				});
				
				jsonStr = jsonStr.substring(0, jsonStr.length - 2); // 마지막에 "," 빼기
				jsonStr += "]";
				store.setData(JSON.parse(jsonStr));
			});
			
			dojo.connect(queryTask, "onError", function(err) {
				alert(err);
			});
		}
	}
});
