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
	
	sql = "   with tbl_PLA_LANDUSE as (                                                 ";
	sql += "      select YYYY        /* 조사년도 */                                     ";
	sql += "           , WS_NM       /* 대권역 */                                       ";
	sql += "           , MB_NM       /* 중권역 */                                       ";
	sql += "           , SB_NM       /* 소권역 */                                       ";
	sql += "           , CAT_DID     /* 집수구역 */                                     ";
	sql += "           , DO_NM||CTY_NM||DONG_NM||RI_NM as ADDR /* 법정동리 */           ";
	sql += "           , FACI_NM       /* 매립장명 */                                   ";
	sql += "           , WORK_DT       /* 운영일자 */                                   ";
	sql += "           , PRODUCT_AMT   /* 발생유량(㎥/일) */                            ";
	sql += "           , DISCHARGE_AMT /* 방류유량(㎥/일) */                            ";
	sql += "           , PRODUCT_BOD   /* 발생농도 BOD(㎎/ℓ) */                        ";
	sql += "           , PRODUCT_COD   /* 발생농도 COD(㎎/ℓ) */                        ";
	sql += "           , PRODUCT_TN    /* 발생농도 TN(㎎/ℓ) */                         ";
	sql += "           , PRODUCT_TP    /* 발생농도 TP(㎎/ℓ) */                         ";
	sql += "           , DISCHARGE_BOD /* 방류농도 BOD(㎎/ℓ) */                        ";
	sql += "           , DISCHARGE_COD /* 방류농도 COD(㎎/ℓ) */                        ";
	sql += "           , DISCHARGE_TN  /* 방류농도 TN(㎎/ℓ) */                         ";
	sql += "           , DISCHARGE_TP  /* 방류농도 TP(㎎/ℓ) */                         ";
	sql += "           , ADM_CD                                                         ";
	sql += "           , SB_ID                                                          ";
	sql += "           , FINAL_PERCENTAGE                                               ";
	sql += "        from PLA_LANDFILL_LEACH_FOR_CAT                                     ";
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
	sql += "      )                                                                     ";
	sql += "  select YYYY             /* 조사년도 */                                    ";
	sql += "       , WS_NM            /* 대권역 */                                      ";
	sql += "       , MB_NM            /* 중권역 */                                      ";
	sql += "       , SB_NM            /* 소권역 */                                      ";
	sql += "       , CAT_DID          /* 집수구역 */                                    ";
	sql += "       , ADDR             /* 법정동리 */                                    ";
	sql += "       , FINAL_PERCENTAGE /* 점유율 */                                      ";
	sql += "       , FACI_NM          /* 매립장명 */                                    ";
	sql += "       , WORK_DT          /* 운영일자 */                                    ";
	sql += "       , PRODUCT_AMT      /* 발생유량(㎥/일) */                             ";
	sql += "       , DISCHARGE_AMT    /* 방류유량(㎥/일) */                             ";
	sql += "       , PRODUCT_BOD      /* 발생농도 BOD(㎎/ℓ) */                         ";
	sql += "       , PRODUCT_COD      /* 발생농도 COD(㎎/ℓ) */                         ";
	sql += "       , PRODUCT_TN       /* 발생농도 TN(㎎/ℓ) */                          ";
	sql += "       , PRODUCT_TP       /* 발생농도 TP(㎎/ℓ) */                          ";
	sql += "       , DISCHARGE_BOD    /* 방류농도 BOD(㎎/ℓ) */                         ";
	sql += "       , DISCHARGE_COD    /* 방류농도 COD(㎎/ℓ) */                         ";
	sql += "       , DISCHARGE_TN     /* 방류농도 TN(㎎/ℓ) */                          ";
	sql += "       , DISCHARGE_TP     /* 방류농도 TP(㎎/ℓ) */                          ";
	sql += "    from (                                                                  ";
	sql += "          select YYYY        /* 조사년도 */                                 ";
	sql += "               , WS_NM       /* 대권역 */                                   ";
	sql += "               , MB_NM       /* 중권역 */                                   ";
	sql += "               , SB_NM       /* 소권역 */                                   ";
	sql += "               , CAT_DID     /* 집수구역 */                                 ";
	sql += "               , ADDR        /* 법정동리 */                                 ";
	sql += "               , FINAL_PERCENTAGE  /* 점유율 */                             ";
	sql += "               , FACI_NM       /* 매립장명 */                               ";
	sql += "               , WORK_DT       /* 운영일자 */                               ";
	sql += "               , PRODUCT_AMT   /* 발생유량(㎥/일) */                        ";
	sql += "               , DISCHARGE_AMT /* 방류유량(㎥/일) */                        ";
	sql += "               , PRODUCT_BOD   /* 발생농도 BOD(㎎/ℓ) */                    ";
	sql += "               , PRODUCT_COD   /* 발생농도 COD(㎎/ℓ) */                    ";
	sql += "               , PRODUCT_TN    /* 발생농도 TN(㎎/ℓ) */                     ";
	sql += "               , PRODUCT_TP    /* 발생농도 TP(㎎/ℓ) */                     ";
	sql += "               , DISCHARGE_BOD /* 방류농도 BOD(㎎/ℓ) */                    ";
	sql += "               , DISCHARGE_COD /* 방류농도 COD(㎎/ℓ) */                    ";
	sql += "               , DISCHARGE_TN  /* 방류농도 TN(㎎/ℓ) */                     ";
	sql += "               , DISCHARGE_TP  /* 방류농도 TP(㎎/ℓ) */                     ";
	sql += "               , ADM_CD                                                     ";
	sql += "               , SB_ID                                                      ";
	sql += "           from tbl_PLA_LANDUSE                                             ";
	sql += "          union                                                             ";
	sql += "          select ''     /* 조사년도 */                                      ";
	sql += "               , ''     /* 대권역 */                                        ";
	sql += "               , ''     /* 중권역 */                                        ";
	sql += "               , ''     /* 소권역 */                                        ";
	sql += "               , ''     /* 집수구역 */                                      ";
	sql += "               , '총계' /* 법정동리 */                                      ";
	sql += "               , ''      /* 점유율 */                                       ";
	sql += "               , ''       /* 매립장명 */                                    ";
	sql += "               , ''       /* 운영일자 */                                    ";
	sql += "               , sum(PRODUCT_AMT)   /* 발생유량(㎥/일) */                   ";
	sql += "               , sum(DISCHARGE_AMT) /* 방류유량(㎥/일) */                   ";
	sql += "               , sum(PRODUCT_BOD)   /* 발생농도 BOD(㎎/ℓ) */               ";
	sql += "               , sum(PRODUCT_COD)   /* 발생농도 COD(㎎/ℓ) */               ";
	sql += "               , sum(PRODUCT_TN)    /* 발생농도 TN(㎎/ℓ) */                ";
	sql += "               , sum(PRODUCT_TP)    /* 발생농도 TP(㎎/ℓ) */                ";
	sql += "               , sum(DISCHARGE_BOD) /* 방류농도 BOD(㎎/ℓ) */               ";
	sql += "               , sum(DISCHARGE_COD) /* 방류농도 COD(㎎/ℓ) */               ";
	sql += "               , sum(DISCHARGE_TN)  /* 방류농도 TN(㎎/ℓ) */                ";
	sql += "               , sum(DISCHARGE_TP)  /* 방류농도 TP(㎎/ℓ) */                ";
	sql += "               , '' as ADM_CD                                               ";
	sql += "               , '' as SB_ID                                                ";
	sql += "           from tbl_PLA_LANDUSE                                             ";
	sql += "          union                                                             ";
	sql += "          select YYYY        /* 조사년도 */                                 ";
	sql += "               , WS_NM       /* 대권역 */                                   ";
	sql += "               , MB_NM       /* 중권역 */                                   ";
	sql += "               , SB_NM       /* 소권역 */                                   ";
	sql += "               , CAT_DID     /* 집수구역 */                                 ";
	sql += "               , ADDR /* 법정동리 */                                        ";
	sql += "               , '소계' as FINAL_PERCENTAGE /* 점유율 */                    ";
	sql += "               , ''       /* 매립장명 */                                    ";
	sql += "               , ''       /* 운영일자 */                                    ";
	sql += "               , sum(PRODUCT_AMT)   /* 발생유량(㎥/일) */                   ";
	sql += "               , sum(DISCHARGE_AMT) /* 방류유량(㎥/일) */                      		";
	sql += "               , sum(PRODUCT_BOD)   /* 발생농도 BOD(㎎/ℓ) */                     ";
	sql += "               , sum(PRODUCT_COD)   /* 발생농도 COD(㎎/ℓ) */                     ";
	sql += "               , sum(PRODUCT_TN)    /* 발생농도 TN(㎎/ℓ) */                  ";
	sql += "                       , sum(PRODUCT_TP)    /* 발생농도 TP(㎎/ℓ) */              ";
	sql += "                       , sum(DISCHARGE_BOD) /* 방류농도 BOD(㎎/ℓ) */             														";
	sql += "                       , sum(DISCHARGE_COD) /* 방류농도 COD(㎎/ℓ) */                                         ";
	sql += "                       , sum(DISCHARGE_TN)  /* 방류농도 TN(㎎/ℓ) */                                          ";
	sql += "                       , sum(DISCHARGE_TP)  /* 방류농도 TP(㎎/ℓ) */                                          ";
	sql += "                       , ADM_CD                                                                               ";
	sql += "                       , SB_ID                                                                                ";
	sql += "                   from tbl_PLA_LANDUSE                                                                       ";
	sql += "                  GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID, ADDR, ADM_CD                            ";
	sql += "                 )                                                                                            ";
	sql += "           ORDER BY DECODE(ADDR,'총계',1,2), SB_ID, CAT_DID, ADM_CD, DECODE(FINAL_PERCENTAGE,'소계',1,2)      ";
	
	
	
	

    
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
		jsonRecord.put("ADDR",rs.getString("ADDR"));
		jsonRecord.put("FINAL_PERCENTAGE",rs.getString("FINAL_PERCENTAGE"));
		jsonRecord.put("CAT_DID",rs.getString("CAT_DID"));
		jsonRecord.put("FACI_NM",rs.getString("FACI_NM"));
		jsonRecord.put("WORK_DT",rs.getString("WORK_DT"));
		jsonRecord.put("PRODUCT_AMT",rs.getString("PRODUCT_AMT"));
		jsonRecord.put("DISCHARGE_AMT",rs.getString("DISCHARGE_AMT"));
		jsonRecord.put("PRODUCT_BOD",rs.getString("PRODUCT_BOD"));
		jsonRecord.put("PRODUCT_COD",rs.getString("PRODUCT_COD"));
		jsonRecord.put("PRODUCT_TN",rs.getString("PRODUCT_TN"));
		jsonRecord.put("PRODUCT_TP",rs.getString("PRODUCT_TP"));
		jsonRecord.put("DISCHARGE_BOD",rs.getString("DISCHARGE_BOD"));
		jsonRecord.put("DISCHARGE_COD",rs.getString("DISCHARGE_COD"));
		jsonRecord.put("DISCHARGE_TN",rs.getString("DISCHARGE_TN"));
		jsonRecord.put("DISCHARGE_TP",rs.getString("DISCHARGE_TP"));
		
		
		
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