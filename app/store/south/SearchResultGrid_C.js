Ext.define('krf_new.store.south.SearchResultGrid_C', {
    extend : 'Ext.data.Store',
    // -----퇴적물조사지점-----
    fields: [
    	'PT_NM'
    	,'WMYR'
    	,'WMWK'
    	,'WMOM'
    	,'WMOD'
    	,'WMCTM'
    	,'POLL_STEP'
    	,'CURR_DOW'
    	,'CURR_DOW_SURF'
    	,'CURR_TEMP_SURF'
    	,'CURR_DO_SURF'
    	,'CURR_PH_SURF'
    	,'CURR_EC_SURF'
    	,'CURR_DOW_LOW'
    	,'CURR_TEMP_LOW'
    	,'CURR_DO_LOW'
    	,'CURR_PH_LOW'
    	,'CURR_EC_LOW'
    	,'CURR_TRANSPARENCY'
    	,'CURR_FSD'
    	,'CURR_FST'
    	,'CURR_FCL'
    	,'CURR_WTC'
    	,'CURR_PCA'
    	,'CURR_COD'
    	,'CURR_TOC'
    	,'CURR_TN'
    	,'CURR_TP'
    	,'CURR_SRP'
    	,'CURR_PB'
    	,'CURR_ZN'
    	,'CURR_CU'
    	,'CURR_CR'
    	,'CURR_NI'
    	,'CURR_AS'
    	,'CURR_CD'
    	,'CURR_HG'
    	,'CURR_AL'
    	,'CURR_LI'
    	,'CURR_CL_2_PHENYL'
    	,'CURR_2_CL_2_PHENYL'
    	,'CURR_3_CL_2_PHENYL'
    	,'CURR_4_CL_2_PHENYL'
    	,'CURR_5_CL_2_PHENYL'
    	,'CURR_6_CL_2_PHENYL'
    	,'CURR_7_CL_2_PHENYL'
    	,'CURR_8_CL_2_PHENYL'
    	,'CURR_9_CL_2_PHENYL'
    	,'CURR_10_CL_2_PHENYL'
    	,'CURR_TOT_PCBS'
    	,'CURR_NAPTHALENE'
    	,'CURR_ACENAPTHALENE'
    	,'CURR_ACENAPTHENE'
    	,'CURR_FLUORENE'
    	,'CURR_PHENANTHRENE'
    	,'CURR_ANTHRACENE'
    	,'CURR_FLUORANTHENE'
    	,'CURR_PYRENE'
    	,'CURR_BENZO_A_ANTHRACENE'
    	,'CURR_CRYSENE'
    	,'CURR_BENZO_B_FLUORANTHENE'
    	,'CURR_BENZO_F_FLUORANTHENE'
    	,'CURR_BENZO_A_PYRENE'
    	,'CURR_INDENO_1_2_3_CD_PYRENE'
    	,'CURR_DIBENZO_A_H_ANTHRACENE'
    	,'CURR_BENZO_G_H_I_PERYLENE'
    	,'CURR_TOTAL_PAHS'
    	,'CURR_O_P_DDE'
    	,'CURR_P_P_DDE'
    	,'CURR_O_P_DDD'
    	,'CURR_P_P_DDD'
    	,'CURR_O_P_DDT'
    	,'CURR_P_P_DDT'
    	,'CURR_TOTAL_DDT'
    	,'CURR_1_1_1_TRICHLOROETHANE'
    	,'CURR_1_2_DICHLOROETHANE'
    	,'CURR_BENZENE'
    	,'CURR_CARBON_TETRA_CHLORIDE'
    	,'CURR_CHLOROFORM'
    	,'CURR_ETHYL_BENZENE'
    	,'CURR_METHYL_CHLORIDE'
    	,'CURR_TETRA_CHLORO_ETHYLENE'
    	,'CURR_TRI_CHLORO_ETHYLENE'
    	,'CURR_TOLUENE'
    	,'CURR_M_P_XYLENE'
    	,'CURR_O_XYLENE'
    	,'CHART_DOW'
    	,'CHART_DOW_SURF'
    	,'CHART_TEMP_SURF'
    	,'CHART_DO_SURF'
    	,'CHART_PH_SURF'
    	,'CHART_EC_SURF'
    	,'CHART_DOW_LOW'
    	,'CHART_TEMP_LOW'
    	,'CHART_DO_LOW'
    	,'CHART_PH_LOW'
    	,'CHART_EC_LOW'
    	,'CHART_TRANSPARENCY'
    	,'CHART_FSD'
    	,'CHART_FST'
    	,'CHART_FCL'
    	,'CHART_WTC'
    	,'CHART_PCA'
    	,'CHART_COD'
    	,'CHART_TOC'
    	,'CHART_TN'
    	,'CHART_TP'
    	,'CHART_SRP'
    	,'CHART_PB'
    	,'CHART_ZN'
    	,'CHART_CU'
    	,'CHART_CR'
    	,'CHART_NI'
    	,'CHART_AS'
    	,'CHART_CD'
    	,'CHART_HG'
    	,'CHART_AL'
    	,'CHART_LI'
    	,'CHART_CL_2_PHENYL'
    	,'CHART_2_CL_2_PHENYL'
    	,'CHART_3_CL_2_PHENYL'
    	,'CHART_4_CL_2_PHENYL'
    	,'CHART_5_CL_2_PHENYL'
    	,'CHART_6_CL_2_PHENYL'
    	,'CHART_7_CL_2_PHENYL'
    	,'CHART_8_CL_2_PHENYL'
    	,'CHART_9_CL_2_PHENYL'
    	,'CHART_10_CL_2_PHENYL'
    	,'CHART_TOT_PCBS'
    	,'CHART_NAPTHALENE'
    	,'CHART_ACENAPTHALENE'
    	,'CHART_ACENAPTHENE'
    	,'CHART_FLUORENE'
    	,'CHART_PHENANTHRENE'
    	,'CHART_ANTHRACENE'
    	,'CHART_FLUORANTHENE'
    	,'CHART_PYRENE'
    	,'CHART_BENZO_A_ANTHRACENE'
    	,'CHART_CRYSENE'
    	,'CHART_BENZO_B_FLUORANTHENE'
    	,'CHART_BENZO_F_FLUORANTHENE'
    	,'CHART_BENZO_A_PYRENE'
    	,'CHART_INDENO_1_2_3_CD_PYRENE'
    	,'CHART_DIBENZO_A_H_ANTHRACENE'
    	,'CHART_BENZO_G_H_I_PERYLENE'
    	,'CHART_TOTAL_PAHS'
    	,'CHART_O_P_DDE'
    	,'CHART_P_P_DDE'
    	,'CHART_O_P_DDD'
    	,'CHART_P_P_DDD'
    	,'CHART_O_P_DDT'
    	,'CHART_P_P_DDT'
    	,'CHART_TOTAL_DDT'
    	,'CHART_1_1_1_TRICHLOROETHANE'
    	,'CHART_1_2_DICHLOROETHANE'
    	,'CHART_BENZENE'
    	,'CHART_CARBON_TETRA_CHLORIDE'
    	,'CHART_CHLOROFORM'
    	,'CHART_ETHYL_BENZENE'
    	,'CHART_METHYL_CHLORIDE'
    	,'CHART_TETRA_CHLORO_ETHYLENE'
    	,'CHART_TRI_CHLORO_ETHYLENE'
    	,'CHART_TOLUENE'
    	,'CHART_M_P_XYLENE'
    	,'CHART_O_XYLENE'
    	,'PCA_CLASS'
    	,'TN_CLASS'
    	,'TP_CLASS'
    	,'PB_CLASS'
    	,'ZN_CLASS'
    	,'CU_CLASS'
    	,'CR_CLASS'
    	,'NI_CLASS'
    	,'AS_CLASS'
    	,'CU_CLASS'
    	,'HG_CLASS'
    	,'CODE_CTN'
    ],
    siteId: '',
    autoLoad: true,
    buffered: true,
    pageSize: 100,
	remoteSort: true,
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	listeners: {
		load: function(store) {
			var me = this;
			var firstSearch =  $KRF_APP.btnFlag;
			var startYear = startMonth = endYear = endMonth = "";
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartBan").value;
			if(startMonth == "상"){
				startMonth = 1;
			}else{
				startMonth = 2;
			}
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndBan").value;
			if(endMonth == "상"){
				endMonth = 1;
			}else{
				endMonth = 2;
			}
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
	        		url: _API.GetSearchResultData_C, //'./resources/jsp/GetSearchResultData_C.jsp',
	        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
	        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
	        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch:firstSearch},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		success : function(response, opts) {
	        			var jsonData = Ext.util.JSON.decode( response.responseText );
	        			if(jsonData.data.length > 0){
		        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
		        				var dateSplit = jsonData.data[0].WMYR;
		        				if(dateSplit == null){
		        					if(me.gridCtl != null){
			        					me.gridCtl.addCls("dj-mask-noneimg");
			        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
			        				}
		        				}
		        				var afterVal = dateSplit.split(".");
		        				startYear = afterVal[0];
		        				if(afterVal[1] == "1" || afterVal[1] == "01"){
		        					startMonth = "2";
		        					startYear = startYear-1;
		        				}else{
		        					startMonth = afterVal[1]-1;
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
				Ext.getCmp("cmbStartBan").setValue(startMonth);
				
				Ext.getCmp("cmbEndYear").setValue(endYear);
				Ext.getCmp("cmbEndBan").setValue(endMonth);
			}
			
			Ext.Ajax.request({
        		url: _API.GetSearchResultData_C, //'./resources/jsp/GetSearchResultData_C.jsp',
        		params: { WS_CD: WS_CD, AM_CD: AM_CD, AS_CD: AS_CD
        			, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth
        			, ADM_CD: ADM_CD, siteIds: store.siteIds, firstSearch:firstSearch},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			store.startYear = startYear;
        			store.endYear = endYear;
        			if(startMonth == 1){
        				store.startMonth = "상";
        			}else{
        				store.startMonth = "하";
        			}
        			if(endMonth == 1){
        				store.endMonth = "상";
        			}else{
        				store.endMonth = "하";
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