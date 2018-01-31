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
	
	String defaultChart = request.getParameter("defaultChart");
	
	String selectItem = request.getParameter("selectItem");
	//out.print(defaultChart);
	
	sql = " WITH TMP_TBL AS (																																									";
	sql += " SELECT RANK( ) OVER(PARTITION BY A.PT_NO||ITEM_NAME                                                ";
	sql += "         ORDER BY WMCYMD DESC) RN                                                                   ";
	sql += "      , A.PT_NO, PT_NM, A.WMYR, A.WMOD, WMWK, WMCYMD, ITEM_NAME                                     ";
	sql += "      , CASE WHEN SUBSTR(ITEM_VALUE, 1, 1) = '.' THEN 0||ITEM_VALUE                                 ";
	sql += "             ELSE ITEM_VALUE                                                                        ";
	sql += "        END ITEM_VALUE                                                                              ";
	sql += "   FROM (SELECT PT_NO, WMYR, WMOD, WMCD                                                             ";
	sql += "              , CASE WHEN ITCD = '1052' THEN 'ITEM_BOD'                                             ";
	sql += "                     WHEN ITCD = '1054' THEN 'ITEM_DOC'                                             ";
	sql += "                     WHEN ITCD = '1049' THEN 'ITEM_COD'                                             ";
	sql += "                     WHEN ITCD = '1055' THEN 'ITEM_TN'                                              ";
	sql += "                     WHEN ITCD = '1056' THEN 'ITEM_TP'                                              ";
	sql += "                     WHEN ITCD = '1060' THEN 'ITEM_TEMP'                                            ";
	sql += "                     WHEN ITCD = '1039' THEN 'ITEM_PH'                                              ";
	sql += "                     WHEN ITCD = '1053' THEN 'ITEM_SS'                                              ";
	sql += "                     WHEN ITCD = '1063' THEN 'ITEM_CLOA'                                            ";
	sql += "                END ITEM_NAME                                                                       ";
	sql += "              , TO_CHAR(WMVL) AS ITEM_VALUE                                                         ";
	sql += "              , TO_CHAR(WMVL) AS ITEM_VALUE_1                                                         ";
	sql += "           FROM TW_RWMDT                                                                            ";
	sql += "          WHERE ITCD IN ('1052','1054','1049','1055','1056','1060','1039','1053','1063')            ";
	sql += "        ) A                                                                                         ";
	sql += "      , RWMPT B                                                                                     ";
	sql += "      , (SELECT DISTINCT PT_NO ,                                                                    ";
	sql += "                WMYR ,                                                                              ";
	sql += "                WMOD ,                                                                              ";
	sql += "                SUBSTR(WMWK, 1, 1)||'회차' AS WMWK ,                                                ";
	sql += "                WMCYMD                                                                              ";
	sql += "           FROM RWMDTD                                                                              ";
	sql += "        ) C                                                                                         ";
	sql += "  WHERE A.PT_NO = B.PT_NO                                                                           ";
	sql += "    AND A.PT_NO = C.PT_NO                                                                           ";
	sql += "    AND A.WMYR  = C.WMYR                                                                            ";
	sql += "    AND A.WMOD  = C.WMOD                                                                            ";
	sql += "    AND A.WMCD  = SUBSTR(C.WMWK,1,1)                                                                ";
	sql += "    AND C.WMCYMD IS NOT NULL                                                                        ";
	sql += "    AND A.PT_NO = '"+recordId+"'                                                              ";
	if(defaultChart.equals("0")){
		sql += "    AND A.WMYR||'.'||A.WMOD BETWEEN '"+a+"."+c+"' AND '"+b+"."+d+"'                                  ";
	}
	sql += "    AND ITEM_NAME = '"+selectItem+"'                                                                ";
	sql += "    AND ITEM_VALUE IS NOT NULL                                                                ";
	sql += "  ORDER BY WMCYMD, ITEM_NAME)                                                                       ";
	sql += " SELECT RN, PT_NO, PT_NM, WMYR, WMOD, WMWK, WMCYMD, ITEM_NAME, TO_NUMBER(ITEM_VALUE) AS ITEM_VALUE , REPLACE(ITEM_VALUE,'999999999','정량한계미만' ) AS ITEM_VALUE_1";
	sql += "   FROM (SELECT *                                                                                   ";
	sql += "           FROM TMP_TBL                                                                             ";
	if(defaultChart.equals("1")){
		sql += "          WHERE RN <= 10                                                           ";
	}
	sql += "          ORDER BY WMCYMD)                                                                          ";
	sql += " UNION ALL                                                                                          ";
	sql += " SELECT 999 as RN,                                                                                  ";
	sql += "        '',                                                                                         ";
	sql += "        '',                                                                                         ";
	sql += "        '',                                                                                         ";
	sql += "        '',                                                                                         ";
	sql += "        '',                                                                                         ";
	sql += "        '',                                                                                         ";
	sql += "        '',                                                                                         ";
	sql += "   MAX(TO_NUMBER(REPLACE(TO_NUMBER(ITEM_VALUE), 999999999, 0))) + MAX(TO_NUMBER(REPLACE(TO_NUMBER(ITEM_VALUE), 999999999, 0))) / 10,            ";
	sql += "        ''           ";
	sql += "   FROM TMP_TBL                                                                                     ";
	if(defaultChart.equals("1")){
		sql += "  WHERE RN <= 10                                                                   ";
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
		
		
		/*
		JSONArray ITEM_BOD	  = new JSONArray();
		JSONArray ITEM_DOC    = new JSONArray();
		JSONArray ITEM_COD    = new JSONArray();
		JSONArray ITEM_TN     = new JSONArray();
		JSONArray ITEM_TP     = new JSONArray();
		JSONArray ITEM_TEMP   = new JSONArray();
		JSONArray ITEM_PH     = new JSONArray();
		JSONArray ITEM_SS     = new JSONArray();
		JSONArray ITEM_CLOA   = new JSONArray();
		
		System.out.println(rs.getString("ITEM_BOD"));
		ITEM_BOD.add(rs.getString("ITEM_BOD"));	
		ITEM_DOC.add(rs.getString("ITEM_DOC"));
		ITEM_COD.add(rs.getString("ITEM_COD"));
		ITEM_TN.add(rs.getString("ITEM_TN"));
		ITEM_TP.add(rs.getString("ITEM_TP"));
		ITEM_TEMP.add(rs.getString("ITEM_TEMP"));
		ITEM_PH.add(rs.getString("ITEM_PH"));
		ITEM_SS.add(rs.getString("ITEM_SS"));
		ITEM_CLOA.add(rs.getString("ITEM_CLOA")); 
		System.out.println(ITEM_BOD);*/
		
		

  		jsonRecord.put("WMOD"	, rs.getString("WMOD"));
  		jsonRecord.put("WMYR"	, rs.getString("WMYR"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("PT_NO"	, rs.getString("PT_NO"));
  		jsonRecord.put("ITME_NAME"	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE"	, rs.getString("ITEM_VALUE"));
  		jsonRecord.put("ITEM_VALUE_1"	, rs.getString("ITEM_VALUE_1"));
  		
				/* jsonRecord.put("ITEM_BOD"	, ITEM_BOD);
				jsonRecord.put("ITEM_BOD_1"	, rs.getString("ITEM_BOD_1"));
		  		jsonRecord.put("ITEM_DOC"	, ITEM_DOC);
		  		jsonRecord.put("ITEM_DOC_1"	, rs.getString("ITEM_DOC_1"));
		  		jsonRecord.put("ITEM_COD"	, ITEM_COD);
		  		jsonRecord.put("ITEM_COD_1"	, rs.getString("ITEM_COD_1"));
		  		jsonRecord.put("ITEM_TP"	, ITEM_TP);
		  		jsonRecord.put("ITEM_TP_1"	, rs.getString("ITEM_TP_1"));
		  		jsonRecord.put("ITEM_TEMP"	, ITEM_TEMP);
		  		jsonRecord.put("ITEM_TEMP_1"	, rs.getString("ITEM_TEMP_1"));
		  		jsonRecord.put("ITEM_PH"	, ITEM_PH);
		  		jsonRecord.put("ITEM_PH_1"	, rs.getString("ITEM_PH_1"));
		  		jsonRecord.put("ITEM_SS"	, ITEM_SS);
		  		jsonRecord.put("ITEM_SS_1"	, rs.getString("ITEM_SS_1"));
		  		jsonRecord.put("ITEM_CLOA"	, ITEM_CLOA);
		  		jsonRecord.put("ITEM_CLOA_1"	, rs.getString("ITEM_CLOA_1")); */
  		
  		
  		/* jsonRecord.put("ITEM_BOD"	, rs.getString("ITEM_BOD"));
  		jsonRecord.put("ITEM_DOC"	, rs.getString("ITEM_DOC"));
  		jsonRecord.put("ITEM_COD"	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_TP"	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ITEM_TEMP"	, rs.getString("ITEM_TEMP"));
  		jsonRecord.put("ITEM_PH"	, rs.getString("ITEM_PH"));
  		jsonRecord.put("ITEM_SS"	, rs.getString("ITEM_SS"));
  		jsonRecord.put("ITEM_CLOA"	, rs.getString("ITEM_CLOA")); */
  		
  		//System.out.println(jsonRecord);
  		if(rs.getString("RN").equals("999"))
  			jsonArrMax.add(jsonRecord);
  		else
  			jsonArr.add(jsonRecord);
	}
	rs.close();
	jsonObj.put("maxdata", jsonArrMax);
	jsonObj.put("data", jsonArr);
   //console.info(jsonObj);
   //System.out.println(jsonObj);
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