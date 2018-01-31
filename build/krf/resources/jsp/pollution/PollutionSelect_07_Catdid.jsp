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
	
	sql = " WITH TBL_PLA_LANDUSE AS (																												";
	sql += "     SELECT YYYY /* 조사년도 */                                                   ";
	sql += "          , WS_NM                                                                 ";
	sql += "          , MB_NM                                                                 ";
	sql += "          , SB_NM                                                                 ";
	sql += "          , CAT_DID                                                               ";
	sql += "          , DO_NM||CTY_NM||DONG_NM||RI_NM as addr                                 ";
	sql += "          , FINAL_PERCENTAGE /* 점유율 */                                         ";
	sql += "          , INST_NM /* 관할기관명 */                                              ";
	sql += "          , IND_NM /* 업소명 */                                                   ";
	sql += "          , IND_OWNER /* 대표자 */                                                ";
	sql += "          , IND_ID /* 사업자등록번호 */                                           ";
	sql += "          , OT_NM /* 기타수질오염원분류 */                                        ";
	sql += "          , EH_NM /* 처리방법 */                                                  ";
	sql += "          , WW_AMT /* 폐수방류량(㎥/일) */                                        ";
	sql += "          , ADM_CD                                                                ";
	sql += "          , SB_ID                                                                 ";
	sql += "       FROM PLA_OPS_TOTAL_FOR_CAT                                                 ";
	if(catDid.length != 0){
		sql += "        where CAT_DID IN (                                ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "     )                                                                            ";
	sql += " select YYYY /* 조사년도 */                                                       ";
	sql += "      , WS_NM                                                                     ";
	sql += "      , MB_NM                                                                     ";
	sql += "      , SB_NM                                                                     ";
	sql += "      , CAT_DID                                                                   ";
	sql += "      , INST_NM /* 관할기관명 */                                                  ";
	sql += "      , IND_NM /* 업소명 */                                                       ";
	sql += "      , IND_OWNER /* 대표자 */                                                    ";
	sql += "      , IND_ID /* 사업자등록번호 */                                               ";
	sql += "      , OT_NM /* 기타수질오염원분류 */                                            ";
	sql += "      , EH_NM /* 처리방법 */                                                      ";
	sql += "      , WW_AMT /* 폐수방류량(㎥/일) */                                            ";
	sql += "   from (                                                                         ";
	sql += "         SELECT YYYY /* 조사년도 */                                               ";
	sql += "              , WS_NM                                                             ";
	sql += "              , MB_NM                                                             ";
	sql += "              , SB_NM                                                             ";
	sql += "              , CAT_DID                                                           ";
	sql += "              , '' as INST_NM /* 관할기관명 */                                    ";
	sql += "              , '' as IND_NM /* 업소명 */                                         ";
	sql += "              , '' as IND_OWNER /* 대표자 */                                      ";
	sql += "              , '' as IND_ID /* 사업자등록번호 */                                 ";
	sql += "              , '' as OT_NM /* 기타수질오염원분류 */                              ";
	sql += "              , '' as EH_NM /* 처리방법 */                                        ";
	sql += "              , sum(WW_AMT) as WW_AMT/* 폐수방류량(㎥/일) */                      ";
	sql += "              , '' as ADM_CD                                                      ";
	sql += "              , SB_ID                                                             ";
	sql += "           FROM TBL_PLA_LANDUSE                                                   ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID                      ";
	sql += "        )                                                                         ";
	sql += "  ORDER BY DECODE(SB_NM,'총계',1,2), SB_ID, DECODE(CAT_DID,'소계',1,2), CAT_DID   ";
	
    
//System.out.println(sql);
stmt = con.createStatement();
rs = stmt.executeQuery(sql);

	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("YYYY",rs.getString("YYYY"));
		jsonRecord.put("CAT_DID",rs.getString("CAT_DID"));
		jsonRecord.put("WW_AMT",rs.getString("WW_AMT"));
		
		
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