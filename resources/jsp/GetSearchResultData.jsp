<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
	
	------수질측정지점---------
	
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
	//out.print("firstSearch::"+firstSearch);
	
	if(firstSearch.equals("date")){
	sql = " SELECT RN,RN_2, PT_NO, PT_NM, WMCYMD, CHART_DATE, WMYR, WMOD, WMWK, SEQ, WMDEP, CURR_BOD, CHART_BOD, CURR_DO, CHART_DO, CURR_COD, 												";
	sql += " CHART_COD, CURR_TN, CHART_TN, CURR_TP, CHART_TP, CURR_TEMP, CHART_TEMP, CURR_PH, CHART_PH, CURR_SS,CURR_SS_NEW, CHART_SS, CURR_CLOA, CHART_CLOA, CURR_TOC,       ";
	sql += "  CHART_TOC, CURR_AMNT, CHART_AMNT, CURR_DTN, CHART_DTN, CURR_NO3N, CHART_NO3N, CURR_NH3N, CHART_NH3N, CURR_DTP, CHART_DTP, CURR_POP, CHART_POP,      ";
	sql += "   CURR_TRANS, CHART_TRANS, CURR_ALGOL, CHART_ALGOL, CURR_TCOLI, CHART_TCOLI, CURR_ECOLI, CHART_ECOLI, CURR_ANTIMON, CHART_ANTIMON, CURR_PHENOL,      ";
	sql += "    CHART_PHENOL, CURR_COL, CHART_COL, CURR_NHEX, CHART_NHEX, CURR_MN, CHART_MN, CURR_FE, CHART_FE, CURR_CD, CHART_CD, CURR_CN, CHART_CN, CURR_PB,    ";
	sql += "    CHART_PB, CURR_CR6, CHART_CR6, CURR_CR, CHART_CR, CURR_AS, CHART_AS, CURR_HG, CHART_HG, CURR_CU, CHART_CU, CURR_ZN, CHART_ZN, CURR_FL, CHART_FL,  ";
	sql += "    CURR_ABS, CHART_ABS, CURR_CL, CHART_CL, CURR_TCE, CHART_TCE, CURR_PCE, CHART_PCE, CURR_CCL4, CHART_CCL4, CURR_DCETH, CHART_DCETH, CURR_DCM,       ";
	sql += "    CHART_DCM, CURR_BENZENE, CHART_BENZENE, CURR_CHCL3, CHART_CHCL3, CURR_OP, CHART_OP, CURR_PCB, CHART_PCB, CURR_DEHP , CHART_DEHP, CURR_DIOX, CHART_DIOX, CURR_HCHO,        ";
	sql += "     CHART_HCHO, CURR_HCB, CHART_HCB                                                                                                                  ";
	sql += "   FROM (                                                                                                                                             ";
	sql += "         SELECT                                                                                                                                       ";
	sql += "                CASE                                                                                                                                  ";
	sql += "                  WHEN SUBSTR(A.WMWK,-1) = '차' THEN A.RN                                                                                             ";
	sql += "                  WHEN SUBSTR(A.WMWK,-1) = '부' THEN RANK() OVER(PARTITION BY SUBSTR(A.PT_NO, 1, 7) ORDER BY A.WMYR, A.WMOD DESC, A.WMWK)             ";
	sql += "                  ELSE A.RN                                                                                                                           ";
	sql += "                END AS RN,                                                                                                                            ";
	sql += "                B.RN AS RN_2,                                                                                                                         ";
	sql += "   SUBSTR(A.PT_NO, 1, 7) AS PT_NO,                                                                                      ";
	sql += "   A.PT_NM,                                                                                                             ";
	sql += "   A.WMCYMD,                                                                                                            ";
	sql += "   B.WMCYMD AS CHART_DATE,                                                                                              ";
	sql += "   A.WMYR,                                                                                                              ";
	sql += "   A.WMOD,                                                                                                              ";
	sql += "   A.WMWK,                                                                                                              ";
	sql += "   B.WMWK AS SEQ ,                                                                                                      ";
	sql += "   A.WMDEP ,                                                                                                            ";
	sql += " NVL(A.ITEM_BOD, 888888888) AS CURR_BOD,				  ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_BOD = '999999999' THEN 0                                                                               ";
	//sql += "     WHEN B.ITEM_BOD is null THEN -200				";
	sql += "     ELSE B.ITEM_BOD                                                                                                    ";
	sql += "   END AS CHART_BOD ,                                                                                                   ";
	sql += " NVL(A.ITEM_DOC, 888888888) AS CURR_DO,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_DOC = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_DOC                                                                                                    ";
	sql += "   END AS CHART_DO ,                                                                                                    ";
	sql += " NVL(A.ITEM_COD, 888888888) AS CURR_COD,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_COD = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_COD                                                                                                    ";
	sql += "   END AS CHART_COD ,                                                                                                   ";
	sql += " NVL(A.ITEM_TN, 888888888) AS CURR_TN,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_TN = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_TN                                                                                                     ";
	sql += "   END AS CHART_TN ,                                                                                                    ";
	sql += " NVL(A.ITEM_TP, 888888888) AS CURR_TP,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_TP = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_TP                                                                                                     ";
	sql += "   END AS CHART_TP ,                                                                                                    ";
	sql += " NVL(A.ITEM_TEMP, 888888888) AS CURR_TEMP,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_TEMP = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_TEMP                                                                                                   ";
	sql += "   END AS CHART_TEMP ,                                                                                                  ";
	sql += " NVL(A.ITEM_PH, 888888888) AS CURR_PH,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_PH = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_PH                                                                                                     ";
	sql += "   END AS CHART_PH ,                                                                                                    ";
	sql += "   NVL(A.ITEM_SS, 888888888) AS CURR_SS ,                                                                                                     ";
	sql += " CASE WHEN B.ITEM_SS = 999999999 THEN '정량한계미만'   ";
	sql += "          ELSE NULL			";
	sql += "          END CURR_SS_NEW,		";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_SS = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_SS                                                                                                     ";
	sql += "   END AS CHART_SS ,                                                                                                    ";
	sql += " NVL(A.ITEM_CLOA, 888888888) AS CURR_CLOA,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CLOA = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_CLOA                                                                                                   ";
	sql += "   END AS CHART_CLOA ,                                                                                                  ";
	sql += " NVL(A.ITEM_TOC, 888888888) AS CURR_TOC,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_TOC = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_TOC                                                                                                    ";
	sql += "   END AS CHART_TOC ,                                                                                                   ";
	sql += " NVL(A.ITEM_AMNT, 888888888) AS CURR_AMNT,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_AMNT = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_AMNT                                                                                                   ";
	sql += "   END AS CHART_AMNT ,                                                                                                  ";
	sql += " NVL(A.ITEM_DTN, 888888888) AS CURR_DTN,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_DTN = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_DTN                                                                                                    ";
	sql += "   END AS CHART_DTN ,                                                                                                   ";
	sql += " NVL(A.ITEM_NO3N, 888888888) AS CURR_NO3N,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_NO3N = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_NO3N                                                                                                   ";
	sql += "   END AS CHART_NO3N ,                                                                                                  ";
	sql += " NVL(A.ITEM_NH3N, 888888888) AS CURR_NH3N,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_NH3N = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_NH3N                                                                                                   ";
	sql += "   END AS CHART_NH3N ,                                                                                                  ";
	sql += " NVL(A.ITEM_DTP, 888888888) AS CURR_DTP,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_DTP = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_DTP                                                                                                    ";
	sql += "   END AS CHART_DTP ,                                                                                                   ";
	sql += " NVL(A.ITEM_POP, 888888888) AS CURR_POP,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_POP = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_POP                                                                                                    ";
	sql += "   END AS CHART_POP ,                                                                                                   ";
	sql += " NVL(A.ITEM_TRANS, 888888888) AS CURR_TRANS,      ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_TRANS = '999999999' THEN 0                                                                             ";
	sql += "     ELSE B.ITEM_TRANS                                                                                                  ";
	sql += "   END AS CHART_TRANS ,                                                                                                 ";
	sql += " NVL(A.ITEM_ALGOL, 888888888) AS CURR_ALGOL,      ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_ALGOL = '999999999' THEN 0                                                                             ";
	sql += "     ELSE B.ITEM_ALGOL                                                                                                  ";
	sql += "   END AS CHART_ALGOL ,                                                                                                 ";
	sql += " NVL(A.ITEM_TCOLI, 888888888) AS CURR_TCOLI,      ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_TCOLI = '999999999' THEN 0                                                                             ";
	sql += "     ELSE B.ITEM_TCOLI                                                                                                  ";
	sql += "   END AS CHART_TCOLI ,                                                                                                 ";
	sql += " NVL(A.ITEM_ECOLI, 888888888) AS CURR_ECOLI,      ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_ECOLI = '999999999' THEN 0                                                                             ";
	sql += "     ELSE B.ITEM_ECOLI                                                                                                  ";
	sql += "   END AS CHART_ECOLI ,                                                                                                 ";
	sql += " NVL(A.ITEM_ANTIMON, 888888888) AS CURR_ANTIMON,  ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_ANTIMON = '999999999' THEN 0                                                                           ";
	sql += "     ELSE B.ITEM_ANTIMON                                                                                                ";
	sql += "   END AS CHART_ANTIMON ,                                                                                               ";
	sql += " NVL(A.ITEM_PHENOL, 888888888) AS CURR_PHENOL,    ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_PHENOL = '999999999' THEN 0                                                                            ";
	sql += "     ELSE B.ITEM_PHENOL                                                                                                 ";
	sql += "   END AS CHART_PHENOL ,                                                                                                ";
	sql += " NVL(A.ITEM_COL, 888888888) AS CURR_COL,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_COL = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_COL                                                                                                    ";
	sql += "   END AS CHART_COL ,                                                                                                   ";
	sql += " NVL(A.ITEM_NHEX, 888888888) AS CURR_NHEX,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_NHEX = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_NHEX                                                                                                   ";
	sql += "   END AS CHART_NHEX ,                                                                                                  ";
	sql += " NVL(A.ITEM_MN, 888888888) AS CURR_MN,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_MN = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_MN                                                                                                     ";
	sql += "   END AS CHART_MN ,                                                                                                    ";
	sql += " NVL(A.ITEM_FE, 888888888) AS CURR_FE,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_FE = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_FE                                                                                                     ";
	sql += "   END AS CHART_FE ,                                                                                                    ";
	sql += " NVL(A.ITEM_CD, 888888888) AS CURR_CD,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CD = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_CD                                                                                                     ";
	sql += "   END AS CHART_CD ,                                                                                                    ";
	sql += " NVL(A.ITEM_CN, 888888888) AS CURR_CN,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CN = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_CN                                                                                                     ";
	sql += "   END AS CHART_CN ,                                                                                                    ";
	sql += " NVL(A.ITEM_PB, 888888888) AS CURR_PB,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_PB = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_PB                                                                                                     ";
	sql += "   END AS CHART_PB ,                                                                                                    ";
	sql += " NVL(A.ITEM_CR6, 888888888) AS CURR_CR6,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CR6 = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_CR6                                                                                                    ";
	sql += "   END AS CHART_CR6 ,                                                                                                   ";
	sql += " NVL(A.ITEM_CR, 888888888) AS CURR_CR,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CR = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_CR                                                                                                     ";
	sql += "   END AS CHART_CR ,                                                                                                    ";
	sql += " NVL(A.ITEM_AS, 888888888) AS CURR_AS,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_AS = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_AS                                                                                                     ";
	sql += "   END AS CHART_AS ,                                                                                                    ";
	sql += " NVL(A.ITEM_HG, 888888888) AS CURR_HG,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_HG = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_HG                                                                                                     ";
	sql += "   END AS CHART_HG ,                                                                                                    ";
	sql += " NVL(A.ITEM_CU, 888888888) AS CURR_CU,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CU = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_CU                                                                                                     ";
	sql += "   END AS CHART_CU ,                                                                                                    ";
	sql += " NVL(A.ITEM_ZN, 888888888) AS CURR_ZN,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_ZN = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_ZN                                                                                                     ";
	sql += "   END AS CHART_ZN ,                                                                                                    ";
	sql += " NVL(A.ITEM_FL, 888888888) AS CURR_FL,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_FL = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_FL                                                                                                     ";
	sql += "   END AS CHART_FL ,                                                                                                    ";
	sql += " NVL(A.ITEM_ABS, 888888888) AS CURR_ABS,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_ABS = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_ABS                                                                                                    ";
	sql += "   END AS CHART_ABS ,                                                                                                   ";
	sql += " NVL(A.ITEM_CL, 888888888) AS CURR_CL,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CL = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_CL                                                                                                     ";
	sql += "   END AS CHART_CL ,                                                                                                    ";
	sql += " NVL(A.ITEM_TCE, 888888888) AS CURR_TCE,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_TCE = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_TCE                                                                                                    ";
	sql += "   END AS CHART_TCE ,                                                                                                   ";
	sql += " NVL(A.ITEM_PCE, 888888888) AS CURR_PCE,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_PCE = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_PCE                                                                                                    ";
	sql += "   END AS CHART_PCE ,                                                                                                   ";
	sql += " NVL(A.ITEM_CCL4, 888888888) AS CURR_CCL4,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CCL4 = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_CCL4                                                                                                   ";
	sql += "   END AS CHART_CCL4 ,                                                                                                  ";
	sql += " NVL(A.ITEM_DCETH, 888888888) AS CURR_DCETH,      ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_DCETH = '999999999' THEN 0                                                                             ";
	sql += "     ELSE B.ITEM_DCETH                                                                                                  ";
	sql += "   END AS CHART_DCETH ,                                                                                                 ";
	sql += " NVL(A.ITEM_DCM, 888888888) AS CURR_DCM,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_DCM = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_DCM                                                                                                    ";
	sql += "   END AS CHART_DCM ,                                                                                                   ";
	sql += " NVL(A.ITEM_BENZENE, 888888888) AS CURR_BENZENE,  ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_BENZENE = '999999999' THEN 0                                                                           ";
	sql += "     ELSE B.ITEM_BENZENE                                                                                                ";
	sql += "   END AS CHART_BENZENE ,                                                                                               ";
	sql += " NVL(A.ITEM_CHCL3, 888888888) AS CURR_CHCL3,      ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_CHCL3 = '999999999' THEN 0                                                                             ";
	sql += "     ELSE B.ITEM_CHCL3                                                                                                  ";
	sql += "   END AS CHART_CHCL3 ,                                                                                                 ";
	sql += " NVL(A.ITEM_OP, 888888888) AS CURR_OP,            ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_OP = '999999999' THEN 0                                                                                ";
	sql += "     ELSE B.ITEM_OP                                                                                                     ";
	sql += "   END AS CHART_OP ,                                                                                                    ";
	sql += " NVL(A.ITEM_PCB, 888888888) AS CURR_PCB,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_PCB = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_PCB                                                                                                    ";
	sql += "   END AS CHART_PCB ,                                                                                                   ";
	sql += " NVL(A.ITEM_DEHP, 888888888) AS CURR_DEHP,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_DEHP = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_DEHP                                                                                                   ";
	sql += "   END AS CHART_DEHP ,                                                                                                  ";
	sql += " NVL(A.ITEM_DIOX, 888888888) AS CURR_DIOX,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_DIOX = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_DIOX                                                                                                   ";
	sql += "   END AS CHART_DIOX ,                                                                                                  ";
	sql += " NVL(A.ITEM_HCHO, 888888888) AS CURR_HCHO,        ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_HCHO = '999999999' THEN 0                                                                              ";
	sql += "     ELSE B.ITEM_HCHO                                                                                                   ";
	sql += "   END AS CHART_HCHO ,                                                                                                  ";
	sql += " NVL(A.ITEM_HCB, 888888888) AS CURR_HCB,          ";
	sql += "   CASE                                                                                                                 ";
	sql += "     WHEN B.ITEM_HCB = '999999999' THEN 0                                                                               ";
	sql += "     ELSE B.ITEM_HCB                                                                                                    ";
	sql += "   END AS CHART_HCB                                                                                                     ";
	sql += "   FROM (                                                                                                               ";
	sql += "         SELECT RANK() OVER(PARTITION BY A.PT_NO||SUBSTR(C.WMWK, -1) ORDER BY A.PT_NO, C.WMCYMD DESC, C.WMWK DESC) RN /* 순번 */,   ";
	sql += "                A.PT_NO||SUBSTR(C.WMWK, -1) AS PT_NO /* 지점코드 */,																	";
	sql += "                A.PT_NM /* 지점명 */,                                                                 ";
	sql += "                C.WMCYMD /* 측정일자 */,                                                              ";
	sql += "                B.WMYR /* 년 */,                                                                      ";
	sql += "                B.WMOD /* 월 */,                                                                      ";
	sql += "                CASE                                                                                  ";
	sql += "                  WHEN LENGTH(C.WMWK) = '2' THEN                                                      ";
	sql += "                  CASE                                                                                ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '1' THEN SUBSTR(C.WMWK, 1, 1)||'회차 상층부'            ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '2' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중상층부'          ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '3' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중층부'            ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '4' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중하층부'          ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '5' THEN SUBSTR(C.WMWK, 1, 1)||'회차 하층부'            ";
	sql += "                  END                                                                                 ";
	sql += "                  ELSE C.WMWK                                                                         ";
	sql += "                END AS WMWK /* 회차 -수정-*/,                                                         ";
	sql += "                C.WMDEP /*수심 -추가-*/,                                                              ";
	sql += "                B.ITEM_AMNT /* 유량 */,                                                               ";
	sql += "                B.ITEM_BOD /* BOD */,                                                                 ";
	sql += "                B.ITEM_DOC /* DO */,                                                                  ";
	sql += "                B.ITEM_COD /* COD */,                                                                 ";
	sql += "                B.ITEM_EC /* EC */,                                                                   ";
	sql += "                B.ITEM_TN /* T-N */,                                                                  ";
	sql += "                B.ITEM_DTN /* DTN */,                                                                 ";
	sql += "                B.ITEM_NO3N /* NO3N */,                                                               ";
	sql += "                B.ITEM_NH3N /* NH3N */,                                                               ";
	sql += "                B.ITEM_TP /* T-P */,                                                                  ";
	sql += "                B.ITEM_TEMP /* 수온 */,                                                               ";
	sql += "                B.ITEM_PH /* PH */,                                                                   ";
	sql += "                B.ITEM_SS /* SS */,                                                                   ";
	sql += "                B.ITEM_DTP /* DTP */,                                                                 ";
	sql += "                B.ITEM_POP /* POP */,                                                                 ";
	sql += "                B.ITEM_CLOA /* 클로로필A */,                                                          ";
	sql += "                B.ITEM_TOC /* TOC - 추가 - */,                                                        ";
	sql += "                B.ITEM_TRANS /* 투명도 */,                                                            ";
	sql += "                B.ITEM_ALGOL /* 조류 */,                                                              ";
	sql += "                B.ITEM_TCOLI /* 총대장균군수 */,                                                      ";
	sql += "                B.ITEM_ECOLI /* 분원성대장균군수 */,                                                  ";
	sql += "                B.ITEM_ANTIMON /* 안티몬 */,                                                          ";
	sql += "                B.ITEM_PHENOL /* PHENOL */,                                                           ";
	sql += "                B.ITEM_COL /* 색도 */,                                                                ";
	sql += "                B.ITEM_NHEX /* N.H */,                                                                ";
	sql += "                B.ITEM_MN /* MN */,                                                                   ";
	sql += "                B.ITEM_FE /* FE */,                                                                   ";
	sql += "                B.ITEM_CD /* CD */,                                                                   ";
	sql += "                B.ITEM_CN /* CN */,                                                                   ";
	sql += "                B.ITEM_PB /* PB */,                                                                   ";
	sql += "                B.ITEM_CR6 /* CR6 */,                                                                 ";
	sql += "                B.ITEM_CR /* CR */,                                                                   ";
	sql += "                B.ITEM_AS /* AS */,                                                                   ";
	sql += "                B.ITEM_HG /* HG */,                                                                   ";
	sql += "                B.ITEM_CU /* CU */,                                                                   ";
	sql += "                B.ITEM_ZN /* ZN */,                                                                   ";
	sql += "                B.ITEM_FL /* F */,                                                                    ";
	sql += "                B.ITEM_ABS /* ABS */,                                                                 ";
	sql += "                B.ITEM_CL /* CL */,                                                                   ";
	sql += "                B.ITEM_TCE /* TCE */,                                                                 ";
	sql += "                B.ITEM_PCE /* PCE */,                                                                 ";
	sql += "                B.ITEM_CCL4 /* 사염화탄소 */,                                                         ";
	sql += "                B.ITEM_DCETH /* 1.2디클로로에탄 */,                                                   ";
	sql += "                B.ITEM_DCM /* 디클로로메탄 */,                                                        ";
	sql += "                B.ITEM_BENZENE /* 벤젠 */,                                                            ";
	sql += "                B.ITEM_CHCL3 /* 클로로포름 */,                                                        ";
	sql += "                B.ITEM_OP /* 유기인 */,                                                               ";
	sql += "                B.ITEM_PCB /* PCB */,                                                                 ";
	sql += "                B.ITEM_DEHP /* DEHP */,                                                               ";
	sql += "                B.ITEM_DIOX /* 1,4-다이옥세인 - 추가 -*/,                                             ";
	sql += "                B.ITEM_HCHO /* 포름알데히드 */,                                                       ";
	sql += "                B.ITEM_HCB /* HCB */,                                                                 ";
	sql += "                A.ADMCODE /* 법정동코드 */                                                            ";
	sql += "         FROM   RWMPT A ,                                                                             ";
	sql += "                RWMDTI_NEW B ,                                                                            ";
	sql += "                RWMDTD C                                                                              ";
	sql += "         WHERE  A.PT_NO = B.PT_NO                                                                     ";
	sql += "         AND    A.PT_NO = C.PT_NO                                                                     ";
	sql += "         AND    B.WMYR = C.WMYR                                                                       ";
	sql += "         AND    B.WMOD = C.WMOD                                                                       ";
	sql += "         AND    B.WMWK = C.WMWK                                                                       ";
	sql += "         AND    B.WMYR || B.WMOD >= '"+startYYYYMM+"'                                                          ";
	sql += "         AND    B.WMYR || B.WMOD <= '"+endYYYYMM+"'                                                          ";
	sql += "         AND    SUBSTR(A.PT_NO, 1, 7) IN ("+siteIds+")                                                  ";
	sql += "         AND    C.WMCYMD IS NOT NULL                                                                  ";
	sql += "        ) A                                                                                           ";
	sql += "      , (                                                                                             ";
	sql += "         SELECT RANK() OVER(PARTITION BY A.PT_NO||SUBSTR(C.WMWK, -1) ORDER BY A.PT_NO, C.WMCYMD DESC, C.WMWK DESC) RN /* 순번 */,  ";
	sql += "                A.PT_NO||SUBSTR(C.WMWK, -1) AS PT_NO /* 지점코드 */,															";
	sql += "                A.PT_NM /* 지점명 */,                                                             ";
	sql += "                C.WMCYMD /* 측정일자 */,                                                          ";
	sql += "                B.WMYR /* 년 */,                                                                  ";
	sql += "                B.WMOD /* 월 */,                                                                  ";
	sql += "                CASE                                                                              ";
	sql += "                  WHEN LENGTH(C.WMWK) = '2' THEN                                                  ";
	sql += "                  CASE                                                                            ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '1' THEN SUBSTR(C.WMWK, 1, 1)||'회차 상층부'        ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '2' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중상층부'      ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '3' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중층부'        ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '4' THEN SUBSTR(C.WMWK, 1, 1)||'회차 중하층부'      ";
	sql += "                    WHEN SUBSTR(C.WMWK, -1) = '5' THEN SUBSTR(C.WMWK, 1, 1)||'회차 하층부'        ";
	sql += "                  END                                                                             ";
	sql += "                  ELSE C.WMWK                                                                     ";
	sql += "                END AS WMWK /* 회차 -수정-*/,                                                     ";
	sql += "                C.WMDEP /*수심 -추가-*/,                                                          ";
	sql += "                B.ITEM_AMNT /* 유량 */,                                                           ";
	sql += "                B.ITEM_BOD /* BOD */,                                                             ";
	sql += "                B.ITEM_DOC /* DO */,                                                              ";
	sql += "                B.ITEM_COD /* COD */,                                                             ";
	sql += "                B.ITEM_EC /* EC */,                                                               ";
	sql += "                B.ITEM_TN /* T-N */,                                                              ";
	sql += "                B.ITEM_DTN /* DTN */,                                                             ";
	sql += "                B.ITEM_NO3N /* NO3N */,                                                           ";
	sql += "                B.ITEM_NH3N /* NH3N */,                                                           ";
	sql += "                B.ITEM_TP /* T-P */,                                                              ";
	sql += "                B.ITEM_TEMP /* 수온 */,                                                           ";
	sql += "                B.ITEM_PH /* PH */,                                                               ";
	sql += "                B.ITEM_SS /* SS */,                                                               ";
	sql += "                B.ITEM_DTP /* DTP */,                                                             ";
	sql += "                B.ITEM_POP /* POP */,                                                             ";
	sql += "                B.ITEM_CLOA /* 클로로필A */,                                                      ";
	sql += "                B.ITEM_TOC /* TOC - 추가 - */,                                                    ";
	sql += "                B.ITEM_TRANS /* 투명도 */,                                                        ";
	sql += "                B.ITEM_ALGOL /* 조류 */,                                                          ";
	sql += "                B.ITEM_TCOLI /* 총대장균군수 */,                                                  ";
	sql += "                B.ITEM_ECOLI /* 분원성대장균군수 */,                                              ";
	sql += "                B.ITEM_ANTIMON /* 안티몬 */,                                                      ";
	sql += "                B.ITEM_PHENOL /* PHENOL */,                                                       ";
	sql += "                B.ITEM_COL /* 색도 */,                                                            ";
	sql += "                B.ITEM_NHEX /* N.H */,                                                            ";
	sql += "                B.ITEM_MN /* MN */,                                                               ";
	sql += "                B.ITEM_FE /* FE */,                                                               ";
	sql += "                B.ITEM_CD /* CD */,                                                               ";
	sql += "                B.ITEM_CN /* CN */,                                                               ";
	sql += "                B.ITEM_PB /* PB */,                                                               ";
	sql += "                B.ITEM_CR6 /* CR6 */,                                                             ";
	sql += "                B.ITEM_CR /* CR */,                                                               ";
	sql += "                B.ITEM_AS /* AS */,                                                               ";
	sql += "                B.ITEM_HG /* HG */,                                                               ";
	sql += "                B.ITEM_CU /* CU */,                                                               ";
	sql += "                B.ITEM_ZN /* ZN */,                                                               ";
	sql += "                B.ITEM_FL /* F */,                                                                ";
	sql += "                B.ITEM_ABS /* ABS */,                                                             ";
	sql += "                B.ITEM_CL /* CL */,                                                               ";
	sql += "                B.ITEM_TCE /* TCE */,                                                             ";
	sql += "                B.ITEM_PCE /* PCE */,                                                             ";
	sql += "                B.ITEM_CCL4 /* 사염화탄소 */,                                                     ";
	sql += "                B.ITEM_DCETH /* 1.2디클로로에탄 */,                                               ";
	sql += "                B.ITEM_DCM /* 디클로로메탄 */,                                                    ";
	sql += "                B.ITEM_BENZENE /* 벤젠 */,                                                        ";
	sql += "                B.ITEM_CHCL3 /* 클로로포름 */,                                                    ";
	sql += "                B.ITEM_OP /* 유기인 */,                                                           ";
	sql += "                B.ITEM_PCB /* PCB */,                                                             ";
	sql += "                B.ITEM_DEHP /* DEHP */,                                                           ";
	sql += "                B.ITEM_DIOX /* 1,4-다이옥세인 - 추가 -*/,                                         ";
	sql += "                B.ITEM_HCHO /* 포름알데히드 */,                                                   ";
	sql += "                B.ITEM_HCB /* HCB */,                                                             ";
	sql += "                A.ADMCODE /* 법정동코드 */                                                        ";
	sql += "         FROM   RWMPT A ,                                                                         ";
	sql += "                RWMDTI_NEW B ,                                                                        ";
	sql += "                RWMDTD C                                                                          ";
	sql += "         WHERE  A.PT_NO = B.PT_NO                                                                 ";
	sql += "         AND    A.PT_NO = C.PT_NO                                                                 ";
	sql += "         AND    B.WMYR = C.WMYR                                                                   ";
	sql += "         AND    B.WMOD = C.WMOD                                                                   ";
	sql += "         AND    B.WMWK = C.WMWK                                                                   ";
	sql += "         AND    B.WMYR || B.WMOD >= TO_CHAR(TO_DATE('"+startYYYYMM+"' ,'YYYYMM')-360,'YYYYMM')             ";
	sql += "         AND    B.WMYR || B.WMOD <= '"+endYYYYMM+"'                                                      ";
	sql += "         AND    SUBSTR(A.PT_NO, 1, 7) IN ("+siteIds+")                                              ";
	sql += "         AND    C.WMCYMD IS NOT NULL                                                              ";
	sql += "        ) B                                                                                       ";
	sql += "     , KESTI_WATER_ALL_MAP C                                                                      ";
	sql += " WHERE A.PT_NO = B.PT_NO                                                                          ";
	sql += "   AND A.ADMCODE = B.ADMCODE                                                                      ";
	sql += "   AND B.RN BETWEEN A.RN AND A.RN + 8                                                             ";
	sql += "   AND SUBSTR(A.ADMCODE, 1, 10) = C.ADM_CD(+)     ";
	sql += "			) ORDER BY PT_NO, RN, RN_2 DESC                ";
	}else{
		sql = "	SELECT '99999' AS RN , max(wmyr||'.'||wmod) as WMCYMD  FROM RWMDTI_NEW WHERE PT_NO IN ("+siteIds+")	";
	}
   //out.print(sql);
   
   //System.out.println(sql);
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	String preSeq = "";
	String preSeq2 = "99999";
	String check = "";
	
	
	String PT_NO = "";
	String PT_NM = "";
	String WMCYMD = "";
	String WMYR = "";
	String WMOD = "";
	String WMWK = "";
	String WMDEP = "";
	String CURR_BOD = "";
	JSONArray CHART_BOD = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	String CURR_DO = "";
	JSONArray CHART_DO = new JSONArray();
	String CURR_COD = "";
	JSONArray CHART_COD = new JSONArray();
	String CURR_TN = "";
	JSONArray CHART_TN = new JSONArray();
	String CURR_TP = "";
	JSONArray CHART_TP = new JSONArray();
	String CURR_TEMP = "";
	JSONArray CHART_TEMP = new JSONArray();
	String CURR_PH = "";
	JSONArray CHART_PH = new JSONArray();
	String CURR_SS = "";
	String CURR_SS_NEW = "";
	JSONArray CHART_SS = new JSONArray();
	String CURR_CLOA = "";
	JSONArray CHART_CLOA = new JSONArray();
	String CURR_TOC = "";
	JSONArray CHART_TOC = new JSONArray();
	
	String 	CURR_AMNT	 = "";
	String 	CURR_DTN	 = "";
	String 	CURR_NO3N	 = "";
	String 	CURR_NH3N	 = "";
	String 	CURR_DTP	 = "";
	String 	CURR_POP	 = "";
	String 	CURR_TRANS	 = "";
	String 	CURR_ALGOL	 = "";
	String 	CURR_TCOLI	 = "";
	String 	CURR_ECOLI	 = "";
	String 	CURR_ANTIMON	 = "";
	String 	CURR_PHENOL	 = "";
	String 	CURR_COL	 = "";
	String 	CURR_NHEX	 = "";
	String 	CURR_MN	 = "";
	String 	CURR_FE	 = "";
	String 	CURR_CD	 = "";
	String 	CURR_CN	 = "";
	String 	CURR_PB	 = "";
	String 	CURR_CR6	 = "";
	String 	CURR_CR	 = "";
	String 	CURR_AS	 = "";
	String 	CURR_HG	 = "";
	String 	CURR_CU	 = "";
	String 	CURR_ZN	 = "";
	String 	CURR_FL	 = "";
	String 	CURR_ABS	 = "";
	String 	CURR_CL	 = "";
	String 	CURR_TCE	 = "";
	String 	CURR_PCE	 = "";
	String 	CURR_CCL4	 = "";
	String 	CURR_DCETH	 = "";
	String 	CURR_DCM	 = "";
	String 	CURR_BENZENE	 = "";
	String 	CURR_CHCL3	 = "";
	String 	CURR_OP	 = "";
	String 	CURR_PCB	 = "";
	String 	CURR_DEHP	 = "";
	String 	CURR_DIOX	 = "";
	String 	CURR_HCHO	 = "";
	String 	CURR_HCB	 = "";

	JSONArray 	CHART_AMNT	 = new JSONArray();
	JSONArray 	CHART_DTN	 = new JSONArray();
	JSONArray 	CHART_NO3N	 = new JSONArray();
	JSONArray 	CHART_NH3N	 = new JSONArray();
	JSONArray 	CHART_DTP	 = new JSONArray();
	JSONArray 	CHART_POP	 = new JSONArray();
	JSONArray 	CHART_TRANS	 = new JSONArray();
	JSONArray 	CHART_ALGOL	 = new JSONArray();
	JSONArray 	CHART_TCOLI	 = new JSONArray();
	JSONArray 	CHART_ECOLI	 = new JSONArray();
	JSONArray 	CHART_ANTIMON	 = new JSONArray();
	JSONArray 	CHART_PHENOL	 = new JSONArray();
	JSONArray 	CHART_COL	 = new JSONArray();
	JSONArray 	CHART_NHEX	 = new JSONArray();
	JSONArray 	CHART_MN	 = new JSONArray();
	JSONArray 	CHART_FE	 = new JSONArray();
	JSONArray 	CHART_CD	 = new JSONArray();
	JSONArray 	CHART_CN	 = new JSONArray();
	JSONArray 	CHART_PB	 = new JSONArray();
	JSONArray 	CHART_CR6	 = new JSONArray();
	JSONArray 	CHART_CR	 = new JSONArray();
	JSONArray 	CHART_AS	 = new JSONArray();
	JSONArray 	CHART_HG	 = new JSONArray();
	JSONArray 	CHART_CU	 = new JSONArray();
	JSONArray 	CHART_ZN	 = new JSONArray();
	JSONArray 	CHART_FL	 = new JSONArray();
	JSONArray 	CHART_ABS	 = new JSONArray();
	JSONArray 	CHART_CL	 = new JSONArray();
	JSONArray 	CHART_TCE	 = new JSONArray();
	JSONArray 	CHART_PCE	 = new JSONArray();
	JSONArray 	CHART_CCL4	 = new JSONArray();
	JSONArray 	CHART_DCETH	 = new JSONArray();
	JSONArray 	CHART_DCM	 = new JSONArray();
	JSONArray 	CHART_BENZENE	 = new JSONArray();
	JSONArray 	CHART_CHCL3	 = new JSONArray();
	JSONArray 	CHART_OP	 = new JSONArray();
	JSONArray 	CHART_PCB	 = new JSONArray();
	JSONArray 	CHART_DEHP	 = new JSONArray(); //
	JSONArray 	CHART_DIOX	 = new JSONArray();
	JSONArray 	CHART_HCHO	 = new JSONArray();
	JSONArray 	CHART_HCB	 = new JSONArray();
	
	int cnt = 0;
	
	
	while(rs.next()) {
		
		if(!preSeq2.equals(rs.getString("RN"))){
			cnt++;
			
			if((!preSeq.equals("") && !preSeq.equals(rs.getString("RN")))
					|| (!PT_NO.equals("") && !PT_NO.equals(rs.getString("PT_NO")))){
				
				
				cnt = 1;
				
				jsonRecord = new JSONObject();
			
				jsonRecord.put("PT_NO", PT_NO);
		  		jsonRecord.put("PT_NM", PT_NM);
		  		jsonRecord.put("WMCYMD", WMCYMD);
		  		jsonRecord.put("WMYR", WMYR);
		  		jsonRecord.put("WMOD", WMOD);
		  		jsonRecord.put("WMWK", WMWK);
		  		jsonRecord.put("WMDEP", WMDEP);
		  		jsonRecord.put("CURR_BOD", CURR_BOD);
		 		jsonRecord.put("CHART_BOD", CHART_BOD);
		  		jsonRecord.put("CURR_DO", CURR_DO);
		  		jsonRecord.put("CHART_DO", CHART_DO);
		  		jsonRecord.put("CURR_COD", CURR_COD);
		  		jsonRecord.put("CHART_COD", CHART_COD);
		  		jsonRecord.put("CURR_TN", CURR_TN);
		  		jsonRecord.put("CHART_TN", CHART_TN);
		  		jsonRecord.put("CURR_TP", CURR_TP);
		  		jsonRecord.put("CHART_TP", CHART_TP);
		  		jsonRecord.put("CURR_TEMP", CURR_TEMP);
		  		jsonRecord.put("CHART_TEMP", CHART_TEMP);
		  		jsonRecord.put("CURR_PH", CURR_PH);
		  		jsonRecord.put("CHART_PH", CHART_PH); 
		  		jsonRecord.put("CURR_SS", CURR_SS);
		  		jsonRecord.put("CURR_SS_NEW", CURR_SS_NEW);
		  		jsonRecord.put("CHART_SS", CHART_SS);
		  		jsonRecord.put("CURR_CLOA", CURR_CLOA);
		  		jsonRecord.put("CHART_CLOA", CHART_CLOA);
		  		jsonRecord.put("CURR_TOC", CURR_TOC);
		  		jsonRecord.put("CHART_TOC", CHART_TOC);
		  		
		  		jsonRecord.put("CURR_AMNT",CURR_AMNT);
		  		jsonRecord.put("CURR_DTN",CURR_DTN);
		  		jsonRecord.put("CURR_NO3N",CURR_NO3N);
		  		jsonRecord.put("CURR_NH3N",CURR_NH3N);
		  		jsonRecord.put("CURR_DTP",CURR_DTP);
		  		jsonRecord.put("CURR_POP",CURR_POP);
		  		jsonRecord.put("CURR_TRANS",CURR_TRANS);
		  		jsonRecord.put("CURR_ALGOL",CURR_ALGOL);
		  		jsonRecord.put("CURR_TCOLI",CURR_TCOLI);
		  		jsonRecord.put("CURR_ECOLI",CURR_ECOLI);
		  		jsonRecord.put("CURR_ANTIMON",CURR_ANTIMON);
		  		jsonRecord.put("CURR_PHENOL",CURR_PHENOL);
		  		jsonRecord.put("CURR_COL",CURR_COL);
		  		jsonRecord.put("CURR_NHEX",CURR_NHEX);
		  		jsonRecord.put("CURR_MN",CURR_MN);
		  		jsonRecord.put("CURR_FE",CURR_FE);
		  		jsonRecord.put("CURR_CD",CURR_CD);
		  		jsonRecord.put("CURR_CN",CURR_CN);
		  		jsonRecord.put("CURR_PB",CURR_PB);
		  		jsonRecord.put("CURR_CR6",CURR_CR6);
		  		jsonRecord.put("CURR_CR",CURR_CR);
		  		jsonRecord.put("CURR_AS",CURR_AS);
		  		jsonRecord.put("CURR_HG",CURR_HG);
		  		jsonRecord.put("CURR_CU",CURR_CU);
		  		jsonRecord.put("CURR_ZN",CURR_ZN);
		  		jsonRecord.put("CURR_FL",CURR_FL);
		  		jsonRecord.put("CURR_ABS",CURR_ABS);
		  		jsonRecord.put("CURR_CL",CURR_CL);
		  		jsonRecord.put("CURR_TCE",CURR_TCE);
		  		jsonRecord.put("CURR_PCE",CURR_PCE);
		  		jsonRecord.put("CURR_CCL4",CURR_CCL4);
		  		jsonRecord.put("CURR_DCETH",CURR_DCETH);
		  		jsonRecord.put("CURR_DCM",CURR_DCM);
		  		jsonRecord.put("CURR_BENZENE",CURR_BENZENE);
		  		jsonRecord.put("CURR_CHCL3",CURR_CHCL3);
		  		jsonRecord.put("CURR_OP",CURR_OP);
		  		jsonRecord.put("CURR_PCB",CURR_PCB);
		  		jsonRecord.put("CURR_DEHP",CURR_DEHP);
		  		jsonRecord.put("CURR_DIOX",CURR_DIOX);
		  		jsonRecord.put("CURR_HCHO",CURR_HCHO);
		  		jsonRecord.put("CURR_HCB",CURR_HCB);
		  		jsonRecord.put("CHART_AMNT",CHART_AMNT);
		  		jsonRecord.put("CHART_DTN",CHART_DTN);
		  		jsonRecord.put("CHART_NO3N",CHART_NO3N);
		  		jsonRecord.put("CHART_NH3N",CHART_NH3N);
		  		jsonRecord.put("CHART_DTP",CHART_DTP);
		  		jsonRecord.put("CHART_POP",CHART_POP);
		  		jsonRecord.put("CHART_TRANS",CHART_TRANS);
		  		jsonRecord.put("CHART_ALGOL",CHART_ALGOL);
		  		jsonRecord.put("CHART_TCOLI",CHART_TCOLI);
		  		jsonRecord.put("CHART_ECOLI",CHART_ECOLI);
		  		jsonRecord.put("CHART_ANTIMON",CHART_ANTIMON);
		  		jsonRecord.put("CHART_PHENOL",CHART_PHENOL);
		  		jsonRecord.put("CHART_COL",CHART_COL);
		  		jsonRecord.put("CHART_NHEX",CHART_NHEX);
		  		jsonRecord.put("CHART_MN",CHART_MN);
		  		jsonRecord.put("CHART_FE",CHART_FE);
		  		jsonRecord.put("CHART_CD",CHART_CD);
		  		jsonRecord.put("CHART_CN",CHART_CN);
		  		jsonRecord.put("CHART_PB",CHART_PB);
		  		jsonRecord.put("CHART_CR6",CHART_CR6);
		  		jsonRecord.put("CHART_CR",CHART_CR);
		  		jsonRecord.put("CHART_AS",CHART_AS);
		  		jsonRecord.put("CHART_HG",CHART_HG);
		  		jsonRecord.put("CHART_CU",CHART_CU);
		  		jsonRecord.put("CHART_ZN",CHART_ZN);
		  		jsonRecord.put("CHART_FL",CHART_FL);
		  		jsonRecord.put("CHART_ABS",CHART_ABS);
		  		jsonRecord.put("CHART_CL",CHART_CL);
		  		jsonRecord.put("CHART_TCE",CHART_TCE);
		  		jsonRecord.put("CHART_PCE",CHART_PCE);
		  		jsonRecord.put("CHART_CCL4",CHART_CCL4);
		  		jsonRecord.put("CHART_DCETH",CHART_DCETH);
		  		jsonRecord.put("CHART_DCM",CHART_DCM);
		  		jsonRecord.put("CHART_BENZENE",CHART_BENZENE);
		  		jsonRecord.put("CHART_CHCL3",CHART_CHCL3);
		  		jsonRecord.put("CHART_OP",CHART_OP);
		  		jsonRecord.put("CHART_PCB",CHART_PCB);
		  		jsonRecord.put("CHART_DEHP",CHART_DEHP);
		  		jsonRecord.put("CHART_DIOX",CHART_DIOX);
		  		jsonRecord.put("CHART_HCHO",CHART_HCHO);
		  		jsonRecord.put("CHART_HCB",CHART_HCB);
		  		//System.out.println("CHART_BOD ||"+CHART_BOD);
		  		jsonArr.add(jsonRecord);
		  		
		  		CHART_BOD = new JSONArray();
		  		CHART_DO = new JSONArray();
		  		CHART_COD = new JSONArray();
		  		CHART_TN = new JSONArray();
		  		CHART_TP = new JSONArray();
		  		CHART_TEMP = new JSONArray();
		  		CHART_PH = new JSONArray();
		  		CHART_SS = new JSONArray();
		  		CHART_CLOA = new JSONArray();
		  		CHART_TOC = new JSONArray();
		  		
			  	CHART_AMNT	 = new JSONArray();
			  	CHART_DTN	 = new JSONArray();
			  	CHART_NO3N	 = new JSONArray();
			  	CHART_NH3N	 = new JSONArray();
			  	CHART_DTP	 = new JSONArray();
			  	CHART_POP	 = new JSONArray();
			  	CHART_TRANS	 = new JSONArray();
			  	CHART_ALGOL	 = new JSONArray();
			  	CHART_TCOLI	 = new JSONArray();
			  	CHART_ECOLI	 = new JSONArray();
			  	CHART_ANTIMON	 = new JSONArray();
			  	CHART_PHENOL	 = new JSONArray();
			  	CHART_COL	 = new JSONArray();
			  	CHART_NHEX	 = new JSONArray();
			  	CHART_MN	 = new JSONArray();
			  	CHART_FE	 = new JSONArray();
			  	CHART_CD	 = new JSONArray();
			  	CHART_CN	 = new JSONArray();
			  	CHART_PB	 = new JSONArray();
			  	CHART_CR6	 = new JSONArray();
			  	CHART_CR	 = new JSONArray();
			  	CHART_AS	 = new JSONArray();
			  	CHART_HG	 = new JSONArray();
			  	CHART_CU	 = new JSONArray();
			  	CHART_ZN	 = new JSONArray();
			  	CHART_FL	 = new JSONArray();
			  	CHART_ABS	 = new JSONArray();
			  	CHART_CL	 = new JSONArray();
			  	CHART_TCE	 = new JSONArray();
			  	CHART_PCE	 = new JSONArray();
			  	CHART_CCL4	 = new JSONArray();
			  	CHART_DCETH	 = new JSONArray();
			  	CHART_DCM	 = new JSONArray();
			  	CHART_BENZENE	 = new JSONArray();
			  	CHART_CHCL3	 = new JSONArray();
			  	CHART_OP	 = new JSONArray();
			  	CHART_PCB	 = new JSONArray();
			  	CHART_DEHP	 = new JSONArray();
			  	CHART_DIOX	 = new JSONArray();
			  	CHART_HCHO	 = new JSONArray();
			  	CHART_HCB	 = new JSONArray();
			}
			
			//System.out.print("count : " + cnt);

			PT_NO = rs.getString("PT_NO");
			PT_NM = rs.getString("PT_NM");
			WMCYMD = rs.getString("WMCYMD");
			WMYR = rs.getString("WMYR");
			WMOD = rs.getString("WMOD");
			WMWK = rs.getString("WMWK");
			WMDEP = rs.getString("WMDEP");
			
			
			
			CURR_BOD = rs.getString("CURR_BOD");
			Chart_Data_tmp = new JSONArray();
			
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_BOD"));
			if(rs.getString("CHART_BOD") != null){
				CHART_BOD.add(Chart_Data_tmp);	
			}
			
			CURR_DO = rs.getString("CURR_DO");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DO"));
			if(rs.getString("CHART_DO") != null){
				CHART_DO.add(Chart_Data_tmp);	
			}
	  		
	  		
	  		CURR_COD = rs.getString("CURR_COD");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_COD"));
			if(rs.getString("CHART_COD") != null){
				CHART_COD.add(Chart_Data_tmp);	
			}
	  		//CHART_COD.add(Chart_Data_tmp);
	  		//CHART_COD.add(rs.getString("CHART_COD"));
	  		
	  		CURR_TN = rs.getString("CURR_TN");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TN"));
			if(rs.getString("CHART_TN") != null){
				CHART_TN.add(Chart_Data_tmp);	
			}
	  		//CHART_TN.add(Chart_Data_tmp);
	  		//CHART_TN.add(rs.getString("CHART_TN"));
	  		
	  		CURR_TP = rs.getString("CURR_TP");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TP"));
			if(rs.getString("CHART_TP") != null){
				CHART_TP.add(Chart_Data_tmp);	
			}
	  		//CHART_TP.add(Chart_Data_tmp);
	  		//CHART_TP.add(rs.getString("CHART_TP"));
	  		
	  		CURR_TEMP = rs.getString("CURR_TEMP");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TEMP"));
			if(rs.getString("CHART_TEMP") != null){
				CHART_TEMP.add(Chart_Data_tmp);	
			}
	  		//CHART_TEMP.add(Chart_Data_tmp);
	  		//CHART_TEMP.add(rs.getString("CHART_TEMP"));
	  		
	  		CURR_PH = rs.getString("CURR_PH");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PH"));
			if(rs.getString("CHART_PH") != null){
				CHART_PH.add(Chart_Data_tmp);	
			}
	  		//CHART_PH.add(Chart_Data_tmp);
	  		//CHART_PH.add(rs.getString("CHART_PH")); 
	  		
	  		CURR_SS = rs.getString("CURR_SS");
	  		CURR_SS_NEW = rs.getString("CURR_SS_NEW");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_SS"));
			if(rs.getString("CHART_SS") != null){
				CHART_SS.add(Chart_Data_tmp);	
			}
	  		//CHART_SS.add(Chart_Data_tmp);
	  		//CHART_SS.add(rs.getString("CHART_SS"));
	  		
	  		CURR_CLOA = rs.getString("CURR_CLOA");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CLOA"));
			if(rs.getString("CHART_CLOA") != null){
				CHART_CLOA.add(Chart_Data_tmp);	
			}
	  		//CHART_CLOA.add(Chart_Data_tmp);
	  		
	  		CURR_TOC = rs.getString("CURR_TOC");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TOC"));
			if(rs.getString("CHART_TOC") != null){
				CHART_TOC.add(Chart_Data_tmp);	
			}
	  		//CHART_TOC.add(Chart_Data_tmp);
	  		//CHART_CLOA.add(rs.getString("CHART_CLOA"));
	  		
	  		
	  		
	  		CURR_AMNT = rs.getString("CURR_AMNT");
	  		Chart_Data_tmp = new JSONArray();
	  		Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_AMNT"));
			if(rs.getString("CHART_AMNT") != null){
				CHART_AMNT.add(Chart_Data_tmp);	
			}
			//CHART_AMNT.add(Chart_Data_tmp);

	  		CURR_DTN = rs.getString("CURR_DTN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DTN"));
			if(rs.getString("CHART_DTN") != null){
				CHART_DTN.add(Chart_Data_tmp);	
			}
			//CHART_DTN.add(Chart_Data_tmp);
			
			CURR_NO3N = rs.getString("CURR_NO3N");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_NO3N"));
			if(rs.getString("CHART_NO3N") != null){
				CHART_NO3N.add(Chart_Data_tmp);	
			}
			//CHART_NO3N.add(Chart_Data_tmp);
			
			CURR_NH3N = rs.getString("CURR_NH3N");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_NH3N"));
			if(rs.getString("CHART_NH3N") != null){
				CHART_NH3N.add(Chart_Data_tmp);	
			}
			//CHART_NH3N.add(Chart_Data_tmp);
			
			CURR_DTP = rs.getString("CURR_DTP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DTP"));
			if(rs.getString("CHART_DTP") != null){
				CHART_DTP.add(Chart_Data_tmp);	
			}
			//CHART_DTP.add(Chart_Data_tmp);
			
			CURR_POP = rs.getString("CURR_POP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_POP"));
			if(rs.getString("CHART_POP") != null){
				CHART_POP.add(Chart_Data_tmp);	
			}
			//CHART_POP.add(Chart_Data_tmp);
			
			CURR_TRANS = rs.getString("CURR_TRANS");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TRANS"));
			if(rs.getString("CHART_TRANS") != null){
				CHART_TRANS.add(Chart_Data_tmp);	
			}
			//CHART_TRANS.add(Chart_Data_tmp);
			
			CURR_ALGOL = rs.getString("CURR_ALGOL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ALGOL"));
			if(rs.getString("CHART_ALGOL") != null){
				CHART_ALGOL.add(Chart_Data_tmp);	
			}
			//CHART_ALGOL.add(Chart_Data_tmp);
			
			CURR_TCOLI = rs.getString("CURR_TCOLI");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TCOLI"));
			if(rs.getString("CHART_TCOLI") != null){
				CHART_TCOLI.add(Chart_Data_tmp);	
			}
			//CHART_TCOLI.add(Chart_Data_tmp);
			
			CURR_ECOLI = rs.getString("CURR_ECOLI");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ECOLI"));
			if(rs.getString("CHART_ECOLI") != null){
				CHART_ECOLI.add(Chart_Data_tmp);	
			}
			//CHART_ECOLI.add(Chart_Data_tmp);
			
			CURR_ANTIMON = rs.getString("CURR_ANTIMON");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ANTIMON"));
			if(rs.getString("CHART_ANTIMON") != null){
				CHART_ANTIMON.add(Chart_Data_tmp);	
			}
			//CHART_ANTIMON.add(Chart_Data_tmp);
			
			CURR_PHENOL = rs.getString("CURR_PHENOL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PHENOL"));
			if(rs.getString("CHART_PHENOL") != null){
				CHART_PHENOL.add(Chart_Data_tmp);	
			}
			//CHART_PHENOL.add(Chart_Data_tmp);
			
			CURR_COL = rs.getString("CURR_COL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_COL"));
			if(rs.getString("CHART_COL") != null){
				CHART_COL.add(Chart_Data_tmp);	
			}
			//CHART_COL.add(Chart_Data_tmp);
			
			CURR_NHEX = rs.getString("CURR_NHEX");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_NHEX"));
			if(rs.getString("CHART_NHEX") != null){
				CHART_NHEX.add(Chart_Data_tmp);	
			}
			//CHART_NHEX.add(Chart_Data_tmp);
			
			CURR_MN = rs.getString("CURR_MN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_MN"));
			if(rs.getString("CHART_MN") != null){
				CHART_MN.add(Chart_Data_tmp);	
			}
			//CHART_MN.add(Chart_Data_tmp);
			
			CURR_FE = rs.getString("CURR_FE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_FE"));
			if(rs.getString("CHART_FE") != null){
				CHART_FE.add(Chart_Data_tmp);	
			}
			
			//CHART_DTP.add(Chart_Data_tmp);
			CURR_CD = rs.getString("CURR_CD");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CD"));
			if(rs.getString("CHART_CD") != null){
				CHART_CD.add(Chart_Data_tmp);	
			}
			//CHART_CD.add(Chart_Data_tmp);
			
			CURR_CN = rs.getString("CURR_CN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CN"));
			if(rs.getString("CHART_CN") != null){
				CHART_CN.add(Chart_Data_tmp);	
			}
			//CHART_CN.add(Chart_Data_tmp);
			
			CURR_PB = rs.getString("CURR_PB");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PB"));
			if(rs.getString("CHART_PB") != null){
				CHART_PB.add(Chart_Data_tmp);	
			}
			//CHART_PB.add(Chart_Data_tmp);
			
			CURR_CR6 = rs.getString("CURR_CR6");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CR6"));
			if(rs.getString("CHART_CR6") != null){
				CHART_CR6.add(Chart_Data_tmp);	
			}
			//CHART_CR6.add(Chart_Data_tmp);
			
			CURR_CR = rs.getString("CURR_CR");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CR"));
			if(rs.getString("CHART_CR") != null){
				CHART_CR.add(Chart_Data_tmp);	
			}
			//CHART_CR.add(Chart_Data_tmp);
			
			CURR_AS = rs.getString("CURR_AS");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_AS"));
			if(rs.getString("CHART_AS") != null){
				CHART_AS.add(Chart_Data_tmp);	
			}
			//CHART_DTP.add(Chart_Data_tmp);
			
			CURR_HG = rs.getString("CURR_HG");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_HG"));
			if(rs.getString("CHART_HG") != null){
				CHART_HG.add(Chart_Data_tmp);	
			}
			//CHART_HG.add(Chart_Data_tmp);
			
			CURR_CU = rs.getString("CURR_CU");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CU"));
			if(rs.getString("CHART_CU") != null){
				CHART_CU.add(Chart_Data_tmp);	
			}
			//CHART_DTP.add(Chart_Data_tmp);
			
			CURR_ZN = rs.getString("CURR_ZN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ZN"));
			if(rs.getString("CHART_ZN") != null){
				CHART_ZN.add(Chart_Data_tmp);	
			}
			//CHART_ZN.add(Chart_Data_tmp);
			
			CURR_FL = rs.getString("CURR_FL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_FL"));
			if(rs.getString("CHART_FL") != null){
				CHART_FL.add(Chart_Data_tmp);	
			}
			//CHART_FL.add(Chart_Data_tmp);
			
			CURR_ABS = rs.getString("CURR_ABS");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_ABS"));
			if(rs.getString("CHART_ABS") != null){
				CHART_ABS.add(Chart_Data_tmp);	
			}
			//CHART_ABS.add(Chart_Data_tmp);
			
			CURR_CL = rs.getString("CURR_CL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CL"));
			if(rs.getString("CHART_CL") != null){
				CHART_CL.add(Chart_Data_tmp);	
			}
			//CHART_CL.add(Chart_Data_tmp);
			
			CURR_TCE = rs.getString("CURR_TCE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TCE"));
			if(rs.getString("CHART_TCE") != null){
				CHART_TCE.add(Chart_Data_tmp);	
			}
			//CHART_TCE.add(Chart_Data_tmp);
			
			CURR_PCE = rs.getString("CURR_PCE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PCE"));
			if(rs.getString("CHART_PCE") != null){
				CHART_PCE.add(Chart_Data_tmp);	
			}
			//CHART_PCE.add(Chart_Data_tmp);
			
			CURR_CCL4 = rs.getString("CURR_CCL4");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CCL4"));
			if(rs.getString("CHART_CCL4") != null){
				CHART_CCL4.add(Chart_Data_tmp);	
			}
			//CHART_CCL4.add(Chart_Data_tmp);
			
			CURR_DCETH = rs.getString("CURR_DCETH");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DCETH"));
			if(rs.getString("CHART_DCETH") != null){
				CHART_DCETH.add(Chart_Data_tmp);	
			}
			//CHART_DCETH.add(Chart_Data_tmp);
			
			CURR_DCM = rs.getString("CURR_DCM");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DCM"));
			if(rs.getString("CHART_DCM") != null){
				CHART_DCM.add(Chart_Data_tmp);	
			}
			//CHART_DCM.add(Chart_Data_tmp);
			
			CURR_BENZENE = rs.getString("CURR_BENZENE");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_BENZENE"));
			if(rs.getString("CHART_BENZENE") != null){
				CHART_BENZENE.add(Chart_Data_tmp);	
			}
			//CHART_BENZENE.add(Chart_Data_tmp);
			
			CURR_CHCL3 = rs.getString("CURR_CHCL3");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_CHCL3"));
			if(rs.getString("CHART_CHCL3") != null){
				CHART_CHCL3.add(Chart_Data_tmp);	
			}
			//CHART_CHCL3.add(Chart_Data_tmp);
			
			CURR_OP = rs.getString("CURR_OP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_OP"));
			if(rs.getString("CHART_OP") != null){
				CHART_OP.add(Chart_Data_tmp);	
			}
			//CHART_OP.add(Chart_Data_tmp);
			
			CURR_PCB = rs.getString("CURR_PCB");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PCB"));
			if(rs.getString("CHART_PCB") != null){
				CHART_PCB.add(Chart_Data_tmp);	
			}
			//CHART_PCB.add(Chart_Data_tmp);
			
			CURR_DEHP = rs.getString("CURR_DEHP");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DEHP"));
			if(rs.getString("CHART_DEHP") != null){
				CHART_DEHP.add(Chart_Data_tmp);	
			}
			
			CURR_DIOX = rs.getString("CURR_DIOX");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_DIOX"));
			if(rs.getString("CHART_DIOX") != null){
				CHART_DIOX.add(Chart_Data_tmp);	
			}
			//CHART_DEHP.add(Chart_Data_tmp);
			
			CURR_HCHO = rs.getString("CURR_HCHO");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_HCHO"));
			if(rs.getString("CHART_HCHO") != null){
				CHART_HCHO.add(Chart_Data_tmp);	
			}
			//CHART_HCHO.add(Chart_Data_tmp);
			
			CURR_HCB = rs.getString("CURR_HCB");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_HCB"));
			if(rs.getString("CHART_HCB") != null){
				CHART_HCB.add(Chart_Data_tmp);	
			}
			//HART_HCB.add(Chart_Data_tmp);
			
			if(!preSeq.equals(rs.getString("RN")))
				preSeq = rs.getString("RN");
			
		}else{
			check = preSeq2;
			WMCYMD = rs.getString("WMCYMD");
		}
		
  		
	}
	//System.out.print("loop end");
	jsonRecord = new JSONObject();
	//System.out.println("CHART_BOD:::"+CHART_BOD);
	if(cnt > 0){
		//jsonRecord.put("parentId", parentId);
		jsonRecord.put("PT_NO", PT_NO);
		jsonRecord.put("PT_NM", PT_NM);
		jsonRecord.put("WMCYMD", WMCYMD);
		jsonRecord.put("WMYR", WMYR);
		jsonRecord.put("WMOD", WMOD);
		jsonRecord.put("WMWK", WMWK);
		jsonRecord.put("WMDEP", WMDEP);
		
		jsonRecord.put("CURR_BOD", CURR_BOD);
		//System.out.println("CHART_BOD:::"+CHART_BOD);
		jsonRecord.put("CHART_BOD", CHART_BOD);
		
		jsonRecord.put("CURR_DO", CURR_DO);
		jsonRecord.put("CHART_DO", CHART_DO);
		jsonRecord.put("CURR_COD", CURR_COD);
		jsonRecord.put("CHART_COD", CHART_COD);
		jsonRecord.put("CURR_TN", CURR_TN);
		jsonRecord.put("CHART_TN", CHART_TN);
		jsonRecord.put("CURR_TP", CURR_TP);
		jsonRecord.put("CHART_TP", CHART_TP);
		jsonRecord.put("CURR_TEMP", CURR_TEMP);
		jsonRecord.put("CHART_TEMP", CHART_TEMP);
		jsonRecord.put("CURR_PH", CURR_PH);
		jsonRecord.put("CHART_PH", CHART_PH); 
		jsonRecord.put("CURR_SS", CURR_SS);
		jsonRecord.put("CURR_SS_NEW", CURR_SS_NEW);
		jsonRecord.put("CHART_SS", CHART_SS);
		jsonRecord.put("CURR_CLOA", CURR_CLOA);
		jsonRecord.put("CHART_CLOA", CHART_CLOA);
		jsonRecord.put("CURR_TOC", CURR_TOC);
		jsonRecord.put("CHART_TOC", CHART_TOC);
		
		jsonRecord.put("CURR_AMNT",CURR_AMNT);
		jsonRecord.put("CURR_DTN",CURR_DTN);
		jsonRecord.put("CURR_NO3N",CURR_NO3N);
		jsonRecord.put("CURR_NH3N",CURR_NH3N);
		jsonRecord.put("CURR_DTP",CURR_DTP);
		jsonRecord.put("CURR_POP",CURR_POP);
		jsonRecord.put("CURR_TRANS",CURR_TRANS);
		jsonRecord.put("CURR_ALGOL",CURR_ALGOL);
		jsonRecord.put("CURR_TCOLI",CURR_TCOLI);
		jsonRecord.put("CURR_ECOLI",CURR_ECOLI);
		jsonRecord.put("CURR_ANTIMON",CURR_ANTIMON);
		jsonRecord.put("CURR_PHENOL",CURR_PHENOL);
		jsonRecord.put("CURR_COL",CURR_COL);
		jsonRecord.put("CURR_NHEX",CURR_NHEX);
		jsonRecord.put("CURR_MN",CURR_MN);
		jsonRecord.put("CURR_FE",CURR_FE);
		jsonRecord.put("CURR_CD",CURR_CD);
		jsonRecord.put("CURR_CN",CURR_CN);
		jsonRecord.put("CURR_PB",CURR_PB);
		jsonRecord.put("CURR_CR6",CURR_CR6);
		jsonRecord.put("CURR_CR",CURR_CR);
		jsonRecord.put("CURR_AS",CURR_AS);
		jsonRecord.put("CURR_HG",CURR_HG);
		jsonRecord.put("CURR_CU",CURR_CU);
		jsonRecord.put("CURR_ZN",CURR_ZN);
		jsonRecord.put("CURR_FL",CURR_FL);
		jsonRecord.put("CURR_ABS",CURR_ABS);
		jsonRecord.put("CURR_CL",CURR_CL);
		jsonRecord.put("CURR_TCE",CURR_TCE);
		jsonRecord.put("CURR_PCE",CURR_PCE);
		jsonRecord.put("CURR_CCL4",CURR_CCL4);
		jsonRecord.put("CURR_DCETH",CURR_DCETH);
		jsonRecord.put("CURR_DCM",CURR_DCM);
		jsonRecord.put("CURR_BENZENE",CURR_BENZENE);
		jsonRecord.put("CURR_CHCL3",CURR_CHCL3);
		jsonRecord.put("CURR_OP",CURR_OP);
		jsonRecord.put("CURR_PCB",CURR_PCB);
		jsonRecord.put("CURR_DEHP",CURR_DEHP);
		jsonRecord.put("CURR_DIOX",CURR_DIOX);
		jsonRecord.put("CURR_HCHO",CURR_HCHO);
		jsonRecord.put("CURR_HCB",CURR_HCB);
		jsonRecord.put("CHART_AMNT",CHART_AMNT);
		jsonRecord.put("CHART_DTN",CHART_DTN);
		jsonRecord.put("CHART_NO3N",CHART_NO3N);
		jsonRecord.put("CHART_NH3N",CHART_NH3N);
		jsonRecord.put("CHART_DTP",CHART_DTP);
		jsonRecord.put("CHART_POP",CHART_POP);
		jsonRecord.put("CHART_TRANS",CHART_TRANS);
		jsonRecord.put("CHART_ALGOL",CHART_ALGOL);
		jsonRecord.put("CHART_TCOLI",CHART_TCOLI);
		jsonRecord.put("CHART_ECOLI",CHART_ECOLI);
		jsonRecord.put("CHART_ANTIMON",CHART_ANTIMON);
		jsonRecord.put("CHART_PHENOL",CHART_PHENOL);
		jsonRecord.put("CHART_COL",CHART_COL);
		jsonRecord.put("CHART_NHEX",CHART_NHEX);
		jsonRecord.put("CHART_MN",CHART_MN);
		jsonRecord.put("CHART_FE",CHART_FE);
		jsonRecord.put("CHART_CD",CHART_CD);
		jsonRecord.put("CHART_CN",CHART_CN);
		jsonRecord.put("CHART_PB",CHART_PB);
		jsonRecord.put("CHART_CR6",CHART_CR6);
		jsonRecord.put("CHART_CR",CHART_CR);
		jsonRecord.put("CHART_AS",CHART_AS);
		jsonRecord.put("CHART_HG",CHART_HG);
		jsonRecord.put("CHART_CU",CHART_CU);
		jsonRecord.put("CHART_ZN",CHART_ZN);
		jsonRecord.put("CHART_FL",CHART_FL);
		jsonRecord.put("CHART_ABS",CHART_ABS);
		jsonRecord.put("CHART_CL",CHART_CL);
		jsonRecord.put("CHART_TCE",CHART_TCE);
		jsonRecord.put("CHART_PCE",CHART_PCE);
		jsonRecord.put("CHART_CCL4",CHART_CCL4);
		jsonRecord.put("CHART_DCETH",CHART_DCETH);
		jsonRecord.put("CHART_DCM",CHART_DCM);
		jsonRecord.put("CHART_BENZENE",CHART_BENZENE);
		jsonRecord.put("CHART_CHCL3",CHART_CHCL3);
		jsonRecord.put("CHART_OP",CHART_OP);
		jsonRecord.put("CHART_PCB",CHART_PCB);
		jsonRecord.put("CHART_DEHP",CHART_DEHP);
		jsonRecord.put("CHART_DIOX",CHART_DIOX);
		jsonRecord.put("CHART_HCHO",CHART_HCHO);
		jsonRecord.put("CHART_HCB",CHART_HCB);
	}else if(cnt == 0 && check == "99999"){
		jsonRecord.put("WMCYMD", WMCYMD);
	}else{
		jsonRecord.put("msg", "데이터가 존재하지 않습니다.");
	}
	//System.out.print(cnt);
	//System.out.println(jsonRecord);
	jsonArr.add(jsonRecord);
	
	jsonObj.put("data", jsonArr);
   
	out.print(jsonObj);
	//System.out.print("end");
    jsonObj  = null;
	jsonArr = null;
	jsonRecord = null;
	
   //out.print("success");
}catch(Exception ex){
	//throw;
	
	//System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>