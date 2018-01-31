Ext.define('krf_new.view.drone.map.DroneFeatureLayerAdmin3', {
	map:null, 
	layer:null,
	dynamicLayer1:null,
	dynamicLayer2:null,
	
	constructor: function(map,itemValue) {
        var me = this;
        me.map = map;
        
        // store에서 맵서비스 URL 가져오기
        var queryTask = new esri.tasks.QueryTask($KRF_DEFINE.MapserviceUrl1 + "/" + $KRF_DEFINE.featureLayerId); // 레이어
			var query = new esri.tasks.Query();
			query.returnGeometry = true;
			query.where = "수계코드 = 10 AND 측정소코드 LIKE '1018%'";
			query.outFields = ["*"];
			
			queryTask.execute(query,  function(results){
				//console.info(results);
			});
			
			queryTask.on("complete", function(featureSet) {
				//console.info(featureSet);
				
				var layerDefinition = {  
				          "displayFieldName": "호소명",  
				          "geometryType": "esriGeometryPoint",
                          "objectIdField": "OBJECTID_1",
				          "spatialReference": {  
				            "wkid": 4326  
				          },  
				          "fields": [{  
				            "name": "OBJECTID_1",  
				            "alias": "OBJECTID_1",  
				            "type": "esriFieldTypeOID"  
				          }, {  
				            "name": "측정소명",  
				            "type": "esriFieldTypeString",  
				            "alias": "측정소명",
				            "length": 254
				          }, {  
				            "name": "측정소코드",  
				            "type": "esriFieldTypeString",  
				            "alias": "측정소코드",
				            "length": 7
				          }, {  
				            "name": "TM_X",  
				            "type": "esriFieldTypeString",  
				            "alias": "TM_X"
				          }, {  
				            "name": "TM_Y",  
				            "type": "esriFieldTypeString",  
				            "alias": "TM_Y"
				          }, {  
				            "name": "호소명",  
				            "type": "esriFieldTypeString",  
				            "alias": "호소명",
				            "length": 254
				          }]  
				        }  
				//console.info(featureSet.featureSet.features.length);
				
				var siteCodes = "";
				var measureDate = "";
				var layerDate = ""; 
				for(var i = 0; i < featureSet.featureSet.features.length; i++){
					if(featureSet.featureSet.features[i].attributes != undefined){
						siteCodes += "'" + featureSet.featureSet.features[i].attributes.측정소코드 + "', ";
					}
				}
				
				if(siteCodes.length > 0){
					siteCodes = siteCodes.substring(0, siteCodes.length - 2);
				}
				
				//alert(siteCodes);
				
				
				if(itemValue == null){
					return;
				}else{
					if(itemValue.DroneDate != "" || itemValue.MeasureDate != ""){
						layerDate = itemValue.DroneDate;
						measureDate = itemValue.MeasureDate;
						
					}else{
						return;
					}
					
				}
				
				var jsonData;
				
				Ext.Ajax.request({
                    url: _API.drone_GetRWMDT, //'./resources/jsp/drone/GetRWMDT.jsp',    // To Which url you wanna POST.
            		params: { siteCodes: siteCodes, measureDate: measureDate, layerDate: layerDate },
            		dataType: "text/html",
                    method: 'GET',
                    async: false,
                    success: function(response) {
                    	if('error' == response.responseText){
            				alert("오류가 발생하였습니다. 관리자에게 문의하세요.");
            				return;
            			}
            			//alert(response.responseText);
            			// JSON Object로 변경
            			jsonData = Ext.util.JSON.decode( response.responseText );
            			//alert(jsonData.data[0].ITEM_SURFACE_CLOA);
            		},
            		failure: function(form, action) {
            			alert(form.responseText);
            			alert("오류가 발생하였습니다.");
            		}
            	});
				
				if(jsonData != undefined && jsonData != null){
					for(var jsonCnt = 0; jsonCnt < jsonData.data.length; jsonCnt++){
						//console.info(jsonData.data[jsonCnt].ITEM_SURFACE_CLOA);
						for(var featureCnt = 0; featureCnt < featureSet.featureSet.features.length; featureCnt++){
    						if(featureSet.featureSet.features[featureCnt].attributes != undefined){
    							if(jsonData.data[jsonCnt].PT_NO == featureSet.featureSet.features[featureCnt].attributes.측정소코드){
    								// 측정일자
    								featureSet.featureSet.features[featureCnt].attributes.WMCYMD = jsonData.data[jsonCnt].WMCYMD
    								// 데이터 없음 표시 문자
    								if(jsonData.data[jsonCnt].WMCYMD == "-")
    									featureSet.featureSet.features[featureCnt].attributes.emptyMsg = "데이터가 존재하지 않습니다.";
    								else
    									featureSet.featureSet.features[featureCnt].attributes.emptyMsg = "";
    								// 클로로필 a
    								featureSet.featureSet.features[featureCnt].attributes.ITEM_SURFACE_CLOA = jsonData.data[jsonCnt].ITEM_SURFACE_CLOA
    								// 수온
    								featureSet.featureSet.features[featureCnt].attributes.ITEM_TEMP_SURF = jsonData.data[jsonCnt].ITEM_TEMP_SURF
    								// 남조류세포수
    								featureSet.featureSet.features[featureCnt].attributes.ITEM_BLUE_GREEN_ALGAE = jsonData.data[jsonCnt].ITEM_BLUE_GREEN_ALGAE
    							}
    						}
						}
					}
				}
				
				//console.info(featureSet.featureSet.features.length);
		        var featureCollection = {  
	        		layerDefinition: layerDefinition,  
	        		featureSet: featureSet.featureSet
		        };
				
				me.layer = new esri.layers.FeatureLayer(featureCollection);
    			//me.layer.setDefinitionExpression("1=1");
				
				/* Feature Layer 심볼 설정 */
				var selectionSymbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
				    30,
				    new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255, 255, 255, 0]), 2), // 투명도 0
				    new esri.Color([255, 255, 0, 0]) // 투명도 0
			    );
				
				var renderer = new esri.renderer.SimpleRenderer(selectionSymbol);
				me.layer.setRenderer(renderer);
				//me.layer.setSelectionSymbol(selectionSymbol);
				/* Feature Layer 심볼 설정 끝 */

    			me.layer.id = "DroneFeatureLayer3";
    			//me.layer.visible = true;
    			me.map.addLayer(me.layer);
    			
    			var cboDroneLayer = Ext.getCmp("cboDroneLayer").down("combo");
    			var layerStore = cboDroneLayer.getStore();
    			var featureOnOff = "";
    			
    			layerStore.each(function(obj){
    				if(obj.data.layerId == "3"){
    					featureOnOff = obj.data.layerOnOff;
    				}
    				
    				
    			});
    			//console.info(featureOnOff);
    			
    			if(featureOnOff == "off"){
    				me.layer.setVisibility(false);
    			}
    			// Feature Layer에 필드를 추가해야 라벨에서 사용 가능...
    			me.layer.fields.push({name: "emptyMsg", alias: "emptyMsg", type: "esriFieldTypeString"});
    			me.layer.fields.push({name: "WMCYMD", alias: "WMCYMD", type: "esriFieldTypeString"});
    			me.layer.fields.push({name: "ITEM_SURFACE_CLOA", alias: "ITEM_SURFACE_CLOA", type: "esriFieldTypeString"});
    			me.layer.fields.push({name: "ITEM_TEMP_SURF", alias: "ITEM_TEMP_SURF", type: "esriFieldTypeString"});
    			me.layer.fields.push({name: "ITEM_BLUE_GREEN_ALGAE", alias: "ITEM_BLUE_GREEN_ALGAE", type: "esriFieldTypeString"});
    			
    			/* 라벨설정 */
    			require(["esri/Color",
    			         "esri/symbols/TextSymbol",
    			         "esri/renderers/SimpleRenderer",
    			         "esri/layers/LabelLayer",
    			         "esri/symbols/Font",
    			         "dojo/on",
    			         "dojo/dom-construct"],
    			         function(Color,
    			        		 TextSymbol,
    			        		 SimpleRenderer,
    			        		 LabelLayer,
    			        		 Font,
    			        		 on,
    			        		 domConstruct){
    				var statesLabelRenderer = $KRF_APP.global.DroneFn.getLabelRenderer();
    				
	    	        var labels = new LabelLayer({ 
	    	        	id: "labels"
	    	        });
	    	        // tell the label layer to label the states feature layer 
	    	        // using the field named "STATE_NAME"
	    	        labels.addFeatureLayer(me.layer, statesLabelRenderer, "{측정소명} chl-a:{ITEM_SURFACE_CLOA}");
	    	        
	    	        on(labels, 'graphic-node-add', function (graphic) {
		        	
		        		var SVGRect = graphic.node.getBBox();
		                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		                rect.setAttribute("x", SVGRect.x);
		                rect.setAttribute("y", SVGRect.y + 40);
		                rect.setAttribute("width", SVGRect.width);
		                rect.setAttribute("height", SVGRect.height);
		                rect.setAttribute("fill", "white");
		                rect.setAttribute("fill-opacity", 0);
		                domConstruct.place(rect, graphic.node, "before");
		                
	                });
	    	        
	    	        // add the label layer to the map
	    	        me.map.addLayer(labels);
	    	        
    			});
    			/* 라벨설정 끝 */
    			
    			var dialog, highlightSymbol;
    			
    			require(["dijit/TooltipDialog"], function(TooltipDialog){
	    			dialog = new TooltipDialog({
    		          //id: "tooltipDialog",
    		          style: "position: absolute; width: 377px; font: normal normal normal 10pt Helvetica;z-index:100"
    		        });
    		        dialog.startup();
    			});
    			
    			require(["esri/symbols/SimpleFillSymbol",
    			         "esri/symbols/SimpleLineSymbol",
    			         "esri/Color"
    			],
    			function (SimpleFillSymbol,
    			          SimpleLineSymbol,
    			          Color){
					highlightSymbol = new SimpleFillSymbol(
							SimpleFillSymbol.STYLE_NULL,
							new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
									new Color([255,0,0]), 3),
							new Color([125,125,125,0.35]));
    			});
    			/*
    			me.map.on("load", function(){
    				me.map.graphics.enableMouseEvents();
    				me.map.graphics.on("mouse-out", closeDialog);
		        });
		        */

    			me.layer.on("mouse-over", function(evt){
    				//evt.layer.enableMouseEvents();
    				var t = 
  					  "   <em class=\"viewtit1\">측정소명 : ${측정소명}</em>                                               " +
  					  "   <table class=\"tst04\">																																			" +
  	          "   	<colgroup>                                                                                " +
  	          "       	<col width=\"100\">                                                                   " +
  	          "       	<col width=\"83\">                                                                    " +
  	          "           <col width=\"83\">                                                                  " +
  	          "           <col />                                                                             " +
  	          "       </colgroup>                                                                             " +
  	          "   	<thead>                                                                                   " +
  	          "       	<tr>                                                                                  " +
  	          "           	<th>측정일자</th>                                                                 " +
  	          "               <th>chl-a<br />(㎎㎥)</th>                                                      " +
  	          "               <th>수온<br />(℃)</th>                                                         " +
  	          "               <th>남조류세포수<br />(cells/㎖)</th>                                           " +
  	          "           </tr>                                                                               " +
  	          "       </thead>                                                                                " +
  	          "       <tbody>                                                                                 " +
  	          "       	<th>${WMCYMD}</th>                                                                   " +
  	          "           <td>${ITEM_SURFACE_CLOA}</td>                                                                           " +
  	          "           <td>${ITEM_TEMP_SURF}</td>                                                                           " +
  	          "           <td>${ITEM_BLUE_GREEN_ALGAE}</td>                                                                           " +
  	          "       </tbody>                                                                                " +
  	          "   </table>                                                                                    " ;
  				 
    				if(evt.graphic.attributes.측정소명 == "강북취수장"){
  					 var t2 = 
  				          "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
  				          "   <table class=\"tst04\">                                                                     " +
  				          "   	<colgroup>                                                                                " +
  				          "       	<col width=\"100\">                                                                   " +
  				          "       	<col width=\"125\">                                                                   " +
  				          "           <col width=\"125\">                                                                 " +
  				          "       </colgroup>                                                                             " +
  				          "   	<thead>                                                                                   " +
  				          "       	<tr>                                                                                  " +
  				          "           	<th>발령단계</th>                                                                 " +
  				          "               <th>2015년</th>                                                                 " +
  				          "               <th>2016년                                                                      " +
  				          "           </tr>                                                                               " +
  				          "       </thead>                                                                                " +
  				          "       <tbody>                                                                                 " +
  				          "       	<tr>                                                                                  " +
  				          "               <th>주의보/관심</th>                                                            " +
  				          "               <td><b>총69일</b><span>7.7~7.30</span><span>8.18~8.27</span><span>9.15~10.19</span></td>          " +
  				          "               <td>-</td>                                                                       " +
  				          "           </tr>                                                                               " +
  				          "           <tr>                                                                                " +
  				          "   			<th>경보/경계</th>                                                                    " +
  				          "               <td><b>총18일</b><span>8.27~9.14</span></td>                                                                       " +
  				          "               <td>-</td>                                                                       " +
  				          "           </tr>                                                                               " +
  				          "           <tr>                                                                                " +
  				          "           	<th>대발생</th>                                                                   " +
  				          "               <td>-</td>                                                                       " +
  				          "               <td>-</td>                                                                       " +
  				          "           </tr>                                                                               " +
  				          "       </tbody>                                                                                " +
  				          "   </table>                                                                                    " ;
  				 }else if(evt.graphic.attributes.측정소명 == "암사취수장"){
  					 var t2 = 
  				          "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
  				          "   <table class=\"tst04\">                                                                     " +
  				          "   	<colgroup>                                                                                " +
  				          "       	<col width=\"100\">                                                                   " +
  				          "       	<col width=\"125\">                                                                   " +
  				          "           <col width=\"125\">                                                                 " +
  				          "       </colgroup>                                                                             " +
  				          "   	<thead>                                                                                   " +
  				          "       	<tr>                                                                                  " +
  				          "           	<th>발령단계</th>                                                                 " +
  				          "               <th>2015년</th>                                                                 " +
  				          "               <th>2016년                                                                      " +
  				          "           </tr>                                                                               " +
  				          "       </thead>                                                                                " +
  				          "       <tbody>                                                                                 " +
  				          "       	<tr>                                                                                  " +
  				          "               <th>주의보/관심</th>                                                            " +
  				          "               <td><b>총69일</b><span>7.7~7.30</span><span>8.18~8.27</span><span>9.15~10.19</span></td>          " +
  				          "               <td>-</td>                                                                       " +
  				          "           </tr>                                                                               " +
  				          "           <tr>                                                                                " +
  				          "   			<th>경보/경계</th>                                                                    " +
  				          "               <td>-</td>                                                                       " +
  				          "               <td>-</td>                                                                       " +
  				          "           </tr>                                                                               " +
  				          "           <tr>                                                                                " +
  				          "           	<th>대발생</th>                                                                   " +
  				          "               <td>-</td>                                                                       " +
  				          "               <td>-</td>                                                                       " +
  				          "           </tr>                                                                               " +
  				          "       </tbody>                                                                                " +
  				          "   </table>                                                                                    " ;
  				 }else if(evt.graphic.attributes.측정소명 == "자양취수장"){
				 var t2 = 
				 "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
		          "   <table class=\"tst04\">                                                                     " +
		          "   	<colgroup>                                                                                " +
		          "       	<col width=\"100\">                                                                   " +
		          "       	<col width=\"125\">                                                                   " +
		          "           <col width=\"125\">                                                                 " +
		          "       </colgroup>                                                                             " +
		          "   	<thead>                                                                                   " +
		          "       	<tr>                                                                                  " +
		          "           	<th>발령단계</th>                                                                 " +
		          "               <th>2015년</th>                                                                 " +
		          "               <th>2016년                                                                      " +
		          "           </tr>                                                                               " +
		          "       </thead>                                                                                " +
		          "       <tbody>                                                                                 " +
		          "       	<tr>                                                                                  " +
		          "               <th>주의보/관심</th>                                                            " +
		          "               <td><b>총69일</b><span>7.7~7.30</span><span>8.18~8.27</span><span>9.15~10.19</span></td>          " +
		          "               <td>-</td>                                                                       " +
		          "           </tr>                                                                               " +
		          "           <tr>                                                                                " +
		          "   			<th>경보/경계</th>                                                                    " +
		          "               <td>-</td>                                                                       " +
		          "               <td>-</td>                                                                       " +
		          "           </tr>                                                                               " +
		          "           <tr>                                                                                " +
		          "           	<th>대발생</th>                                                                   " +
	          "               <td>-</td>                                                                       " +
	          "               <td>-</td>                                                                       " +
	          "           </tr>                                                                               " +
	          "       </tbody>                                                                                " +
	          "   </table>                                                                                    " ;
			 }else if(evt.graphic.attributes.측정소명 == "풍납취수장"){
				 var t2 = 
  					 "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
			          "   <table class=\"tst04\">                                                                     " +
			          "   	<colgroup>                                                                                " +
			          "       	<col width=\"100\">                                                                   " +
			          "       	<col width=\"125\">                                                                   " +
			          "           <col width=\"125\">                                                                 " +
			          "       </colgroup>                                                                             " +
			          "   	<thead>                                                                                   " +
			          "       	<tr>                                                                                  " +
			          "           	<th>발령단계</th>                                                                 " +
			          "               <th>2015년</th>                                                                 " +
			          "               <th>2016년                                                                      " +
			          "           </tr>                                                                               " +
			          "       </thead>                                                                                " +
			          "       <tbody>                                                                                 " +
			          "       	<tr>                                                                                  " +
			          "               <th>주의보/관심</th>                                                            " +
			          "               <td><b>총69일</b><span>7.7~7.30</span><span>8.18~8.27</span><span>9.15~10.19</span></td>          " +
			          "               <td>-</td>                                                                       " +
			          "           </tr>                                                                               " +
			          "           <tr>                                                                                " +
			          "   			<th>경보/경계</th>                                                                    " +
			          "               <td>-</td>                                                                       " +
			          "               <td>-</td>                                                                       " +
			          "           </tr>                                                                               " +
			          "           <tr>                                                                                " +
			          "           	<th>대발생</th>                                                                   " +
			          "               <td>-</td>                                                                       " +
			          "               <td>-</td>                                                                       " +
			          "           </tr>                                                                               " +
			          "       </tbody>                                                                                " +
			          "   </table>                                                                                    " ;
	  				 }else if(evt.graphic.attributes.측정소명 == "성수대교"){
  	  					 var t2 = 
  	  	  					 "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
  	  				          "   <table class=\"tst04\">                                                                     " +
  	  				          "   	<colgroup>                                                                                " +
  	  				          "       	<col width=\"100\">                                                                   " +
  	  				          "       	<col width=\"125\">                                                                   " +
  	  				          "           <col width=\"125\">                                                                 " +
  	  				          "       </colgroup>                                                                             " +
  	  				          "   	<thead>                                                                                   " +
  	  				          "       	<tr>                                                                                  " +
  	  				          "           	<th>발령단계</th>                                                                 " +
  	  				          "               <th>2015년</th>                                                                 " +
  	  				          "               <th>2016년                                                                      " +
  	  				          "           </tr>                                                                               " +
  	  				          "       </thead>                                                                                " +
  	  				          "       <tbody>                                                                                 " +
  	  				          "       	<tr>                                                                                  " +
  	  				          "               <th>주의보/관심</th>                                                            " +
  	  				          "               <td><b>총43일</b><span>6.30~7.6</span><span>8.18~9.1</span><span>10.14~11.3</span></td>          " +
  	  				          "               <td>-</td>                                                                       " +
  	  				          "           </tr>                                                                               " +
  	  				          "           <tr>                                                                                " +
  	  				          "   			<th>경보/경계</th>                                                                    " +
  	  				          "               <td><b>총66일</b><span>7.7~7.30</span><span>9.2~10.13</span></td>                                                                       " +
  	  				          "               <td>-</td>                                                                       " +
  	  				          "           </tr>                                                                               " +
  	  				          "           <tr>                                                                                " +
  	  				          "           	<th>대발생</th>                                                                   " +
  	  				          "               <td>-</td>                                                                       " +
  	  				          "               <td>-</td>                                                                       " +
  	  				          "           </tr>                                                                               " +
  	  				          "       </tbody>                                                                                " +
  	  				          "   </table>                                                                                    " ;
  	    	  				 }else if(evt.graphic.attributes.측정소명 == "한남대교"){
  	      	  					 var t2 = 
  	      	  	  					 "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
  	      	  				          "   <table class=\"tst04\">                                                                     " +
  	      	  				          "   	<colgroup>                                                                                " +
  	      	  				          "       	<col width=\"100\">                                                                   " +
  	      	  				          "       	<col width=\"125\">                                                                   " +
  	      	  				          "           <col width=\"125\">                                                                 " +
  	      	  				          "       </colgroup>                                                                             " +
  	      	  				          "   	<thead>                                                                                   " +
  	      	  				          "       	<tr>                                                                                  " +
  	      	  				          "           	<th>발령단계</th>                                                                 " +
  	      	  				          "               <th>2015년</th>                                                                 " +
  	      	  				          "               <th>2016년                                                                      " +
  	      	  				          "           </tr>                                                                               " +
  	      	  				          "       </thead>                                                                                " +
  	      	  				          "       <tbody>                                                                                 " +
  	      	  				          "       	<tr>                                                                                  " +
  	      	  				          "               <th>주의보/관심</th>                                                            " +
  	      	  				          "               <td><b>총43일</b><span>6.30~7.6</span><span>8.18~9.1</span><span>10.14~11.3</span></td>          " +
  	      	  				          "               <td>-</td>                                                                       " +
  	      	  				          "           </tr>                                                                               " +
  	      	  				          "           <tr>                                                                                " +
  	      	  				          "   			<th>경보/경계</th>                                                                    " +
  	      	  				          "               <td><b>총66일</b><span>7.7~7.30</span><span>9.2~10.13</span></td>                                                                       " +
  	      	  				          "               <td>-</td>                                                                       " +
  	      	  				          "           </tr>                                                                               " +
  	      	  				          "           <tr>                                                                                " +
  	      	  				          "           	<th>대발생</th>                                                                   " +
  	      	  				          "               <td>-</td>                                                                       " +
  	      	  				          "               <td>-</td>                                                                       " +
  	      	  				          "           </tr>                                                                               " +
  	      	  				          "       </tbody>                                                                                " +
  	      	  				          "   </table>                                                                                    " ;
  	      	    	  				 }else if(evt.graphic.attributes.측정소명 == "한강대교"){
  	      	      	  					 var t2 = 
  	      	      	  	  					 "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
  	      	      	  				          "   <table class=\"tst04\">                                                                     " +
  	      	      	  				          "   	<colgroup>                                                                                " +
  	      	      	  				          "       	<col width=\"100\">                                                                   " +
  	      	      	  				          "       	<col width=\"125\">                                                                   " +
  	      	      	  				          "           <col width=\"125\">                                                                 " +
  	      	      	  				          "       </colgroup>                                                                             " +
  	      	      	  				          "   	<thead>                                                                                   " +
  	      	      	  				          "       	<tr>                                                                                  " +
  	      	      	  				          "           	<th>발령단계</th>                                                                 " +
  	      	      	  				          "               <th>2015년</th>                                                                 " +
  	      	      	  				          "               <th>2016년                                                                      " +
  	      	      	  				          "           </tr>                                                                               " +
  	      	      	  				          "       </thead>                                                                                " +
  	      	      	  				          "       <tbody>                                                                                 " +
  	      	      	  				          "       	<tr>                                                                                  " +
  	      	      	  				          "               <th>주의보/관심</th>                                                            " +
  	      	      	  				          "               <td><b>총36일</b><span>8.18~9.1</span><span>10.14~11.3</span><span>10.14~11.3</span></td>          " +
  	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	  				          "           </tr>                                                                               " +
  	      	      	  				          "           <tr>                                                                                " +
  	      	      	  				          "   			<th>경보/경계</th>                                                                    " +
  	      	      	  				          "               <td><b>총70일</b><span>7.3~7.30</span><span>9.2~10.13</span></td>                                                                       " +
  	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	  				          "           </tr>                                                                               " +
  	      	      	  				          "           <tr>                                                                                " +
  	      	      	  				          "           	<th>대발생</th>                                                                   " +
  	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	  				          "           </tr>                                                                               " +
  	      	      	  				          "       </tbody>                                                                                " +
  	      	      	  				          "   </table>                                                                                    " ;
  	      	      	    	  				 }else if(evt.graphic.attributes.측정소명 == "마포대교"){
  	      	      	      	  					 var t2 = 
  	      	      	      	  	  					 "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
  	      	      	      	  				          "   <table class=\"tst04\">                                                                     " +
  	      	      	      	  				          "   	<colgroup>                                                                                " +
  	      	      	      	  				          "       	<col width=\"100\">                                                                   " +
  	      	      	      	  				          "       	<col width=\"125\">                                                                   " +
  	      	      	      	  				          "           <col width=\"125\">                                                                 " +
  	      	      	      	  				          "       </colgroup>                                                                             " +
  	      	      	      	  				          "   	<thead>                                                                                   " +
  	      	      	      	  				          "       	<tr>                                                                                  " +
  	      	      	      	  				          "           	<th>발령단계</th>                                                                 " +
  	      	      	      	  				          "               <th>2015년</th>                                                                 " +
  	      	      	      	  				          "               <th>2016년                                                                      " +
  	      	      	      	  				          "           </tr>                                                                               " +
  	      	      	      	  				          "       </thead>                                                                                " +
  	      	      	      	  				          "       <tbody>                                                                                 " +
  	      	      	      	  				          "       	<tr>                                                                                  " +
  	      	      	      	  				          "               <th>주의보/관심</th>                                                            " +
  	      	      	      	  				          "               <td><b>총36일</b><span>8.18~9.1</span><span>10.14~11.3</span><span>10.14~11.3</span></td>          " +
  	      	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	      	  				          "           </tr>                                                                               " +
  	      	      	      	  				          "           <tr>                                                                                " +
  	      	      	      	  				          "   			<th>경보/경계</th>                                                                    " +
  	      	      	      	  				          "               <td><b>총70일</b><span>7.3~7.30</span><span>9.2~10.13</span></td>                                                                       " +
  	      	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	      	  				          "           </tr>                                                                               " +
  	      	      	      	  				          "           <tr>                                                                                " +
  	      	      	      	  				          "           	<th>대발생</th>                                                                   " +
  	      	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	      	  				          "               <td>-</td>                                                                       " +
  	      	      	      	  				          "           </tr>                                                                               " +
  	      	      	      	  				          "       </tbody>                                                                                " +
  	      	      	      	  				          "   </table>                                                                                    " ;
  	      	      	      	    	  				 }else if(evt.graphic.attributes.측정소명 == "성산대교"){
        	      	      	      	  					 var t2 = 
        	      	      	      	  	  					 "   <em class=\"viewtit2\">조류경보 발령 내역</em>                                               " +
        	      	      	      	  				          "   <table class=\"tst04\">                                                                     " +
        	      	      	      	  				          "   	<colgroup>                                                                                " +
        	      	      	      	  				          "       	<col width=\"100\">                                                                   " +
        	      	      	      	  				          "       	<col width=\"125\">                                                                   " +
        	      	      	      	  				          "           <col width=\"125\">                                                                 " +
        	      	      	      	  				          "       </colgroup>                                                                             " +
        	      	      	      	  				          "   	<thead>                                                                                   " +
        	      	      	      	  				          "       	<tr>                                                                                  " +
        	      	      	      	  				          "           	<th>발령단계</th>                                                                 " +
        	      	      	      	  				          "               <th>2015년</th>                                                                 " +
        	      	      	      	  				          "               <th>2016년                                                                      " +
        	      	      	      	  				          "           </tr>                                                                               " +
        	      	      	      	  				          "       </thead>                                                                                " +
        	      	      	      	  				          "       <tbody>                                                                                 " +
        	      	      	      	  				          "       	<tr>                                                                                  " +
        	      	      	      	  				          "               <th>주의보/관심</th>                                                            " +
        	      	      	      	  				          "               <td><b>총36일</b><span>8.18~9.1</span><span>10.14~11.3</span><span>10.14~11.3</span></td>          " +
        	      	      	      	  				          "               <td>-</td>                                                                       " +
        	      	      	      	  				          "           </tr>                                                                               " +
        	      	      	      	  				          "           <tr>                                                                                " +
        	      	      	      	  				          "   			<th>경보/경계</th>                                                                    " +
        	      	      	      	  				          "               <td><b>총73일</b><span>6.30~7.30</span><span>9.2~10.13</span></td>                                                                       " +
        	      	      	      	  				          "               <td>-</td>                                                                       " +
        	      	      	      	  				          "           </tr>                                                                               " +
        	      	      	      	  				          "           <tr>                                                                                " +
        	      	      	      	  				          "           	<th>대발생</th>                                                                   " +
        	      	      	      	  				          "               <td>-</td>                                                                       " +
        	      	      	      	  				          "               <td>-</td>                                                                       " +
        	      	      	      	  				          "           </tr>                                                                               " +
        	      	      	      	  				          "       </tbody>                                                                                " +
        	      	      	      	  				          "   </table>                                                                                    " ;
        	      	      	      	    	  				 }
			 
			if(t2 != undefined){
				t = t+t2;
			}
		          //console.info(evt.graphic.attributes);
		          var content, highlightGraphic;
		          
		          require(["esri/lang"], function(esriLang){
		        	  content = esriLang.substitute(evt.graphic.attributes,t);
		        	  //content = t;
		        	  //console.info(esriLang.substitute);
		          });
		          
		          require(["esri/graphic"], function(Graphic){
		        	  highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
		          });
		          
		          me.map.graphics.add(highlightGraphic);
		          
		          dialog.setContent(content);

		          require(["dojo/dom-style", "dijit/popup"], function(domStyle, dijitPopup){
		        	  domStyle.set(dialog.domNode, "opacity", 1);
    		          dijitPopup.open({
    		            popup: dialog, 
    		            x: evt.pageX,
    		            y: evt.pageY
    		          });
		          });
		     });
			
			me.layer.on("mouse-out", function(){
				//alert("dd");
				require(["dijit/popup"], function(dijitPopup){
					me.map.graphics.clear();
    		        dijitPopup.close(dialog);
				});
	        });
		});
    }
});