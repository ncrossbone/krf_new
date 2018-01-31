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
	
	sql = " WITH TBL_PLA_FISHFARM_TOTAL AS (																																					";
	sql += "         SELECT YYYY /* 조사년도 */                                                                       ";
	sql += "              , WS_NM                                                                                     ";
	sql += "              , MB_NM                                                                                     ";
	sql += "              , SB_NM                                                                                     ";
	sql += "              , CAT_ID                                                                                    ";
	sql += "              , CAT_DID                                                                                   ";
	sql += "              , DO_NM||' '||CTY_NM||' '||DONG_NM||' '||RI_NM AS ADDR /* 법정동리 */                       ";
	sql += "              , CASE WHEN SUBSTR(FINAL_PERCENTAGE,0,1) = '.' THEN '0'||FINAL_PERCENTAGE                   ";
	sql += "                ELSE TO_CHAR(FINAL_PERCENTAGE)                                                            ";
	sql += "                END AS FINAL_PERCENTAGE                                                                   ";
	sql += "              , AREA_REG_TOTAL  /* 면허면적 합계 */                                                       ";
	sql += "              , AREA_INST_TOTAL /* 시설면적 합계 */                                                       ";
	sql += "              , FEED_AMT_TOTAL  /* 사료사용량 합계 */                                                     ";
	sql += "              , FISH_REG_TOTAL  /* 출고량 합계 */                                                         ";
	sql += "              , AREA_REG1  /* 가두리 면허면적(㎡) */                                                      ";
	sql += "              , AREA_INST1 /* 가두리 시설면적(㎡) */                                                      ";
	sql += "              , FEED_AMT1  /* 가두리 사료사용량(㎏/년) */                                                 ";
	sql += "              , FISH_REG1  /* 가두리 출고량(㎏/년) */                                                     ";
	sql += "              , AREA_REG3  /* 도전양식 면허면적(㎡) */                                                    ";
	sql += "              , AREA_INST3 /* 도전양식 시설면적(㎡) */                                                    ";
	sql += "              , FEED_AMT3  /* 도전양식 사료사용량(㎏/년) */                                               ";
	sql += "              , FISH_REG3  /* 도전양식 출고량(㎏/년) */                                                   ";
	sql += "              , AREA_REG4  /* 순환여과식면허면적(㎡) */                                                   ";
	sql += "              , AREA_INST4 /* 순환여과식시설면적(㎡) */                                                   ";
	sql += "              , FEED_AMT4  /* 순환여과식 사료(㎏/년) */                                                   ";
	sql += "              , FISH_REG4  /* 순환여과식 출고량(㎏/년) */                                                 ";
	sql += "              , AREA_REG5  /* 유수식 면허면적(㎡) */                                                      ";
	sql += "              , AREA_INST5 /* 유수식 시설면적(㎡) */                                                      ";
	sql += "              , FEED_AMT5  /* 유수식 사료사용량(㎏/년) */                                                 ";
	sql += "              , FISH_REG5  /* 유수식 출고량(㎏/년) */                                                     ";
	sql += "              , AREA_REG6  /* 지수식 면허면적(㎡) */                                                      ";
	sql += "              , AREA_INST6 /* 지수식 시설면적(㎡) */                                                      ";
	sql += "              , FEED_AMT6  /* 지수식 사료사용량(㎏/년) */                                                 ";
	sql += "              , FISH_REG6  /* 지수식 출고량(㎏/년) */                                                     ";
	sql += "              , AREA_REG2  /* 기타 면허면적(㎡) */                                                        ";
	sql += "              , AREA_INST2 /* 기타 시설면적(㎡) */                                                        ";
	sql += "              , FEED_AMT2  /* 기타 사료사용량(㎏/년) */                                                   ";
	sql += "              , FISH_REG2  /* 기타 출고량(㎏/년) */                                                       ";
	sql += "              , ADM_CD                                                                                    ";
	sql += "              , SB_ID                                                                                     ";
	sql += "           FROM PLA_FISHFARM_TOTAL_FOR_CAT                                                                ";
	if(catDid.length != 0){
		sql += "           WHERE CAT_DID IN (                                           ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "        )                                                                                                 ";
	sql += " SELECT YYYY /* 조사년도 */                                                                               ";
	sql += "      , WS_NM                                                                                             ";
	sql += "      , MB_NM                                                                                             ";
	sql += "      , SB_NM                                                                                             ";
	sql += "      , AREA_REG_TOTAL  /* 면허면적 합계 */                                                               ";
	sql += "      , AREA_INST_TOTAL /* 시설면적 합계 */                                                               ";
	sql += "      , FEED_AMT_TOTAL  /* 사료사용량 합계 */                                                             ";
	sql += "      , FISH_REG_TOTAL  /* 출고량 합계 */                                                                 ";
	sql += "      , AREA_REG1  /* 가두리 면허면적(㎡) */                                                              ";
	sql += "      , AREA_INST1 /* 가두리 시설면적(㎡) */                                                              ";
	sql += "      , FEED_AMT1  /* 가두리 사료사용량(㎏/년) */                                                         ";
	sql += "      , FISH_REG1  /* 가두리 출고량(㎏/년) */                                                             ";
	sql += "      , AREA_REG3  /* 도전양식 면허면적(㎡) */                                                            ";
	sql += "      , AREA_INST3 /* 도전양식 시설면적(㎡) */                                                            ";
	sql += "      , FEED_AMT3  /* 도전양식 사료사용량(㎏/년) */                                                       ";
	sql += "      , FISH_REG3  /* 도전양식 출고량(㎏/년) */                                                           ";
	sql += "      , AREA_REG4  /* 순환여과식면허면적(㎡) */                                                           ";
	sql += "      , AREA_INST4 /* 순환여과식시설면적(㎡) */                                                           ";
	sql += "      , FEED_AMT4  /* 순환여과식 사료(㎏/년) */                                                           ";
	sql += "      , FISH_REG4  /* 순환여과식 출고량(㎏/년) */                                                         ";
	sql += "      , AREA_REG5  /* 유수식 면허면적(㎡) */                                                              ";
	sql += "      , AREA_INST5 /* 유수식 시설면적(㎡) */                                                              ";
	sql += "      , FEED_AMT5  /* 유수식 사료사용량(㎏/년) */                                                         ";
	sql += "      , FISH_REG5  /* 유수식 출고량(㎏/년) */                                                             ";
	sql += "      , AREA_REG6  /* 지수식 면허면적(㎡) */                                                              ";
	sql += "      , AREA_INST6 /* 지수식 시설면적(㎡) */                                                              ";
	sql += "      , FEED_AMT6  /* 지수식 사료사용량(㎏/년) */                                                         ";
	sql += "      , FISH_REG6  /* 지수식 출고량(㎏/년) */                                                             ";
	sql += "      , AREA_REG2  /* 기타 면허면적(㎡) */                                                                ";
	sql += "      , AREA_INST2 /* 기타 시설면적(㎡) */                                                                ";
	sql += "      , FEED_AMT2  /* 기타 사료사용량(㎏/년) */                                                           ";
	sql += "      , FISH_REG2  /* 기타 출고량(㎏/년) */                                                               ";
	sql += "      , ADM_CD                                                                                            ";
	sql += "   FROM (                                                                                                 ";
	sql += "         SELECT YYYY /* 조사년도 */                                                                       ";
	sql += "              , WS_NM                                                                                     ";
	sql += "              , MB_NM                                                                                     ";
	sql += "              , SB_NM                                                                                     ";
	sql += "              , SUM(AREA_REG_TOTAL ) AS AREA_REG_TOTAL  /* 면허면적 합계 */                               ";
	sql += "              , SUM(AREA_INST_TOTAL) AS AREA_INST_TOTAL /* 시설면적 합계 */                               ";
	sql += "              , SUM(FEED_AMT_TOTAL ) AS FEED_AMT_TOTAL  /* 사료사용량 합계 */                             ";
	sql += "              , SUM(FISH_REG_TOTAL ) AS FISH_REG_TOTAL  /* 출고량 합계 */                                 ";
	sql += "              , SUM(AREA_REG1      ) AS AREA_REG1       /* 가두리 면허면적(㎡) */                         ";
	sql += "              , SUM(AREA_INST1     ) AS AREA_INST1      /* 가두리 시설면적(㎡) */                         ";
	sql += "              , SUM(FEED_AMT1      ) AS FEED_AMT1       /* 가두리 사료사용량(㎏/년) */                    ";
	sql += "              , SUM(FISH_REG1      ) AS FISH_REG1       /* 가두리 출고량(㎏/년) */                        ";
	sql += "              , SUM(AREA_REG3      ) AS AREA_REG3       /* 도전양식 면허면적(㎡) */                       ";
	sql += "              , SUM(AREA_INST3     ) AS AREA_INST3      /* 도전양식 시설면적(㎡) */                       ";
	sql += "              , SUM(FEED_AMT3      ) AS FEED_AMT3       /* 도전양식 사료사용량(㎏/년) */                  ";
	sql += "              , SUM(FISH_REG3      ) AS FISH_REG3       /* 도전양식 출고량(㎏/년) */                      ";
	sql += "              , SUM(AREA_REG4      ) AS AREA_REG4       /* 순환여과식면허면적(㎡) */                      ";
	sql += "              , SUM(AREA_INST4     ) AS AREA_INST4      /* 순환여과식시설면적(㎡) */                      ";
	sql += "              , SUM(FEED_AMT4      ) AS FEED_AMT4       /* 순환여과식 사료(㎏/년) */                      ";
	sql += "              , SUM(FISH_REG4      ) AS FISH_REG4       /* 순환여과식 출고량(㎏/년) */                    ";
	sql += "              , SUM(AREA_REG5      ) AS AREA_REG5       /* 유수식 면허면적(㎡) */                         ";
	sql += "              , SUM(AREA_INST5     ) AS AREA_INST5      /* 유수식 시설면적(㎡) */                         ";
	sql += "              , SUM(FEED_AMT5      ) AS FEED_AMT5       /* 유수식 사료사용량(㎏/년) */                    ";
	sql += "              , SUM(FISH_REG5      ) AS FISH_REG5       /* 유수식 출고량(㎏/년) */                        ";
	sql += "              , SUM(AREA_REG6      ) AS AREA_REG6       /* 지수식 면허면적(㎡) */                         ";
	sql += "              , SUM(AREA_INST6     ) AS AREA_INST6      /* 지수식 시설면적(㎡) */                         ";
	sql += "              , SUM(FEED_AMT6      ) AS FEED_AMT6       /* 지수식 사료사용량(㎏/년) */                    ";
	sql += "              , SUM(FISH_REG6      ) AS FISH_REG6       /* 지수식 출고량(㎏/년) */                        ";
	sql += "              , SUM(AREA_REG2      ) AS AREA_REG2       /* 기타 면허면적(㎡) */                           ";
	sql += "              , SUM(AREA_INST2     ) AS AREA_INST2      /* 기타 시설면적(㎡) */                           ";
	sql += "              , SUM(FEED_AMT2      ) AS FEED_AMT2       /* 기타 사료사용량(㎏/년) */                      ";
	sql += "              , SUM(FISH_REG2      ) AS FISH_REG2       /* 기타 출고량(㎏/년) */                          ";
	sql += "              , '' as ADM_CD                                                                              ";
	sql += "              , SB_ID                                                                                     ";
	sql += "           FROM TBL_PLA_FISHFARM_TOTAL                                                                    ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID                                                       ";
	sql += "         UNION                                                                                            ";
	sql += "         SELECT '' AS YYYY /* 조사년도 */                                                                 ";
	sql += "              , '' AS WS_NM                                                                               ";
	sql += "              , '' AS MB_NM                                                                               ";
	sql += "              , '총계' AS SB_NM                                                                           ";
	sql += "              , SUM(AREA_REG_TOTAL ) AS AREA_REG_TOTAL  /* 면허면적 합계 */                               ";
	sql += "              , SUM(AREA_INST_TOTAL) AS AREA_INST_TOTAL /* 시설면적 합계 */                               ";
	sql += "              , SUM(FEED_AMT_TOTAL ) AS FEED_AMT_TOTAL  /* 사료사용량 합계 */                             ";
	sql += "              , SUM(FISH_REG_TOTAL ) AS FISH_REG_TOTAL  /* 출고량 합계 */                                 ";
	sql += "              , SUM(AREA_REG1      ) AS AREA_REG1       /* 가두리 면허면적(㎡) */                         ";
	sql += "              , SUM(AREA_INST1     ) AS AREA_INST1      /* 가두리 시설면적(㎡) */                         ";
	sql += "              , SUM(FEED_AMT1      ) AS FEED_AMT1       /* 가두리 사료사용량(㎏/년) */                    ";
	sql += "              , SUM(FISH_REG1      ) AS FISH_REG1       /* 가두리 출고량(㎏/년) */                        ";
	sql += "              , SUM(AREA_REG3      ) AS AREA_REG3       /* 도전양식 면허면적(㎡) */                       ";
	sql += "              , SUM(AREA_INST3     ) AS AREA_INST3      /* 도전양식 시설면적(㎡) */                       ";
	sql += "              , SUM(FEED_AMT3      ) AS FEED_AMT3       /* 도전양식 사료사용량(㎏/년) */                  ";
	sql += "              , SUM(FISH_REG3      ) AS FISH_REG3       /* 도전양식 출고량(㎏/년) */                      ";
	sql += "              , SUM(AREA_REG4      ) AS AREA_REG4       /* 순환여과식면허면적(㎡) */                      ";
	sql += "              , SUM(AREA_INST4     ) AS AREA_INST4      /* 순환여과식시설면적(㎡) */                      ";
	sql += "              , SUM(FEED_AMT4      ) AS FEED_AMT4       /* 순환여과식 사료(㎏/년) */                      ";
	sql += "              , SUM(FISH_REG4      ) AS FISH_REG4       /* 순환여과식 출고량(㎏/년) */                    ";
	sql += "              , SUM(AREA_REG5      ) AS AREA_REG5       /* 유수식 면허면적(㎡) */                         ";
	sql += "              , SUM(AREA_INST5     ) AS AREA_INST5      /* 유수식 시설면적(㎡) */                         ";
	sql += "              , SUM(FEED_AMT5      ) AS FEED_AMT5       /* 유수식 사료사용량(㎏/년) */                    ";
	sql += "              , SUM(FISH_REG5      ) AS FISH_REG5       /* 유수식 출고량(㎏/년) */                        ";
	sql += "              , SUM(AREA_REG6      ) AS AREA_REG6       /* 지수식 면허면적(㎡) */                         ";
	sql += "              , SUM(AREA_INST6     ) AS AREA_INST6      /* 지수식 시설면적(㎡) */                         ";
	sql += "              , SUM(FEED_AMT6      ) AS FEED_AMT6       /* 지수식 사료사용량(㎏/년) */                    ";
	sql += "              , SUM(FISH_REG6      ) AS FISH_REG6       /* 지수식 출고량(㎏/년) */                        ";
	sql += "              , SUM(AREA_REG2      ) AS AREA_REG2       /* 기타 면허면적(㎡) */                           ";
	sql += "              , SUM(AREA_INST2     ) AS AREA_INST2      /* 기타 시설면적(㎡) */                           ";
	sql += "              , SUM(FEED_AMT2      ) AS FEED_AMT2       /* 기타 사료사용량(㎏/년) */                      ";
	sql += "              , SUM(FISH_REG2      ) AS FISH_REG2       /* 기타 출고량(㎏/년) */                          ";
	sql += "              , '' AS ADM_CD                                                                              ";
	sql += "              , '' AS SB_ID                                                                               ";
	sql += "           FROM TBL_PLA_FISHFARM_TOTAL                                                                    ";
	sql += "        )                                                                                                 ";
	sql += "  ORDER BY DECODE(SB_NM,'총계',1,2), SB_ID, DECODE(SB_NM,'소계',1,2)                                      ";
	
    
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
		jsonRecord.put("AREA_REG_TOTAL",rs.getString("AREA_REG_TOTAL"));
		jsonRecord.put("AREA_INST_TOTAL",rs.getString("AREA_INST_TOTAL"));
		jsonRecord.put("FEED_AMT_TOTAL",rs.getString("FEED_AMT_TOTAL"));
		jsonRecord.put("FISH_REG_TOTAL",rs.getString("FISH_REG_TOTAL"));
		jsonRecord.put("AREA_REG1",rs.getString("AREA_REG1"));
		jsonRecord.put("AREA_INST1",rs.getString("AREA_INST1"));
		jsonRecord.put("FEED_AMT1",rs.getString("FEED_AMT1"));
		jsonRecord.put("FISH_REG1",rs.getString("FISH_REG1"));
		jsonRecord.put("AREA_REG3",rs.getString("AREA_REG3"));
		jsonRecord.put("AREA_INST3",rs.getString("AREA_INST3"));
		jsonRecord.put("FEED_AMT3",rs.getString("FEED_AMT3"));
		jsonRecord.put("FISH_REG3",rs.getString("FISH_REG3"));
		jsonRecord.put("AREA_REG4",rs.getString("AREA_REG4"));
		jsonRecord.put("AREA_INST4",rs.getString("AREA_INST4"));
		jsonRecord.put("FEED_AMT4",rs.getString("FEED_AMT4"));
		jsonRecord.put("FISH_REG4",rs.getString("FISH_REG4"));
		jsonRecord.put("AREA_REG5",rs.getString("AREA_REG5"));
		jsonRecord.put("AREA_INST5",rs.getString("AREA_INST5"));
		jsonRecord.put("FEED_AMT5",rs.getString("FEED_AMT5"));
		jsonRecord.put("FISH_REG5",rs.getString("FISH_REG5"));
		jsonRecord.put("AREA_REG6",rs.getString("AREA_REG6"));
		jsonRecord.put("AREA_INST6",rs.getString("AREA_INST6"));
		jsonRecord.put("FEED_AMT6",rs.getString("FEED_AMT6"));
		jsonRecord.put("FISH_REG6",rs.getString("FISH_REG6"));
		jsonRecord.put("AREA_REG2",rs.getString("AREA_REG2"));
		jsonRecord.put("AREA_INST2",rs.getString("AREA_INST2"));
		jsonRecord.put("FEED_AMT2",rs.getString("FEED_AMT2"));
		jsonRecord.put("FISH_REG2",rs.getString("FISH_REG2"));
		
		
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