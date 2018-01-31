/**
 * 최초 작성일 2015.10.28
 * 최조 작성자 박성하
 */
	//mouseover 일때 class 적용
	//classOn 일때 계속 new Array를 만드는게 아닐까? 
	function classOn(id){
		var btnArea = window.document.getElementById("btnArea");
		var aTags = btnArea.getElementsByTagName("a");
		
		var btn = new Array(aTags.length);
		
		for (var j = 0; j < btn.length; j++) {
			btn[j] = aTags[j].id;
		}
		
		for (var i = 0; i < btn.length; i++) {
			
			if(btn[i] == id){
				document.getElementById(id).setAttribute("class", "on");		
			} else {
				document.getElementById(btn[i]).setAttribute("class", "");
			}
		}
		
		
	}
	
	//mouseover 일때 class 적용
	function classOff(id){
		document.getElementById(id).setAttribute("class", "");
	}
	
	/**
	 * 인자를 받아와서 loop를 돌면서 치환할 문자가 있는지 확인후 넘겨준다.
	 * url Encoding 을 사용하기 때문에 엔터값만 처리를 해주게 변경
	 * @param val
	 * @returns {String}
	 */
	function checkCharater(val){
		
		var converted = '';
		
//		for (var i = 0; i < val.length; i++) {
//			converted += convertChar(val.charAt(i));
//		}
		for (var i = 0; i < val.length; i++) {
			if(val.charCodeAt(i) == '10'){
				converted += convertChar(val.charCodeAt(i));
			} else {
				converted += convertChar(val.charAt(i));
			}
		}
		return converted;
		
	}
	
	/**
	 * 인자를 받아와서 filter배열에 있는 문자열이면 replaceChar배열에 있는 문자로 치환하여 넘겨준다.
	 * & ~ \r 까지의 부분은 URLEncoding으로 사용하지 않음.
	 * @param val
	 * @returns
	 */
	function convertChar(val){
		var filter = new Array("&","<",">","'","\"","|" ," " ,"\r","10");
		var replaceChar = new Array("&amp;", "&lt;", "&gt;", "\\'", "&quot;", "&brvbar;", "&nbsp;", "","<br>");
		
		for (var j = 0; j < filter.length; j++) {
			if(filter[j] == val){
				val = replaceChar[j];
			}
		}
		
		return val;
	}
	
