Ext.define('krf_new.view.north.North', {
	
	xtype: 'app-default-north',
	
	extend: 'Ext.panel.Panel',
	//extend: 'Ext.toolbar.Toolbar',
	
	requires: [
	    'krf_new.view.north.NorthController'
   ],
	
	controller: 'north',
	
	height: 64,
	
	cls: 'khLee-box-inner',
	//style: 'background-image:url(./resources/images/button/top_bg.png) !important;',
	
	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'left'
	},
	
	items: [{
    	xtype: 'container',
    	width: 10
    }, {
		xtype: 'image',
		id: 'top-logo-khLee',
		width: 290,
		height: 37,
		//cls: 'khLee-x-box-item',
		src: './resources/images/button/top_logo.png'
	}, {
		xtype: 'container',
		flex: 1
	}, {
		xtype: 'image',
		//id: 'btnReachLayer',
		layerId: 'baseMap',
		groupId: 'grpBase',
    	title: '배경맵',
        style:'cursor:pointer;',
    	width: 32,
    	height: 32,
    	listeners: { el: { click: 'onClickBaseLayer' } },
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
    	listeners: { el: { click: 'onClickReachLayer' } },
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
    	listeners: { el: { click: 'onClickAreaLayer' } },
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
    	listeners: { el: { click: 'onClickFlowLayer' } },
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
    	listeners: { el: { click: 'onClickReset' } },
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
	},/*{
		//----확인 후 제거-----
	xtype: 'image',
	title: '공지사항',
	width: 69,
	height: 37,
	listeners: {
		el: {
			click: function(){
				
				var boardCtl = Ext.getCmp("boardCLIP");
				if(boardCtl == undefined){
    				boardCtl = Ext.create("Ext.window.Window", {
			    					id: "boardCLIP",
			    					title: "공지사항",
			    					width: 660,
			    					height: 600,
			    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./ClipReport4/test.jsp?boardType=2"></iframe>'
			    				});
				}
				
				boardCtl.show();
				
			}
		}
	},
	src: './resources/images/button/top_btn4_off.png'			
}, *//*{
		xtype: 'image',
    	title: 'Q&A',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				
    				var boardCtl = Ext.getCmp("boardQNA");
    				if(boardCtl == undefined){
	    				boardCtl = Ext.create("Ext.window.Window", {
				    					id: "boardQNA",
				    					title: "Q&A",
				    					width: 660,
				    					height: 600,
				    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0" src="./resources/jsp/board/GetBoard.jsp?boardType=1"></iframe>'
				    				});
    				}
    				
    				boardCtl.show();
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn5_off.png'			
	},*//*, {
		xtype: 'image',
    	title: '인쇄',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				GetCoreMap().print();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn1_off.png'			
	},*/{
		xtype: 'image',
    	title: '저장',
        style:'cursor:pointer;',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				setActionInfo("" , "" , "" , "" , "화면저장");
    				GetCoreMap().capture();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn2_off.png'
	}, /*{
		xtype: 'image',
    	title: '로그아웃',
    	width: 69,
    	height: 37,
    	listeners: {
    		el: {
    			click: function(){
    				Ext.Ajax.request({
						//session out-hyeok
						url : "./resources/jsp/SessionOut.jsp",
						async:true,						
						method : "GET",
						success : function(result, request) {
							window.location = './index.html';
						},
						failure : function(result, request) {
							Ext.Msg.alert("Failed", "Connection Failed");
						}

					});
    				
    				
    				
    			}
    		}
    	},
    	src: './resources/images/button/top_btn3_off.png'
	},*/ {
		xtype: 'image',
    	title: '매뉴얼',
    	width: 69,
    	height: 37,
        style:'cursor:pointer;',
    	listeners: {
    		el: {
    			click: function(){
    				/*
    				Ext.create("Ext.window.Window", {
    					title: 'test',
    					width: 300,
    					height: 300,
    					html: '<iframe style="overflow:auto;width:100%;height:100%;" frameborder="0"  src="./resources/menual/KRF_Menual.html"></iframe>'
    				}).show();
    				*/
    				OpenMenualPop();
    			}
    		}
    	},
    	src: './resources/images/button/top_btn6_off.png'
	}, {
		xtype: 'container',
		width: 50
	}]
  
});