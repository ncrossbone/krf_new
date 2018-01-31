Ext.define('krf_new.view.search.Layer01', {
	
	extend: 'Ext.panel.Panel',
	
	xtype: 'west-Layer01',
	
	id: 'westLayer01', // view.west.WestTabLayerController에서 사용
	
	requires: [
		'krf_new.view.search.Layer01Controller',
		'Ext.slider.*'
	],

	title: 'KRF 레이어',
	header: false,
	
	tabBar: {
        border: false
    },
    
    width: '100%',
    height: '100%',
    
    defaults: {
        textAlign: 'center',
        bodyPadding: 5
    },
	
	items: [{
//		title: '주제도 선택',
		xtype: 'treepanel',
		scroll: false,
		cls: 'khLee-x-tab-header',
		viewConfig: {
			style: { overflow: 'auto', overflowX: 'hidden' }
		},
		store : Ext.create('krf_new.store.west.Layer01Store'),
		controller: 'layer01Controller',
		id: 'layer01', // view.map.DynamicLayerAdmin의 layer.id와 일치시키자..
		rootVisible: false,
		useArrows: true,
		border: 0,
		bufferedRenderer: false,
		height: Ext.getBody().getViewSize().height - 70 // size 조절기능 추가요함.
	}]
});

Ext.on('resize', function(){
	// 레이어 트리 패널 높이 조절 (스크롤)
	var treeCtl = Ext.getCmp('westLayer01').items.items[0];
    if(treeCtl == undefined)
    	return;

    treeCtl.setHeight(Ext.getBody().getViewSize().height - 70);
});