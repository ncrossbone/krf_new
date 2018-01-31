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
	//총이송량
	
if(firstSearch.equals("date")){
sql = " SELECT 																										" ;
sql += "  		 A.FACI_CD                                                                                            ";
sql += "  	   , A.NO                                                                                                 ";
sql += "       , A.FACI_NM /* 처리시설명 */                                                                           ";
sql += "       , A.WORK_DT AS WORK_DT_VAL /* 운영일자 */                                                              ";
sql += "       , A.WORK_DT AS CHART_DATE  /* 운영일자 */                                                              ";
sql += "       , B.WORK_DT AS WORK_DT_GRAPH /* 운영일자 */                                                            ";
sql += "       , A.PIPE_NUM /* 유입구번호 */                                                                          ";
sql += "       , A.AMT  AS AMT_VAL /* 유량(㎥/일) */                                    ";
sql += "       , B.AMT  AS AMT_GRAPH /* 유량(㎥/일) */                                  ";
sql += "       , A.BOD  AS BOD_VAL /* BOD(㎎/ℓ) */                                     ";
sql += "       , B.BOD  AS BOD_GRAPH /* BOD(㎎/ℓ) */                                   ";
sql += "       , A.COD  AS COD_VAL /* COD(㎎/ℓ) */                                     ";
sql += "       , B.COD  AS COD_GRAPH /* COD(㎎/ℓ) */                                   ";
sql += "       , A.SS  AS SS_VAL /* SS(㎎/ℓ) */                                        ";
sql += "       , B.SS  AS SS_GRAPH /* SS(㎎/ℓ) */                                      ";
sql += "       , A.TN  AS TN_VAL /* TN(㎎/ℓ) */                                        ";
sql += "       , B.TN  AS TN_GRAPH /* TN(㎎/ℓ) */                                      ";
sql += "       , A.TP  AS TP_VAL /* TP(㎎/ℓ) */                                        ";
sql += "       , B.TP  AS TP_GRAPH /* TP(㎎/ℓ) */                                      ";
sql += "       , A.COLI  AS COLI_VAL /* 대장균군수(총대장균군수) */                        ";
sql += "       , B.COLI  AS COLI_GRAPH /* 대장균군수(총대장균군수) */                      ";
sql += "    FROM (SELECT RANK() OVER(PARTITION BY FACI_CD, PIPE_NUM ORDER BY FACI_CD, PIPE_NUM, WORK_DT DESC) AS NO,  ";
sql += "                 TT.ADM_CD,                                                                                   ";
sql += "                 T.YYYY,                                                                                      ";
sql += "                 FACI_CD,                                                                                     ";
sql += "                 FACI_NM,                                                                                     ";
sql += "                 WORK_DT,                                                                                     ";
sql += "                 PIPE_NUM,                                                                                    ";
sql += "                 AMT,                                                                                         ";
sql += "                 BOD,                                                                                         ";
sql += "                 COD,                                                                                         ";
sql += "                 SS,                                                                                          ";
sql += "                 TN,                                                                                          ";
sql += "                 TP,                                                                                          ";
sql += "                 COLI                                                                                         ";
sql += "            FROM VPLA_FACI_IN_TOTAL T ,                                                                       ";
sql += "                 COM_DISTRICT_RAW TT,                                                                         ";
sql += "                 KESTI_WATER_ALL_MAP C                                                                        ";
sql += "           WHERE T.ADM_CD = C.ADM_CD                                                                          ";
sql += "             AND T.ADM_CD = TT.ADM_CD                                                                         ";
sql += "         ) A                                                                                                  ";
sql += "       , (SELECT RANK() OVER(PARTITION BY FACI_CD, PIPE_NUM ORDER BY FACI_CD, PIPE_NUM, WORK_DT DESC) AS NO,  ";
sql += "                 TT.ADM_CD,                                                                                   ";
sql += "                 T.YYYY,                                                                                      ";
sql += "                 FACI_CD,                                                                                     ";
sql += "                 FACI_NM,                                                                                     ";
sql += "                 WORK_DT,                                                                                     ";
sql += "                 PIPE_NUM,                                                                                    ";
sql += "                 AMT,                                                                                         ";
sql += "                 BOD,                                                                                         ";
sql += "                 COD,                                                                                         ";
sql += "                 SS,                                                                                          ";
sql += "                 TN,                                                                                          ";
sql += "                 TP,                                                                                          ";
sql += "                 COLI                                                                                         ";
sql += "            FROM VPLA_FACI_IN_TOTAL T ,                                                                       ";
sql += "                 COM_DISTRICT_RAW TT,                                                                         ";
sql += "                 KESTI_WATER_ALL_MAP C                                                                        ";
sql += "           WHERE T.ADM_CD = C.ADM_CD                                                                          ";
sql += "             AND T.ADM_CD = TT.ADM_CD                                                                         ";
sql += "         ) B                                                                                                  ";
sql += "   WHERE A.FACI_CD   =  B.FACI_CD                                                                             ";
sql += "     AND A.PIPE_NUM  =  B.PIPE_NUM                                                                            ";
sql += "     AND A.ADM_CD    =  B.ADM_CD                                                                              ";
sql += "     AND A.NO BETWEEN B.NO -4 AND B.NO                                                                        ";
sql += "     AND A.FACI_CD IN ("+siteIds+")                                                                             " ;
sql += "    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '"+startYYYYMM+"' AND '"+endYYYYMM+"'               " ;
sql += "  ORDER BY A.FACI_NM, A.PIPE_NUM, A.WORK_DT DESC, B.WORK_DT                                                  " ;
}else{
	sql = " select '9999' AS NO , MAX(WORK_DT) AS WORK_DT_VAL from VPLA_FACI_IN_TOTAL where faci_cd IN ("+siteIds+")  " ;
}

   //out.print(sql);    sql += "AND A.PT_NO IN (" + siteIds + ") ";
   
   stmt = con.createStatement();
   rs = stmt.executeQuery(sql);
   
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	String preSeq = "";
	String preSeq2 = "9999";
	String check = "";
	
	String FACI_CD = "";
	String FACI_NM = "";
	
	String WORK_DT_VAL = "";
	JSONArray WORK_DT_GRAPH = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String PIPE_NUM = "";
	
	String AMT_VAL = "";
	JSONArray AMT_GRAPH = new JSONArray();
	
	String BOD_VAL = "";
	JSONArray BOD_GRAPH = new JSONArray();
	
	String COD_VAL = "";
	JSONArray COD_GRAPH = new JSONArray();
	
	String SS_VAL = "";
	JSONArray SS_GRAPH = new JSONArray();
	
	String TN_VAL = "";
	JSONArray TN_GRAPH = new JSONArray();
	
	String TP_VAL = "";
	JSONArray TP_GRAPH = new JSONArray();
	
	String COLI_VAL = "";
	JSONArray COLI_GRAPH = new JSONArray();
	
	
	int cnt = 0;
	//out.print(rs);
	while(rs.next()) {
		if(!preSeq2.equals(rs.getString("NO"))){
			cnt++;
			
			if(!preSeq.equals("") && !preSeq.equals(rs.getString("NO"))){
				
				cnt = 1;
				
				//System.out.println(preSite + preDate);
				jsonRecord = new JSONObject();
		
				//jsonRecord.put("parentId", parentId);
				jsonRecord.put("FACI_CD", FACI_CD);
				jsonRecord.put("FACI_NM", FACI_NM);
		  		jsonRecord.put("WORK_DT_VAL", WORK_DT_VAL);
		  		jsonRecord.put("WORK_DT_GRAPH", WORK_DT_GRAPH);
		  		jsonRecord.put("PIPE_NUM", PIPE_NUM);
		  		jsonRecord.put("AMT_VAL", AMT_VAL);
		  		jsonRecord.put("AMT_GRAPH", AMT_GRAPH);
		  		jsonRecord.put("BOD_VAL", BOD_VAL);
		  		jsonRecord.put("BOD_GRAPH", BOD_GRAPH);
		  		jsonRecord.put("COD_VAL", COD_VAL);
		  		jsonRecord.put("COD_GRAPH", COD_GRAPH);
		  		jsonRecord.put("SS_VAL", SS_VAL);
		  		jsonRecord.put("SS_GRAPH", SS_GRAPH);
		  		jsonRecord.put("TN_VAL", TN_VAL);
		  		jsonRecord.put("TN_GRAPH", TN_GRAPH);
		  		jsonRecord.put("TP_VAL", TP_VAL);
		  		jsonRecord.put("TP_GRAPH", TP_GRAPH);
		  		jsonRecord.put("COLI_VAL", COLI_VAL);
		  		jsonRecord.put("COLI_GRAPH", COLI_GRAPH);
		  		
		  		jsonArr.add(jsonRecord);
		  		WORK_DT_GRAPH = new JSONArray();
		  		AMT_GRAPH = new JSONArray();
		  		BOD_GRAPH = new JSONArray();
		  		COD_GRAPH  = new JSONArray();
		  		SS_GRAPH  = new JSONArray();
		  		TN_GRAPH  = new JSONArray();
		  		TP_GRAPH  = new JSONArray();
		  		COLI_GRAPH  = new JSONArray();
			}
			//else{
				//parentId = rs.getString("parentId");
				FACI_CD  = rs.getString("FACI_CD");
				FACI_NM  = rs.getString("FACI_NM");
				
				WORK_DT_VAL = rs.getString("WORK_DT_VAL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("WORK_DT_GRAPH"));
				WORK_DT_GRAPH.add(Chart_Data_tmp);
				
				PIPE_NUM  = rs.getString("PIPE_NUM");
				
				
				AMT_VAL  = rs.getString("AMT_VAL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("AMT_GRAPH"));
				AMT_GRAPH.add(Chart_Data_tmp);
				
				
				BOD_VAL = rs.getString("BOD_VAL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("BOD_GRAPH"));
				BOD_GRAPH.add(Chart_Data_tmp);
				
				
				COD_VAL = rs.getString("COD_VAL");
		  		Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("COD_GRAPH"));
				COD_GRAPH.add(Chart_Data_tmp);
				
				
				SS_VAL = rs.getString("SS_VAL");
		  		Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("SS_GRAPH"));
				SS_GRAPH.add(Chart_Data_tmp);
		  		//CHART_TN.add(rs.getString("CHART_TN"));
		  		
		  		
		  		TN_VAL = rs.getString("TN_VAL");
		  		Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("TN_GRAPH"));
				TN_GRAPH.add(Chart_Data_tmp);
		  		//CHART_TP.add(rs.getString("CHART_TP"));
		  		
		  		
		  		TP_VAL = rs.getString("TP_VAL");
		  		Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("TP_GRAPH"));
				TP_GRAPH.add(Chart_Data_tmp);
		  		//CHART_TEMP.add(rs.getString("CHART_TEMP"));
		  		
		  		
		  		COLI_VAL = rs.getString("COLI_VAL");
		  		Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("COLI_GRAPH"));
				COLI_GRAPH.add(Chart_Data_tmp);
		  		//CHART_PH.add(rs.getString("CHART_PH")); 
		  		
		  		
		  		
		  		
			 if(!preSeq.equals(rs.getString("NO")))
				preSeq = rs.getString("NO");
			 
		}else{
			check = preSeq2;
			WORK_DT_VAL = rs.getString("WORK_DT_VAL");
		}
			
  		
	}
	
	jsonRecord = new JSONObject();
	
	if(cnt > 0){
		//jsonRecord.put("parentId", parentId);
		jsonRecord.put("FACI_CD", FACI_CD);
		jsonRecord.put("FACI_NM", FACI_NM);
		jsonRecord.put("WORK_DT_VAL", WORK_DT_VAL);
		jsonRecord.put("WORK_DT_GRAPH", WORK_DT_GRAPH);
		jsonRecord.put("PIPE_NUM", PIPE_NUM);
		jsonRecord.put("AMT_VAL", AMT_VAL);
		jsonRecord.put("AMT_GRAPH", AMT_GRAPH);
		jsonRecord.put("BOD_VAL", BOD_VAL);
		jsonRecord.put("BOD_GRAPH", BOD_GRAPH);
		jsonRecord.put("COD_VAL", COD_VAL);
		jsonRecord.put("COD_GRAPH", COD_GRAPH);
		jsonRecord.put("SS_VAL", SS_VAL);
		jsonRecord.put("SS_GRAPH", SS_GRAPH);
		jsonRecord.put("TN_VAL", TN_VAL);
		jsonRecord.put("TN_GRAPH", TN_GRAPH);
		jsonRecord.put("TP_VAL", TP_VAL);
		jsonRecord.put("TP_GRAPH", TP_GRAPH);
		jsonRecord.put("COLI_VAL", COLI_VAL);
		jsonRecord.put("COLI_GRAPH", COLI_GRAPH);
	}else if(cnt == 0 && check == "9999"){
		jsonRecord.put("WORK_DT_VAL", WORK_DT_VAL);
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