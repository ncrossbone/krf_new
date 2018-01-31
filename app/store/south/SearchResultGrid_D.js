Ext.define('krf_new.store.south.SearchResultGrid_D', {
    extend : 'Ext.data.Store',
    fields: [
    	'WS_NM',
		'AM_NM',
		'AS_NM',
		'PT_NO',
		'PT_NM',
		'WMCYMD',
		'CHART_DATE',
		'CHART_WL',
		{name: 'CURR_WL', type: 'number'},
		'CHART_MXWL',
		{name: 'CURR_MXWL', type: 'number'},
		'CHART_MNWL',
		{name: 'CURR_MNWL', type: 'number'}
    ],
    siteId: '',
    autoLoad: true,
    pageSize: 100,
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	orgParentIds: "",
	listeners: {
		load: function(store) {
			var me = this;
			var requestUrl = "";
			if(store.orgParentIds == "D001"){
				requestUrl = _API.GetSearchResultData_D_1; //"./resources/jsp/GetSearchResultData_D_1.jsp";
				store.config.fields = [
					'WS_NM',
					'AM_NM',
					'AS_NM',
					'PT_NO',
					'PT_NM',
					'WMCYMD',
					'CHART_DATE',
					'CHART_WL',
					{name: 'CURR_WL', type: 'number'},
					'CHART_MXWL',
					{name: 'CURR_MXWL', type: 'number'},
					'CHART_MNWL',
					{name: 'CURR_MNWL', type: 'number'}
                   ]
			}else if(store.orgParentIds == "D002"){
				requestUrl = _API.GetSearchResultData_D_2; //"./resources/jsp/GetSearchResultData_D_2.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_RF'
				                       ]
			}else if(store.orgParentIds == "D003"){
				requestUrl = _API.GetSearchResultData_D_3; //"./resources/jsp/GetSearchResultData_D_3.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_FW',
										{name: 'CHART_FW', type: 'number'}										
				                       ]
			}else if(store.orgParentIds == "D004"){
				requestUrl = _API.GetSearchResultData_D_4; //"./resources/jsp/GetSearchResultData_D_4.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_SWL',
										'CURR_INF',
										'CURR_OTF',
										'CURR_SFW',
										'CURR_ECPC'
				                       ]
			}else if(store.orgParentIds == "D005"){
				requestUrl = _API.GetSearchResultData_D_5; //"./resources/jsp/GetSearchResultData_D_5.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_WD',
										'CURR_WS',
										'CURR_TA',
										'CURR_HM',
										'CURR_PA',
										'CURR_PS',
										'CURR_RNYN',
										'CURR_RN1HR',
										'CURR_RNDAY'
				                       ]
			}else if(store.orgParentIds == "D006"){
				requestUrl = _API.GetSearchResultData_D_6; //"./resources/jsp/GetSearchResultData_D_6.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_RND',
										'CURR_TA',
										'CURR_SIDAY'
				                       ]
			}else if(store.orgParentIds == "D007"){
				requestUrl = _API.GetSearchResultData_D_7; //"./resources/jsp/GetSearchResultData_D_7.jsp";
				store.config.fields = [
										'WS_NM',
										'AM_NM',
										'AS_NM',
										'PT_NO',
										'PT_NM',
										'WMCYMD',
										'CURR_SWL',
										'CURR_OWL',
										'CURR_SFW',
										'CURR_ECPC',
										'CURR_INF',
										'CURR_TOTOTF',
										'CURR_EGOTF',
										'CURR_GTOTF',
										'CURR_CBOTF',
										'CURR_FWOTF',
										'CURR_ETCOTF'
				                       ]
			}
			
			var startYear = startMonth = startDay = endYear = endMonth = endDay ="";
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			startDay = Ext.getCmp("startDay").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			endDay = Ext.getCmp("endDay").value;
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
			
			var firstSearch =  $KRF_APP.btnFlag;
			
			if(firstSearch == "noDate"){
				Ext.Ajax.request({
	        		url: requestUrl,
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
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
		        				if( store.orgParentIds == "D001"|| store.orgParentIds == "D004" || store.orgParentIds == "D005"|| store.orgParentIds == "D006" || store.orgParentIds == "D007"){
		        					var afterVal = [];
		        					afterVal.push(dateSplit.substring(0,4));
		        					afterVal.push(dateSplit.substring(4,6));
		        					afterVal.push(dateSplit.substring(6,8));
		        					afterVal.push(dateSplit.substring(8,10));
		        				}else{
			        				var afterVal = dateSplit.split(".");
		        				}
		        				startYear = afterVal[0];
		        				if(store.orgParentIds == "D007"){
		        					var sDate = new Date(afterVal[0],parseInt(afterVal[1])-1,afterVal[2]);
		        					// 보관측소는 하루전 기본 하루전 데이터 조회
		        					sDate.setDate(sDate.getDate()-1);
		        					startYear = sDate.getFullYear();
		        					startMonth = $KRF_APP.global.CommFn.lpad(sDate.getMonth()+1, '0', 2) ;
		        					startDay = $KRF_APP.global.CommFn.lpad(sDate.getDate(), '0', 2) ;
		        				}else{
		        					if(afterVal[1] == "1" || afterVal[1] == "01"){
			        					startMonth = "12";
			        					startYear = startYear-1;
			        				}else{
			        					startMonth = afterVal[1]-1;
			        				}
		        					startMonth = $KRF_APP.global.CommFn.lpad(startMonth, '0', 2) ;
		        				}
		        				endYear = afterVal[0];
		        				endMonth = afterVal[1];
		        				endDay = afterVal[2];
		        			}
	        			}
	        		}
	        	});
				firstSearch = "date";
				Ext.getCmp("cmbStartYear").setValue(startYear); 
				Ext.getCmp("cmbStartMonth").setValue(startMonth);
				
				Ext.getCmp("cmbEndYear").setValue(endYear);
				Ext.getCmp("cmbEndMonth").setValue(endMonth);
				
				if(startDay != null && startDay != ""){
					Ext.getCmp("startDay").setValue(startDay);	
				}
				if(endDay != null && endDay != ""){
					Ext.getCmp("endDay").setValue(endDay);	
				}
			}
			Ext.Ajax.request({
        		url: requestUrl,
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch: firstSearch, startDay:startDay, endDay:endDay},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			store.startYear = startYear;
        			store.startMonth = startMonth;
        			store.endYear = endYear;
        			store.endMonth = endMonth;
        			if('error' == response.responseText){
        				me.gridCtl.addCls("dj-mask-noneimg");
    					me.gridCtl.mask("오류가 발생하였습니다.");
        				return;
        			}
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