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
	//out.print(parentIds);
	
	String firstSearch = request.getParameter("firstSearch");
	
	//AWS기상관측소
if(firstSearch.equals("noDate")){
	sql = " SELECT '9999' AS RN ";
	sql += " , MAX(tm) as WMCYMD ";
	sql += "  from WTAWSMST WHERE STNID IN ( "+siteIds+" ) ";
}else{
	sql = " SELECT A.RN, /* 순번 */																																	";
	sql += "        A.WS_NM,  /* 대권역 */                                                            ";
	sql += "        A.AM_NM,  /* 중권역 */                                                            ";
	sql += "        A.AS_NM,  /* 소권역 */                                                            ";
	sql += "        A.PT_NO,  /* 관측소코드 */                                                        ";
	sql += "        A.PT_NM,  /* 관측소명 */                                                          ";
	sql += "        SUBSTR(A.WMCYMD,1,4)||'.'||SUBSTR(A.WMCYMD,5,2)||'.'||SUBSTR(A.WMCYMD,7,2) AS WMCYMD, /* 관측일자 */                                                          ";
	sql += "        B.WMCYMD AS CHART_DATE, /* 관측일자 */                                            ";
	sql += "        A.WD AS CURR_WD,  /* 풍향(m/s) */                                                 ";
	sql += "        B.WD AS CHART_WD, /* 풍향(m/s) */                                                 ";
	sql += "        A.WS AS CURR_WS,  /* 풍속(m/s) */                                                 ";
	sql += "        B.WS AS CHART_WS, /* 풍속(m/s) */                                                 ";
	sql += "        A.TA AS CURR_TA,  /* 기온 */                                                      ";
	sql += "        B.TA AS CHART_TA, /* 기온 */                                                      ";
	sql += "        A.HM AS CURR_HM,  /* 습도 */                                                      ";
	sql += "        B.HM AS CHART_HM, /* 습도 */                                                      ";
	sql += "        A.PA AS CURR_PA,  /* 현지기압 */                                                  ";
	sql += "        B.PA AS CHART_PA, /* 현지기압 */                                                  ";
	sql += "        A.PS AS CURR_PS,  /* 해면기압 */                                                  ";
	sql += "        B.PS AS CHART_PS, /* 해면기압 */                                                  ";
	sql += "        A.RNYN AS CURR_RNYN,    /* 강수감지 */                                            ";
	sql += "        B.RNYN AS CHART_RNYN,   /* 강수감지 */                                            ";
	sql += "        A.RN1HR AS CURR_RN1HR,  /* 강수량(mm) */                                          ";
	sql += "        B.RN1HR AS CHART_RN1HR, /* 강수량(mm) */                                          ";
	sql += "        A.RNDAY AS CURR_RNDAY,  /* 누적강수량(mm) */                                      ";
	sql += "        B.RNDAY AS CHART_RNDAY  /* 누적강수량(mm) */                                      ";
	sql += "   FROM (                                                                                 ";
	sql += "         SELECT RANK() OVER(PARTITION BY STNID ORDER BY STNID, WMCYMD DESC) AS RN,        ";
	sql += "                WS_NM,                                                                    ";
	sql += "                AM_NM,                                                                    ";
	sql += "                AS_NM,                                                                    ";
	sql += "                STNID AS PT_NO,                                                           ";
	sql += "                OBSNM AS PT_NM,                                                           ";
	sql += "                WMCYMD,                                                                   ";
	sql += "                WD,                                                                       ";
	sql += "                WS,                                                                       ";
	sql += "                TA,                                                                       ";
	sql += "                HM,                                                                       ";
	sql += "                PA,                                                                       ";
	sql += "                PS,                                                                       ";
	sql += "                RNYN,                                                                     ";
	sql += "                RN1HR,                                                                    ";
	sql += "                RNDAY                                                                     ";
	sql += "         FROM   (SELECT STNID,                                                            ";
	sql += "                        OBSNM,                                                            ";
	sql += "                        SUBSTR(TM, 1, 8) AS WMCYMD,                                       ";
	sql += "                        ROUND(AVG(WD/10),2) WD,                                           ";
	sql += "                        ROUND(AVG(WS/10),2) WS,                                           ";
	sql += "                        ROUND(AVG(TA/10),2) TA,                                           ";
	sql += "                        ROUND(AVG(HM),2) HM,                                              ";
	sql += "                        ROUND(AVG(PA),2) PA,                                              ";
	sql += "                        ROUND(AVG(PS),2) PS,                                              ";
	sql += "                        ROUND(AVG(RNYN),2) RNYN,                                          ";
	sql += "                        ROUND(AVG(RN1HR/10),2) RN1HR,                                     ";
	sql += "                        ROUND(AVG(RNDAY/10),2) RNDAY,                                     ";
	sql += "                        ROUND(AVG(RN15M),2) RN15M,                                        ";
	sql += "                        ROUND(AVG(RN60M),2) RN60M,                                        ";
	sql += "                        ROUND(AVG(WDINS),2) WDINS,                                        ";
	sql += "                        ROUND(AVG(WSINS),2) WSINS,                                        ";
	sql += "                        MAX(ADM_CD) ADM_CD                                                ";
	sql += "                 FROM   WTAWSMST A,                                                       ";
	sql += "                        WTOBSIF B                                                         ";
	sql += "                 WHERE  A.STNID = B.WTOBSCD                                               ";
	sql += "                 AND    A.STNID IN ( "+siteIds+" )                                             ";
	sql += "                 AND    SUBSTR(TM, 1, 6) >= '"+startYYYYMM+"'                                      ";
	sql += "                 AND    SUBSTR(TM, 1, 6) <= '"+endYYYYMM+"'                                      ";
	sql += "                 and    B.OBSTCD = '2'                                                    ";
	sql += "                 GROUP BY STNID, OBSNM, SUBSTR(TM, 1, 8) ) A,                             ";
	sql += "                KESTI_WATER_ALL_MAP C ,                                                   ";
	sql += "                COM_DISTRICT_RAW D                                                        ";
	sql += "         WHERE  A.ADM_CD = C.ADM_CD                                                       ";
	sql += "         AND    A.ADM_CD = D.ADM_CD                                                       ";
	sql += "        ) A                                                                               ";
	sql += "      , (                                                                                 ";
	sql += "         SELECT RANK() OVER(PARTITION BY STNID ORDER BY STNID, WMCYMD DESC) AS RN,        ";
	sql += "                WS_NM,                                                                    ";
	sql += "                AM_NM,                                                                    ";
	sql += "                AS_NM,                                                                    ";
	sql += "                STNID AS PT_NO,                                                           ";
	sql += "                OBSNM AS PT_NM,                                                           ";
	sql += "                WMCYMD,                                                                   ";
	sql += "                WD,                                                                       ";
	sql += "                WS,                                                                       ";
	sql += "                TA,                                                                       ";
	sql += "                HM,                                                                       ";
	sql += "                PA,                                                                       ";
	sql += "                PS,                                                                       ";
	sql += "                RNYN,                                                                     ";
	sql += "                RN1HR,                                                                    ";
	sql += "                RNDAY                                                                     ";
	sql += "         FROM   (SELECT STNID,                                                            ";
	sql += "                        OBSNM,                                                            ";
	sql += "                        SUBSTR(TM, 1, 8) AS WMCYMD,                                       ";
	sql += "                        ROUND(AVG(WD/10),2) WD,                                           ";
	sql += "                        ROUND(AVG(WS/10),2) WS,                                           ";
	sql += "                        ROUND(AVG(TA/10),2) TA,                                           ";
	sql += "                        ROUND(AVG(HM),2) HM,                                              ";
	sql += "                        ROUND(AVG(PA),2) PA,                                              ";
	sql += "                        ROUND(AVG(PS),2) PS,                                              ";
	sql += "                        ROUND(AVG(RNYN),2) RNYN,                                          ";
	sql += "                        ROUND(AVG(RN1HR/10),2) RN1HR,                                     ";
	sql += "                        ROUND(AVG(RNDAY/10),2) RNDAY,                                     ";
	sql += "                        ROUND(AVG(RN15M),2) RN15M,                                        ";
	sql += "                        ROUND(AVG(RN60M),2) RN60M,                                        ";
	sql += "                        ROUND(AVG(WDINS),2) WDINS,                                        ";
	sql += "                        ROUND(AVG(WSINS),2) WSINS,                                        ";
	sql += "                        MAX(ADM_CD) ADM_CD                                                ";
	sql += "                 FROM   WTAWSMST A,                                                       ";
	sql += "                        WTOBSIF B                                                         ";
	sql += "                 WHERE  A.STNID = B.WTOBSCD                                               ";
	sql += "                 AND    A.STNID IN ( "+siteIds+" )                                              ";
	sql += "                 AND    SUBSTR(TM, 1, 6) >= TO_CHAR(TO_DATE('"+startYYYYMM+"'                      ";
	sql += "                       , 'YYYYMM') -35, 'YYYYMM')                                         ";
	sql += "                 AND    SUBSTR(TM, 1, 6) <= '"+endYYYYMM+"'                                      ";
	sql += "                 and    B.OBSTCD = '2'                                                    ";
	sql += "                 GROUP BY STNID, OBSNM, SUBSTR(TM, 1, 8) ) A,                             ";
	sql += "                KESTI_WATER_ALL_MAP C ,                                                   ";
	sql += "                COM_DISTRICT_RAW D                                                        ";
	sql += "         WHERE  A.ADM_CD = C.ADM_CD                                                       ";
	sql += "         AND    A.ADM_CD = D.ADM_CD                                                       ";
	sql += "        ) B                                                                               ";
	sql += "  WHERE A.PT_NO = B.PT_NO                                                                 ";
	sql += "    AND A.RN BETWEEN B.RN -4 AND B.RN                                                     ";
	sql += "  ORDER BY A.PT_NO, A.WMCYMD DESC, B.WMCYMD                                               ";	
}

		
   //out.print(sql);    sql += "AND A.PT_NO IN (" + siteIds + ") ";
   //out.print(sql);
	stmt = con.createStatement();
	rs = stmt.executeQuery(sql);

	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	String preSeq = "";
	String preSeq2 = "9999";
	String check = "";
	
	String WS_NM = "";
	String AM_NM = "";
	String AS_NM = "";
	String PT_NO = "";
	String PT_NM = "";
	String WMCYMD = "";
	String CHART_DATE = "";
	
	
	String CURR_WD = "";
	JSONArray CHART_WD = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String CURR_WS = "";
	JSONArray CHART_WS = new JSONArray();
	
	String CURR_TA = "";
	JSONArray CHART_TA = new JSONArray();
	
	String CURR_HM = "";
	JSONArray CHART_HM = new JSONArray();
	
	String CURR_PA = "";
	JSONArray CHART_PA = new JSONArray();
	
	String CURR_PS = "";
	JSONArray CHART_PS = new JSONArray();
	
	String CURR_RNYN = "";
	JSONArray CHART_RNYN = new JSONArray();
	
	String CURR_RN1HR = "";
	JSONArray CHART_RN1HR = new JSONArray();
	
	String CURR_RNDAY = "";
	JSONArray CHART_RNDAY = new JSONArray();
	
	
	
	
	int cnt = 0;
	//out.print(rs);
	while(rs.next()) {
		if(!preSeq2.equals(rs.getString("RN"))){
			cnt++;
			if(!preSeq.equals("") && !preSeq.equals(rs.getString("RN"))){
				
				cnt = 1;
				
				//System.out.println(preSite + preDate);
				jsonRecord = new JSONObject();
		
				//jsonRecord.put("parentId", parentId);
				jsonRecord.put("WS_NM",WS_NM);
				jsonRecord.put("AM_NM",AM_NM);
				jsonRecord.put("AS_NM",AS_NM);
				jsonRecord.put("PT_NO",PT_NO);
				jsonRecord.put("PT_NM",PT_NM);
				jsonRecord.put("WMCYMD",WMCYMD);
				jsonRecord.put("CHART_DATE",CHART_DATE);
				jsonRecord.put("CURR_WD",CURR_WD);
				jsonRecord.put("CHART_WD",CHART_WD);
				jsonRecord.put("Chart_Data_tmp",Chart_Data_tmp);
				jsonRecord.put("CURR_WS",CURR_WS);
				jsonRecord.put("CHART_WS",CHART_WS);
				jsonRecord.put("CURR_TA",CURR_TA);
				jsonRecord.put("CHART_TA",CHART_TA);
				jsonRecord.put("CURR_HM",CURR_HM);
				jsonRecord.put("CHART_HM",CHART_HM);
				jsonRecord.put("CURR_PA",CURR_PA);
				jsonRecord.put("CHART_PA",CHART_PA);
				jsonRecord.put("CURR_PS",CURR_PS);
				jsonRecord.put("CHART_PS",CHART_PS);
				jsonRecord.put("CURR_RNYN",CURR_RNYN);
				jsonRecord.put("CHART_RNYN",CHART_RNYN);
				jsonRecord.put("CURR_RN1HR",CURR_RN1HR);
				jsonRecord.put("CHART_RN1HR",CHART_RN1HR);
				jsonRecord.put("CURR_RNDAY",CURR_RNDAY);
				jsonRecord.put("CHART_RNDAY",CHART_RNDAY);
				
				
		  		
		  		jsonArr.add(jsonRecord);
		  		
		  		CHART_WD = new JSONArray();
		  		CHART_WS = new JSONArray();
		  		CHART_TA = new JSONArray();
		  		CHART_HM = new JSONArray();
		  		CHART_PA = new JSONArray();
		  		CHART_PS = new JSONArray();
		  		CHART_RNYN = new JSONArray();
		  		CHART_RN1HR = new JSONArray();
		  		CHART_RNDAY = new JSONArray();
		  		
			}
			
				WS_NM  = rs.getString("WS_NM");
				AM_NM  = rs.getString("AM_NM");
				AS_NM  = rs.getString("AS_NM");
				PT_NO  = rs.getString("PT_NO");
				PT_NM  = rs.getString("PT_NM");
				WMCYMD  = rs.getString("WMCYMD");
				
				
				CURR_WD = rs.getString("CURR_WD");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_WD"));
				CHART_WD.add(Chart_Data_tmp);
				
				CURR_WS = rs.getString("CURR_WS");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_WS"));
				CHART_WS.add(Chart_Data_tmp);
				
							
				CURR_TA  = rs.getString("CURR_TA");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_TA"));
				CHART_TA.add(Chart_Data_tmp);
				
				CURR_HM  = rs.getString("CURR_HM");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_HM"));
				CHART_HM.add(Chart_Data_tmp);
				
				CURR_PA  = rs.getString("CURR_PA");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_PA"));
				CHART_PA.add(Chart_Data_tmp);
				
				CURR_PS  = rs.getString("CURR_PS");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_PS"));
				CHART_PS.add(Chart_Data_tmp);
				
				CURR_RNYN  = rs.getString("CURR_RNYN");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_RNYN"));
				CHART_RNYN.add(Chart_Data_tmp);
				
				CURR_RN1HR  = rs.getString("CURR_RN1HR");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_RN1HR"));
				CHART_RN1HR.add(Chart_Data_tmp);
				
				CURR_RNDAY  = rs.getString("CURR_RNDAY");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_RNDAY"));
				CHART_RNDAY.add(Chart_Data_tmp);
				
		  		
			 if(!preSeq.equals(rs.getString("RN"))){
				 preSeq = rs.getString("RN"); 
			 }
				 	
		}else{
			
			check = preSeq2;
			WMCYMD = rs.getString("WMCYMD");
			
		}
		
		
	}
	
	jsonRecord = new JSONObject();
	
	if(cnt > 0){
		jsonRecord.put("WS_NM",WS_NM);
		jsonRecord.put("AM_NM",AM_NM);
		jsonRecord.put("AS_NM",AS_NM);
		jsonRecord.put("PT_NO",PT_NO);
		jsonRecord.put("PT_NM",PT_NM);
		jsonRecord.put("WMCYMD",WMCYMD);
		jsonRecord.put("CURR_WD",CURR_WD);
		jsonRecord.put("CHART_WD",CHART_WD);
		jsonRecord.put("CURR_WS",CURR_WS);
		jsonRecord.put("CHART_WS",CHART_WS);
		jsonRecord.put("CURR_TA",CURR_TA);
		jsonRecord.put("CHART_TA",CHART_TA);
		jsonRecord.put("CURR_PS",CURR_PS);
		jsonRecord.put("CHART_PS",CHART_PS);
		jsonRecord.put("CURR_HM",CURR_HM);
		jsonRecord.put("CHART_HM",CHART_HM);
		jsonRecord.put("CURR_PA",CURR_PA);
		jsonRecord.put("CHART_PA",CHART_PA);
		jsonRecord.put("CURR_PS",CURR_PS);
		jsonRecord.put("CHART_PS",CHART_PS);
		jsonRecord.put("CURR_RNYN",CURR_RNYN);
		jsonRecord.put("CHART_RNYN",CHART_RNYN);
		jsonRecord.put("CURR_RN1HR",CURR_RN1HR);
		jsonRecord.put("CHART_RN1HR",CHART_RN1HR);
		jsonRecord.put("CURR_RNDAY",CURR_RNDAY);
		jsonRecord.put("CHART_RNDAY",CHART_RNDAY);
	}else if(cnt == 0 && check == "9999"){
		jsonRecord.put("WMCYMD",WMCYMD);	
	}else{
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