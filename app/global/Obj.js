/** 전역 변수 클래스
 *  config 속성의 변수를 get, set 메서드로 접근 가능함. (get변수명, set변수명)
 *  get, set 뒤 첫 알파벳은 대문자로 할 것
 *  ex) setGlobalTest(1234), getGlobalTest()
 *  requires: ["KRF.global.Var"], : Ext.application에 한번만 선언하면 됨
 *  참고
 *    - http://jsfiddle.net/prajavk/YhuWT/
 *    - https://wikidocs.net/3384 5.글로벌 변수 사용 */
Ext.define("krf_new.global.Obj", {
	singleton : true, // 요게 있어야 set, get 메서드 사용가능..
	config: {
		globalTest: 0, // 테스트용 변수
		simpleTooltip: null
	},
	showSimpleTooltip: function(text){
		
		var simpleTooltip = this.getSimpleTooltip();
		
		if(simpleTooltip == undefined || simpleTooltip == null){
			simpleTooltip = Ext.create("krf_new.global.SimpleTooltip");
		}
		
		simpleTooltip.setContents(text);
		simpleTooltip.onMousemoveEvt();
		
		this.setSimpleTooltip(simpleTooltip);
	},
	hideSimpleTooltip: function(){
		
		var simpleTooltip = this.getSimpleTooltip();
		
		if(simpleTooltip != undefined && simpleTooltip != null){
			
			simpleTooltip.offMousemoveEvt();
			simpleTooltip.destroy();
			
			this.setSimpleTooltip(null);
		}
	}
});