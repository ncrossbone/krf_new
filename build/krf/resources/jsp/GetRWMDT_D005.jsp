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
	
	//AWS 기상 관측소
	
	sql = " WITH TMP_TBL AS (																																						";			
	sql += " SELECT RANK() OVER(PARTITION BY STNID||ITEM_NAME ORDER BY STNID, WMCYMD DESC) AS RN /* 순번 */                                                                           ";
	sql += "      , STNID   AS PT_NO                                                                                                                                                     ";
	sql += "      , OBSNM   AS PT_NM                                                                                                                                                      ";
	sql += "      , WMCYMD                                                                                                                                                            ";
	sql += "      , ITEM_NAME                                                                                                                                                         ";
	sql += "      , ITEM_VALUE                                                                                                                                                        ";
	sql += "   FROM (                                                                                                                                                                 ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'WD'    AS ITEM_NAME, ROUND(AVG(WD/10), 2)    AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'WS'    AS ITEM_NAME, ROUND(AVG(WS/10), 2)    AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'TA'    AS ITEM_NAME, ROUND(AVG(TA/10), 2)    AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'HM'    AS ITEM_NAME, ROUND(AVG(HM), 2)       AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'PA'    AS ITEM_NAME, ROUND(AVG(PA), 2)       AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'PS'    AS ITEM_NAME, ROUND(AVG(PS), 2)       AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'RNYN'  AS ITEM_NAME, ROUND(AVG(RNYN), 2)     AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'RN1HR' AS ITEM_NAME, ROUND(AVG(RN1HR/10), 2) AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8) UNION ALL   ";
	sql += "         SELECT STNID, SUBSTR(TM, 1, 8) AS WMCYMD, 'RNDAY' AS ITEM_NAME, ROUND(AVG(RNDAY/10), 2) AS ITEM_VALUE FROM WTAWSMST GROUP BY STNID, SUBSTR(TM, 1, 8)             ";
	sql += "        ) A                                                                                                                                                               ";
	sql += "      , WTOBSIF B                                                                                                                                                         ";
	sql += "  WHERE A.STNID = B.WTOBSCD                                                                                                                                               ";
	sql += "    AND OBSTCD = '2'                                                                                                                                                      ";
	sql += "    AND A.STNID = '"+recordId+"'                                                                                                                                              ";
	if(defaultChart.equals("1")){
		sql += "    AND SUBSTR(WMCYMD, 1, 6) BETWEEN '201410' AND '201510'                                                                                                                ";
	}else{
		sql += "    AND SUBSTR(WMCYMD, 1, 6) BETWEEN '"+startDate+"' AND '"+endDate+"'                                                                                                                ";
	}
	sql += "    AND ITEM_NAME = '"+selectItem+"'                                                                                                                                                  ";
	sql += "    AND ITEM_VALUE IS NOT NULL       ";
	sql += " ORDER BY WMCYMD ASC)                                                                                                                                                     ";
	sql += " SELECT *                                                                                                                                                                 ";
	sql += "   FROM (SELECT *                                                                                                                                                         ";
	sql += "           FROM TMP_TBL                                                                                                                                                   ";
	if(defaultChart.equals("1")){
		sql += "          WHERE RN <= 10                                                                                                                                              ";
	}
	sql += "        )                                                                                                                                                                 ";
	sql += " UNION ALL                                                                                                                                                                ";
	sql += " SELECT 9999 AS RN, '', '', '', ''                                                                                                                                         ";
	sql += "      , MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                                                                                                            ";
	sql += "   FROM TMP_TBL                                                                                                                                                           ";
	if(defaultChart.equals("1")){
		sql += "  WHERE RN <= 10                                                                                                                                                      ";
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
  		jsonRecord.put("ITEM_NAME"	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE"	, rs.getString("ITEM_VALUE"));
  		
  		/* jsonRecord.put("WD" 	, rs.getString("WD"));
  		jsonRecord.put("WS" 	, rs.getString("WS"));
  		jsonRecord.put("TA" 	, rs.getString("TA"));
  		jsonRecord.put("HM" 	, rs.getString("HM"));
  		jsonRecord.put("PA" 	, rs.getString("PA"));
  		jsonRecord.put("PS" 	, rs.getString("PS"));
  		jsonRecord.put("RNYN" 	, rs.getString("RNYN"));
  		jsonRecord.put("RN1HR" 	, rs.getString("RN1HR"));
  		jsonRecord.put("RNDAY" 	, rs.getString("RNDAY")); */
  		
  		if(rs.getString("RN").equals("9999"))
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