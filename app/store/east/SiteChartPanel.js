Ext.define('krf_new.store.east.SiteChartPanel', {
    extend  : 'Ext.data.Store',
    fields: [
             'PT_NO',
             'PT_NM',
             'WMCYMD',
             'ITEM_NAME',
             {name: 'ITEM_VALUE', type: 'float'},
             'ITEM_VALUE_1' //정량한계 미만처리를 위한 copy 컬럼
    ],
	remoteSort: true,
	arrMax: [],
	parentId: '',
	siteCD: '',
	yFieldName: '',
	
	listeners: {
		load: function(store) { 
			var defaultChart = $KRF_APP.chartFlag;
			var f_Chart = Ext.getCmp("f_Chart");
			var d_Chart = $KRF_APP.chartFlag_D;
			if(d_Chart != undefined){
				var org_D_firstID = d_Chart.substring(0,1);
			}
			
			var f_parentId = "";
			
			if(store.parentId == "F" ){
				if(f_Chart == undefined || f_Chart.lastValue == "방류유량"){
					f_parentId = "F_1";
				}else if(f_Chart.lastValue == "1"){
					f_parentId = "F_1";
				}else if(f_Chart.lastValue == "2"){
					f_parentId = "F_2";
				}else if(f_Chart.lastValue == "3"){
					f_parentId = "F_3";
				}else if(f_Chart.lastValue == "4"){
					f_parentId = "F_4";
				}
			} else if(store.parentId == "D"){
				store.parentId = d_Chart;
			}
			
			var selectYear = Ext.getCmp("selectYear");
			var selectMonth = Ext.getCmp("selectMonth");
			var selectYear2 = Ext.getCmp("selectYear2");
			var selectMonth2 = Ext.getCmp("selectMonth2");
			
			var search_F = Ext.getCmp("");
			
			var selectItem = Ext.getCmp("selectItem");
			
			if(defaultChart == "1"){
				selectItem = store.yFieldName;
				
				selectYear = "";
				selectYear2 = "";
				selectMonth = "";
				selectMonth2 = "";
			} else{
                //퇴적물 분기
                if(store.parentId == "C"){
                    var cStartChartYear = Ext.getCmp("cStartChartYear").lastValue;
                    var cStartChartYearDetail = Ext.getCmp("cStartChartYearDetail").lastValue;
                    
                    var cEndChartYear = Ext.getCmp("cEndChartYear").lastValue;
                    var cEndChartYearDetail = Ext.getCmp("cEndChartYearDetail").lastValue;
                    
                    selectYear = cStartChartYear;
                    selectYear2 = cEndChartYear;
                    
                    selectMonth = cStartChartYearDetail;
                    selectMonth2 = cEndChartYearDetail;
                }else{
                    selectYear = selectYear.lastValue;
                    selectYear2 = selectYear2.lastValue;
                    selectMonth = selectMonth.value;
                    selectMonth2 = selectMonth2.value;
                }

                selectItem = selectItem.lastValue;

				if(selectYear > selectYear2){
					alert("년도선택이 잘못되었습니다");
					return;
				}
				if(selectYear == selectYear2){
					if(selectMonth > selectMonth2){
						alert("월선택이 잘못되었습니다.");
						return;
					}
				}
			}
			
			var recordId = "";
			if(store.siteCD != undefined && store.siteCD != "")
				recordId = store.siteCD;
			
			if(store.parentId == "A" || store.parentId == "B" || store.parentId == "C" || store.parentId == "I"){
                requestUrl = _API['GetRWMDT_'+store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
			}else if(store.parentId == "F"){
                requestUrl = _API['GetRWMDT_'+f_parentId]; //"./resources/jsp/GetRWMDT_" + f_parentId + ".jsp";
			}else if(org_D_firstID == "D"){
                requestUrl = _API['GetRWMDT_'+store.parentId]; //"./resources/jsp/GetRWMDT_" + store.parentId + ".jsp";
			}
			// 로딩바 표시
			
			Ext.getCmp("siteCharttest").removeCls("dj-mask-noneimg");
			Ext.getCmp("siteCharttest").addCls("dj-mask-withimg");
			Ext.getCmp("siteCharttest").mask("loading", "loading...");
			Ext.Ajax.request({
        		url: requestUrl,    // To Which url you wanna POST.
        		params: {recordId: recordId
        			, recordYear: selectYear
        			, recordYear2: selectYear2
        			, recordMonth: selectMonth
        			, recordMonth2: selectMonth2
        			, defaultChart: defaultChart
        			, selectItem: selectItem
        			},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			if('error' == response.responseText){
        				Ext.Msg.alert("알림","차트정보 조회중 예외가 발생했습니다.");
        				Ext.getCmp("siteCharttest").unmask();
        				Ext.getCmp("siteCharttest").mask("차트정보를 조회하지 못했습니다.", "noData");
        				return;
        			}
        			// JSON Object로 변경
        			var jsonData = Ext.util.JSON.decode( response.responseText );
        			/*
        			* 차트 가장 마지막 날짜 전역변수 설정 (설정창 날짜 바인딩을 위한 배열)
        			* ITEMS_NAME = 항목값
        			* WMCYMD  = 날짜 ( ex) 2013.12.23 )
        			* F 환경기초시설 구분은 미확
        			*/
        			_chartDateInfo = [];
        			_chartDateInfo.push(jsonData.data[0]);
        			_chartDateInfo.push(jsonData.data[jsonData.data.length-1]);
        			if(store.parentId == "F"){
        				_chartDateInfo[0].f_gubun = f_parentId;
        			}
	        		if(store.parentId == "A"){
	        			for(var ndReplace = 0 ; ndReplace<jsonData.data.length ; ndReplace++){
	        				var itemValue = "ITEM_VALUE";
	        				if(jsonData.data[ndReplace].ITEM_VALUE == 999999999){
	        					jsonData.data[ndReplace].ITEM_VALUE = 0;
	        					jsonData.data[ndReplace].ITEM_VALUE_1 = "정량한계미만 ";
	        				}
	        			};
	        		}		
        			store.loadData(jsonData.data);
        			store.arrMax = jsonData.maxdata;
        			
        			if(jsonData.data.length > 0){
	        			// 차트 컨트롤에 max 데이터 셋팅
	        			SetChartMaxData(store);
	        			// 로딩바 숨김
	        			Ext.getCmp("siteCharttest").unmask();
        			} else{
        				Ext.getCmp("siteCharttest").addCls("dj-mask-noneimg");
        				Ext.getCmp("siteCharttest").mask("해당기간에 데이터가 존재하지 않습니다. <br> 다른기간으로 검색해 보세요.", "noData");
        			}
        		},
        		failure: function(form, action) {
        			// 로딩바 숨김
        			Ext.getCmp("siteCharttest").unmask();
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
});