/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.drone.DroneToolbar', {
	extend: 'Ext.panel.Panel',
	requires: [
    	'krf_new.view.center.drone.VComboBoxController'
    ],
    xtype: 'center-dronetoolbar',
    
    id: "droneToolbar",
    
    headerPosition: 'left',
    controller: 'VComboBoxController',
    
    header: {
    	html: "<img src='./resources/images/drone/title.png' />",
		width: 65,
		height: 80,
    	style: "z-index:50000 !important; padding: 0 !important; background-color: transparent;" // 백그라운드 투명
    },
    
    bodyStyle: "z-index:50000 !important; padding: 0 !important; background-color: transparent;", // 백그라운드 투명
    
    draggable: true,
    height: 82,
    
    layout: {
    	type: "hbox"
    },
    
    items: [{
    	xtype: 'panel',
    	id: "toolbarCont",
    	header: {
        	html: "<img src='./resources/images/drone/btn_arrow_close2.png' />",
        	listeners: {
        		el: {
        			click: function(){
        				var toolbarCont = Ext.getCmp("toolbarCont");
        				if(toolbarCont.expanded == false || toolbarCont.collapsed == "right"){
        					toolbarCont.expand();
        					toolbarCont.updateHeaderPosition("right");
        					toolbarCont.header.setHtml("<img src='./resources/images/drone/btn_arrow_close2.png' />");
        					toolbarCont.setWidth(895);
        					toolbarCont.up("panel").setWidth(1003);
        				}else{
        					toolbarCont.collapse();
        					toolbarCont.updateHeaderPosition("left");
        					toolbarCont.header.setHtml("<img src='./resources/images/drone/btn_arrow_open2.png' />");
        					toolbarCont.setWidth(14);
        					toolbarCont.up("panel").setWidth(79);
        				}
        			}
        		}
        	},
    		width: 14,
        	style: "padding: 0 !important; background-color: transparent; cursor: pointer;"
        },
        /* 헤더 셋팅 Open, Close 버튼 끝 */
        bodyStyle: "padding: 0 !important;" +
        		"background-color: transparent;" + // 백그라운드 투명
        		"background: url(./resources/images/drone/drone_bg.png) 65px 4px repeat-x !important;", // 백그라운드 이미지
    	layout: {
    		type: "hbox"
    	},
    	headerPosition: 'right',
    	expanded:true,
    	width: 895,
    	height:80,
    	items: [{
    		xtype: "container",
    		width: 5
    	}, { // 수계선택
        	xtype: "drone-vcombo",
        	id: "cboDroneArea", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_01.png', // 라벨
        	labelText:'수계선택',
        	width:100,
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "area",
        	fields: ["areaName", "areaValue"],
        	displayField: "areaName",
        	valueField: "areaValue",
        	onChange: "onAreaChange",
            onItemClick: "onItemClickEmpty",
            labelCss:"color:#00fbff; font-weight:bold; background-color: #353f4b; padding: 3px 7px;"
        }, {
    		xtype: "container",
    		width: 5
    	}, { // 지점목록
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_06.png',
        	labelText:'지점목록',
            width:120,
        	id: "cboDroneSiteList", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	fields: ["layerCd", "layerNm","level","tmX","tmY"],
        	displayField: "layerNm",
        	valueField: "layerCd",
        	onChange: "onBoChange",
            onItemClick: "onItemClickEmpty",
            labelCss:"color:#00fbff; font-weight:bold; background-color: #353f4b; padding: 3px 7px;"
        }, {
    		xtype: "container",
    		width: 5
    	}, { // 항공영상
        	xtype: "drone-vcombo",
        	id: "cboDroneDate", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_02.png',
        	labelText:'항공영상',
            width:110,
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "",
        	fields: ["DroneLayerId", "DroneDate"],
        	displayField: "DroneDate",
        	valueField: "DroneLayerId",
        	onChange: "onDroneDateChange",
        	onItemClick: "onItemClickEmpty",
        	labelCss:"cursor:pointer; color:#00fbff; font-weight:bold; background:url('./resources/images/drone/icon_check_on.png') 5px 2px no-repeat; background-color: #353f4b; padding: 3px 23px;"
        }, {
    		xtype: "container",
    		width: 5
    	}, { // 클로로필a
        	xtype: "drone-vcombo",
        	id: "cboDroneChla", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_03.png',
        	labelText:'클로로필-a',
        	width:110,
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "",
        	fields: ["ChlaLayerId", "ChlaDate"],
        	displayField: "ChlaDate",
        	valueField: "ChlaLayerId",
        	onChange: "onDroneChlaChange",
        	onItemClick: "onItemClickEmpty",
        	labelCss:"cursor:pointer; color:#00fbff; font-weight:bold; background:url('./resources/images/drone/icon_check_on.png') 5px 2px no-repeat; background-color: #353f4b; padding: 3px 23px;"
        }, {
    		xtype: "container",
    		width: 5
    	}, { // 피코시아닌
        	xtype: "drone-vcombo",
        	id: "cboDronePhy", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_07.png',
        	labelText:'피코시아닌',
        	width:120,
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "",
        	fields: ["PhyLayerId", "PhyDate"],
        	displayField: "PhyDate",
        	valueField: "PhyLayerId",
        	onChange: "onDronePhyChange",
        	onItemClick: "onItemClickEmpty",
        	labelCss:"cursor:pointer; color:#00fbff; font-weight:bold; background:url('./resources/images/drone/icon_check_off.png') 5px 2px no-repeat; background-color: #353f4b; padding: 3px 23px;"
        }, {
    		xtype: "container",
    		width: 5
    	}, { // 조류측정자료
        	xtype: "drone-vcombo",
        	id: "cboDroneWBSite", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	labelSrc: './resources/images/drone/label_04.png',
        	labelText:'조류측정자료',
        	width:125,
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "",
        	fields: ["MeasureDate"],
        	displayField: "MeasureDate",
        	valueField: "MeasureDate",
        	onChange: "onDroneWBSiteChange",
        	onItemClick: "onItemClickEmpty",
        	labelCss:"color:#00fbff; font-weight:bold; background-color: #353f4b; padding: 3px 7px;"
        }, {
    		xtype: "container",
    		width: 5
    	}, { // 레이어선택
        	xtype: "drone-vcombo",
        	labelSrc: './resources/images/drone/label_05.png',
        	labelText:'레이어선택',
        	width:125,
        	id: "cboDroneLayer", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
        	jsonUrl: "./resources/data/drone/LayerMapper.json",
        	dataRoot: "layer",
        	fields: ["layerId", "layerName", "image1"],
        	displayField: "layerName",
        	valueField: "layerId",
        	onChange: "onComboChangeEmpty",
        	onItemClick: "onDroneLayerClick",
        	expanded: true,
        	noCollapse: true, // 콤보 리스트가 닫히지 않게 한다.
        	labelCss:"color:#00fbff; font-weight:bold; background-color: #353f4b; padding: 3px 7px;"
        }, {
    		xtype: "container",
    		width: 15
    	}, {
        	xtype: 'image',
        	title: '초기화',
        	width: 23,
        	height:80,
        	src: './resources/images/drone/btn_reset.png',
        	style: "cursor: pointer;",
        	listeners: {
        		el: {
        			click: "onClickResetButton"
        		}
        	}
        }]
    }],
    
    initComponent: function(){
    	this.callParent();
    	var totWidth = 0;
    	Ext.each(this.items.items, function(){
    		totWidth += this.width;
    	});
    	totWidth += this.header.width;
    	this.width = totWidth;
	},
    
    // VComboBox 초기화
    initVComboBox: function(comboCtl){
    	var x = 0;
		var y = 14;
    	comboCtl.removeAll();
    	comboCtl.x = x;
    	comboCtl.y = y;
    	comboCtl.initComponent();
    }
});