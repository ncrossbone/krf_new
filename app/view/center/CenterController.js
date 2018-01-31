Ext.define('krf_new.view.center.CenterController', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.center',
	
	// 일반모드 버튼 클릭
	onClickNormalMode: function(obj, el, evt){
		
		var me = $KRF_APP.coreMap;
		
		// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		if(currCtl.btnOnOff == "off")
			SetBtnOnOff(el.id);
		var btn = Ext.getCmp("btnModeNomal");
		Ext.SetSrc(btn); // 이미지 셋팅
		
		var btn = SetBtnOnOff("btnModeNormal_center");
		if(btn.btnOnOff == "off")
			SetBtnOnOff("btnModeNormal_center");
		
		/* 전체 레이어 끄기 */
    	var activeLayer = me.map.getLayer("DynamicLayerAdmin_ReachTest");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(false);
    	
    	activeLayer = me.map.getLayer("ReachLayerAdminBackground");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(false);
    	
    	/* 전체 레이어 끄기 끝 */
    	
    	var me = $KRF_APP.coreMap;
		me.map.graphics.clear();
    	$KRF_APP.fireEvent('drawEnd');
    	
		Ext.HideReachToolbar(evtArgs, el);
	},
	
	// 리치모드 버튼 클릭
	onClickReachMode: function(obj, el, evt){
		
		var me = $KRF_APP.coreMap;
		
		/* 리치 레이어 켜기 */
    	if(me.map.getLevel() < 11){
    		alert("리치모드는 11레벨 이상이어야 합니다.");
    		return;
    	}
    	
    	// 버튼 On/Off
		var currCtl = SetBtnOnOff(el.id);
		if(currCtl.btnOnOff == "off")
			SetBtnOnOff(el.id);
		var btn = Ext.getCmp("btnModeReach");
		Ext.SetSrc(btn); // 이미지 셋팅
    	
    	// Dim 처리 서비스 레이어
    	var activeLayer = me.map.getLayer("ReachLayerAdminBackground");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(true);
    	
    	// 시뮬레이션용 서비스 레이어
    	activeLayer = me.map.getLayer("DynamicLayerAdmin_ReachTest");
    	if(activeLayer != undefined)
    		activeLayer.setVisibility(true);
    	
    	var me = $KRF_APP.coreMap;
		me.map.graphics.clear();
    	$KRF_APP.fireEvent('drawEnd');
    	
		Ext.ShowReachToolbar(evtArgs, el);
	}
	
});
