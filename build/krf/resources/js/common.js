//  버튼 on/off
SetBtnOnOff = function(btnId, strOnOff){
	var currCtl = Ext.getCmp(btnId);
	if(currCtl == undefined){
		return;
	}
	
	var parentCtl = currCtl.findParentByType('container');
	var items = parentCtl.items.items;
	var groupCnt = 0;
	
	var btnOnOff = currCtl.btnOnOff;
	
	if(strOnOff == undefined || strOnOff == ""){
		if(currCtl.btnOnOff == "on"){
			currCtl.btnOnOff = "off";
		}else{
			currCtl.btnOnOff = "on";
		}
	} else{
		currCtl.btnOnOff = strOnOff;
	}
	for(i = 0; i < items.length; i++){
		if(currCtl.btnOnOff == "on"){
			if(currCtl.groupId == items[i].groupId){
				var itemSrc = items[i].src;
				if(currCtl != items[i]){
					items[i].setSrc(items[i].btnOffImg);
					items[i].btnOnOff = "off";
				}
			}
			currCtl.setSrc(currCtl.btnOnImg);
		} else{
			currCtl.setSrc(currCtl.btnOffImg);
		}
	}
	return currCtl;
}

chromePopClose = function(){
	
	var chromePop = Ext.getCmp("chromePop");
	/*var chromePop = Ext.getCmp("chromePop");
	
	var selectPop;
	
	selectPop = confirm("하루동안 이창을 띄우지 않겠습니까.");
	
	
	
	if(selectPop){
		
		console.info(window.chromePop);
		
		setCookie( "chromePop", "done" , 1);  // 오른쪽 숫자는 쿠키를 유지할 기간을 설정합니다


		
		if(chromePop != undefined){
			chromePop.close();
		}
	}else{
		if(chromePop != undefined){
			chromePop.close();
		}
	}*/
	chromePop.close();
	
	

}


setCookie = function( name, value, expiredays ) 
{ 
		var todayDate = new Date(); 
		todayDate.setDate( todayDate.getDate() + expiredays ); 
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
}




getCookie = function( name ) {  
	   var nameOfCookie = name + "=";
			var x = 0;
			while ( x <= document.cookie.length )
			{
					var y = (x+nameOfCookie.length);
					if ( document.cookie.substring( x, y ) == nameOfCookie ) {
							if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
									endOfCookie = document.cookie.length;
							return unescape( document.cookie.substring( y, endOfCookie ) );
					}
					x = document.cookie.indexOf( " ", x ) + 1;
					if ( x == 0 )
							break;
			}
			return "";
  
}




// 코어맵 오브젝트 가져오기
GetCoreMap = function(){
	return $KRF_APP.coreMap;
}

//리치 정보 창 띄우기
ShowReachInfoWindow = function(){
	
	reachWinCtl = Ext.getCmp("reachInfoWindow");
	
	if(reachWinCtl == undefined)
		reachWinCtl = Ext.create('krf_new.view.east.ReachInfoWindow');
	
	reachWinCtl.show();
	
	
	var reachWinX = Ext.getBody().getViewSize().width - reachWinCtl.width;
	var reachWinY = Ext.getBody().getViewSize().height - reachWinCtl.height;
	
	reachWinCtl.setX(reachWinX);
	reachWinCtl.setY(reachWinY);
	
	return reachWinCtl;

}

// 리치레이어 On/Off
ReachLayerOnOff = function(btnId, layerId){
	// 버튼 On/Off
	var currCtl = SetBtnOnOff(btnId);
	
	var treeCtl = Ext.getCmp("layer01");
	var node = treeCtl.getStore().getNodeById(layerId);
	
	var me = GetCoreMap();
	//var graphics = me.reachLayerAdmin.reachLinelayer.getSelectedFeatures();
	var graphics = me.reachLayerAdmin_v3_New.lineGrpLayer.getSelectedFeatures();
	
	if(currCtl.btnOnOff == "on"){
		
		if(layerId == _streamSectionLayerId){
			node.set("checked", true);
			treeCtl.fireEvent('checkchange', node, true, btnId);
		}
		
		if(layerId == _streamNetworkLayerId){
			node.set("checked", false);
			treeCtl.fireEvent('checkchange', node, false, btnId);
			
			me.reachLayerAdmin.reachArealayer.setVisibility(true);
			
			var catIds = "";
			
			if(graphics != undefined && graphics.length > 0){
				
				for(var i = 0; i < graphics.length; i++){
					catIds += "'" + graphics[i].attributes.INODE_ID + "', ";
				}
				
				catIds = catIds.substring(0, catIds.length - 2);
				
				require(["esri/tasks/query", "esri/tasks/QueryTask"], function(Query, QueryTask){
					queryTask = new QueryTask($KRF_DEFINE.arcServiceUrl + "/rest/services/reach/MapServer/47");
		    		query = new Query();
					query.returnGeometry = true;
					query.outFields = ["*"];
					
					query.where = "CAT_DID IN (" + catIds + ")";
					queryTask.execute(query, AreaLayerDraw);
				});
			}
			else{
				node.set("checked", true);
				treeCtl.fireEvent('checkchange', node, true, btnId);
			}
		}
	}
	else{
		
		if(layerId == _streamSectionLayerId){
			node.set("checked", false);
			treeCtl.fireEvent('checkchange', node, false, btnId);
		}
		
		if(layerId == _streamNetworkLayerId){
			me.reachLayerAdmin.reachArealayer.setVisibility(false);
			
			if(graphics != undefined && graphics.length > 0){
				
			}
			else{
				node.set("checked", false);
				treeCtl.fireEvent('checkchange', node, false, btnId);
			}
		}
	}
}

// 집수구역 레이어 그리기
AreaLayerDraw = function(featureSet){
	var me = GetCoreMap();
	
	require([
             "esri/layers/FeatureLayer",
             "esri/tasks/query"             
           ],
             function (
            		 FeatureLayer, Query
             ) {
    	
    	var selectQuery = new Query();
    	
    	for(var i = 0; i < featureSet.features.length; i++){
        	selectQuery.where = "CAT_DID = '" + featureSet.features[i].attributes.CAT_DID + "'";
        	me.reachLayerAdmin.reachArealayer.selectFeatures(selectQuery, FeatureLayer.SELECTION_ADD); // 집수구역 셀렉트
    	}
	});
}

// 리치정보 바인딩
ReachInfoBinding = function(objs){
	if(objs == undefined || objs[0] == undefined)
		return;
	
	var RCH_DID = objs[0].attributes.RCH_DID; // 리치코드
	var RIV_ID = objs[0].attributes.RIV_ID; // 하천코드
	var RIV_NM = objs[0].attributes.RIV_NM; // 하천명
	var SB_ID = objs[0].attributes.SB_ID; // 표준유역코드
	var SB_NM = objs[0].attributes.SB_NM; // 표준유역명
	var LO_RIV_ID = objs[0].attributes.LO_RIV_ID; // 하류연결하천코드
	var LO_RIV_NM = objs[0].attributes.LO_RIV_NM; // 하류연결하천명
	var SN = objs[0].attributes.SN; // 순차번호
	var GEO_TRIB = objs[0].attributes.GEO_TRIB; // 하천차수
	var RCH_LEN = objs[0].attributes.RCH_LEN; // 리치길이
	var CUM_LEN = objs[0].attributes.CUM_LEN; // 누적거리
	//var CAT_AREA = objs[0].attributes.CAT_AREA; // 집수면적
	var CUM_AREA = objs[0].attributes.CUM_AREA; // 집수면적
	// 상류면적?
	
	// 리치 정보창 띄우기
	var reachInfoCtl = ShowReachInfoWindow();
	
	if(Ext.getCmp("RCH_DID") != undefined) { Ext.getCmp("RCH_DID").setHtml(RCH_DID) };
	if(Ext.getCmp("RIV_ID") != undefined) { Ext.getCmp("RIV_ID").setHtml(RIV_ID) };
	if(Ext.getCmp("RIV_NM") != undefined) { Ext.getCmp("RIV_NM").setHtml(RIV_NM) };
	if(Ext.getCmp("SB_ID") != undefined) { Ext.getCmp("SB_ID").setHtml(SB_ID) };
	if(Ext.getCmp("SB_NM") != undefined) { Ext.getCmp("SB_NM").setHtml(SB_NM) };
	if(Ext.getCmp("LO_RIV_ID") != undefined) { Ext.getCmp("LO_RIV_ID").setHtml(LO_RIV_ID) };
	if(Ext.getCmp("LO_RIV_NM") != undefined) { Ext.getCmp("LO_RIV_NM").setHtml(LO_RIV_NM) };
	if(Ext.getCmp("SN") != undefined) { Ext.getCmp("SN").setHtml(SN) };
	if(Ext.getCmp("GEO_TRIB") != undefined) { Ext.getCmp("GEO_TRIB").setHtml(GEO_TRIB) };
	if(Ext.getCmp("RCH_LEN") != undefined) { Ext.getCmp("RCH_LEN").setHtml(RCH_LEN) };
	if(Ext.getCmp("CUM_LEN") != undefined) { Ext.getCmp("CUM_LEN").setHtml(CUM_LEN) };
	//if(Ext.getCmp("CAT_AREA") != undefined) { Ext.getCmp("CAT_AREA").setHtml(CAT_AREA) };
	if(Ext.getCmp("CUM_AREA") != undefined) { Ext.getCmp("CUM_AREA").setHtml(CUM_AREA) };
}


//지점/차트 정보 창 띄우기
ShowWindowSiteNChart = function(tabIdx, title, test, parentId, chartFlag){
	
	var yFieldName = "";
	var chartId = ""; // 부모아이디
	
	if(parentId != ""){ // 기간설정 검색 버튼 클릭 시 공백
		var orgParentId = parentId
		
		parentId = parentId.substring(0,1);
		
		if(parentId == "D"){
			$KRF_APP.chartFlag_D = orgParentId;
		}
		
		$KRF_APP.parentFlag = parentId;
		$KRF_APP.chartFlag = "1";
//		
		
		var centerContainer = Ext.getCmp('center_container');
		
		var winX = centerContainer.getWidth() - 350;
		var winY = 98;
		
		var listCtl = Ext.getCmp("siteListWindow");
		
		if(listCtl != undefined){
			winY = listCtl.getHeight() + 3;
		}
		
		var winCtl = Ext.getCmp("windowSiteNChart");
		
		if(winCtl == undefined){
			winCtl = Ext.create('krf_new.view.east.WindowSiteNChart',{x:winX, y:winY });
			centerContainer.add(winCtl);
		}
		winCtl.show();
		
//		var dp = $KRF_APP.getDesktop();
//    	var dpWidth = dp.getWidth();
//    	var dpHeight = dp.getHeight();
//    	
//    	
//    	var siteInfoWin = $KRF_APP.getDesktopWindow($KRF_WINS.KRF.SITE_INFO.id);
//    	
//    	if(siteInfoWin == null){
//    		var siteInfoChartModule = $KRF_APP.getDesktopModule($KRF_WINS.KRF.SITE_INFO.id);
//    		var siteInfoChartWindow = siteInfoChartModule.createWindow({title:'지점정보', x:dpWidth-500,y:dpHeight-(480+35), constrain:true});
//    		siteInfoChartWindow = siteInfoChartWindow.show();
//    	}else{
//    		siteInfoWin.show();
//    	}
		
		var siteinfoCtl = Ext.getCmp("siteinfotest");  // 지점정보 ID
		var siteChartCtl = Ext.getCmp("siteCharttest");  //차트 ID
		
		var siteText = Ext.getCmp("selectName");  // 지점명
		//지점명 표출
		siteText.setText("ㆍ"+test);
		
		//각쿼리당 초기값 설정
		var series = siteChartCtl.series[0];
		
		//환경기초시설 표출시 라벨 표시
		/*var fName = Ext.getCmp("selectFName"); //selectFName
		var fbar = Ext.getCmp("selectF-Name"); //selectF-Name
		if(parentId == "F"){
			fName.setText("방류유량");
			fbar.setText(">");
		}else{
			fName.setText("");
			fbar.setText("");
		}*/
		
		
		if(parentId == "A"){
			series.setXField("WMCYMD");
			yFieldName = "ITEM_BOD";
		}else if(parentId == "B"){
			series.setXField("WMCYMD");
			yFieldName = "ITEM_COD";
		}else if(parentId == "C"){
			series.setXField("WMCYMD");
            yFieldName = "ITEM_COD";
		}else if(parentId == "F"){
			series.setXField("WMCYMD");
			yFieldName = "ITEM_BOD";
		}else if(orgParentId == "D001"){
			series.setXField("WMCYMD");
			yFieldName = "WL";
		}else if(orgParentId == "D002"){
			series.setXField("WMCYMD");
			yFieldName = "RF";
		}else if(orgParentId == "D003"){
			series.setXField("WMCYMD");
			yFieldName = "FW";
		}else if(orgParentId == "D004"){
			series.setXField("WMCYMD");
			yFieldName = "SWL";
		}else if(orgParentId == "D005"){
			series.setXField("WMCYMD");
			yFieldName = "WD";
		}else if(orgParentId == "D006"){
			series.setXField("WMCYMD");
			yFieldName = "RND";
		}else if(orgParentId == "D007"){
			series.setXField("WMCYMD");
			yFieldName = "SWL";
		}else if(parentId == "I"){
		    series.setXField("WMCYMD");
		    yFieldName = "ITEM_TEMP";

		}
		// 정보창 탭 체인지
		ChangeTabIndex(tabIdx);
		
		// 지점정보 스토어 로드
		if(siteinfoCtl != undefined){
			//var store = siteinfoCtl.getStore();
			var store = Ext.create('krf_new.store.east.SiteInfoPanel');
			store.siteCD = title;
            store.parentId = parentId;
			store.load();
			siteinfoCtl.setStore(store);
		}
        if(!chartFlag){
            // 차트정보 스토어 로드
    		if(siteChartCtl != undefined){
    			//var chartStore = siteChartCtl.getStore();
    			var chartStore = Ext.create('krf_new.store.east.SiteChartPanel');
    			chartStore.siteCD = title;
    			chartStore.yFieldName = yFieldName;
    			chartStore.parentId = parentId;
    			chartStore.orgParentId = orgParentId;
    			chartStore.load();
    			siteChartCtl.setStore(chartStore);
    		}
        }else{
            Ext.getCmp("siteCharttest").addCls("dj-mask-noneimg");
            Ext.getCmp("siteCharttest").mask("차트정보가 없습니다.", "noData");
        }
		
		chartId = parentId; 
	}
	else{
		$KRF_APP.chartFlag = "0";
		var siteChartCtl = Ext.getCmp("siteCharttest");  //차트 ID
		var chartStore = siteChartCtl.getStore();
		chartStore.load();
		if(chartStore.parentId == "F"){
			chartId = chartStore.parentId;
		}
		
		//클릭 session
		setActionInfo(siteChartCtl.store.parentId , siteChartCtl.store.orgParentId , "" , siteChartCtl.store.siteCD , "차트검색");
	}
	SetItemLabelText(yFieldName,chartId);
}

// 지점/차트 정보 창 닫기
HideWindowSiteNChart = function(){
	
	var winCtl = Ext.getCmp("windowSiteNChart");
	if(winCtl != undefined)
		//winCtl.close();
		winCtl.hide();
	
	winCtl = Ext.getCmp("datePanel1");
	if(winCtl != undefined)
		//winCtl.close();
		winCtl.hide();

}

SetItemLabelText = function(itemNm,chartId){
    
	if(itemNm == undefined || itemNm == ""){
		//item 선택
		var selectItem = Ext.getCmp("selectItem");
		if(selectItem == null || selectItem.lastValue == null){
	        var siteItemText = Ext.getCmp("selectItemName");  // 항목명
	        if(siteItemText != null){
	            siteItemText.setText("");    
	        }
	        return;
	    }
		itemNm = selectItem.lastValue;
		
		/*var f_Chart = Ext.getCmp("f_Chart");
		var fName = Ext.getCmp("selectFName"); //selectFName
		var fbar = Ext.getCmp("selectF-Name"); //selectF-Name
		if(chartId == "F"){
			fName.setText(f_Chart.rawValue);
			fbar.setText(">");
		}else{
			fName.setText("");
			fbar.setText("");
		}*/
		
	}
	//var itemNm = "";
	//var itemNm = "ITEM_VALUE";
	if(itemNm == "ITEM_BOD"){
		itemNm = "BOD(㎎/ℓ)";
	}else if(itemNm == "ITEM_COD"){
		itemNm = "COD(㎎/ℓ)";
	}else if(itemNm == "ITEM_DOC"){
		itemNm = "DO(㎎/ℓ)";
	}else if(itemNm == "ITEM_DOW"){
		itemNm = "수심(cm)";
	}else if(itemNm == "WL"){
		itemNm = "수위(cm)";
	}else if(itemNm == "RF"){
		itemNm = "우량(mm)";
	}else if(itemNm == "FW"){
		itemNm = "유량(CMS)";
	}else if(itemNm == "SWL"){
		itemNm = "저수위(cm)";
	}else if(itemNm == "WD"){
		itemNm = "풍향(m/s)";
	}else if(itemNm == "RND"){
		itemNm = "강수량(mm)";
	}else if(itemNm == "SWL"){
		itemNm = "보 상류수위(m)";
	}else if(itemNm == "ITEM_TN"){
		itemNm = "T-N (㎎/ℓ)";
	}else if(itemNm == "ITEM_TP"){
		itemNm = "T-P (㎎/ℓ)";
	}else if(itemNm == "ITEM_TEMP"){
		itemNm = "수온(℃)";
	}else if(itemNm == "ITEM_PH"){
		itemNm = "pH";
	}else if(itemNm == "ITEM_SS"){
		itemNm = "SS(㎎/ℓ)";
	}else if(itemNm == "ITEM_CLOA"){
		itemNm = "클로로필a(㎎/㎥)";
	}else if(itemNm == "ITEM_EC"){
		itemNm = "전기전도도";
	}else if(itemNm == "ITEM_CLOA"){
		itemNm = "클로로필a(㎎/㎥)";
	}else if(itemNm == "AMT_PHYS"){
		itemNm = "방류량_물리학적";
	}else if(itemNm == "AMT_BIO"){
		itemNm = "방류량_생물학적";
	}else if(itemNm == "AMT_HIGHTEC"){
		itemNm = "방류량_고도";
	}else if(itemNm == "ITEM_COLI"){
		itemNm = "ITEM_COLI";
	}else if(itemNm == "ITEM_BYPASS_AMT"){
		itemNm = "미처리배제유량(㎥/일)";
	}else if(itemNm == "OWL"){
		itemNm = "보 하류수위(m)";
	}else if(itemNm == "SFW"){
		itemNm = "저수량(백만㎥)";
	}else if(itemNm == "ECPC"){
		itemNm = "공용량(백만㎥)";
	}else if(itemNm == "INF"){
		itemNm = "유입량(백만㎥)";
	}else if(itemNm == "TOTOTF"){
		itemNm = "총 방류량(㎥/sec)";
	}else if(itemNm == "EGOTF"){
		itemNm = "발전 방류량(㎥/sec)";
	}else if(itemNm == "GTOTF"){
		itemNm = "가동보 방류량(㎥/sec)";
	}else if(itemNm == "CBOTF"){
		itemNm = "고정보 방류량(㎥/sec)";
	}else if(itemNm == "FWOTF"){
		itemNm = "어도 방류량(㎥/sec)";
	}else if(itemNm == "ETCOTF"){
		itemNm = "기타 방류량(㎥/sec)";
	}else if(itemNm == "ITEM_AMT"){
		itemNm = "유량(㎥/일)";
    }else if(itemNm == "ITEM_AVERAGE_CLOA"){
        itemNm = "Chl-a(㎎/㎥)";
    }else if(itemNm == "ITEM_SURFACE_BLUE_GREEN_ALGAE"){
    	itemNm = "유해남조류(cells/㎖)";
    }else if(itemNm == "ITEM_TOC"){
        itemNm = "TOC (%)";
    }else if(itemNm == "ITEM_SRP"){
        itemNm = "SRP (㎎/㎏)";
    }else if(itemNm == "ITEM_PB"){
        itemNm = "Pb (㎎/㎏)";
    }else if(itemNm == "ITEM_ZN"){
        itemNm = "Zn (㎎/㎏)";
    }else if(itemNm == "ITEM_CU"){
        itemNm = "Cu (㎎/㎏)";
    }else if(itemNm == "ITEM_CR"){
        itemNm = "Cr (㎎/㎏)";
    }else if(itemNm == "ITEM_NI"){
        itemNm = "Ni (㎎/㎏)";
    }else if(itemNm == "ITEM_AS"){
        itemNm = "As (㎎/㎏)";
    }else if(itemNm == "ITEM_CD"){
        itemNm = "Cd (㎎/㎏)";
    }else if(itemNm == "ITEM_HG"){
        itemNm = "Hg (㎎/㎏)";
    }else if(itemNm == "ITEM_AL"){
        itemNm = "Al (%)";
    }else if(itemNm == "ITEM_LI"){
        itemNm = "Li (㎎/㎏)";
    }

	
	var chartCtl = Ext.getCmp("siteCharttest");
	var axes   = chartCtl.axes[0];
	var series = chartCtl.series[0];
	
	series.setYField("ITEM_VALUE");
	axes.fields = "ITEM_VALUE";
	var siteItemText = Ext.getCmp("selectItemName");  // 항목명
	
	var f_Chart = Ext.getCmp("f_Chart");
	if(chartId == "F"){
		if(f_Chart == undefined){
			siteItemText.setText("ㆍ방류유량 > "+itemNm);
		}else{
			siteItemText.setText("ㆍ"+f_Chart.rawValue + " > " + itemNm);
		}
	}else{
		siteItemText.setText("ㆍ"+itemNm);
	}
	//siteItemText.setText(itemNm);
}

// 차트 라벨 맥시멈 등 셋팅 및 스토어 로드
// 기간설정 검색 시 파라메터 모두 공백으로.. 지점목록에서 검색 시 해당 값 파라메터
SetChartMaxData = function(store){
	
	var ITEM_VALUE = parseFloat(store.arrMax[0].ITEM_VALUE);
	
	
	var chartCtl = Ext.getCmp("siteCharttest");
	var axes   = chartCtl.axes[0];
	axes.setMaximum(ITEM_VALUE);
	
		
	chartCtl.redraw();

	var win = Ext.getCmp("datePanel1");
	if(win != undefined)
		win.close();
	
}

// 정보창 탭 체인지
ChangeTabIndex = function(tabIdx){
	
	if(tabIdx == 0){
		var chartCtl = Ext.getCmp("tabChart");
		chartCtl.setSrc("./resources/images/tab/tap_01_ov.gif");
		
		var siteCtl = Ext.getCmp("tabSite");
		siteCtl.setSrc("./resources/images/tab/tap_02_off.gif");
	}
	else{
		var chartCtl = Ext.getCmp("tabChart");
		chartCtl.setSrc("./resources/images/tab/tap_01_off.gif");
		
		var siteCtl = Ext.getCmp("tabSite");
		siteCtl.setSrc("./resources/images/tab/tap_02_ov.gif");
	}
	
	var contCtl = Ext.getCmp("infoContents");
	contCtl.setActiveItem(tabIdx);
}

ShowToolTipSearchResult = function(siteIds, parentIds, titleText, gridId, test, tooltipCk, isFirst){
	//처음검색
	$KRF_APP.btnFlag = "noDate";
	ShowSearchResult(siteIds, parentIds, titleText, gridId, test, tooltipCk, isFirst);
}
showResultWindow = function(){
	var desktop = $KRF_APP.getDesktop();
	var resultModule = $KRF_APP.getDesktopModule($KRF_WINS.KRF.RESULT.id);
	var resultWindow = resultModule.createWindow({x:80,y:desktop.getHeight()-250, height:250, width:desktop.getWidth()-80, constrain:true});
	resultWindow = resultWindow.show();
	$KRF_APP.modeWindows.krf.push(resultWindow);
	
	return resultWindow;
}
// 검색결과창 띄우기
ShowSearchResult = function(siteIds, parentIds, titleText, gridId, test, tooltipCk, isFirst){
	
	if(parentIds == ""){
		parentIds = [{parentId : tooltipCk , siteId : siteIds}];
	}
	
	if(tooltipCk != undefined){
		siteIds = "'"+siteIds+"'";
	}
	
	if(isFirst == undefined){
		isFirst = true;
	}
	
	// 리치검색 khLee 20151102 추가
	if(siteIds == "CAT"){
		ShowSearchResultReach();
		return;
	}
	
	var centerContainer = Ext.getCmp('center_container');
	
	var windowWidth = centerContainer.getWidth();
	var windowHeight = 300;
	var windowY = centerContainer.getHeight() - windowHeight;
	// window 창 옵션
	var options = {
			renderTo: centerContainer.el,
			id: 'searchResultWindow',
			title: '검색결과',
			width: windowWidth,
			height:windowHeight,
			y: windowY
	};
//	var resultWindow = showResultWindow();
	
	// window 창 생성
	var searchResultWindow = this.GetWindowControl(options);
	centerContainer.add(searchResultWindow);
	searchResultWindow.show();
	
	$KRF_APP.searchResultWindow = searchResultWindow;
	
	if(gridId == undefined)
		return;
	options = {
			id: 'searchResultTab',
			//title: '결과탭1',
			header: false
	};
	
	var tabCtl = Ext.getCmp("searchResultTab");
	// TabControl 생성
	var searchResultTab = GetTabControl(options);
	
	if(tabCtl == undefined){
		searchResultWindow.add(searchResultTab); // window에 tab추가
	}
	
	var orgParentId = parentIds[0].parentId;
	var parentCheck ;
	
	if(parentIds[0].parentId == undefined){
		parentCheck = parentIds.substring(0,1);
	}else{
		parentCheck = parentIds[0].parentId.substring(0,1);
	}
	options = {
			//id: "searchResultContainer",
			id: gridId + "_container",
			title: titleText, //_searchType,
			parentId: parentCheck,
			//closable : true,
			autoResize: true,
			gridId:gridId
	};
	
	var tab = searchResultTab.items.items[1];
	
	var gridStore = null;
	var grdContainer = Ext.getCmp(gridId + "_container");
	
	var hiddenGrid = Ext.getCmp("F_CHANGE");
	var cmbStartYear = Ext.getCmp("cmbStartYear");
	var cmbStartMonth = Ext.getCmp("cmbStartMonth");
	var cmbEndYear = Ext.getCmp("cmbEndYear");
	var cmbEndMonth = Ext.getCmp("cmbEndMonth");
	
	
	if(parentCheck == "A"){	
		
		//환경기초시설 검색값 히든처리
		if(grdContainer == null || grdContainer == undefined){
			grdContainer = Ext.create("krf_new.view.south.SearchResultGrid", options);
			
			//그리드 아이디 변경
//			grdContainer.items.items[0].id = grdContainer.items.items[0].id + "_" + gridId;
			
			tab.add(grdContainer);
		}
		tab.setActiveTab(gridId + "_container");
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		gridStore = Ext.create("krf_new.store.south.SearchResultGrid", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			gridCtl: grdCtl
		});
		
		//grdCtl.getView().bindStore(gridStore);
		grdCtl.setStore(gridStore);
	
	}else if(parentCheck == "F"){
		
		var firstSearch =  $KRF_APP.btnFlag;
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2012");
			cmbStartMonth.setValue("09");
			cmbEndYear.setValue("2012");
			cmbEndMonth.setValue("12");
		}
		
		//환경기초시설 검색값 히든처리
		//hiddenGrid.setHidden(false);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_F", options);
			
			//그리드 아이디 변경
//			grdContainer.items.items[0].id = grdContainer.items.items[0].id + "_" + gridId;
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		
		
		var ResultGrid_F = Ext.getCmp(gridId + "_container");
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//grdCtl.id = gridId;  // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		var hiddenF = "";
		var hiddenT = "";
		var pointArray = "";
		var pointValue = "";
		//Ext.getCmp("F_CHANGE").setRawValue("방류유량");
		//DISCHARGE_AMT_PHYS_VAL.hideable = false;
		//0~2 , 11~16 공통
		if(test == "" ||test == "1" || test == "방류유량"){
			test = "";
			
			Ext.getCmp("F_CHANGE").setRawValue("방류유량");
			
			var arrayT = ['3','4','5','13','14','27','28','29'];
			var arrayF = ['6','7','8','9','10','11','12','30','31'];
			var point = ['8','10','12','16','18','20','22','24','26'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 8){
					pointValue = 4094.2;
				}else if(point[pointArray] == 10){
					pointValue = 4094.2;
				}else if(point[pointArray] == 12){
					pointValue = 12744.6;
				}else if(point[pointArray] == 16){
					pointValue = 10.1;
				}else if(point[pointArray] == 18){
					pointValue = 20.7;
				}else if(point[pointArray] == 20){
					pointValue = 9.4;
				}else if(point[pointArray] == 22){
					pointValue = 22.6;
				}else if(point[pointArray] == 24){
					pointValue = 2.0;
				}else if(point[pointArray] == 26){
					pointValue = 462.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
			}
			
			
			
		}else if(test == "2"){   //ResultGrid_F.columns[].setHidden(false);
			
			Ext.getCmp("F_CHANGE").setRawValue("직접이송량");
			
			var arrayT = ['3','4','6','7','8','9','10','11','12','27','28','29','30','31'];
			var arrayF = ['5','13','14'];
			var point = ['14','16','18','20','22','24','26'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 14){
					pointValue = 385.0;
				}else if(point[pointArray] == 16){
					pointValue = 19384.2;
				}else if(point[pointArray] == 18){
					pointValue = 11194.7;
				}else if(point[pointArray] == 20){
					pointValue = 19690.0;
				}else if(point[pointArray] == 22){
					pointValue = 3993.0;
				}else if(point[pointArray] == 24){
					pointValue = 534.6;
				}else if(point[pointArray] == 26){
					pointValue = 184800.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
			}
			
		}else if(test == "3"){
			
			Ext.getCmp("F_CHANGE").setRawValue("총유입량");
			
			var arrayT = ['4','5','6','7','8','9','10','11','12','27','28','29','30','31'];
			var arrayF = ['3','13','14'];
			var point = ['14','16','18','20','22','24','26'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 14){
					pointValue = 385.0;
				}else if(point[pointArray] == 16){
					pointValue = 19384.2;
				}else if(point[pointArray] == 18){
					pointValue = 11194.7;
				}else if(point[pointArray] == 20){
					pointValue = 19690.0;
				}else if(point[pointArray] == 22){
					pointValue = 3993.0;
				}else if(point[pointArray] == 24){
					pointValue = 534.6;
				}else if(point[pointArray] == 26){
					pointValue = 184800.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
			}
			
		}else{
			
			Ext.getCmp("F_CHANGE").setRawValue("관거이송량");
			
			var arrayF = ['3','4','13','14','27','28','29'];
			var arrayT = ['5','6','7','8','9','10','11','12','30','31'];
			var point = ['14','16','18','20','22','24','26','28'];
			
			for(hiddenF = 0 ; hiddenF<arrayF.length ; hiddenF++){
				grdCtl.columns[arrayF[hiddenF]].setHidden(false);
			}
			
			for(hiddenT = 0 ; hiddenT<arrayT.length ; hiddenT++){
				grdCtl.columns[arrayT[hiddenT]].setHidden(true);
			}
			
			for(pointArray = 0 ; pointArray<point.length ; pointArray++){
				
				if(point[pointArray] == 14){
					pointValue = 13.2;
				}else if(point[pointArray] == 16){
					pointValue = 17.6;
				}else if(point[pointArray] == 18){
					pointValue = 9.9;
				}else if(point[pointArray] == 20){
					pointValue = 418.0;
				}else if(point[pointArray] == 22){
					pointValue = 110.0;
				}else if(point[pointArray] == 24){
					pointValue = 49.5;
				}else if(point[pointArray] == 26){
					pointValue = 5.5;
				}else{
					pointValue = 33.0;
				}
				grdCtl.columns[point[pointArray]].widget.chartRangeMax = pointValue;
			}
			
		}
		
		gridStore = Ext.create("krf_new.store.south.SearchResultGrid_F_"+test+"", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test,
			gridCtl: grdCtl
		});
		
		grdCtl.getView().bindStore(gridStore);
		
	}else if(parentCheck == "B"){
		//hiddenGrid.setHidden(true);
		
		//id값 분기 - ph
		var idCheck = "";
		
		if(parentIds[0].parentId == undefined){
			idCheck = parentIds;
		}else{
			idCheck = parentIds[0].parentId;
		}
		//test value - ph
		//idCheck = "B003";
		
		if(idCheck!="B001"){
			
				if(grdContainer == null || grdContainer == undefined){
					
					grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_B", options);
					
					//그리드 아이디 변경
//					grdContainer.items.items[0].id = grdContainer.items.items[0].id + "_" + gridId;
//					
					tab.add(grdContainer);
					//tab.insert(0, grdContainer);
				}
				tab.setActiveTab(gridId + "_container");
				
				var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
				grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
				//grdCtl.id = gridId;
				
				if(siteIds != ""){
					grdCtl.siteIds = siteIds;
				}
				if(parentIds != ""){
					grdCtl.parentIds = parentIds;
				}
				
				gridStore = Ext.create("krf_new.store.south.SearchResultGrid_B", {
					siteIds: grdCtl.siteIds,
					parentIds: grdCtl.parentIds,
					firstSession: test,
					isFirst: isFirst,
					gridCtl: grdCtl
				});
				
				grdCtl.getView().bindStore(gridStore);
		}else{
			//test value - ph
			//options.title = "수질자동측정망";
			options = {
			//id: "searchResultContainer",
			id: gridId + "_container",
			title: titleText, //_searchType,
			parentId: parentCheck,
			//closable : true,
			autoResize: true,
			idCheck:idCheck
			};
			//b003.setHidden(false);
			
			if(grdContainer == null || grdContainer == undefined){
					
					grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_B001", options);
					
					//그리드 아이디 변경
//					grdContainer.items.items[0].id = grdContainer.items.items[0].id + "_" + gridId;
					
					tab.add(grdContainer);
					//tab.insert(0, grdContainer);
				}
				tab.setActiveTab(gridId + "_container");
				var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
				grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
				//grdCtl.id = gridId;
				
				if(siteIds != ""){
					grdCtl.siteIds = siteIds;
				}
				if(parentIds != ""){
					grdCtl.parentIds = parentIds;
				}
				
				gridStore = Ext.create("krf_new.store.south.SearchResultGrid_B001", {
					siteIds: grdCtl.siteIds,
					parentIds: grdCtl.parentIds,
					firstSession: test,
					isFirst: isFirst,
					gridCtl: grdCtl
				});
				
				grdCtl.getView().bindStore(gridStore);
		}
	}else if(parentCheck == "C"){
		
		var firstSearch =  $KRF_APP.btnFlag;
		if(firstSearch == "noDate"){
			cmbStartYear.setValue("2013");
			cmbStartMonth.setValue("10");
			cmbEndYear.setValue("2013");
			cmbEndMonth.setValue("12");
		}

		//hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			
			grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_C", options);
			
			//그리드 아이디 변경
//			grdContainer.items.items[0].id = grdContainer.items.items[0].id + "_" + gridId;
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//grdCtl.id = gridId;  // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		
		gridStore = Ext.create("krf_new.store.south.SearchResultGrid_C", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			firstSession: test,
			gridCtl: grdCtl
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	
	}else if(parentCheck == "D"){

		//hiddenGrid.setHidden(true);
		if(grdContainer == null || grdContainer == undefined){
			
			if(orgParentId == "D001"){
				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_D", options);
			}else{
				var contype = orgParentId.replace('00', '_');
				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_"+contype, options);
			}
//			else if(orgParentId == "D002"){
//				
//				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_D_2", options);
//			}else if(orgParentId == "D003"){
//				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_D_3", options);
//			}else if(orgParentId == "D004"){
//				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_D_4", options);
//			}else if(orgParentId == "D005"){
//				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_D_5", options);
//			}else if(orgParentId == "D006"){
//				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_D_6", options);
//			}else if(orgParentId == "D007"){
//				grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_D_7", options);
//			}
			
			//그리드 아이디 변경
//			grdContainer.items.items[0].id = grdContainer.items.items[0].id + "_" + gridId;
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		
		//grdCtl.id = gridId;  // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		if(orgParentId == undefined){
			orgParentId = parentIds;
		}
		
		
		gridStore = Ext.create("krf_new.store.south.SearchResultGrid_D", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
			orgParentIds: orgParentId,
			gridCtl: grdCtl
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	
	
	}else if(parentCheck == "I"){
		
        if(typeof(parentIds) == 'string'){
            orgParentId = parentIds;
        }
        
		if(grdContainer == null || grdContainer == undefined){
			
            if(orgParentId == "I001"){
                grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_I", options);
            }else if(orgParentId == "I002" || orgParentId == "I003"){
            	grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_I_2", options);
            }
			
			//그리드 아이디 변경
//			grdContainer.items.items[0].id = grdContainer.items.items[0].id + "_" + gridId;
			
			tab.add(grdContainer);
			//tab.insert(0, grdContainer);
		}
		
		tab.setActiveTab(gridId + "_container");
		
		var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
		grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
		//grdCtl.id = gridId;  // 그리드 아이디를 주면 창 닫을때 죽어버린다.. 일단 주지 말자..
		
		if(siteIds != ""){
			grdCtl.siteIds = siteIds;
		}
		if(parentIds != ""){
			grdCtl.parentIds = parentIds;
		}
		
		
		gridStore = Ext.create("krf_new.store.south.SearchResultGrid_I", {
			siteIds: grdCtl.siteIds,
			parentIds: grdCtl.parentIds,
            orgParentIds: orgParentId,
			firstSession: test,
			gridCtl: grdCtl
		});
		
		grdCtl.getView().bindStore(gridStore);
	
	}
}

// 검색결과창 닫기
HideFavoriteWin = function(){
	
	// 즐겨찾기 팝업
	var popCtl = Ext.getCmp("Favorite");
	
	if(popCtl != undefined){
		
		popCtl.close();
	}
	
	SetBtnOnOff("btnFavorites", "off");
}

//검색결과창 닫기
HideSearchResult = function(){
	var searchResultWindow = $KRF_APP.searchResultWindow;
	if(searchResultWindow != undefined){
		searchResultWindow.close();
	}
	SetBtnOnOff("btnSearchResult", "off");
}

// WindowControl 오브젝트 리턴
GetWindowControl = function(options){
	var winCtl = Ext.getCmp(options.id);
	if(winCtl == undefined){
		winCtl = Ext.create('krf_new.view.common.WindowControl', options);
	}
	return winCtl;
}

// TabControl 오브젝트 리턴
GetTabControl = function(options){
	var tabCtl = Ext.getCmp(options.id);
	if(tabCtl == undefined){
		tabCtl = Ext.create('krf_new.view.common.TabControl', options);
	}
	return tabCtl;
}





// 리치정보 검색결과 탭 추가
// catIds : 집수구역 아이디 문자열 (공백이면 리치 선택했을때..)
ShowSearchResultReach = function(catIds){
	
	var centerContainer = Ext.getCmp('center_container');
	
	var windowWidth = centerContainer.getWidth();
	var windowHeight = 300;
	var windowY = centerContainer.getHeight() - windowHeight;
	
//	var resultWindow = showResultWindow();
	
	// window 창 옵션
	var options = {
			renderTo: centerContainer.el,
			id: 'searchResultWindow',
			title: '검색결과',
			constrain: true,
			width: windowWidth,
			height:windowHeight,
			y: windowY
	};
	// window 창 생성
	var searchResultWindow = this.GetWindowControl(options);
	centerContainer.add(searchResultWindow);
	
	searchResultWindow.show();
	$KRF_APP.searchResultWindow = searchResultWindow;
	
	options = {
			id: 'searchResultTab',
			//title: '결과탭1',
			header: false
	};
	
	var tabCtl = Ext.getCmp("searchResultTab");
	// TabControl 생성
	var searchResultTab = GetTabControl(options);
	
	if(tabCtl == undefined){
		searchResultWindow.add(searchResultTab); // window에 tab추가
	}
	
	options = {
			//id: "searchResultContainer",
			id: "searchResultReach_container",
			title: '리치정보',
			autoResize: true
	};
	
	var tab = searchResultTab.items.items[1];
	
	var gridStore = null;
	var grdContainer = Ext.getCmp("searchResultReach_container");
	
	if(grdContainer == null || grdContainer == undefined){
		grdContainer = Ext.create("krf_new.view.south.SearchResultGrid_Reach", options);
		//tab.add(grdContainer);
		tab.insert(0, grdContainer);
	}
	tab.setActiveTab("searchResultReach_container");
	
	var grdCtl = grdContainer.items.items[0]; // 그리드 컨테이너
	grdCtl = grdCtl.items.items[0]; // 그리드 컨트롤
	
	var coreMap = GetCoreMap();
	var storeData = [];
	
	/* khLee 추가 2016/11/15 */
	if(catIds == ""){
		
    	var catDids = $KRF_APP.coreMap._krad.arrAreaGrp.map(function(obj){
    		return obj.attributes.CAT_DID;
    	});
    	
    	for(var i = 0; i < catDids.length; i++){
    		catIds += "'" + catDids[i] + "', ";
    	}
    	
    	catIds = catIds.substring(0, catIds.length - 2);
	}
	/* khLee 추가 2016/11/15 끝 */
	
	var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + '/' + $KRF_DEFINE.reachLineLayerId); // 레이어 URL
	
	var query = new esri.tasks.Query();
	query.returnGeometry = false;
	
	//
	if(catIds.indexOf("'")== -1){
		catIds = "'" + catIds + "'";
	}
	
	query.where = "CAT_DID IN (" + catIds + ")";
	query.outFields = ["*"];
	// 로딩바 표시
	Ext.getCmp("searchResultReachGridContainer").removeCls("dj-mask-noneimg");
	Ext.getCmp("searchResultReachGridContainer").addCls("dj-mask-withimg");
	Ext.getCmp("searchResultReachGridContainer").mask("loading", "loading...");
	
	queryTask.execute(query, function(objLine){
		
		var queryTask2 = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + '/' + $KRF_DEFINE.reachAreaLayerId); // 리치레이어 URL
		var query2 = new esri.tasks.Query();
		query2.returnGeometry = false;
	 
		query2.where = "CAT_DID IN (" + catIds + ")";
		
		query2.outFields = ["*"];
		
		queryTask2.execute(query2, function(objArea){
			
			var sumRchLen = 0;
			var sumCatArea = 0;
			var tmpCatDid = "";
			
			Ext.each(objLine.features, function(line){
				
				var rowData = [];
				
				rowData.push(line.attributes.RCH_DID);
	    		rowData.push(line.attributes.RCH_LEN);
	    		sumRchLen += line.attributes.RCH_LEN;
	    		rowData.push(line.attributes.CAT_DID);
				
				Ext.each(objArea.features, function(area){
					
					if(line.attributes.CAT_DID == area.attributes.CAT_DID){

	    				rowData.push(area.attributes.AREA);
	    				
	    				if(tmpCatDid.indexOf(line.attributes.CAT_DID + "|") < 0){
							sumCatArea += area.attributes.AREA;
							tmpCatDid += line.attributes.CAT_DID + "|";
						}
					}
				});
					
		    	rowData.push(line.attributes.RIV_NM);
	    		rowData.push(line.attributes.CUM_LEN);
	    		var geoTrib = line.attributes.GEO_TRIB;
	    		if(geoTrib == "0")
	    			rowData.push("본류");
	    		else{
	    			rowData.push("지류");
	    		}
	    		
	    		storeData.push(rowData);
			});
			
			var rowData = [];
			rowData.push("총계");
			rowData.push(sumRchLen);
			rowData.push("");
			rowData.push(sumCatArea);
			rowData.push("");
			rowData.push(0);
			rowData.push("");
			storeData.splice(0, 0, rowData);
			
			var store = new Ext.data.ArrayStore({
        		fields: [{name: 'RCH_DID', type: 'string'},
        		         {name: 'RCH_LEN', type: 'float'},
        		         {name: 'CAT_DID', type: 'string'},
        		         //{name: 'CAT_AREA', type: 'float'},
        		         {name: 'CUM_AREA', type: 'float'},
        		         {name: 'RIV_NM', type: 'string'},
        		         {name: 'CUM_LEN', type: 'float'},
        		         {name: 'GEO_TRIB', type: 'string'}]
        	});
			
        	store.loadData(storeData);
        	grdCtl.setStore(store); // 그리드 스토어 셋팅
        	
        	// 로딩바 숨김
			Ext.getCmp("searchResultReachGridContainer").unmask();
			
        	if(objLine.features.length == 0){
        		Ext.getCmp("searchResultReachGridContainer").addCls("dj-mask-noneimg");
				Ext.getCmp("searchResultReachGridContainer").mask("데이터가 존재하지 않습니다.", "noData");
        	}
		}, function(error){
			
			// 로딩바 숨김
			Ext.getCmp("searchResultReachGridContainer").unmask();
			Ext.getCmp("searchResultReachGridContainer").addCls("dj-mask-noneimg");
			Ext.getCmp("searchResultReachGridContainer").mask("집수구역 조회 오류 발생하였습니다.", "noData");
		});
	}, function(error){
		
		// 로딩바 숨김
		Ext.getCmp("searchResultReachGridContainer").unmask();
		Ext.getCmp("searchResultReachGridContainer").addCls("dj-mask-noneimg");
		Ext.getCmp("searchResultReachGridContainer").mask("리치라인 조회 오류 발생하였습니다.", "noData");
	});
}

var vrow = "";

PollSelectedFocus = function(catId){
	
	if(catId == undefined || catId == null || catId == ""){
		return;
	}
	
	var tabpanels = Ext.getCmp("tabpanels");
	
	
	var container = "";
	var value =	"";
	
	if(tabpanels.activeTab.id == "searchResultPollLoad_container"){
		container = Ext.getCmp("searchResultPollLoad_container");
		value = Ext.getCmp("pollLoadSelect").value;
	}else if(tabpanels.activeTab.id == "searchResultPollution_01_container"){
		container = Ext.getCmp("searchResultPollution_01_container");
		value = Ext.getCmp("pollutionSelect").value;
	}
	
	if(container == undefined){
		return;
	}
	
	
	if(value == 11 || value == 22){
		return;
	}else{
		
		var container = container.items.items[0];
		container = container.items.items[0];
		
		var pollStore = container.getStore();
		
		
		var row = "";
		
		for(i = 0 ; i <pollStore.data.items.length  ;i++){
			if(tabpanels.activeTab.id == "searchResultPollLoad_container"){
				if(pollStore.data.items[i].data.GUBUN == "소계"){
					if(pollStore.data.items[i].data.CAT_DID == catId){
						row = i;
					}
				}
			}else if(tabpanels.activeTab.id == "searchResultPollution_01_container"){
				if(pollStore.data.items[i].data.CAT_DID == catId){
					row = i;
				}
			}
			
			
		}
		
		container.getView().bufferedRenderer.scrollTo(row, true);
		container.getSelectionModel().select(row);
		
	}
	
}


ReachSelectedFocus = function(catId){
	
	if(catId == undefined || catId == null || catId == ""){
		return;
	}
	
	var rchGridContainer = Ext.getCmp("searchResultReach_container");
	var gridCtl = rchGridContainer.items.items[0];
	gridCtl = gridCtl.items.items[0];
	var rowIdx = gridCtl.getStore().find("CAT_DID", catId);
	
//	gridCtl.getView().getRow(rowIdx).scrollIntoView();	
}

GetCatArea = function(catDId){
	
	var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.reachServiceUrl_v3 + '/' + $KRF_DEFINE.reachAreaLayerId); // 레이어 URL
	var query = new esri.tasks.Query();
	query.returnGeometry = false;
	
	query.where = "CAT_DID IN '" + catDId + "'";
	
	var test = "";
	
	query.outFields = ["*"];
	var retVal = queryTask.execute(query);
	
	retVal.then(function(featureSet){
		return featureSet;
	});
	
	return test;
	
}

var _searchType = "";
var WS_CD = AM_CD = AS_CD = "";
var ADM_CD = "";
var PT_NM = "";
var _siteIds = "";
var _parentId = "";
var _titleText = "";
var _gridId = "";

// 좌측 위치검색 조회 조건 체크 및 셋팅 (구분이 동일할 경우 _searchType을 파라메터로..)
ChkSearchCondition = function(sType, siteIds, parentId, titleText, gridId){
	
	// 찾기 구분 셋팅 ("수계찾기", "행정구역찾기", "명칭찾기")
	if(_searchType == "" || _searchType != sType){
		_searchType = sType;
	}
	
	WS_CD = AM_CD = AS_CD = "";
	ADM_CD = "";
	PT_NM = "";
	_siteIds = ""; // 지점코드
	_parentId = ""; // 부모코드(레이어구분코드)
	_titleText = titleText;
	_gridId = "searchGrid_" + gridId;
	
	if(_searchType == "수계찾기"){
		WS_CD = Ext.getCmp("cmbWater1").value;
		if(WS_CD == null){
			WS_CD = "";
		}
		AM_CD = Ext.getCmp("cmbWater2").value;
		if(AM_CD == null){
			AM_CD = "";
		}
		AS_CD = Ext.getCmp("cmbWater3").value;
		if(AS_CD == null){
			AS_CD = "";
		}
		
		if(WS_CD == ""){
			alert("대권역을 선택해주세요.");
			return false;
		}
		
		if(AM_CD == ""){
			alert("중권역을 선택해주세요.");
			return false;
		}
	}
	
	if(_searchType == "행정구역찾기"){
		
		ADM_CD = Ext.getCmp("cmbArea3").value;
		
		if(ADM_CD == null || ADM_CD == ""){
			
			ADM_CD = Ext.getCmp("cmbArea2").value;
			
			if(ADM_CD == null || ADM_CD == ""){
				
				ADM_CD = Ext.getCmp("cmbArea1").value;
				
				if(ADM_CD == null || ADM_CD == ""){
					alert("시/도를 선택해주세요.")
				}
				else{
					alert("시/군/구를 선택해주세요.");
				}
				
				return false;
			}
			else{
				ADM_CD = ADM_CD.substring(0, 5)
			}
		}
		else{
			ADM_CD = ADM_CD.substring(0, 8)
		}
	}
	
	if(_searchType == "지점코드찾기"){
		
		_siteIds = siteIds;
		_parentId = parentId;
		
	}
	
	return true;
	
}


siteMovePoint = function(parentNodeId, nodeId , clickValue){
	
	if(nodeId == undefined || nodeId == null || nodeId == ""){
		return;
	}
	
	var layerId = "";
	if(parentNodeId == "Cat"){ // 집수구역
		layerId = $KRF_DEFINE.reachAreaLayerId;
		$KRF_APP.fireEvent($KRF_EVENT.SET_SELECTED_CAT_AREA, layerId, nodeId);
		layerId = $KRF_DEFINE.reachLineLayerId;
		$KRF_APP.fireEvent($KRF_EVENT.SET_SELECTED_RCHLINE, layerId, nodeId);
		return;
	}else{
		/* 레이어 정보 가져오기 */
		var layer01Info = getLayer01Info("layerCode", parentNodeId, null, null);

		if(layer01Info.length > 0){
			layerId = layer01Info[0].id;
		}
		else{
			console.info(parentNodeId + "에 해당하는 레이어 아이디가 없습니다. Layer01Data.json 확인 요함.")
		}
	}
	
	// 피처 레이어 생성/갱신
	$KRF_APP.fireEvent($KRF_EVENT.SET_SELECTED_SITE, layerId, nodeId, clickValue);	
	
	// 주제도 레이어 키기
	Layer01OnOff(layerId, "on");
}

OpenMenualPop = function(){
	window.open("./resources/menual/KRF_USER_MANUAL.html", "하천망 분석도 사용자 메뉴얼", "width=1024, height=768, toolbar=no, status=no, menubar=no, scrollbars=yes, resizable=no, left=150, top=150");
}

ResetButtonClick = function(){
	var me = GetCoreMap();
	
	// KRAD 레이어 그래픽 및 변수 초기화
	$KRF_APP.coreMap._krad.clearKradAll();
	SetBtnOnOff("btnMenu04", "off");
	SetBtnOnOff("btnMenu05", "off");
	
	catTMLayerOnOff("off");
	
	pollutionLayerOnOff("off","");
	
	$KRF_APP.fireEvent($KRF_EVENT.HIDE_SITE_LIST_WINDOW);
	
//	Ext.HideSiteListWindow(); // 지점 리스트 창 닫기
	
	HideWindowSiteNChart(); // 지점정보, 차트창 닫기
	HideSearchResult(); // 검색결과 닫기
	HideFavoriteWin(); // 즐겨찾기창 닫기
	
	ResetStEdSiteName(); // 시작위치 끝위치 하천명 초기화
	
	var combo = Ext.getCmp("cmbWater1");
	combo.setValue("");
	combo = Ext.getCmp("cmbWater2");
	combo.setValue("");
	combo.setDisabled(true);
	combo = Ext.getCmp("cmbWater3");
	combo.setValue("");
	combo.setDisabled(true);
	var btn = Ext.getCmp("btnWater1");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnWater2");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnWater3");
	btn.setDisabled(true);
	
	combo = Ext.getCmp("cmbArea1");
	combo.setValue("");
	combo = Ext.getCmp("cmbArea2");
	combo.setValue("");
	combo.setDisabled(true);
	combo = Ext.getCmp("cmbArea3");
	combo.setValue("");
	combo.setDisabled(true);
	btn = Ext.getCmp("btnSearch1");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnSearch2");
	btn.setDisabled(true);
	btn = Ext.getCmp("btnSearch3");
	btn.setDisabled(true);
	
	var txtBox = Ext.getCmp("textSearchText");
	txtBox.setValue("");
	
	
	
	//리치검색시 초기화 해야될 목록
	$KRF_APP.coreMap._krad.isSearchStop = true;
	
	$KRF_APP.coreMap._krad.cmRiRchDid = [];
	$KRF_APP.coreMap._krad.cmLeRchDid = [];
	$KRF_APP.coreMap._krad.isNotBon = false;
	$KRF_APP.coreMap._krad.isNotBon1 = false;
	$KRF_APP.coreMap._krad.isNotBon2 = false;
	$KRF_APP.coreMap._krad.clickFS = [];
	
	$KRF_APP.coreMap._krad.arrDownGrpStart = "";
	$KRF_APP.coreMap._krad.arrDownGrpEnd = "";

	$KRF_APP.coreMap._krad.cmRiRchDid = [];
	$KRF_APP.coreMap._krad.cmLeRchDid = [];

	$KRF_APP.coreMap._krad.bonStLine = "";
	$KRF_APP.coreMap._krad.bonEnLine = "";


	$KRF_APP.coreMap._krad.stRchDids = [];
	$KRF_APP.coreMap._krad.edRchDids = [];
	$KRF_APP.coreMap._krad.falseDid1 = "";
	$KRF_APP.coreMap._krad.falseDid2 = "";

	$KRF_APP.coreMap._krad.arr1RRchDid = "";
	$KRF_APP.coreMap._krad.arr1LRchDid = "";

	$KRF_APP.coreMap._krad.arr2RRchDid = "";
	$KRF_APP.coreMap._krad.arr2LRchDid = "";
	
	$KRF_APP.coreMap._krad.areaGrpLayer.setVisibility(true);  //초기화시 집수구역 visibility 켜기
	
	$KRF_APP.coreMap._krad.realTimeStBtnChk = true;
	$KRF_APP.coreMap._krad.realTimeEnBtnChk = true;
	
	//---north
	// 항공영상 초기화
	
	$KRF_APP.global.DroneFn.onClickResetButton();
	
	// 항공영상 On/Off
	var currCtl = SetBtnOnOff("btnSearchDrone", "off");
	var droneCtl = Ext.getCmp("droneToolbar");
	
	Ext.getCmp("cboDroneLayer").down("combo").collapse();
	
	//리치 시작 끝 close 끄기
	if(Ext.getCmp("reach_close")!=undefined){
		Ext.getCmp("reach_close").setVisible(false);
	}
	
	
	if(currCtl != undefined && droneCtl != undefined){
		
		// 항공영상 tool 숨기기
		if(currCtl.btnOnOff == "on"){
			droneCtl.show();
		}else{
			droneCtl.hide();
            Ext.getCmp("droneDetailExp").hide();
		}
		
		//초기화시 디폴트 레이어 디퍼로드
		Ext.defer(function(){
			Layer01OnOff($KRF_DEFINE.reachNodeLayerId, "on");  //리치노드
			Layer01OnOff($KRF_DEFINE.reachLineLayerId, "on");  //리치라인
			Layer01OnOff($KRF_DEFINE.reachFlowLayerId, "on");  //리치흐름
			Layer01OnOff($KRF_DEFINE.lakeLayerId, "on");  //리치흐름
			
			//상위 버튼 초기화
			SetBtnOnOff("btnFlowLayer","on");
			SetBtnOnOff("btnReachLayer","on");
		}, 500);
	}
	
	// 물환경 연동 마커 초기화
	var coreMap = GetCoreMap();
	var paramMarker = coreMap.map.getLayer("siteSymbolGraphic");
	if(paramMarker!=undefined){
		paramMarker.hide();
	}
	
	
	
	/* 사이트 정보 팝업 띄우기 */
	var popCtl = Ext.getCmp("popSiteInfo");
	
	// 팝업 띄워져있으면 닫기
	if(popCtl != undefined){
		
		popCtl.close();
	}
	
    /* 수질측정지점 레이어  on */
    Layer01OnOff("1", "on");
    Layer01OnOff("2", "on");
    Layer01OnOff("3", "on");
    Layer01OnOff("4", "on");
    Layer01OnOff("5", "on");

}


// 주제도 레이어 on/off
Layer01OnOff = function(layerId, onoff){
	
	if(layerId == undefined || layerId == null || layerId == ""){
		return;
	}
	
	var treeCtl = Ext.getCmp("layer01");
	var node = treeCtl.getStore().getNodeById(layerId);
	
	var isChecked = false;
	
	if(onoff == "on"){
		node.set("checked", true);
	}
	else if(onoff == "off"){
		node.set("checked", false);
	}
	else{
		if(node.data.checked == false){
			node.set("checked", true);
		}
		else{
			node.set("checked", false);
		}
	}
	
	treeCtl.fireEvent('checkchange', node, node.data.checked, null);
	
	/*if(node.data.checked == false){
		node.set("checked", true);
		treeCtl.fireEvent('checkchange', node, true, null);
	}*/
}

runStartEnd = function(option){
	
	var coreMap = GetCoreMap();
	
	if(option == "start" || option == "end"){
		
		var option = "";
		var btnId = "";
		
		if(option == "start"){
			// 심볼설정
			coreMap.reachLayerAdmin_v3_New.startSymbol.url = coreMap.reachLayerAdmin_v3_New.getStartSymbolUrl();
			coreMap.reachLayerAdmin_v3_New.startSymbol.width = 48;
			coreMap.reachLayerAdmin_v3_New.startSymbol.height = 38;
			
			option = "STARTPOINT";
			btnId = "btnMenu04";
		}
		if(option == "end"){
			// 심볼설정
			coreMap.reachLayerAdmin_v3_New.endSymbol.url = coreMap.reachLayerAdmin_v3_New.getEndSymbolUrl();
			coreMap.reachLayerAdmin_v3_New.endSymbol.width = 48;
			coreMap.reachLayerAdmin_v3_New.endSymbol.height = 38;
			
			option = "ENDPOINT";
			btnId = "btnMenu05";
		}
		
		coreMap.reachLayerAdmin_v3_New.drawSymbol(option, point); // 심볼 그리기
		var currCtl = Ext.getCmp(btnId);
		if(currCtl != undefined && currCtl.btnOnOff == "on")
			SetBtnOnOff(btnId);
		coreMap.reachLayerAdmin_v3_New.runStartEnd(); // 검색 실행
		closePopSiteInfo(); // 툴팁 닫기
	}
}

// 시작지점 끝지점 값 셋팅
SetStEdSiteName = function(option, value){
	
	if(value != undefined && value != ""){
		var reachNameToolbar = Ext.getCmp("reachNameToolbar");
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");
		
		if(option == "start"){
			reachNameToolbar.items.items[0].setValue(value);
			textSearchText_Start.setValue(value);
		}
		if(option == "end"){
			reachNameToolbar.items.items[1].setValue(value);
			textSearchText_End.setValue(value);
		}
	}
}

//시작지점 끝지점 값 초기화
ResetStEdSiteName = function(){
	
	var reachNameToolbar = Ext.getCmp("reachNameToolbar");
	var textSearchText_Start = Ext.getCmp("textSearchText_Start");
	var textSearchText_End = Ext.getCmp("textSearchText_End");
	
	if(reachNameToolbar != undefined){
		reachNameToolbar.items.items[0].setValue("");
		reachNameToolbar.items.items[1].setValue("");
	}
	
	textSearchText_Start.setValue("");
	textSearchText_End.setValue("");
}

var westPreWidth = 0;

// 좌측 숨기거나 펼때 컨트롤 XY 셋팅
SetWestCollapseXY = function(option){
	
	return;
	
	// west_container, west_buttonpanel
	var westContainer = Ext.getCmp("west_container");
	var westWidth = westContainer.getWidth();
	var initWidth = westContainer.initWidth;
	var offsetWidth = westWidth;

	if(option == "show"){
		
		offsetWidth = westWidth - initWidth;
	}
	
	if(option == "resize"){

		if(westPreWidth != westWidth){
			
			offsetWidth = westWidth - westPreWidth;
			westPreWidth = westWidth;
		}
	}
	
	if(westContainer.collapsed == false){
		
		// 숨기기 버튼 셋팅
		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_close.png' />";
		offsetWidth = 0 + offsetWidth; // 플러스
	}
	else{
		
		// 보이기 버튼 셋팅
		Ext.get("west_container-splitter-collapseEl").dom.innerHTML = "<img src='./resources/images/button/btn_arrow_open.png' />";
		offsetWidth = 0 - offsetWidth; // 마이너스
	}
	
	var sConfig = Ext.getCmp("searchConfig");
	if(sConfig != undefined){
		
		if(sConfig.hidden == false){
			
			sConfig.setX(sConfig.getX() + offsetWidth);
		}
	}
	
	var shConfig = Ext.getCmp("searchConfigHeader");
	if(shConfig != undefined){
		
		if(shConfig.hidden == false){
			
			shConfig.setX(shConfig.getX() + offsetWidth);
		}
	}
	//searchConfigHeader
	
	//krad 리스트
	var kConfig = Ext.getCmp("kradSchConf");
	
	if(kConfig != undefined){
		
		if(kConfig.hidden == false){
			
			kConfig.setX(kConfig.getX() + offsetWidth);
		}
	}
	
	var kMetaConfig = Ext.getCmp("kradMetaInfo");
	
	if(kMetaConfig != undefined){
		
		if(kMetaConfig.hidden == false){
			
			kMetaConfig.setX(kMetaConfig.getX() + offsetWidth);
		}
	}
	
	var droneToolbar = Ext.getCmp("droneToolbar");
	if(droneToolbar != undefined){
		
		if(droneToolbar.hidden == false){
			droneToolbar.setX(droneToolbar.getX() + offsetWidth);
		}
	}
	
	if(option != "show"){
		
		var reachNameToolbar = Ext.getCmp("reachNameToolbar");
		
		if(reachNameToolbar != undefined){
			
			if(offsetWidth == 300){
				reachNameToolbar.setX(486 - 300 + offsetWidth);
			}
			else{
				reachNameToolbar.setX(486 - 300);
			}
		}
		
		// 툴팁 XY 셋팅
		$KRF_APP.fireEvent($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION);
	}
}


//offset 적용한 센터이동
centerAtWithOffset = function(x, y, spatialReferrence){
	
	var coreMap = GetCoreMap();
//	
//	var tileInfo = $KRF_APP.coreMap.tileInfo;
//	var curLevel = coreMap.map.getLevel();
//	
//	if(coreMap.map.getLevel() < 12){
//		coreMap.map.setLevel(12);
//		curLevel = 12;
//	}
//	//alert(x);
//	var reachToolHeight = 0;
//	if(Ext.getCmp("reachToolbar") != undefined)
//		reachToolHeight = Ext.getCmp("reachToolbar").getHeight();
//	var resolution = tileInfo.lods[curLevel].resolution;
//	var xoffset = (1920 - Ext.getBody().getWidth()) / 2 * resolution;
//	var yoffset = (1080 - Ext.getBody().getHeight()) / 2 * resolution;
//	
//	x = x + xoffset;
//	y = y - yoffset + (reachToolHeight * resolution);
//	
//	// 2016-04-05 추가
//	x = x + (225 * resolution); // center.js map width 2200 -> 2650으로 변경 (450/2만큼 좌측으로)
//	y = y - (250 * resolution); // center.js map width 1000 -> 1100으로 변경 (100/2만큼 위로)
	
	var point = new esri.geometry.Point(x, y, spatialReferrence);
	coreMap.map.centerAt(point);
}

//툴팁 XY 셋팅
setTooltipXY = function(){
	
	var me = GetCoreMap();
	
//	if(me != undefined)
//		me.setX(9); // 좌측 패널 resize, collapse, expand시 맵 left 고정 2016-04-05
	
	var popCtl = Ext.getCmp("popSiteInfo");
	
	if(popCtl != undefined && popCtl != null){
		var extent = me.map.extent;
		
		var mapWin = $KRF_APP.getDesktopWindow('map-win');
		
		var centerPoint = esri.geometry.toScreenPoint(extent,Ext.getCmp('_mapDiv_').width, Ext.getCmp('_mapDiv_').height, popCtl.point);
		xPx = (centerPoint.x+76+mapWin.getX())-popCtl.getWidth()/2;
		yPx = (centerPoint.y+mapWin.getY())-popCtl.getHeight()+12;
		// 이미지 사이즈 절반만큼 offset
		xPx += 11;
		yPx += 11;
		popCtl.setX(xPx);
		popCtl.setY(yPx);
	}
}
// offset 적용한 센터이동
//centerAtWithOffset = function(x, y, spatialReferrence){
//	
//	var coreMap = GetCoreMap();
//	
//	var tileInfo = $KRF_APP.coreMap.tileInfo;
//	var curLevel = coreMap.map.getLevel();
//	
//	if(coreMap.map.getLevel() < 12){
//		coreMap.map.setLevel(12);
//		curLevel = 12;
//	}
//	//alert(x);
//	var reachToolHeight = 0;
//	if(Ext.getCmp("reachToolbar") != undefined)
//		reachToolHeight = Ext.getCmp("reachToolbar").getHeight();
//	var resolution = tileInfo.lods[curLevel].resolution;
//	var xoffset = (1920 - Ext.getBody().getWidth()) / 2 * resolution;
//	var yoffset = (1080 - Ext.getBody().getHeight()) / 2 * resolution;
//	
//	x = x + xoffset;
//	y = y - yoffset + (reachToolHeight * resolution);
//	
//	// 2016-04-05 추가
//	x = x + (225 * resolution); // center.js map width 2200 -> 2650으로 변경 (450/2만큼 좌측으로)
//	y = y - (50 * resolution); // center.js map width 1000 -> 1100으로 변경 (100/2만큼 위로)
//	
//	var point = new esri.geometry.Point(x, y, spatialReferrence);
//	coreMap.map.centerAt(point);
//}
//
//// 툴팁 XY 셋팅
//setTooltipXY = function(){
//	
//	var me = GetCoreMap();
//	
//	if(me != undefined)
//		me.setX(9); // 좌측 패널 resize, collapse, expand시 맵 left 고정 2016-04-05
//	
//	var popCtl = Ext.getCmp("popSiteInfo");
//	
//	if(popCtl != undefined && popCtl != null){
//		
//		var curLevel = me.map.getLevel();
//		var resolution = me.tileInfo.lods[curLevel].resolution;
//		var extent = me.map.extent;
//		
//		var siteX = popCtl.point.x;
//		var siteY = popCtl.point.y;
//		
//		var xPx = ((extent.xmax - extent.xmin) - (extent.xmax - siteX)) / resolution;
//		var yPx = ((extent.ymax - extent.ymin) - (siteY - extent.ymin)) / resolution;
//		
//		var popWidth = popCtl.getWidth();
//		var popHeight = popCtl.getHeight();
//		
//		xPx = xPx - popWidth / 2;
//		yPx = yPx - popHeight;
//		
//		// 이미지 사이즈 절반만큼 offset
//		xPx += 11;
//		yPx += 11;
//		
//		/* 상단 map left 고정으로인해 필요없게 되었음.. 2016-04-05
//		var westContainer = Ext.getCmp("west_container");
//		
//		if(westContainer.collapsed != false){
//			
//			xPx = xPx - westContainer.initWidth;
//		}
//		else{
//			
//			xPx = xPx - (westContainer.initWidth - westContainer.getWidth());
//		}
//		*/
//		
//		popCtl.setX(xPx);
//		popCtl.setY(yPx);
//	}
//}

//지점정보 툴팁 닫기
closePopSiteInfo = function(){
	var popCtl = Ext.getCmp("popSiteInfo");
	
	if(popCtl != undefined){
		popCtl.close();
	}
}

//좌측 패널 스크롤 생성
setWestBodyScroll = function(){
	
	var height = Ext.getBody().getViewSize().height - 400;
	
	var bodyCtl = Ext.getCmp("searchAreaList").body;
	bodyCtl.setStyle("height", height + "px");
	bodyCtl.setStyle("overflow", "overlay");
}

// 이미지 정보 가져오기
getImageInfos = function(obj, outObjInfos, callbackMethod){
	
	if(outObjInfos == null){
		outObjInfos = [];
	}
	var arrObj = [];
	
	if(obj[0] != undefined && obj[0] != null){
		
		arrObj = obj;
	}
	else{
		
		arrObj.push(obj);
	}
	
	if(arrObj != undefined && arrObj != null && arrObj.length > 0){
		
		for(var i = 0; i < arrObj.length; i++){
			
			
			/*if(i < 35){
				continue;
			}*/
			
			var objInfo = {};
			
			var imgObj = $("#" + arrObj[i].id);
			
			//if(arrObj[i].id.search("ReachLayerAdminBackground") != -1){
			//}

			objInfo.width = imgObj.width();
			objInfo.height = imgObj.height();
			//objInfo.opacity = imgObj.css("opacity");
			objInfo.opacity = imgObj.parent().css("opacity");
			objInfo.translateX = 0;
			objInfo.translateY = 0;
			objInfo.src = imgObj[0].src;
			objInfo.tagName = imgObj[0].tagName.toUpperCase();
			objInfo.outerHTML = new XMLSerializer().serializeToString(imgObj[0]);
			
			/*if(tagName == "IMG"){
				
				objInfo.src = imgObj[0].src;
			}
			else{
				
				var svgString = new XMLSerializer().serializeToString(imgObj[0]);
				//console.info(svgString);
				
				// bota() : svg -> base64 encording
				var imgsrc = 'data:image/svg+xml;base64,'+ btoa(svgString);
				//console.info(imgsrc);
				
				objInfo.base64 = imgsrc;
				objInfo.src = tagName;
			}*/
			
			
			
			if(imgObj.css('transform') != undefined && imgObj.css('transform') != null){
				
				var arr = imgObj.css('transform').split(",");
				
				if(arr.length > 11){
					
					objInfo.translateX = parseInt(arr[12]);
					objInfo.translateY = parseInt(arr[13]);
				}
				else{
					
					objInfo.translateX = parseInt(arr[4]);
					objInfo.translateY = parseInt(arr[5]);
				}
			}
			else if(imgObj.css('-webkit-transform') != undefined && imgObj.css('-webkit-transform') != null){
				
				var arr = imgObj.css('-webkit-transform').split(",");
				
				objInfo.translateX = parseInt(arr[4]);
				objInfo.translateY = parseInt(arr[5]);
			}
			
			if(isNaN(parseInt(imgObj.css('left'))) == false && parseInt(imgObj.css('left')) != 0){
				
				objInfo.translateX = parseInt(imgObj.css('left').replace("px", ""));
			}
			
			if(isNaN(parseInt(imgObj.css('top'))) == false && parseInt(imgObj.css('top')) != 0){
				
				objInfo.translateY = parseInt(imgObj.css('top').replace("px", ""));
			}
			
			objInfo.translateX = 0;
			objInfo.translateY = 0;
			
			outObjInfos.push(objInfo);
		}
		
		var imgLoadCnt = 0;
		
		for(var i = 0; i < outObjInfos.length; i++){
		
			convertImgToBase64(outObjInfos[i], function(base64Img, outObjInfo){
				
				imgLoadCnt++;
				
				var base64Cnt = 1;
				
				for(var i = 0; i < outObjInfos.length; i++){

					if(outObjInfos[i].base64 != undefined && outObjInfos[i].base64 != null){
						
						base64Cnt++;
					}
				}
				
				
				
				outObjInfo.base64 = base64Img;
			});
		}
		
		var tmpCnt = 0;
		var eqlCnt = 0;
		
		var timerId = window.setInterval(function(){
			
			if(tmpCnt != imgLoadCnt){
				
				tmpCnt = imgLoadCnt;
			}
			else{
				
				eqlCnt++;
				
				if(eqlCnt > 15){
					callbackMethod.call(this, outObjInfos);
					window.clearInterval(timerId);
				}
			}
			
			/*var base64Cnt = 0;
			for(var i = 0; i < outObjInfos.length; i++){

				if(outObjInfos[i].base64 != undefined && outObjInfos[i].base64 != null){
					
					base64Cnt++;
				}
			}
			
			if(base64Cnt == imgLoadCnt){

				callbackMethod.call(this, outObjInfos, base64Cnt);
				window.clearInterval(timerId);
			}*/
			
		}, 100);
	}
	
	//return arrObjInfos;
}

var imgLoadCnt = 0;

convertImgToBase64 = function(outObjInfo, callbackMethod){
	
	if(outObjInfo.tagName == "IMG"){
		
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		
		var img = new Image;
		img.crossOrigin = 'Anonymous';
		
		img.onload = function(){
			imgLoadCnt++;
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img,0,0);
			
			var dataURL = canvas.toDataURL('image/png');
			
			callbackMethod.call(this, dataURL, outObjInfo);
			
			canvas = null; 
		};
		
		img.src = "./resources/jsp/proxy.jsp?" + outObjInfo.src;
	}
	else if(outObjInfo.tagName == "SVG"){
		
		// bota() : svg -> base64 encording
		var dataURL = 'data:image/svg+xml;base64,'+ btoa(outObjInfo.outerHTML);
		
		callbackMethod.call(this, dataURL, outObjInfo);
	}
}

var chkoutObj = false;

postCall = function(outObjInfos, width, height, fileName){
	
	var paramInfos = [];
	
	if(outObjInfos.length > 20){
		chkoutObj = false;
		paramInfos = outObjInfos.splice(0, 20);
	}
	else{
		chkoutObj = true;
		paramInfos = outObjInfos;
	}

	var obj = {width:width, height:height, fileName: fileName, imageInfos:JSON.stringify(paramInfos)};

	//"./resources/jsp/_DivImgSave.jsp"//
	$.post(_API._DivImgSave, obj, function(data){
		
		if(chkoutObj == false){
			postCall(outObjInfos, width, height, data.fileName);
		}
	},"json").error(function(e){
		console.info(e);
	});
}

/* 레이어 정보(Layer01Data.json) 가져오기 */
getLayer01Info = function(attrName, attrValue, childNodes, layer01Infos){
	
	if(childNodes == undefined || childNodes == null){
		
		childNodes = Ext.getCmp("layer01").store.data.items;
	}
	
	if(layer01Infos == undefined || layer01Infos == null){
		
		layer01Infos = [];
	}
	
	for(var i = 0; i < childNodes.length; i++){
		
		var data = childNodes[i].data;
		
		if(data[attrName] == attrValue){
			
			var infoIdx = layer01Infos.indexOf(data);
			
			if(infoIdx == -1){
				
				layer01Infos.push(data);
			}
		}
		
		var tmpChilds = childNodes[i].childNodes;
		
		if(tmpChilds != undefined && tmpChilds.length > 0){
			
			getLayer01Info(attrName, attrValue, tmpChilds, layer01Infos);
		}
	}
	
	return layer01Infos;
}
/* 레이어 정보(Layer01Data.json) 가져오기 끝 */

//params: { node : node , parentId : parentId , data:data , id : id , type : type},

setActionInfo = function(node, parentId , data , id ,type){
	
    //1DEP 일시
    if(node == 0){
        node = id;
    }
    
    Ext.Ajax.request({
        url: _API.ClickSession,
        params: { node : node , parentId : parentId , data:data , id : id , type : type},
        async: true, // 비동기 = async: true, 동기 = async: false
        failure: function(form, action) {
        }
    });
}
