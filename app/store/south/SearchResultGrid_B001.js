Ext.define('krf_new.store.south.SearchResultGrid_B001', {
    extend : 'Ext.data.Store',
    fields: [
        'RIVER_ID',
        'SITE_NAME',
        'MSR_DATE',
        'F02',
		'F03',
		'F04',
		'F05',
		'F06',
		'F07',
		'F08',
		'F09',
		'F10',
		'F11',
		'F12',
		'F13',
		'F14',
		'F15',
		'F16',
		'F17',
		'F18',
		'F19',
		'F20',
		'F21',
		'F22',
		'F23',
		'F24',
		'F25',
		'F26',
		'F27',
		'F28',
		'F29',
		'F30',
		'F31',
		'F32',
		'F33',
		'F34',
		'F35',
		'F36',
		'F37',
		'F38',
		'F39',
		'F40',
		'F41',
		'F42',
		'F43',
		'F44',
		'F45',
		'F46',
		'F47',
		'F48',
		'F49',
		'F50',
		'F51',
		'F52',
		'F53',
		'F54',
		'F55',
		'F56',
		'F57',
		'F58',
		'F59',
		'F60',
		'F61',
		'F62',
		'F63',
		'F64',
		'F65',
		'F66',
		'F67',
		'F68',
		'F69',
		'F70',
		'F71',
		'F72',
		'F73',
		'F74',
		'F75',
		'F76',
		'F77',
		'F78',
		'F79',
		'F80',
		'F81',
		'F82',
		'F83',
		'F84',
		'F85',
		'F86',
		'F87',
		'F88',
		'F89',
		'F90',
		'F91',
		'F92',
		'F93',
		'F94',
		'F95',
		'F96',
		'F97',
		'F98',
		'F99',
		'F100',
		'F101',
		'F102',
		'F103',
		'F104',
		'F105',
		'F106',
		'F107',
		'F108',
		'F109'],
    siteId: '',
    autoLoad: true,
    buffered: true,
    pageSize: 100,
	remoteSort: true,
	siteIds: "",
	parentIds: [],
	gridCtl: null,
	isFirst:true,
	listeners: {
		load: function(store) {
			var me = this;
			var firstSearch =  $KRF_APP.btnFlag;
			var startYear = startMonth = endYear = endMonth = "";
			var startDay = Ext.getCmp("startDay");
			var startTime = Ext.getCmp("startTime");
			var endDay = Ext.getCmp("endDay");
			var endTime = Ext.getCmp("endTime");
			var cmbStartYear = Ext.getCmp("cmbStartYear");
			var cmbStartMonth = Ext.getCmp("cmbStartMonth");
			var cmbEndYear = Ext.getCmp("cmbEndYear");
			var cmbEndMonth = Ext.getCmp("cmbEndMonth");
			
			startYear = Ext.getCmp("cmbStartYear").value;
			startMonth = Ext.getCmp("cmbStartMonth").value;
			endYear = Ext.getCmp("cmbEndYear").value;
			endMonth = Ext.getCmp("cmbEndMonth").value;
			var startFull = cmbStartYear.value + cmbStartMonth.value +  startDay.value + startTime.value;
			var endFull = cmbEndYear.value + cmbEndMonth.value +  endDay.value + endTime.value;
//			var winCtl = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.RESULT.id);
			
			var winCtl = Ext.getCmp("searchResultWindow");
			var tabContainer = winCtl.items.items[0];
			var tabCtl = tabContainer.items.items[1];
			var activeTab = tabCtl.getActiveTab();
			
			var con = Ext.getCmp("select_B001").value;
			var url ="";
			var start = "";
			var end = "";
			
			if(con=="01"){
				url = _API.GetSearchResultData_B001;  //'./resources/jsp/GetSearchResultData_B001.jsp';
			}else{
				url = _API.GetSearchResultData_B001_fix; //'./resources/jsp/GetSearchResultData_B001_fix.jsp';
			}
			
			// 로딩중 메세지
			if(me.gridCtl != null){
				me.gridCtl.removeCls("dj-mask-noneimg");
				me.gridCtl.addCls("dj-mask-withimg");
				me.gridCtl.mask("loading", "loading...");
			}
			
			if(firstSearch == "noDate"){
				Ext.Ajax.request({
	        		url: url,
					params:{firstSearch: firstSearch,startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth, siteIds: store.siteIds, con:con, startFull:startFull, endFull:endFull},
	        		async: false, // 비동기 = async: true, 동기 = async: false
	        		success : function(response, opts) {
	        			var jsonData = Ext.util.JSON.decode( response.responseText );
	        			if(jsonData.data.length > 0){
							if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
								var endDate = jsonData.data[0].WMCYMD;
								if(con == "01"){
									var dtE = new Date(endDate.substring(0,4)
											, endDate.substring(4,6)
											, endDate.substring(6,8)
											, endDate.substring(8,10));
									
									dtE.setMonth(dtE.getMonth() - 1);
									endFull = dtE.toISOString().substring(0, 4) + dtE.toISOString().substring(5, 7) + dtE.toISOString().substring(8, 10) + "24";
									
									cmbEndYear.setValue(dtE.toISOString().substring(0, 4));
									cmbEndMonth.setValue(dtE.toISOString().substring(5, 7));
									endDay.setValue(dtE.toISOString().substring(8, 10));
									endTime.setValue("24");
									
									dtE.setMonth(dtE.getMonth() - 1);
									startFull = dtE.toISOString().substring(0, 4) + dtE.toISOString().substring(5, 7) + dtE.toISOString().substring(8, 10) + "00";
									
									cmbStartYear.setValue(dtE.toISOString().substring(0, 4));
									cmbStartMonth.setValue(dtE.toISOString().substring(5, 7));
									startDay.setValue(dtE.toISOString().substring(8, 10));
									startTime.setValue("00");
									
								}else{
									var dtE = new Date(endDay.substring(0,4) , endDay.substring(4,6));
									
									dtE.setMonth(dtE.getMonth() - 1);
									endFull = dtE.toISOString().substring(0, 4) + dtE.toISOString().substring(5, 7);
									cmbEndYear.setValue(dtE.toISOString().substring(0, 4));
									cmbEndMonth.setValue(dtE.toISOString().substring(5, 7));
									endDay.setValue("30");
									endTime.setValue("24");
									
									dtE.setMonth(dtE.getMonth() - 1);
									startFull = dtE.toISOString().substring(0, 4) + dtE.toISOString().substring(5, 7);
									cmbStartYear.setValue(dtE.toISOString().substring(0, 4));
									cmbStartMonth.setValue(dtE.toISOString().substring(5, 7));
									StartDay.setValue("01");
									StartTime.setValue("00");
								}
							}else{
								if(me.gridCtl != null){
		        					me.gridCtl.addCls("dj-mask-noneimg");
		        					me.gridCtl.mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
		        				}
							}
	        			}else{
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
			firstSearch = "date";
			Ext.Ajax.request({
        		url: url,
				params:{firstSearch: firstSearch, startYear: startYear, startMonth: startMonth, endYear: endYear, endMonth: endMonth, siteIds: store.siteIds, con:con, startFull:startFull, endFull:endFull},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			var jsonData = Ext.util.JSON.decode( response.responseText );
        			if(jsonData.data.length > 0){
						if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
							store.setData(jsonData.data);
							store.startYear = cmbStartYear.value; 
							store.startMonth = cmbStartMonth.value;
							store.startDay = startDay.value;
							store.startTime = startTime.value;
							store.endYear = cmbEndYear.value;
							store.endMonth = cmbEndMonth.value;
							store.endDay = endDay.value;
							store.endTime = endTime.value;
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
    },
	addZero: function(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}
});