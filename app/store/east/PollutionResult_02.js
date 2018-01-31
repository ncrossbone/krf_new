Ext.define('krf_new.store.east.PollutionResult_02', {
    extend : 'Ext.data.Store',
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'MANAGER'
			,'LIVESTOCK_NM'
			,'ADDR'
			,'FINAL_PERCENTAGE'
			,{name:'LIVESTOCK_CNT'  ,type: 'number'}
			,{name:'LIVESTOCK_AREA'  ,type: 'number'}
			,'REGS'
			,'REGS_DATE'
			,'DISCHARGE_FACI_NM'
			,'DISCHARGE_ADM_CD'
			,'DISCHARGE_RIVER_NM'
			,'INDIV_PURI_METHOD'
			,{name:'INDIV_PURI_AMT'  ,type: 'number'}
			,{name:'INDIV_PURI_MONEY'  ,type: 'number'}
			,'INDIV_COMPOST_METHOD'
			,{name:'INDIV_COMPOST_AMT'  ,type: 'number'}
			,{name:'INDIV_COMPOST_MONEY'  ,type: 'number'}
			,'INDIV_LIQUID_METHOD'
			,{name:'INDIV_LIQUID_AMT'  ,type: 'number'}
			,{name:'INDIV_LIQUID_MONEY'  ,type: 'number'}
			,'ENTRUST_PUB_COLMETHOD'
			,'ENTRUST_PUB_DT'
			,'ENTRUST_PUB_FACI_NM'
			,{name:'ENTRUST_PUB_AMT'  ,type: 'number'}
			,{name:'ENTRUST_PUB_MONEY'  ,type: 'number'}
			,{name:'ENTRUST_REUSE_AMT'  ,type: 'number'}
			,{name:'ENTRUST_REUSE_MONEY'  ,type: 'number'}
			,{name:'ENTRUST_SEA_AMT'  ,type: 'number'}
			,{name:'ENTRUST_SEA_MONEY'  ,type: 'number'}
			,'ENTRUST'
			,'ETC_METHOD'
			,{name:'ETC_AMT'  ,type: 'number'}
			,{name:'ETC_MONEY'  ,type: 'number'}
			,'ETC'
			,{name:'NO_TRT_AMT'  ,type: 'number'}
			,'LEX_METHOD'
			,'LEX_METHOD_ETC'
			,'SPRAY_LANDUSE'
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			var url = ""
			if(store.selectValue == "11" || store.selectValue == ""){
				url= _API.PollutionSelect_02_01; //'./resources/jsp/pollution/PollutionSelect_02_01.jsp';
			}else if(store.selectValue == "22"){
				url= _API.PollutionSelect_02_02; //'./resources/jsp/pollution/PollutionSelect_02_02.jsp';
			}else if(store.selectValue == "33"){
				url= _API.PollutionSelect_02_03; //'./resources/jsp/pollution/PollutionSelect_02_03.jsp';
			}else{
				url= _API.PollutionSelect_02_04; //'./resources/jsp/pollution/PollutionSelect_02_04.jsp';
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