Ext.define('krf_new.store.east.PollutionResult_06', {
    extend : 'Ext.data.Store',
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'FACI_NM'
			,'ADDR'
			,{name: 'FINAL_PERCENTAGE' ,type: 'number'}
			,'WORK_DT'
			,{name: 'PRODUCT_AMT' ,type: 'number'}
			,{name: 'DISCHARGE_AMT', type: 'number'}
			,{name: 'PRODUCT_BOD' ,type: 'number'}
			,{name: 'PRODUCT_COD' ,type: 'number'}
			,{name: 'PRODUCT_TN' ,type: 'number'}
			,{name: 'PRODUCT_TP' ,type: 'number'}
			,{name: 'DISCHARGE_BOD' ,type: 'number'}
			,{name: 'DISCHARGE_COD' ,type: 'number'}
			,{name: 'DISCHARGE_TN' ,type: 'number'}
			,{name: 'DISCHARGE_TP' ,type: 'number'}
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			var url = ""
			if(store.selectValue == "11" || store.selectValue == ""){
				url= _API.PollutionSelect_06_01; //'./resources/jsp/pollution/PollutionSelect_06_01.jsp';
			}else if(store.selectValue == "22"){
				url= _API.PollutionSelect_06_02; //'./resources/jsp/pollution/PollutionSelect_06_02.jsp';
			}else if(store.selectValue == "33"){
				url= _API.PollutionSelect_06_03; //'./resources/jsp/pollution/PollutionSelect_06_03.jsp';
			}else{
				url= _API.PollutionSelect_06_04; //'./resources/jsp/pollution/PollutionSelect_06_04.jsp';
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