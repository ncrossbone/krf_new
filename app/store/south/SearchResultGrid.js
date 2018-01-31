Ext.define('krf_new.store.south.SearchResultGrid', {
    extend : 'Ext.data.Store',
    fields: [
        'PT_NO',
        {name: 'PT_NM', type: 'string'},
        'WMYR',
        'WMOD',
        'WMCYMD',
        'WMDEP',
        {name: 'CURR_BOD', type: 'number'},
        'CHART_BOD',
        {name: 'CURR_DO', type: 'number'},
        'CHART_DO',
        {name: 'CURR_COD', type: 'number'},
        'CHART_COD',
        {name: 'CURR_TN', type: 'number'},
        'CHART_TN',
        {name: 'CURR_TP', type: 'number'},
        'CHART_TP',
        {name: 'CURR_TEMP', type: 'number'},
        'CHART_TEMP',
        {name: 'CURR_PH', type: 'number'},
        'CHART_PH',
        {name: 'CURR_SS', type: 'number'},
        'CURR_SS_NEW',
        'CHART_SS',
        {name: 'CURR_CLOA', type: 'number'},
        'CHART_CLOA',
        {name: 'CURR_TOC', type: 'number'},
        'CHART_TOC',
        'CHART_AMNT',
        'CHART_DTN',
        'CHART_NO3N',
        'CHART_NH3N',
        'CHART_DTP',
        'CHART_POP',
        'CHART_TRANS',
        'CHART_ALGOL',
        'CHART_TCOLI',
        'CHART_ECOLI',
        'CHART_ANTIMON',
        'CHART_PHENOL',
        'CHART_COL',
        'CHART_NHEX',
        'CHART_MN',
        'CHART_FE',
        'CHART_CD',
        'CHART_CN',
        'CHART_PB',
        'CHART_CR6',
        'CHART_CR',
        'CHART_AS',
        'CHART_HG',
        'CHART_CU',
        'CHART_ZN',
        'CHART_FL',
        'CHART_ABS',
        'CHART_CL',
        'CHART_TCE',
        'CHART_PCE',
        'CHART_CCL4',
        'CHART_DCETH',
        'CHART_DCM',
        'CHART_BENZENE',
        'CHART_CHCL3',
        'CHART_OP',
        'CHART_PCB',
        'CHART_DEHP',
        'CHART_DIOX',
        'CHART_HCHO',
        'CHART_HCB',
        {name:'CURR_AMNT',type:'number'},
        {name:'CURR_DTN',type:'number'},
        {name:'CURR_NO3N',type:'number'},
        {name:'CURR_NH3N',type:'number'},
        {name:'CURR_DTP',type:'number'},
        {name:'CURR_POP',type:'number'},
        {name:'CURR_TRANS',type:'number'},
        {name:'CURR_ALGOL',type:'number'},
        {name:'CURR_TCOLI',type:'number'},
        {name:'CURR_ECOLI',type:'number'},
        {name:'CURR_ANTIMON',type:'number'},
        {name:'CURR_PHENOL',type:'number'},
        {name:'CURR_COL',type:'number'},
        {name:'CURR_NHEX',type:'number'},
        {name:'CURR_MN',type:'number'},
        {name:'CURR_FE',type:'number'},
        {name:'CURR_CD',type:'number'},
        {name:'CURR_CN',type:'number'},
        {name:'CURR_PB',type:'number'},
        {name:'CURR_CR6',type:'number'},
        {name:'CURR_CR',type:'number'},
        {name:'CURR_AS',type:'number'},
        {name:'CURR_HG',type:'number'},
        {name:'CURR_CU',type:'number'},
        {name:'CURR_ZN',type:'number'},
        {name:'CURR_FL',type:'number'},
        {name:'CURR_ABS',type:'number'},
        {name:'CURR_CL',type:'number'},
        {name:'CURR_TCE',type:'number'},
        {name:'CURR_PCE',type:'number'},
        {name:'CURR_CCL4',type:'number'},
        {name:'CURR_DCETH',type:'number'},
        {name:'CURR_DCM',type:'number'},
        {name:'CURR_BENZENE',type:'number'},
        {name:'CURR_CHCL3',type:'number'},
        {name:'CURR_OP',type:'number'},
        {name:'CURR_PCB',type:'number'},
        {name:'CURR_DEHP',type:'number'},
        {name:'CURR_DIOX',type:'number'},
        {name:'CURR_HCHO',type:'number'},
        {name:'CURR_HCB',type:'number'}
    ],
    
    siteId: '',
    autoLoad: true,
    pageSize: 100,
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	
	listeners: {
		load: function(store, a, b, c, d, e) {
			
			var me = this;
			
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
                    url: _API.GetSearchResultData, //'./resources/jsp/GetSearchResultData.jsp',
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
                url: _API.GetSearchResultData, //'./resources/jsp/GetSearchResultData.jsp',
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
	        				for(var cnt = 0 ; cnt<jsonData.data.length ; cnt++){
	        					jsonData.data[cnt].CHART_ABS.splice(0, jsonData.data[cnt].CHART_ABS.length - 5);
	        					jsonData.data[cnt].CHART_ALGOL.splice(0, jsonData.data[cnt].CHART_ALGOL.length - 5);
	        					jsonData.data[cnt].CHART_AMNT.splice(0, jsonData.data[cnt].CHART_AMNT.length - 5);
	        					jsonData.data[cnt].CHART_ANTIMON.splice(0, jsonData.data[cnt].CHART_ANTIMON.length - 5);
	        					jsonData.data[cnt].CHART_AS.splice(0, jsonData.data[cnt].CHART_AS.length - 5);
	        					jsonData.data[cnt].CHART_BENZENE.splice(0, jsonData.data[cnt].CHART_BENZENE.length - 5);
	        					jsonData.data[cnt].CHART_BOD.splice(0, jsonData.data[cnt].CHART_BOD.length - 5);
	        					jsonData.data[cnt].CHART_CCL4.splice(0, jsonData.data[cnt].CHART_CCL4.length - 5);
	        					jsonData.data[cnt].CHART_CD.splice(0, jsonData.data[cnt].CHART_CD.length - 5);
	        					jsonData.data[cnt].CHART_CHCL3.splice(0, jsonData.data[cnt].CHART_CHCL3.length - 5);
	        					jsonData.data[cnt].CHART_CL.splice(0, jsonData.data[cnt].CHART_CL.length - 5);
	        					jsonData.data[cnt].CHART_CLOA.splice(0, jsonData.data[cnt].CHART_CLOA.length - 5);
	        					jsonData.data[cnt].CHART_CN.splice(0, jsonData.data[cnt].CHART_CN.length - 5);
	        					jsonData.data[cnt].CHART_COD.splice(0, jsonData.data[cnt].CHART_COD.length - 5);
	        					jsonData.data[cnt].CHART_COL.splice(0, jsonData.data[cnt].CHART_COL.length - 5);
	        					jsonData.data[cnt].CHART_CR.splice(0, jsonData.data[cnt].CHART_CR.length - 5);
	        					jsonData.data[cnt].CHART_CR6.splice(0, jsonData.data[cnt].CHART_CR6.length - 5);
	        					jsonData.data[cnt].CHART_CU.splice(0, jsonData.data[cnt].CHART_CU.length - 5);
	        					jsonData.data[cnt].CHART_DCETH.splice(0, jsonData.data[cnt].CHART_DCETH.length - 5);
	        					jsonData.data[cnt].CHART_DCM.splice(0, jsonData.data[cnt].CHART_DCM.length - 5);
	        					jsonData.data[cnt].CHART_DEHP.splice(0, jsonData.data[cnt].CHART_DEHP.length - 5);
	        					jsonData.data[cnt].CHART_DIOX.splice(0, jsonData.data[cnt].CHART_DIOX.length - 5);
	        					jsonData.data[cnt].CHART_DO.splice(0, jsonData.data[cnt].CHART_DO.length - 5);
	        					jsonData.data[cnt].CHART_DTN.splice(0, jsonData.data[cnt].CHART_DTN.length - 5);
	        					jsonData.data[cnt].CHART_DTP.splice(0, jsonData.data[cnt].CHART_DTP.length - 5);
	        					jsonData.data[cnt].CHART_ECOLI.splice(0, jsonData.data[cnt].CHART_ECOLI.length - 5);
	        					jsonData.data[cnt].CHART_FE.splice(0, jsonData.data[cnt].CHART_FE.length - 5);
	        					jsonData.data[cnt].CHART_FL.splice(0, jsonData.data[cnt].CHART_FL.length - 5);
	        					jsonData.data[cnt].CHART_HCB.splice(0, jsonData.data[cnt].CHART_HCB.length - 5);
	        					jsonData.data[cnt].CHART_HCHO.splice(0, jsonData.data[cnt].CHART_HCHO.length - 5);
	        					jsonData.data[cnt].CHART_HG.splice(0, jsonData.data[cnt].CHART_HG.length - 5);
	        					jsonData.data[cnt].CHART_MN.splice(0, jsonData.data[cnt].CHART_MN.length - 5);
	        					jsonData.data[cnt].CHART_NH3N.splice(0, jsonData.data[cnt].CHART_NH3N.length - 5);
	        					jsonData.data[cnt].CHART_NHEX.splice(0, jsonData.data[cnt].CHART_NHEX.length - 5);
	        					jsonData.data[cnt].CHART_NO3N.splice(0, jsonData.data[cnt].CHART_NO3N.length - 5);
	        					jsonData.data[cnt].CHART_OP.splice(0, jsonData.data[cnt].CHART_OP.length - 5);
	        					jsonData.data[cnt].CHART_PB.splice(0, jsonData.data[cnt].CHART_PB.length - 5);
	        					jsonData.data[cnt].CHART_PCB.splice(0, jsonData.data[cnt].CHART_PCB.length - 5);
	        					jsonData.data[cnt].CHART_PCE.splice(0, jsonData.data[cnt].CHART_PCE.length - 5);
	        					jsonData.data[cnt].CHART_PH.splice(0, jsonData.data[cnt].CHART_PH.length - 5);
	        					jsonData.data[cnt].CHART_PHENOL.splice(0, jsonData.data[cnt].CHART_PHENOL.length - 5);
	        					jsonData.data[cnt].CHART_POP.splice(0, jsonData.data[cnt].CHART_POP.length - 5);
	        					jsonData.data[cnt].CHART_SS.splice(0, jsonData.data[cnt].CHART_SS.length - 5);
	        					jsonData.data[cnt].CHART_TCE.splice(0, jsonData.data[cnt].CHART_TCE.length - 5);
	        					jsonData.data[cnt].CHART_TCOLI.splice(0, jsonData.data[cnt].CHART_TCOLI.length - 5);
	        					jsonData.data[cnt].CHART_TEMP.splice(0, jsonData.data[cnt].CHART_TEMP.length - 5);
	        					jsonData.data[cnt].CHART_TN.splice(0, jsonData.data[cnt].CHART_TN.length - 5);
	        					jsonData.data[cnt].CHART_TOC.splice(0, jsonData.data[cnt].CHART_TOC.length - 5);
	        					jsonData.data[cnt].CHART_TP.splice(0, jsonData.data[cnt].CHART_TP.length - 5);
	        					jsonData.data[cnt].CHART_TRANS.splice(0, jsonData.data[cnt].CHART_TRANS.length - 5);
	        					jsonData.data[cnt].CHART_ZN.splice(0, jsonData.data[cnt].CHART_ZN.length - 5);
	        				}
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