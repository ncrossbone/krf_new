/** 전역 변수 클래스 (탭관련함수)
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("krf_new.global.TabFn", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	config: {
		globalTest: 0 // 테스트용 변수
	},
	conditionCtl: [],
	searchConditionInit: function(gridType, grid){
		
		var conditionCont = Ext.getCmp("tabCondition");
		
		var cmbStartYear = conditionCont.down("#cmbStartYear");
		var cmbStartMonth = conditionCont.down("#cmbStartMonth");
		var cmbStartDay = conditionCont.down("#startDay");
		var cmbStartHour = conditionCont.down("#startTime");
		
		var cmbEndYear = conditionCont.down("#cmbEndYear");
		var cmbEndMonth = conditionCont.down("#cmbEndMonth");
		var cmbEndDay = conditionCont.down("#endDay");
		var cmbEndHour = conditionCont.down("#endTime");
		
		if(gridType == "수질자동측정망"){
			
			cmbStartYear.setValue($KRF_APP.global.CommFn.nowDate.getYear());
			cmbStartMonth.setValue($KRF_APP.global.CommFn.nowDate.getMonth());
			cmbEndYear.setValue($KRF_APP.global.CommFn.nowDate.getYear());
			cmbEndMonth.setValue($KRF_APP.global.CommFn.nowDate.getMonth());
		} else{
			
			cmbStartYear.setValue($KRF_APP.global.CommFn.nowDate.addMonth(-3).year);
			cmbStartMonth.setValue($KRF_APP.global.CommFn.nowDate.addMonth(-3).month);
			cmbEndYear.setValue($KRF_APP.global.CommFn.nowDate.getYear());
			cmbEndMonth.setValue($KRF_APP.global.CommFn.nowDate.getMonth());
		}
		
		cmbStartDay.setValue($KRF_APP.global.CommFn.nowDate.getDay());
		cmbStartHour.setValue("00");
		cmbEndDay.setValue($KRF_APP.global.CommFn.nowDate.getDay());
		cmbEndHour.setValue("23");
		
		grid.searchCondition = {};
		
		grid.searchCondition.startYear = cmbStartYear.getValue();
		grid.searchCondition.startMonth = cmbStartMonth.getValue();
		grid.searchCondition.startDay = cmbStartDay.getValue();
		grid.searchCondition.startHour = cmbStartHour.getValue();
		
		grid.searchCondition.endYear = cmbEndYear.getValue();
		grid.searchCondition.endMonth = cmbEndMonth.getValue();
		grid.searchCondition.endDay = cmbEndDay.getValue();
		grid.searchCondition.endHour = cmbEndHour.getValue();
	},
	/* 검색결과 탭별 조회조건 셋팅 */
	searchConditionCtl: function(grid){

		var conditionCont = Ext.getCmp("tabCondition");
		
		var cmbStartYear = conditionCont.down("#cmbStartYear");
		var cmbStartMonth = conditionCont.down("#cmbStartMonth");
		var cmbStartDay = conditionCont.down("#startDay");
		var cmbStartHour = conditionCont.down("#startTime");
		
		var cmbEndYear = conditionCont.down("#cmbEndYear");
		var cmbEndMonth = conditionCont.down("#cmbEndMonth");
		var cmbEndDay = conditionCont.down("#endDay");
		var cmbEndHour = conditionCont.down("#endTime");
		
		if(grid.searchCondition != undefined){
			
			cmbStartYear.setValue(grid.searchCondition.startYear);
			cmbStartMonth.setValue(grid.searchCondition.startMonth);
			
			cmbEndYear.setValue(grid.searchCondition.endYear);
			cmbEndMonth.setValue(grid.searchCondition.endMonth);
		}
	},
	searchConditionSet: function(grid){
		
		var conditionCont = Ext.getCmp("tabCondition");
		
		var cmbStartYear = conditionCont.down("#cmbStartYear");
		var cmbStartMonth = conditionCont.down("#cmbStartMonth");
		var cmbStartDay = conditionCont.down("#startDay");
		var cmbStartHour = conditionCont.down("#startTime");
		
		var cmbEndYear = conditionCont.down("#cmbEndYear");
		var cmbEndMonth = conditionCont.down("#cmbEndMonth");
		var cmbEndDay = conditionCont.down("#endDay");
		var cmbEndHour = conditionCont.down("#endTime");
		
		grid.searchCondition = {};
		
		grid.searchCondition.startYear = cmbStartYear.getValue();
		grid.searchCondition.startMonth = cmbStartMonth.getValue();
		grid.searchCondition.startDay = cmbStartDay.getValue();
		grid.searchCondition.startHour = cmbStartHour.getValue();
		
		grid.searchCondition.endYear = cmbEndYear.getValue();
		grid.searchCondition.endMonth = cmbEndMonth.getValue();
		grid.searchCondition.endDay = cmbEndDay.getValue();
		grid.searchCondition.endHour = cmbEndHour.getValue();
	},
	setConditionCtl: function(container){
		
		var items = container.items;
		
		if(items != undefined){
			
			var isArray = Array.isArray(items);
			
			if(isArray == true){
				
				for(var i = 0; i < items.length; i++){
					
					if(items[i].xtype != undefined){
						
						if(items[i].xtype == "combo"){
							this.conditionCtl.push(items[i]);
						}
					}
					this.setConditionCtl(items[i]);
				}
			} else{
				if(items.xtype != undefined){
					if(items.xtype == "combo"){
						this.conditionCtl.push(items);
					}
				}
				this.setConditionCtl(items);
			}
		}
	}
});