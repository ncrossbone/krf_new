/** 전역 변수 클래스 (항공영상관련함수)
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("krf_new.global.DroneFn", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	config: {
		globalTest: 0 // 테스트용 변수
	},
	//초기화 버튼
	onClickResetButton: function(){
		Ext.getCmp("droneDetailExp").hide();
		
		var me = Ext.getCmp('_mapDiv_');
		if(me.map == null){
			return;
		}
		//맵 불러오기
		var activeLayer = me.map.getLayer("DynamicLayer3");
		if(activeLayer == undefined || activeLayer == null){
			return;
		}
		activeLayer.setVisibility(false);
		activeLayer = null;
		
		var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
		if(cboDroneArea.lastValue == "R02"){
			activeLayer = me.map.getLayer("DroneFeatureLayer1");
		}else if(cboDroneArea.lastValue == "R01_1"){
			activeLayer = me.map.getLayer("DroneFeatureLayer2");
		}else if(cboDroneArea.lastValue == "R01_2"){
			activeLayer = me.map.getLayer("DroneFeatureLayer3");
		}else if(cboDroneArea.lastValue == "R04"){
			activeLayer = me.map.getLayer("DroneFeatureLayer4");
		}else{
			activeLayer = me.map.getLayer("DroneFeatureLayer5");
		}
		
		if(activeLayer != undefined && activeLayer != null){
			activeLayer.setVisibility(false);
		}
		var me = Ext.getCmp("droneToolbar");
		
		// 수계선택 초기화
		var cboDroneArea = Ext.getCmp("cboDroneArea");
		me.initVComboBox(cboDroneArea);
		
		// 지점목록 초기화
		var cboDroneSiteList = Ext.getCmp("cboDroneSiteList");
		me.initVComboBox(cboDroneSiteList);
		// 항공영상 초기화
		var cboDroneDate = Ext.getCmp("cboDroneDate");
		me.initVComboBox(cboDroneDate);
		
		// 클로로필a 초기화
		var cboDroneChla = Ext.getCmp("cboDroneChla");
		me.initVComboBox(cboDroneChla);
		
		// 조류측정자료 초기화
		var cboDroneWBSite = Ext.getCmp("cboDroneWBSite");
		me.initVComboBox(cboDroneWBSite);
		
		// 피코시아닌 초기화
		var cboDronePhy = Ext.getCmp("cboDronePhy");
		me.initVComboBox(cboDronePhy);
		
		// 레이어선택 초기화
		var cboDroneLayer = Ext.getCmp("cboDroneLayer");
		me.initVComboBox(cboDroneLayer);
		
		//if(Ext.getCmp("btnSearchDrone").btnOnOff == "on"){
		this.LayerVisibility();
		//}
			
		$("#check_cboDroneChla").css('background',"url('./resources/images/drone/icon_check_on.png') 5px 2px no-repeat");
		$("#check_cboDroneChla").css('background-color',"#353f4b"); 

		$("#check_cboDronePhy").css('background',"url('./resources/images/drone/icon_check_off.png') 5px 2px no-repeat");
		$("#check_cboDronePhy").css('background-color',"#353f4b");
	
	},
	LayerVisibility: function(){
		
		var me = $KRF_APP.coreMap;
		
		var meThis = this;
		
		Ext.defer(function(){
			if(me.map == null){
				return;
			}
			//기본레이어
			var activeLayer = me.map.getLayer("DynamicLayer3");
			activeLayer.setVisibility(true);
			//항공영상레이어
			var aciationLayer = me.map.getLayer("AciationLayer");
			aciationLayer.setVisibility(true);
			//클로로필a 레이어
			var Chlorophyll_a = me.map.getLayer("Chlorophyll_a");
			Chlorophyll_a.setVisibility(true);
			//피코시아닌 레이어
			var Phycocyanin = me.map.getLayer("Phycocyanin");
			Phycocyanin.setVisibility(true);
			
			var cboDroneDate = Ext.getCmp("cboDroneDate").down("combo");
			// 2017-09-22 pdj : 항공영상날짜와 항공영상combo store를 비교하여 exp컬럼이 있으면 주의사항 popup 활성화
			cboDroneDate.getStore().each(function(obj){
                if(obj.data.DroneDate == cboDroneDate.rawValue){
                    if(obj.data.Exp != undefined){
                        Ext.getCmp("droneDetailExp").show();
                        Ext.getCmp("expLabelId").setText(obj.data.Exp);
                        var expToolbar = Ext.getCmp("expToolbar");
                        if(expToolbar.expanded == false || expToolbar.collapsed == "right"){
                            expToolbar.expand();
                            expToolbar.updateHeaderPosition("right");
                            expToolbar.header.setHtml("<img src='./resources/images/drone/icon_arrow_up.png' style='padding-left: 6px;/'>");
                            expToolbar.setWidth(448);
                            expToolbar.up("panel").setWidth(528);
                        }       
                    }else{
                        Ext.getCmp("droneDetailExp").hide();
                    }
                }                
            });
			
			var cboDroneArea = Ext.getCmp("cboDroneArea").down("combo");
			var cboDroneChla = Ext.getCmp("cboDroneChla").down("combo");
			var cboDronePhy = Ext.getCmp("cboDronePhy").down("combo");
			var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
			var phyLegend = Ext.getCmp("phyLegend"); // 범례 이미지 컨트롤
			
			var centerCont = Ext.getCmp('center_container');
			var mapWin = $KRF_APP.getDesktopWindow('map-win');
			
			var mapWinX = mapWin.getX();
			var mapWinY = mapWin.getY();
			
			var mapWinWidth = mapWin.getWidth();
			var mapWinHeight = mapWin.getHeight();
			
			if(chlLegend == undefined || chlLegend == null){
				chlLegend = Ext.create('krf_new.view.center.drone.LegendChl',{x:(mapWinX+mapWinWidth)-244, y:(mapWinY+mapWinHeight)-61});
				centerCont.add(chlLegend);
			}
			if(phyLegend == undefined || phyLegend == null){
				phyLegend = Ext.create('krf_new.view.center.drone.LegendPhy',{x:(mapWinX+mapWinWidth)-244, y:(mapWinY+mapWinHeight)-61});
				centerCont.add(phyLegend);
			}
			var layers = [];
			var layersAciation = [];
			var layersChlorophyll_a = [];
			var layersPhycocyanin = [];
			
			var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
			var layerStore = cboDroneLayer.getStore();
			
			var droneOnOff = "";
			var chlOnOff = "";
			var phyOnOff = "";
			var measureOnOff = "";
			var wbSiteOnOff = "";
			
			layerStore.each(function(obj){
				//console.info(obj);
				if(obj.data.layerId == "Drone"){
					droneOnOff = obj.data.layerOnOff;
				}else if(obj.data.layerId == "Chla"){
					chlOnOff = obj.data.layerOnOff;
				}else if(obj.data.layerId == "Phy"){
					phyOnOff = obj.data.layerOnOff;
				}else if(obj.data.id == "reachLine"){
					// 주제도 선택에 리치노드, 리치라인 On/Off
					for(var i = 0; i < obj.data.layerId.length; i++){
						Layer01OnOff(obj.data.layerId[i], obj.data.layerOnOff);
					}
				}else{
					if(cboDroneArea.getValue() != null && cboDroneArea.getValue() != ""){
						if(obj.data.layerOnOff == "on"){
							layers.push(obj.data.layerId);
						}
					}
				}
			});
			
			//항공사진
			if(droneOnOff == "on"){
				if(cboDroneDate.value != null)
					layersAciation.push(cboDroneDate.value);
			}			
			//클로로필
			if(chlOnOff == "on"){
				if(cboDroneChla.value != null){
					chlLegend.show();
					chlLegend.setX((mapWinX+mapWinWidth)-244);
					chlLegend.setY((mapWinY+mapWinHeight)-61);
					//layers.push(cboDroneChla.value);
					layersChlorophyll_a.push(cboDroneChla.value);
					// 클로로필 범례 표시 후 레이어 선택 콤보 펼치기 (focus이동 때문..)
    				Ext.getCmp("cboDroneLayer").down("combo").expand();
				}else{
					chlLegend.hide();
				}
			}else{
				chlLegend.hide();
			}
			
			if(phyOnOff == "on"){
				if(cboDronePhy.value != null){
					phyLegend.show();
					phyLegend.setX((mapWinX+mapWinWidth)-244);
					phyLegend.setY((mapWinY+mapWinHeight)-61);
					//layers.push(cboDroneChla.value);
					layersPhycocyanin.push(cboDronePhy.value);
					// 클로로필 범례 표시 후 레이어 선택 콤보 펼치기 (focus이동 때문..)
    				Ext.getCmp("cboDroneLayer").down("combo").expand();
				}else{
					phyLegend.hide();
				}
			}else{
				phyLegend.hide();
			}
			
			/*if(phyOnOff == "on"){
				if(cboDronePhy.value != null){
					layersPhycocyanin.push(cboDronePhy.value);
				}
				
			}*/
			
			//측정지점
			if(measureOnOff == "on"){
				layers.push("3")
			}
			
			activeLayer.setVisibleLayers([-1]);
			aciationLayer.setVisibleLayers([-1]);
			Chlorophyll_a.setVisibleLayers([-1]);
			Phycocyanin.setVisibleLayers([-1]);
			
			if(layers.length > 0){
				activeLayer.setVisibleLayers(layers);
			}
			if(layersAciation.length > 0){
				aciationLayer.setVisibleLayers(layersAciation);
			}
			if(layersChlorophyll_a.length > 0){
				Chlorophyll_a.setVisibleLayers(layersChlorophyll_a);
			}
			if(layersPhycocyanin.length > 0){
				Phycocyanin.setVisibleLayers(layersPhycocyanin);
			}
		}, 1);
	},
	getLabelRenderer: function(){
		var statesLabel = new esri.symbol.TextSymbol().setColor(new esri.Color([222,0,38]));
        statesLabel.font.setSize("11pt").setWeight(esri.symbol.Font.WEIGHT_BOLD); // WEIGHT_BOLD, WEIGHT_BOLDER, WEIGHT_LIGHTER, WEIGHT_NORMAL
        statesLabel.font.setFamily("굴림").setDecoration("none"); // "underline" | "line-through" | "none"
        statesLabel.xoffset = 0;
        statesLabel.yoffset = -40;
        if(!$KRF_APP.global.CommFn.isIE){
        	statesLabel.font.setWeight(esri.symbol.Font.STYLE_ITALIC); // WEIGHT_BOLD, WEIGHT_BOLDER, WEIGHT_LIGHTER, WEIGHT_NORMAL
        	statesLabel.haloColor = new esri.Color([255,255,255]);
            statesLabel.haloSize = 2;
        }
        return new esri.renderer.SimpleRenderer(statesLabel);
	}
});