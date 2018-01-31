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
	
	Object[] catDid = request.getParameterValues("catDid");
	
	
sql = " WITH POLLULANT_LOAD_FOR_CAT_TBL																																																																	";
sql += "   AS (                                                                                                                                                           ";
sql += "     SELECT WS_CD, SW_CODE, ADM_CD, NO, WS_NM, AM_NM, SW_NAME, CAT_DID, DO_NM||' '||CTY_NM||' '||DONG_NM||' '||RI_NM AS ADDR, PERCENTAGE, GUBUN                   ";
sql += "          , GNR_BOD_SUM,GNR_TN_SUM,GNR_TP_SUM,OUT_BOD_SUM,OUT_TN_SUM,OUT_TP_SUM                                                                                   ";
sql += "       FROM (                                                                                                                                                     ";
sql += "             SELECT '1' AS NO, '소계' AS GUBUN, WS_NM, WS_CD, AM_NM, AM_CD, SW_NAME, SW_CODE, DO_NM, CTY_NM, DONG_NM, RI_NM, ADM_CD, CAT_DID, '' AS PERCENTAGE    ";
sql += "                  , GNR_BOD_SUM, GNR_TN_SUM, GNR_TP_SUM, OUT_BOD_SUM, OUT_TN_SUM, OUT_TP_SUM                                                                      ";
sql += "               FROM POLLULANT_LOAD_FOR_CAT    )                                                                                                                       ";

if(catDid.length != 0){
	sql += "	  WHERE  CAT_DID IN    (  	";
	for(int i=0;i<catDid.length;i++){
		if(i == catDid.length-1){
			sql += "	'"+catDid[i]+"' )			";
		}else{
			sql += "	'"+catDid[i]+"',			";
		}
		
	}
}

sql += "      ORDER BY WS_CD, SW_CODE, CAT_DID, ADM_CD, NO                                                                                                                ";
sql += "     )                                                                                                                                                            ";
sql += " SELECT WS_NM, AM_NM, SW_NAME,CAT_DID, GUBUN, GNR_BOD_SUM, GNR_TN_SUM, GNR_TP_SUM, OUT_BOD_SUM, OUT_TN_SUM, OUT_TP_SUM                                                    ";
sql += "   FROM (                                                                                                                                                         ";
sql += "         SELECT '1' AS NO_1                                                                                                                                       ";
sql += "              , NO AS NO_2                                                                                                                                        ";
sql += "              , '' AS WS_CD                                                                                                                                       ";
sql += "              , '' AS SW_CODE                                                                                                                                     ";
sql += "              , '' AS WS_NM                                                                                                                                       ";
sql += "              , '' AS AM_NM                                                                                                                                       ";
sql += "              , '총계' AS SW_NAME                                                                                                                                 ";
sql += "              , '' AS CAT_DID                                                                                                                                       ";
sql += "              , GUBUN                                                                                                                                             ";
sql += "              , SUM(GNR_BOD_SUM) AS GNR_BOD_SUM                                                                                                                   ";
sql += "              , SUM(GNR_TN_SUM)  AS GNR_TN_SUM                                                                                                                    ";
sql += "              , SUM(GNR_TP_SUM)  AS GNR_TP_SUM                                                                                                                    ";
sql += "              , SUM(OUT_BOD_SUM) AS OUT_BOD_SUM                                                                                                                   ";
sql += "              , SUM(OUT_TN_SUM)  AS OUT_TN_SUM                                                                                                                    ";
sql += "              , SUM(OUT_TP_SUM)  AS OUT_TP_SUM                                                                                                                    ";
sql += "           FROM POLLULANT_LOAD_FOR_CAT_TBL                                                                                                                        ";
sql += "          WHERE 1=1                                                                                                                                               ";
sql += "          GROUP BY GUBUN, NO                                                                                                                                      ";
sql += "         UNION                                                                                                                                                    ";
sql += "         SELECT '2', NO, WS_CD, SW_CODE, WS_NM, AM_NM, SW_NAME, CAT_DID, GUBUN                                                                                             ";
sql += "              , SUM(GNR_BOD_SUM) AS GNR_BOD_SUM                                                                                                                   ";
sql += "              , SUM(GNR_TN_SUM)  AS GNR_TN_SUM                                                                                                                    ";
sql += "              , SUM(GNR_TP_SUM)  AS GNR_TP_SUM                                                                                                                    ";
sql += "              , SUM(OUT_BOD_SUM) AS OUT_BOD_SUM                                                                                                                   ";
sql += "              , SUM(OUT_TN_SUM)  AS OUT_TN_SUM                                                                                                                    ";
sql += "              , SUM(OUT_TP_SUM)  AS OUT_TP_SUM                                                                                                                    ";
sql += "           FROM POLLULANT_LOAD_FOR_CAT_TBL                                                                                                                        ";
sql += "          GROUP BY NO, WS_CD, SW_CODE, WS_NM, AM_NM, SW_NAME,CAT_DID, GUBUN                                                                                               ";
sql += "        )                                                                                                                                                         ";
sql += "  ORDER BY NO_1, WS_CD, SW_CODE, NO_2                                                                                                                             ";
	
		
   //out.print(sql);
   //System.out.println(sql);
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();

		jsonRecord.put("WS_NM"	, rs.getString("WS_NM"));
  		jsonRecord.put("AM_NM"	, rs.getString("AM_NM"));
  		jsonRecord.put("SW_NAME"	, rs.getString("SW_NAME"));
  		jsonRecord.put("CAT_DID"	, rs.getString("CAT_DID"));
  		jsonRecord.put("GUBUN" 	, rs.getString("GUBUN"));
  		jsonRecord.put("GNR_BOD_SUM" 	, rs.getString("GNR_BOD_SUM"));
  		jsonRecord.put("GNR_TN_SUM" 	, rs.getString("GNR_TN_SUM"));
  		jsonRecord.put("GNR_TP_SUM" 	, rs.getString("GNR_TP_SUM"));
  		jsonRecord.put("OUT_BOD_SUM" 	, rs.getString("OUT_BOD_SUM"));
  		jsonRecord.put("OUT_TN_SUM" 	, rs.getString("OUT_TN_SUM"));
  		jsonRecord.put("OUT_TP_SUM" 	, rs.getString("OUT_TP_SUM"));
  		
  		
  		jsonArr.add(jsonRecord);
  		
	}
	
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