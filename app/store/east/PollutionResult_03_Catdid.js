Ext.define('krf_new.store.east.PollutionResult_03_Catdid', {
    extend : 'Ext.data.Store',
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'WUSE_W_SUM'
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			Ext.Ajax.request({
                url: _API.PollutionSelect_03_Catdid, //'./resources/jsp/pollution/PollutionSelect_03_Catdid.jsp',
        		params: { 
        			catDid: store.catDid,
        			year: store.year
        		},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			var jsonData = Ext.util.JSON.decode( response.responseText );
        			if(jsonData.data.length != 0){
        				store.setData(jsonData.data);
        			}else{
        				return;
        			}
        		},
        		failure: function(form, action) {
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
});