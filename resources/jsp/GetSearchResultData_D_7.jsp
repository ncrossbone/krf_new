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
	//보관측소
	String firstSearch = request.getParameter("firstSearch");
	
	
if(firstSearch.equals("noDate")){
	sql = "		SELECT '9999' AS RN";
	sql += " , max(ymdhm) as WMCYMD ";	
	sql += " 	FROM BOMST where boobscd IN ( "+siteIds+" )		";
}else{
	sql = " SELECT A.RN /* 순번 */																					 ";
	sql += "      , A.WS_NM  /* 대권역 */                                                                               ";
	sql += "      , A.AM_NM  /* 중권역 */                                                                               ";
	sql += "      , A.AS_NM  /* 소권역 */                                                                               ";
	sql += "      , A.WMCYMD /* 관측일자 */                                                                             ";
	sql += "      , B.WMCYMD AS CHART_DATE /* 관측일자 */                                                               ";
	sql += "      , A.PT_NO /* 관측소코드 */                                                                            ";
	sql += "      , A.PT_NM /* 관측소명 */                                                                              ";
	sql += "      , A.SWL AS CURR_SWL    /* 보 상류수위(m) */                                                           ";
	sql += "      , B.SWL AS CHART_SWL   /* 보 상류수위(m) */                                                           ";
	sql += "      , A.OWL AS CURR_OWL    /* 보 하류수위(m) */                                                           ";
	sql += "      , B.OWL AS CHART_OWL   /* 보 하류수위(m) */                                                           ";
	sql += "      , A.SFW AS CURR_SFW    /* 저수량(백만㎥) */                                                           ";
	sql += "      , B.SFW AS CHART_SFW   /* 저수량(백만㎥) */                                                           ";
	sql += "      , A.ECPC AS CURR_ECPC  /* 공용량(백만㎥) */                                                           ";
	sql += "      , B.ECPC AS CHART_ECPC /* 공용량(백만㎥) */                                                           ";
	sql += "      , A.INF AS CURR_INF    /* 유입량(백만㎥) */                                                           ";
	sql += "      , B.INF AS CHART_INF   /* 유입량(백만㎥) */                                                           ";
	sql += "      , A.TOTOTF AS CURR_TOTOTF  /* 총 방류량(㎥/sec) */                                                    ";
	sql += "      , B.TOTOTF AS CHART_TOTOTF /* 총 방류량(㎥/sec) */                                                    ";
	sql += "      , A.EGOTF AS CURR_EGOTF    /* 발전 방류량(㎥/sec) */                                                  ";
	sql += "      , B.EGOTF AS CHART_EGOTF   /* 발전 방류량(㎥/sec) */                                                  ";
	sql += "      , A.GTOTF AS CURR_GTOTF    /* 가동보 방류량(㎥/sec) */                                                ";
	sql += "      , B.GTOTF AS CHART_GTOTF   /* 가동보 방류량(㎥/sec) */                                                ";
	sql += "      , A.CBOTF AS CURR_CBOTF    /* 고정보 방류량(㎥/sec) */                                                ";
	sql += "      , B.CBOTF AS CHART_CBOTF   /* 고정보 방류량(㎥/sec) */                                                ";
	sql += "      , A.FWOTF AS CURR_FWOTF    /* 어도 방류량(㎥/sec) */                                                  ";
	sql += "      , B.FWOTF AS CHART_FWOTF   /* 어도 방류량(㎥/sec) */                                                  ";
	sql += "      , A.ETCOTF AS CURR_ETCOTF  /* 기타 방류량(㎥/sec) */                                                  ";
	sql += "      , B.ETCOTF AS CHART_ETCOTF /* 기타 방류량(㎥/sec) */                                                  ";
	sql += "   FROM (                                                                                                   ";
	sql += "         SELECT RANK() OVER(PARTITION BY BOOBSCD ORDER BY BOOBSCD, WMCYMD DESC, WMCYMD_2 DESC) AS RN        ";
	sql += "              , WS_NM                                                                                       ";
	sql += "              , AM_NM                                                                                       ";
	sql += "              , AS_NM                                                                                       ";
	sql += "              , TO_CHAR(TO_DATE(WMCYMD||WMCYMD_2, 'YYYYMMDD HH24:MI'), 'YYYY.MM.DD HH24:MI') AS WMCYMD      ";
	sql += "              , BOOBSCD AS PT_NO                                                                            ";
	sql += "              , OBSNM AS PT_NM                                                                              ";
	sql += "              , SWL                                                                                         ";
	sql += "              , OWL                                                                                         ";
	sql += "              , SFW                                                                                         ";
	sql += "              , ECPC                                                                                        ";
	sql += "              , INF                                                                                         ";
	sql += "              , TOTOTF                                                                                      ";
	sql += "              , EGOTF                                                                                       ";
	sql += "              , GTOTF                                                                                       ";
	sql += "              , CBOTF                                                                                       ";
	sql += "              , FWOTF                                                                                       ";
	sql += "              , ETCOTF                                                                                      ";
	sql += "         FROM   (SELECT SUBSTR(A.YMDHM ,1,6) AS WMCYMD,                                                     ";
	sql += "                        SUBSTR(A.YMDHM ,7,6) AS WMCYMD_2 ,                                                  ";
	sql += "                        A.BOOBSCD ,                                                                         ";
	sql += "                        OBSNM ,                                                                             ";
	sql += "                        MAX(ADM_CD) ADM_CD,                                                                 ";
	sql += "                        ROUND(AVG(SWL)/1, 3) SWL ,                                                          ";
	sql += "                        ROUND(AVG(OWL)/1, 3) OWL ,                                                          ";
	sql += "                        ROUND(AVG(SFW)/1, 3) SFW ,                                                          ";
	sql += "                        ROUND(AVG(ECPC)/1, 3) ECPC ,                                                        ";
	sql += "                        ROUND(AVG(INF)/1, 3) INF ,                                                          ";
	sql += "                        ROUND(AVG(TOTOTF)/1, 3) TOTOTF ,                                                    ";
	sql += "                        ROUND(AVG(EGOTF)/1, 3) EGOTF ,                                                      ";
	sql += "                        ROUND(AVG(GTOTF)/1, 3) GTOTF ,                                                      ";
	sql += "                        ROUND(AVG(CBOTF)/1, 3) CBOTF ,                                                      ";
	sql += "                        ROUND(AVG(FWOTF)/1, 3) FWOTF ,                                                      ";
	sql += "                        ROUND(AVG(ETCOTF)/1, 3) ETCOTF                                                      ";
	sql += "                 FROM   BOMST A ,                                                                           ";
	sql += "                        BOOBSIF D                                                                           ";
	sql += "                 WHERE  A.BOOBSCD = D.BOOBSCD                                                               ";
	sql += "                 AND    SUBSTR(A.YMDHM ,1,6) >='"+startYYYYMM+"'                                          ";
	sql += "                 AND    SUBSTR(A.YMDHM ,1,6) <='"+endYYYYMM+"'                                          ";
	sql += "                 AND    A.BOOBSCD IN ( "+siteIds+" )                                                ";
	sql += "                 GROUP BY SUBSTR(A.YMDHM ,1,6), SUBSTR(A.YMDHM ,7,6), A.BOOBSCD , OBSNM ) A ,               ";
	sql += "                KESTI_WATER_ALL_MAP B ,                                                                     ";
	sql += "                COM_DISTRICT_RAW C                                                                          ";
	sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                                         ";
	sql += "         AND    A.ADM_CD = C.ADM_CD                                                                         ";
	sql += "        ) A                                                                                                 ";
	sql += "      , (                                                                                                   ";
	sql += "         SELECT RANK() OVER(PARTITION BY BOOBSCD ORDER BY BOOBSCD, WMCYMD DESC, WMCYMD_2 DESC) AS RN        ";
	sql += "              , WS_NM /* 대권역 */                                                                          ";
	sql += "              , AM_NM /* 중권역 */                                                                          ";
	sql += "              , AS_NM /* 소권역 */                                                                          ";
	sql += "              , TO_CHAR(TO_DATE(WMCYMD||WMCYMD_2, 'YYYYMMDD HH24:MI'), 'YYYY.MM.DD HH24:MI') AS WMCYMD      ";
	sql += "              , BOOBSCD AS PT_NO                                                                            ";
	sql += "              , OBSNM AS PT_NM                                                                              ";
	sql += "              , SWL                                                                                         ";
	sql += "              , OWL                                                                                         ";
	sql += "              , SFW                                                                                         ";
	sql += "              , ECPC                                                                                        ";
	sql += "              , INF                                                                                         ";
	sql += "              , TOTOTF                                                                                      ";
	sql += "              , EGOTF                                                                                       ";
	sql += "              , GTOTF                                                                                       ";
	sql += "              , CBOTF                                                                                       ";
	sql += "              , FWOTF                                                                                       ";
	sql += "              , ETCOTF                                                                                      ";
	sql += "         FROM   (SELECT SUBSTR(A.YMDHM ,1,6) AS WMCYMD,                                                     ";
	sql += "                        SUBSTR(A.YMDHM ,7,6) AS WMCYMD_2 ,                                                  ";
	sql += "                        A.BOOBSCD ,                                                                         ";
	sql += "                        OBSNM ,                                                                             ";
	sql += "                        MAX(ADM_CD) ADM_CD,                                                                 ";
	sql += "                        ROUND(AVG(SWL)/1, 3) SWL ,                                                          ";
	sql += "                        ROUND(AVG(OWL)/1, 3) OWL ,                                                          ";
	sql += "                        ROUND(AVG(SFW)/1, 3) SFW ,                                                          ";
	sql += "                        ROUND(AVG(ECPC)/1, 3) ECPC ,                                                        ";
	sql += "                        ROUND(AVG(INF)/1, 3) INF ,                                                          ";
	sql += "                        ROUND(AVG(TOTOTF)/1, 3) TOTOTF ,                                                    ";
	sql += "                        ROUND(AVG(EGOTF)/1, 3) EGOTF ,                                                      ";
	sql += "                        ROUND(AVG(GTOTF)/1, 3) GTOTF ,                                                      ";
	sql += "                        ROUND(AVG(CBOTF)/1, 3) CBOTF ,                                                      ";
	sql += "                        ROUND(AVG(FWOTF)/1, 3) FWOTF ,                                                      ";
	sql += "                        ROUND(AVG(ETCOTF)/1, 3) ETCOTF                                                      ";
	sql += "                 FROM   BOMST A ,                                                                           ";
	sql += "                        BOOBSIF D                                                                           ";
	sql += "                 WHERE  A.BOOBSCD = D.BOOBSCD                                                               ";
	sql += "                 AND    SUBSTR(A.YMDHM ,1,6) >=TO_CHAR(TO_DATE('"+startYYYYMM+"'                                     ";
	sql += "                        , 'YYYYMM') -35, 'YYYYMM')                                                          ";
	sql += "                 AND    SUBSTR(A.YMDHM ,1,6) <='"+endYYYYMM+"'                                                     ";
	sql += "                 AND    A.BOOBSCD IN ( "+siteIds+" )                                                               ";
	sql += "                 GROUP BY SUBSTR(A.YMDHM ,1,6), SUBSTR(A.YMDHM, 7, 6), A.BOOBSCD , OBSNM ) A ,              ";
	sql += "                KESTI_WATER_ALL_MAP B ,                                                                     ";
	sql += "                COM_DISTRICT_RAW C                                                                          ";
	sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                                         ";
	sql += "         AND    A.ADM_CD = C.ADM_CD                                                                         ";
	sql += "        ) B                                                                                                 ";
	sql += "  WHERE A.PT_NO = B.PT_NO                                                                                   ";
	sql += "    AND A.RN BETWEEN B.RN -4 AND B.RN                                                                       ";
	sql += "  ORDER BY A.PT_NO, A.WMCYMD DESC, B.WMCYMD                                                                ";
		
}
	
	//out.println(sql);
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
	
	
	String CURR_SWL = "";
	JSONArray CHART_SWL = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String CURR_OWL = "";
	JSONArray CHART_OWL = new JSONArray();
	
	String CURR_SFW = "";
	JSONArray CHART_SFW = new JSONArray();
	
	//CURR_INF
	String CURR_INF = "";
	JSONArray CHART_INF = new JSONArray();
	
	String CURR_ECPC = "";
	JSONArray CHART_ECPC = new JSONArray();
	
	String CURR_TNF = "";
	JSONArray CHART_TNF = new JSONArray();
	
	String CURR_TOTOTF = "";
	JSONArray CHART_TOTOTF = new JSONArray();
	
	String CURR_EGOTF = "";
	JSONArray CHART_EGOTF = new JSONArray();
	
	String CURR_GTOTF = "";
	JSONArray CHART_GTOTF = new JSONArray();
	
	String CURR_CBOTF = "";
	JSONArray CHART_CBOTF = new JSONArray();
	
	String CURR_FWOTF = "";
	JSONArray CHART_FWOTF = new JSONArray();
	
	String CURR_ETCOTF = "";
	JSONArray CHART_ETCOTF = new JSONArray();
	
	
	
	
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
				jsonRecord.put("CURR_SWL",CURR_SWL);
				jsonRecord.put("CHART_SWL",CHART_SWL);
				jsonRecord.put("Chart_Data_tmp",Chart_Data_tmp);
				jsonRecord.put("CURR_OWL",CURR_OWL);
				jsonRecord.put("CHART_OWL",CHART_OWL);
				jsonRecord.put("CURR_SFW",CURR_SFW);
				jsonRecord.put("CHART_SFW",CHART_SFW);
				jsonRecord.put("CURR_ECPC",CURR_ECPC);
				jsonRecord.put("CHART_ECPC",CHART_ECPC);
				jsonRecord.put("CURR_INF",CURR_INF);
				jsonRecord.put("CHART_INF",CHART_INF);
				jsonRecord.put("CURR_TOTOTF",CURR_TOTOTF);
				jsonRecord.put("CHART_TOTOTF",CHART_TOTOTF);
				jsonRecord.put("CURR_EGOTF",CURR_EGOTF);
				jsonRecord.put("CHART_EGOTF",CHART_EGOTF);
				jsonRecord.put("CURR_GTOTF",CURR_GTOTF);
				jsonRecord.put("CHART_GTOTF",CHART_GTOTF);
				jsonRecord.put("CURR_CBOTF",CURR_CBOTF);
				jsonRecord.put("CHART_CBOTF",CHART_CBOTF);
				jsonRecord.put("CURR_FWOTF",CURR_FWOTF);
				jsonRecord.put("CHART_FWOTF",CHART_FWOTF);
				jsonRecord.put("CURR_ETCOTF",CURR_ETCOTF);
				jsonRecord.put("CHART_ETCOTF",CHART_ETCOTF);
				
				
		  		
		  		jsonArr.add(jsonRecord);
		  		
		  		CHART_SWL = new JSONArray();
		  		CHART_OWL = new JSONArray();
		  		CHART_SFW = new JSONArray();
		  		CHART_ECPC = new JSONArray();
		  		CHART_INF = new JSONArray();
		  		CHART_TOTOTF = new JSONArray();
		  		CHART_EGOTF = new JSONArray();
		  		CHART_GTOTF = new JSONArray();
		  		CHART_CBOTF = new JSONArray();
		  		CHART_FWOTF = new JSONArray();
		  		CHART_ETCOTF = new JSONArray();
		  		
			}
				WS_NM  = rs.getString("WS_NM");
				AM_NM  = rs.getString("AM_NM");
				AS_NM  = rs.getString("AS_NM");
				PT_NO  = rs.getString("PT_NO");
				PT_NM  = rs.getString("PT_NM");
				WMCYMD  = rs.getString("WMCYMD");
				
				
				CURR_SWL = rs.getString("CURR_SWL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_SWL"));
				CHART_SWL.add(Chart_Data_tmp);
				
							
				CURR_OWL  = rs.getString("CURR_OWL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_OWL"));
				CHART_OWL.add(Chart_Data_tmp);
				
				CURR_SFW  = rs.getString("CURR_SFW");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_SFW"));
				CHART_SFW.add(Chart_Data_tmp);
				
				CURR_ECPC  = rs.getString("CURR_ECPC");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_ECPC"));
				CHART_ECPC.add(Chart_Data_tmp);
				
				CURR_INF  = rs.getString("CURR_INF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_INF"));
				CHART_INF.add(Chart_Data_tmp);
				
				CURR_TOTOTF  = rs.getString("CURR_TOTOTF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_TOTOTF"));
				CHART_TOTOTF.add(Chart_Data_tmp);
				
				CURR_EGOTF  = rs.getString("CURR_EGOTF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_EGOTF"));
				CHART_EGOTF.add(Chart_Data_tmp);
				
				CURR_GTOTF  = rs.getString("CURR_GTOTF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_GTOTF"));
				CHART_GTOTF.add(Chart_Data_tmp);
				
				CURR_CBOTF  = rs.getString("CURR_CBOTF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_CBOTF"));
				CHART_CBOTF.add(Chart_Data_tmp);
				
				CURR_FWOTF  = rs.getString("CURR_FWOTF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_FWOTF"));
				CHART_FWOTF.add(Chart_Data_tmp);
				
				CURR_ETCOTF  = rs.getString("CURR_ETCOTF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_ETCOTF"));
				CHART_ETCOTF.add(Chart_Data_tmp);
				
				
		  		
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
		jsonRecord.put("CURR_SWL",CURR_SWL);
		jsonRecord.put("CHART_SWL",CHART_SWL);
		jsonRecord.put("CURR_OWL",CURR_OWL);
		jsonRecord.put("CHART_OWL",CHART_OWL);
		jsonRecord.put("CURR_SFW",CURR_SFW);
		jsonRecord.put("CHART_SFW",CHART_SFW);
		jsonRecord.put("CURR_ECPC",CURR_ECPC);
		jsonRecord.put("CHART_ECPC",CHART_ECPC);
		jsonRecord.put("CURR_INF",CURR_INF);
		jsonRecord.put("CHART_INF",CHART_INF);
		jsonRecord.put("CURR_TOTOTF",CURR_TOTOTF);
		jsonRecord.put("CHART_TOTOTF",CHART_TOTOTF);
		jsonRecord.put("CURR_EGOTF",CURR_EGOTF);
		jsonRecord.put("CHART_EGOTF",CHART_EGOTF);
		jsonRecord.put("CURR_GTOTF",CURR_GTOTF);
		jsonRecord.put("CHART_GTOTF",CHART_GTOTF);
		jsonRecord.put("CURR_CBOTF",CURR_CBOTF);
		jsonRecord.put("CHART_CBOTF",CHART_CBOTF);
		jsonRecord.put("CURR_FWOTF",CURR_FWOTF);
		jsonRecord.put("CHART_FWOTF",CHART_FWOTF);
		jsonRecord.put("CURR_ETCOTF",CURR_ETCOTF);
		jsonRecord.put("CHART_ETCOTF",CHART_ETCOTF);
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