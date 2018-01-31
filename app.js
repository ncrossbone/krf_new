/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
var $KRF_DEFINE = null;

// 버전 관리
Ext.manifest.loader = {"cache":"1.0.2", "cacheParam":"_ver"};

Ext.create('Ext.data.Store', {
	autoLoad : true,
	fields : [ {
		name : 'MapserviceUrl'
	} ],
	proxy : {
		type : 'ajax',
		url : './resources/data/AppVariable.json',
		reader : {
			type : 'json'
		}
	}
}).load(function(a, b, c) {
	this.each(function(record, cnt, totCnt) {
		$KRF_DEFINE = record.data;
	});
});
/*
* 박철 추가 API URL 를 JSON으로 관리
*/
var _API = null;

var apiStore = Ext.create('Ext.data.Store', {
	autoLoad: true,

	fields : [{
		name : 'apiUrls'
	}],
	proxy: {
		type: 'ajax',
        url: './resources/data/APIUrlsTobe.json',
		reader: {
			type: 'json'
		}
	}
});

apiStore.load(function(a, b, c) {
	_API = a[0].data;
	
    // API URL 앞에 분을 문자열을 넣을 수 있다. http://localhost:8080 ...
    a[0].data.init('http://112.217.167.123:20003');
});

var $KRF_EVENT = {
		DESK_TOP_LOADED:'desktopLoaded',
		CORE_MAP_LOADED:'coreMapLoaded',
		MAP_WINDOW_LOADED:'mapWindowLoaded',
		DYNAMIC_LAYER_ON_OFF:'dynamicLayerOnOff',
		DRON_DYNAMIC_LAYER_ON_OFF:'drondynamicLayerOnOff',
		AREA_SELECT:'areaSelect',
		POINT_DRAW_CLICK:'pointDrawClick', 
		DRAW_END:'drawEnd',
		REACH_TEST_ON_OFF:'Reach_TestOnOff', 
		DYNAMIC_LAYER_REACH_TEST:'DynamicLayer_Reach_Test',
		END:'end',
		SET_SELECTED_SITE:'setSelectedSite',
		SET_SELECTED_CAT_AREA:'setSelectedCatArea',
		SET_SELECTED_RCHLINE:'setSelectedRchLine',
		SET_SELECTED_POP_SITE:'setSelectedPopSite',
		SHOW_SITE_LIST_WINDOW:'showSiteListWindow',
		HIDE_SITE_LIST_WINDOW:'hideSiteListWindow',
		SHOW_REACH_TOOLBAR:'ShowReachToolbar',
		HIDE_REACH_TOOLBAR:'HideReachToolbar',
		SHOW_DRONE_TOOLBAR:'ShowDroneToolbar',
		HIDE_DRONE_TOOLBAR:'HideDroneToolbar',
		MODE_CHANGED:'windowModeChanged',
		MINIMIZE_WINDOWS:'minimizeWindows',
		MAP_RESIZE:'resize',
		SET_MAP_TOOLTIP_LOCATION:'setMapTooltipLocation',
		MOVE_COMMON:'moveCommon'
			
}

var $KRF_WINS = {  KRF:{   MAP:{id:'map-win'}},
                STATUS:{MAIN:{id:'status-win'}}};

var $KRF_APP = null; 

Ext.application({
    name: 'krf_new',
    requires: [ 'krf_new.Desktop.App',
    	        "krf_new.global.Obj",
				"krf_new.global.DroneFn",
				"krf_new.global.CommFn",
				"krf_new.global.TabFn",
				"krf_new.global.AttrFn",
				"Ext.util.LocalStorage"
			  ],
		
    desktopApp : null,
    
    KRF_MODE: 'KRF_MODE',
    REPORT_MODE: 'REPORT_MODE',
    
    currentMode: '',
    
    modeWindows: {krf:[],
    			  sb:[]},
    
    localStorate : null,
    
    init: function() {
    	var me = this;
    	$KRF_APP = this;
    	
    	me.currentMode = me.KRF_MODE;
    	
    	desktopApp = new krf_new.Desktop.App();
        
        $('#pageloaddingDiv').remove();
        
        me.localStorate = new Ext.util.LocalStorage({
            id: 'krfStorage'
        });
        
        $KRF_APP.global = krf_new.global;
        
        $KRF_APP.addListener($KRF_EVENT.DESK_TOP_LOADED, me.desktopLoaded, me);
        $KRF_APP.addListener($KRF_EVENT.MAP_WINDOW_LOADED, me.mapWindowLoaded, me);
        $KRF_APP.addListener($KRF_EVENT.CORE_MAP_LOADED, me.coreMapLoaded, me);
        
        // 지점 목록 window
        $KRF_APP.addListener($KRF_EVENT.SHOW_SITE_LIST_WINDOW, me.showSiteListWindow, me);
        $KRF_APP.addListener($KRF_EVENT.HIDE_SITE_LIST_WINDOW, me.hideSiteListWindow, me);
               
        // 모드 변경
        $KRF_APP.addListener($KRF_EVENT.MODE_CHANGED, me.modeChanged, me);
        
        $KRF_APP.addListener($KRF_EVENT.MINIMIZE_WINDOWS, me.minimizeWindows, me);
        
    },
    desktopLoaded: function(){
    	var krfMode = this.localStorate.getItem('krfMode');
    	
    	if(krfMode != null){
    		if(krfMode == this.REPORT_MODE){
    			this.showReportMode();
    			return;
    		}
    	}
    	this.showKRFMode();
    },
    showKRFMode: function(){
    	for(var i=0; i<this.modeWindows.sb.length; i++){
			this.modeWindows.sb[i].close();
		}
    	
    	var dp = $KRF_APP.getDesktop();
    	var dpWidth = dp.getWidth();
    	var dpHeight = dp.getHeight();
    	
        var mapModule = $KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id);
        var mapWindow = mapModule.createWindow({x:0,y:0, width:dpWidth, height:dpHeight-35});
        mapWindow = mapWindow.show();
        
        $KRF_APP.modeWindows.krf.push(mapWindow);
        
        
//            var searchModule = this.getDesktopModule($KRF_WINS.KRF.SEARCH.id);
//            var searchWindow = searchModule.createWindow({x:82,y:40, height:dpHeight-83});
//            searchWindow = searchWindow.show();
        
        
//            this.modeWindows.krf.push(searchWindow);
    	
//    	var dp = this.getDesktop();
//    	var dpWidth = dp.getWidth();
//    	var dpHeight = dp.getHeight();
//    	
//        var mapModule = this.getDesktopModule($KRF_WINS.KRF.MAP.id);
//        var mapWindow = mapModule.createWindow({x:0,y:0, width:dpWidth, height:dpHeight-35});
//        mapWindow = mapWindow.show();
//        
////        var searchModule = this.getDesktopModule($KRF_WINS.KRF.SEARCH.id);
////        var searchWindow = searchModule.createWindow({x:82,y:40, height:dpHeight-83});
////        searchWindow = searchWindow.show();
//        
//        this.modeWindows.krf.push(mapWindow);
////        this.modeWindows.krf.push(searchWindow);
    },
    showReportMode: function(){
    	$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).release();
    	
    	for(var i=0; i<this.modeWindows.krf.length; i++){
			this.modeWindows.krf[i].close();
		}
		var dp = $KRF_APP.getDesktop();
    	var dpWidth = dp.getWidth();
    	var dpHeight = dp.getHeight();
    	
		var statusModule = $KRF_APP.getDesktopModule($KRF_WINS.STATUS.MAIN.id);
		var statusWindow = statusModule.createWindow({x:0,y:0, width:dpWidth, height:dpHeight-35});
		statusWindow = statusWindow.show();
		
		$KRF_APP.modeWindows.sb.push(statusWindow);
    },
    modeChanged: function(param){
    	
    	this.currentMode = param.mode;
    	this.localStorate.setItem('krfMode',param.mode);
//    	window.location.reload();
    	
    	if(param.mode == this.KRF_MODE){
    		this.showKRFMode();
    	}else{
    		this.showReportMode();
    	}
    },
    minimizeWindows: function(){
    	var desktop = this.getDesktop();
    	desktop.windows.each(function(win) {
    		win.minimize();	
    	});
    },
    mapWindowLoaded: function(map){
    	if(map.id == '_mapDiv_'){
    		this.coreMap = map;	
    	}else{
    		this.subMap = map;
    	}
    },
    // 추후에 초기 맵 extend 변경 가능하게 만들어 놓음
    coreMapLoaded: function(param){
    	if(param.id == '_mapDiv_'){
    		var centerContainer = Ext.getCmp('center_container');
    		var searchWindow = Ext.create("krf_new.view.search.MapSearchWindow");
    		centerContainer.add(searchWindow);
        	searchWindow.show();
        	Ext.defer(function(){
        		var subMapWindow = Ext.create('krf_new.view.map.SubMapWindow', {id:'subMapWindow', x:centerContainer.getWidth()-460, y:centerContainer.getHeight()-350});
            	centerContainer.add(subMapWindow);
        		subMapWindow.show();
			}, 500);
    	}
    },
    getDesktopApp: function(){
    	return desktopApp;
    },
    getDesktop: function(){
    	return desktopApp.desktop;
    },
    getDesktopWindow: function(id){
    	return desktopApp.desktop.getWindow(id);
    },
    getDesktopModule: function(id){
    	return desktopApp.getModule(id);
    },
    // 지점 목록 창 띄우기
	showSiteListWindow: function(param) {
		if(param == null || param.searchText == null){
			return;
		}
		// 검샋시 다른 더튼값 초기화
		var cmbArea1 = Ext.getCmp("cmbArea1");
		var cmbArea2 = Ext.getCmp("cmbArea2");
		var cmbArea3 = Ext.getCmp("cmbArea3");
		var cmbWater1 = Ext.getCmp("cmbWater1");
		var cmbWater2 = Ext.getCmp("cmbWater2");
		var cmbWater3 = Ext.getCmp("cmbWater3");
		var txtSearch = Ext.getCmp("textSearchText");
		
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");

		if (param.searchText == 'waterSearch') {// 수계검색시 행정구역 초기화
			cmbArea1.setValue("");
			cmbArea2.setValue("");
			cmbArea3.setValue("");
			txtSearch.setValue("");

			textSearchText_Start.setValue("");
			textSearchText_End.setValue("");
		} else if (param.searchText == 'admSearch') {// 행정구역검색시 수계
			// 초기화
			cmbWater1.setValue("");
			cmbWater2.setValue("");
			cmbWater3.setValue("");
			txtSearch.setValue("");
			textSearchText_Start.setValue("");
			textSearchText_End.setValue("");
		} else if (param.searchText == "nameSearch") {// 명칭찾기시 수계 행정구역
			// 초기화
			cmbArea1.setValue("");
			cmbArea2.setValue("");
			cmbArea3.setValue("");
			cmbWater1.setValue("");
			cmbWater2.setValue("");
			cmbWater3.setValue("");
			textSearchText_Start.setValue("");
			textSearchText_End.setValue("");
		} else if(param.searchText == "SEnameSearch"){
			cmbArea1.setValue("");
			cmbArea2.setValue("");
			cmbArea3.setValue("");
			cmbWater1.setValue("");
			cmbWater2.setValue("");
			cmbWater3.setValue("");
			txtSearch.setValue("");
		} else {
		}
		
//		var desktop = this.getDesktop();
//		
//		var siteListModule = this.getDesktopModule($KRF_WINS.KRF.SITE_LIST.id);
//		
//		var siteListWindow = siteListModule.createWindow({x:desktop.getWidth()-400,y:0, width:400});
//		siteListWindow = siteListWindow.show();
//		
//		this.modeWindows.krf.push(siteListWindow);
		
		var siteListWindow = Ext.getCmp("siteListWindow");
		if (siteListWindow == undefined){
			siteListWindow = Ext.create('krf_new.view.east.SiteListWindow',{x:Ext.getCmp('center_container').getWidth() - 520, y:0});
			Ext.getCmp('center_container').add(siteListWindow);
		}	
    	
    	siteListWindow.show();
    	
		var store = null;
		var treeCtl = Ext.getCmp("siteListTree");
		
		if(param.searchType == "krad"){
			store = Ext.create('krf_new.store.east.KradListWindow');
		} else{
			store = Ext.create('krf_new.store.east.SiteListWindow',{
				async:true
			});
		}
		
		if(param.searchText == "paramSearch"){
			store.paramType = searchType;
		}
		store.searchType = param.searchText;
		store.load();
		treeCtl.setStore(store);

		// 좌측 정보창 버튼 on
		SetBtnOnOff("btnSiteListWindow", "on");
	},
	hideSiteListWindow: function(currCtl) {

		var listWinCtl = Ext.getCmp("siteListWindow");

		if (listWinCtl != undefined)
			listWinCtl.close();

		listWinCtl = Ext.getCmp("siteListWindow_reach");

		if (listWinCtl != undefined)
			listWinCtl.close();
		
		// 좌측 정보창 버튼 off
		SetBtnOnOff("btnSiteListWindow", "off");
	},
	WestTabChange: function(tabIdx) {
		var westContents = Ext.getCmp("westContents");
		westContents.setActiveItem(tabIdx);
		
		var searchWin = Ext.getCmp($KRF_WINS.KRF.SEARCH.id);
		
		if(tabIdx == 0){
			searchWin.setTitle('주제도 선택');
		}else{
			searchWin.setTitle('위치검색');
		}
	}
});
