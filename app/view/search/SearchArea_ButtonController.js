Ext.define('krf_new.view.search.SearchArea_ButtonController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_ButtonController',

	onClickButton: function(evtArgs, el) {
		var currCtl = Ext.getCmp(el.id);
		
		// 이미지 셋팅
		var currCtl = SetBtnOnOff(el.id, "on");
		
		var westContents = Ext.getCmp("searchAreaContents");
		
		// 수계로 찾기
		if(el.id == "btnWaterSearch"){
			westContents.setActiveItem(0);
		}
		
		// 행정구역으로 찾기
		if(el.id == "btnADMSearch"){
			westContents.setActiveItem(1);
		}
		
		// 명칭으로 찾기
		if(el.id == "btnNameSearch"){
			var btnNomal = Ext.getCmp("btnModeNomal");
			if(btnNomal.btnOnOff == "on")
				westContents.setActiveItem(2);
			
			var btnReach = Ext.getCmp("btnModeReach");
			if(btnReach.btnOnOff == "on")
				westContents.setActiveItem(3);
		}
	}
});
