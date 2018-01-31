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
	//수위관측소
	
if(firstSearch.equals("date")){	
	sql = "  SELECT A.RN /* 순번 */																																					";
	sql += "       , A.WS_NM /* 대권역 */                                                                     ";
	sql += "       , A.AM_NM /* 중권역 */                                                                     ";
	sql += "       , A.AS_NM /* 소권역 */                                                                     ";
	sql += "       , A.PT_NO /* 관측소코드 */                                                                 ";
	sql += "       , A.PT_NM /* 관측소명 */                                                                   ";
	sql += "       , A.WMCYMD AS WMCYMD /* 관측일자 */                                                        ";
	sql += "       , B.WMCYMD AS CHART_DATE /* 관측일자 -추이변화*/                                           ";
	sql += "       , A.WL AS CURR_WL /* 수위(cm) */                                                           ";
	sql += "       , B.WL AS CHART_WL /* 수위(cm) -추이변화 */                                                ";
	sql += "       , A.MXWL AS CURR_MXWL /* 최고수위(cm) */                                                   ";
	sql += "       , B.MXWL AS CHART_MXWL /* 최고수위(cm) -추이변화 */                                        ";
	sql += "       , A.MNWL AS CURR_MNWL /* 최저수위(cm) */                                                   ";
	sql += "       , B.MNWL AS CHART_MNWL /* 최저수위(cm) -추이변화 */                                        ";
	sql += "    FROM (                                                                                        ";
	sql += "          SELECT RANK() OVER(PARTITION BY WLOBSCD ORDER BY WLOBSCD, WMCYMD DESC) AS RN            ";
	sql += "               , SUBSTR(WMCYMD,1,4)||'.'||SUBSTR(WMCYMD,5,2)||'.'||SUBSTR(WMCYMD,7,2) AS WMCYMD   ";
	sql += "               , WLOBSCD AS PT_NO                                                                 ";
	sql += "               , OBSNM AS PT_NM                                                                   ";
	sql += "               , WS_NM                                                                            ";
	sql += "               , AM_NM                                                                            ";
	sql += "               , AS_NM                                                                            ";
	sql += "               , TO_CHAR(WL, '999G999G999G990D00') AS WL                                          ";
	sql += "               , TO_CHAR(MXWL, '999G999G999G990D00') AS MXWL                                      ";
	sql += "               , TO_CHAR(MNWL, '999G999G999G990D00') AS MNWL                                      ";
	sql += "          FROM   (                                                                                ";
	sql += "                  SELECT SUBSTR(TO_CHAR(YMDH , 'YYYYMMDDHH24'),1,8) AS WMCYMD,                    ";
	sql += "                         A.WLOBSCD ,                                                              ";
	sql += "                         OBSNM,                                                                   ";
	sql += "                         MAX(ADM_CD) ADM_CD,                                                      ";
	sql += "                         ROUND(AVG(WL)/1, 2) WL,                                                  ";
	sql += "                         ROUND(AVG(MXWL)/1, 2) MXWL,                                              ";
	sql += "                         ROUND(AVG(MNWL)/1, 2) MNWL                                               ";
	sql += "                  FROM   WLDY A,                                                                  ";
	sql += "                         WLOBSIF D                                                                ";
	sql += "                  WHERE  A.WLOBSCD = D.WLOBSCD                                                    ";
	sql += "                    AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDDHH24'),1,6) >='"+startYYYYMM+"'                   ";
	sql += "                    AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDDHH24'),1,6) <='"+endYYYYMM+"'                   ";
	sql += "                    AND A.WLOBSCD IN ( "+siteIds+"  )                                                   ";
	sql += "                  GROUP BY SUBSTR(TO_CHAR(YMDH , 'YYYYMMDDHH24'),1,8) , A.WLOBSCD , OBSNM         ";
	sql += "                 ) A,                                                                             ";
	sql += "                 KESTI_WATER_ALL_MAP B,                                                           ";
	sql += "                 COM_DISTRICT_RAW C                                                               ";
	sql += "          WHERE  A.ADM_CD = B.ADM_CD                                                              ";
	sql += "          AND    A.ADM_CD = C.ADM_CD                                                              ";
	sql += "         ) A                                                                                      ";
	sql += "       , (                                                                                        ";
	sql += "          SELECT RANK() OVER(PARTITION BY WLOBSCD ORDER BY WLOBSCD, WMCYMD DESC) AS RN            ";
	sql += "               , SUBSTR(WMCYMD,1,4)||'.'||SUBSTR(WMCYMD,5,2)||'.'||SUBSTR(WMCYMD,7,2) AS WMCYMD   ";
	sql += "               , WLOBSCD AS PT_NO                                                                 ";
	sql += "               , OBSNM AS PT_NM                                                                   ";
	sql += "               , WS_NM                                                                            ";
	sql += "               , AM_NM                                                                            ";
	sql += "               , AS_NM                                                                            ";
	sql += "               , TO_CHAR(WL, '999G999G999G990D00') AS WL                                          ";
	sql += "               , TO_CHAR(MXWL, '999G999G999G990D00') AS MXWL                                      ";
	sql += "               , TO_CHAR(MNWL, '999G999G999G990D00') AS MNWL                                      ";
	sql += "          FROM   (                                                                                ";
	sql += "                  SELECT SUBSTR(TO_CHAR(YMDH , 'YYYYMMDDHH24'),1,8) AS WMCYMD,                    ";
	sql += "                         A.WLOBSCD ,                                                              ";
	sql += "                         OBSNM,                                                                   ";
	sql += "                         MAX(ADM_CD) ADM_CD,                                                      ";
	sql += "                         ROUND(AVG(WL)/1, 2) WL,                                                  ";
	sql += "                         ROUND(AVG(MXWL)/1, 2) MXWL,                                              ";
	sql += "                         ROUND(AVG(MNWL)/1, 2) MNWL                                               ";
	sql += "                  FROM   WLDY A,                                                                  ";
	sql += "                         WLOBSIF D                                                                ";
	sql += "                  WHERE  A.WLOBSCD = D.WLOBSCD                                                    ";
	sql += "                    AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDDHH24'),1,6) >= TO_CHAR(TO_DATE('"+startYYYYMM+"'  ";
	sql += "                        , 'YYYYMM') -35, 'YYYYMM')                                                ";
	sql += "                    AND SUBSTR(TO_CHAR(A.YMDH , 'YYYYMMDDHH24'),1,6) <='"+endYYYYMM+"'                   ";
	sql += "                    AND A.WLOBSCD IN ("+siteIds+")                                                     ";
	sql += "                  GROUP BY SUBSTR(TO_CHAR(YMDH , 'YYYYMMDDHH24'),1,8) , A.WLOBSCD , OBSNM         ";
	sql += "                 ) A,                                                                             ";
	sql += "                 KESTI_WATER_ALL_MAP B,                                                           ";
	sql += "                 COM_DISTRICT_RAW C                                                               ";
	sql += "          WHERE  A.ADM_CD = B.ADM_CD                                                              ";
	sql += "          AND    A.ADM_CD = C.ADM_CD                                                              ";
	sql += "         ) B                                                                                      ";
	sql += "   WHERE A.PT_NO = B.PT_NO                                                                        ";
	sql += "     AND A.RN BETWEEN B.RN -4 AND B.RN                                                            ";
	sql += "   ORDER BY A.PT_NO, A.WMCYMD DESC, B.WMCYMD                                                     ";
}else{
	sql = "select '9999' AS RN   , max(SUBSTR(TO_CHAR(YMDH , 'YYYYMMDDHH24'),1,8)) as WMCYMD           from WLDY  where WLOBSCD IN ( "+siteIds+" ) ";
}

	
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
	
	
	String CURR_WL = "";
	JSONArray CHART_WL = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String CURR_MXWL = "";
	JSONArray CHART_MXWL = new JSONArray();
	
	String CURR_MNWL = "";
	JSONArray CHART_MNWL = new JSONArray();
	
	
	int cnt = 0;
	//out.print(rs);
	while(rs.next()) {
		//out.print("cnt:");
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
				jsonRecord.put("CURR_WL",CURR_WL);
				jsonRecord.put("CHART_WL",CHART_WL);
				jsonRecord.put("Chart_Data_tmp",Chart_Data_tmp);
				jsonRecord.put("CURR_MXWL",CURR_MXWL);
				jsonRecord.put("CHART_MXWL",CHART_MXWL);
				jsonRecord.put("CURR_MNWL",CURR_MNWL);
				jsonRecord.put("CHART_MNWL",CHART_MNWL);
				
		  		
		  		jsonArr.add(jsonRecord);
		  		
		  		CHART_WL = new JSONArray();
		  		CHART_MXWL = new JSONArray();
		  		CHART_MNWL = new JSONArray();
		  	
		  		
			}
		
		
			WS_NM  = rs.getString("WS_NM");
			AM_NM  = rs.getString("AM_NM");
			AS_NM  = rs.getString("AS_NM");
			PT_NO  = rs.getString("PT_NO");
			PT_NM  = rs.getString("PT_NM");
			WMCYMD  = rs.getString("WMCYMD");
			
			
			
			
			
			
			CURR_WL = rs.getString("CURR_WL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_WL"));
			CHART_WL.add(Chart_Data_tmp);
			
			CURR_MXWL = rs.getString("CURR_MXWL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_MXWL"));
			CHART_MXWL.add(Chart_Data_tmp);
			
						
			CURR_MNWL  = rs.getString("CURR_MNWL");
			Chart_Data_tmp = new JSONArray();
			Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace(".", ""));
			Chart_Data_tmp.add(rs.getString("CHART_MNWL"));
			CHART_MNWL.add(Chart_Data_tmp);
			
	  		
	  		
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
		jsonRecord.put("CURR_WL",CURR_WL);
		jsonRecord.put("CHART_WL",CHART_WL);
		jsonRecord.put("CURR_MXWL",CURR_MXWL);
		jsonRecord.put("CHART_MXWL",CHART_MXWL);
		jsonRecord.put("CURR_MNWL",CURR_MNWL);
		jsonRecord.put("CHART_MNWL",CHART_MNWL);
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