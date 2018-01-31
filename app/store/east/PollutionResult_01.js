Ext.define('krf_new.store.east.PollutionResult_01', {
    extend : 'Ext.data.Store',
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'ADDR'
			,'FINAL_PERCENTAGE'
			,{name:'AREA_A1'  ,type: 'number'}
			,{name:'AREA_A2'  ,type: 'number'}
			,{name:'AREA_SUM'  ,type: 'number'}
			,'REGION'
			,'REGION_DATE'
			,'U_A1_TP_CODE'
			,'U_A1_TP_DATE'
			,'U_A1_TP_NAME'
			,'U_A3_TP_CODE'
			,'U_A3_TP_DATE'
			,'U_A3_TP_NAME'
			,{name:'POP_SUM'  ,type: 'number'}
			,{name:'UPOP_SUM'  ,type: 'number'}
			,{name:'UPOP_A1_SUM'  ,type: 'number'}
			,{name:'UPOP_A1_SEPARATE_WT_SUM'  ,type: 'number'}
			,{name:'UPOP_A1_SEPARATE_IT_SUM'  ,type: 'number'}
			,{name:'UPOP_A1_COMBINED_WT_SUM'  ,type: 'number'}
			,{name:'UPOP_A1_COMBINED_IT_SUM'  ,type: 'number'}
			,{name:'UPOP_A2_SUM'  ,type: 'number'}
			,{name:'UPOP_A2_SANITARY'  ,type: 'number'}
			,{name:'UPOP_A2_SEPTIC'  ,type: 'number'}
			,{name:'UPOP_A2_REMOVAL'  ,type: 'number'}
			,{name:'SPOP_SUM'  ,type: 'number'}
			,{name:'SPOP_A1_SUM'  ,type: 'number'}
			,{name:'SPOP_A1_SEPARATE_WT_SUM'  ,type: 'number'}
			,{name:'SPOP_A1_SEPARATE_IT_SUM'  ,type: 'number'}
			,{name:'SPOP_A1_COMBINED_WT_SUM'  ,type: 'number'}
			,{name:'SPOP_A1_COMBINED_IT_SUM'  ,type: 'number'}
			,{name:'SPOP_A2_SUM'  ,type: 'number'}
			,{name:'SPOP_A2_SANITARY'  ,type: 'number'}
			,{name:'SPOP_A2_SEPTIC'  ,type: 'number'}
			,{name:'SPOP_A2_REMOVAL'  ,type: 'number'}
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			
			var url = ""
			
			if(store.selectValue == "11" || store.selectValue == ""){
                url= _API.PollutionSelect_01_01; //'./resources/jsp/pollution/PollutionSelect_01_01.jsp';
			}else if(store.selectValue == "22"){
                url= _API.PollutionSelect_01_02; //'./resources/jsp/pollution/PollutionSelect_01_02.jsp';
			}else if(store.selectValue == "33"){
                url= _API.PollutionSelect_01_03; //'./resources/jsp/pollution/PollutionSelect_01_03.jsp';
			}else{
                url= _API.PollutionSelect_01_04; //'./resources/jsp/pollution/PollutionSelect_01_04.jsp';
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