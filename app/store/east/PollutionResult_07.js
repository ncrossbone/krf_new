Ext.define('krf_new.store.east.PollutionResult_07', {
    extend : 'Ext.data.Store',
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'ADDR'
			,'FINAL_PERCENTAGE'
			,'INST_NM'
			,'IND_NM'
			,'IND_OWNER'
			,'IND_ID'
			,'OT_NM'
			,'EH_NM'
			,{name: 'WW_AMT' ,type: 'number'}
    ],
    remoteSort: true,	
    async:false,
    listeners: {
		load: function(store) {
			var url = ""
			if(store.selectValue == "11" || store.selectValue == ""){
				url= _API.PollutionSelect_07_01; //'./resources/jsp/pollution/PollutionSelect_07_01.jsp';
			}else if(store.selectValue == "22"){
				url= _API.PollutionSelect_07_02; //'./resources/jsp/pollution/PollutionSelect_07_02.jsp';
			}else if(store.selectValue == "33"){
				url= _API.PollutionSelect_07_03; //'./resources/jsp/pollution/PollutionSelect_07_03.jsp';
			}else{
				url= _API.PollutionSelect_07_04; //'./resources/jsp/pollution/PollutionSelect_07_04.jsp';
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