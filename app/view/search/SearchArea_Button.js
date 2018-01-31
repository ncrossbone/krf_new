/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea_Button', {
	
	extend: 'Ext.toolbar.Toolbar',
	
	xtype: 'west-searchArea_Button',
	
	id: "searchAreaButton",
	
	title: '검색조건 버튼',
	
	/* 사이즈 지정 */
    itemWidth: 81,
    itemHeight: 107,
    /* 사이즈 지정 끝 */
    
    controller: 'searchArea_ButtonController',
    
    onClickListener: {
        el: {
            click: 'onClickButton'
        }
    },
    
    layout: {
    	type: 'hbox',
    	align: 'center'
    },
    
    initComponent: function(){
		this.items = ['->', {
			xtype: 'image',
	    	id: 'btnWaterSearch',
	    	groupId: 'grpSearchArea',
	    	title: '수계로 찾기',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	btnOnOff: 'on',
	    	btnOnImg: './resources/images/button/search_select01_on.png',
	    	btnOffImg: './resources/images/button/search_select01.png',
	    	src: './resources/images/button/search_select01_on.png'
		}, '-', {
			xtype: 'image',
	    	id: 'btnADMSearch',
	    	groupId: 'grpSearchArea',
	    	title: '행정구역으로 찾기',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/search_select02_on.png',
	    	btnOffImg: './resources/images/button/search_select02.png',
	    	src: './resources/images/button/search_select02.png'
		}, '-', {
			xtype: 'image',
	    	id: 'btnNameSearch',
	    	groupId: 'grpSearchArea',
	    	title: '명칭으로 찾기',
	    	width: this.itemWidth,
	    	height: this.itemHeight,
	    	listeners: this.onClickListener,
	    	btnOnOff: 'off',
	    	btnOnImg: './resources/images/button/search_select03_on.png',
	    	btnOffImg: './resources/images/button/search_select03.png',
	    	src: './resources/images/button/search_select03.png'
		}, '->'];
		
		this.callParent();
    }

});