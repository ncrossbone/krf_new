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
	
	sql = "SELECT * FROM KRF_MAP_VALUE_V_A001";
		
   //out.print(sql);
   
	stmt = con.createStatement();
	rs = stmt.executeQuery(sql);
	
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr_BOD = new JSONArray();
	JSONArray jsonArr_COD = new JSONArray();
	JSONArray jsonArr_DOC = new JSONArray();
	JSONArray jsonArr_TN = new JSONArray();
	JSONArray jsonArr_TP = new JSONArray();
	JSONArray jsonArr_TEMP = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
			
			jsonRecord = new JSONObject();
	
			//jsonRecord.put("parentId", parentId);
			jsonRecord.put("GUBUN", rs.getString("GUBUN"));
	  		jsonRecord.put("PT_NO", rs.getString("PT_NO"));
	  		jsonRecord.put("VAL", rs.getString("VAL"));
	  		
	  		if(rs.getString("GUBUN").equals("ITEM_BOD"))
	  			jsonArr_BOD.add(jsonRecord);
	  		if(rs.getString("GUBUN").equals("ITEM_COD"))
	  			jsonArr_COD.add(jsonRecord);
	  		if(rs.getString("GUBUN").equals("ITEM_DOC"))
	  			jsonArr_DOC.add(jsonRecord);
	  		if(rs.getString("GUBUN").equals("ITEM_TN"))
	  			jsonArr_TN.add(jsonRecord);
	  		if(rs.getString("GUBUN").equals("ITEM_TP"))
	  			jsonArr_TP.add(jsonRecord);
	  		if(rs.getString("GUBUN").equals("ITEM_TEMP"))
	  			jsonArr_TEMP.add(jsonRecord);
	  		
	}

	jsonObj.put("bodDatas", jsonArr_BOD);
	jsonObj.put("codDatas", jsonArr_COD);
	jsonObj.put("docDatas", jsonArr_DOC);
	jsonObj.put("tnDatas", jsonArr_TN);
	jsonObj.put("tpDatas", jsonArr_TP);
	jsonObj.put("tempDatas", jsonArr_TEMP);
   
	out.print(jsonObj);

}catch(Exception ex){
	
	System.out.println(sql);
	System.out.println(ex);
	out.print("error");
	
} 
%>
<%@ include file="dbClose.jsp" %>