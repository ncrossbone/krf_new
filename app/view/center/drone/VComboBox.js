/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.drone.VComboBox', {
	extend: 'Ext.container.Container',
	requires: [
    	'krf_new.view.center.drone.VComboBoxController'
    ],
    xtype: 'drone-vcombo',
    
    id: "cboVCombo", // 컨트롤 생성되는 시점에 id 꼭 지정할 것.
    
    layout: {
		type: "absolute"
	},
	
	controller: "VComboBoxController",
	
	x: 0,
	y: 14,
	
	labelSrc: '',
	labelHeight: 24,
	
	width: 123,
	
	comboHeight: 24,
	
	jsonUrl: "",
	dataRoot: "",
	fields: [],
	valueField: "",
	displayField: "",
	onChange: "",
	onItemClick: "",
	noCollapse: false, // 콤보 리스트를 닫히지 않게하려면 true
	expanded: false, // 펼쳐진 상태 true
	
	initComponent: function(){
		var me = this;
		var comboStore = me.getComboStore();
		this.items = [{
	    	xtype: 'container',
	    	x: me.x,
	    	y: me.y,
	    	width: me.width,
	    	layout: {
	    		type: "vbox"
	    	},
	    	items: [{
	    		xtype: "label",
	    		text: me.labelText,
	    		width: "100%",
	    		height: me.labelHeight,
	    		style:me.labelCss,
	    		id:"check_" + me.id,
	    		listeners:{
	    			el:{
	    				click:function(doc){
	    					if(doc.target.id=="check_cboDroneDate"||doc.target.id=="check_cboDroneChla"||doc.target.id=="check_cboDronePhy"){
	    						var imageUrl = "url('./resources/images/drone/icon_check_off.png') 5px 2px no-repeat";
	    						if(doc.target.style.background.split('check_')[1].split('.')[0]=="off"){
	    							//클로로필, 피코시아닌 toggle
	    							if(doc.target.id=="check_cboDroneChla"){
	    								$("#check_cboDronePhy").css('background',imageUrl);
	    								$("#check_cboDronePhy").css('background-color',"#353f4b");
	    							}else if(doc.target.id=="check_cboDronePhy"){
	    								$("#check_cboDroneChla").css('background',imageUrl);
	    								$("#check_cboDroneChla").css('background-color',"#353f4b");
	    							}
	    							imageUrl="url('./resources/images/drone/icon_check_on.png') 5px 2px no-repeat";
	    						}

	    						$("#" + doc.target.id).css('background',imageUrl);
	    						$("#" + doc.target.id).css('background-color',"#353f4b");

	    						var cmp = Ext.ComponentQuery.query('#cboDroneDate')[0];
	    						var store = Ext.getCmp("cboDroneLayer").down("combo").getStore();

	    						var storeId = "";
	    						switch (doc.target.id) {
		    						case "check_cboDroneChla": storeId ="droneChla"; break;
		    						case "check_cboDronePhy": storeId ="dronePhy"; break;
		    						case "check_cboDroneDate": storeId ="dronePhoto"; break;
		    						default: break;
	    						}
	    						var idx = Ext.getCmp("cboDroneLayer").down("combo").getStore().data.items.map(function(a){ return a.id }).indexOf(storeId);
	    						cmp.getController('VComboBoxController').onDroneLayerClick(null,store.data.items[idx],null,idx,null);
	    					}
	    				}
	    			}
	    		}
	    	}, {
	    		xtype: 'combo',
	    		width: "100%",
	    		height: me.comboHeight,
				editable : false,
	    		store: comboStore,
	    		listConfig: {
	    			id: me.id + "-list", // z-index 주기위해 id 지정 (drone.css .drone-combolist)
	    			itemId:me.id,
	    			getInnerTpl: function(a, b, c, d){
	    				return "{image1}{image2}{" + me.displayField + "}";
	    			},
	    			listeners: {
	    				itemclick: me.onItemClick
	    			}
	    		},
	    		listeners: {
	    			change: me.onChange,
	    			beforeselect: function(combo, record, index){
	    				// 콤보 리스트가 닫히지 않게 한다.
	    				if(me.noCollapse == true)
	    					return false;
	    			},
	    			select: function(){
	    				// 콤보 리스트 변경 시 레이어 선택 콤보 펼치기
	    				Ext.getCmp("cboDroneLayer").down("combo").expand();
	    			}
	    		},
	    		valueField: me.valueField,
	    		displayField: me.displayField,
	    		emptyText: "선택하세요"
	    	}]
	    }];
		
	    this.callParent();
	},
	
	getComboStore: function(){
		
		var me = this;
		
		var comboStore = null;
		
		if(me.dataRoot != ""){
			
			comboStore = Ext.create("Ext.data.Store", {
				fields: me.fields,
				proxy: {
					type: "ajax",
					url: me.jsonUrl,
					reader: {type: "json", rootProperty: me.dataRoot}
				}
			});
			
			comboStore.load();
			
			if(me.dataRoot == "layer"){
				
				comboStore.filterBy(function(record){
					
					if(record.get("visible") == "true"){
						
						return record;
					}
				});
			}
		}
		return comboStore;
	}
});