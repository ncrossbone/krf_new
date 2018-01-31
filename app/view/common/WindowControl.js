Ext.define('krf_new.view.common.WindowControl', {
	
	extend : 'Ext.window.Window',
	xtype : 'common-windowcontrol',
	//cls: 'khLee-x-tab-active',
	
	/* option으로 받아올 부분
	 * 없으면 아래 기본값 */
	id: 'windowControl',
	title: 'Window',
	restore: true, // 이전크기 tool icon 표시
	maximize: true, // 최대화 tool icon 표시
	minimize: true, // 최소화 tool icon 표시
	//close: true,
	//closable: false,
	//closeAction:'hide', // close, destroy로하면 시스템 멈춰버리므로 일단 hide
	width: 300,
	height: 300,
	itemxType: 'panel', // window 내부 아이템 타입
	/* option으로 받아올 부분 끝 */
	
	/* window 크기 및 위치 관련 */
	winSizeMode: 'normal', // size mode ex) normal, minimize, maximize
	preWidth: null,
	preHeight: null,
	preX: null,
	preY: null,
	/* window 크기 및 위치 관련 끝 */
	
	//renderTo: Ext.getBody(),
	
	listeners:{
        close:function(){
            var currCtl = Ext.getCmp("btnSearchResult");
            if(currCtl.btnOnOff == "on"){
            	SetBtnOnOff(currCtl.id);
            }
        }
    },
	
	initComponent: function(){
		
		this.callParent();
		
		var me = this;
		var toolCtl = [];
		
		// 최소화 툴 추가
		if(this.minimize == true){
			
			toolCtl.push({
				type: 'minimize',
				handler: function(evt, toolEl, owner, tool){
					
					var window = owner.up('window');
					
					if(window != undefined && window.tools != undefined && window.tools.length > 0){
						
						for(var i = 0; i < window.tools.length; i++){
							if(window.tools[i].type == "restore"){
								window.tools[i].setHidden(false);
							}
							if(window.tools[i].type == "minimize"){
								window.tools[i].setHidden(true);
							}
							if(window.tools[i].type == "maximize"){
								window.tools[i].setHidden(true);
							}
						}
						
						if(me.winSizeMode == "normal"){
							me.preWidth = window.getWidth();
							me.preHeight = window.getHeight();
							me.preX = window.getX();
							me.preY = window.getY();
						}
						
						me.winSizeMode = "minimize";
						
						var centerContainer = Ext.getCmp('center_container');
						
						window.collapse();
						window.setWidth(150);
						window.alignTo(centerContainer, 'bl-bl');
					}
				}
			});
			
		}
		
		// 이전크기 툴 추가
		if(this.restore == true){
			
			toolCtl.push({
				type: 'restore',
				hidden: true,
				handler: function(evt, toolEl, owner, tool){
					
					var window = owner.up('window');
					
					if(window != undefined && window.tools != undefined && window.tools.length > 0){
					
						for(var i = 0; i < window.tools.length; i++){
							if(window.tools[i].type == "restore"){
								window.tools[i].setHidden(true);
							}
							if(window.tools[i].type == "minimize"){
								window.tools[i].setHidden(false);
							}
							if(window.tools[i].type == "maximize"){
								window.tools[i].setHidden(false);
							}
						}
						
						if(me.winSizeMode == "minimize"){
							window.expand('', false);
						}
						
						me.winSizeMode = "normal";
						
						window.setWidth(me.preWidth);
						window.setHeight(me.preHeight);
						window.setX(me.preX);
						window.setY(me.preY);
					}
				}
			});
		}
		// 최대화 툴 추가
		if(this.maximize == true){
			
			toolCtl.push({
				type: 'maximize',
				handler: function(evt, toolEl, owner, tool){
					
					var window = owner.up('window');
					
					if(window != undefined && window.tools != undefined && window.tools.length > 0){
						
						for(var i = 0; i < window.tools.length; i++){
							if(window.tools[i].type == "restore"){
								window.tools[i].setHidden(false);
							}
							if(window.tools[i].type == "minimize"){
								window.tools[i].setHidden(false);
							}
							if(window.tools[i].type == "maximize"){
								window.tools[i].setHidden(true);
							}
						}
						
						if(me.winSizeMode == "normal"){
							me.preWidth = window.getWidth();
							me.preHeight = window.getHeight();
							me.preX = window.getX();
							me.preY = window.getY();
						}
						
						me.winSizeMode = "maximize";
						
						var centerContainer = Ext.getCmp('center_container');
						
						if(me.winSizeMode == "minimize"){
							window.expand('', false);
						}
						
						window.setWidth(centerContainer.getWidth());
						window.setHeight(centerContainer.getHeight());
						window.setX(centerContainer.getX());
						window.setY(centerContainer.getY()+10);
					}
				}
			});
		}
		
		this.tools = toolCtl;
		this.on("beforeclose", function(window){
			//160704 pdj 검색결과 hide
			var currCtl = SetBtnOnOff("btnSearchResult");
			
			var searchResultWindow = Ext.getCmp("searchResultWindow");
			searchResultWindow.hide();
			return false;
		});
	},
	
	windowResize: function(){
		var parentCtl = Ext.getCmp("center_container");
		this.setWidth(parentCtl.getWidth());
	}
});