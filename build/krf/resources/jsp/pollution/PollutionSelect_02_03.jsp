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
	
	sql = " WITH TBL_PLA_ANIMAL_TOTAL AS (                                                                                                ";
	sql += "     SELECT WS_NM                                                                                                              ";
	sql += "          , MB_NM                                                                                                              ";
	sql += "          , SB_NM                                                                                                              ";
	sql += "          , CAT_ID                                                                                                             ";
	sql += "          , CAT_DID                                                                                                            ";
	sql += "          , YYYY /* 조사년도 */                                                                                                ";
	sql += "          , DO_NM||CTY_NM||DONG_NM||RI_NM AS ADDR /* 법정동리 */                                                               ";
	sql += "          , FINAL_PERCENTAGE                                                                                                   ";
	sql += "          , MANAGER /* 업주명 */                                                                                               ";
	sql += "          , LIVESTOCK_NM /* 축종 */                                                                                            ";
	sql += "          , LIVESTOCK_CNT /* 사육두수 */                                                                                     ";
	sql += "          , LIVESTOCK_AREA /* 축사면적(㎡) */                                                                                ";
	sql += "          , REGS /* 법적규제 여부 */                                                                                           ";
	sql += "          , REGS_DATE /* 법적규제일 */                                                                                         ";
	sql += "          , DISCHARGE_FACI_NM /* 방류선환경기초시설 */                                                                         ";
	sql += "          , DISCHARGE_ADM_CD /* 방류선행정구역코드 */                                                                          ";
	sql += "          , DISCHARGE_RIVER_NM /* 방류선하천명 */                                                                              ";
	sql += "          , INDIV_PURI_METHOD /* 개별및공공처리_처리방법 */                                                                    ";
	sql += "          , INDIV_PURI_AMT /* 개별및공공처리_처리량(톤/일) */                                                                ";
	sql += "          , INDIV_PURI_MONEY /* 개별및공공처리_처리비용(천원) */                                                             ";
	sql += "          , INDIV_COMPOST_METHOD /* 퇴비화 처리공법 */                                                                         ";
	sql += "          , INDIV_COMPOST_AMT /* 퇴비화 처리량(톤/일) */                                                                     ";
	sql += "          , INDIV_COMPOST_MONEY /* 퇴비화 처리비용(천원) */                                                                  ";
	sql += "          , INDIV_LIQUID_METHOD /* 액비화 처리공법 */                                                                          ";
	sql += "          , INDIV_LIQUID_AMT /* 액비화 처리량(톤/일) */                                                                      ";
	sql += "          , INDIV_LIQUID_MONEY /* 액비화 처리비용(천원) */                                                                   ";
	sql += "          , ENTRUST_PUB_COLMETHOD /* 공공처리 차집유형 */                                                                      ";
	sql += "          , ENTRUST_PUB_DT /* 공공처리 편입일자 */                                                                             ";
	sql += "          , ENTRUST_PUB_FACI_NM /* 공공처리 시설명 */                                                                          ";
	sql += "          , ENTRUST_PUB_AMT /* 공공처리 처리량(톤/일) */                                                                     ";
	sql += "          , ENTRUST_PUB_MONEY /* 공공처리 처리비용(천원) */                                                                  ";
	sql += "          , ENTRUST_REUSE_AMT /* 재활용 처리량(톤/일) */                                                                     ";
	sql += "          , ENTRUST_REUSE_MONEY /* 재활용 처리비용(천원) */                                                                  ";
	sql += "          , ENTRUST_SEA_AMT /* 해양배출 처리량(톤/일) */                                                                     ";
	sql += "          , ENTRUST_SEA_MONEY /* 해양배출 처리비용(천원) */                                                                  ";
	sql += "          , ENTRUST /* 가축분뇨처리업자 처리량(톤/일) */                                                                       ";
	sql += "          , ETC_METHOD /* 기타 처리방법 */                                                                                     ";
	sql += "          , ETC_AMT /* 기타 처리량(톤/일) */                                                                                 ";
	sql += "          , ETC_MONEY /* 기타 처리비용(천원) */                                                                              ";
	sql += "          , ETC /* 기타 */                                                                                                     ";
	sql += "          , NO_TRT_AMT /* 무처리량(톤/일) */                                                                                 ";
	sql += "          , LEX_METHOD /* 고형축분뇨처리방법 */                                                                                ";
	sql += "          , LEX_METHOD_ETC /* 기타축분뇨처리방법 */                                                                            ";
	sql += "          , SPRAY_LANDUSE /* 살포지역용도 */                                                                                   ";
	sql += "          , SPRAY_ADM_CD /* 살포지역 행정구역 */                                                                               ";
	sql += "          , ADM_CD                                                                                                             ";
	sql += "          , SB_ID                                                                                                              ";
	sql += "       FROM PLA_ANIMAL_TOTAL_FOR_CAT                                                                                           ";
	if(catDid.length != 0){
		sql += "       WHERE CAT_DID IN (                                            ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "     )                                                                                                                         ";
	sql += " SELECT YYYY /* 조사년도 */                                                                                                    ";
	sql += "      , WS_NM                                                                                                                  ";
	sql += "      , MB_NM                                                                                                                  ";
	sql += "      , SB_NM                                                                                                                  ";
	sql += "      , CAT_DID                                                                                                                ";
	sql += "      , MANAGER /* 업주명 */                                                                                                   ";
	sql += "      , LIVESTOCK_NM /* 축종 */                                                                                                ";
	sql += "      , LIVESTOCK_CNT /* 사육두수 */                                                                                         ";
	sql += "      , LIVESTOCK_AREA /* 축사면적(㎡) */                                                                                    ";
	sql += "      , REGS /* 법적규제 여부 */                                                                                               ";
	sql += "      , REGS_DATE /* 법적규제일 */                                                                                             ";
	sql += "      , DISCHARGE_FACI_NM /* 방류선_환경기초시설 */                                                                            ";
	sql += "      , DISCHARGE_ADM_CD /* 방류선_행정구역코드 */                                                                             ";
	sql += "      , DISCHARGE_RIVER_NM /* 방류선_하천명 */                                                                                 ";
	sql += "      , INDIV_PURI_METHOD /* 개별및공공처리_처리방법 */                                                                        ";
	sql += "      , INDIV_PURI_AMT /* 개별및공공처리_처리량(톤/일) */                                                                    ";
	sql += "      , INDIV_PURI_MONEY /* 개별및공공처리_처리비용(천원) */                                                                 ";
	sql += "      , INDIV_COMPOST_METHOD /* 퇴비화 처리공법 */                                                                             ";
	sql += "      , INDIV_COMPOST_AMT /* 퇴비화 처리량(톤/일) */                                                                         ";
	sql += "      , INDIV_COMPOST_MONEY /* 퇴비화 처리비용(천원) */                                                                      ";
	sql += "      , INDIV_LIQUID_METHOD /* 액비화 처리공법 */                                                                              ";
	sql += "      , INDIV_LIQUID_AMT /* 액비화 처리량(톤/일) */                                                                          ";
	sql += "      , INDIV_LIQUID_MONEY /* 액비화 처리비용(천원) */                                                                       ";
	sql += "      , ENTRUST_PUB_COLMETHOD /* 공공처리 차집유형 */                                                                          ";
	sql += "      , ENTRUST_PUB_DT /* 공공처리 편입일자 */                                                                                 ";
	sql += "      , ENTRUST_PUB_FACI_NM /* 공공처리 시설명 */                                                                              ";
	sql += "      , ENTRUST_PUB_AMT /* 공공처리 처리량(톤/일) */                                                                         ";
	sql += "      , ENTRUST_PUB_MONEY /* 공공처리 처리비용(천원) */                                                                      ";
	sql += "      , ENTRUST_REUSE_AMT /* 재활용 처리량(톤/일) */                                                                         ";
	sql += "      , ENTRUST_REUSE_MONEY /* 재활용 처리비용(천원) */                                                                      ";
	sql += "      , ENTRUST_SEA_AMT /* 해양배출 처리량(톤/일) */                                                                         ";
	sql += "      , ENTRUST_SEA_MONEY /* 해양배출 처리비용(천원) */                                                                      ";
	sql += "      , ENTRUST /* 가축분뇨처리업자 처리량(톤/일) */                                                                           ";
	sql += "      , ETC_METHOD /* 기타 처리방법 */                                                                                         ";
	sql += "      , ETC_AMT /* 기타 처리량(톤/일) */                                                                                     ";
	sql += "      , ETC_MONEY /* 기타 처리비용(천원) */                                                                                  ";
	sql += "      , ETC /* 기타 */                                                                                                         ";
	sql += "      , NO_TRT_AMT /* 무처리량(톤/일) */                                                                                     ";
	sql += "      , LEX_METHOD /* 고형축분뇨처리방법 */                                                                                    ";
	sql += "      , LEX_METHOD_ETC /* 기타축분뇨처리방법 */                                                                                ";
	sql += "      , SPRAY_LANDUSE /* 살포지역용도 */                                                                                       ";
	sql += "   FROM (                                                                                                                      ";
	sql += "         SELECT YYYY /* 조사년도 */                                                                                            ";
	sql += "              , WS_NM                                                                                                          ";
	sql += "              , MB_NM                                                                                                          ";
	sql += "              , SB_NM                                                                                                          ";
	sql += "              , CAT_DID                                                                                                        ";
	sql += "              , '' AS MANAGER /* 업주명 */                                                                                     ";
	sql += "              , LIVESTOCK_NM /* 축종 */                                                                                        ";
	sql += "              , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* 사육두수 */                                                           ";
	sql += "              , '' AS LIVESTOCK_AREA /* 축사면적(㎡) */                                                                      ";
	sql += "              , '' AS REGS /* 법적규제 여부 */                                                                                 ";
	sql += "              , '' AS REGS_DATE /* 법적규제일 */                                                                               ";
	sql += "              , '' AS DISCHARGE_FACI_NM /* 방류선_환경기초시설 */                                                              ";
	sql += "              , '' AS DISCHARGE_ADM_CD /* 방류선_행정구역코드 */                                                               ";
	sql += "              , '' AS DISCHARGE_RIVER_NM /* 방류선_하천명 */                                                                   ";
	sql += "              , '' AS INDIV_PURI_METHOD /* 개별및공공처리_처리방법 */                                                          ";
	sql += "              , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* 개별및공공처리_처리량(톤/일) */                                     ";
	sql += "              , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* 개별및공공처리_처리비용(천원) */                                ";
	sql += "              , '' AS INDIV_COMPOST_METHOD /* 퇴비화 처리공법 */                                                               ";
	sql += "              , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* 퇴비화 처리량(톤/일) */                                       ";
	sql += "              , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* 퇴비화 처리비용(천원) */                                  ";
	sql += "              , '' AS INDIV_LIQUID_METHOD /* 액비화 처리공법 */                                                                ";
	sql += "              , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* 액비화 처리량(톤/일) */                                         ";
	sql += "              , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* 액비화 처리비용(천원) */                                    ";
	sql += "              , '' AS ENTRUST_PUB_COLMETHOD /* 공공처리 차집유형 */                                                            ";
	sql += "              , '' AS ENTRUST_PUB_DT /* 공공처리 편입일자 */                                                                   ";
	sql += "              , '' AS ENTRUST_PUB_FACI_NM /* 공공처리 시설명 */                                                                ";
	sql += "              , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* 공공처리 처리량(톤/일) */                                         ";
	sql += "              , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* 공공처리 처리비용(천원) */                                    ";
	sql += "              , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* 재활용 처리량(톤/일) */                                       ";
	sql += "              , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* 재활용 처리비용(천원) */                                  ";
	sql += "              , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* 해양배출 처리량(톤/일) */                                         ";
	sql += "              , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* 해양배출 처리비용(천원) */                                    ";
	sql += "              , SUM(ENTRUST) AS ENTRUST /* 가축분뇨처리업자 처리량(톤/일) */                                                   ";
	sql += "              , '' AS ETC_METHOD /* 기타 처리방법 */                                                                           ";
	sql += "              , SUM(ETC_AMT) AS ETC_AMT /* 기타 처리량(톤/일) */                                                             ";
	sql += "              , SUM(ETC_MONEY) AS ETC_MONEY /* 기타 처리비용(천원) */                                                        ";
	sql += "              , '' AS ETC /* 기타 */                                                                                           ";
	sql += "              , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* 무처리량(톤/일) */                                                          ";
	sql += "              , '' AS LEX_METHOD /* 고형축분뇨처리방법 */                                                                      ";
	sql += "              , '' AS LEX_METHOD_ETC /* 기타축분뇨처리방법 */                                                                  ";
	sql += "              , '' AS SPRAY_LANDUSE /* 살포지역용도 */                                                                         ";
	sql += "              , '' AS ADM_CD                                                                                                   ";
	sql += "              , '' AS SB_ID                                                                                                    ";
	sql += "           FROM TBL_PLA_ANIMAL_TOTAL                                                                                           ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID, LIVESTOCK_NM                                                     ";
	sql += "         UNION                                                                                                                 ";
	sql += "         SELECT YYYY /* 조사년도 */                                                                                            ";
	sql += "              , WS_NM                                                                                                          ";
	sql += "              , MB_NM                                                                                                          ";
	sql += "              , SB_NM                                                                                                          ";
	sql += "              , CAT_DID                                                                                                        ";
	sql += "              , '' AS MANAGER /* 업주명 */                                                                                     ";
	sql += "              , '소계' AS LIVESTOCK_NM /* 축종 */                                                                              ";
	sql += "              , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* 사육두수 */                                                           ";
	sql += "              , '' AS LIVESTOCK_AREA /* 축사면적(㎡) */                                                                      ";
	sql += "              , '' AS REGS /* 법적규제 여부 */                                                                                 ";
	sql += "              , '' AS REGS_DATE /* 법적규제일 */                                                                               ";
	sql += "              , '' AS DISCHARGE_FACI_NM /* 방류선_환경기초시설 */                                                              ";
	sql += "              , '' AS DISCHARGE_ADM_CD /* 방류선_행정구역코드 */                                                               ";
	sql += "              , '' AS DISCHARGE_RIVER_NM /* 방류선_하천명 */                                                                   ";
	sql += "              , '' AS INDIV_PURI_METHOD /* 개별및공공처리_처리방법 */                                                          ";
	sql += "              , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* 개별및공공처리_처리량(톤/일) */                                     ";
	sql += "              , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* 개별및공공처리_처리비용(천원) */                                ";
	sql += "              , '' AS INDIV_COMPOST_METHOD /* 퇴비화 처리공법 */                                                               ";
	sql += "              , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* 퇴비화 처리량(톤/일) */                                       ";
	sql += "              , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* 퇴비화 처리비용(천원) */                                  ";
	sql += "              , '' AS INDIV_LIQUID_METHOD /* 액비화 처리공법 */                                                                ";
	sql += "              , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* 액비화 처리량(톤/일) */                                         ";
	sql += "              , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* 액비화 처리비용(천원) */                                    ";
	sql += "              , '' AS ENTRUST_PUB_COLMETHOD /* 공공처리 차집유형 */                                                            ";
	sql += "              , '' AS ENTRUST_PUB_DT /* 공공처리 편입일자 */                                                                   ";
	sql += "              , '' AS ENTRUST_PUB_FACI_NM /* 공공처리 시설명 */                                                                ";
	sql += "              , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* 공공처리 처리량(톤/일) */                                         ";
	sql += "              , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* 공공처리 처리비용(천원) */                                    ";
	sql += "              , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* 재활용 처리량(톤/일) */                                       ";
	sql += "              , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* 재활용 처리비용(천원) */                                  ";
	sql += "              , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* 해양배출 처리량(톤/일) */                                         ";
	sql += "              , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* 해양배출 처리비용(천원) */                                    ";
	sql += "              , SUM(ENTRUST) AS ENTRUST /* 가축분뇨처리업자 처리량(톤/일) */                                                   ";
	sql += "              , '' AS ETC_METHOD /* 기타 처리방법 */                                                                           ";
	sql += "              , SUM(ETC_AMT) AS ETC_AMT /* 기타 처리량(톤/일) */                                                             ";
	sql += "              , SUM(ETC_MONEY) AS ETC_MONEY /* 기타 처리비용(천원) */                                                        ";
	sql += "              , '' AS ETC /* 기타 */                                                                                           ";
	sql += "              , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* 무처리량(톤/일) */                                                          ";
	sql += "              , '' AS LEX_METHOD /* 고형축분뇨처리방법 */                                                                      ";
	sql += "              , '' AS LEX_METHOD_ETC /* 기타축분뇨처리방법 */                                                                  ";
	sql += "              , '' AS SPRAY_LANDUSE /* 살포지역용도 */                                                                         ";
	sql += "              , '' AS ADM_CD                                                                                                   ";
	sql += "              , '' AS SB_ID                                                                                                    ";
	sql += "           FROM TBL_PLA_ANIMAL_TOTAL                                                                                           ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID                                                                   ";
	sql += "         UNION                                                                                                                 ";
	sql += "         SELECT '' AS YYYY /* 조사년도 */                                                                                      ";
	sql += "              , '' AS WS_NM                                                                                                    ";
	sql += "              , '' AS MB_NM                                                                                                    ";
	sql += "              , '총계' AS SB_NM                                                                                                ";
	sql += "              , '' AS CAT_DID                                                                                                  ";
	sql += "              , '' AS MANAGER /* 업주명 */                                                                                     ";
	sql += "              , LIVESTOCK_NM /* 축종 */                                                                                        ";
	sql += "              , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* 사육두수 */                                                           ";
	sql += "              , '' AS LIVESTOCK_AREA /* 축사면적(㎡) */                                                                      ";
	sql += "             , '' AS REGS /* 법적규제 여부 */                                                                                 ";
	sql += "             , '' AS REGS_DATE /* 법적규제일 */                                                                               ";
	sql += "             , '' AS DISCHARGE_FACI_NM /* 방류선_환경기초시설 */                                                              ";
	sql += "             , '' AS DISCHARGE_ADM_CD /* 방류선_행정구역코드 */                                                               ";
	sql += "             , '' AS DISCHARGE_RIVER_NM /* 방류선_하천명 */                                                                   ";
	sql += "             , '' AS INDIV_PURI_METHOD /* 개별및공공처리_처리방법 */                                                          ";
	sql += "             , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* 개별및공공처리_처리량(톤/일) */                                     ";
	sql += "             , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* 개별및공공처리_처리비용(천원) */                                ";
	sql += "             , '' AS INDIV_COMPOST_METHOD /* 퇴비화 처리공법 */                                                               ";
	sql += "             , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* 퇴비화 처리량(톤/일) */                                       ";
	sql += "             , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* 퇴비화 처리비용(천원) */                                  ";
	sql += "             , '' AS INDIV_LIQUID_METHOD /* 액비화 처리공법 */                                                                ";
	sql += "             , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* 액비화 처리량(톤/일) */                                         ";
	sql += "             , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* 액비화 처리비용(천원) */                                    ";
	sql += "             , '' AS ENTRUST_PUB_COLMETHOD /* 공공처리 차집유형 */                                                            ";
	sql += "             , '' AS ENTRUST_PUB_DT /* 공공처리 편입일자 */                                                                   ";
	sql += "             , '' AS ENTRUST_PUB_FACI_NM /* 공공처리 시설명 */                                                                ";
	sql += "             , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* 공공처리 처리량(톤/일) */                                         ";
	sql += "             , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* 공공처리 처리비용(천원) */                                    ";
	sql += "             , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* 재활용 처리량(톤/일) */                                       ";
	sql += "             , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* 재활용 처리비용(천원) */                                  ";
	sql += "             , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* 해양배출 처리량(톤/일) */                                         ";
	sql += "             , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* 해양배출 처리비용(천원) */                                    ";
	sql += "             , SUM(ENTRUST) AS ENTRUST /* 가축분뇨처리업자 처리량(톤/일) */                                                   ";
	sql += "             , '' AS ETC_METHOD /* 기타 처리방법 */                                                                           ";
	sql += "             , SUM(ETC_AMT) AS ETC_AMT /* 기타 처리량(톤/일) */                                                             ";
	sql += "             , SUM(ETC_MONEY) AS ETC_MONEY /* 기타 처리비용(천원) */                                                        ";
	sql += "             , '' AS ETC /* 기타 */                                                                                           ";
	sql += "             , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* 무처리량(톤/일) */                                                          ";
	sql += "             , '' AS LEX_METHOD /* 고형축분뇨처리방법 */                                                                      ";
	sql += "             , '' AS LEX_METHOD_ETC /* 기타축분뇨처리방법 */                                                                  ";
	sql += "             , '' AS SPRAY_LANDUSE /* 살포지역용도 */                                                                         ";
	sql += "             , '' AS ADM_CD                                                                                                   ";
	sql += "             , '' AS SB_ID                                                                                                    ";
	sql += "          FROM TBL_PLA_ANIMAL_TOTAL                                                                                           ";
	sql += "         GROUP BY LIVESTOCK_NM                                                                                                ";
	sql += "        UNION                                                                                                                 ";
	sql += "        SELECT '' AS YYYY /* 조사년도 */                                                                                      ";
	sql += "             , '' AS WS_NM                                                                                                    ";
	sql += "             , '' AS MB_NM                                                                                                    ";
	sql += "             , '총계' AS SB_NM                                                                                                ";
	sql += "             , '' AS CAT_DID                                                                                                  ";
	sql += "             , '' AS MANAGER /* 업주명 */                                                                                     ";
	sql += "             , '소계' AS LIVESTOCK_NM /* 축종 */                                                                              ";
	sql += "             , SUM(LIVESTOCK_CNT) AS LIVESTOCK_CNT /* 사육두수 */                                                           ";
	sql += "             , '' AS LIVESTOCK_AREA /* 축사면적(㎡) */                                                                      ";
	sql += "             , '' AS REGS /* 법적규제 여부 */                                                                                 ";
	sql += "             , '' AS REGS_DATE /* 법적규제일 */                                                                               ";
	sql += "             , '' AS DISCHARGE_FACI_NM /* 방류선_환경기초시설 */                                                              ";
	sql += "             , '' AS DISCHARGE_ADM_CD /* 방류선_행정구역코드 */                                                               ";
	sql += "             , '' AS DISCHARGE_RIVER_NM /* 방류선_하천명 */                                                                   ";
	sql += "             , '' AS INDIV_PURI_METHOD /* 개별및공공처리_처리방법 */                                                          ";
	sql += "             , SUM(INDIV_PURI_AMT) AS INDIV_PURI_AMT /* 개별및공공처리_처리량(톤/일) */                                     ";
	sql += "             , SUM(INDIV_PURI_MONEY) AS INDIV_PURI_MONEY /* 개별및공공처리_처리비용(천원) */                                ";
	sql += "             , '' AS INDIV_COMPOST_METHOD /* 퇴비화 처리공법 */                                                               ";
	sql += "             , SUM(INDIV_COMPOST_AMT) AS INDIV_COMPOST_AMT /* 퇴비화 처리량(톤/일) */                                       ";
	sql += "             , SUM(INDIV_COMPOST_MONEY) AS INDIV_COMPOST_MONEY /* 퇴비화 처리비용(천원) */                                  ";
	sql += "             , '' AS INDIV_LIQUID_METHOD /* 액비화 처리공법 */                                                                ";
	sql += "             , SUM(INDIV_LIQUID_AMT) AS INDIV_LIQUID_AMT /* 액비화 처리량(톤/일) */                                         ";
	sql += "             , SUM(INDIV_LIQUID_MONEY) AS INDIV_LIQUID_MONEY /* 액비화 처리비용(천원) */                                    ";
	sql += "             , '' AS ENTRUST_PUB_COLMETHOD /* 공공처리 차집유형 */                                                            ";
	sql += "             , '' AS ENTRUST_PUB_DT /* 공공처리 편입일자 */                                                                   ";
	sql += "             , '' AS ENTRUST_PUB_FACI_NM /* 공공처리 시설명 */                                                                ";
	sql += "             , SUM(ENTRUST_PUB_AMT) AS ENTRUST_PUB_AMT /* 공공처리 처리량(톤/일) */                                         ";
	sql += "             , SUM(ENTRUST_PUB_MONEY) AS ENTRUST_PUB_MONEY /* 공공처리 처리비용(천원) */                                    ";
	sql += "             , SUM(ENTRUST_REUSE_AMT) AS ENTRUST_REUSE_AMT /* 재활용 처리량(톤/일) */                                       ";
	sql += "             , SUM(ENTRUST_REUSE_MONEY) AS ENTRUST_REUSE_MONEY /* 재활용 처리비용(천원) */                                  ";
	sql += "             , SUM(ENTRUST_SEA_AMT) AS ENTRUST_SEA_AMT /* 해양배출 처리량(톤/일) */                                         ";
	sql += "             , SUM(ENTRUST_SEA_MONEY) AS ENTRUST_SEA_MONEY /* 해양배출 처리비용(천원) */                                    ";
	sql += "             , SUM(ENTRUST) AS ENTRUST /* 가축분뇨처리업자 처리량(톤/일) */                                                   ";
	sql += "             , '' AS ETC_METHOD /* 기타 처리방법 */                                                                           ";
	sql += "             , SUM(ETC_AMT) AS ETC_AMT /* 기타 처리량(톤/일) */                                                             ";
	sql += "             , SUM(ETC_MONEY) AS ETC_MONEY /* 기타 처리비용(천원) */                                                        ";
	sql += "             , '' AS ETC /* 기타 */                                                                                           ";
	sql += "             , SUM(NO_TRT_AMT) AS NO_TRT_AMT /* 무처리량(톤/일) */                                                          ";
	sql += "             , '' AS LEX_METHOD /* 고형축분뇨처리방법 */                                                                      ";
	sql += "             , '' AS LEX_METHOD_ETC /* 기타축분뇨처리방법 */                                                                  ";
	sql += "             , '' AS SPRAY_LANDUSE /* 살포지역용도 */                                                                         ";
	sql += "             , '' AS ADM_CD                                                                                                   ";
	sql += "             , '' AS SB_ID                                                                                                    ";
	sql += "          FROM TBL_PLA_ANIMAL_TOTAL                                                                                           ";
	sql += "       )                                                                                                                      ";
	sql += " ORDER BY DECODE(SB_NM,'총계',1,2), SB_ID, DECODE(CAT_DID,'소계',1,2), CAT_DID, DECODE(LIVESTOCK_NM,'소계',1,2), LIVESTOCK_NM ";
	
	
	
	
	

    
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
		jsonRecord.put("CAT_DID",rs.getString("CAT_DID"));
		jsonRecord.put("MANAGER",rs.getString("MANAGER"));
		jsonRecord.put("LIVESTOCK_NM",rs.getString("LIVESTOCK_NM"));
		jsonRecord.put("LIVESTOCK_CNT",rs.getString("LIVESTOCK_CNT"));
		jsonRecord.put("LIVESTOCK_AREA",rs.getString("LIVESTOCK_AREA"));
		jsonRecord.put("REGS",rs.getString("REGS"));
		jsonRecord.put("REGS_DATE",rs.getString("REGS_DATE"));
		jsonRecord.put("DISCHARGE_FACI_NM",rs.getString("DISCHARGE_FACI_NM"));
		jsonRecord.put("DISCHARGE_ADM_CD",rs.getString("DISCHARGE_ADM_CD"));
		jsonRecord.put("DISCHARGE_RIVER_NM",rs.getString("DISCHARGE_RIVER_NM"));
		jsonRecord.put("INDIV_PURI_METHOD",rs.getString("INDIV_PURI_METHOD"));
		jsonRecord.put("INDIV_PURI_AMT",rs.getString("INDIV_PURI_AMT"));
		jsonRecord.put("INDIV_PURI_MONEY",rs.getString("INDIV_PURI_MONEY"));
		jsonRecord.put("INDIV_COMPOST_METHOD",rs.getString("INDIV_COMPOST_METHOD"));
		jsonRecord.put("INDIV_COMPOST_AMT",rs.getString("INDIV_COMPOST_AMT"));
		jsonRecord.put("INDIV_COMPOST_MONEY",rs.getString("INDIV_COMPOST_MONEY"));
		jsonRecord.put("INDIV_LIQUID_METHOD",rs.getString("INDIV_LIQUID_METHOD"));
		jsonRecord.put("INDIV_LIQUID_AMT",rs.getString("INDIV_LIQUID_AMT"));
		jsonRecord.put("INDIV_LIQUID_MONEY",rs.getString("INDIV_LIQUID_MONEY"));
		jsonRecord.put("ENTRUST_PUB_COLMETHOD",rs.getString("ENTRUST_PUB_COLMETHOD"));
		jsonRecord.put("ENTRUST_PUB_DT",rs.getString("ENTRUST_PUB_DT"));
		jsonRecord.put("ENTRUST_PUB_FACI_NM",rs.getString("ENTRUST_PUB_FACI_NM"));
		jsonRecord.put("ENTRUST_PUB_AMT",rs.getString("ENTRUST_PUB_AMT"));
		jsonRecord.put("ENTRUST_PUB_MONEY",rs.getString("ENTRUST_PUB_MONEY"));
		jsonRecord.put("ENTRUST_REUSE_AMT",rs.getString("ENTRUST_REUSE_AMT"));
		jsonRecord.put("ENTRUST_REUSE_MONEY",rs.getString("ENTRUST_REUSE_MONEY"));
		jsonRecord.put("ENTRUST_SEA_AMT",rs.getString("ENTRUST_SEA_AMT"));
		jsonRecord.put("ENTRUST_SEA_MONEY",rs.getString("ENTRUST_SEA_MONEY"));
		jsonRecord.put("ENTRUST",rs.getString("ENTRUST"));
		jsonRecord.put("ETC_METHOD",rs.getString("ETC_METHOD"));
		jsonRecord.put("ETC_AMT",rs.getString("ETC_AMT"));
		jsonRecord.put("ETC_MONEY",rs.getString("ETC_MONEY"));
		jsonRecord.put("ETC",rs.getString("ETC"));
		jsonRecord.put("NO_TRT_AMT",rs.getString("NO_TRT_AMT"));
		jsonRecord.put("LEX_METHOD",rs.getString("LEX_METHOD"));
		jsonRecord.put("LEX_METHOD_ETC",rs.getString("LEX_METHOD_ETC"));
		jsonRecord.put("SPRAY_LANDUSE",rs.getString("SPRAY_LANDUSE"));
		
		
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