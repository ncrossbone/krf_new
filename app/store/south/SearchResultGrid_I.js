Ext.define('krf_new.store.south.SearchResultGrid_I', {
    extend : 'Ext.data.Store',
    fields: [
        'PT_NO',
        {name: 'PT_NM', type: 'string'}
    ],
    
    siteId: '',
    autoLoad: true,
    pageSize: 100,
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	
	listeners: {
		load: function(store) {
			
			var me = this;
			var requestUrl = "";
			
			if(store.orgParentIds == "I001"){
				requestUrl = _API.GetSearchResultData_I_1; 
				store.config.fields = [
					'PT_NO',
					'PT_NM',
					'CURR_WMCYMD',
					'CHART_WMCYMD',
					{name: 'CURR_ITEM_TEMP', type: 'number'},
					'CHART_ITEM_TEMP',
					{name: 'CURR_ITEM_PH', type: 'number'},
					'CHART_ITEM_PH',
					{name: 'CURR_ITEM_EC', type: 'number'},
					'CHART_ITEM_EC',
					{name: 'CURR_ITEM_DOC', type: 'number'},
					'CHART_ITEM_DOC',
					{name: 'CURR_ITEM_BOD', type: 'number'},
					'CHART_ITEM_BOD',
					{name: 'CURR_ITEM_COD', type: 'number'},
					'CHART_ITEM_COD',
					{name: 'CURR_ITEM_TP', type: 'number'},
					'CHART_ITEM_TP',
					{name: 'CURR_ITEM_AVERAGE_CLOA', type: 'number'},
					'CHART_ITEM_AVERAGE_CLOA',
					{name: 'CURR_ITEM_SURFACE_CLOA', type: 'number'},
					'CHART_ITEM_SURFACE_CLOA',
					{name: 'CURR_ITEM_SURF_BL_GR_ALGAE', type: 'number'},
					'CHART_ITEM_SURF_BL_GR_ALGAE',
					{name: 'CURR_ITEM_GEOSMIN', type: 'number'},
					'CHART_ITEM_GEOSMIN',
					{name: 'CURR_ITEM_2MIB', type: 'number'},
					'CHART_ITEM_2MIB'
                   ]
			}else{
				requestUrl = _API.GetSearchResultData_I_2; 
				store.config.fields = [
					'CHART_MNWL',
					{name: 'CURR_MNWL', type: 'number'}
                   ]
			}
			
			var firstSearch =  $KRF_APP.btnFlag;
			
			var startYear = startMonth = endYear = endMonth = "";
			
			var sYearCtl = Ext.getCmp("cmbStartYear");
			if(sYearCtl != undefined)
				startYear = Ext.getCmp("cmbStartYear").value;
			var sMonthCtl = Ext.getCmp("cmbStartMonth");
			if(sMonthCtl != undefined)
				startMonth = Ext.getCmp("cmbStartMonth").value;
			var eYearCtl = Ext.getCmp("cmbEndYear");
			if(eYearCtl != undefined)
				endYear = Ext.getCmp("cmbEndYear").value;
			var eMonthCtl = Ext.getCmp("cmbEndMonth");
			if(eMonthCtl != undefined)
				endMonth = Ext.getCmp("cmbEndMonth").value;
			
			// 로딩바 표시
			var winCtl = Ext.getCmp("searchResultWindow");
//			var winCtl = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.RESULT.id);
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			
			// 로딩중 메세지
			if(me.gridCtl != null){
				
				me.gridCtl.removeCls("dj-mask-noneimg");
				me.gridCtl.addCls("dj-mask-withimg");
				me.gridCtl.mask("loading", "loading...");
			}
			
			if(firstSearch == "noDate"){
				Ext.Ajax.request({
	        		url: requestUrl,
	        		params: {startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		success : function(response, opts) {
	        			var jsonData = Ext.util.JSON.decode( response.responseText );
	        			if(jsonData.data.length > 0){
		        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
		        				var dateSplit = jsonData.data[0].WMCYMD;
		        				if(dateSplit == null){
		        					me.gridCtl.addCls("dj-mask-noneimg");
		        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
		        					return;
		        				}
		        				var afterVal = dateSplit.split(".");
		        				startYear = afterVal[0];
		        				if(afterVal[1] == "1" || afterVal[1] == "01"){
		        					startMonth = "12";
		        					startYear = startYear-1;
		        				}else{
		        					startMonth = afterVal[1]-1;
		        				}
		        				
		        				if(startMonth < 10){
		        					startMonth = "0"+startMonth;
		        				}
		        				
		        				endYear = afterVal[0];
		        				endMonth = afterVal[1];
		        			}
	        			}
	        		},
	        		failure: function(form, action) {
	        			
	        		}
	        	});
				
				firstSearch = "date";
				Ext.getCmp("cmbStartYear").setValue(startYear); 
				Ext.getCmp("cmbStartMonth").setValue(startMonth);
				Ext.getCmp("cmbEndYear").setValue(endYear);
				Ext.getCmp("cmbEndMonth").setValue(endMonth);
			}
			
			Ext.Ajax.request({
        		url: requestUrl, //'./resources/jsp/GetSearchResultData.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			store.startYear = startYear;
        			store.startMonth = startMonth;
        			store.endYear = endYear;
        			store.endMonth = endMonth;
        			var jsonData = Ext.util.JSON.decode( response.responseText );
        			if(jsonData.data.length > 0){
	        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
	        				store.setData(jsonData.data);
	        				// 로딩바 숨김
	        				if(me.gridCtl != null){
	        					me.gridCtl.unmask();
	        				}
	        			} else{
	        				if(me.gridCtl != null){
	        					me.gridCtl.addCls("dj-mask-noneimg");
	        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
	        				}
	        			}
        			} else{
        				if(me.gridCtl != null){
        					me.gridCtl.addCls("dj-mask-noneimg");
        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
        				}
        			}
        		},
        		failure: function(form, action) {
    				if(me.gridCtl != null){
    					
    					me.gridCtl.addCls("dj-mask-noneimg");
    					me.gridCtl.mask("오류가 발생하였습니다.");
    				}
        		}
        	});
		}
    }
});