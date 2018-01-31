Ext.define('krf_new.store.east.PollutionResult_04', {
    extend : 'Ext.data.Store',
    fields: [
			'YYYY'
			,'WS_NM'
			,'MB_NM'
			,'SB_NM'
			,'CAT_DID'
			,'TP_TYPE'
			,'ADDR'
			,'FINAL_PERCENTAGE'
			,{name: 'AREA_SUM' ,type: 'number'}
			,{name: 'AREA_RICE' ,type: 'number'}
			,{name: 'AREA_FIELD' ,type: 'number'}
			,{name: 'AREA_FLUIT' ,type: 'number'}
			,{name: 'AREA_STOCKFARM' ,type: 'number'}
			,{name: 'AREA_FOREST' ,type: 'number'}
			,{name: 'AREA_SPA' ,type: 'number'}
			,{name: 'AREA_SALTFIELD' ,type: 'number'}
			,{name: 'AREA_PLATEAU' ,type: 'number'}
			,{name: 'AREA_FACTORY' ,type: 'number'}
			,{name: 'AREA_EDUCATION' ,type: 'number'}
			,{name: 'AREA_PARKING' ,type: 'number'}
			,{name: 'AREA_OILING' ,type: 'number'}
			,{name: 'AREA_WAREHOUSE' ,type: 'number'}
			,{name: 'AREA_ROAD' ,type: 'number'}
			,{name: 'AREA_RAILROAD' ,type: 'number'}
			,{name: 'AREA_RIVER' ,type: 'number'}
			,{name: 'AREA_EMBANKMENT' ,type: 'number'}
			,{name: 'AREA_WATERROAD' ,type: 'number'}
			,{name: 'AREA_WATERRANGE' ,type: 'number'}
			,{name: 'AREA_FISHFARM' ,type: 'number'}
			,{name: 'AREA_WATER' ,type: 'number'}
			,{name: 'AREA_PARK' ,type: 'number'}
			,{name: 'AREA_HEALTH' ,type: 'number'}
			,{name: 'AREA_AMUSEMENTPARK' ,type: 'number'}
			,{name: 'AREA_RELIGION' ,type: 'number'}
			,{name: 'AREA_HISTORICAL' ,type: 'number'}
			,{name: 'AREA_GRAVEYARD' ,type: 'number'}
			,{name: 'AREA_MIXED' ,type: 'number'}
			,{name: 'GOLF_RANGE' ,type: 'number'}
    ],
    
    remoteSort: true,	
    
    async:false,
    
    listeners: {
		load: function(store) {
			var url = ""
			if(store.selectValue == "11" || store.selectValue == ""){
				url= _API.PollutionSelect_04_01; //'./resources/jsp/pollution/PollutionSelect_04_01.jsp';
			}else if(store.selectValue == "22"){
				url= _API.PollutionSelect_04_02; //'./resources/jsp/pollution/PollutionSelect_04_02.jsp';
			}else if(store.selectValue == "33"){
				url= _API.PollutionSelect_04_03; //'./resources/jsp/pollution/PollutionSelect_04_03.jsp';
			}else{
				url= _API.PollutionSelect_04_04; //'./resources/jsp/pollution/PollutionSelect_04_04.jsp';
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