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
	//지상기상관측소

if(firstSearch.equals("date")){
	sql = "";
}else{
	sql = " SELECT * FROM ( ";
}
sql += " SELECT A.RN     /* 순번 */																														";
sql += "      , A.WS_NM  /* 대권역 */                                                         ";
sql += "      , A.AM_NM  /* 중권역 */                                                         ";
sql += "      , A.AS_NM  /* 소권역 */                                                         ";
sql += "      , A.PT_NO  /* 관측소코드 */                                                     ";
sql += "      , A.PT_NM  /* 관측소명 */                                                       ";
sql += "      , A.WMCYMD /* 관측일자 */                                                       ";
sql += "      , A.WMCYMD AS CHART_DATE  /* 관측일자 */                                        ";
sql += "      , A.RND    AS CURR_RND    /* 강수량자료(mm) */                                  ";
sql += "      , B.RND    AS CHART_RND   /* 강수량자료(mm) */                                  ";
sql += "      , A.TA     AS CURR_TA     /* 기온(℃) */                                        ";
sql += "      , B.TA     AS CHART_TA    /* 기온(℃) */                                        ";
sql += "      , A.SIDAY  AS CURR_SIDAY  /* 일사(MJ/㎡) */                                     ";
sql += "      , B.SIDAY  AS CHART_SIDAY /* 일사(MJ/㎡) */                                     ";
sql += "   FROM (                                                                             ";
sql += "         SELECT RANK() OVER(PARTITION BY STNID ORDER BY STNID, WMCYMD DESC) AS RN,    ";
sql += "                WMCYMD,                                                               ";
sql += "                STNID AS PT_NO,                                                       ";
sql += "                WS_NM,                                                                ";
sql += "                AM_NM,                                                                ";
sql += "                AS_NM ,                                                               ";
sql += "                OBSNM AS PT_NM,                                                       ";
sql += "                RND,                                                                  ";
sql += "                TA,                                                                   ";
sql += "                SIDAY                                                                 ";
sql += "         FROM   (SELECT TM AS WMCYMD,                                                 ";
sql += "                        E.OBSNMENG AS STNID,                                          ";
sql += "                        STN_NM AS OBSNM,                                              ";
sql += "                        MAX(D.ADM_CD) ADM_CD,                                         ";
sql += "                        MAX(RN_DAY) AS RND,                                           ";
sql += "                        A.TA AS TA,                                                   ";
sql += "                        A.SI_DAY AS SIDAY                                             ";
sql += "                 FROM   RNDY A,                                                       ";
sql += "                        KESTI_RNDY_ST D,                                              ";
sql += "                        WTOBSIF E                                                     ";
sql += "                 WHERE  A.STN_ID = D.STN_ID                                           ";
sql += "                 AND    A.STN_ID= E.OBSNMENG                                          ";
if(firstSearch.equals("date")){
	sql += "                 AND    SUBSTR(A.TM, 1, 6) >='"+startYYYYMM+"'                                 ";
	sql += "                 AND    SUBSTR(A.TM, 1, 6) <='"+endYYYYMM+"'                                 ";
}
sql += "                 AND    D.STN_ID IN ( "+siteIds+" )                                             ";
sql += "                 GROUP BY TM, E.OBSNMENG, STN_NM, TA, SI_DAY)A,                       ";
sql += "                KESTI_WATER_ALL_MAP B,                                                ";
sql += "                COM_DISTRICT_RAW C                                                    ";
sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                   ";
sql += "         AND    A.ADM_CD = C.ADM_CD                                                   ";
sql += "        ) A                                                                           ";
sql += "      , (                                                                             ";
sql += "         SELECT RANK() OVER(PARTITION BY STNID ORDER BY STNID, WMCYMD DESC) AS RN,    ";
sql += "                WMCYMD,                                                               ";
sql += "                STNID AS PT_NO,                                                       ";
sql += "                WS_NM,                                                                ";
sql += "                AM_NM,                                                                ";
sql += "                AS_NM ,                                                               ";
sql += "                OBSNM AS PT_NM,                                                       ";
sql += "                RND,                                                                  ";
sql += "                TA,                                                                   ";
sql += "                SIDAY                                                                 ";
sql += "         FROM   (SELECT TM AS WMCYMD,                                                 ";
sql += "                        E.OBSNMENG AS STNID,                                          ";
sql += "                        STN_NM AS OBSNM,                                              ";
sql += "                        MAX(D.ADM_CD) ADM_CD,                                         ";
sql += "                        MAX(RN_DAY) AS RND,                                           ";
sql += "                        A.TA AS TA,                                                   ";
sql += "                        A.SI_DAY AS SIDAY                                             ";
sql += "                 FROM   RNDY A,                                                       ";
sql += "                        KESTI_RNDY_ST D,                                              ";
sql += "                        WTOBSIF E                                                     ";
sql += "                 WHERE  A.STN_ID = D.STN_ID                                           ";
sql += "                 AND    A.STN_ID= E.OBSNMENG                                          ";
if(firstSearch.equals("date")){
	sql += "                 AND    SUBSTR(A.TM, 1, 6) >= TO_CHAR(TO_DATE('"+startYYYYMM+"'                ";
	sql += "                       , 'YYYYMM') -35, 'YYYYMM')                                     ";
	sql += "                 AND    SUBSTR(A.TM, 1, 6) <= '"+endYYYYMM+"'                                ";
}
sql += "                 AND    D.STN_ID IN ( "+siteIds+" )                                              ";
sql += "                 GROUP BY TM, E.OBSNMENG, STN_NM, TA, SI_DAY)A,                       ";
sql += "                KESTI_WATER_ALL_MAP B,                                                ";
sql += "                COM_DISTRICT_RAW C                                                    ";
sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                   ";
sql += "         AND    A.ADM_CD = C.ADM_CD                                                   ";
sql += "        ) B                                                                           ";
sql += "  WHERE A.PT_NO = B.PT_NO                                                             ";
sql += "    AND A.RN BETWEEN B.RN -4 AND B.RN                                                 ";
if(firstSearch.equals("date")){
	sql += "  ORDER BY A.PT_NO, A.WMCYMD DESC, B.WMCYMD                                          ";
}else{
	sql += "  ORDER BY A.WMCYMD DESC                                          ";
	sql += "  ) WHERE ROWNUM <= 1                                          ";
}
		
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
	String WMCYMD = "";
	String CHART_DATE = "";
	
	
	String CURR_RND = "";
	JSONArray CHART_RND = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String CURR_TA = "";
	JSONArray CHART_TA = new JSONArray();
	
	String CURR_SIDAY = "";
	JSONArray CHART_SIDAY = new JSONArray();
	
	
	
	
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
			jsonRecord.put("CURR_RND",CURR_RND);
			jsonRecord.put("CHART_RND",CHART_RND);
			jsonRecord.put("Chart_Data_tmp",Chart_Data_tmp);
			jsonRecord.put("CURR_TA",CURR_TA);
			jsonRecord.put("CHART_TA",CHART_TA);
			jsonRecord.put("CURR_SIDAY",CURR_SIDAY);
			jsonRecord.put("CHART_SIDAY",CHART_SIDAY);
			
			
			
	  		
	  		jsonArr.add(jsonRecord);
	  		
	  		CHART_RND = new JSONArray();
	  		CHART_TA = new JSONArray();
	  		CHART_SIDAY = new JSONArray();
	  		
		}
		//else{
			//parentId = rs.getString("parentId");
			WS_NM  = rs.getString("WS_NM");
			AM_NM  = rs.getString("AM_NM");
			AS_NM  = rs.getString("AS_NM");
			PT_NO  = rs.getString("PT_NO");
			PT_NM  = rs.getString("PT_NM");
			WMCYMD  = rs.getString("WMCYMD");
			
			
			CURR_RND = rs.getString("CURR_RND");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_RND"));
			CHART_RND.add(Chart_Data_tmp);
			
						
			CURR_TA  = rs.getString("CURR_TA");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_TA"));
			CHART_TA.add(Chart_Data_tmp);
			
			CURR_SIDAY  = rs.getString("CURR_SIDAY");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_SIDAY"));
			CHART_SIDAY.add(Chart_Data_tmp);
			
	  		
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
		jsonRecord.put("CURR_RND",CURR_RND);
		jsonRecord.put("CHART_RND",CHART_RND);
		jsonRecord.put("CURR_TA",CURR_TA);
		jsonRecord.put("CHART_TA",CHART_TA);
		jsonRecord.put("CURR_SIDAY",CURR_SIDAY);
		jsonRecord.put("CHART_SIDAY",CHART_SIDAY);
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