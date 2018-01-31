Ext.define('krf_new.store.east.SiteInfoPanel', {
    extend  : 'Ext.data.Store',
    fields: [
        'column',
        'cont'
    ],
	remoteSort: true,
	
	siteCD: '',
	
	listeners: {
		load: function(store) {
			
			var recordId = "";
			if(store.siteCD != undefined && store.siteCD != "")
				recordId = store.siteCD;
            var parentId = "";
            if(store.parentId != undefined){
                parentId = store.parentId;
            }
			// 로딩바 표시
			Ext.getCmp("siteinfotest").mask("loading", "loading...");
			
			Ext.Ajax.request({
                url: _API.GetRWMDT, //'./resources/jsp/GetRWMDT.jsp',    // To Which url you wanna POST.
                params: {recordId: recordId , parentId: parentId},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			var jsonData = Ext.util.JSON.decode( response.responseText );
        			store.setData(jsonData.data);
        			// 로딩바 숨김
        			Ext.getCmp("siteinfotest").unmask();
        		},
        		failure: function(form, action) {
        			// 로딩바 숨김
        			Ext.getCmp("siteinfotest").unmask();
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
});