/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.ReachNameToolbar', {
	extend: 'Ext.window.Window',
    
    xtype: 'center-reachnametoolbar',

    title: '리치 이름 제어용 툴바',
    
    id: 'reachNameToolbar',
    
    header: false,
    shadow: false,
    
    /* 사이즈 지정 */
    itemWidth: 102,
    itemHeight: 18,
    //alwaysOnTop: true , // 가장 상위에 있기 위한 함수
    plain: true, // 요게 있어야 background: transparent 먹음..
    style: 'border-style: none !important; background: transparent none !important; border-width: 2px !important;',
    cls: 'dj_toolbarNm dj_spottextfield2',
    width: 300,
    height: 22,
    /* 사이즈 지정 끝 */
    floating: true,
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    initComponent: function(){
	    this.items = [{
	    	xtype: 'textfield',
	    	cls: 'dj_stoptextfield',
	    	width: this.itemWidth,
	    	height: this.itemHeight
	    	
	    }, {
	    	xtype: 'textfield',
	    	cls: 'dj_etoptextfield',
	    	width: this.itemWidth,
	    	height: this.itemHeight
	    },{
	    	xtype:"image",
	    	id:"reach_close",
	    	hidden:true,
	    	src:"./resources/images/button/btn_close2.png",
	    	listeners:{
	    		el:{
	    			click: function(){
	    				SetBtnOnOff($KRF_APP.coreMap._krad.btnId,"off");
	    				initKradEvt();
	    				ResetButtonClick();
	    				Ext.getCmp("reach_close").setVisible(false);
	    			}
	    		}
	    	}
	    }];
	    this.callParent();
	}
});