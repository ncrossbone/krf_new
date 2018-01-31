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
	
	sql = " WITH TMP_TBL AS (																																																																																																			";
	sql += " SELECT RANK() OVER(PARTITION BY PT_NO||ITEM_NAME ORDER BY WMCYMD DESC) AS RN,/* 순번 */                                                                                                                          ";
	sql += "         PT_NO, PT_NM, WMYR, WMOM AS WMOD, WMCYMD, WMWK, CODE_CTN, ITEM_NAME, ITEM_VALUE                                                                                                                                ";
	sql += "   FROM (SELECT A.PT_NO, PT_NM, WMYR, WMOM , WMYR||'.'||WMOM||'.'||WMOM AS WMCYMD                                                                                                                                       ";
	sql += "              , CASE WHEN WMWK = '1' THEN '상반기' WHEN WMWK = '2' THEN '하반기' END WMWK                                                                                                                               ";
	sql += "              , CODE_CTN, ITEM_NAME, ITEM_VALUE                                                                                                                                                                         ";
	sql += "           FROM (SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_DOW'  AS ITEM_NAME, DECODE(ITEM_DOW      , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW,      'FM999999990.0' )) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_TEMP' AS ITEM_NAME, DECODE(ITEM_TEMP_LOW , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP_LOW, 'FM999999990'   )) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_DO'   AS ITEM_NAME, DECODE(ITEM_DO_LOW   , '999999999', '정량한계미만', TO_CHAR(ITEM_DO_LOW,   'FM999999990.0' )) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_PH'   AS ITEM_NAME, DECODE(ITEM_PH_LOW   , '999999999', '정량한계미만', TO_CHAR(ITEM_PH_LOW,   'FM999999990.0' )) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_EC'   AS ITEM_NAME, DECODE(ITEM_EC_LOW   , '999999999', '정량한계미만', TO_CHAR(ITEM_EC_LOW,   'FM999999990'   )) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_COD'  AS ITEM_NAME, DECODE(ITEM_COD      , '999999999', '정량한계미만', TO_CHAR(ITEM_COD,      'FM999999990.00')) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_TOC'  AS ITEM_NAME, DECODE(ITEM_TOC      , '999999999', '정량한계미만', TO_CHAR(ITEM_TOC,      'FM999999990.00')) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_TN'   AS ITEM_NAME, DECODE(ITEM_TN       , '999999999', '정량한계미만', TO_CHAR(ITEM_TN,       'FM999999990'   )) AS ITEM_VALUE FROM SDM_RWMDTI UNION ALL        ";
	sql += "                 SELECT PT_NO, WMYR, WMOM, WMWK, 'ITEM_TP'   AS ITEM_NAME, DECODE(ITEM_TP       , '999999999', '정량한계미만', TO_CHAR(ITEM_TP,       'FM999999990'   )) AS ITEM_VALUE FROM SDM_RWMDTI                  ";
	sql += "                ) A                                                                                                                                                                                                     ";
	sql += "              , SDM_RWMPT B                                                                                                                                                                                             ";
	sql += "              , CODE C                                                                                                                                                                                                  ";
	sql += "          WHERE A.PT_NO    = B.PT_NO                                                                                                                                                                                    ";
	sql += "            AND B.JOSACODE = C.CODE                                                                                                                                                                                     ";
	sql += "            AND C.CODE_ID  = 'ORG001'                                                                                                                                                                                   ";
	sql += "        )                                                                                                                                                                                                               ";
	sql += " WHERE PT_NO = '2022R50'                                                                                                                                                                                                ";
	if(defaultChart.equals("1")){
		sql += "   AND WMYR||WMOM BETWEEN '201001' AND '201512'                                                                                                                                                                         ";
	}else{
		sql += "   AND WMYR||WMOM BETWEEN '"+startDate+"' AND '"+endDate+"'                                                                                                                                                                         ";	
	}
	sql += " ORDER BY WMYR DESC , WMOM DESC                                                                                                                                                                                         ";
	sql += " )                                                                                                                                                                                                                      ";
	sql += " SELECT RN, PT_NO, PT_NM, WMYR, WMOD, WMCYMD, WMWK, CODE_CTN, ITEM_NAME, TO_NUMBER(ITEM_VALUE) AS ITEM_VALUE                                                                                                            ";
	sql += "   FROM TMP_TBL                                                                                                                                                                                                         ";
	sql += "  WHERE ITEM_NAME = 'ITEM_COD'                                                                                                                                                                                          ";
	sql += "  AND ITEM_VALUE IS NOT NULL   ";
	if(defaultChart.equals("1")){
		sql += "    AND ROWNUM <= 10                                                                                                                                                                                                    ";
	}
	sql += " UNION ALL                                                                                                                                                                                                              ";
	sql += " SELECT 999 AS RN, '','','','','','','',''                                                                                                                                                                              ";
	sql += "      , MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                                                                                                                                                          ";
	sql += "   FROM TMP_TBL                                                                                                                                                                                                         ";
	sql += "  WHERE ITEM_NAME = '"+recordId+"'                                                                                                                                                                                          ";
	if(defaultChart.equals("1")){
		sql += "    AND ROWNUM <= 10                                                                                                                                                                                                    ";
	}
                             


	//System.out.println(sql);	
   //out.print(sql);
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

  		jsonRecord.put("PT_NO"	, rs.getString("PT_NO"));
  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("ITEM_NAME" 	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE" 	, rs.getString("ITEM_VALUE"));
  		
  		/* jsonRecord.put("PT_NO"	, rs.getString("PT_NO"));
  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WAST_NO"	, rs.getString("WAST_NO"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("ITEM_NAME" 	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE" 	, rs.getString("ITEM_VALUE")); */
  		
  		/* jsonRecord.put("MCNT"	, rs.getString("MCNT"));
  		jsonRecord.put("JOSANAME"	, rs.getString("JOSANAME"));
  		jsonRecord.put("ITEM_DOW" 	, rs.getString("ITEM_DOW"));
  		jsonRecord.put("ITEM_TEMP" 	, rs.getString("ITEM_TEMP"));
  		jsonRecord.put("ITEM_DO" 	, rs.getString("ITEM_DO"));
  		jsonRecord.put("ITEM_EC" 	, rs.getString("ITEM_EC"));
  		jsonRecord.put("ITEM_PH" 	, rs.getString("ITEM_PH"));
  		jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_TOC" 	, rs.getString("ITEM_TOC"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ADMCODE" 	, rs.getString("ADMCODE")); */
  		
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