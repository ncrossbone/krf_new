/*
 * 행정구역(Administrative District) 검색 페이지
 */
Ext.define('krf_new.view.search.SearchArea_List', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-searchArea-list',
	id: 'searchAreaList',
	layout: {
		type: 'accordion'
	},

	listeners: {
		
		resize: function(){
			// 좌측 패널 스크롤 생성
//			setWestBodyScroll();
		}
	}
});