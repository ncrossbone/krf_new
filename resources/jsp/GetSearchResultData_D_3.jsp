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
sql += " SELECT A.RN /* 순번 */																																			    ";
sql += "      , A.WS_NM /* 대권역 */                                                                    ";
sql += "      , A.AM_NM /* 중권역 */                                                                    ";
sql += "      , A.AS_NM /* 소권역 */                                                                    ";
sql += "      , A.PT_NO /* 관측소코드 */                                                                ";
sql += "      , A.PT_NM /* 관측소명 */                                                                  ";
sql += "      , A.WMCYMD /* 관측일자 */                                                                 ";
sql += "      , B.WMCYMD AS CHART_DATE /* 관측일자 -추이변화*/                                          ";
sql += "      , A.FW AS CURR_FW  /* 유량(CMS) */                                                        ";
sql += "      , B.FW AS CHART_FW /* 유량(CMS) -추이변화*/                                               ";
sql += "   FROM (                                                                                       ";
sql += "         SELECT RANK() OVER(PARTITION BY WLOBSCD                                                ";
sql += "                 ORDER BY WLOBSCD, WMCYMD DESC) AS RN ,                                         ";
sql += "                WMCYMD,                                                                         ";
sql += "                WLOBSCD AS PT_NO,                                                               ";
sql += "                OBSNM AS PT_NM,                                                                 ";
sql += "                FW,                                                                             ";
sql += "                B.WS_NM,                                                                        ";
sql += "                B.AM_NM,                                                                        ";
sql += "                B.AS_NM                                                                         ";
sql += "         FROM   (SELECT TO_CHAR(YMDH, 'YYYY.MM.DD') WMCYMD,                                     ";
sql += "                        A.WLOBSCD,                                                              ";
sql += "                        OBSNM,                                                                  ";
sql += "                        MAX(ADM_CD) ADM_CD,                                                     ";
sql += "                        ROUND(AVG(FW)/1, 4) FW                                                  ";
sql += "                 FROM   FWDY A,                                                                 ";
sql += "                        FWOBSIF D                                                               ";
sql += "                 WHERE  A.WLOBSCD = D.FWOBSCD                                                   ";

if(firstSearch.equals("date")){
	sql += "                 AND    SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) >='"+startYYYYMM+"'                     ";
	sql += "                 AND    SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) <='"+endYYYYMM+"'                     ";
}

sql += "                 AND    A.WLOBSCD IN ( "+siteIds+" )                                                  ";
sql += "                 GROUP BY TO_CHAR(YMDH, 'YYYY.MM.DD'), A.WLOBSCD , OBSNM ) A,                   ";
sql += "                KESTI_WATER_ALL_MAP B,                                                          ";
sql += "                COM_DISTRICT_RAW C                                                              ";
sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                             ";
sql += "         AND    A.ADM_CD = C.ADM_CD                                                             ";
sql += "        ) A                                                                                     ";
sql += "      , (                                                                                       ";
sql += "         SELECT RANK() OVER(PARTITION BY WLOBSCD                                                ";
sql += "                 ORDER BY WLOBSCD, WMCYMD DESC) AS RN ,                                         ";
sql += "                WMCYMD,                                                                         ";
sql += "                WLOBSCD AS PT_NO,                                                               ";
sql += "                OBSNM AS PT_NM,                                                                 ";
sql += "                FW,                                                                             ";
sql += "                B.WS_NM,                                                                        ";
sql += "                B.AM_NM,                                                                        ";
sql += "                B.AS_NM                                                                         ";
sql += "         FROM   (SELECT TO_CHAR(YMDH, 'YYYY.MM.DD') WMCYMD,                                     ";
sql += "                        A.WLOBSCD,                                                              ";
sql += "                        OBSNM,                                                                  ";
sql += "                        MAX(ADM_CD) ADM_CD,                                                     ";
sql += "                        ROUND(AVG(FW)/1, 4) FW                                                  ";
sql += "                 FROM   FWDY A,                                                                 ";
sql += "                        FWOBSIF D                                                               ";
sql += "                 WHERE  A.WLOBSCD = D.FWOBSCD                                                   ";
if(firstSearch.equals("date")){
	sql += "                 AND    SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) >= TO_CHAR(TO_DATE('"+startYYYYMM+"'    ";
	sql += "                       , 'YYYYMM') -35, 'YYYYMM')                                               ";
	sql += "                 AND    SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDD'),1,6) <= '"+endYYYYMM+"'                    ";
}
sql += "                 AND    A.WLOBSCD IN ( "+siteIds+"  )                                                 ";
sql += "                 GROUP BY A.WLOBSCD , TO_CHAR(YMDH, 'YYYY.MM.DD'), OBSNM ) A,                   ";
sql += "                KESTI_WATER_ALL_MAP B,                                                          ";
sql += "                COM_DISTRICT_RAW C                                                              ";
sql += "         WHERE  A.ADM_CD = B.ADM_CD                                                             ";
sql += "         AND    A.ADM_CD = C.ADM_CD                                                             ";
sql += "        ) B                                                                                     ";
sql += "  WHERE A.PT_NO = B.PT_NO                                                                       ";
sql += "    AND A.RN BETWEEN B.RN -4 AND B.RN                                                           ";
if(firstSearch.equals("date")){
	sql += "  ORDER BY A.PT_NO, A.WMCYMD DESC, B.WMCYMD                                                    ";
}else{
	sql += "	ORDER BY A.WMCYMD DESC ";
	sql += " ) WHERE ROWNUM <= 1 "; 
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
	
	
	String CURR_FW = "";
	JSONArray CHART_FW = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	
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
			jsonRecord.put("CURR_FW",CURR_FW);
			jsonRecord.put("CHART_FW",CHART_FW);
			jsonRecord.put("Chart_Data_tmp",Chart_Data_tmp);
			
	  		
	  		jsonArr.add(jsonRecord);
	  		
	  		CHART_FW = new JSONArray();
	  		
	  		
		}
		//else{
			//parentId = rs.getString("parentId");
			WS_NM  = rs.getString("WS_NM");
			AM_NM  = rs.getString("AM_NM");
			AS_NM  = rs.getString("AS_NM");
			PT_NO  = rs.getString("PT_NO");
			PT_NM  = rs.getString("PT_NM");
			WMCYMD  = rs.getString("WMCYMD");
			
			
			
			
			
			
			CURR_FW = rs.getString("CURR_FW");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_FW"));
			CHART_FW.add(Chart_Data_tmp);
			
			
	  		
	  		
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
		jsonRecord.put("CURR_FW",CURR_FW);
		jsonRecord.put("CHART_FW",CHART_FW);
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