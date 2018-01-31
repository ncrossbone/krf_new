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
	//관거이숭량

	sql = " WITH TMP_TBL AS (																																																																							";
	sql += " SELECT RANK() OVER(PARTITION BY A.FACI_CD, A.PIPE_NUM, ITEM_NAME ORDER BY A.FACI_CD, A.PIPE_NUM, A.WORK_DT DESC) AS RN                                         ";
	sql += "      , FACI_NM AS PT_NM                                                                                                                                        ";
	sql += "      , REPLACE(A.WORK_DT, '-', '.') AS WMCYMD /* 운영일자*/                                                                                                    ";
	sql += "      , '관거번호 : '||A.PIPE_NUM||'('||PIPE_TYPE||')' AS PIPE_NUM /* 관거번호(관거유형) */                                                                     ";
	sql += "      , ITEM_NAME                                                                                                                                               ";
	sql += "      , ITEM_VALUE                                                                                                                                              ";
	sql += "   FROM (SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_AMT'        AS ITEM_NAME, AMT        AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER UNION ALL ";
	sql += "         SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_BOD'        AS ITEM_NAME, BOD        AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER UNION ALL ";
	sql += "         SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_COD'        AS ITEM_NAME, COD        AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER UNION ALL ";
	sql += "         SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_SS'         AS ITEM_NAME, SS         AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER UNION ALL ";
	sql += "         SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_TN'         AS ITEM_NAME, TN         AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER UNION ALL ";
	sql += "         SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_TP'         AS ITEM_NAME, TP         AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER UNION ALL ";
	sql += "         SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_COLI'       AS ITEM_NAME, COLI       AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER UNION ALL ";
	sql += "         SELECT FACI_CD, FACI_NM, WORK_DT, PIPE_NUM, PIPE_TYPE, 'ITEM_BYPASS_AMT' AS ITEM_NAME, BYPASS_AMT AS ITEM_VALUE FROM VPLA_FACI_PIPE_TRANSFER           ";
	sql += "        ) A                                                                                                                                                     ";
	sql += "      , (SELECT FACI_CD                                                                                                                                         ";
	sql += "              , WORK_DT                                                                                                                                         ";
	sql += "              , MAX(PIPE_NUM) AS PIPE_NUM                                                                                                                       ";
	sql += "           FROM VPLA_FACI_PIPE_TRANSFER                                                                                                                         ";
	sql += "          GROUP BY FACI_CD , WORK_DT                                                                                                                            ";
	sql += "        ) B                                                                                                                                                     ";
	sql += "  WHERE A.FACI_CD = B.FACI_CD                                                                                                                                   ";
	sql += "    AND A.WORK_DT = B.WORK_DT                                                                                                                                   ";
	sql += "    AND A.PIPE_NUM IN (0,1,NULL)                                                                                                                             ";
	sql += "    AND A.PIPE_NUM = B. PIPE_NUM                                                                                                                                ";
	sql += "    AND A.FACI_CD = '"+recordId+"'                                                                                                                                 ";
	if(defaultChart.equals("0")){
	/* if(defaultChart.equals("1")){
		sql += "    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '201310' AND '201312'                                                                          ";
	}else{
	 */	sql += "    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '"+startDate+"' AND '"+endDate+"'                                                                          ";
	}
	sql += "    AND ITEM_NAME = '"+selectItem+"'                                                                                                                                  ";
	sql += " 	AND ITEM_VALUE IS NOT NULL   ";
	sql += "  ORDER BY FACI_NM, PIPE_NUM, WMCYMD ASC                                                                                                                        ";
	sql += " )                                                                                                                                                              ";
	sql += " SELECT *                                                                                                                                                       ";
	sql += "   FROM TMP_TBL                                                                                                                                                 ";
	if(defaultChart.equals("1")){
		sql += "  WHERE RN <= 10                                                                                                                                                ";
	}
	sql += " UNION ALL                                                                                                                                                      ";
	sql += " SELECT 999, '','','',''                                                                                                                                        ";
	sql += "      , MAX(ITEM_VALUE) + MAX(ITEM_VALUE) / 10                                                                                                                  ";
	sql += "   FROM TMP_TBL                                                                                                                                                 ";
	if(defaultChart.equals("1")){
		sql += "  WHERE RN <= 10                                                                                                                                                ";
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

  		jsonRecord.put("PT_NM"	, rs.getString("PT_NM"));
  		jsonRecord.put("WMCYMD"	, rs.getString("WMCYMD"));
  		jsonRecord.put("ITEM_NAME"	, rs.getString("ITEM_NAME"));
  		jsonRecord.put("ITEM_VALUE" 	, rs.getString("ITEM_VALUE"));
  		
  		
  		/* jsonRecord.put("ITEM_COD" 	, rs.getString("ITEM_COD"));
  		jsonRecord.put("ITEM_SS" 	, rs.getString("ITEM_SS"));
  		jsonRecord.put("ITEM_TN" 	, rs.getString("ITEM_TN"));
  		jsonRecord.put("ITEM_TP" 	, rs.getString("ITEM_TP"));
  		jsonRecord.put("ITEM_COLI" 	, rs.getString("ITEM_COLI"));
  		jsonRecord.put("ITEM_BYPASS_AMT" 	, rs.getString("ITEM_BYPASS_AMT")); */
  		
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