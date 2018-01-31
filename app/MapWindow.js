/*!
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.MapWindow', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
    	'krf_new.view.center.Center',
    	'krf_new.view.search.ButtonPanel',
    ],

    subWindowIds:['popSiteInfo','reachNameToolbar','subMapWindow', 'siteListWindow', 'searchResultWindow','chlLegend','phyLegend','droneToolbar','droneDetailExp'],
    id:'map-win',
    init : function(){
        this.launcher = {
            text: 'KRF',
            iconCls:'icon-grid'
        };
        
        // 리치 툴바 on/off
        $KRF_APP.addListener($KRF_EVENT.SHOW_REACH_TOOLBAR, this.showReachToolbar, this);
        $KRF_APP.addListener($KRF_EVENT.HIDE_REACH_TOOLBAR, this.hideReachToolbar, this);
        
        // drone 툴바 on/off
        $KRF_APP.addListener($KRF_EVENT.SHOW_DRONE_TOOLBAR, this.showDroneToolbar, this);
        $KRF_APP.addListener($KRF_EVENT.HIDE_DRONE_TOOLBAR, this.hideDroneToolbar, this);
        
        // Map 툴팁 위치 조정
        $KRF_APP.addListener($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION, setTooltipXY, this);
    },

    createWindow : function(config){
        var me = this;
        
    	var desktop = this.app.getDesktop();
        var win = desktop.getWindow('map-win');
        var cfg = Ext.applyIf(config || {}, {
            id: 'map-win',
            title:'KRF',
            width:840,
            height:680,
            iconCls: 'icon-grid',
            animCollapse:false,
            layout: 'border',
            constrain: true,
    		constrainHeader:false,
    		tools:
    	         [{
    	     		xtype: 'image',
    	    		//id: 'btnReachLayer',
    	    		layerId: 'baseMap',
    	    		groupId: 'grpBase',
    	        	title: '배경맵',
    	            style:'cursor:pointer;',
    	        	width: 32,
    	        	height: 32,
    	        	listeners: { el: { click: function(obj, el, evt){
    	            	// 버튼 On/Off
    	        		var currCtl = SetBtnOnOff(el.id);
    	        		if(currCtl.btnOnOff == "on"){
    	        			$KRP_APP.coreMap.baseMap.setVisibility(true);
    	        		} else{
    	        			$KRP_APP.coreMap.baseMap.setVisibility(false);
    	        		}
    	            } } },
    	        	btnOnOff: 'on',
    	        	btnOnImg: './resources/images/button/btn_top_05_on.png',
    	        	btnOffImg: './resources/images/button/btn_top_05_off.png',
    	        	src: './resources/images/button/btn_top_05_on.png'
    	        }, {
    	        	xtype: 'container',
    	        	width: 5
    	        }, { 
    	    		xtype: 'image',
    	    		id: 'btnReachLayer',
    	    		layerId: '55',
    	    		groupId: 'grpReach',
    	        	title: '리치라인',
    	            style:'cursor:pointer;',
    	        	width: 32,
    	        	height: 32,
    	        	listeners: { el: { click: function(obj, el, evt){
    	        		$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);	
    	        	} } },
    	        	btnOnOff: 'on',
    	        	btnOnImg: './resources/images/button/btn_top_01_on.png',
    	        	btnOffImg: './resources/images/button/btn_top_01_off.png',
    	        	src: './resources/images/button/btn_top_01_on.png'
    	        }, {
    	        	xtype: 'container',
    	        	width: 5
    	        }, { 
    	    		xtype: 'image',
    	    		id: 'btnAreaLayer',
    	    		groupId: 'grpArea',
    	        	title: '집수구역',
    	            style:'cursor:pointer;',
    	            hidden:true,
    	        	width: 32,
    	        	height: 32,
    	        	listeners: { el: { click:  function(obj, el, evt){
    	        		$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);
    	        	} } },
    	        	btnOnOff: 'off',
    	        	btnOnImg: './resources/images/button/btn_top_02_on.png',
    	        	btnOffImg: './resources/images/button/btn_top_02_off.png',
    	        	src: './resources/images/button/btn_top_02_off.png'
    	        }, { 
    	    		xtype: 'image',
    	    		id: 'btnFlowLayer',
    	    		groupId: 'grpFlow',
    	        	title: '리치흐름',
    	        	width: 32,
    	        	height: 32,
    	            style:'cursor:pointer;',
    	        	listeners: { el: { click: function(obj, el, evt){
    	        		$KRF_APP.getDesktopModule($KRF_WINS.KRF.MAP.id).searchNodeId(el.id);
    	        	} } },
    	        	btnOnOff: 'on',
    	        	btnOnImg: './resources/images/button/btn_top_04_on.png',
    	        	btnOffImg: './resources/images/button/btn_top_04_off.png',
    	        	src: './resources/images/button/btn_top_04_on.png'
    	        }, {
    	        	xtype: 'container',
    	        	width: 5
    	        }, { 
    	    		xtype: 'image',
    	    		id: 'btnLayerReset',
    	    		groupId: 'grpReset',
    	        	title: '초기화',
    	            style:'cursor:pointer;',
    	        	width: 32,
    	        	height: 32,
    	        	listeners: { el: { click: function(obj, el, evt){
    	        		ResetButtonClick();
    	        	} } },
    	        	btnOnOff: 'off',
    	        	btnOnImg: './resources/images/button/btn_top_03_on.png',
    	        	btnOffImg: './resources/images/button/btn_top_03_off.png',
    	        	src: './resources/images/button/btn_top_03_off.png'
    	        }, {
    	        	xtype: 'container',
    	        	width: 50
    	        }, {
    	    		xtype: 'image',
    	        	title: '공지사항',
    	        	width: 69,
    	        	height: 37,
    	            style:'cursor:pointer;',
    	        	listeners: {
    	        		el: {
    	        			click: function(){
    	        				var boardCtl = Ext.getCmp("boardNotice");
    	        				if(boardCtl == undefined){
    	    	    				boardCtl = Ext.create("Ext.window.Window", {
    	    				    					id: "boardNotice",
    	    				    					title: "공지사항",
    	                                            width: 670,
    	                                            height: 580,
    	                                            html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=2"></iframe>',
    	                                            cls: 'khLee-window-panel-header khLee-x-window-default khLee-x-grid-locked ',
    	                                            style:"border:solid 10px #E6E6E6;",
    	                                            closable: false,
    	                                            constrain: true,
    	                                            header:{
    	                                                items:[{
    	                                                    xtype:'image',
    	                                                    src:'./resources/images/button/btn_close.png',
    	                                                    style:'padding-right:13px !important; cursor:pointer;',
    	                                                    listeners:{
    	                                                        el:{
    	                                                            click:function(){
    	                                                                Ext.getCmp("boardNotice").close();
    	                                                            }
    	                                                        }
    	                                                    }
    	                                                }]
    	                                            }
    	    				    				});
    	        				}
    	        				boardCtl.show();
    	        			}
    	        		}
    	        	},
    	        	src: './resources/images/button/top_btn4_off.png'			
    	    	},{
    	    		xtype: 'image',
    	        	title: '저장',
    	            style:'cursor:pointer;',
    	        	width: 69,
    	        	height: 37,
    	        	listeners: {
    	        		el: {
    	        			click: function(){
    	        				setActionInfo("" , "" , "" , "" , "화면저장");
    	        				$KRP_APP.coreMap.capture();
    	        			}
    	        		}
    	        	},
    	        	src: './resources/images/button/top_btn2_off.png'
    	    	}, {
    	    		xtype: 'image',
    	        	title: '매뉴얼',
    	        	width: 69,
    	        	height: 37,
    	            style:'cursor:pointer;',
    	        	listeners: {
    	        		el: {
    	        			click: function(){
    	        				OpenMenualPop();
    	        			}
    	        		}
    	        	},
    	        	src: './resources/images/button/top_btn6_off.png'
    	    	}],
    		listeners: {
    		    move: function(theWin,xP,yP,theOp) {
    		    	$KRF_APP.fireEvent($KRF_EVENT.SET_MAP_TOOLTIP_LOCATION);
    		    	me.setSubWindowLocation(xP, yP);
    		    },
    		    resize: function(win, width, height){
    		    	var mapC = Ext.getCmp('_mapDiv_');
            		mapC.setWidth(width-80);
            		mapC.setHeight(height-37);
            		mapC = Ext.getCmp('center_container');
            		mapC.setWidth(width-80);
            		mapC.setHeight(height-37);
            		mapC = Ext.getCmp('cont_container');
            		mapC.setWidth(width-80);
            		mapC.setHeight(height-37);
            		me.setSubWindowLocation();
    		    },
    		    render: function(){
    		    },
    		    afterrender: function(){
    		    },
    		    show: function(){
    		    	$KRF_APP.coreMap.mapRendered();
    		    },
    		    'beforeclose': function(){
    		    	console.log('beforeclose');
    		    }
    		},
            items: [ {xtype:'west-buttonpanel', region:'west', collapsible:false},
            	     {xtype: 'container',
	            		id: 'cont_container',
	            		layout: {
	            			type: 'absolute'
	            		},
	            		region:'center',
	            		height: '100%',
	            		items: [{xtype:'app-default-center', id: 'center_container', x:0, y:0}]
	            	}]
        });
        
        if(!win){
            win = desktop.createWindow(cfg);
        }
        return win;
    },
    setSubWindowLocation :function(){
    	var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var rToolbar = Ext.getCmp("reachToolbar");
		
		if(rToolbar != null && !rToolbar.hidden){
			var popCtl = Ext.getCmp("searchConfig");
			var popHeader = Ext.getCmp("searchConfigHeader");

			rNameToolbar.hide();
			Ext.defer(function(){
				rNameToolbar.setX(rToolbar.getX()+(100));
				rNameToolbar.setY(rToolbar.getY()+(73));
				rNameToolbar.show();
				
				if(popCtl != null && !popCtl.isHidden()){
					popCtl.setX(rToolbar.getX());
					popHeader.setX(rToolbar.getX());
					popCtl.setY(rToolbar.getY()+103);
					popHeader.setY(rToolbar.getY()+73);
				}
			}, 1);
		}
		
		var chlLegend = Ext.getCmp("chlLegend"); // 범례 이미지 컨트롤
		var phyLegend = Ext.getCmp("phyLegend"); // 범례 이미지 컨트롤
		
		var mapWin = $KRF_APP.getDesktopWindow('map-win');
		var mapWinX = mapWin.getX();
		var mapWinY = mapWin.getY();
		var mapWinWidth = mapWin.getWidth();
		var mapWinHeight = mapWin.getHeight();
		
		var legendX = (mapWinWidth+mapWinX)-244;
		var legendY = (mapWinHeight+mapWinY)-61;
		Ext.defer(function(){
			if(chlLegend != null && !chlLegend.isHidden()){
				chlLegend.show();
				chlLegend.setX(legendX);
				chlLegend.setY(legendY);
			}
			if(phyLegend != null && !phyLegend.isHidden()){
				phyLegend.show();
				phyLegend.setX(legendX);
				phyLegend.setY(legendY);
			}	
		}, 1);
    },
    showReachToolbar: function() {
    	var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var rToolbar = Ext.getCmp("reachToolbar");
		var sConfig = Ext.getCmp("searchConfig");
		var cContainer = Ext.getCmp("center_container");
		
		if (rToolbar == undefined) {
			rToolbar = Ext.create('krf_new.view.center.ReachToolbar',{
								id : 'reachToolbar',
								cls : 'khLee-x-reachtoolbar khLee-x-reachtollbar-default khLee-x-box-target',
								style:'z-index: 30000; position: absolute; padding: 0px 0 0px 0px !important;'
							});
			cContainer.add(rToolbar);
		}
		rToolbar.show();
		
		if(rNameToolbar == undefined){
			rNameToolbar = Ext.create('krf_new.view.center.ReachNameToolbar', { });
			cContainer.add(rNameToolbar);
		}
		
		rNameToolbar.show();
		
		rNameToolbar.setX(rToolbar.getX()+(100));
		rNameToolbar.setY(rToolbar.getY()+(73));
		
		if(sConfig == undefined){
			sConfig = Ext.create("krf_new.view.center.SearchConfig");
			cContainer.add(sConfig);
		}
	},
	hideReachToolbar: function() {
		var cContainer = Ext.getCmp("center_container");
		var rToolbar = Ext.getCmp("reachToolbar");
		var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var sConfig = Ext.getCmp("searchConfig");
		var kConfig = Ext.getCmp("kradSchConf");
		
		var droneToolbar = Ext.getCmp("droneToolbar");
		
		if(droneToolbar.getY()==115){
			droneToolbar.setY(droneToolbar.getY() - 105);
		}
		
//		cContainer.remove(rToolbar, false);
		if(rToolbar != undefined && rToolbar != null){
			rToolbar.hide();
		}
		if(rNameToolbar != undefined && rNameToolbar != null)
			rNameToolbar.close();
		if(sConfig != undefined && sConfig != null)
			sConfig.close();
		if(kConfig != undefined && kConfig != null)
			kConfig.hide();
	},
	showDroneToolbar: function() {
		var droneToolbar = Ext.getCmp("droneToolbar");
		var droneDetailExp = Ext.getCmp("droneDetailExp");
		
		if(droneToolbar != null){
			droneToolbar.show();
		}
		if(droneDetailExp != null){
			rNamdroneDetailExpeToolbar.show();
		}
	},
	hideDroneToolbar: function() {
		var cContainer = Ext.getCmp("center_container");
		var rToolbar = Ext.getCmp("reachToolbar");
		var rNameToolbar = Ext.getCmp("reachNameToolbar");
		var sConfig = Ext.getCmp("searchConfig");
		var kConfig = Ext.getCmp("kradSchConf");
		
		var droneToolbar = Ext.getCmp("droneToolbar");
		if(droneToolbar.getY()==202){
			droneToolbar.setY(droneToolbar.getY() - 105);
		}
		
		cContainer.remove(rToolbar, false);
		if(rNameToolbar != undefined && rNameToolbar != null)
			rNameToolbar.close();
		if(sConfig != undefined && sConfig != null)
			sConfig.close();
		if(kConfig != undefined && kConfig != null)
			kConfig.hide();
			
	},
	searchNodeId: function(btn){
		
		var layerObj = Ext.getCmp("layer01");
		var nodeObj = "";
		var lyrId = "";
		
		switch (btn) {
		case "btnReachLayer": lyrId = "RCH_DID"; break;
		case "btnAreaLayer": lyrId = "CAT_DID"; break;
		case "btnFlowLayer": lyrId = "RCH_FLW"; break;
		default: break;
		}
		
		for(var i = 0; i<layerObj.store.data.items.length; i++){
			if(layerObj.store.data.items[i].data.siteIdCol==lyrId){
				nodeObj = layerObj.store.data.items[i];
			}
		}
		
		var isChecked = nodeObj.get('checked');
		
		nodeObj.set('checked', !isChecked);
		layerObj.fireEvent('checkchange',nodeObj, !isChecked);
		
		this.northLink(nodeObj);
		
	},
	northLink: function(node){
		if(node.data.siteIdCol!=undefined){
			if(node.data.siteIdCol=="RCH_DID"){
				SetBtnOnOff("btnReachLayer");
			}else if(node.data.siteIdCol=="CAT_DID"){
				SetBtnOnOff("btnAreaLayer");
			}else if(node.data.siteIdCol=="RCH_FLW"){
				SetBtnOnOff("btnFlowLayer");
			}
		}
	},
	release: function(){
		var me = this;
		
		for(var i=0; i<me.subWindowIds.length; i++){
			var targetWindow = Ext.getCmp(me.subWindowIds[i]);
			if(targetWindow != null){
				targetWindow.close();
			}
		}
	}
});

