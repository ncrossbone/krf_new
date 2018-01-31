/**
 * This example shows navigation tabs docked to the side.
 */
Ext.define('krf_new.view.center.SearchConfig', {

	extend: 'Ext.window.Window',
	xtype: 'win-searchConfig',
	id: 'searchConfig',
	
	width: 303,
	height: 150,
	x: 387,
	y: 200,
	
	header: false,
	closable: false,
	resizable:false,
	constrain: true,
	
	style: "border: 0px;",
	layout: {
		type: 'vbox'
	},
	
	items: [{
		xtype: "panel",
		title: "검색설정",
		layout: {
			type: "vbox"
		},
		width: "100%",
		items: [{
			xtype: 'container',
			style:"padding-left: 30px; padding-top: 6px; font: normal 11px 돋움; letter-spacing: -1px; line-height: 19px;",
			layout: {
				type: 'vbox'
			},
			width: "100%",
			height: 70,
			items:[{
				xtype: 'checkbox',
				boxLabel: '상류',
				checked: false,
				width:50,
				handler: function(obj, checked){
					if(checked == true){
						// 중권역 체크박스 활성
						this.up("container").query("#chkMWDraw")[0].enable();
						this.up("container").query("#chkMWDraw")[0].setValue(true);
						// 댐/보 체크박스 활성
						this.up("container").query("#chkDaemBoDraw")[0].enable();
					}
					else{
						// 중권역 체크박스 비활성
						this.up("container").query("#chkMWDraw")[0].disable();
						this.up("container").query("#chkMWDraw")[0].setValue(false);
						// 댐/보 체크박스 비활성
						this.up("container").query("#chkDaemBoDraw")[0].disable();
						this.up("container").query("#chkDaemBoDraw")[0].setValue(false);
					}
					
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isUpDraw'
			},{
				xtype:"container",
				layout:{
					type:"hbox"
				},
				width: "100%",
				style:"padding-left: 20px;",
				height: 35,
				items:[{
					xtype:"label",
					text:"└"
				},{
					xtype: 'checkbox',
					itemId: "chkMWDraw",
					id: "chkMWDraw",
					style:"padding-left:10px;",
					boxLabel: '중권역',
					checked: false,
					disabled: true,
					width:65,
					handler: function(obj, checked){
						var chkDaemBoDraw = Ext.getCmp('chkDaemBoDraw');
						if(checked==true){
							chkDaemBoDraw.setValue(false);
						}else{
							chkDaemBoDraw.setValue(true);
						}
						// 로컬 스토리지 셋팅
						this.up("win-searchConfig").setLocalStorage();
					},
					inputValue: 'isMWDraw'
				}, {
					xtype: 'checkbox',
					itemId: "chkDaemBoDraw",
					id: "chkDaemBoDraw",
					style:"padding-left:10px;",
					boxLabel: '댐/보',
					checked: false,
					disabled: true,
					width:80,
					handler: function(obj, checked){
						var chkMWDraw = Ext.getCmp('chkMWDraw');
						if(checked==true){
							chkMWDraw.setValue(false);
						}else{
							chkMWDraw.setValue(true);
						}
						// 로컬 스토리지 셋팅
						this.up("win-searchConfig").setLocalStorage();
					},
					inputValue: 'isDaemBoDraw'
				}]
			}]
		}, {
			xtype: 'container',
			style:"font: normal 11px 돋움; letter-spacing: -1px; line-height: 19px; padding-left: 30px; padding-top: 6px; border-top: 1px dotted #595959;",
			layout: {
				type: 'hbox'
			},
			width: "100%",
			height: 35,
			items:[{
				xtype: 'checkbox',
				boxLabel: '본류',
				checked: true,
				width:50,
				handler: function(obj, checked){
					if(checked == false){
						obj.setValue(true);
					}
				},
				inputValue: 'isBonDraw'
			},{
				xtype: 'checkbox',
				boxLabel: '지류',
				checked: true,
				width:50,
				handler: function(obj, checked){
					// 로컬 스토리지 셋팅
					this.up("win-searchConfig").setLocalStorage();
				},
				inputValue: 'isJiDraw'
			}]
		}]
	}],
	
	initComponent: function(){
		
		this.callParent();
		
		// 체크박스 셋팅
		this.setCheckBox();
	},
	// 체크박스 셋팅
	setCheckBox: function(){
		// 로컬 스토리지
		var searchConfigInfo = localStorage['_searchConfigInfo_'];
		// 체크박스 컨트롤 배열
		var chkCtls = this.query("checkbox");
		//console.info(searchConfigInfo);
		if(chkCtls != undefined && chkCtls != null){
			// 로컬 스토리지 존재하면
			if(searchConfigInfo != undefined && searchConfigInfo != null){
			
				var searchConfigInfoJson = JSON.parse(searchConfigInfo);
				// 체크박스 셋팅
				for(var i = 0; i < chkCtls.length; i++){
					
					if(chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null){
						chkCtls[i].setValue(searchConfigInfoJson[chkCtls[i].inputValue]);
					}
				}
			}
			else{
				// 로컬 스토리지 셋팅
				this.setLocalStorage();
			}
		}
	},
	// 로컬 스토리지 셋팅
	setLocalStorage: function(){
		
		var chkCtls = this.query("checkbox");
		var jsonObj = {};
		for(var i = 0; i < chkCtls.length; i++){
			
			if(chkCtls[i].inputValue != undefined && chkCtls[i].inputValue != null){
				jsonObj[chkCtls[i].inputValue] = chkCtls[i].checked;
			}
		}
		localStorage['_searchConfigInfo_'] = JSON.stringify(jsonObj);
	},
	getLocalStorage: function(){
		// 로컬 스토리지
		var searchConfigInfo = localStorage['_searchConfigInfo_'];
		var searchConfigInfoJson = null;
		
		if(searchConfigInfo != undefined && searchConfigInfo != null){
			searchConfigInfoJson = JSON.parse(searchConfigInfo);
		}
		else{
			// 로컬 스토리지 셋팅
			this.setLocalStorage();
			searchConfigInfoJson = JSON.parse(localStorage['_searchConfigInfo_']);
		}
		return searchConfigInfoJson;
	}
});