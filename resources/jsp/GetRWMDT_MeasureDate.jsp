<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/
try{
	sql="SELECT WMCYM || ' ' || WEEK || '주차' AS WMCYMW " +
		  "FROM ( " +
				  "SELECT DISTINCT TO_CHAR(TO_DATE(replace(B.WMCYMD, '.', '')), 'YYYY-MM') AS WMCYM " + 
				       ", CEIL((TO_CHAR(TO_DATE(REPLACE(B.WMCYMD, '.', ''), 'YYYYMMDD'), 'DD') + 7 - TO_CHAR(TO_DATE(REPLACE(B.WMCYMD, '.', ''), 'YYYYMMDD') - 1, 'D')) / 7) AS WEEK " +
				    "from AG_RWMDTI_NEW_DRONE A " +
				       ", AG_RWMDTD_DRONE B " +
				   "where A.PT_NO = B.PT_NO " +
				     "AND A.WMYR  = B.WMYR " +
				     "AND A.WMOD  = B.WMOD " +
				     "AND A.WMWK  = B.WMWK " +
			  ") " +
		"ORDER BY WMCYM || ' ' || WEEK || '주차'";
   
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();	 
		
		jsonRecord.put("WMCYMW" 				, rs.getString("WMCYMW")); 
  		
  		jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("data", jsonArr);
   
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>