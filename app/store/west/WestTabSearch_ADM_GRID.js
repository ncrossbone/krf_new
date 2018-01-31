Ext.define('krf_new.store.west.WestTabSearch_ADM_GRID', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	autoLoad: true, // controller(onAreaChange)에서 store.load();

	remoteSort: true,
	
	parentADMCD: '',
	
	layerId: '', // 레이어 아이디

	listeners: {
		beforeload: function(store) {
			var idColumn, nameColumn, whereStr;
			
			idColumn = "ADM_CD";
			
			store.layerId = "67";
			
			if(store.layerId == '66'){ nameColumn = "DO_NM"; whereStr = "1=1" }
			if(store.layerId == '67'){ nameColumn = "CTY_NM"; whereStr = "ADM_CD LIKE '" + store.parentADMCD + "%'"}
			if(store.layerId == '68'){ nameColumn = "DONG_NM"; whereStr = "ADM_CD LIKE '" + store.parentADMCD.substring(0,4) + "%'"}
			
			// id, name 셋팅이 안돼있으면 리턴
			if(idColumn == undefined || nameColumn == undefined || whereStr == undefined)
				return;
			
			var queryTask = new esri.tasks.QueryTask(KRF_DEV.app.layer1Url + store.layerId); // 레이어 URL
			var query = new esri.tasks.Query();
			query.returnGeometry = false;
			query.where = whereStr;
			query.outFields = ["*"];
			
			var fieldNames = [];
			queryTask.execute(query,  function(results){
				Ext.each(results.fields, function(objField, index, objFields){
					fieldNames.push(objField.name);
				});
				this.fields = fieldNames;
				
				var data = results.features;
				data.sort(function(a,b){
					
					var aVal = a.attributes[nameColumn];
					var bVal = b.attributes[nameColumn];
					
					if(aVal > bVal){ return 1; }
					else if(aVal < bVal){ return -1; }
					else{ return 0; }
					
				});
				
				var receiveData = [];
				
				Ext.each(data, function(media, index) {
					
					var idVal = media.attributes[idColumn];
					var nameVal = media.attributes[nameColumn];
					
					receiveData.push({id: idVal, name: nameVal});
	   				if(data.length==index+1){ 
	   					store.setData(receiveData); 
	   				}
				});
			});
        }
    }
});
