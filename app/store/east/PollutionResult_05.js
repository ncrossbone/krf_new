Ext.define('krf_new.store.east.PollutionResult_05', {
    extend : 'Ext.data.Store',
    fields: [
    ],
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			var url = ""
			if(store.selectValue == "11" || store.selectValue == ""){
                url= _API.PollutionSelect_05_01; //'./resources/jsp/pollution/PollutionSelect_05_01.jsp';
			}else if(store.selectValue == "22"){
                url= _API.PollutionSelect_05_02; //'./resources/jsp/pollution/PollutionSelect_05_02.jsp';
			}else if(store.selectValue == "33"){
                url= _API.PollutionSelect_05_03; //'./resources/jsp/pollution/PollutionSelect_05_03.jsp';
			}else{
                url= _API.PollutionSelect_05_04; //'./resources/jsp/pollution/PollutionSelect_05_04.jsp';
			}
			Ext.Ajax.request({
        		url: url,
        		params: { 
        			catDid: store.catDid,
        			year: store.year
        		},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			var jsonData = Ext.util.JSON.decode( response.responseText );
        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
        				store.setData(jsonData.data);
        			}
        		},
        		failure: function(form, action) {
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
});