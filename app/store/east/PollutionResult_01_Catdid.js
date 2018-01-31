Ext.define('krf_new.store.east.PollutionResult_01_Catdid', {
    extend : 'Ext.data.Store',
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'AREA_A1'
			,'AREA_A2'
			,'AREA_SUM'
			,'REGION'
			,'REGION_DATE'
			,'U_A1_TP_CODE'
			,'U_A1_TP_DATE'
			,'U_A1_TP_NAME'
			,'U_A3_TP_CODE'
			,'U_A3_TP_DATE'
			,'U_A3_TP_NAME'
			,'POP_SUM'
			,'UPOP_SUM'
			,'UPOP_A1_SUM'
			,'UPOP_A1_SEPARATE_WT_SUM'
			,'UPOP_A1_SEPARATE_IT_SUM'
			,'UPOP_A1_COMBINED_WT_SUM'
			,'UPOP_A1_COMBINED_IT_SUM'
			,'UPOP_A2_SUM'
			,'UPOP_A2_SANITARY'
			,'UPOP_A2_SEPTIC'
			,'UPOP_A2_REMOVAL'
			,'SPOP_SUM'
			,'SPOP_A1_SUM'
			,'SPOP_A1_SEPARATE_WT_SUM'
			,'SPOP_A1_SEPARATE_IT_SUM'
			,'SPOP_A1_COMBINED_WT_SUM'
			,'SPOP_A1_COMBINED_IT_SUM'
			,'SPOP_A2_SUM'
			,'SPOP_A2_SANITARY'
			,'SPOP_A2_SEPTIC'
			,'SPOP_A2_REMOVAL'
    ],
    
    remoteSort: true,	
    async:false,
    listeners: {
		load: function(store) {
			
			Ext.Ajax.request({
                url: _API.PollutionSelect_01_Catdid, //'./resources/jsp/pollution/PollutionSelect_01_Catdid.jsp',
        		params: { 
        			catDid: store.catDid,
        			year: store.year
        		},
        		async: false, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			var jsonData = Ext.util.JSON.decode( response.responseText );

        			if(jsonData.data.length != 0){
        				store.setData(jsonData.data);
        			} else{
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