<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
	
	-----퇴적물조사지점-----
	
*/
try{
	String WS_CD = request.getParameter("WS_CD");
	String AM_CD = request.getParameter("AM_CD");
	String AS_CD = request.getParameter("AS_CD");
	
	String ADM_CD = request.getParameter("ADM_CD");
	
	String siteIds = request.getParameter("siteIds");
	//JSONObject parentIds = request.getParameter("parentIds");
	
	String startYear = request.getParameter("startYear");
	String startMonth = request.getParameter("startMonth");
	String endYear = request.getParameter("endYear");
	String endMonth = request.getParameter("endMonth");
	
	String startYYYYMM = startYear + startMonth;
	String endYYYYMM = endYear + endMonth;
	String firstSearch = request.getParameter("firstSearch");
	//out.print(parentIds);
	
sql = " SELECT A.PT_NO                                                                																									";
sql += "     , A.NO    /* 순번 참고용 */                                                                                                                                                      ";
sql += "     , A.PT_NM /* 측정소명 */                                                                                                                                                         ";
sql += "     , A.WMYR  /* 년도 */                                                                                                                                                             ";
sql += "     , A.WMOM  /* 월 */                                                                                                                                                               ";
sql += "     , A.WMCYMD AS WMCYMD_VAL   /* 측정일자 */                                                                                                                                        ";
sql += "     , A.WMCYMD AS CHART_DATE                                                                                                                                                         ";
sql += "     , B.WMCYMD AS WMCYMD_GRAPH /* 측정일자 */                                                                                                                                        ";
sql += "     , A.MCNT     /* 회차 */                                                                                                                                                          ";
sql += "     , A.JOSANAME /* 조사기관 */                                                                                                                                                      ";
sql += "     , A.ITEM_DOW AS ITEM_DOW_VAL /* 최고수심 */                                                                                                                                      ";
sql += "     , B.ITEM_DOW AS ITEM_DOW_GRAPH /* 최고수심 */                                                                                                                                    ";
sql += "     , A.ITEM_DOW_SURF AS ITEM_DOW_SURF_VAL /* 표층-수심 */                                                                                                                           ";
sql += "     , B.ITEM_DOW_SURF AS ITEM_DOW_SURF_GRAPH /* 표층-수심 */                                                                                                                         ";
sql += "     , A.ITEM_TEMP_SURF AS ITEM_TEMP_SURF_VAL /* 표층-수온 */                                                                                                                         ";
sql += "     , B.ITEM_TEMP_SURF AS ITEM_TEMP_SURF_GRAPH /* 표층-수온 */                                                                                                                       ";
sql += "     , A.ITEM_DO_SURF AS ITEM_DO_SURF_VAL /* 표층-DO */                                                                                                                               ";
sql += "     , B.ITEM_DO_SURF AS ITEM_DO_SURF_GRAPH /* 표층-DO */                                                                                                                             ";
sql += "     , A.ITEM_PH_SURF AS ITEM_PH_SURF_VAL /* 표층-pH */                                                                                                                               ";
sql += "     , B.ITEM_PH_SURF AS ITEM_PH_SURF_GRAPH /* 표층-pH */                                                                                                                             ";
sql += "     , A.ITEM_EC_SURF AS ITEM_EC_SURF_VAL /* 표층-전기전도도(SC) */                                                                                                                   ";
sql += "     , B.ITEM_EC_SURF AS ITEM_EC_SURF_GRAPH /* 표층-전기전도도(SC) */                                                                                                                 ";
sql += "     , A.ITEM_DOW_LOW AS ITEM_DOW_LOW_VAL /* 저층-수심 */                                                                                                                             ";
sql += "     , B.ITEM_DOW_LOW AS ITEM_DOW_LOW_GRAPH /* 저층-수심 */                                                                                                                           ";
sql += "     , A.ITEM_TEMP_LOW AS ITEM_TEMP_LOW_VAL /* 저층-수온 */                                                                                                                           ";
sql += "     , B.ITEM_TEMP_LOW AS ITEM_TEMP_LOW_GRAPH /* 저층-수온 */                                                                                                                         ";
sql += "     , A.ITEM_DO_LOW AS ITEM_DO_LOW_VAL /* 저층-DO */                                                                                                                                 ";
sql += "     , B.ITEM_DO_LOW AS ITEM_DO_LOW_GRAPH /* 저층-DO */                                                                                                                               ";
sql += "     , A.ITEM_PH_LOW AS ITEM_PH_LOW_VAL /* 저층-pH */                                                                                                                                 ";
sql += "     , B.ITEM_PH_LOW AS ITEM_PH_LOW_GRAPH /* 저층-pH */                                                                                                                               ";
sql += "     , A.ITEM_EC_LOW AS ITEM_EC_LOW_VAL /* 저층-전기전도도(SC) */                                                                                                                     ";
sql += "     , B.ITEM_EC_LOW AS ITEM_EC_LOW_GRAPH /* 저층-전기전도도(SC) */                                                                                                                   ";
sql += "     , A.ITEM_TRANSPARENCY AS ITEM_TRANSPARENCY_VAL /* 투명도 */                                                                                                                      ";
sql += "     , B.ITEM_TRANSPARENCY AS ITEM_TRANSPARENCY_GRAPH /* 투명도 */                                                                                                                    ";
sql += "     , A.ITEM_FSD AS ITEM_FSD_VAL /* 입도-모래 */                                                                                                                                     ";
sql += "     , B.ITEM_FSD AS ITEM_FSD_GRAPH /* 입도-모래 */                                                                                                                                   ";
sql += "     , A.ITEM_FST AS ITEM_FST_VAL /* 입도-실트 */                                                                                                                                     ";
sql += "     , B.ITEM_FST AS ITEM_FST_GRAPH /* 입도-실트 */                                                                                                                                   ";
sql += "     , A.ITEM_FCL AS ITEM_FCL_VAL /* 입도-점토 */                                                                                                                                     ";
sql += "     , B.ITEM_FCL AS ITEM_FCL_GRAPH /* 입도-점토 */                                                                                                                                   ";
sql += "     , A.ITEM_WTC AS ITEM_WTC_VAL /* 함수율 */                                                                                                                                        ";
sql += "     , B.ITEM_WTC AS ITEM_WTC_GRAPH /* 함수율 */                                                                                                                                      ";
sql += "     , A.ITEM_PCA AS ITEM_PCA_VAL /* 완전연소가능량 */                                                                                                                                ";
sql += "     , B.ITEM_PCA AS ITEM_PCA_GRAPH /* 완전연소가능량 */                                                                                                                              ";
sql += "     , A.ITEM_COD AS ITEM_COD_VAL /* COD */                                                                                                                                           ";
sql += "     , B.ITEM_COD AS ITEM_COD_GRAPH /* COD */                                                                                                                                         ";
sql += "     , A.ITEM_TOC AS ITEM_TOC_VAL /* TOC */                                                                                                                                           ";
sql += "     , B.ITEM_TOC AS ITEM_TOC_GRAPH /* TOC */                                                                                                                                         ";
sql += "     , A.ITEM_TN AS ITEM_TN_VAL /* T-N */                                                                                                                                             ";
sql += "     , B.ITEM_TN AS ITEM_TN_GRAPH /* T-N */                                                                                                                                           ";
sql += "     , A.ITEM_TP AS ITEM_TP_VAL /* T-P */                                                                                                                                             ";
sql += "     , B.ITEM_TP AS ITEM_TP_GRAPH /* T-P */                                                                                                                                           ";
sql += "     , A.ITEM_SRP AS ITEM_SRP_VAL /* SRP */                                                                                                                                           ";
sql += "     , B.ITEM_SRP AS ITEM_SRP_GRAPH /* SRP */                                                                                                                                         ";
sql += "     , A.ITEM_PB AS ITEM_PB_VAL /* Pb */                                                                                                                                              ";
sql += "     , B.ITEM_PB AS ITEM_PB_GRAPH /* Pb */                                                                                                                                            ";
sql += "     , A.ITEM_ZN AS ITEM_ZN_VAL /* Zn */                                                                                                                                              ";
sql += "     , B.ITEM_ZN AS ITEM_ZN_GRAPH /* Zn */                                                                                                                                            ";
sql += "     , A.ITEM_CU AS ITEM_CU_VAL /* Cu */                                                                                                                                              ";
sql += "     , B.ITEM_CU AS ITEM_CU_GRAPH /* Cu */                                                                                                                                            ";
sql += "     , A.ITEM_CR AS ITEM_CR_VAL /* Cr */                                                                                                                                              ";
sql += "     , B.ITEM_CR AS ITEM_CR_GRAPH /* Cr */                                                                                                                                            ";
sql += "     , A.ITEM_NI AS ITEM_NI_VAL /* Ni */                                                                                                                                              ";
sql += "     , B.ITEM_NI AS ITEM_NI_GRAPH /* Ni */                                                                                                                                            ";
sql += "     , A.ITEM_AS AS ITEM_AS_VAL /* As */                                                                                                                                              ";
sql += "     , B.ITEM_AS AS ITEM_AS_GRAPH /* As */                                                                                                                                            ";
sql += "     , A.ITEM_CD AS ITEM_CD_VAL /* Cd */                                                                                                                                              ";
sql += "     , B.ITEM_CD AS ITEM_CD_GRAPH /* Cd */                                                                                                                                            ";
sql += "     , A.ITEM_HG AS ITEM_HG_VAL /* Hg */                                                                                                                                              ";
sql += "     , B.ITEM_HG AS ITEM_HG_GRAPH /* Hg */                                                                                                                                            ";
sql += "     , A.ITEM_AL AS ITEM_AL_VAL /* Al */                                                                                                                                              ";
sql += "     , B.ITEM_AL AS ITEM_AL_GRAPH /* Al */                                                                                                                                            ";
sql += "     , A.ITEM_LI AS ITEM_LI_VAL /* Li */                                                                                                                                              ";
sql += "     , B.ITEM_LI AS ITEM_LI_GRAPH /* Li */                                                                                                                                            ";
sql += " FROM (                                                                                                                                                                               ";
sql += "     SELECT RANK() OVER(PARTITION BY PT_NO                                                                                                                                            ";
sql += "         ORDER BY PT_NO, WMYR DESC, WMOM DESC, WMOD DESC) AS NO,                                                                                                                      ";
sql += "       PT_NO,                                                                                                                                                                         ";
sql += "       PT_NM ,                                                                                                                                                                        ";
sql += "       WMYR ,                                                                                                                                                                         ";
sql += "       WMOM ,                                                                                                                                                                         ";
sql += "       WMYR||'.'||WMOM||'.'||WMOD AS WMCYMD ,                                                                                                                                         ";
sql += "       MCNT ,                                                                                                                                                                         ";
sql += "       ORD_PT_NM ,                                                                                                                                                                    ";
sql += "       ORD_GBN ,                                                                                                                                                                      ";
sql += "       JOSANAME                                                                                                                                                                       ";
sql += "     , DECODE(ITEM_DOW         , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW         , 'FM999,999,990.0'  )) ITEM_DOW                                                               ";
sql += "     , DECODE(ITEM_DOW_SURF    , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW_SURF    , 'FM999,999,990.0'  )) ITEM_DOW_SURF                                                          ";
sql += "     , DECODE(ITEM_TEMP_SURF   , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP_SURF   , 'FM999,999,990'    )) ITEM_TEMP_SURF                                                         ";
sql += "     , DECODE(ITEM_DO_SURF     , '999999999', '정량한계미만', TO_CHAR(ITEM_DO_SURF     , 'FM999,999,990.0'  )) ITEM_DO_SURF                                                           ";
sql += "     , DECODE(ITEM_PH_SURF     , '999999999', '정량한계미만', TO_CHAR(ITEM_PH_SURF     , 'FM999,999,990.0'  )) ITEM_PH_SURF                                                           ";
sql += "     , DECODE(ITEM_EC_SURF     , '999999999', '정량한계미만', TO_CHAR(ITEM_EC_SURF     , 'FM999,999,990'    )) ITEM_EC_SURF                                                           ";
sql += "     , DECODE(ITEM_DOW_LOW     , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW_LOW     , 'FM999,999,990.0'  )) ITEM_DOW_LOW                                                           ";
sql += "     , DECODE(ITEM_TEMP_LOW    , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP_LOW    , 'FM999,999,990'    )) ITEM_TEMP_LOW                                                          ";
sql += "     , DECODE(ITEM_DO_LOW      , '999999999', '정량한계미만', TO_CHAR(ITEM_DO_LOW      , 'FM999,999,990.0'  )) ITEM_DO_LOW                                                            ";
sql += "     , DECODE(ITEM_PH_LOW      , '999999999', '정량한계미만', TO_CHAR(ITEM_PH_LOW      , 'FM999,999,990.0'  )) ITEM_PH_LOW                                                            ";
sql += "     , DECODE(ITEM_EC_LOW      , '999999999', '정량한계미만', TO_CHAR(ITEM_EC_LOW      , 'FM999,999,990'    )) ITEM_EC_LOW                                                            ";
sql += "     , DECODE(ITEM_TRANSPARENCY, '999999999', '정량한계미만', TO_CHAR(ITEM_TRANSPARENCY, 'FM999,999,990.0'  )) ITEM_TRANSPARENCY                                                      ";
sql += "     , DECODE(ITEM_FSD         , '999999999', '정량한계미만', TO_CHAR(ITEM_FSD         , 'FM999,999,990.0'  )) ITEM_FSD                                                               ";
sql += "     , DECODE(ITEM_FST         , '999999999', '정량한계미만', TO_CHAR(ITEM_FST         , 'FM999,999,990.0'  )) ITEM_FST                                                               ";
sql += "     , DECODE(ITEM_FCL         , '999999999', '정량한계미만', TO_CHAR(ITEM_FCL         , 'FM999,999,990.0'  )) ITEM_FCL                                                               ";
sql += "     , DECODE(ITEM_WTC         , '999999999', '정량한계미만', TO_CHAR(ITEM_WTC         , 'FM999,999,990.0'  )) ITEM_WTC                                                               ";
sql += "     , DECODE(ITEM_PCA         , '999999999', '정량한계미만', TO_CHAR(ITEM_PCA         , 'FM999,999,990.00' )) ITEM_PCA                                                               ";
sql += "     , DECODE(ITEM_COD         , '999999999', '정량한계미만', TO_CHAR(ITEM_COD         , 'FM999,999,990.00' )) ITEM_COD                                                               ";
sql += "     , DECODE(ITEM_TOC         , '999999999', '정량한계미만', TO_CHAR(ITEM_TOC         , 'FM999,999,990.00' )) ITEM_TOC                                                               ";
sql += "     , DECODE(ITEM_TN          , '999999999', '정량한계미만', TO_CHAR(ITEM_TN          , 'FM999,999,990'    )) ITEM_TN                                                                ";
sql += "     , DECODE(ITEM_TP          , '999999999', '정량한계미만', TO_CHAR(ITEM_TP          , 'FM999,999,990'    )) ITEM_TP                                                                ";
sql += "     , DECODE(ITEM_SRP         , '999999999', '정량한계미만', TO_CHAR(ITEM_SRP         , 'FM999,999,990.0'  )) ITEM_SRP                                                               ";
sql += "     , DECODE(ITEM_PB          , '999999999', '정량한계미만', TO_CHAR(ITEM_PB          , 'FM999,999,990.0'  )) ITEM_PB                                                                ";
sql += "     , DECODE(ITEM_ZN          , '999999999', '정량한계미만', TO_CHAR(ITEM_ZN          , 'FM999,999,990.0'  )) ITEM_ZN                                                                ";
sql += "     , DECODE(ITEM_CU          , '999999999', '정량한계미만', TO_CHAR(ITEM_CU          , 'FM999,999,990.0'  )) ITEM_CU                                                                ";
sql += "     , DECODE(ITEM_CR          , '999999999', '정량한계미만', TO_CHAR(ITEM_CR          , 'FM999,999,990.0'  )) ITEM_CR                                                                ";
sql += "     , DECODE(ITEM_NI          , '999999999', '정량한계미만', TO_CHAR(ITEM_NI          , 'FM999,999,990.0'  )) ITEM_NI                                                                ";
sql += "     , DECODE(ITEM_AS          , '999999999', '정량한계미만', TO_CHAR(ITEM_AS          , 'FM999,999,990.0'  )) ITEM_AS                                                                ";
sql += "     , DECODE(ITEM_CD          , '999999999', '정량한계미만', TO_CHAR(ITEM_CD          , 'FM999,999,990.00' )) ITEM_CD                                                                ";
sql += "     , DECODE(ITEM_HG          , '999999999', '정량한계미만', TO_CHAR(ITEM_HG          , 'FM999,999,990.000')) ITEM_HG                                                                ";
sql += "     , DECODE(ITEM_AL          , '999999999', '정량한계미만', TO_CHAR(ITEM_AL          , 'FM999,999,990.00' )) ITEM_AL                                                                ";
sql += "     , DECODE(ITEM_LI          , '999999999', '정량한계미만', TO_CHAR(ITEM_LI          , 'FM999,999,990.0'  )) ITEM_LI                                                                ";
sql += "     FROM (                                                                                                                                                                           ";
sql += "         SELECT A.PT_NO ,                                                                                                                                                             ";
sql += "           A.WMYR ,                                                                                                                                                                   ";
sql += "           A.WMWK ,                                                                                                                                                                   ";
sql += "           A.WMYR || A.WMWK WMYRWK ,                                                                                                                                                  ";
sql += "           A.WMOM ,                                                                                                                                                                   ";
sql += "           A.WMOD ,                                                                                                                                                                   ";
sql += "           A.WMCTM ,                                                                                                                                                                  ";
sql += "           A.WMSD ,                                                                                                                                                                   ";
sql += "           A.WMED ,                                                                                                                                                                   ";
sql += "           SUBSTR(B.PT_NO, 5, 1) VGBN ,                                                                                                                                               ";
sql += "           CD.CODE_CTN RAGBN ,                                                                                                                                                        ";
sql += "           B.PT_NM ,                                                                                                                                                                  ";
sql += "           DECODE(SUBSTR(UPPER(B.PT_NM), LENGTH(TRIM(B.PT_NM)), 1), 'U', REPLACE(UPPER(B.PT_NM), 'U'), 'D', REPLACE(UPPER(B.PT_NM), 'D'), B.PT_NM) ORD_PT_NM ,                        ";
sql += "           B.ORD_GBN ,                                                                                                                                                                ";
sql += "           B.JOSACODE ,                                                                                                                                                               ";
sql += "           CD2.CODE_CTN JOSANAME ,                                                                                                                                                    ";
sql += "                   CASE                                                                                                                                                               ";
sql += "                     WHEN A.RGDT=A.UPDT THEN 'Y'                                                                                                                                      ";
sql += "                     ELSE ''                                                                                                                                                          ";
sql += "                   END UPOK ,                                                                                                                                                         ";
sql += "           A.UPDT ,                                                                                                                                                                   ";
sql += "           CD3.CODE_CTN MCNT                                                                                                                                                          ";
sql += "         , ROUND(ITEM_DOW         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1001' AND ROWNUM=1)) ITEM_DOW                                                                  ";
sql += "         , ROUND(ITEM_DOW_SURF    , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1026' AND ROWNUM=1)) ITEM_DOW_SURF                                                             ";
sql += "         , ROUND(ITEM_TEMP_SURF   , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1027' AND ROWNUM=1)) ITEM_TEMP_SURF                                                            ";
sql += "         , ROUND(ITEM_DO_SURF     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1028' AND ROWNUM=1)) ITEM_DO_SURF                                                              ";
sql += "         , ROUND(ITEM_PH_SURF     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1029' AND ROWNUM=1)) ITEM_PH_SURF                                                              ";
sql += "         , ROUND(ITEM_EC_SURF     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1030' AND ROWNUM=1)) ITEM_EC_SURF                                                              ";
sql += "         , ROUND(ITEM_DOW_LOW     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1031' AND ROWNUM=1)) ITEM_DOW_LOW                                                              ";
sql += "         , ROUND(ITEM_TEMP_LOW    , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1032' AND ROWNUM=1)) ITEM_TEMP_LOW                                                             ";
sql += "         , ROUND(ITEM_DO_LOW      , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1033' AND ROWNUM=1)) ITEM_DO_LOW                                                               ";
sql += "         , ROUND(ITEM_PH_LOW      , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1034' AND ROWNUM=1)) ITEM_PH_LOW                                                               ";
sql += "         , ROUND(ITEM_EC_LOW      , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1035' AND ROWNUM=1)) ITEM_EC_LOW                                                               ";
sql += "         , ROUND(ITEM_TRANSPARENCY, (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1036' AND ROWNUM=1)) ITEM_TRANSPARENCY                                                         ";
sql += "         , ROUND(ITEM_FSD         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1006' AND ROWNUM=1)) ITEM_FSD                                                                  ";
sql += "         , ROUND(ITEM_FST         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1007' AND ROWNUM=1)) ITEM_FST                                                                  ";
sql += "         , ROUND(ITEM_FCL         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1008' AND ROWNUM=1)) ITEM_FCL                                                                  ";
sql += "         , ROUND(ITEM_WTC         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1009' AND ROWNUM=1)) ITEM_WTC                                                                  ";
sql += "         , ROUND(ITEM_PCA         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1010' AND ROWNUM=1)) ITEM_PCA                                                                  ";
sql += "         , ROUND(ITEM_COD         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1011' AND ROWNUM=1)) ITEM_COD                                                                  ";
sql += "         , ROUND(ITEM_TOC         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1012' AND ROWNUM=1)) ITEM_TOC                                                                  ";
sql += "         , ROUND(ITEM_TN          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1013' AND ROWNUM=1)) ITEM_TN                                                                   ";
sql += "         , ROUND(ITEM_TP          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1014' AND ROWNUM=1)) ITEM_TP                                                                   ";
sql += "         , ROUND(ITEM_SRP         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1015' AND ROWNUM=1)) ITEM_SRP                                                                  ";
sql += "         , ROUND(ITEM_PB          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1016' AND ROWNUM=1)) ITEM_PB                                                                   ";
sql += "         , ROUND(ITEM_ZN          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1017' AND ROWNUM=1)) ITEM_ZN                                                                   ";
sql += "         , ROUND(ITEM_CU          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1018' AND ROWNUM=1)) ITEM_CU                                                                   ";
sql += "         , ROUND(ITEM_CR          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1019' AND ROWNUM=1)) ITEM_CR                                                                   ";
sql += "         , ROUND(ITEM_NI          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1020' AND ROWNUM=1)) ITEM_NI                                                                   ";
sql += "         , ROUND(ITEM_AS          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1021' AND ROWNUM=1)) ITEM_AS                                                                   ";
sql += "         , ROUND(ITEM_CD          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1022' AND ROWNUM=1)) ITEM_CD                                                                   ";
sql += "         , ROUND(ITEM_HG          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1023' AND ROWNUM=1)) ITEM_HG                                                                   ";
sql += "         , ROUND(ITEM_AL          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1024' AND ROWNUM=1)) ITEM_AL                                                                   ";
sql += "         , ROUND(ITEM_LI          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1025' AND ROWNUM=1)) ITEM_LI      ,                                                            ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT COUNT(*)                                                                                                                                                          ";
sql += "             FROM SDM_FILE_INFO FI                                                                                                                                                    ";
sql += "             WHERE FI.UM_GBN = 'B'                                                                                                                                                    ";
sql += "               AND FI.PT_NO = A.PT_NO                                                                                                                                                 ";
sql += "               AND FI.WMYR = A.WMYR                                                                                                                                                   ";
sql += "               AND FI.WMWK = A.WMWK) IMG_CNT ,                                                                                                                                        ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT COUNT(*)                                                                                                                                                          ";
sql += "             FROM SDM_FILE_INFO FI                                                                                                                                                    ";
sql += "             WHERE FI.UM_GBN = 'C'                                                                                                                                                    ";
sql += "               AND FI.WMYR = A.WMYR                                                                                                                                                   ";
sql += "               AND FI.WMWK = A.WMWK) IMG_CNT2                                                                                                                                         ";
sql += "         FROM SDM_RWMDTI A ,                                                                                                                                                          ";
sql += "           SDM_RWMPT B ,                                                                                                                                                              ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT CODE,                                                                                                                                                             ";
sql += "               CODE_CTN                                                                                                                                                               ";
sql += "             FROM CODE                                                                                                                                                                ";
sql += "             WHERE CODE_ID = 'SDM001') CD ,                                                                                                                                           ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT CODE,                                                                                                                                                             ";
sql += "               CODE_CTN                                                                                                                                                               ";
sql += "             FROM CODE                                                                                                                                                                ";
sql += "             WHERE CODE_ID = 'ORG001') CD2 ,                                                                                                                                          ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT SUBSTR(CODE, 2, 1) CODE,                                                                                                                                          ";
sql += "               CODE_CTN                                                                                                                                                               ";
sql += "             FROM CODE                                                                                                                                                                ";
sql += "             WHERE CODE_ID = 'ETS955'                                                                                                                                                 ";
sql += "               AND SUBSTR(CODE, 0, 1) = 'H') CD3                                                                                                                                      ";
sql += "         WHERE A.PT_NO = B.PT_NO                                                                                                                                                      ";
sql += "           AND SUBSTR(A.PT_NO, 5, 1) = CD.CODE(+)                                                                                                                                     ";
sql += "           AND B.JOSACODE = CD2.CODE(+)                                                                                                                                               ";
sql += "           AND A.WMWK = CD3.CODE(+) )) A ,                                                                                                                                            ";
sql += "   (                                                                                                                                                                                  ";
sql += "     SELECT RANK() OVER(PARTITION BY PT_NO                                                                                                                                            ";
sql += "         ORDER BY PT_NO, WMYR DESC, WMOM DESC, WMOD DESC) AS NO,                                                                                                                      ";
sql += "       PT_NO,                                                                                                                                                                         ";
sql += "       PT_NM ,                                                                                                                                                                        ";
sql += "       WMYR ,                                                                                                                                                                         ";
sql += "       WMOM ,                                                                                                                                                                         ";
sql += "       WMYR||'.'||WMOM||'.'||WMOD AS WMCYMD ,                                                                                                                                         ";
sql += "       MCNT ,                                                                                                                                                                         ";
sql += "       ORD_PT_NM ,                                                                                                                                                                    ";
sql += "       ORD_GBN ,                                                                                                                                                                      ";
sql += "       JOSANAME                                                                                                                                                                       ";
sql += "     , DECODE(ITEM_DOW         , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW         , 'FM999,999,990.0'  )) ITEM_DOW                                                               ";
sql += "     , DECODE(ITEM_DOW_SURF    , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW_SURF    , 'FM999,999,990.0'  )) ITEM_DOW_SURF                                                          ";
sql += "     , DECODE(ITEM_TEMP_SURF   , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP_SURF   , 'FM999,999,990'    )) ITEM_TEMP_SURF                                                         ";
sql += "     , DECODE(ITEM_DO_SURF     , '999999999', '정량한계미만', TO_CHAR(ITEM_DO_SURF     , 'FM999,999,990.0'  )) ITEM_DO_SURF                                                           ";
sql += "     , DECODE(ITEM_PH_SURF     , '999999999', '정량한계미만', TO_CHAR(ITEM_PH_SURF     , 'FM999,999,990.0'  )) ITEM_PH_SURF                                                           ";
sql += "     , DECODE(ITEM_EC_SURF     , '999999999', '정량한계미만', TO_CHAR(ITEM_EC_SURF     , 'FM999,999,990'    )) ITEM_EC_SURF                                                           ";
sql += "     , DECODE(ITEM_DOW_LOW     , '999999999', '정량한계미만', TO_CHAR(ITEM_DOW_LOW     , 'FM999,999,990.0'  )) ITEM_DOW_LOW                                                           ";
sql += "     , DECODE(ITEM_TEMP_LOW    , '999999999', '정량한계미만', TO_CHAR(ITEM_TEMP_LOW    , 'FM999,999,990'    )) ITEM_TEMP_LOW                                                          ";
sql += "     , DECODE(ITEM_DO_LOW      , '999999999', '정량한계미만', TO_CHAR(ITEM_DO_LOW      , 'FM999,999,990.0'  )) ITEM_DO_LOW                                                            ";
sql += "     , DECODE(ITEM_PH_LOW      , '999999999', '정량한계미만', TO_CHAR(ITEM_PH_LOW      , 'FM999,999,990.0'  )) ITEM_PH_LOW                                                            ";
sql += "     , DECODE(ITEM_EC_LOW      , '999999999', '정량한계미만', TO_CHAR(ITEM_EC_LOW      , 'FM999,999,990'    )) ITEM_EC_LOW                                                            ";
sql += "     , DECODE(ITEM_TRANSPARENCY, '999999999', '정량한계미만', TO_CHAR(ITEM_TRANSPARENCY, 'FM999,999,990.0'  )) ITEM_TRANSPARENCY                                                      ";
sql += "     , DECODE(ITEM_FSD         , '999999999', '정량한계미만', TO_CHAR(ITEM_FSD         , 'FM999,999,990.0'  )) ITEM_FSD                                                               ";
sql += "     , DECODE(ITEM_FST         , '999999999', '정량한계미만', TO_CHAR(ITEM_FST         , 'FM999,999,990.0'  )) ITEM_FST                                                               ";
sql += "     , DECODE(ITEM_FCL         , '999999999', '정량한계미만', TO_CHAR(ITEM_FCL         , 'FM999,999,990.0'  )) ITEM_FCL                                                               ";
sql += "     , DECODE(ITEM_WTC         , '999999999', '정량한계미만', TO_CHAR(ITEM_WTC         , 'FM999,999,990.0'  )) ITEM_WTC                                                               ";
sql += "     , DECODE(ITEM_PCA         , '999999999', '정량한계미만', TO_CHAR(ITEM_PCA         , 'FM999,999,990.00' )) ITEM_PCA                                                               ";
sql += "     , DECODE(ITEM_COD         , '999999999', '정량한계미만', TO_CHAR(ITEM_COD         , 'FM999,999,990.00' )) ITEM_COD                                                               ";
sql += "     , DECODE(ITEM_TOC         , '999999999', '정량한계미만', TO_CHAR(ITEM_TOC         , 'FM999,999,990.00' )) ITEM_TOC                                                               ";
sql += "     , DECODE(ITEM_TN          , '999999999', '정량한계미만', TO_CHAR(ITEM_TN          , 'FM999,999,990'    )) ITEM_TN                                                                ";
sql += "     , DECODE(ITEM_TP          , '999999999', '정량한계미만', TO_CHAR(ITEM_TP          , 'FM999,999,990'    )) ITEM_TP                                                                ";
sql += "     , DECODE(ITEM_SRP         , '999999999', '정량한계미만', TO_CHAR(ITEM_SRP         , 'FM999,999,990.0'  )) ITEM_SRP                                                               ";
sql += "     , DECODE(ITEM_PB          , '999999999', '정량한계미만', TO_CHAR(ITEM_PB          , 'FM999,999,990.0'  )) ITEM_PB                                                                ";
sql += "     , DECODE(ITEM_ZN          , '999999999', '정량한계미만', TO_CHAR(ITEM_ZN          , 'FM999,999,990.0'  )) ITEM_ZN                                                                ";
sql += "     , DECODE(ITEM_CU          , '999999999', '정량한계미만', TO_CHAR(ITEM_CU          , 'FM999,999,990.0'  )) ITEM_CU                                                                ";
sql += "     , DECODE(ITEM_CR          , '999999999', '정량한계미만', TO_CHAR(ITEM_CR          , 'FM999,999,990.0'  )) ITEM_CR                                                                ";
sql += "     , DECODE(ITEM_NI          , '999999999', '정량한계미만', TO_CHAR(ITEM_NI          , 'FM999,999,990.0'  )) ITEM_NI                                                                ";
sql += "     , DECODE(ITEM_AS          , '999999999', '정량한계미만', TO_CHAR(ITEM_AS          , 'FM999,999,990.0'  )) ITEM_AS                                                                ";
sql += "     , DECODE(ITEM_CD          , '999999999', '정량한계미만', TO_CHAR(ITEM_CD          , 'FM999,999,990.00' )) ITEM_CD                                                                ";
sql += "     , DECODE(ITEM_HG          , '999999999', '정량한계미만', TO_CHAR(ITEM_HG          , 'FM999,999,990.000')) ITEM_HG                                                                ";
sql += "     , DECODE(ITEM_AL          , '999999999', '정량한계미만', TO_CHAR(ITEM_AL          , 'FM999,999,990.00' )) ITEM_AL                                                                ";
sql += "     , DECODE(ITEM_LI          , '999999999', '정량한계미만', TO_CHAR(ITEM_LI          , 'FM999,999,990.0'  )) ITEM_LI                                                                ";
sql += "     FROM (                                                                                                                                                                           ";
sql += "         SELECT A.PT_NO ,                                                                                                                                                             ";
sql += "           A.WMYR ,                                                                                                                                                                   ";
sql += "           A.WMWK ,                                                                                                                                                                   ";
sql += "           A.WMYR || A.WMWK WMYRWK ,                                                                                                                                                  ";
sql += "           A.WMOM ,                                                                                                                                                                   ";
sql += "           A.WMOD ,                                                                                                                                                                   ";
sql += "           A.WMCTM ,                                                                                                                                                                  ";
sql += "           A.WMSD ,                                                                                                                                                                   ";
sql += "           A.WMED ,                                                                                                                                                                   ";
sql += "           SUBSTR(B.PT_NO, 5, 1) VGBN ,                                                                                                                                               ";
sql += "           CD.CODE_CTN RAGBN ,                                                                                                                                                        ";
sql += "           B.PT_NM ,                                                                                                                                                                  ";
sql += "           DECODE(SUBSTR(UPPER(B.PT_NM), LENGTH(TRIM(B.PT_NM)), 1), 'U', REPLACE(UPPER(B.PT_NM), 'U'), 'D', REPLACE(UPPER(B.PT_NM), 'D'), B.PT_NM) ORD_PT_NM ,                        ";
sql += "           B.ORD_GBN ,                                                                                                                                                                ";
sql += "           B.JOSACODE ,                                                                                                                                                               ";
sql += "           CD2.CODE_CTN JOSANAME ,                                                                                                                                                    ";
sql += "                   CASE                                                                                                                                                               ";
sql += "                     WHEN A.RGDT=A.UPDT THEN 'Y'                                                                                                                                      ";
sql += "                     ELSE ''                                                                                                                                                          ";
sql += "                   END UPOK ,                                                                                                                                                         ";
sql += "           A.UPDT ,                                                                                                                                                                   ";
sql += "           CD3.CODE_CTN MCNT                                                                                                                                                          ";
sql += "         , ROUND(ITEM_DOW         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1001' AND ROWNUM=1)) ITEM_DOW                                                                  ";
sql += "         , ROUND(ITEM_DOW_SURF    , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1026' AND ROWNUM=1)) ITEM_DOW_SURF                                                             ";
sql += "         , ROUND(ITEM_TEMP_SURF   , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1027' AND ROWNUM=1)) ITEM_TEMP_SURF                                                            ";
sql += "         , ROUND(ITEM_DO_SURF     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1028' AND ROWNUM=1)) ITEM_DO_SURF                                                              ";
sql += "         , ROUND(ITEM_PH_SURF     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1029' AND ROWNUM=1)) ITEM_PH_SURF                                                              ";
sql += "         , ROUND(ITEM_EC_SURF     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1030' AND ROWNUM=1)) ITEM_EC_SURF                                                              ";
sql += "         , ROUND(ITEM_DOW_LOW     , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1031' AND ROWNUM=1)) ITEM_DOW_LOW                                                              ";
sql += "         , ROUND(ITEM_TEMP_LOW    , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1032' AND ROWNUM=1)) ITEM_TEMP_LOW                                                             ";
sql += "         , ROUND(ITEM_DO_LOW      , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1033' AND ROWNUM=1)) ITEM_DO_LOW                                                               ";
sql += "         , ROUND(ITEM_PH_LOW      , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1034' AND ROWNUM=1)) ITEM_PH_LOW                                                               ";
sql += "         , ROUND(ITEM_EC_LOW      , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1035' AND ROWNUM=1)) ITEM_EC_LOW                                                               ";
sql += "         , ROUND(ITEM_TRANSPARENCY, (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1036' AND ROWNUM=1)) ITEM_TRANSPARENCY                                                         ";
sql += "         , ROUND(ITEM_FSD         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1006' AND ROWNUM=1)) ITEM_FSD                                                                  ";
sql += "         , ROUND(ITEM_FST         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1007' AND ROWNUM=1)) ITEM_FST                                                                  ";
sql += "         , ROUND(ITEM_FCL         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1008' AND ROWNUM=1)) ITEM_FCL                                                                  ";
sql += "         , ROUND(ITEM_WTC         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1009' AND ROWNUM=1)) ITEM_WTC                                                                  ";
sql += "         , ROUND(ITEM_PCA         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1010' AND ROWNUM=1)) ITEM_PCA                                                                  ";
sql += "         , ROUND(ITEM_COD         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1011' AND ROWNUM=1)) ITEM_COD                                                                  ";
sql += "         , ROUND(ITEM_TOC         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1012' AND ROWNUM=1)) ITEM_TOC                                                                  ";
sql += "         , ROUND(ITEM_TN          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1013' AND ROWNUM=1)) ITEM_TN                                                                   ";
sql += "         , ROUND(ITEM_TP          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1014' AND ROWNUM=1)) ITEM_TP                                                                   ";
sql += "         , ROUND(ITEM_SRP         , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1015' AND ROWNUM=1)) ITEM_SRP                                                                  ";
sql += "         , ROUND(ITEM_PB          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1016' AND ROWNUM=1)) ITEM_PB                                                                   ";
sql += "         , ROUND(ITEM_ZN          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1017' AND ROWNUM=1)) ITEM_ZN                                                                   ";
sql += "         , ROUND(ITEM_CU          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1018' AND ROWNUM=1)) ITEM_CU                                                                   ";
sql += "         , ROUND(ITEM_CR          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1019' AND ROWNUM=1)) ITEM_CR                                                                   ";
sql += "         , ROUND(ITEM_NI          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1020' AND ROWNUM=1)) ITEM_NI                                                                   ";
sql += "         , ROUND(ITEM_AS          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1021' AND ROWNUM=1)) ITEM_AS                                                                   ";
sql += "         , ROUND(ITEM_CD          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1022' AND ROWNUM=1)) ITEM_CD                                                                   ";
sql += "         , ROUND(ITEM_HG          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1023' AND ROWNUM=1)) ITEM_HG                                                                   ";
sql += "         , ROUND(ITEM_AL          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1024' AND ROWNUM=1)) ITEM_AL                                                                   ";
sql += "         , ROUND(ITEM_LI          , (SELECT PRECISON FROM SDM_WMIT SW WHERE SW.ITCD = '1025' AND ROWNUM=1)) ITEM_LI   ,                                                               ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT COUNT(*)                                                                                                                                                          ";
sql += "             FROM SDM_FILE_INFO FI                                                                                                                                                    ";
sql += "             WHERE FI.UM_GBN = 'B'                                                                                                                                                    ";
sql += "               AND FI.PT_NO = A.PT_NO                                                                                                                                                 ";
sql += "               AND FI.WMYR = A.WMYR                                                                                                                                                   ";
sql += "               AND FI.WMWK = A.WMWK) IMG_CNT ,                                                                                                                                        ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT COUNT(*)                                                                                                                                                          ";
sql += "             FROM SDM_FILE_INFO FI                                                                                                                                                    ";
sql += "             WHERE FI.UM_GBN = 'C'                                                                                                                                                    ";
sql += "               AND FI.WMYR = A.WMYR                                                                                                                                                   ";
sql += "               AND FI.WMWK = A.WMWK) IMG_CNT2                                                                                                                                         ";
sql += "         FROM SDM_RWMDTI A ,                                                                                                                                                          ";
sql += "           SDM_RWMPT B ,                                                                                                                                                              ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT CODE,                                                                                                                                                             ";
sql += "               CODE_CTN                                                                                                                                                               ";
sql += "             FROM CODE                                                                                                                                                                ";
sql += "             WHERE CODE_ID = 'SDM001') CD ,                                                                                                                                           ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT CODE,                                                                                                                                                             ";
sql += "               CODE_CTN                                                                                                                                                               ";
sql += "             FROM CODE                                                                                                                                                                ";
sql += "             WHERE CODE_ID = 'ORG001') CD2 ,                                                                                                                                          ";
sql += "           (                                                                                                                                                                          ";
sql += "             SELECT SUBSTR(CODE, 2, 1) CODE,                                                                                                                                          ";
sql += "               CODE_CTN                                                                                                                                                               ";
sql += "             FROM CODE                                                                                                                                                                ";
sql += "             WHERE CODE_ID = 'ETS955'                                                                                                                                                 ";
sql += "               AND SUBSTR(CODE, 0, 1) = 'H') CD3                                                                                                                                      ";
sql += "         WHERE A.PT_NO = B.PT_NO                                                                                                                                                      ";
sql += "           AND SUBSTR(A.PT_NO, 5, 1) = CD.CODE(+)                                                                                                                                     ";
sql += "           AND B.JOSACODE = CD2.CODE(+)                                                                                                                                               ";
sql += "           AND A.WMWK = CD3.CODE(+) ) ) B                                                                                                                                             ";
sql += " WHERE A.PT_NO = B.PT_NO                                                                                                                                                              ";
sql += "   AND A.NO BETWEEN B.NO -4 AND B.NO                                                                                                                                                  ";
sql += "      AND A.PT_NO IN ("+siteIds+ ")                                                                                                                                                       ";
if(firstSearch.equals("date")){
	sql += "   AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 6, 2) >= '"+startYYYYMM+"'                                                         " ;
	sql += "   AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 6, 2) <= '"+endYYYYMM+"'                                                         " ;
	sql += "   ORDER BY A.PT_NO, A.WMCYMD ASC, B.WMCYMD                                                         " ;
	
}else{
	sql += " AND ROWNUM <= 1  ";
	sql += " order by WMYR DESC, WMOM DESC ";
}
//}else{
//	sql += "   AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 6, 2) >= '201209'                                                         ";
//	sql += "   AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 6, 2) <= '201212'                                                         " ;	
//}

		
     //sql += "AND A.PT_NO IN (" + siteIds + ") ";
     
     
	
   //System.out.println(sql);
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	String preSeq = "";
	String PT_NO = "";
	String PT_NM = "";
	String WMYR = "";
	String WMOM = "";
	
	String WMCYMD_VAL = "";
	JSONArray WMCYMD_GRAPH = new JSONArray();
	
	String MCNT = "";
	String JOSANAME = "";
	
	String ITEM_DOW_VAL = "";
	JSONArray ITEM_DOW_GRAPH = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	//
	
	
	String ITEM_DOW_SURF_VAL = "";
	JSONArray ITEM_DOW_SURF_GRAPH = new JSONArray();
	
	String ITEM_TEMP_SURF_VAL = "";
	JSONArray ITEM_TEMP_SURF_GRAPH = new JSONArray();
	
	String ITEM_DO_SURF_VAL = "";
	JSONArray ITEM_DO_SURF_GRAPH = new JSONArray();
	
	String ITEM_PH_SURF_VAL = "";
	JSONArray ITEM_PH_SURF_GRAPH = new JSONArray();
	
	String ITEM_EC_SURF_VAL = "";
	JSONArray ITEM_EC_SURF_GRAPH = new JSONArray();
	
	String ITEM_DOW_LOW_VAL = "";
	JSONArray ITEM_DOW_LOW_GRAPH = new JSONArray();
	
	String ITEM_TEMP_LOW_VAL = "";
	JSONArray ITEM_TEMP_LOW_GRAPH = new JSONArray();
	
	String ITEM_DO_LOW_VAL = "";
	JSONArray ITEM_DO_LOW_GRAPH = new JSONArray();
	
	String ITEM_PH_LOW_VAL = "";
	JSONArray ITEM_PH_LOW_GRAPH = new JSONArray();
	
	String ITEM_EC_LOW_VAL = "";
	JSONArray ITEM_EC_LOW_GRAPH = new JSONArray();
	
	String ITEM_TRANSPARENCY_VAL = "";
	JSONArray ITEM_TRANSPARENCY_GRAPH = new JSONArray();
	
	
	
	/* String ITEM_TEMP_VAL = "";
	JSONArray ITEM_TEMP_GRAPH = new JSONArray();
	
	String ITEM_DO_VAL = "";
	JSONArray ITEM_DO_GRAPH = new JSONArray();
	
	String ITEM_PH_VAL = "";
	JSONArray ITEM_PH_GRAPH = new JSONArray();
	
	String ITEM_EC_VAL = "";
	JSONArray ITEM_EC_GRAPH = new JSONArray(); */
	
	//
	
	String ITEM_FSD_VAL = "";
	JSONArray ITEM_FSD_GRAPH = new JSONArray();
	
	String ITEM_FST_VAL = "";
	JSONArray ITEM_FST_GRAPH = new JSONArray();
	
	String ITEM_FCL_VAL = "";
	JSONArray ITEM_FCL_GRAPH = new JSONArray();
	
	String ITEM_WTC_VAL = "";
	JSONArray ITEM_WTC_GRAPH = new JSONArray();
	
	String ITEM_PCA_VAL = "";
	JSONArray ITEM_PCA_GRAPH = new JSONArray();
	
	String ITEM_COD_VAL = "";
	JSONArray ITEM_COD_GRAPH = new JSONArray();
	
	String ITEM_TOC_VAL = "";
	JSONArray ITEM_TOC_GRAPH = new JSONArray();
	
	String ITEM_TN_VAL = "";
	JSONArray ITEM_TN_GRAPH = new JSONArray();
	
	String ITEM_TP_VAL = "";
	JSONArray ITEM_TP_GRAPH = new JSONArray();
	
	String ITEM_SRP_VAL = "";
	JSONArray ITEM_SRP_GRAPH = new JSONArray();
	
	String ITEM_PB_VAL = "";
	JSONArray ITEM_PB_GRAPH = new JSONArray();
	
	String ITEM_ZN_VAL = "";
	JSONArray ITEM_ZN_GRAPH = new JSONArray();
	
	String ITEM_CU_VAL = "";
	JSONArray ITEM_CU_GRAPH = new JSONArray();
	
	String ITEM_CR_VAL = "";
	JSONArray ITEM_CR_GRAPH = new JSONArray();
	
	String ITEM_NI_VAL = "";
	JSONArray ITEM_NI_GRAPH = new JSONArray();
	
	String ITEM_AS_VAL = "";
	JSONArray ITEM_AS_GRAPH = new JSONArray();
	
	String ITEM_CD_VAL = "";
	JSONArray ITEM_CD_GRAPH = new JSONArray();
	
	String ITEM_HG_VAL = "";
	JSONArray ITEM_HG_GRAPH = new JSONArray();
	
	String ITEM_AL_VAL = "";
	JSONArray ITEM_AL_GRAPH = new JSONArray();
	
	String ITEM_LI_VAL = "";
	JSONArray ITEM_LI_GRAPH = new JSONArray();
	
	
	
	int cnt = 0;
	//out.print(rs);
	while(rs.next()) {
		
		cnt++;
		if(!preSeq.equals("") && !preSeq.equals(rs.getString("NO"))){
			
			cnt = 1;
			
			//System.out.println(preSite + preDate);
			jsonRecord = new JSONObject();
			//jsonRecord.put("parentId", parentId);
			jsonRecord.put("PT_NO",PT_NO);
			jsonRecord.put("PT_NM",PT_NM);
			jsonRecord.put("WMYR",WMYR);
			jsonRecord.put("WMOM",WMOM);
			jsonRecord.put("WMCYMD_VAL",WMCYMD_VAL);
			jsonRecord.put("WMCYMD_GRAPH",WMCYMD_GRAPH);
			jsonRecord.put("MCNT",MCNT);
			jsonRecord.put("JOSANAME",JOSANAME);
			jsonRecord.put("ITEM_DOW_VAL",ITEM_DOW_VAL);
			jsonRecord.put("ITEM_DOW_GRAPH",ITEM_DOW_GRAPH);
			
			
			jsonRecord.put("ITEM_DOW_SURF_VAL",ITEM_DOW_SURF_VAL);
			jsonRecord.put("ITEM_DOW_SURF_GRAPH",ITEM_DOW_SURF_GRAPH);
			jsonRecord.put("ITEM_TEMP_SURF_VAL",ITEM_TEMP_SURF_VAL);
			jsonRecord.put("ITEM_TEMP_SURF_GRAPH",ITEM_TEMP_SURF_GRAPH);
			jsonRecord.put("ITEM_DO_SURF_VAL",ITEM_DO_SURF_VAL);
			jsonRecord.put("ITEM_DO_SURF_GRAPH",ITEM_DO_SURF_GRAPH);
			jsonRecord.put("ITEM_PH_SURF_VAL",ITEM_PH_SURF_VAL);
			jsonRecord.put("ITEM_PH_SURF_GRAPH",ITEM_PH_SURF_GRAPH);
			jsonRecord.put("ITEM_EC_SURF_VAL",ITEM_EC_SURF_VAL);
			jsonRecord.put("ITEM_EC_SURF_GRAPH",ITEM_EC_SURF_GRAPH);
			jsonRecord.put("ITEM_DOW_LOW_VAL",ITEM_DOW_LOW_VAL);
			jsonRecord.put("ITEM_DOW_LOW_GRAPH",ITEM_DOW_LOW_GRAPH);
			jsonRecord.put("ITEM_TEMP_LOW_VAL",ITEM_TEMP_LOW_VAL);
			jsonRecord.put("ITEM_TEMP_LOW_GRAPH",ITEM_TEMP_LOW_GRAPH);
			jsonRecord.put("ITEM_DO_LOW_VAL",ITEM_DO_LOW_VAL);
			jsonRecord.put("ITEM_DO_LOW_GRAPH",ITEM_DO_LOW_GRAPH);
			jsonRecord.put("ITEM_PH_LOW_VAL",ITEM_PH_LOW_VAL);
			jsonRecord.put("ITEM_PH_LOW_GRAPH",ITEM_PH_LOW_GRAPH);
			jsonRecord.put("ITEM_EC_LOW_VAL",ITEM_EC_LOW_VAL);
			jsonRecord.put("ITEM_EC_LOW_GRAPH",ITEM_EC_LOW_GRAPH);
			jsonRecord.put("ITEM_TRANSPARENCY_VAL",ITEM_TRANSPARENCY_VAL);
			jsonRecord.put("ITEM_TRANSPARENCY_GRAPH",ITEM_TRANSPARENCY_GRAPH);
			
			/* jsonRecord.put("ITEM_TEMP_VAL",ITEM_TEMP_VAL);
			jsonRecord.put("ITEM_TEMP_GRAPH",ITEM_TEMP_GRAPH);
			jsonRecord.put("ITEM_DO_VAL",ITEM_DO_VAL);
			jsonRecord.put("ITEM_DO_GRAPH",ITEM_DO_GRAPH);
			jsonRecord.put("ITEM_PH_VAL",ITEM_PH_VAL);
			jsonRecord.put("ITEM_PH_GRAPH",ITEM_PH_GRAPH);
			jsonRecord.put("ITEM_EC_VAL",ITEM_EC_VAL);
			jsonRecord.put("ITEM_EC_GRAPH",ITEM_EC_GRAPH); */
			
			
			jsonRecord.put("ITEM_FSD_VAL",ITEM_FSD_VAL);
			jsonRecord.put("ITEM_FSD_GRAPH",ITEM_FSD_GRAPH);
			jsonRecord.put("ITEM_FST_VAL",ITEM_FST_VAL);
			jsonRecord.put("ITEM_FST_GRAPH",ITEM_FST_GRAPH);
			jsonRecord.put("ITEM_FCL_VAL",ITEM_FCL_VAL);
			jsonRecord.put("ITEM_FCL_GRAPH",ITEM_FCL_GRAPH);
			jsonRecord.put("ITEM_WTC_VAL",ITEM_WTC_VAL);
			jsonRecord.put("ITEM_WTC_GRAPH",ITEM_WTC_GRAPH);
			jsonRecord.put("ITEM_PCA_VAL",ITEM_PCA_VAL);
			jsonRecord.put("ITEM_PCA_GRAPH",ITEM_PCA_GRAPH);
			jsonRecord.put("ITEM_COD_VAL",ITEM_COD_VAL);
			jsonRecord.put("ITEM_COD_GRAPH",ITEM_COD_GRAPH);
			jsonRecord.put("ITEM_TOC_VAL",ITEM_TOC_VAL);
			jsonRecord.put("ITEM_TOC_GRAPH",ITEM_TOC_GRAPH);
			jsonRecord.put("ITEM_TN_VAL",ITEM_TN_VAL);
			jsonRecord.put("ITEM_TN_GRAPH",ITEM_TN_GRAPH);
			jsonRecord.put("ITEM_TP_VAL",ITEM_TP_VAL);
			jsonRecord.put("ITEM_TP_GRAPH",ITEM_TP_GRAPH);
			jsonRecord.put("ITEM_SRP_VAL",ITEM_SRP_VAL);
			jsonRecord.put("ITEM_SRP_GRAPH",ITEM_SRP_GRAPH);
			jsonRecord.put("ITEM_PB_VAL",ITEM_PB_VAL);
			jsonRecord.put("ITEM_PB_GRAPH",ITEM_PB_GRAPH);
			jsonRecord.put("ITEM_ZN_VAL",ITEM_ZN_VAL);
			jsonRecord.put("ITEM_ZN_GRAPH",ITEM_ZN_GRAPH);
			jsonRecord.put("ITEM_CU_VAL",ITEM_CU_VAL);
			jsonRecord.put("ITEM_CU_GRAPH",ITEM_CU_GRAPH);
			jsonRecord.put("ITEM_CR_VAL",ITEM_CR_VAL);
			jsonRecord.put("ITEM_CR_GRAPH",ITEM_CR_GRAPH);
			jsonRecord.put("ITEM_NI_VAL",ITEM_NI_VAL);
			jsonRecord.put("ITEM_NI_GRAPH",ITEM_NI_GRAPH);
			jsonRecord.put("ITEM_AS_VAL",ITEM_AS_VAL);
			jsonRecord.put("ITEM_AS_GRAPH",ITEM_AS_GRAPH);
			jsonRecord.put("ITEM_CD_VAL",ITEM_CD_VAL);
			jsonRecord.put("ITEM_CD_GRAPH",ITEM_CD_GRAPH);
			jsonRecord.put("ITEM_HG_VAL",ITEM_HG_VAL);
			jsonRecord.put("ITEM_HG_GRAPH",ITEM_HG_GRAPH);
			jsonRecord.put("ITEM_AL_VAL",ITEM_AL_VAL);
			jsonRecord.put("ITEM_AL_GRAPH",ITEM_AL_GRAPH);
			jsonRecord.put("ITEM_LI_VAL",ITEM_LI_VAL);
			jsonRecord.put("ITEM_LI_GRAPH",ITEM_LI_GRAPH);
	  		
	  		jsonArr.add(jsonRecord);
	  		
	  		WMCYMD_GRAPH = new JSONArray();
	  		ITEM_DOW_GRAPH = new JSONArray();
	  		
	  		ITEM_DOW_SURF_GRAPH = new JSONArray();
	  		ITEM_TEMP_SURF_GRAPH = new JSONArray();
	  		ITEM_DO_SURF_GRAPH = new JSONArray();
	  		ITEM_PH_SURF_GRAPH = new JSONArray();
	  		ITEM_EC_SURF_GRAPH = new JSONArray();
	  		ITEM_DOW_LOW_GRAPH = new JSONArray();
	  		ITEM_TEMP_LOW_GRAPH = new JSONArray();
	  		ITEM_DO_LOW_GRAPH = new JSONArray();
	  		ITEM_PH_LOW_GRAPH = new JSONArray();
	  		ITEM_EC_LOW_GRAPH = new JSONArray();
	  		ITEM_TRANSPARENCY_GRAPH = new JSONArray();
	  		
	  		/* ITEM_TEMP_GRAPH = new JSONArray();
	  		ITEM_DO_GRAPH  = new JSONArray();
	  		ITEM_PH_GRAPH  = new JSONArray();
	  		ITEM_EC_GRAPH  = new JSONArray(); */
	  		ITEM_FSD_GRAPH  = new JSONArray();
	  		ITEM_FST_GRAPH  = new JSONArray();
	  		ITEM_FCL_GRAPH  = new JSONArray();
	  		ITEM_WTC_GRAPH = new JSONArray();
	  		ITEM_PCA_GRAPH = new JSONArray();
	  		ITEM_COD_GRAPH = new JSONArray();
	  		ITEM_TOC_GRAPH = new JSONArray();
	  		ITEM_TN_GRAPH = new JSONArray();
	  		ITEM_TP_GRAPH = new JSONArray();
	  		ITEM_SRP_GRAPH = new JSONArray();
	  		ITEM_PB_GRAPH = new JSONArray();
	  		ITEM_ZN_GRAPH = new JSONArray();
	  		ITEM_CU_GRAPH = new JSONArray();
	  		ITEM_CR_GRAPH = new JSONArray();
	  		ITEM_NI_GRAPH = new JSONArray();
	  		ITEM_AS_GRAPH = new JSONArray();
	  		ITEM_CD_GRAPH = new JSONArray();
	  		ITEM_HG_GRAPH = new JSONArray();
	  		ITEM_AL_GRAPH = new JSONArray();
	  		ITEM_LI_GRAPH = new JSONArray();
		}
		//else{
			//parentId = rs.getString("parentId");
			PT_NO  = rs.getString("PT_NO");
			PT_NM  = rs.getString("PT_NM");
			WMYR  = rs.getString("WMYR");
			WMOM  = rs.getString("WMOM");
			
			WMCYMD_VAL  = rs.getString("WMCYMD_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("WMCYMD_GRAPH"));
			WMCYMD_GRAPH.add(Chart_Data_tmp);
			
			MCNT  = rs.getString("MCNT");
			JOSANAME  = rs.getString("JOSANAME");
			
			ITEM_DOW_VAL = rs.getString("ITEM_DOW_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DOW_GRAPH"));
			ITEM_DOW_GRAPH.add(Chart_Data_tmp);
			
			
			
			ITEM_DOW_SURF_VAL = rs.getString("ITEM_DOW_SURF_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DOW_SURF_GRAPH"));
			ITEM_DOW_SURF_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TEMP_SURF_VAL = rs.getString("ITEM_TEMP_SURF_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TEMP_SURF_GRAPH"));
			ITEM_TEMP_SURF_GRAPH.add(Chart_Data_tmp);
			
			ITEM_DO_SURF_VAL = rs.getString("ITEM_DO_SURF_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DO_SURF_GRAPH"));
			ITEM_DO_SURF_GRAPH.add(Chart_Data_tmp);
			
			ITEM_PH_SURF_VAL = rs.getString("ITEM_PH_SURF_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PH_SURF_GRAPH"));
			ITEM_PH_SURF_GRAPH.add(Chart_Data_tmp);
			
			ITEM_EC_SURF_VAL = rs.getString("ITEM_EC_SURF_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_EC_SURF_GRAPH"));
			ITEM_EC_SURF_GRAPH.add(Chart_Data_tmp);
			
			ITEM_DOW_LOW_VAL = rs.getString("ITEM_DOW_LOW_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DOW_LOW_GRAPH"));
			ITEM_DOW_LOW_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TEMP_LOW_VAL = rs.getString("ITEM_TEMP_LOW_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TEMP_LOW_GRAPH"));
			ITEM_TEMP_LOW_GRAPH.add(Chart_Data_tmp);
			
			ITEM_DO_LOW_VAL = rs.getString("ITEM_DO_LOW_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DO_LOW_GRAPH"));
			ITEM_DO_LOW_GRAPH.add(Chart_Data_tmp);
			
			ITEM_PH_LOW_VAL = rs.getString("ITEM_PH_LOW_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PH_LOW_GRAPH"));
			ITEM_PH_LOW_GRAPH.add(Chart_Data_tmp);
			
			ITEM_EC_LOW_VAL = rs.getString("ITEM_EC_LOW_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_EC_LOW_GRAPH"));
			ITEM_EC_LOW_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TRANSPARENCY_VAL = rs.getString("ITEM_TRANSPARENCY_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TRANSPARENCY_GRAPH"));
			ITEM_TRANSPARENCY_GRAPH.add(Chart_Data_tmp);
			
			
			/* ITEM_TEMP_VAL = rs.getString("ITEM_TEMP_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TEMP_GRAPH"));
			ITEM_TEMP_GRAPH.add(Chart_Data_tmp);
			
						
			ITEM_DO_VAL  = rs.getString("ITEM_DO_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_DO_GRAPH"));
			ITEM_DO_GRAPH.add(Chart_Data_tmp);
			
			
			ITEM_PH_VAL = rs.getString("ITEM_PH_VAL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PH_GRAPH"));
			ITEM_PH_GRAPH.add(Chart_Data_tmp);
			
			
			ITEM_EC_VAL = rs.getString("ITEM_EC_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_EC_GRAPH"));
			ITEM_EC_GRAPH.add(Chart_Data_tmp); */
			
			
			ITEM_FSD_VAL = rs.getString("ITEM_FSD_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_FSD_GRAPH"));
			ITEM_FSD_GRAPH.add(Chart_Data_tmp);
	  		//CHART_TN.add(rs.getString("CHART_TN"));
	  		
	  		
	  		ITEM_FST_VAL = rs.getString("ITEM_FST_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_FST_GRAPH"));
			ITEM_FST_GRAPH.add(Chart_Data_tmp);
	  		//CHART_TP.add(rs.getString("CHART_TP"));
	  		
	  		
	  		ITEM_FCL_VAL = rs.getString("ITEM_FCL_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_FCL_GRAPH"));
			ITEM_FCL_GRAPH.add(Chart_Data_tmp);
	  		//CHART_TEMP.add(rs.getString("CHART_TEMP"));
	  		
	  		
	  		ITEM_WTC_VAL = rs.getString("ITEM_WTC_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_WTC_GRAPH"));
			ITEM_WTC_GRAPH.add(Chart_Data_tmp);
	  		//CHART_PH.add(rs.getString("CHART_PH")); 
	  		
			ITEM_PCA_VAL = rs.getString("ITEM_PCA_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PCA_GRAPH"));
			ITEM_PCA_GRAPH.add(Chart_Data_tmp);
			
			ITEM_COD_VAL = rs.getString("ITEM_COD_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_COD_GRAPH"));
			ITEM_COD_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TOC_VAL = rs.getString("ITEM_TOC_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TOC_GRAPH"));
			ITEM_TOC_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TN_VAL = rs.getString("ITEM_TN_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TN_GRAPH"));
			ITEM_TN_GRAPH.add(Chart_Data_tmp);
			
			ITEM_TP_VAL = rs.getString("ITEM_TP_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_TP_GRAPH"));
			ITEM_TP_GRAPH.add(Chart_Data_tmp);
			
			ITEM_SRP_VAL = rs.getString("ITEM_SRP_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_SRP_GRAPH"));
			ITEM_SRP_GRAPH.add(Chart_Data_tmp);
			
			ITEM_PB_VAL = rs.getString("ITEM_PB_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_PB_GRAPH"));
			ITEM_PB_GRAPH.add(Chart_Data_tmp);
			
			ITEM_ZN_VAL = rs.getString("ITEM_ZN_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_ZN_GRAPH"));
			ITEM_ZN_GRAPH.add(Chart_Data_tmp);
			
			ITEM_CU_VAL = rs.getString("ITEM_CU_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_CU_GRAPH"));
			ITEM_CU_GRAPH.add(Chart_Data_tmp);
			
			ITEM_CR_VAL = rs.getString("ITEM_CR_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_CR_GRAPH"));
			ITEM_CR_GRAPH.add(Chart_Data_tmp);
			
			ITEM_NI_VAL = rs.getString("ITEM_NI_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_NI_GRAPH"));
			ITEM_NI_GRAPH.add(Chart_Data_tmp);
			
			ITEM_AS_VAL = rs.getString("ITEM_AS_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_AS_GRAPH"));
			ITEM_AS_GRAPH.add(Chart_Data_tmp);
			
			ITEM_CD_VAL = rs.getString("ITEM_CD_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_CD_GRAPH"));
			ITEM_CD_GRAPH.add(Chart_Data_tmp);
			
			ITEM_HG_VAL = rs.getString("ITEM_HG_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_HG_GRAPH"));
			ITEM_HG_GRAPH.add(Chart_Data_tmp);
			
			ITEM_AL_VAL = rs.getString("ITEM_AL_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_AL_GRAPH"));
			ITEM_AL_GRAPH.add(Chart_Data_tmp);
			
			ITEM_LI_VAL = rs.getString("ITEM_LI_VAL");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("ITEM_LI_GRAPH"));
			ITEM_LI_GRAPH.add(Chart_Data_tmp);
			
			
	  		
	  		
		 if(!preSeq.equals(rs.getString("NO")))
			preSeq = rs.getString("NO"); 
  		
	}
	
	jsonRecord = new JSONObject();
	
	if(cnt > 0){
		jsonRecord.put("PT_NO",PT_NO);
		jsonRecord.put("PT_NM",PT_NM);
		jsonRecord.put("WMYR",WMYR);
		jsonRecord.put("WMOM",WMOM);
		jsonRecord.put("WMCYMD_VAL",WMCYMD_VAL);
		jsonRecord.put("WMCYMD_GRAPH",WMCYMD_GRAPH);
		jsonRecord.put("MCNT",MCNT);
		jsonRecord.put("JOSANAME",JOSANAME);
		jsonRecord.put("ITEM_DOW_VAL",ITEM_DOW_VAL);
		jsonRecord.put("ITEM_DOW_GRAPH",ITEM_DOW_GRAPH);
		/* jsonRecord.put("ITEM_TEMP_VAL",ITEM_TEMP_VAL);
		jsonRecord.put("ITEM_TEMP_GRAPH",ITEM_TEMP_GRAPH); */
		
		
		
		jsonRecord.put("ITEM_DOW_SURF_VAL",ITEM_DOW_SURF_VAL);
		jsonRecord.put("ITEM_DOW_SURF_GRAPH",ITEM_DOW_SURF_GRAPH);
		
		jsonRecord.put("ITEM_TEMP_SURF_VAL",ITEM_TEMP_SURF_VAL);
		jsonRecord.put("ITEM_TEMP_SURF_GRAPH",ITEM_TEMP_SURF_GRAPH);
		
		jsonRecord.put("ITEM_DO_SURF_VAL",ITEM_DO_SURF_VAL);
		jsonRecord.put("ITEM_DO_SURF_GRAPH",ITEM_DO_SURF_GRAPH);
		
		jsonRecord.put("ITEM_PH_SURF_VAL",ITEM_PH_SURF_VAL);
		jsonRecord.put("ITEM_PH_SURF_GRAPH",ITEM_PH_SURF_GRAPH);
		
		jsonRecord.put("ITEM_EC_SURF_VAL",ITEM_EC_SURF_VAL);
		jsonRecord.put("ITEM_EC_SURF_GRAPH",ITEM_EC_SURF_GRAPH);
		
		jsonRecord.put("ITEM_DOW_LOW_VAL",ITEM_DOW_LOW_VAL);
		jsonRecord.put("ITEM_DOW_LOW_GRAPH",ITEM_DOW_LOW_GRAPH);
		
		jsonRecord.put("ITEM_TEMP_LOW_VAL",ITEM_TEMP_LOW_VAL);
		jsonRecord.put("ITEM_TEMP_LOW_GRAPH",ITEM_TEMP_LOW_GRAPH);
		
		jsonRecord.put("ITEM_DO_LOW_VAL",ITEM_DO_LOW_VAL);
		jsonRecord.put("ITEM_DO_LOW_GRAPH",ITEM_DO_LOW_GRAPH);
		
		jsonRecord.put("ITEM_PH_LOW_VAL",ITEM_PH_LOW_VAL);
		jsonRecord.put("ITEM_PH_LOW_GRAPH",ITEM_PH_LOW_GRAPH);
		
		jsonRecord.put("ITEM_EC_LOW_VAL",ITEM_EC_LOW_VAL);
		jsonRecord.put("ITEM_EC_LOW_GRAPH",ITEM_EC_LOW_GRAPH);
		
		jsonRecord.put("ITEM_TRANSPARENCY_VAL",ITEM_TRANSPARENCY_VAL);
		jsonRecord.put("ITEM_TRANSPARENCY_GRAPH",ITEM_TRANSPARENCY_GRAPH);
		
		
		
		
		/* jsonRecord.put("ITEM_DO_VAL",ITEM_DO_VAL);
		jsonRecord.put("ITEM_DO_GRAPH",ITEM_DO_GRAPH);
		jsonRecord.put("ITEM_PH_VAL",ITEM_PH_VAL);
		jsonRecord.put("ITEM_PH_GRAPH",ITEM_PH_GRAPH);
		jsonRecord.put("ITEM_EC_VAL",ITEM_EC_VAL);
		jsonRecord.put("ITEM_EC_GRAPH",ITEM_EC_GRAPH); */
		
		
		jsonRecord.put("ITEM_FSD_VAL",ITEM_FSD_VAL);
		jsonRecord.put("ITEM_FSD_GRAPH",ITEM_FSD_GRAPH);
		jsonRecord.put("ITEM_FST_VAL",ITEM_FST_VAL);
		jsonRecord.put("ITEM_FST_GRAPH",ITEM_FST_GRAPH);
		jsonRecord.put("ITEM_FCL_VAL",ITEM_FCL_VAL);
		jsonRecord.put("ITEM_FCL_GRAPH",ITEM_FCL_GRAPH);
		jsonRecord.put("ITEM_WTC_VAL",ITEM_WTC_VAL);
		jsonRecord.put("ITEM_WTC_GRAPH",ITEM_WTC_GRAPH);
		jsonRecord.put("ITEM_PCA_VAL",ITEM_PCA_VAL);
		jsonRecord.put("ITEM_PCA_GRAPH",ITEM_PCA_GRAPH);
		jsonRecord.put("ITEM_COD_VAL",ITEM_COD_VAL);
		jsonRecord.put("ITEM_COD_GRAPH",ITEM_COD_GRAPH);
		jsonRecord.put("ITEM_TOC_VAL",ITEM_TOC_VAL);
		jsonRecord.put("ITEM_TOC_GRAPH",ITEM_TOC_GRAPH);
		jsonRecord.put("ITEM_TN_VAL",ITEM_TN_VAL);
		jsonRecord.put("ITEM_TN_GRAPH",ITEM_TN_GRAPH);
		jsonRecord.put("ITEM_TP_VAL",ITEM_TP_VAL);
		jsonRecord.put("ITEM_TP_GRAPH",ITEM_TP_GRAPH);
		jsonRecord.put("ITEM_SRP_VAL",ITEM_SRP_VAL);
		jsonRecord.put("ITEM_SRP_GRAPH",ITEM_SRP_GRAPH);
		jsonRecord.put("ITEM_PB_VAL",ITEM_PB_VAL);
		jsonRecord.put("ITEM_PB_GRAPH",ITEM_PB_GRAPH);
		jsonRecord.put("ITEM_ZN_VAL",ITEM_ZN_VAL);
		jsonRecord.put("ITEM_ZN_GRAPH",ITEM_ZN_GRAPH);
		jsonRecord.put("ITEM_CU_VAL",ITEM_CU_VAL);
		jsonRecord.put("ITEM_CU_GRAPH",ITEM_CU_GRAPH);
		jsonRecord.put("ITEM_CR_VAL",ITEM_CR_VAL);
		jsonRecord.put("ITEM_CR_GRAPH",ITEM_CR_GRAPH);
		jsonRecord.put("ITEM_NI_VAL",ITEM_NI_VAL);
		jsonRecord.put("ITEM_NI_GRAPH",ITEM_NI_GRAPH);
		jsonRecord.put("ITEM_AS_VAL",ITEM_AS_VAL);
		jsonRecord.put("ITEM_AS_GRAPH",ITEM_AS_GRAPH);
		jsonRecord.put("ITEM_CD_VAL",ITEM_CD_VAL);
		jsonRecord.put("ITEM_CD_GRAPH",ITEM_CD_GRAPH);
		jsonRecord.put("ITEM_HG_VAL",ITEM_HG_VAL);
		jsonRecord.put("ITEM_HG_GRAPH",ITEM_HG_GRAPH);
		jsonRecord.put("ITEM_AL_VAL",ITEM_AL_VAL);
		jsonRecord.put("ITEM_AL_GRAPH",ITEM_HG_GRAPH); 
		jsonRecord.put("ITEM_LI_VAL",ITEM_LI_VAL);
		jsonRecord.put("ITEM_LI_GRAPH",ITEM_LI_GRAPH);
	}
	else{
		jsonRecord.put("msg", "데이터가 존재하지 않습니다.");
	}
	
	jsonArr.add(jsonRecord);
	
	jsonObj.put("data", jsonArr);
	
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	//System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>