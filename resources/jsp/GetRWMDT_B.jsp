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
	
	sql = " WITH TMP_TBL AS (																										";
	sql += " SELECT RANK() OVER(PARTITION BY FACT_CODE||WAST_NO||ITEM_NAME                                                              ";
	sql += "         ORDER BY BASE_TIME DESC) RN,                                                                                       ";
	sql += "         FACT_CODE AS PT_NO , /* 사업장코드 */                                                                              ";
	sql += "         FACT_NAME AS PT_NM , /* 사업장명 */                                                                                ";
	sql += "         WAST_NO , /* 방류구번호 */                                                                                         ";
	sql += "         SUBSTR(BASE_TIME, 1, 4)||'.'||SUBSTR(BASE_TIME, 5, 2)||'.'||SUBSTR(BASE_TIME, 7, 2) AS WMCYMD , /* 측정일자 */     ";
	sql += "         ITEM_NAME,                                                                                                         ";
	sql += "         TO_NUMBER(ITEM_VALUE) AS ITEM_VALUE                                                                                ";
	sql += "   FROM (                                                                                                                   ";
	sql += "         SELECT DISTINCT A.ADM_CD,                                                                                          ";
	sql += "           A.BASE_TIME,                                                                                                     ";
	sql += "           A.WAST_NO,                                                                                                       ";
	sql += "           A.FACT_CODE,                                                                                                     ";
	sql += "           A.FACT_NAME,                                                                                                     ";
	sql += "           CASE WHEN A.ITEM_CODE = 'BOD00' THEN 'ITEM_BOD'                                                                  ";
	sql += "                WHEN A.ITEM_CODE = 'COD00' THEN 'ITEM_COD'                                                                  ";
	sql += "                WHEN A.ITEM_CODE = 'SUS00' THEN 'ITEM_SS'                                                                   ";
	sql += "                WHEN A.ITEM_CODE = 'TON00' THEN 'ITEM_TN'                                                                   ";
	sql += "                WHEN A.ITEM_CODE = 'TOP00' THEN 'ITEM_TP'                                                                   ";
	sql += "                WHEN A.ITEM_CODE = 'PHY00' THEN 'ITEM_PH'                                                                   ";
	sql += "                WHEN A.ITEM_CODE = 'FLW01' THEN 'ITEM_FLW'                                                                  ";
	sql += "                WHEN A.ITEM_CODE = 'TOC00' THEN 'ITEM_TOC'                                                                  ";
	sql += "           ELSE NULL                                                                                                        ";
	sql += "           END ITEM_NAME,                                                                                                   ";
	sql += "           A.HOUR_VL AS ITEM_VALUE,                                                                                         ";
	sql += "           A.FACT_KIND,                                                                                                     ";
	sql += "           A.FACT_KIND_NAME,                                                                                                ";
	sql += "           A.FACT_CAPACITY                                                                                                  ";
	sql += "         FROM (                                                                                                             ";
	sql += "             SELECT A.FACT_CODE,                                                                                            ";
	sql += "               A.BASE_TIME,                                                                                                 ";
	sql += "               A.WAST_NO,                                                                                                   ";
	sql += "               A.ITEM_CODE,                                                                                                 ";
	sql += "               CASE UPPER(A. HOUR_VL)                                                                                       ";
	sql += "                 WHEN 'NULL' THEN NULL                                                                                      ";
	sql += "                 ELSE A.HOUR_VL                                                                                             ";
	sql += "               END HOUR_VL ,                                                                                                ";
	sql += "               A.TRANS_TIME,                                                                                                ";
	sql += "               B.FACT_NAME,                                                                                                 ";
	sql += "               B.ADM_CD,                                                                                                    ";
	sql += "               C.FACT_KIND,                                                                                                 ";
	sql += "               F.FACT_KIND_NAME,                                                                                            ";
	sql += "               TO_NUMBER( C.FACT_CAPACITY) FACT_CAPACITY,                                                                   ";
	sql += "               C.FACT_BUSINESS,                                                                                             ";
	sql += "               D.RIVER_CODE ,                                                                                               ";
	sql += "               E.NAME RIVER_NAME                                                                                            ";
	sql += "             FROM TMS_HOURDATA A,                                                                                           ";
	sql += "               WTMSC_FACT_WAST_TEMP B,                                                                                      ";
	sql += "               WTMSC_FACT C,                                                                                                ";
	sql += "               WTMSC_FACT_WAST D,                                                                                           ";
	sql += "               WTMSC_RIVER E,                                                                                               ";
	sql += "               WTMSC_FACT_KIND F                                                                                            ";
	sql += "             WHERE A.FACT_CODE = B.FACT_CODE                                                                                ";
	sql += "               AND A.WAST_NO = B.WAST_NO                                                                                    ";
	sql += "               AND A.FACT_CODE = C.FACT_CODE                                                                                ";
	sql += "               AND A.FACT_CODE = D.FACT_CODE                                                                                ";
	sql += "               AND A.WAST_NO = D.WAST_NO                                                                                    ";
	sql += "               AND D.WAST_USED = 'Y'                                                                                        ";
	sql += "               AND D.RIVER_CODE = E.CODE(+)                                                                                 ";
	sql += "               AND C.FACT_KIND = F.FACT_KIND(+) ) A,                                                                        ";
	sql += "           (                                                                                                                ";
	sql += "             SELECT DISTINCT A.ITEM_ORDER,                                                                                  ";
	sql += "               A.ITEM_CODE,                                                                                                 ";
	sql += "               A.ITEM_NAME,                                                                                                 ";
	sql += "               A .ITEM_MNAME,                                                                                               ";
	sql += "               A.ITEM_UNIT_CODE ,                                                                                           ";
	sql += "               A.COL_NAME,                                                                                                  ";
	sql += "               A.TWTMS_CODE,                                                                                                ";
	sql += "               A.ITEM_USED,                                                                                                 ";
	sql += "               A.LEVY_FLAG,                                                                                                 ";
	sql += "               A.EX_LEVY_FLAG,                                                                                              ";
	sql += "               A.ITEM_DP,                                                                                                   ";
	sql += "               A.MEAS_KIND_CODE,                                                                                            ";
	sql += "               A.ITEM_KIND_CODE,                                                                                            ";
	sql += "               A.MEAS_KIND_CODE_SECOND,                                                                                     ";
	sql += "               A.ITEM_DP2,                                                                                                  ";
	sql += "               B.ITEM_UNIT                                                                                                  ";
	sql += "             FROM WTMSC_ITEM A,                                                                                             ";
	sql += "               WTMSC_CODE B                                                                                                 ";
	sql += "             WHERE A.ITEM_UNIT_CODE = B.ITEM_UNIT_CODE                                                                      ";
	sql += "               AND A.ITEM_USED = 'Y' ) B                                                                                    ";
	sql += "         WHERE A.ITEM_CODE = B.ITEM_CODE                                                                                    ";
	sql += "        )                                                                                                                   ";
	sql += "  WHERE 1=1                                                                                                                 ";
	if(defaultChart.equals("1")){
		sql += "   AND SUBSTR(BASE_TIME, 1, 6) >= '201510'                                                                                  ";
		sql += "   AND SUBSTR(BASE_TIME, 1, 6) <= '201512'                                                                                  ";
	}else{
		sql += "   AND SUBSTR(BASE_TIME, 1, 6) >= '"+startDate+"'                                                                                  ";
		sql += "   AND SUBSTR(BASE_TIME, 1, 6) <= '"+endDate+"'                                                                                  ";
	}
	sql += "   AND FACT_CODE = '"+recordId+"'                                                                                                ";
	sql += "   AND ITEM_NAME = '"+selectItem+"'                                                                                               ";
	sql += "  AND ITEM_VALUE IS NOT NULL   ";
	sql += "  ORDER BY ROWNUM DESC )                                                                                                         ";
	sql += " SELECT RN, PT_NO, PT_NM, WAST_NO, WMCYMD, ITEM_NAME, ITEM_VALUE                                                            ";
	sql += "   FROM (SELECT *                                                                                                           ";
	sql += "           FROM TMP_TBL                                                                                                     ";
	if(defaultChart.equals("1")){
		sql += "          WHERE ROWNUM <= 10                                                                                                ";
	}
	sql += "          ORDER BY ROWNUM DESC                                                                                                   ";
	sql += "        )                                                                                                                   ";
	sql += " UNION ALL                                                                                                                  ";
	sql += " SELECT 9999 AS RN,                                                                                                          ";
	sql += "       '','','','','',                                                                                                      ";
	sql += "       MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                                                               ";
	sql += "   FROM TMP_TBL                                                                                                             ";
	if(defaultChart.equals("1")){
		sql += "  WHERE ROWNUM <= 10                                                                                                        ";
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

  		jsonRecord.put("PT_NO"	, rs.getString("PT_NO"));
  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WAST_NO"	, rs.getString("WAST_NO"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("ITEM_NAME" 	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE" 	, rs.getString("ITEM_VALUE"));
  		
  		/* jsonRecord.put("ITEM_BOD" 	, rs.getString("ITEM_BOD"));
  		jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_SS" 	, rs.getString("ITEM_SS"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ITEM_PH" 	, rs.getString("ITEM_PH"));
  		jsonRecord.put("ITEM_FLW" 	, rs.getString("ITEM_FLW"));
  		jsonRecord.put("ITEM_TOC" 	, rs.getString("ITEM_TOC")); */
  		
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