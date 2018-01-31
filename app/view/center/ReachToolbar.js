/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.ReachToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
    	'krf_new.view.center.ReachToolbarController'
    ],
    xtype: 'center-reachtoolbar',

    title: '리치 제어용 툴바',
    
    id: 'reachToolbar',
    
    /* 사이즈 지정 */
    itemWidth: 102,
    itemHeight: 74,
    
    height: 74,
    style: 'padding: 0px;',
    
    controller: 'reachToolbar',
    
    onClickListener: {
        el: {
            click: 'onClickButton'
        }
    },
    
    layout: {
    	type: 'hbox',
    	align: 'middle',
    	pack: 'left'
    },
    
    y: 1,
    
    initComponent: function(){
    
	    this.items = [{
	    	xtype: 'image',
	    	id: 'btnMenu01',
	    	groupId: 'groupSmart',
	    	title: '데이터셋설정',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickSmart' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu01_on.png',
	    	btnOffImg: './resources/images/button/reach_menu01.png',
	    	src: './resources/images/button/reach_menu01.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu04',
	    	groupId: 'startBtn',
	    	title: '시작위치',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickStartReach' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu04_on.png',
	    	btnOffImg: './resources/images/button/reach_menu04.png',
	    	src: './resources/images/button/reach_menu04.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu05',
	    	groupId: 'endBtn',
	    	title: '끝위치',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickEndReach' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu05_on.png',
	    	btnOffImg: './resources/images/button/reach_menu05.png',
	    	src: './resources/images/button/reach_menu05.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu02',
	    	groupId: 'group1',
	    	title: '리치추가',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickAddReach' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu02_on.png',
	    	btnOffImg: './resources/images/button/reach_menu02.png',
	    	src: './resources/images/button/reach_menu02.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu03',
	    	groupId: 'group1',
	    	title: '구간제거',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickRemoveReach' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu03_on.png',
	    	btnOffImg: './resources/images/button/reach_menu03.png',
	    	src: './resources/images/button/reach_menu03.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu06',
	    	groupId: 'group1',
	    	title: '드래그선택',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickDrag' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu06_on.png',
	    	btnOffImg: './resources/images/button/reach_menu06.png',
	    	src: './resources/images/button/reach_menu06.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu07',
	    	groupId: 'group1',
	    	title: '반경선택',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickRadius' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu07_on.png',
	    	btnOffImg: './resources/images/button/reach_menu07.png',
	    	src: './resources/images/button/reach_menu07.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenu08',
	    	groupId: 'group1',
	    	title: '초기화',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickReset' } },
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/reach_menu08_on.png',
	    	btnOffImg: './resources/images/button/reach_menu08.png',
	    	src: './resources/images/button/reach_menu08.png'
	    }/*, '->', {
	    	xtype: 'image',
	    	id: 'btnMenuSave',
	    	groupId: 'groupSave',
	    	title: '설정저장',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickSave' } },
	    	btnOnOff: 'off',
	    	src: './resources/images/button/reach_menu_save.png'
	    }, {
	    	xtype: 'image',
	    	id: 'btnMenuOpen',
	    	groupId: 'groupOpen',
	    	title: '설정불러오기',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: { el: { click: 'onClickOpen' } },
	    	btnOnOff: 'off',
	    	src: './resources/images/button/reach_menu_fileopen.png'
	    }*/];
//	    
//	    var popCtl = Ext.create("krf_new.view.center.SearchConfig", {
//			x: 390,
//			y: 170
//		});
//	    this.up("panel").add(popCtl);
	    this.callParent();
	}
});