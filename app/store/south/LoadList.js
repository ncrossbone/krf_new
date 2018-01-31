Ext.define('krf_new.store.south.LoadList', {
    extend : 'Ext.data.Store',
    fields: [        
		'S_NM',
		'C_0',
		'C_1',
		'C_2',
		'C_3',
		'C_4',
		'C_5',
		'C_6',
		'C_7',
		'C_8',
		'C_9',
		'C_10',
		'C_11',
		'C_12',
		'C_13',
		'C_14',
		'C_15',
		'C_16',
		'C_17',
		'C_18',
		'C_19',
		'C_20',
		'C_21',
		'C_22',
		'C_23',
		'C_24',
		'C_25',
		'C_26',
		'C_27',
		'C_28',
		'C_29',
		'C_30',
		'C_31',
		'C_32',
		'C_33',
		'C_34',
		'C_35',
		'C_36',
		'C_37',
		'C_38',
		'C_39',
		'C_40',
		'C_41',
		'C_42',
		'C_43',
		'C_44',
		'C_45',
		'C_46',
		'C_47',
		'C_48',
		'C_49',
		'C_50',
		'C_51',
		'C_52',
		'C_53',
		'C_54',
		'C_55',
		'C_56',
		'C_57',
		'C_58',
		'C_59',
		'C_60',
		'C_61'
	    ],
	    siteId: '',
	    autoLoad: true,
	    pageSize: 100,
	    selectValue: "",
	    //부하량 구분
		url: "",
		params: "",
		listeners: {
			load: function(store, a, b, c, d, e) {
				Ext.Ajax.request({
	                url: _API.LoadColunmList, //'./resources/jsp/LoadColunmList.jsp',
	        		async: true, // 비동기 = async: true, 동기 = async: false
	        		success : function(response, opts) {
	        			var jsonData = Ext.util.JSON.decode( response.responseText );
	        			store.setData(jsonData.data);
	        		},
	        		failure: function(form, action) {
	        			alert("오류가 발생하였습니다.");
	        		}
	        	});
			}
	    }
});