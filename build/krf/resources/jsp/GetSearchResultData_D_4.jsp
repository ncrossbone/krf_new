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
	
	String firstSearch = request.getParameter("firstSearch");
	
	String startYYYYMM = startYear + startMonth;
	String endYYYYMM = endYear + endMonth;
	//out.print(parentIds);
	//유량관측소

if(firstSearch.equals("date")){
	sql = "";
}else{
	sql = "	SELECT * FROM ( ";
}
sql += " SELECT A.RN /* 순번 */																																								";
sql += "      , A.WS_NM /* 대권역 */                                                                          ";
sql += "      , A.AM_NM /* 중권역 */                                                                          ";
sql += "      , A.AS_NM /* 소권역 */                                                                          ";
sql += "      , A.PT_NO /* 관측소코드 */                                                                      ";
sql += "      , A.PT_NM /* 관측소명 */                                                                        ";
sql += "      , A.WMCYMD /* 관측일자 */                                                                       ";
sql += "      , B.WMCYMD AS CHART_DATE /* 관측일자 -추이변화 */                                               ";
sql += "      , A.SWL    AS CURR_SWL   /* 저수위(cm) */                                                       ";
sql += "      , B.SWL    AS CHART_SWL  /* 저수위(cm) -추이변화 */                                             ";
sql += "      , A.INF    AS CURR_INF   /* 유입량(cms) */                                                      ";
sql += "      , B.INF    AS CHART_INF  /* 유입량(cms) -추이변화 */                                            ";
sql += "      , A.OTF    AS CURR_OTF   /* 방류량(cms) */                                                      ";
sql += "      , B.OTF    AS CHART_OTF  /* 방류량(cms) -추이변화 */                                            ";
sql += "      , A.SFW    AS CURR_SFW   /* 저수량(만㎥) */                                                     ";
sql += "      , B.SFW    AS CHART_SFW  /* 저수량(만㎥) -추이변화 */                                           ";
sql += "      , A.ECPC   AS CURR_ECPC  /* 공용량(백만㎥) */                                                   ";
sql += "      , B.ECPC   AS CHART_ECPC /* 공용량(백만㎥) -추이변화 */                                         ";
sql += "   FROM (                                                                                             ";
sql += "         SELECT RANK() OVER(PARTITION BY DMOBSCD ORDER BY DMOBSCD, WMCYMD DESC) AS RN,                ";
sql += "                B.WS_NM,                                                                              ";
sql += "                B.AM_NM,                                                                              ";
sql += "                B.AS_NM,                                                                              ";
sql += "                DMOBSCD AS PT_NO,                                                                     ";
sql += "                OBSNM AS PT_NM,                                                                       ";
sql += "                WMCYMD,                                                                               ";
sql += "                SWL,                                                                                  ";
sql += "                INF,                                                                                  ";
sql += "                OTF,                                                                                  ";
sql += "                SFW ,                                                                                 ";
sql += "                ECPC                                                                                  ";
sql += "         FROM   (SELECT SUBSTR(YMD,1,4)||'.'||SUBSTR(YMD,5,2)||'.'||SUBSTR(YMD,7,2) AS WMCYMD,        ";
sql += "                        A.DMOBSCD,                                                                    ";
sql += "                        OBSNM,                                                                        ";
sql += "                        MAX(ADM_CD) ADM_CD,                                                           ";
sql += "                        ROUND(AVG(A.SWL)/1, 3) SWL,                                                   ";
sql += "                        ROUND(AVG(INF)/1, 3) INF,                                                     ";
sql += "                        ROUND(AVG(OTF)/1, 3) OTF,                                                     ";
sql += "                        ROUND(AVG(SFW)/1, 3) SFW ,                                                    ";
sql += "                        ROUND(AVG(ECPC)/1, 3) ECPC                                                    ";
sql += "                 FROM   DMDY A,                                                                       ";
sql += "                        DMOBSIF D                                                                     ";
sql += "                 WHERE  A.DMOBSCD = D.DMOBSCD                                                         ";
if(firstSearch.equals("date")){
	sql += "                 AND    SUBSTR(A.YMD, 1, 6) >='"+startYYYYMM+"'                                     ";
	sql += "                 AND    SUBSTR(A.YMD, 1, 6) <='"+endYYYYMM+"'                                     ";
}
sql += "                 AND    A.DMOBSCD  IN ( "+siteIds+"  )                                            ";
sql += "                 GROUP BY SUBSTR(YMD,1,4)||'.'||SUBSTR(YMD,5,2)||'.'||SUBSTR(YMD,7,2), A.DMOBSCD , OBSNM ) A,                                                 ";
sql += "                KESTI_WATER_ALL_MAP B,                                                                ";
sql += "                COM_DISTRICT_RAW C                                                                    ";
sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                                   ";
sql += "         AND    A.ADM_CD = C.ADM_CD                                                                   ";
sql += "        ) A                                                                                           ";
sql += "      , (                                                                                             ";
sql += "         SELECT RANK() OVER(PARTITION BY DMOBSCD ORDER BY DMOBSCD, WMCYMD DESC) AS RN,                ";
sql += "                B.WS_NM,                                                                              ";
sql += "                B.AM_NM,                                                                              ";
sql += "                B.AS_NM,                                                                              ";
sql += "                DMOBSCD AS PT_NO,                                                                     ";
sql += "                OBSNM AS PT_NM,                                                                       ";
sql += "                WMCYMD,                                                                               ";
sql += "                SWL,                                                                                  ";
sql += "                INF,                                                                                  ";
sql += "                OTF,                                                                                  ";
sql += "                SFW ,                                                                                 ";
sql += "                ECPC                                                                                  ";
sql += "         FROM   (SELECT SUBSTR(YMD,1,4)||'.'||SUBSTR(YMD,5,2)||'.'||SUBSTR(YMD,7,2) AS WMCYMD,        ";
sql += "                        A.DMOBSCD,                                                                    ";
sql += "                        OBSNM,                                                                        ";
sql += "                        MAX(ADM_CD) ADM_CD,                                                           ";
sql += "                        ROUND(AVG(A.SWL)/1, 3) SWL,                                                   ";
sql += "                        ROUND(AVG(INF)/1, 3) INF,                                                     ";
sql += "                        ROUND(AVG(OTF)/1, 3) OTF,                                                     ";
sql += "                        ROUND(AVG(SFW)/1, 3) SFW ,                                                    ";
sql += "                        ROUND(AVG(ECPC)/1, 3) ECPC                                                    ";
sql += "                 FROM   DMDY A,                                                                       ";
sql += "                        DMOBSIF D                                                                     ";
sql += "                 WHERE  A.DMOBSCD = D.DMOBSCD                                                         ";
if(firstSearch.equals("date")){
	sql += "                 AND    SUBSTR(A.YMD, 1, 6) >='"+startYYYYMM+"'                                                ";
	sql += "                 AND    SUBSTR(A.YMD, 1, 6) <='"+endYYYYMM+"'                                                ";
}
sql += "                 AND    A.DMOBSCD IN ( "+siteIds+" )                                                        ";
sql += "                 GROUP BY SUBSTR(YMD,1,4)||'.'||SUBSTR(YMD,5,2)||'.'||SUBSTR(YMD,7,2), A.DMOBSCD , OBSNM ) A,                                                 ";
sql += "                KESTI_WATER_ALL_MAP B,                                                                ";
sql += "                COM_DISTRICT_RAW C                                                                    ";
sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                                   ";
sql += "         AND    A.ADM_CD = C.ADM_CD                                                                   ";
sql += "        ) B                                                                                           ";
sql += "  WHERE A.PT_NO = B.PT_NO                                                                             ";
sql += "    AND A.RN BETWEEN B.RN -4 AND B.RN                                                                 ";
if(firstSearch.equals("date")){
	sql += "  ORDER BY A.PT_NO, A.WMCYMD DESC, B.WMCYMD                                                          ";
}else{
	sql += "  ORDER BY A.WMCYMD DESC                                                         ";
	sql += "  ) WHERE ROWNUM <= 1                                 ";
}
   //out.print(sql);    sql += "AND A.PT_NO IN (" + siteIds + ") ";
		//out.print(sql);   
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
		String WMCYMD = "";
		String CHART_DATE = "";
		
		
		String CURR_SWL = "";
		JSONArray CHART_SWL = new JSONArray();
		JSONArray Chart_Data_tmp = new JSONArray();
		
		String CURR_INF = "";
		JSONArray CHART_INF = new JSONArray();
		
		String CURR_OTF = "";
		JSONArray CHART_OTF = new JSONArray();
		
		String CURR_SFW = "";
		JSONArray CHART_SFW = new JSONArray();
		
		String CURR_ECPC = "";
		JSONArray CHART_ECPC = new JSONArray();
		
		int cnt = 0;
		//out.print(rs);
		while(rs.next()) {
			
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
				jsonRecord.put("CURR_INF",CURR_INF);
				jsonRecord.put("CHART_INF",CHART_INF);
				jsonRecord.put("CURR_OTF",CURR_OTF);
				jsonRecord.put("CHART_OTF",CHART_OTF);
				jsonRecord.put("CURR_SFW",CURR_SFW);
				jsonRecord.put("CHART_SFW",CHART_SFW);
				jsonRecord.put("CURR_ECPC",CURR_ECPC);
				jsonRecord.put("CHART_ECPC",CHART_ECPC);
				jsonRecord.put("Chart_Data_tmp",Chart_Data_tmp);
				
		  		jsonArr.add(jsonRecord);
		  		
		  		CHART_SWL = new JSONArray();
		  		CHART_INF = new JSONArray();
		  		CHART_OTF = new JSONArray();
		  		CHART_SFW = new JSONArray();
		  		CHART_ECPC = new JSONArray();
		  		
			}
			//else{
				//parentId = rs.getString("parentId");
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
		  		
				CURR_INF = rs.getString("CURR_INF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_INF"));
				CHART_INF.add(Chart_Data_tmp);
				
				CURR_OTF = rs.getString("CURR_OTF");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_OTF"));
				CHART_OTF.add(Chart_Data_tmp);
				
				CURR_SFW = rs.getString("CURR_SFW");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_SFW"));
				CHART_SFW.add(Chart_Data_tmp);
				
				CURR_ECPC = rs.getString("CURR_ECPC");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
				Chart_Data_tmp.add(rs.getString("CHART_ECPC"));
				CHART_ECPC.add(Chart_Data_tmp);
				
				
		  		
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
			jsonRecord.put("WMCYMD",WMCYMD);
			jsonRecord.put("CURR_SWL",CURR_SWL);
			jsonRecord.put("CHART_SWL",CHART_SWL);
			jsonRecord.put("CURR_INF",CURR_INF);
			jsonRecord.put("CHART_INF",CHART_INF);
			jsonRecord.put("CURR_OTF",CURR_OTF);
			jsonRecord.put("CHART_OTF",CHART_OTF);
			jsonRecord.put("CURR_SFW",CURR_SFW);
			jsonRecord.put("CHART_SFW",CHART_SFW);
			jsonRecord.put("CURR_ECPC",CURR_ECPC);
			jsonRecord.put("CHART_ECPC",CHART_ECPC);
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