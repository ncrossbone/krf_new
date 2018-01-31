/*
 * 주제도 표출 관련 공통 클래스 */

// khLee test
var tmQuantizeTest = {
	quantizeObj: {
		tmpFeatureSet: [],	// 임시 피처셋 배열
		rstFeatureSet: [],	// 최종 결과 피처셋 배열
		originFeatures: [],	// 최초 피처 배열
		maxVal: null,		// 해당 attribute 최대값
		minVal: null,		// 해당 attribute 최소값
		gapVal: null,		// 해당 attribute 단계 사이의 값 차이
		recursiveCnt: 1		// 재귀 호출 카운트
	},
	initQuantizeObj: function(){
		
		this.quantizeObj.tmpFeatureSet = [];
		this.quantizeObj.rstFeatureSet = [];
		this.quantizeObj.recursiveCnt = 1;
	},
	getSortArray: function(arrObj, attrName, description){
		
		arrObj.sort(function(a, b){
			
			if(description == "DESC"){
				return b.attributes[attrName] - a.attributes[attrName];
			} else{
				return a.attributes[attrName] - b.attributes[attrName];
			}
		});
		
		return arrObj;
	},
	// 각 단계(range)당 Feature 한개씩 셋팅
	setOnlyOneFeature: function(features, attrName, doubleCnt){
		
		// Object 초기화
		this.initQuantizeObj();
		
		features = this.getSortArray(features, attrName, "DESC");
			
		var quanCnt = -1;
		var arrQuantize = [];
		var preVal = undefined;
		
		for(var i = 0; i < features.length; i++){
			
			var feature = features[i];
			
			var stVal = edVal = Math.round(feature.attributes[attrName]);
			
			if(preVal != stVal){
				
				quanCnt += 1;
				
				var curRange = quanCnt;
				
				var obj = {stVal: stVal, edVal: edVal, range: curRange};
				
				arrQuantize.push(obj);
				
				if(arrQuantize[quanCnt].features == undefined){
					
					arrQuantize[quanCnt].features = [];
				}
				
				feature.attributes.stVal = stVal;
				feature.attributes.edVal = edVal;
				feature.attributes.color = getCatRangeColor(curRange * doubleCnt);
				feature.attributes.range = curRange;
				
				preVal = stVal;
			}
			
			arrQuantize[quanCnt].features.push(feature);
		}
		
		for(var quanCnt = 0; quanCnt < arrQuantize.length; quanCnt++){
			
			this.quantizeObj.rstFeatureSet.push(arrQuantize[quanCnt]);
		}
		
	},
	setOneMoreFeature: function(featureSet, attrName, oneMoreCnt, recursiveCnt){
		
		// Object 초기화
		this.initQuantizeObj();
		
		var range = 0;
		var doubleCnt = 0;
		
		if(oneMoreCnt <= 4){
			
			doubleCnt = 2;
		}
		else{
			
			if(oneMoreCnt <= 8){
				
				doubleCnt = 1;
			}
		}
		
		if(oneMoreCnt <= 8){
			
			for(var i = 0; i < featureSet.length; i++){
				
				var fSetCnt = featureSet[i].features.length;
				
				if(fSetCnt > 0){
					
					for(var fCnt = 0; fCnt < featureSet[i].features.length; fCnt++){
						
						var feature = featureSet[i].features[fCnt];
						
						feature.attributes.stVal = featureSet[i].minVal;
						feature.attributes.edVal = featureSet[i].maxVal;
						feature.attributes.color = getCatRangeColor(range * doubleCnt);
						feature.attributes.range = range;
						featureSet[i].range = range;
					}
					
					this.quantizeObj.rstFeatureSet.push(featureSet[i]);
					range++;
				}
			}
		}
		else{
			var restCnt = oneMoreCnt % 8; // 나머지
			var quotientCnt = this.Floor(oneMoreCnt / 8, 0); // 몫
			var plusCnt1 = 0;
			
			/*for(var i = 0; i < featureSet.length; i += plusCnt1){
				
				var fSetCnt = featureSet[i].features.length;
				
				if(fSetCnt > 0){
					
					plusCnt1 
					if(plusCnt1 < restCnt){
						
						
					}
					
					plusCnt1++;
				}
			}*/
		}
		
	},
	setScale: function(featureSet, attrName){
		
		this.setRange = function(originRange){
			
			var range = originRange * this.quantizeObj.recursiveCnt; // 재귀 카운트 만큼 곱하기..
			
			// 소수점 자릿수 설정 (digit: 자릿수, roundUpDown: 반올림[round] 올림[up] 내림[down])
			this.setPointCipher = function(digit, roundUpDown){
				
				// 최초 한번만 설정
				//if(this.quantizeObj.originFeatures.length == 0){
					
					// 피처 정렬
					var originFeatures = this.getSortArray(featureSet.features, attrName, "DESC");
					// 최초 Feature 셋팅
					this.quantizeObj.originFeatures = originFeatures;
					this.quantizeObj.tmpFeatureSet = [];
					
					// Max Value
					this.quantizeObj.maxVal = originFeatures[0].attributes[attrName];
					this.quantizeObj.maxVal = this.getRoundUpDown(digit, roundUpDown, this.quantizeObj.maxVal);
					
					// Min Value
					this.quantizeObj.minVal = originFeatures[originFeatures.length - 1].attributes[attrName];
					this.quantizeObj.minVal = this.getRoundUpDown(digit, roundUpDown, this.quantizeObj.minVal);
					
					// 단계 값 차이
					this.quantizeObj.gapVal = (this.quantizeObj.maxVal - this.quantizeObj.minVal) / range;
					this.quantizeObj.gapVal = this.getRoundUpDown(digit, roundUpDown, this.quantizeObj.gapVal);
					
					var minPlus = 1;
					
					for(var i = 0; i < digit; i++){
						
						minPlus = minPlus / 10;
					}
					
					for(var i = 0; i < range; i++){
						
						// 각 단계 Max Value
						var maxVal = this.quantizeObj.maxVal - (this.quantizeObj.gapVal * i);
						maxVal = this.getRoundUpDown(digit, roundUpDown, maxVal);
						
						// 각 단계 Min Value
						var minVal = maxVal - this.quantizeObj.gapVal + Number(minPlus);
						minVal = this.getRoundUpDown(digit, roundUpDown, minVal);
						if(i == range - 1){
							minVal = "0";
						}
						
						var featureSetObj = {range: i, maxVal: maxVal, minVal: minVal, features: []};
						
						// 피처셋 배열 추가
						this.quantizeObj.tmpFeatureSet.push(featureSetObj);
					}
				//}
				
				this.setFeatures = function(featureSet){
					
					// 피처 정렬
					var features = this.getSortArray(featureSet.features, attrName, "DESC");
					for(var fCnt = 0; fCnt < this.quantizeObj.tmpFeatureSet.length; fCnt++){
						
						for(var oCnt = 0; oCnt < features.length; oCnt++){
							
							var attrValue = features[oCnt].attributes[attrName];;
							// 소수점 적용
							attrValue = this.getRoundUpDown(digit, roundUpDown, attrValue);
							// 소수점 적용 재입력
							features[oCnt].attributes[attrName] = attrValue;
							
							var featureSetF = this.quantizeObj.tmpFeatureSet[fCnt];

							if(Number(attrValue) >= Number(featureSetF.minVal) && Number(attrValue) <= Number(featureSetF.maxVal)){
								this.quantizeObj.tmpFeatureSet[fCnt].features.push(features[oCnt]);
							}
						}
					}
					
					
					var zeroCnt = 0;
					var oneMoreCnt = 0;
					
					for(var fCnt = 0; fCnt < this.quantizeObj.tmpFeatureSet.length; fCnt++){
						
						if(this.quantizeObj.tmpFeatureSet[fCnt].features.length == 0){
							
							zeroCnt++;
						}
						else{
							
							oneMoreCnt++;
						}
					}
					
					
					var minRange = Math.round(originRange / 2);
					var totFCnt = this.quantizeObj.originFeatures.length;
					
					if(oneMoreCnt < minRange && totFCnt > minRange && this.quantizeObj.recursiveCnt < 5){
						
						this.quantizeObj.recursiveCnt++; // 재귀 카운트 증가
						
						this.setScale(featureSet, attrName).setRange(originRange)
						.setPointCipher(digit, roundUpDown).setFeatures(featureSet);
					}
					else{
						
						if(totFCnt <= minRange){
							
							this.setOnlyOneFeature(this.quantizeObj.originFeatures, attrName, 2);
						}
						else{
							
							if(totFCnt > minRange && totFCnt <= originRange){
								
								this.setOnlyOneFeature(this.quantizeObj.originFeatures, attrName, 1);
							}
							else{
								
								this.setOneMoreFeature(this.quantizeObj.tmpFeatureSet, attrName, oneMoreCnt, this.quantizeObj.recursiveCnt);
								//alert(totCnt);
							}
						}
					}
					
					return this;
				}
				
				return this;
			}
			
			return this;
		}
		
		return this;
	},
	getRoundUpDown: function(digit, roundUpDown, value){
		
		var roundFnName = "Round";
		if(roundUpDown == "up"){
			roundFnName = "Ceiling";
		}
		if(roundUpDown == "down"){
			roundFnName = "Floor";
		}
		return this[roundFnName](value, digit);
//		return eval("this." + roundFnName + "(" + value + ", " + digit + ")");
	},
	// 지정자리 반올림 (값, 자릿수)
	Round: function(n, pos) {
		var digits = Math.pow(10, pos);

		var sign = 1;
		if (n < 0) {
			sign = -1;
		}

		// 음수이면 양수처리후 반올림 한 후 다시 음수처리
		n = n * sign;
		var num = Math.round(n * digits) / digits;
		num = num * sign;

		return num.toFixed(pos);
	},
	// 지정자리 버림 (값, 자릿수)
	Floor: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.floor(n * digits) / digits;

		return num.toFixed(pos);
	},
	// 지정자리 올림 (값, 자릿수)
	Ceiling: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.ceil(n * digits) / digits;

		return num.toFixed(pos);
	}
}

var percentile = {
	rstFeatureSet: [],
	quantile: function(array, percentile){
			
		array.sort(function(a, b){
			return a - b;
		});
		
		var index = percentile / 100 * (array.length - 1);
		
		if(Math.floor(index) == index){
			
			result = Number(array[index]);
		}
		else{
			
			var i = Math.floor(index);
			var fraction = index - i;
			result = Number(array[i]) + (Number(array[i+1]) - Number(array[i])) * fraction;
		}
		
		return result;
	},
	getPercentileObj: function(arrFeatures, attrPath, range, pos, kind){
		
		var me = this;
		me.rstFeatureSet = [];
		var coreMap = GetCoreMap();
		var arrPercentiles = [];
		var arrValues = [];
		//console.info(pos);
		var perRange = me.Round(100 / range, 1);
		
		for(var i = 0; i < range; i++){
			
			var percentile = Math.round((i + 1) * perRange);
			
			if(i == range - 1){
				
				percentile = 100;
			}
			
			arrPercentiles.push(percentile);
		}
		
		for(var i = 0; i < arrFeatures.length; i++){
			arrValues.push(arrFeatures[i].attributes[attrPath]);
		}
		
		var minVal = "0";
		
		arrPercentiles.forEach(function(elem, index, array){
			
			var curMinVal = minVal;
			var curMaxVal = me.Ceiling(me.quantile(arrValues, elem), pos);
			var curRange = index;
			
			var features = [];
			
			for(var i = 0; i < arrFeatures.length; i++){
				var data = eval("arrFeatures[i].attributes." + attrPath);
				
				if(index == range - 1){
					curMaxVal = Number(curMaxVal) + 1;
				}
				
				if(data >= curMinVal && data < curMaxVal){
					
					arrFeatures[i].attributes.stVal = curMinVal;
					arrFeatures[i].attributes.edVal = curMaxVal;
					arrFeatures[i].attributes.color = getCatRangeColor(curRange);
					arrFeatures[i].attributes.range = curRange;
					
					features.push(arrFeatures[i]);
				}
				
				minVal = curMaxVal;
			}
			
			var fObj = {minVal: curMinVal, maxVal: curMaxVal, range: curRange, features: features};
			me.rstFeatureSet.push(fObj);
		});
		
		return this;
	},
	// 지정자리 반올림 (값, 자릿수)
	Round: function(n, pos) {
		var digits = Math.pow(10, pos);

		var sign = 1;
		if (n < 0) {
			sign = -1;
		}

		// 음수이면 양수처리후 반올림 한 후 다시 음수처리
		n = n * sign;
		var num = Math.round(n * digits) / digits;
		num = num * sign;

		return num.toFixed(pos);
	},
	// 지정자리 버림 (값, 자릿수)
	Floor: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.floor(n * digits) / digits;

		return num.toFixed(pos);
	},
	// 지정자리 올림 (값, 자릿수)
	Ceiling: function(n, pos) {
		var digits = Math.pow(10, pos);

		var num = Math.ceil(n * digits) / digits;

		return num.toFixed(pos);
	}
}

getQuantizeObj = function(featureSet, attrName, range, kind){
	
	var quantize = percentile.getPercentileObj(featureSet.features, attrName, range, 0, kind);
	////console.info(quantize);
	/*var quantize = tmQuantizeTest.setScale(featureSet, attrName).setRange(range)
	.setPointCipher(0, "round").setFeatures(featureSet);
	
	return quantize.quantizeObj.rstFeatureSet;*/
	return quantize.rstFeatureSet;
}

pollutionLayerSelect = function(value , onOff){
	//console.info(onOff);
	pollutionLayerOnOff(onOff, value);
}


pollutionLayerOnOff = function(onOff, value){
	var pollutionMapSetValue = Ext.getCmp("pollutionMapSetValue");
	if(pollutionMapSetValue != undefined){
		pollutionMapSetValue.close();
	}
	pollutionMapSetValue =  Ext.create("krf_new.view.east.PollutionMapSetValue", {
		x: $KRF_APP.getDesktopWindow($KRF_WINS.KRF.MAP.id).getWidth() - 261,
		pollvalue: value,
		async: false		
	});
	
	Ext.getCmp('center_container').add(pollutionMapSetValue);
	
	var year = Ext.getCmp("setPollutionYear").value;
	var colName = Ext.getCmp("setPollutionItems").value;
	
	
	var catPollutionOnOff = $("#catPollutionOnOff_0"+value);
	var corMap = GetCoreMap();
	
	pollutionCatLayerClear();
	// 주제도 레이어 클리어
	tmCatLayerClear();
	
	if(catPollutionOnOff[0] != undefined){
	
		// 주제도 레이어 클리어
		var imgSrc = catPollutionOnOff[0].src;
		
		if((onOff == undefined && imgSrc.indexOf("_on.") > -1) || onOff == "off"){
			pollutionMapSetValue.close();
			// 집수구역 버튼 Off
			var currCtl = SetBtnOnOff("btnAreaLayer", "on");
			$KRF_APP.coreMap._krad.areaGrpLayer.setVisibility(true);
			
			catPollutionOnOff[0].src = imgSrc.replace("_on.", "_off.");
			/*// 주제도 레이어 클리어
			pollutionCatLayerClear();*/
		}
		else if((onOff == undefined && imgSrc.indexOf("_off.") > -1) || onOff == "on"){
			
			// 부하량 레이어 off
			catTMLayerOnOff("off");
			for(var i = 1 ; i <= 7 ;i++){
				if($("#catPollutionOnOff_0"+i)[0] != undefined){
					$("#catPollutionOnOff_0"+i)[0].src = imgSrc.replace("_on.", "_off.");
				}
			}
			
			pollutionMapSetValue.show();
			// 집수구역 버튼 Off
			var currCtl = SetBtnOnOff("btnAreaLayer", "off");
			$KRF_APP.coreMap._krad.areaGrpLayer.setVisibility(false);
			
			catPollutionOnOff[0].src = imgSrc.replace("_off.", "_on.");
			// 주제도 레이어 보이기
			showCatPollutionLayer("", colName,value,year);
		}
	}
}

catTMLayerOnOff = function(onOff){
	
	var pollMapSetValue = Ext.getCmp("pollMapSetValue");
	if(pollMapSetValue == undefined){
		pollMapSetValue =  Ext.create("krf_new.view.east.PollMapSetValue", {
			x: Ext.getBody().getWidth() - 261
		});
		Ext.getCmp('center_container').add(pollMapSetValue);
//		pollMapSetValue.show();
	}
	
	var cboTMYear = Ext.getCmp("setPollYear");
	var year = cboTMYear.value;
	var cboTMSelect = Ext.getCmp("setPollItems");
	var colName = cboTMSelect.value;
	
	var catTMOnOff = $("#catTMOnOff");
	var corMap = GetCoreMap();
	if(catTMOnOff[0] != undefined){
	
		// 주제도 레이어 클리어
		pollutionCatLayerClear();
		// 주제도 레이어 클리어
		tmCatLayerClear();
		
		var imgSrc = catTMOnOff[0].src;
		
		if((onOff == undefined && imgSrc.indexOf("_on.") > -1) || onOff == "off"){
			
			pollMapSetValue.close();
			
			// 집수구역 버튼 Off
			var currCtl = SetBtnOnOff("btnAreaLayer", "on");
			$KRF_APP.coreMap._krad.areaGrpLayer.setVisibility(true);
			
			catTMOnOff[0].src = imgSrc.replace("_on.", "_off.");
			
			/*// 주제도 레이어 클리어
			tmCatLayerClear();*/
		}
		else if((onOff == undefined && imgSrc.indexOf("_off.") > -1) || onOff == "on"){
			
			pollutionLayerOnOff("off", undefined)
			
			pollMapSetValue.show();
			
			for(var i = 1 ; i <= 7 ;i++){
				if($("#catPollutionOnOff_0"+i)[0] != undefined){
					$("#catPollutionOnOff_0"+i)[0].src = imgSrc.replace("_on.", "_off.");
				}
			}
			
			
			// 집수구역 버튼 Off
			var currCtl = SetBtnOnOff("btnAreaLayer", "off");
			$KRF_APP.coreMap._krad.areaGrpLayer.setVisibility(false);
			
			catTMOnOff[0].src = imgSrc.replace("_off.", "_on.");
			
			/*// 주제도 레이어 클리어
			tmCatLayerClear();*/
			// 주제도 레이어 보이기
			showCatTMLayer(year, colName);
		}
	}
}

// 집수구역별 주제도 보여주기
showCatTMLayer = function(year, colName){
	
	var coreMap = GetCoreMap();
	
	var arrAreaGrp = coreMap.reachLayerAdmin_v3_New.arrAreaGrp;
	var inStrCatDids = "";
	
	for(var i = 0; i < arrAreaGrp.length; i++){
		
		inStrCatDids += "'" + arrAreaGrp[i].attributes.CAT_DID + "', ";
	}
	
	if(inStrCatDids.length > 0){
		
		inStrCatDids = inStrCatDids.substring(0, inStrCatDids.length -2);
	}
	
	if(coreMap.tmLayerAdmin == undefined || coreMap.tmLayerAdmin == null){
		
		coreMap.tmLayerAdmin = Ext.create("krf_new.view.map.TMLayerAdmin");
	}
	
	// 집수구역별 주제도 레이어 그리기 함수 호출
	coreMap.tmLayerAdmin.drawTMCatLayer(inStrCatDids, year, colName, "pollLoad");
}

//집수구역별 주제도 보여주기
showCatPollutionLayer = function(year, colName, value, year){
	
	var arrAreaGrp = [];
	
	if($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution.length > 0){
		for(var a = 0; a < $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution.length ;a++){
			if(Number($KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution[a][0]) == value){
				arrAreaGrp = $KRF_APP.coreMap.reachLayerAdmin_v3_New.arrAreaPollution[a][1][0];
			}
		}
	}
	
	var inStrCatDids = "";
	
	for(var i = 0; i < arrAreaGrp.length; i++){
		inStrCatDids += "'" + arrAreaGrp[i].data.CAT_DID + "', ";
	}
	
	if(inStrCatDids.length > 0){
		inStrCatDids = inStrCatDids.substring(0, inStrCatDids.length -2);
	}
	
	if($KRF_APP.coreMap.pollutionLayerAdmin == undefined || $KRF_APP.coreMap.pollutionLayerAdmin == null){
		$KRF_APP.coreMap.pollutionLayerAdmin = Ext.create("krf_new.view.map.PollutionLayerAdmin");
	}
	$KRF_APP.coreMap.pollutionLayerAdmin.drawTMCatLayer(inStrCatDids, year , colName, value);
}

//집수구역별 주제도 보여주기


// 총량단위유역별 주제도 보여주기
showTmdlTMLayer = function(){
	
	var coreMap = GetCoreMap();
	
	// 총량단위유역별 주제도 레이어 그리기 함수 호출
	coreMap.TMLayerAdmin.drawTMTmdlLayer();
}

// 그래픽 오브젝트에서 센터 포인트 가져오기
getCenterFromGraphic = function(graphic){
	
	var centerPoint = null;
	
	switch(graphic.geometry.type){
		case "point":
			centerPoint = graphic.geometry;
			break;
		case "extent":
			centerPoint = graphic.getCenter();
			break;
		default:
			centerPoint = graphic.geometry.getExtent().getCenter();
	}
	
	return centerPoint;
}

// 집수구역별 해당 범위의 색상 가져오기
getCatRangeColor = function(range){
	
	var color = "";
	
	/*switch(range){
    
	    case 0:
	    	color = "#FFFFCC";
	    	break;
	    case 1:
	    	color = "#FFEDA0";
	    	break;
	    case 2:
	    	color = "#FED976";
	    	break;
	    case 3:
	    	color = "#FED24C";
	    	break;
	    case 4:
	    	color = "#FD8D3C";
	    	break;
	    case 5:
	    	color = "#FC4E2A";
	    	break;
	    case 6:
	    	color = "#E31A1C";
	    	break;
	    case 7:
	    	color = "#B10026";
	    	break;
	}*/
	
	switch(range){
    
    case 0:
    	color = "#FFFFCC";
    	break;
    case 1:
    	color = "#FFF4B4";
    	break;
    case 2:
    	color = "#FFEDA0";
    	break;
    case 3:
    	color = "#FFE282";
    	break;
    case 4:
    	color = "#FED976";
    	break;
    case 5:
    	color = "#FED24C";
    	break;
    case 6:
    	color = "#FEBE5A";
    	break;
    case 7:
    	color = "#FEA043";
    	break;
    case 8:
    	color = "#FD8D3C";
    	break;
    case 9:
    	color = "#FD6E32";
    	break;
    case 10:
    	color = "#FC4E2A";
    	break;
    case 11:
    	color = "#F0322D";
    	break;
    case 12:
    	color = "#E31A1C";
    	break;
    case 13:
    	color = "#C80D32";
    	break;
    case 14:
    	color = "#B10026";
    	break;
}
    
    return color;
}

getCatRangeBarSrc = function(range){
	
	var src = "";
	
	switch(range){
    
	    case 0:
	    	src = "./resources/images/tmSymbols/barSymbol_1.gif";
	    	break;
	    case 1:
	    	src = "./resources/images/tmSymbols/barSymbol_2.gif";
	    	break;
	    case 2:
	    	src = "./resources/images/tmSymbols/barSymbol_3.gif";
	    	break;
	    case 3:
	    	src = "./resources/images/tmSymbols/barSymbol_4.gif";
	    	break;
	    case 4:
	    	src = "./resources/images/tmSymbols/barSymbol_5.gif";
	    	break;
	    case 5:
	    	src = "./resources/images/tmSymbols/barSymbol_6.gif";
	    	break;
	    case 6:
	    	src = "./resources/images/tmSymbols/barSymbol_7.gif";
	    	break;
	    case 7:
	    	src = "./resources/images/tmSymbols/barSymbol_8.gif";
	    	break;
	}
	
	return src;
}

// 집수구역별 해당 범위의 원 반지름 가져오기
getCatRangeRadius = function(range){
	
	var radius = 0;
	
    switch(range){
    
        case 0:
        	radius = 500;
        	break;
        case 1:
        	radius = 1000;
        	break;
        case 2:
        	radius = 1500;
        	break;
        case 3:
        	radius = 2000;
        	break;
        case 4:
        	radius = 3000;
        	break;
    }
    
    var coreMap = GetCoreMap();
	var mapLevel = coreMap.map.getLevel();
	
	/*if(mapLevel <= 12){
		
		radius = radius / 2;
	}*/
    
    return radius / 2;
}

tmCatPolygonOnOff = function(){
	
	var coreMap = GetCoreMap();
	
	if(coreMap.tmLayerAdmin.tmGraphicLayerCat.visible == true){
		
		coreMap.tmLayerAdmin.tmGraphicLayerCat.setVisibility(false);
	}
	else{
		
		coreMap.tmLayerAdmin.tmGraphicLayerCat.setVisibility(true);
	}
}

tmCatSymbolOnOff = function(){
	
	var coreMap = GetCoreMap();
	
	if(coreMap.tmLayerAdmin.circleGraphicLayer.visible == true){
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(false);
	}
	else if(coreMap.tmLayerAdmin.barImgGraphicLayer.visible == true){
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(true);
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(false);
	}
	else{
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(true);
	}
}

tmCatLabelOnOff = function(){
	
	var coreMap = GetCoreMap();
	
	if(coreMap.tmLayerAdmin.tmLabelLayerCat.visible == true){
		
		coreMap.tmLayerAdmin.tmLabelLayerCat.setVisibility(false);
	}
	else{
		
		coreMap.tmLayerAdmin.tmLabelLayerCat.setVisibility(true);
	}
}

tmCatLayerClear = function(){
	
	var coreMap = GetCoreMap();
	if(coreMap.tmLayerAdmin != undefined && coreMap.tmLayerAdmin.tmGraphicLayerCat != undefined){
		
		coreMap.tmLayerAdmin.tmGraphicLayerCat.setVisibility(false);
		coreMap.tmLayerAdmin.tmGraphicLayerCat.clear();
		
		// 클리어시 setVisibility
		coreMap.tmLayerAdmin.barImgGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.barImgGraphicLayer.clear();
		
		coreMap.tmLayerAdmin.circleGraphicLayer.setVisibility(false);
		coreMap.tmLayerAdmin.circleGraphicLayer.clear();
		
		coreMap.tmLayerAdmin.tmLabelLayerCat.setVisibility(false);
		coreMap.tmLayerAdmin.tmLabelLayerCat.clear();
		
		var legendWindow = Ext.getCmp("tmLegendWindow");
		//console.info(legendWindow);
		if(legendWindow != undefined){
			legendWindow.close();
		}
	}
}

pollutionCatLayerClear = function(){
	
	var coreMap = GetCoreMap();
	if(coreMap.pollutionLayerAdmin != undefined && coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat != undefined){
		
		coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.setVisibility(false);
		coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.clear();
		
		// 클리어시 setVisibility
		coreMap.pollutionLayerAdmin.pollutionbarImgGraphicLayer.setVisibility(false);
		coreMap.pollutionLayerAdmin.pollutionbarImgGraphicLayer.clear();
		
		coreMap.pollutionLayerAdmin.circleGraphicLayer.setVisibility(false);
		coreMap.pollutionLayerAdmin.circleGraphicLayer.clear();
		
		coreMap.pollutionLayerAdmin.pollutionLabelLayerCat.setVisibility(false);
		coreMap.pollutionLayerAdmin.pollutionLabelLayerCat.clear();
		
		var legendWindow = Ext.getCmp("tmLegendWindow");
		//console.info(legendWindow);
		if(legendWindow != undefined){
			legendWindow.close();
		}
	}
}

paddingLeft = function(padString, length, value){
	
	var retVal = "";
	
	for(var i = value.length; i < length; i++){
		
		retVal += padString;
	}
	
	retVal += value;
	
	return retVal;
}

//부하량 검색결과
PollLoadSearchResult = function(value){


		var rchMap = GetCoreMap();
		var tmpAreaGrp = rchMap.reachLayerAdmin_v3_New.arrAreaGrp;
		
		var catDid = [];
		
		
		if(tmpAreaGrp != null){
			for(i = 0; i < tmpAreaGrp.length;i++){
				catDid.push(tmpAreaGrp[i].attributes.CAT_DID);
			}
		}
		
		if(catDid.length == 0){
			return;
		}
		
		
		
	
		if(value == ""){
			value = "11";
		}
	
		var options = {
				id: 'searchResultTab',
				//title: '결과탭1',
				header: false
		};
		var searchResultTab = GetTabControl(options);
		var tab = searchResultTab.items.items[1];
		//2016-08-24 리치검색시 방유량 그리드 생성
		var pollOptions = {
				//id: "searchResultContainer",
				id: "searchResultPollLoad_container",
				title: '부하량',
				autoResize: true
		};
		
		
		var pollgrdContainer = undefined; //재검색 초기화
		pollgrdContainer = Ext.getCmp("searchResultPollLoad_container");
		
		
		if(pollgrdContainer == null || pollgrdContainer == undefined){
			pollgrdContainer = Ext.create("krf_new.view.south.SearchResultGrid_PollLoad_Result", pollOptions);
			tab.insert(1, pollgrdContainer);
		}
		tab.setActiveTab("searchResultPollLoad_container");
		
		
		var pollgrdCtl = pollgrdContainer.items.items[0]; // 그리드 컨테이너
		pollgrdCtl = pollgrdCtl.items.items[0]; // 그리드 컨트롤
		
		var pollstore = Ext.create("krf_new.store.south.SearchPollLoadResultGrid",{
			selectValue: value,
			catDid: catDid
		});
		
		
		
		pollgrdCtl.setStore(pollstore);
		
		//hidden 처리
		if(value == "11" ){
			pollgrdCtl.columns[3].setHidden(true);
			pollgrdCtl.columns[4].setHidden(true);
			pollgrdCtl.columns[5].setHidden(true);
			pollgrdCtl.columns[6].setHidden(true);
		}else if(value == "22"){
			pollgrdCtl.columns[3].setHidden(true);
			pollgrdCtl.columns[4].setHidden(true);
			pollgrdCtl.columns[5].setHidden(true);
			pollgrdCtl.columns[6].setHidden(false);
		}else if(value == "33"){
			pollgrdCtl.columns[3].setHidden(false);
			pollgrdCtl.columns[4].setHidden(true);
			pollgrdCtl.columns[5].setHidden(true);
			pollgrdCtl.columns[6].setHidden(false);
		}else{
			pollgrdCtl.columns[3].setHidden(false);
			pollgrdCtl.columns[4].setHidden(false);
			pollgrdCtl.columns[5].setHidden(false);
			pollgrdCtl.columns[6].setHidden(false);
		}
		
	
}



PollutionSearchResult = function(value,recordId,title,storeNm,year){
	
	
	var coreMap = GetCoreMap();
	
	var catDid = [];
	//console.info(coreMap.reachLayerAdmin_v3_New.arrAreaPollution);
	//console.info(coreMap.reachLayerAdmin_v3_New.arrAreaPollution[0]);
    if(coreMap.reachLayerAdmin_v3_New.arrAreaPollution[recordId.substring(11,12)-1][1][0].length > 0){
         for(var i = 0 ; i < coreMap.reachLayerAdmin_v3_New.arrAreaPollution[recordId.substring(11,12)-1][1][0].length ;i++){
             catDid.push(coreMap.reachLayerAdmin_v3_New.arrAreaPollution[recordId.substring(11,12)-1][1][0][i].data.CAT_DID);
		}
	}
	
	var options = {
			id: 'searchResultTab',
			//title: '결과탭1',
			header: false
	};
	var searchResultTab = GetTabControl(options);
	var tab = searchResultTab.items.items[1];
	//2016-08-24 리치검색시 방유량 그리드 생성
	
	var pollutionOptions = {
			id: "searchResult"+recordId+"_container",
			title: title+"　",
			recordId:recordId,
			storeNm:storeNm,
			autoResize: true
	};
	
	var pollutiongrdContainer = undefined; //재검색 초기화
	pollutiongrdContainer = Ext.getCmp("searchResult"+recordId+"_container");


	if(pollutiongrdContainer == null || pollutiongrdContainer == undefined){
		pollutiongrdContainer = Ext.create("krf_new.view.south.pollution.SearchResultGrid_"+recordId, pollutionOptions);
		tab.insert(1, pollutiongrdContainer);
	}
	tab.setActiveTab("searchResult"+recordId+"_container");
	
	
	var pollutiongrdCtl = pollutiongrdContainer.items.items[0]; // 그리드 컨테이너
	pollutiongrdCtl = pollutiongrdCtl.items.items[0]; // 그리드 컨트롤
	
	
	var	pollutionstore = Ext.create("krf_new.store.east."+storeNm,{
			catDid : catDid,
			selectValue: value,
			year: year
		});
	

	pollutiongrdCtl.setStore(pollutionstore);
	
	pollutionstore.load();
	
	
	
	if(value != ""){
		if(recordId == "pollution_01"){
			for(var k = 0 ;k<pollutiongrdCtl.columns.length;k++){
				pollutiongrdCtl.columns[k].setHidden(false);
			}
			
			
			if(value == "11" ){
				for(var i = 7; i <= 41 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
			}else if(value == "22"){
				for(var i = 4; i <= 12 ;i++){
					
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[14].setHidden(true);
				pollutiongrdCtl.columns[16].setHidden(true);
				pollutiongrdCtl.columns[19].setHidden(true);
				
			}else if(value == "33"){
				for(var i = 4; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 8; i <= 12 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[14].setHidden(true);
				pollutiongrdCtl.columns[16].setHidden(true);
				pollutiongrdCtl.columns[19].setHidden(true);
			}else{
				for(var i = 4; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 10; i <= 12 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[14].setHidden(true);
				pollutiongrdCtl.columns[16].setHidden(true);
				pollutiongrdCtl.columns[19].setHidden(true);
			}
		}else if(recordId == "pollution_02"){
			for(var k = 0 ;k<pollutiongrdCtl.columns.length;k++){
				pollutiongrdCtl.columns[k].setHidden(false);
			}
			
			
			if(value == "11" ){
				
				for(var i = 4; i <= 7 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 10; i <= 42 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
			}else if(value == "22"){
				for(var i = 4; i <= 7 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[10].setHidden(true);
				for(var i = 12; i <= 16 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 18; i <= 19 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 21; i <= 22 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 24; i <= 27 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				pollutiongrdCtl.columns[29].setHidden(true);
				pollutiongrdCtl.columns[31].setHidden(true);
				pollutiongrdCtl.columns[33].setHidden(true);
				pollutiongrdCtl.columns[35].setHidden(true);
				pollutiongrdCtl.columns[37].setHidden(true);
				pollutiongrdCtl.columns[38].setHidden(true);
				pollutiongrdCtl.columns[42].setHidden(true);
			}else if(value == "33"){
				for(var i = 5; i <= 7 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[10].setHidden(true);
				for(var i = 12; i <= 16 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 18; i <= 19 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 21; i <= 22 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 24; i <= 27 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				pollutiongrdCtl.columns[29].setHidden(true);
				pollutiongrdCtl.columns[31].setHidden(true);
				pollutiongrdCtl.columns[33].setHidden(true);
				pollutiongrdCtl.columns[35].setHidden(true);
				pollutiongrdCtl.columns[37].setHidden(true);
				pollutiongrdCtl.columns[38].setHidden(true);
				pollutiongrdCtl.columns[42].setHidden(true);
			}else{
				
				pollutiongrdCtl.columns[7].setHidden(true);
				pollutiongrdCtl.columns[10].setHidden(true);
				for(var i = 12; i <= 16 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 18; i <= 19 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 21; i <= 22 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 24; i <= 27 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				pollutiongrdCtl.columns[29].setHidden(true);
				pollutiongrdCtl.columns[31].setHidden(true);
				pollutiongrdCtl.columns[33].setHidden(true);
				pollutiongrdCtl.columns[35].setHidden(true);
				pollutiongrdCtl.columns[37].setHidden(true);
				pollutiongrdCtl.columns[38].setHidden(true);
				pollutiongrdCtl.columns[42].setHidden(true);
				
			}
		}else if(recordId == "pollution_03"){
			for(var k = 0 ;k<pollutiongrdCtl.columns.length;k++){
				pollutiongrdCtl.columns[k].setHidden(false);
			}
			
			
			if(value == "11" ){
				
				for(var i = 4; i <= 14 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 16; i <= 70 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 72; i <= 174 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
			}else if(value == "22"){
				for(var i = 4; i <= 14 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 16; i <= 70 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 78; i <= 174 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
			}else if(value == "33"){
				for(var i = 5; i <= 14 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 16; i <= 70 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 78; i <= 174 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else{
				for(var i = 7; i <= 14 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 16; i <= 70 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 78; i <= 174 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}
		}else if(recordId == "pollution_04"){
			for(var k = 0 ;k<pollutiongrdCtl.columns.length;k++){
				pollutiongrdCtl.columns[k].setHidden(false);
			}
			
			
			if(value == "11" ){
				
				for(var i = 4; i <= 8 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 9; i <= 37 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
			}else if(value == "22"){
				
				for(var i = 4; i <= 7 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
			}else if(value == "33"){
				for(var i = 5; i <= 7 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else{
				pollutiongrdCtl.columns[6].setHidden(true);
			}
		}else if(recordId == "pollution_05"){
			for(var k = 0 ;k<pollutiongrdCtl.columns.length;k++){
				pollutiongrdCtl.columns[k].setHidden(false);
			}
			
			if(value == "11" ){
				
				for(var i = 4; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
				for(var i = 11; i <= 34 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				
			}else if(value == "22"){
				
				for(var i = 4; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[11].setHidden(true);
				for(var i = 13; i <= 15 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 17; i <= 19 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 21; i <= 23 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 25; i <= 27 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 29; i <= 31 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 33; i <= 34 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else if(value == "33"){
				for(var i = 5; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[11].setHidden(true);
				for(var i = 13; i <= 15 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 17; i <= 19 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 21; i <= 23 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 25; i <= 27 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 29; i <= 31 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 33; i <= 34 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else{
				pollutiongrdCtl.columns[11].setHidden(true);
				for(var i = 13; i <= 15 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 17; i <= 19 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 21; i <= 23 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 25; i <= 27 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 29; i <= 31 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 33; i <= 34 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}
		}else if(recordId == "pollution_06"){
			for(var k = 0 ;k<pollutiongrdCtl.columns.length;k++){
				pollutiongrdCtl.columns[k].setHidden(false);
			}
			
			
			if(value == "11" ){
				
				for(var i = 4; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				pollutiongrdCtl.columns[8].setHidden(true);
				for(var i = 11; i <= 18 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else if(value == "22"){
				
				for(var i = 4; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else if(value == "33"){
				for(var i = 5; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else{
				
			}
		}else if(recordId == "pollution_07"){
			for(var k = 0 ;k<pollutiongrdCtl.columns.length;k++){
				pollutiongrdCtl.columns[k].setHidden(false);
			}
			
			
			if(value == "11" ){
				for(var i = 4; i <= 12 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else if(value == "22"){
				for(var i = 4; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 9; i <= 11 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else if(value == "33"){
				for(var i = 5; i <= 6 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
				for(var i = 9; i <= 11 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}else{
				for(var i = 9; i <= 11 ;i++){
					pollutiongrdCtl.columns[i].setHidden(true);
				}
			}
		}
	}
	
	

}