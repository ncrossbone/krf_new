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
	
	//댐관측소
	
	sql = " WITH TMP_TBL AS (																																																												";
	sql += " SELECT RANK() OVER(PARTITION BY A.DMOBSCD, ITEM_NAME ORDER BY A.DMOBSCD, YMD DESC) AS RN                                                 ";
	sql += "      , OBSNM AS PT_NM                                                                                                                    ";
	sql += "      , A.DMOBSCD PT_NO                                                                                                                   ";
	sql += "      , SUBSTR(YMD, 1, 4)||'.'||SUBSTR(YMD, 5, 2 )||'.'||SUBSTR(YMD, 7, 2) AS WMCYMD                                                      ";
	sql += "      , ITEM_NAME                                                                                                                         ";
	sql += "      , ITEM_VALUE                                                                                                                        ";
	sql += "   FROM (                                                                                                                                 ";
	sql += "         SELECT DMOBSCD, YMD, TRIM('SWL ') AS ITEM_NAME, ROUND(AVG(SWL)/1, 3)   AS ITEM_VALUE FROM DMDY GROUP BY DMOBSCD, YMD UNION ALL   ";
	sql += "         SELECT DMOBSCD, YMD, TRIM('INF ') AS ITEM_NAME, ROUND(AVG(INF)/1 , 3)  AS ITEM_VALUE FROM DMDY GROUP BY DMOBSCD, YMD UNION ALL   ";
	sql += "         SELECT DMOBSCD, YMD, TRIM('OTF ') AS ITEM_NAME, ROUND(AVG(OTF)/1, 3)   AS ITEM_VALUE FROM DMDY GROUP BY DMOBSCD, YMD UNION ALL   ";
	sql += "         SELECT DMOBSCD, YMD, TRIM('SFW ') AS ITEM_NAME, ROUND(AVG(SFW)/1, 3)   AS ITEM_VALUE FROM DMDY GROUP BY DMOBSCD, YMD UNION ALL   ";
	sql += "         SELECT DMOBSCD, YMD, TRIM('ECPC') AS ITEM_NAME, ROUND(AVG(ECPC)/1, 3)  AS ITEM_VALUE FROM DMDY GROUP BY DMOBSCD, YMD             ";
	sql += "        ) A                                                                                                                               ";
	sql += "      , DMOBSIF B                                                                                                                         ";
	sql += "  WHERE A.DMOBSCD = B.DMOBSCD                                                                                                             ";
	if(defaultChart.equals("0")){
	/* if(defaultChart.equals("1")){
		sql += "    AND SUBSTR(A.YMD, 1, 6) >='201501'                                                                                                    ";
		sql += "    AND SUBSTR(A.YMD, 1, 6) <='201510'                                                                                                    ";
	}else{
	 */	sql += "    AND SUBSTR(A.YMD, 1, 6) >='"+startDate+"'                                                                                                    ";
		sql += "    AND SUBSTR(A.YMD, 1, 6) <='"+endDate+"'                                                                                                    ";
	}
	sql += "    AND A.DMOBSCD = '"+recordId+"'                                                                                                             ";
	sql += "    AND ITEM_NAME = '"+selectItem+"'                                                                                                                ";
	sql += "    AND ITEM_VALUE IS NOT NULL       ";
	sql += "  ORDER BY A.DMOBSCD, WMCYMD ASC)                                                                                                         ";
	sql += " SELECT *                                                                                                                                 ";
	sql += "   FROM TMP_TBL                                                                                                                           ";
	sql += "  WHERE RN <= 10                                                                                                                          ";
	sql += " UNION ALL                                                                                                                                ";
	sql += " SELECT 999, '', '', '', ''                                                                                                               ";
	sql += "      , MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                                                                            ";
	sql += "   FROM TMP_TBL                                                                                                                           ";
	if(defaultChart.equals("1")){
		sql += "  WHERE RN <= 10                                                                                                                          ";
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
  		
  		/* jsonRecord.put("OTF" 	, rs.getString("OTF"));
  		jsonRecord.put("SFW" 	, rs.getString("SFW"));
  		jsonRecord.put("ECPC" 	, rs.getString("ECPC")); */
  		
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