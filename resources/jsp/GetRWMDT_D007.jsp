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
	
			//보관측소
	
	sql= " WITH TMP_TBL AS (																																																																																																																	";								
	sql+= " SELECT RANK() OVER(PARTITION BY A.BOOBSCD, ITEM_NAME ORDER BY A.BOOBSCD, WMCYMD DESC, WMCYMD_2 DESC) AS RN /* 순번 */                                                                                                                             ";
	sql+= "      , A.BOOBSCD AS PT_NO /* 관측소코드 */                                                                                                                                                                                                        ";
	sql+= "      , OBSNM AS PT_NM /* 관측소명 */                                                                                                                                                                                                              ";
	sql+= "      , TO_CHAR(TO_DATE(WMCYMD||WMCYMD_2, 'YYYYMMDD HH24:MI'), 'YYYY.DD.MM HH24:MI') AS WMCYMD /* 관측일자 */                                                                                                                                      ";
	sql+= "      , ITEM_NAME                                                                                                                                                                                                                                  ";
	sql+= "      , ITEM_VALUE                                                                                                                                                                                                                                 ";
	sql+= "   FROM (                                                                                                                                                                                                                                          ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('SWL   ') AS ITEM_NAME, ROUND(AVG(SWL)/1, 3)    AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('OWL   ') AS ITEM_NAME, ROUND(AVG(OWL)/1, 3)    AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('SFW   ') AS ITEM_NAME, ROUND(AVG(SFW)/1, 3)    AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('ECPC  ') AS ITEM_NAME, ROUND(AVG(ECPC)/1, 3)   AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('INF   ') AS ITEM_NAME, ROUND(AVG(INF)/1, 3)    AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('TOTOTF') AS ITEM_NAME, ROUND(AVG(TOTOTF)/1, 3) AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('EGOTF ') AS ITEM_NAME, ROUND(AVG(EGOTF)/1, 3)  AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('GTOTF ') AS ITEM_NAME, ROUND(AVG(GTOTF)/1, 3)  AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('CBOTF ') AS ITEM_NAME, ROUND(AVG(CBOTF)/1, 3)  AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('FWOTF ') AS ITEM_NAME, ROUND(AVG(FWOTF)/1, 3)  AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6) UNION ALL    ";
	sql+= "         SELECT BOOBSCD, SUBSTR(YMDHM , 1, 6) AS WMCYMD, SUBSTR(YMDHM , 7, 6) AS WMCYMD_2, TRIM('ETCOTF') AS ITEM_NAME, ROUND(AVG(ETCOTF)/1, 3) AS ITEM_VALUE FROM BOMST GROUP BY BOOBSCD, SUBSTR(YMDHM , 1, 6), SUBSTR(YMDHM , 7, 6)              ";
	sql+= "        ) A                                                                                                                                                                                                                                        ";
	sql+= "      , BOOBSIF B                                                                                                                                                                                                                                  ";
	sql+= "  WHERE A.BOOBSCD = B.BOOBSCD                                                                                                                                                                                                                      ";
	if(defaultChart.equals("1")){
		sql+= "    AND WMCYMD >='201510'                                                                                                                                                                                                                          ";
		sql+= "    AND WMCYMD <='201510'                                                                                                                                                                                                                          ";
	}else{
		sql+= "    AND WMCYMD >='"+startDate+"'                                                                                                                                                                                                                          ";
		sql+= "    AND WMCYMD <='"+endDate+"'                                                                                                                                                                                                                          ";
	}
	sql+= "    AND A.BOOBSCD = '"+recordId+"'                                                                                                                                                                                                                      ";
	sql+= "    AND ITEM_NAME = '"+selectItem+"'                                                                                                                                                                                                                          ";
	sql+= "    AND ITEM_VALUE IS NOT NULL       ";
	sql+= "  ORDER BY PT_NO , A.WMCYMD ASC)                                                                                                                                                                                                                   ";
	sql+= " SELECT *                                                                                                                                                                                                                                          ";
	sql+= "   FROM (SELECT *                                                                                                                                                                                                                                  ";
	sql+= "           FROM TMP_TBL                                                                                                                                                                                                                            ";
	if(defaultChart.equals("1")){
		sql+= "          WHERE RN <= 10                                                                                                                                                                                                                           ";
	}
	sql+= "          ORDER BY WMCYMD                                                                                                                                                                                                                          ";
	sql+= "        )                                                                                                                                                                                                                                          ";
	sql+= " UNION ALL                                                                                                                                                                                                                                         ";
	sql+= " SELECT 999, '', '', '', ''                                                                                                                                                                                                                        ";
	sql+= "      , MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                                                                                                                                                                                     ";
	sql+= "   FROM TMP_TBL                                                                                                                                                                                                                                    ";
	if(defaultChart.equals("1")){
		sql+= "  WHERE RN <= 10                                                                                                                                                                                                                                   ";
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
  		
  		/* jsonRecord.put("SWL" 	, rs.getString("SWL"));
  		jsonRecord.put("OWL" 	, rs.getString("OWL"));
  		jsonRecord.put("SFW" 	, rs.getString("SFW"));
  		jsonRecord.put("ECPC" 	, rs.getString("ECPC"));
  		jsonRecord.put("INF" 	, rs.getString("INF"));
  		jsonRecord.put("TOTOTF" 	, rs.getString("TOTOTF"));
  		jsonRecord.put("EGOTF" 	, rs.getString("EGOTF"));
  		jsonRecord.put("GTOTF" 	, rs.getString("GTOTF"));
  		jsonRecord.put("CBOTF" 	, rs.getString("CBOTF"));
  		jsonRecord.put("FWOTF" 	, rs.getString("FWOTF"));
  		jsonRecord.put("ETCOTF" 	, rs.getString("ETCOTF")); */
  		
  		
  		
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