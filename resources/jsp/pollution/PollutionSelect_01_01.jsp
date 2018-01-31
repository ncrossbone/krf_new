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
	String year = request.getParameter("year");
	
	sql = "  WITH TBL_PLA_POP_TOTAL AS (                                                                               ";                                                                         
	sql += "      SELECT YYYY                                                                                           ";
	sql += "           , WS_NM                                                                                          ";
	sql += "           , MB_NM                                                                                          ";
	sql += "           , SB_ID                                                                                          ";
	sql += "           , SB_NM                                                                                          ";
	sql += "           , CAT_DID                                                                                        ";
	sql += "           , ADM_CD                                                                                         ";
	sql += "           , DO_NM||' '||CTY_NM||' '||DONG_NM||' '||RI_NM AS ADDR                                           ";
	sql += "           , FINAL_PERCENTAGE                                                                               ";
	sql += "           , AREA_A1                                                                                        ";
	sql += "           , AREA_A2                                                                                        ";
	sql += "           , AREA_SUM                                                                                       ";
	sql += "           , REGION                                                                                         ";
	sql += "           , REGION_DATE                                                                                    ";
	sql += "           , U_A1_TP_CODE                                                                                   ";
	sql += "           , U_A1_TP_DATE                                                                                   ";
	sql += "           , U_A1_TP_NAME                                                                                   ";
	sql += "           , U_A3_TP_CODE                                                                                   ";
	sql += "           , U_A3_TP_DATE                                                                                   ";
	sql += "           , U_A3_TP_NAME                                                                                   ";
	sql += "           , POP_SUM                                                                                        ";
	sql += "           , UPOP_SUM                                                                                       ";
	sql += "           , UPOP_A1_SUM                                                                                    ";
	sql += "           , UPOP_A1_SEPARATE_WT_SUM                                                                        ";
	sql += "           , UPOP_A1_SEPARATE_IT_SUM                                                                        ";
	sql += "           , UPOP_A1_COMBINED_WT_SUM                                                                        ";
	sql += "           , UPOP_A1_COMBINED_IT_SUM                                                                        ";
	sql += "           , UPOP_A2_SUM                                                                                    ";
	sql += "           , UPOP_A2_SANITARY                                                                               ";
	sql += "           , UPOP_A2_SEPTIC                                                                                 ";
	sql += "           , UPOP_A2_REMOVAL                                                                                ";
	sql += "           , SPOP_SUM                                                                                       ";
	sql += "           , SPOP_A1_SUM                                                                                    ";
	sql += "           , SPOP_A1_SEPARATE_WT_SUM                                                                        ";
	sql += "           , SPOP_A1_SEPARATE_IT_SUM                                                                        ";
	sql += "           , SPOP_A1_COMBINED_WT_SUM                                                                        ";
	sql += "           , SPOP_A1_COMBINED_IT_SUM                                                                        ";
	sql += "           , SPOP_A2_SUM                                                                                    ";
	sql += "           , SPOP_A2_SANITARY                                                                               ";
	sql += "           , SPOP_A2_SEPTIC                                                                                 ";
	sql += "           , SPOP_A2_REMOVAL                                                                                ";
	sql += "        FROM PLA_POP_TOTAL_FOR_CAT                                                                          ";
	if(catDid.length != 0){
		sql += " WHERE CAT_DID IN (  ";	
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "        )                                                                                                   ";
	sql += "  select YYYY                                                                                               ";
	sql += "       , WS_NM                                                                                              ";
	sql += "       , MB_NM                                                                                              ";
	sql += "       , SB_NM                                                                                              ";
	sql += "       , AREA_A1                                                                                            ";
	sql += "       , AREA_A2                                                                                            ";
	sql += "       , AREA_SUM                                                                                           ";
	sql += "       , REGION                                                                                             ";
	sql += "       , REGION_DATE                                                                                        ";
	sql += "       , U_A1_TP_CODE                                                                                       ";
	sql += "       , U_A1_TP_DATE                                                                                       ";
	sql += "       , U_A1_TP_NAME                                                                                       ";
	sql += "       , U_A3_TP_CODE                                                                                       ";
	sql += "       , U_A3_TP_DATE                                                                                       ";
	sql += "       , U_A3_TP_NAME                                                                                       ";
	sql += "       , POP_SUM                                                                                            ";
	sql += "       , UPOP_SUM                                                                                           ";
	sql += "       , UPOP_A1_SUM                                                                                        ";
	sql += "       , UPOP_A1_SEPARATE_WT_SUM                                                                            ";
	sql += "       , UPOP_A1_SEPARATE_IT_SUM                                                                            ";
	sql += "       , UPOP_A1_COMBINED_WT_SUM                                                                            ";
	sql += "       , UPOP_A1_COMBINED_IT_SUM                                                                            ";
	sql += "       , UPOP_A2_SUM                                                                                        ";
	sql += "       , UPOP_A2_SANITARY                                                                                   ";
	sql += "       , UPOP_A2_SEPTIC                                                                                     ";
	sql += "       , UPOP_A2_REMOVAL                                                                                    ";
	sql += "       , SPOP_SUM                                                                                           ";
	sql += "       , SPOP_A1_SUM                                                                                        ";
	sql += "       , SPOP_A1_SEPARATE_WT_SUM                                                                            ";
	sql += "       , SPOP_A1_SEPARATE_IT_SUM                                                                            ";
	sql += "       , SPOP_A1_COMBINED_WT_SUM                                                                            ";
	sql += "       , SPOP_A1_COMBINED_IT_SUM                                                                            ";
	sql += "       , SPOP_A2_SUM                                                                                        ";
	sql += "       , SPOP_A2_SANITARY                                                                                   ";
	sql += "       , SPOP_A2_SEPTIC                                                                                     ";
	sql += "       , SPOP_A2_REMOVAL                                                                                    ";
	sql += "    from (                                                                                                  ";
	sql += "          select YYYY                                                                                       ";
	sql += "               , WS_NM                                                                                      ";
	sql += "               , MB_NM                                                                                      ";
	sql += "               , SB_NM                                                                                      ";
	sql += "               , SB_ID                                                                                      ";
	sql += "               , SUM(AREA_A1) AS AREA_A1                                                                    ";
	sql += "               , SUM(AREA_A2) AS AREA_A2                                                                    ";
	sql += "               , SUM(AREA_SUM) AS AREA_SUM                                                                  ";
	sql += "               , '' AS REGION                                                                               ";
	sql += "               , '' AS REGION_DATE                                                                          ";
	sql += "               , '' AS U_A1_TP_CODE                                                                         ";
	sql += "               , '' AS U_A1_TP_DATE                                                                         ";
	sql += "               , '' AS U_A1_TP_NAME                                                                         ";
	sql += "               , '' AS U_A3_TP_CODE                                                                         ";
	sql += "               , '' AS U_A3_TP_DATE                                                                         ";
	sql += "               , '' AS U_A3_TP_NAME                                                                         ";
	sql += "               , SUM(POP_SUM) AS POP_SUM                                                                    ";
	sql += "               , SUM(UPOP_SUM) AS UPOP_SUM                                                                  ";
	sql += "               , SUM(UPOP_A1_SUM) AS UPOP_A1_SUM                                                            ";
	sql += "               , SUM(UPOP_A1_SEPARATE_WT_SUM) AS UPOP_A1_SEPARATE_WT_SUM                                    ";
	sql += "               , SUM(UPOP_A1_SEPARATE_IT_SUM) AS UPOP_A1_SEPARATE_IT_SUM                                    ";
	sql += "               , SUM(UPOP_A1_COMBINED_WT_SUM) AS UPOP_A1_COMBINED_WT_SUM                                    ";
	sql += "               , SUM(UPOP_A1_COMBINED_IT_SUM) AS UPOP_A1_COMBINED_IT_SUM                                    ";
	sql += "               , SUM(UPOP_A2_SUM) AS UPOP_A2_SUM                                                            ";
	sql += "               , SUM(UPOP_A2_SANITARY) AS UPOP_A2_SANITARY                                                  ";
	sql += "               , SUM(UPOP_A2_SEPTIC) AS UPOP_A2_SEPTIC                                                      ";
	sql += "               , SUM(UPOP_A2_REMOVAL) AS UPOP_A2_REMOVAL                                                    ";
	sql += "               , SUM(SPOP_SUM) AS SPOP_SUM                                                                  ";
	sql += "               , SUM(SPOP_A1_SUM) AS SPOP_A1_SUM                                                            ";
	sql += "               , SUM(SPOP_A1_SEPARATE_WT_SUM) AS SPOP_A1_SEPARATE_WT_SUM                                    ";
	sql += "               , SUM(SPOP_A1_SEPARATE_IT_SUM) AS SPOP_A1_SEPARATE_IT_SUM                                    ";
	sql += "               , SUM(SPOP_A1_COMBINED_WT_SUM) AS SPOP_A1_COMBINED_WT_SUM                                    ";
	sql += "               , SUM(SPOP_A1_COMBINED_IT_SUM) AS SPOP_A1_COMBINED_IT_SUM                                    ";
	sql += "               , SUM(SPOP_A2_SUM) AS SPOP_A2_SUM                                                            ";
	sql += "               , SUM(SPOP_A2_SANITARY) AS SPOP_A2_SANITARY                                                  ";
	sql += "               , SUM(SPOP_A2_SEPTIC) AS SPOP_A2_SEPTIC                                                      ";
	sql += "               , SUM(SPOP_A2_REMOVAL) AS SPOP_A2_REMOVAL                                                    ";
	sql += "            from (                                                                                          ";
	sql += "                  SELECT YYYY                                                                               ";
	sql += "                       , WS_NM                                                                              ";
	sql += "                       , MB_NM                                                                              ";
	sql += "                       , SB_NM                                                                              ";
	sql += "                       , CAT_DID                                                                            ";
	sql += "                       , ADDR                                                                               ";
	sql += "                       , FINAL_PERCENTAGE                                                                   ";
	sql += "                       , ADM_CD                                                                             ";
	sql += "                       , SB_ID                                                                              ";
	sql += "                       , AREA_A1                                                                            ";
	sql += "                       , AREA_A2                                                                            ";
	sql += "                       , AREA_SUM                                                                           ";
	sql += "                       , REGION                                                                             ";
	sql += "                       , REGION_DATE                                                                        ";
	sql += "                       , U_A1_TP_CODE                                                                       ";
	sql += "                       , U_A1_TP_DATE                                                                       ";
	sql += "                       , U_A1_TP_NAME                                                                       ";
	sql += "                       , U_A3_TP_CODE                                                                       ";
	sql += "                       , U_A3_TP_DATE                                                                       ";
	sql += "                       , U_A3_TP_NAME                                                                       ";
	sql += "                       , POP_SUM                                                                            ";
	sql += "                       , UPOP_SUM                                                                           ";
	sql += "                       , UPOP_A1_SUM                                                                        ";
	sql += "                       , UPOP_A1_SEPARATE_WT_SUM                                                            ";
	sql += "                       , UPOP_A1_SEPARATE_IT_SUM                                                            ";
	sql += "                       , UPOP_A1_COMBINED_WT_SUM                                                            ";
	sql += "                       , UPOP_A1_COMBINED_IT_SUM                                                            ";
	sql += "                       , UPOP_A2_SUM                                                                        ";
	sql += "                       , UPOP_A2_SANITARY                                                                   ";
	sql += "                       , UPOP_A2_SEPTIC                                                                     ";
	sql += "                       , UPOP_A2_REMOVAL                                                                    ";
	sql += "                       , SPOP_SUM                                                                           ";
	sql += "                       , SPOP_A1_SUM                                                                        ";
	sql += "                       , SPOP_A1_SEPARATE_WT_SUM                                                            ";
	sql += "                       , SPOP_A1_SEPARATE_IT_SUM                                                            ";
	sql += "                       , SPOP_A1_COMBINED_WT_SUM                                                            ";
	sql += "                       , SPOP_A1_COMBINED_IT_SUM                                                            ";
	sql += "                       , SPOP_A2_SUM                                                                        ";
	sql += "                       , SPOP_A2_SANITARY                                                                   ";
	sql += "                       , SPOP_A2_SEPTIC                                                                     ";
	sql += "                       , SPOP_A2_REMOVAL                                                                    ";
	sql += "                    FROM TBL_PLA_POP_TOTAL                                                                  ";
	sql += "                 )                                                                                          ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID                                                         ";
	sql += "          union                                                                                             ";
	sql += "          SELECT '' AS YYYY                                                                                 ";
	sql += "               , '' AS WS_NM                                                                                ";
	sql += "               , '' AS MB_NM                                                                                ";
	sql += "               , '총계' AS SB_NM                                                                            ";
	sql += "               , '' AS SB_ID                                                                                ";
	sql += "               , SUM(AREA_A1) AS AREA_A1                                                                    ";
	sql += "               , SUM(AREA_A2) AS AREA_A2                                                                    ";
	sql += "               , SUM(AREA_SUM) AS AREA_SUM                                                                  ";
	sql += "               , '' AS REGION                                                                               ";
	sql += "               , '' AS REGION_DATE                                                                          ";
	sql += "               , '' AS U_A1_TP_CODE                                                                         ";
	sql += "               , '' AS U_A1_TP_DATE                                                                         ";
	sql += "               , '' AS U_A1_TP_NAME                                                                         ";
	sql += "               , '' AS U_A3_TP_CODE                                                                         ";
	sql += "               , '' AS U_A3_TP_DATE                                                                         ";
	sql += "               , '' AS U_A3_TP_NAME                                                                         ";
	sql += "               , SUM(POP_SUM) AS POP_SUM                                                                    ";
	sql += "               , SUM(UPOP_SUM) AS UPOP_SUM                                                                  ";
	sql += "               , SUM(UPOP_A1_SUM) AS UPOP_A1_SUM                                                            ";
	sql += "               , SUM(UPOP_A1_SEPARATE_WT_SUM) AS UPOP_A1_SEPARATE_WT_SUM                                    ";
	sql += "               , SUM(UPOP_A1_SEPARATE_IT_SUM) AS UPOP_A1_SEPARATE_IT_SUM                                    ";
	sql += "               , SUM(UPOP_A1_COMBINED_WT_SUM) AS UPOP_A1_COMBINED_WT_SUM                                    ";
	sql += "               , SUM(UPOP_A1_COMBINED_IT_SUM) AS UPOP_A1_COMBINED_IT_SUM                                    ";
	sql += "               , SUM(UPOP_A2_SUM) AS UPOP_A2_SUM                                                            ";
	sql += "               , SUM(UPOP_A2_SANITARY) AS UPOP_A2_SANITARY                                                  ";
	sql += "               , SUM(UPOP_A2_SEPTIC) AS UPOP_A2_SEPTIC                                                      ";
	sql += "               , SUM(UPOP_A2_REMOVAL) AS UPOP_A2_REMOVAL                                                    ";
	sql += "               , SUM(SPOP_SUM) AS SPOP_SUM                                                                  ";
	sql += "               , SUM(SPOP_A1_SUM) AS SPOP_A1_SUM                                                            ";
	sql += "               , SUM(SPOP_A1_SEPARATE_WT_SUM) AS SPOP_A1_SEPARATE_WT_SUM                                    ";
	sql += "               , SUM(SPOP_A1_SEPARATE_IT_SUM) AS SPOP_A1_SEPARATE_IT_SUM                                    ";
	sql += "               , SUM(SPOP_A1_COMBINED_WT_SUM) AS SPOP_A1_COMBINED_WT_SUM                                    ";
	sql += "               , SUM(SPOP_A1_COMBINED_IT_SUM) AS SPOP_A1_COMBINED_IT_SUM                                    ";
	sql += "               , SUM(SPOP_A2_SUM) AS SPOP_A2_SUM                                                            ";
	sql += "               , SUM(SPOP_A2_SANITARY) AS SPOP_A2_SANITARY                                                  ";
	sql += "               , SUM(SPOP_A2_SEPTIC) AS SPOP_A2_SEPTIC                                                      ";
	sql += "               , SUM(SPOP_A2_REMOVAL) AS SPOP_A2_REMOVAL                                                    ";
	sql += "            FROM TBL_PLA_POP_TOTAL                                                                          ";
	sql += "         )                                                                                                  ";
	sql += "   ORDER BY DECODE(SB_NM,'총계',1,2), SB_ID                                                                 ";

	
	
	
	

    
//System.out.println(sql);
stmt = con.createStatement();
rs = stmt.executeQuery(sql);

	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("YYYY",rs.getString("YYYY"));
		jsonRecord.put("WS_NM",rs.getString("WS_NM"));
		jsonRecord.put("MB_NM",rs.getString("MB_NM"));
		jsonRecord.put("SB_NM",rs.getString("SB_NM"));
		jsonRecord.put("POP_SUM",rs.getString("POP_SUM"));
		jsonRecord.put("UPOP_SUM",rs.getString("UPOP_SUM"));
		jsonRecord.put("SPOP_SUM",rs.getString("SPOP_SUM"));
		
		
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