Ext.define('krf_new.view.search.SearchArea_NameController_Rich', {
	
	extend: 'Ext.app.ViewController',

	alias: 'controller.searchArea_NameController_Rich',
	
	control:{
		'#btnSearchText_Start':{
			click: 'onTextSearch'
		},
		'#btnSearchText_End':{
			click: 'onTextSearch'
		},
		'#smartButton':{
			click: 'onClickSmart'
		},
		
		'#textSearchText_Start':{
			specialkey: function(f,e){
				var btnSearchText_Start = Ext.getCmp("btnSearchText_Start");
				if(e.getKey() == e.ENTER){
					this.onTextSearch(btnSearchText_Start,"");
				}
			}
		},
		
		'#textSearchText_End':{
			specialkey: function(f,e){
				var btnSearchText_End = Ext.getCmp("btnSearchText_End");
				if(e.getKey() == e.ENTER){
					this.onTextSearch(btnSearchText_End,"");
				}
			}
		}
	},
	
	onTextSearch: function(button, eOpts){
		
		var textSearchText_Start = Ext.getCmp("textSearchText_Start");
		var textSearchText_End = Ext.getCmp("textSearchText_End");
		
		if(button.id == "btnSearchText_Start"){
			var where = "JIJUM_NM like '"+textSearchText_Start.value+"%' ";
		}else{
			var where = "JIJUM_NM like '"+textSearchText_End.value+"%' ";
		}
		
		var queryTask = new esri.tasks.QueryTask(_mapServiceUrl_v3 + '/' + _siteInfoLayerId); // 레이어 URL
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		
		query.where = where;
		
		query.outFields = ["*"];
		query.where += "	AND  GROUP_CODE <> 'B' AND GROUP_CODE <> 'G' AND LAYER_CODE <> 'D002' AND LAYER_CODE <> 'D005' AND LAYER_CODE <> 'D006' AND LAYER_CODE <> 'D007'	";
		queryTask.execute(query, function(result){
			Ext.each(result, function(objLayer, idx, objLayers){
				
				var guBunNm = "";
				
				var listCtl = Ext.getCmp("searchAreaList");
				listCtl.removeAll();
				listCtl.doLayout();
				
				var layerCnt = 0;
				
				var saveCnt = [];
				
				var listCtl_Total = Ext.getCmp("searchAreaList_Total");
				listCtl_Total.doLayout();
				listCtl_Total.removeAll();
				
				if(button.id == "btnSearchText_Start"){
					var html = ' <span>"'+textSearchText_Start.value+'</span>" 검색결과   <span>'+result.features.length+'건</span>'
				}else{
					var html = ' <span>"'+textSearchText_End.value+'</span>" 검색결과   <span>'+result.features.length+'건</span>'
				}
				
				listCtl_Total.add({
					xtype: 'label',
					cls: 'dj_reach_list_title',
					html: html
				});	
				
				
				for(i = 0; i < result.features.length; i++){
					
					
					if(result.features[i].attributes.LAYER_NM != guBunNm){
							
							var layerCode = result.features[i].attributes.LAYER_CODE;
							
							/* 레이어 정보 가져오기 */
							var layer01Info = getLayer01Info("layerCode", layerCode, null, null);
							var iconCls = "";
							if(layer01Info.length > 0){
								iconCls = layer01Info[0].iconCls;
							}
							else{
								console.info(layerCode + "에 해당하는 iconCls가 없습니다. Layer01Data.json 확인 요함.")
							}
							
							listCtl.addCls('dj_accordion');
							listCtl.add({
								xtype : 'panel',
								//autoScroll: true,
								layout : {
									type : 'vbox'
								},
								cls: 'dj_layer_nm',
								title :  '&nbsp;' + result.features[i].attributes.LAYER_NM +'&nbsp; (Count)' ,
								layerCd : layerCode,
								iconCls: iconCls
							});
							
							saveCnt += "_"+layerCnt;
							guBunNm = result.features[i].attributes.LAYER_NM;
							layerCnt = 0;
							
							
						}else if(i == result.features.length-1 ){//마지막 카운트 구하기
							saveCnt += "_"+(layerCnt+1);
						}
						
						////console.info(listCtl.);
						var lstLength = listCtl.items.items.length;

						for(j = 0 ;  j < lstLength ; j++){
							if(listCtl.items.items[j].layerCd == layerCode){
								listCtl.items.items[j].add({
									xtype : 'label',
									cls: 'dj_result_info',
									style: 'left: 13px !important;',
									html : 		/*"<input type=\"hidden\" value=\"\">&nbsp;&nbsp; <a href=\"#\" onClick=\"alert('dd')\">지점명 :"+result.features[i].attributes.JIJUM_NM+"</a> " +*/
											"<table class=\"dj_result\" border=\"0\" >										" +
											"<tr>                                 " +
											" <th rowspan=\"2\"><img style=\"cursor:pointer;\" src=\"./resources/images/symbol/spot01.png\" alt=\"시작위치\" height =\"41\" width = \"21\"  onClick=\"siteMovePoint('"+layerCode+"','"+result.features[i].attributes.JIJUM_CODE+"' , 'start' );\"/></th> " +
											" <th rowspan=\"2\"><img style=\"cursor:pointer;\" src=\"./resources/images/symbol/spot03.png\" alt=\"끝위치\" height =\"41\" width = \"21\" onClick=\"siteMovePoint('"+layerCode+"','"+result.features[i].attributes.JIJUM_CODE+"' , 'end');\" /></th> " +
											" <td><a href=\"#\" onClick=\"siteMovePoint('"+result.features[i].attributes.LAYER_CODE+"','"+result.features[i].attributes.JIJUM_CODE+"' , 'addrLink');\" ><span>"+result.features[i].attributes.JIJUM_NM+"</span></a></td>                     " +
											"</tr>                                " +
											"<tr>                                 " +
											" <td> <a href=\"#\" onClick=\"siteMovePoint('"+result.features[i].attributes.LAYER_CODE+"','"+result.features[i].attributes.JIJUM_CODE+"', 'addrLink');\" >" + result.features[i].attributes.ADDR + "</a></td> " +
											"</tr>                                " +
											"</table>                             "
											
								});
							
							layerCnt++;		
						}
					}
				}
				
				listCtl.doLayout();
				listCtl_Total.doLayout();
				
				var layerCount = [];
				layerCount = saveCnt.split("_");
				
				for(Cnt = 0 ; Cnt < listCtl.items.items.length ; Cnt++){
					
					listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("Count",layerCount[Cnt+2]));
					if(Cnt+1 == listCtl.items.items.length){
						listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("undefined","1"));
					}
					
					if(Cnt+1 == listCtl.items.items.length){
						listCtl.items.items[Cnt].setTitle(listCtl.items.items[Cnt].title.replace("undefined","1"));
					}
				}
				
				//검색후 가장 처음값으로 이동
				siteMovePoint(result.features[0].attributes.LAYER_CODE,result.features[0].attributes.JIJUM_CODE, 'addrLink');
		
			});
			
			// 좌측 패널 스크롤 생성
			setWestBodyScroll();
		});
		
		var btnCtl = null;
		var btn = Ext.getCmp("btnSearchText_Start");
		var searchAreaContents_1 = Ext.getCmp("searchAreaContents_1");
		
		//var richSearch = Ext.create('KRF_DEV.store.east.SiteListWindow');
		
		
		Ext.ShowSiteListWindow("SEnameSearch"); // 지점목록 창 띄우기
			
	},
	onClickSmart : function(obj, el, evt){
		// 검색설정 버튼 On/Off
		var btnMenu01 = Ext.getCmp("btnMenu01");
		var currCtl = SetBtnOnOff(btnMenu01.id);
		
		// 팝업 이미지 (임시)
		var popCtl = Ext.getCmp("searchConfig");
		var popHeader = Ext.getCmp("searchConfigHeader");
		
		if(popCtl == undefined){
			
			popCtl = Ext.create("KRF_DEV.view.center.SearchConfig", {
				x: 390,
				y: 170
			});
			
		}
		
		if(popHeader == undefined){
			popHeader = Ext.create("KRF_DEV.view.center.SearchConfigHeader",{
				x: 387,
				y: 170
			});
			
		}
		// 팝업 이미지 show, hide
		if(currCtl.btnOnOff == "on"){
			popHeader.show();
			popCtl.show();
		}
		else{
			popCtl.hide();
			popHeader.hide();
		}
		
	}
	
});
