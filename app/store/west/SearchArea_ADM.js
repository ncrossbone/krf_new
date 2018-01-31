Ext.define('krf_new.store.west.SearchArea_ADM', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	
	parentADMCD: '',
	
	layerId: '', // 레이어 아이디

	listeners: {
		beforeload: function(store) {
			var idColumn, nameColumn, whereStr;
			
			idColumn = "ADM_CD";
			
			if(store.layerId == _admSidoLayerId){ nameColumn = "DO_NM"; whereStr = "1=1" }
			if(store.layerId == _admSigunguLayerId){ nameColumn = "CTY_NM"; whereStr = "ADM_CD LIKE '" + store.parentADMCD.substring(0,2) + "%'"}
			if(store.layerId == _admDongLayerId){ nameColumn = "DONG_NM"; whereStr = "ADM_CD LIKE '" + store.parentADMCD.substring(0,5) + "%'"}
			// id, name 셋팅이 안돼있으면 리턴
			if(idColumn == undefined || nameColumn == undefined || whereStr == undefined)
				return;
			
			var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + "/" + store.layerId); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = whereStr;
			query.outFields = ["*"];
			
			queryTask.execute(query,  function(results){
				var data = results.features;
				data.sort(function(a,b){
					var aVal = a.attributes[nameColumn];
					var bVal = b.attributes[nameColumn]
					if(aVal > bVal){ return 1; }
					else if(aVal < bVal){ return -1; }
					else{ return 0; }
				});
				var receiveData = [];
				Ext.each(data, function(media, index) {
					
					var idVal = media.attributes[idColumn];
					var nameVal = media.attributes[nameColumn];
					
					receiveData.push({id: idVal, name: nameVal});
	   				if(data.length==index+1){ store.setData(receiveData); }
				});
			});
        }
    }
});
