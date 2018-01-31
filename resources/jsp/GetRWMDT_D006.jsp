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
	//String siteCodes = request.getParameter("siteCodes");
	//String measureDate = request.getParameter("measureDate");
	//String layerDate = request.getParameter("layerDate");   recordId
	//recordYear
	
	String recordId = request.getParameter("recordId");
	
	String a = request.getParameter("recordYear");
	String b = request.getParameter("recordYear2"); //defaultCheck
	
	String c = request.getParameter("recordMonth");
	String d = request.getParameter("recordMonth2");
	
	String startDate = a+c;
	String endDate = b+d;
		
	String defaultChart = request.getParameter("defaultChart");
	
	String selectItem = request.getParameter("selectItem");
	
	//지상기상관측소
	
	sql = " WITH TMP_TBL AS (																																									";
	sql += " SELECT RANK() OVER(PARTITION BY OBSNMENG||ITEM_NAME ORDER BY OBSNMENG, TM DESC) AS RN              ";
	sql += "      , TM AS WMCYMD                                                                                ";
	sql += "      , E.OBSNMENG AS PT_NO                                                                         ";
	sql += "      , STN_NM AS PT_NM                                                                             ";
	sql += "      , ITEM_NAME                                                                                   ";
	sql += "      , MAX(ITEM_VALUE) AS ITEM_VALUE                                                               ";
	sql += "   FROM (SELECT *                                                                                   ";
	sql += "           FROM (                                                                                   ";
	sql += "                 SELECT STN_ID, TM, 'RND' AS ITEM_NAME, RN_DAY AS ITEM_VALUE FROM RNDY UNION ALL ";
	sql += "                 SELECT STN_ID, TM, 'TA'     AS ITEM_NAME, TA     AS ITEM_VALUE FROM RNDY UNION ALL ";
	sql += "                 SELECT STN_ID, TM, 'SIDAY' AS ITEM_NAME, SI_DAY AS ITEM_VALUE FROM RNDY           ";
	sql += "                )                                                                                   ";
	sql += "        ) A                                                                                         ";
	sql += "      , KESTI_RNDY_ST D                                                                             ";
	sql += "      , WTOBSIF E                                                                                   ";
	sql += "  WHERE A.STN_ID = D.STN_ID                                                                         ";
	sql += "    AND A.STN_ID = E.OBSNMENG                                                                       ";
	if(defaultChart.equals("1")){
		sql += "    AND SUBSTR(A.TM, 1, 6) BETWEEN '201410' AND '201510'                                            ";
	}else{
		sql += "    AND SUBSTR(A.TM, 1, 6) BETWEEN '"+startDate+"' AND '"+endDate+"'                                            ";
	}
	sql += "    AND D.STN_ID = '"+recordId+"'                                                                            ";
	sql += "    AND ITEM_NAME = '"+selectItem+"'                                                                        ";
	sql += "    AND ITEM_VALUE IS NOT NULL                                                                      ";
	sql += "  GROUP BY TM, E.OBSNMENG, STN_NM, ITEM_NAME                                                        ";
	sql += "  ORDER BY PT_NO, WMCYMD ASC)                                                                       ";
	sql += " SELECT *                                                                                           ";
	sql += "   FROM (SELECT *                                                                                   ";
	sql += "           FROM TMP_TBL                                                                             ";
	if(defaultChart.equals("1")){
		sql += "          WHERE RN <= 10                                                                        ";
	}
	sql += "        )                                                                                           ";
	sql += " UNION ALL                                                                                          ";
	sql += " SELECT 999 AS RN, '', '', '', '',                                                                  ";
	sql += "   MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                                           ";
	sql += "   FROM TMP_TBL                                                                                     ";
	if(defaultChart.equals("1")){
		sql += "  WHERE RN <= 10                                                                                ";
	}
                             


		
   //out.print(sql);
   //System.out.println(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONArray jsonArrMax = new JSONArray();
	JSONObject jsonRecord = null;
	
	//int cnt = 0;
	while(rs.next()) {
		//cnt++;
		//out.print(cnt);
		jsonRecord = new JSONObject();

  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("ITEM_NAME" 	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE" 	, rs.getString("ITEM_VALUE"));
  		
  		/* jsonRecord.put("RND" 	, rs.getString("RND"));
  		jsonRecord.put("TA" 	, rs.getString("TA"));
  		jsonRecord.put("SIDAY" 	, rs.getString("SIDAY")); */
  		
  		
  		if(rs.getString("RN").equals("999"))
  			jsonArrMax.add(jsonRecord);
  		else
  			jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("maxdata", jsonArrMax);
	jsonObj.put("data", jsonArr);
   //console.info(jsonObj);
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