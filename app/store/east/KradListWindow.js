Ext.define('krf_new.store.east.KradListWindow', {
	extend: 'Ext.data.TreeStore',
	searchType: '',
	remoteSort: true,
	catDid: [],
	listeners: {
		load: function(store) {
				var confInfo = localStorage['_kradExtInfo_'];
				var jsonConf = JSON.parse(confInfo);
				
				var userInfo = localStorage['_kradExtInfo2_'];
				var userJsonConf = JSON.parse(userInfo);
				
				if(jsonConf.length == 0 && userJsonConf.length == 0){
					return;
				}
				
				var jsonStr = "{\n";
				jsonStr += "	\"id\": \"0\", \n";
				jsonStr += "	\"text\":  \"root\", \n";
				jsonStr += "	\"cls\": 'khLee-x-tree-node-text-bold', \n";
				jsonStr += "	\"checked\": true, \n";
				jsonStr += "	\"expanded\": true, \n";
				jsonStr += "	\"children\": [";
				jsonStr += "{\n";
				jsonStr += "	\"id\": \"krad\",\n";
				jsonStr += "	\"text\": \"KRAD\",\n";
				jsonStr += "	\"cls\": \"khLee-x-tree-node-text-bold\",\n";
				jsonStr += "	\"expanded\": false,\n";
				jsonStr += "	\"checked\": null,\n";
				jsonStr += "	\"infoBtnDisabled\": true,\n";
				jsonStr += "	\"chartBtnDisabled\": true,\n";
				jsonStr += "	\"srchBtnDisabled\": false,\n";
				jsonStr += "	\"children\": [\n";
				if(jsonConf.length != 0){
					jsonStr += "	{ \n";
					jsonStr += "	\"id\": \"jsonConf\",\n";
					jsonStr += "	\"text\": \"공통\",  ";
					jsonStr += "		\"expanded\": false,\n";
					jsonStr += "		\"infoBtnDisabled\": true,\n";
					jsonStr += "		\"chartBtnDisabled\": true,\n";
					jsonStr += "		\"srchBtnDisabled\": false,\n";
					jsonStr += "		\"children\": [";
				
					for(var i =0 ;i < jsonConf.length;i++){
						jsonStr += "		{ ";
						jsonStr += "		\"id\": \"" + jsonConf[i].EXT_DATA_ID + "\",\n";
						jsonStr += "		\"text\": \"" + jsonConf[i].TITLE + "\",\n"; // 집수구역별 조회 개수 집어넣자.. 아래서..
						jsonStr += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
						jsonStr += "			\"iconCls\": \"layerNoneImg\",\n";
						jsonStr += "			\"leaf\": true,\n";
						jsonStr += "			\"checked\": null,\n";
						jsonStr += "			\"infoBtnDisabled\": true,\n";
						jsonStr += "			\"chartBtnDisabled\": true,\n";
						jsonStr += "			\"srchBtnDisabled\": false\n";
						
						if(i == jsonConf.length-1){
							jsonStr += "}]\n";
						}else{
							jsonStr += "}\n";
						}
						if(i != jsonConf.length-1){
							jsonStr += ",\n";
						}
					}
					jsonStr += "},\n";
				}
				
				if(userJsonConf.length != 0){
					jsonStr += "	{ \n";
					jsonStr += "	\"id\": \"userJsonConf\",\n";
					jsonStr += "	\"text\": \"사용자지정\",  ";
					jsonStr += "		\"expanded\": false,\n";
					jsonStr += "		\"infoBtnDisabled\": true,\n";
					jsonStr += "		\"chartBtnDisabled\": true,\n";
					jsonStr += "		\"srchBtnDisabled\": false,\n";
					jsonStr += "		\"children\": [";
				
					for(var i =0 ;i < userJsonConf.length;i++){
						jsonStr += "		{ ";
						jsonStr += "		\"id\": \"" + userJsonConf[i].EXT_DATA_ID + "\",\n";
						jsonStr += "		\"text\": \"" + userJsonConf[i].TITLE + "\",\n"; // 집수구역별 조회 개수 집어넣자.. 아래서..
						jsonStr += "			\"cls\": \"khLee-x-tree-node-text-small\",\n";
						jsonStr += "			\"iconCls\": \"layerNoneImg\",\n";
						jsonStr += "			\"leaf\": true,\n";
						jsonStr += "			\"checked\": null,\n";
						jsonStr += "			\"infoBtnDisabled\": true,\n";
						jsonStr += "			\"chartBtnDisabled\": true,\n";
						jsonStr += "			\"srchBtnDisabled\": false\n";
						
						if(i == userJsonConf.length-1){
							jsonStr += "}]\n";
						}else{
							jsonStr += "}\n";
						}
						
						if(i != userJsonConf.length-1){
							jsonStr += ",\n";
						}
					}
					jsonStr += "}\n";
				}
				
				jsonStr += "]\n";
				jsonStr += "}]}";
				
				var jsonData = "";
				jsonData = Ext.util.JSON.decode(jsonStr);
				store.setRootNode(jsonData);
	        }
	  	}
	}
);
