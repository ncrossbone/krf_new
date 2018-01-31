<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
	
	----수질자동측정지점---
	
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
	
	sql = " SELECT A.RN																																																											";
	sql += "      , A.WS_NM /* 히든 */                                                                                                        ";
	sql += "      , A.AM_NM /* 히든 */                                                                                                        ";
	sql += "      , A.AS_NM /* 히든 */                                                                                                        ";
	sql += "      , A.PT_NO                                                                                                                   ";
	sql += "      , A.PT_NM                                                                                                                   ";
	sql += "      , A.WAST_NO                                                                                                                 ";
	sql += "      , A.FACT_KIND_NAME /* 히든 */                                                                                               ";
	sql += "      , A.FACT_CAPACITY /* 히든 */                                                                                                ";
	sql += "      , A.WMCYMD AS WMCYMD                                                                                                        ";
	sql += "      , B.WMCYMD AS CHART_DATE                                                                                                    ";
	sql += "      , A.BOD AS CURR_BOD                                                                                                         ";
	sql += "      , B.BOD AS CHART_BOD                                                                                                        ";
	sql += "      , A.COD AS CURR_COD                                                                                                         ";
	sql += "      , B.COD AS CHART_COD                                                                                                        ";
	sql += "      , A.SS  AS CURR_SS                                                                                                          ";
	sql += "      , B.SS  AS CHART_SS                                                                                                         ";
	sql += "      , A.TN  AS CURR_TN                                                                                                          ";
	sql += "      , B.TN  AS CHART_TN                                                                                                         ";
	sql += "      , A.TP  AS CURR_TP                                                                                                          ";
	sql += "      , B.TP  AS CHART_TP                                                                                                         ";
	sql += "      , A.PH  AS CURR_PH                                                                                                          ";
	sql += "      , B.PH  AS CHART_PH                                                                                                         ";
	sql += "      , A.FLW AS CURR_FLW                                                                                                         ";
	sql += "      , B.FLW AS CHART_FLW                                                                                                        ";
	sql += "      , A.TOC AS CURR_TOC                                                                                                         ";
	sql += "      , B.TOC AS CHART_TOC                                                                                                        ";
	sql += "      , A.DO_NM /* 히든 */                                                                                                        ";
	sql += "      , A.CTY_NM /* 히든 */                                                                                                       ";
	sql += "      , A.DONG_NM /* 히든 */                                                                                                      ";
	sql += "      , A.RI_NM /* 히든 */                                                                                                        ";
	sql += "   FROM (                                                                                                                         ";
	sql += "         SELECT RANK() OVER(PARTITION BY A.FACT_CODE, A.WAST_NO ORDER BY WMCYMD DESC) RN                                          ";
	sql += "              , A.FACT_CODE AS PT_NO /* 사업장코드 */                                                                             ";
	sql += "              , B.FACT_NAME AS PT_NM /* 사업장명 */                                                                               ";
	sql += "              , A.WAST_NO /* 방류구번호 */                                                                                        ";
	sql += "              , FACT_KIND_NAME /* 시설구분 */                                                                                     ";
	sql += "              , FACT_CAPACITY /* 처리용량 */                                                                                      ";
	sql += "              , SUBSTR(A.WMCYMD, 1, 4)||'.'||SUBSTR(A.WMCYMD, 5, 2)||'.'||SUBSTR(A.WMCYMD, 7, 2) AS WMCYMD /* 조사년도 */         ";
	sql += "              , A.BOD /* BOD (㎎/L) */                                                                                            ";
	sql += "              , A.COD /* COD (㎎/L) */                                                                                            ";
	sql += "              , A.SS /* SS (㎎/L) */                                                                                              ";
	sql += "              , A.TN /* T-N (㎎/L) */                                                                                             ";
	sql += "              , A.TP /* T-P (㎎/L) */                                                                                             ";
	sql += "              , A.PH /* pH */                                                                                                     ";
	sql += "              , A.FLW /* 적산유량(평균) (㎥/Hour) */                                                                              ";
	sql += "              , A.TOC /* 총유기탄소 (㎎/L) */                                                                                     ";
	sql += "              , F.DO_NM /* 시도 - 히든 */                                                                                         ";
	sql += "              , F.CTY_NM /* 시군구 - 히든 */                                                                                      ";
	sql += "              , F.DONG_NM /* 읍면동 - 히든 */                                                                                     ";
	sql += "              , F.RI_NM /* 동리 - 히든 */                                                                                         ";
	sql += "              , E.WS_NM /* 대권역 - 히든 */                                                                                       ";
	sql += "              , E.AM_NM /* 중권역 - 히든 */                                                                                       ";
	sql += "              , E.AS_NM /* 소권역 - 히든 */                                                                                       ";
	sql += "           FROM (SELECT FACT_CODE                                                                                                 ";
	sql += "                      , WAST_NO                                                                                                   ";
	sql += "                      , BASE_TIME AS WMCYMD                                                                                       ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'BOD00', HOUR_VL)) AS BOD                                                           ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'COD00', HOUR_VL)) AS COD                                                           ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'SUS00', HOUR_VL)) AS SS                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'TON00', HOUR_VL)) AS TN                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'TOP00', HOUR_VL)) AS TP                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'PHY00', HOUR_VL)) AS PH                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'FLW01', HOUR_VL)) AS FLW                                                           ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'TOC00', HOUR_VL)) AS TOC                                                           ";
	sql += "                   FROM TMS_HOURDATA                                                                                              ";
	sql += "                  GROUP BY FACT_CODE, WAST_NO, BASE_TIME                                                                          ";
	sql += "                ) A                                                                                                               ";
	sql += "              , WTMSC_FACT B                                                                                                      ";
	sql += "              , WTMSC_FACT_KIND C                                                                                                 ";
	sql += "              , WTMSC_FACT_WAST_TEMP D                                                                                            ";
	sql += "              , (SELECT DISTINCT ADM_CD, WS_NM, AM_NM, AS_NM                                                                      ";
	sql += "                   FROM KESTI_WATER_ALL_MAP                                                                                       ";
	sql += "                ) E                                                                                                               ";
	sql += "              , COM_DISTRICT_RAW F                                                                                                ";
	sql += "          WHERE A.FACT_CODE = B.FACT_CODE                                                                                         ";
	sql += "            AND B.FACT_KIND = C.FACT_KIND                                                                                         ";
	sql += "            AND A.FACT_CODE = D.FACT_CODE                                                                                         ";
	sql += "            AND A.WAST_NO = D.WAST_NO                                                                                             ";
	sql += "            AND SUBSTR(D.ADM_CD, 1, 10) = E.ADM_CD                                                                                ";
	sql += "            AND E.ADM_CD = F.ADM_CD                                                                                               ";
	//if(firstSearch.equals("date")){
		sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) >= '" + startYYYYMM + "'                                             ";
		sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) <= '" + endYYYYMM + "'                                           ";
	//}else{
	//	sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) >= '201509'                                             ";
	//	sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) <= '201512'                                           ";
	//}
	sql += "            AND A.FACT_CODE IN ("+siteIds+")                                                                                ";
	sql += "        ) A                                                                                                                       ";
	sql += "      , (                                                                                                                         ";
	sql += "         SELECT RANK() OVER(PARTITION BY A.FACT_CODE, A.WAST_NO ORDER BY WMCYMD DESC) RN                                          ";
	sql += "              , A.FACT_CODE AS PT_NO /* 사업장코드 */                                                                             ";
	sql += "              , B.FACT_NAME AS PT_NM /* 사업장명 */                                                                               ";
	sql += "              , A.WAST_NO /* 방류구번호 */                                                                                        ";
	sql += "              , FACT_KIND_NAME /* 시설구분 */                                                                                     ";
	sql += "              , FACT_CAPACITY /* 처리용량 */                                                                                      ";
	sql += "              , SUBSTR(A.WMCYMD, 1, 4)||'.'||SUBSTR(A.WMCYMD, 5, 2)||'.'||SUBSTR(A.WMCYMD, 7, 2) AS WMCYMD /* 조사년도 */         ";
	sql += "              , A.BOD /* BOD (㎎/L) */                                                                                            ";
	sql += "              , A.COD /* COD (㎎/L) */                                                                                            ";
	sql += "              , A.SS /* SS (㎎/L) */                                                                                              ";
	sql += "              , A.TN /* T-N (㎎/L) */                                                                                             ";
	sql += "              , A.TP /* T-P (㎎/L) */                                                                                             ";
	sql += "              , A.PH /* pH */                                                                                                     ";
	sql += "              , A.FLW /* 적산유량(평균) (㎥/Hour) */                                                                              ";
	sql += "              , A.TOC /* 총유기탄소 (㎎/L) */                                                                                     ";
	sql += "              , F.DO_NM /* 시도 - 히든 */                                                                                         ";
	sql += "              , F.CTY_NM /* 시군구 - 히든 */                                                                                      ";
	sql += "              , F.DONG_NM /* 읍면동 - 히든 */                                                                                     ";
	sql += "              , F.RI_NM /* 동리 - 히든 */                                                                                         ";
	sql += "              , E.WS_NM /* 대권역 - 히든 */                                                                                       ";
	sql += "              , E.AM_NM /* 중권역 - 히든 */                                                                                       ";
	sql += "              , E.AS_NM /* 소권역 - 히든 */                                                                                       ";
	sql += "           FROM (SELECT FACT_CODE                                                                                                 ";
	sql += "                      , WAST_NO                                                                                                   ";
	sql += "                      , BASE_TIME AS WMCYMD                                                                                       ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'BOD00', HOUR_VL)) AS BOD                                                           ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'COD00', HOUR_VL)) AS COD                                                           ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'SUS00', HOUR_VL)) AS SS                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'TON00', HOUR_VL)) AS TN                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'TOP00', HOUR_VL)) AS TP                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'PHY00', HOUR_VL)) AS PH                                                            ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'FLW01', HOUR_VL)) AS FLW                                                           ";
	sql += "                      , MAX(DECODE(ITEM_CODE, 'TOC00', HOUR_VL)) AS TOC                                                           ";
	sql += "                   FROM TMS_HOURDATA                                                                                              ";
	sql += "                  GROUP BY FACT_CODE, WAST_NO, BASE_TIME                                                                          ";
	sql += "                ) A                                                                                                               ";
	sql += "              , WTMSC_FACT B                                                                                                      ";
	sql += "              , WTMSC_FACT_KIND C                                                                                                 ";
	sql += "              , WTMSC_FACT_WAST_TEMP D                                                                                            ";
	sql += "              , (SELECT DISTINCT ADM_CD, WS_NM, AM_NM, AS_NM                                                                      ";
	sql += "                   FROM KESTI_WATER_ALL_MAP                                                                                       ";
	sql += "                ) E                                                                                                               ";
	sql += "              , COM_DISTRICT_RAW F                                                                                                ";
	sql += "          WHERE A.FACT_CODE = B.FACT_CODE                                                                                         ";
	sql += "            AND B.FACT_KIND = C.FACT_KIND                                                                                         ";
	sql += "            AND A.FACT_CODE = D.FACT_CODE                                                                                         ";
	sql += "            AND A.WAST_NO = D.WAST_NO                                                                                             ";
	sql += "            AND SUBSTR(D.ADM_CD, 1, 10) = E.ADM_CD                                                                                ";
	sql += "            AND E.ADM_CD = F.ADM_CD                                                                                               ";
	//if(firstSearch.equals("date")){
		sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) >= TO_CHAR(TO_DATE('" + startYYYYMM + "'                            ";
		sql += "                ,'YYYYMM')-30,'YYYYMM')                                                                                           ";
		sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) <= '" + endYYYYMM + "'                                           ";
	//}else{
	//	sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) >= TO_CHAR(TO_DATE('201509'                            ";
	//	sql += "                ,'YYYYMM')-30,'YYYYMM')                                                                                           ";
	//	sql += "            AND SUBSTR(A.WMCYMD, 1, 4)||SUBSTR(A.WMCYMD, 5, 2) <= '201512'                                          ";
	//}
	sql += "            AND A.FACT_CODE IN ("+siteIds+")                                                                               ";
	sql += "        ) B                                                                                                                       ";
	sql += "  WHERE A.PT_NO   = B.PT_NO                                                                                                       ";
	sql += "    AND A.WAST_NO = B.WAST_NO                                                                                                     ";
	sql += "    AND B.RN BETWEEN A.RN AND A.RN + 4                                                                                            ";
	sql += "  ORDER BY A.PT_NO, A.WAST_NO, A.RN, B.RN DESC                                                                                    ";
		
   //out.print(sql);    sql += "AND A.PT_NO IN (" + siteIds + ") ";
   //out.print(sql);
   //System.out.println(sql);
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	String preSeq = "";
	
	String WS_NM = "";
	String AM_NM = "";
	String AS_NM = "";
	String PT_NO = "";
	String PT_NM = "";
	String WAST_NO = "";
	String FACT_KIND_NAME = "";
	String FACT_CAPACITY = "";
	String WMCYMD = "";
	String CHART_DATE = "";
	
	
	String CURR_BOD = "";
	JSONArray CHART_BOD = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String CURR_COD = "";
	JSONArray CHART_COD = new JSONArray();
	
	String CURR_SS = "";
	JSONArray CHART_SS = new JSONArray();
	
	String CURR_TN = "";
	JSONArray CHART_TN = new JSONArray();
	
	String CURR_TP = "";
	JSONArray CHART_TP = new JSONArray();
	
	String CURR_PH = "";
	JSONArray CHART_PH = new JSONArray();
	
	String CURR_FLW = "";
	JSONArray CHART_FLW = new JSONArray();
	
	String CURR_TOC = "";
	JSONArray CHART_TOC = new JSONArray();
	
	String DO_NM = "";
	String CTY_NM = "";
	String DONG_NM = "";
	String RI_NM = "";
	
	
	
	
	int cnt = 0;
	//out.print(rs);
	while(rs.next()) {
		
		cnt++;
		if(!preSeq.equals("") && !preSeq.equals(rs.getString("RN"))){
			
			cnt = 1;
			//System.out.println("CURR_COD ::"+CURR_COD);
			//System.out.println("CHART_COD ::"+CHART_COD);
			//System.out.println(preSite + preDate);
			jsonRecord = new JSONObject();
			
			//jsonRecord.put("parentId", parentId);
			jsonRecord.put("WS_NM",WS_NM);
			jsonRecord.put("AM_NM",AM_NM);
			jsonRecord.put("AS_NM",AS_NM);
			jsonRecord.put("PT_NO",PT_NO);
			jsonRecord.put("PT_NM",PT_NM);
			jsonRecord.put("WAST_NO",WAST_NO);
			jsonRecord.put("FACT_KIND_NAME",FACT_KIND_NAME);
			jsonRecord.put("FACT_CAPACITY",FACT_CAPACITY);
			jsonRecord.put("WMCYMD",WMCYMD);
			jsonRecord.put("CHART_DATE",CHART_DATE);
			jsonRecord.put("CURR_BOD",CURR_BOD);
			jsonRecord.put("CHART_BOD",CHART_BOD);
			jsonRecord.put("Chart_Data_tmp",Chart_Data_tmp);
			jsonRecord.put("CURR_COD",CURR_COD);
			jsonRecord.put("CHART_COD",CHART_COD);
			jsonRecord.put("CURR_SS",CURR_SS);
			jsonRecord.put("CHART_SS",CHART_SS);
			jsonRecord.put("CURR_TN",CURR_TN);
			jsonRecord.put("CHART_TN",CHART_TN);
			jsonRecord.put("CURR_TP",CURR_TP);
			jsonRecord.put("CHART_TP",CHART_TP);
			jsonRecord.put("CURR_PH",CURR_PH);
			jsonRecord.put("CHART_PH",CHART_PH);
			jsonRecord.put("CURR_FLW",CURR_FLW);
			jsonRecord.put("CHART_FLW",CHART_FLW);
			jsonRecord.put("CURR_TOC",CURR_TOC);
			jsonRecord.put("CHART_TOC",CHART_TOC);
			jsonRecord.put("DO_NM",DO_NM);
			jsonRecord.put("CTY_NM",CTY_NM);
			jsonRecord.put("DONG_NM",DONG_NM);
			jsonRecord.put("RI_NM",RI_NM);
	  		
	  		jsonArr.add(jsonRecord);
	  		
	  		CHART_BOD = new JSONArray();
	  		CHART_COD = new JSONArray();
	  		CHART_SS = new JSONArray();
	  		CHART_TN = new JSONArray();
	  		CHART_TP = new JSONArray();
	  		CHART_PH = new JSONArray();
	  		CHART_FLW = new JSONArray();
	  		CHART_TOC = new JSONArray();
	  		
		}
		//else{
			//parentId = rs.getString("parentId");
			WS_NM  = rs.getString("WS_NM");
			AM_NM  = rs.getString("AM_NM");
			AS_NM  = rs.getString("AS_NM");
			PT_NO  = rs.getString("PT_NO");
			PT_NM  = rs.getString("PT_NM");
			WAST_NO  = rs.getString("WAST_NO");
			FACT_KIND_NAME  = rs.getString("FACT_KIND_NAME");
			FACT_CAPACITY  = rs.getString("FACT_CAPACITY");
			WMCYMD  = rs.getString("WMCYMD");
			
			
			
			
			
			
			CURR_BOD = rs.getString("CURR_BOD");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_BOD"));
			CHART_BOD.add(Chart_Data_tmp);
			
			CURR_COD = rs.getString("CURR_COD");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_COD"));
			CHART_COD.add(Chart_Data_tmp);
						
			CURR_SS  = rs.getString("CURR_SS");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_SS"));
			CHART_SS.add(Chart_Data_tmp);
			
			
			CURR_TN = rs.getString("CURR_TN");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TN"));
			CHART_TN.add(Chart_Data_tmp);
			
			
			CURR_TP = rs.getString("CURR_TP");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TP"));
			CHART_TP.add(Chart_Data_tmp);
			
			
			CURR_PH = rs.getString("CURR_PH");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_PH"));
			CHART_PH.add(Chart_Data_tmp);
	  		//CHART_TN.add(rs.getString("CHART_TN"));
	  		
	  		
	  		CURR_FLW = rs.getString("CURR_FLW");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_FLW"));
			CHART_FLW.add(Chart_Data_tmp);
	  		//CHART_TP.add(rs.getString("CHART_TP"));
	  		
	  		
	  		CURR_TOC = rs.getString("CURR_TOC");
	  		Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TOC"));
			CHART_TOC.add(Chart_Data_tmp);
	  		//CHART_TEMP.add(rs.getString("CHART_TEMP"));
	  		
	  		
	  		DO_NM = rs.getString("DO_NM");
	  		CTY_NM = rs.getString("CTY_NM");
	  		DONG_NM = rs.getString("DONG_NM");
	  		RI_NM = rs.getString("RI_NM");
	  		
			
			
	  		
	  		
		 if(!preSeq.equals(rs.getString("RN")))
			preSeq = rs.getString("RN"); 
  		
	}
	
	jsonRecord = new JSONObject();
	
	if(cnt > 0){
		jsonRecord.put("WS_NM",WS_NM);
		jsonRecord.put("AM_NM",AM_NM);
		jsonRecord.put("AS_NM",AS_NM);
		jsonRecord.put("PT_NO",PT_NO);
		jsonRecord.put("PT_NM",PT_NM);
		jsonRecord.put("WAST_NO",WAST_NO);
		jsonRecord.put("FACT_KIND_NAME",FACT_KIND_NAME);
		jsonRecord.put("FACT_CAPACITY",FACT_CAPACITY);
		jsonRecord.put("WMCYMD",WMCYMD);
		jsonRecord.put("CURR_BOD",CURR_BOD);
		jsonRecord.put("CHART_BOD",CHART_BOD);
		jsonRecord.put("CURR_COD",CURR_COD);
		jsonRecord.put("CHART_COD",CHART_COD);
		jsonRecord.put("CURR_SS",CURR_SS);
		jsonRecord.put("CHART_SS",CHART_SS);
		jsonRecord.put("CURR_TN",CURR_TN);
		jsonRecord.put("CHART_TN",CHART_TN);
		jsonRecord.put("CURR_TP",CURR_TP);
		jsonRecord.put("CHART_TP",CHART_TP);
		jsonRecord.put("CURR_PH",CURR_PH);
		jsonRecord.put("CHART_PH",CHART_PH);
		jsonRecord.put("CURR_FLW",CURR_FLW);
		jsonRecord.put("CHART_FLW",CHART_FLW);
		jsonRecord.put("CURR_TOC",CURR_TOC);
		jsonRecord.put("CHART_TOC",CHART_TOC);
		jsonRecord.put("DO_NM",DO_NM);
		jsonRecord.put("CTY_NM",CTY_NM);
		jsonRecord.put("DONG_NM",DONG_NM);
		jsonRecord.put("RI_NM",RI_NM);
		
		
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