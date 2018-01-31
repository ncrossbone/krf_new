Ext.define('krf_new.store.west.SearchArea_Water', {

	extend : 'Ext.data.Store',

	fields : [ 'id', 'name' ],

	remoteSort : true,

	listeners : {
		beforeload : function(store) {
			var idColumn, nameColumn, whereStr, pId;
			idColumn = "";
			if (store.layerId == $KRF_DEFINE.areaWSLayerId) {
				idColumn = "WS_CD";
				nameColumn = "대권역";
				whereStr = "1=1";
			}
			if (store.layerId == $KRF_DEFINE.areaAMLayerId) {
				idColumn = "MW_CODE";
				nameColumn = "MW_NAME";
				whereStr = "WS_CD = '" + store.parentId + "'";
			}
			if (store.layerId == $KRF_DEFINE.areaASLayerId) {
				idColumn = "SW_CODE";
				nameColumn = "SW_NAME";
				whereStr = "MBSNCD = '" + store.parentId + "'";
			}
			if (idColumn == undefined || nameColumn == undefined || whereStr == undefined){
				return;
			}
				
			var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + "/" + store.layerId); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = whereStr;
			query.outFields = [ idColumn, nameColumn ];

			queryTask.execute(query, function(results) {
				var data = results.features;
				data.sort(function(a, b) {
					var aVal = a.attributes[nameColumn];
					var bVal = b.attributes[nameColumn];
					if (aVal > bVal) {
						return 1;
					} else if (aVal < bVal) {
						return -1;
					} else {
						return 0;
					}
				});

				var receiveData = [];

				Ext.each(data, function(media, index) {

					var idVal = media.attributes[idColumn];
					var nameVal = media.attributes[nameColumn];
					receiveData.push({
						id : idVal,
						name : nameVal
					});

					if (data.length == index + 1) {
						store.setData(receiveData);
					}
				});
			});
		}
	}
});
