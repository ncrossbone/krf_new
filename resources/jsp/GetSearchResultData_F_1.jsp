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
	//방류유량
if(firstSearch.equals("date")){
sql = " SELECT 					" +
" 	      A.FACI_CD                                                                                                       " +
"	      , A.NO /* 순번 참고용 */                                                                                          " +
"	      , A.FACI_NM /* 처리시설명 */                                                                                      " +
"	      , A.WORK_DT AS WORK_DT_VAL   /* 운영일자 */                                                                       " +
"	      , A.WORK_DT AS CHART_DATE                                                                        " +
"	      , B.WORK_DT AS WORK_DT_GRAPH /* 운영일자 */                                                            " +           
"	      , A.DISCHARGE_NUM /* 방류구번호 */                                                                         " +       
"	      , A.DISCHARGE_AMT_PHYS  AS DISCHARGE_AMT_PHYS_VAL   /* 방류량_물리적(㎥/일) */      " +
"	      , B.DISCHARGE_AMT_PHYS  AS DISCHARGE_AMT_PHYS_GRAPH /* 방류량_물리적(㎥/일) */      " +
"	      , A.DISCHARGE_AMT_BIO   AS DISCHARGE_AMT_BIO_VAL    /* 방류량_생물학적(㎥/일) */    " +
"	      , B.DISCHARGE_AMT_BIO   AS DISCHARGE_AMT_BIO_GRAPH  /* 방류량_생물학적(㎥/일) */    " +
"	      , A.DISCHARGE_AMT_HIGHTEC  AS DISCHARGE_AMT_HIGHTEC_VAL   /* 방류량_고도(㎥/일) */  " +
"	      , B.DISCHARGE_AMT_HIGHTEC  AS DISCHARGE_AMT_HIGHTEC_GRAPH /* 방류량_고도(㎥/일) */   " +
"	      , A.BOD   AS BOD_VAL   /* BOD(㎎/ℓ) */                                             " +
"	      , B.BOD   AS BOD_GRAPH /* BOD(㎎/ℓ) */                                             " +
"	      , A.COD   AS COD_VAL   /* COD(㎎/ℓ) */                                             " +
"	      , B.COD   AS COD_GRAPH /* COD(㎎/ℓ) */                                             " +
"	      , A.SS    AS SS_VAL    /* SS(㎎/ℓ) */                                              " +
"	      , B.SS    AS SS_GRAPH  /* SS(㎎/ℓ) */                                              " +
"	      , A.TN    AS TN_VAL    /* TN(㎎/ℓ) */                                              " +
"	      , B.TN    AS TN_GRAPH  /* TN(㎎/ℓ) */                                              " +
"	      , A.TP    AS TP_VAL    /* TP(㎎/ℓ) */                                              " +
"	      , B.TP    AS TP_GRAPH  /* TP(㎎/ℓ) */                                              " +
"	      , A.COLI  AS COLI_VAL     /* 대장균군수(총대장균군수) */                               " +
"	      , B.COLI  AS COLI_GRAPH   /* 대장균군수(총대장균군수) */                               " +
"	      , A.DISCHARGE_DISINFECT /* 방류수소독방법 */                                            " +                          
"	      , A.DISCHARGE_FACI_NM   /* 연계처리시설명 */    " +
"   FROM (SELECT RANK() OVER(PARTITION BY FACI_CD, DISCHARGE_NUM ORDER BY FACI_CD, DISCHARGE_NUM, WORK_DT DESC) AS NO,    " +
"                ADM_CD,                                                                                                  " +
"                YYYY,                                                                                                    " +
"                FACI_NM,                                                                                                 " +
"                FACI_CD,                                                                                                 " +
"                WORK_DT,                                                                                                 " +
"                DISCHARGE_NUM,                                                                                           " +
"                DISCHARGE_AMT_PHYS,                                                                                      " +
"                DISCHARGE_AMT_BIO,                                                                                       " +
"                DISCHARGE_AMT_HIGHTEC,                                                                                   " +
"                BOD,                                                                                                     " +
"                COD,                                                                                                     " +
"                SS,                                                                                                      " +
"                TN,                                                                                                      " +
"                TP,                                                                                                      " +
"                COLI,                                                                                                    " +
"                DISCHARGE_DISINFECT,                                                                                     " +
"                DISCHARGE_FACI_NM,                                                                                       " +
"                DISCHARGE_FACI_CD,                                                                                       " +
"                DISCHARGE_ADM_CD,                                                                                        " +
"                DISCHARGE_RIVER_NM,                                                                                      " +
"                DISCHARGE_RIVER_CD,                                                                                      " +
"                DISCHARGE_AMT                                                                                            " +
"           FROM (                                                                                                        " +
"                 SELECT TT.ADM_CD,                                                                                       " +
"                        T.YYYY,                                                                                          " +
"                        FACI_NM,                                                                                         " +
"                        FACI_CD,                                                                                         " +
"                        WORK_DT,                                                                                         " +
"                        DISCHARGE_NUM,                                                                                   " +
"                        DISCHARGE_AMT_PHYS,                                                                              " +
"                        DISCHARGE_AMT_BIO,                                                                               " +
"                        DISCHARGE_AMT_HIGHTEC,                                                                           " +
"                        BOD,                                                                                             " +
"                        COD,                                                                                             " +
"                        SS,                                                                                              " +
"                        TN,                                                                                              " +
"                        TP,                                                                                              " +
"                        COLI,                                                                                            " +
"                        DISCHARGE_DISINFECT,                                                                             " +
"                        DISCHARGE_FACI_NM,                                                                               " +
"                        DISCHARGE_FACI_CD,                                                                               " +
"                        DISCHARGE_ADM_CD,                                                                                " +
"                        DISCHARGE_RIVER_NM,                                                                              " +
"                        DISCHARGE_RIVER_CD,                                                                              " +
"                        DISCHARGE_AMT                                                                                    " +
"                   FROM VPLA_FACI_OUT_TOTAL T ,                                                                          " +
"                        COM_DISTRICT_RAW TT,                                                                             " +
"                        KESTI_WATER_ALL_MAP C                                                                            " +
"                  WHERE T.ADM_CD = C.ADM_CD                                                                              " +
"                    AND T.ADM_CD = TT.ADM_CD                                                                             " +
"                )                                                                                                        " +
"        ) A                                                                                                              " +
"      , (SELECT RANK() OVER(PARTITION BY FACI_CD, DISCHARGE_NUM ORDER BY FACI_CD, DISCHARGE_NUM, WORK_DT DESC) AS NO,    " +
"                ADM_CD,                                                                                                  " +
"                YYYY,                                                                                                    " +
"                FACI_NM,                                                                                                 " +
"                FACI_CD,                                                                                                 " +
"                WORK_DT,                                                                                                 " +
"                DISCHARGE_NUM,                                                                                           " +
"                DISCHARGE_AMT_PHYS,                                                                                      " +
"                DISCHARGE_AMT_BIO,                                                                                       " +
"                DISCHARGE_AMT_HIGHTEC,                                                                                   " +
"                BOD,                                                                                                     " +
"                COD,                                                                                                     " +
"                SS,                                                                                                      " +
"                TN,                                                                                                      " +
"                TP,                                                                                                      " +
"                COLI,                                                                                                    " +
"                DISCHARGE_DISINFECT,                                                                                     " +
"                DISCHARGE_FACI_NM,                                                                                       " +
"                DISCHARGE_FACI_CD,                                                                                       " +
"                DISCHARGE_ADM_CD,                                                                                        " +
"                DISCHARGE_RIVER_NM,                                                                                      " +
"                DISCHARGE_RIVER_CD,                                                                                      " +
"                DISCHARGE_AMT                                                                                            " +
"           FROM (                                                                                                        " +
"                 SELECT TT.ADM_CD,                                                                                       " +
"                        T.YYYY,                                                                                          " +
"                        FACI_NM,                                                                                         " +
"                        FACI_CD,                                                                                         " +
"                        WORK_DT,                                                                                         " +
"                        DISCHARGE_NUM,                                                                                   " +
"                        DISCHARGE_AMT_PHYS,                                                                              " +
"                        DISCHARGE_AMT_BIO,                                                                               " +
"                        DISCHARGE_AMT_HIGHTEC,                                                                           " +
"                        BOD,                                                                                             " +
"                        COD,                                                                                             " +
"                        SS,                                                                                              " +
"                        TN,                                                                                              " +
"                        TP,                                                                                              " +
"                        COLI,                                                                                            " +
"                        DISCHARGE_DISINFECT,                                                                             " +
"                        DISCHARGE_FACI_NM,                                                                               " +
"                        DISCHARGE_FACI_CD,                                                                               " +
"                        DISCHARGE_ADM_CD,                                                                                " +
"                        DISCHARGE_RIVER_NM,                                                                              " +
"                        DISCHARGE_RIVER_CD,                                                                              " +
"                        DISCHARGE_AMT                                                                                    " +
"                   FROM VPLA_FACI_OUT_TOTAL T ,                                                                          " +
"                        COM_DISTRICT_RAW TT,                                                                             " +
"                        KESTI_WATER_ALL_MAP C                                                                            " +
"                  WHERE T.ADM_CD = C.ADM_CD                                                                              " +
"                    AND T.ADM_CD = TT.ADM_CD                                                                             " +
"                )                                                                                                        " +
"        ) B                                                                                                              " +
"  WHERE A.FACI_CD =  B.FACI_CD                                                                                           " +
"    AND A.DISCHARGE_NUM  =  B.DISCHARGE_NUM                                                                              " +
"    AND A.ADM_CD  =  B.ADM_CD                                                                                            " +
"    AND A.NO BETWEEN B.NO -4 AND B.NO                                                                                    " +
"    AND A.FACI_CD IN (" + siteIds + ")                                                                                       "+
"    AND SUBSTR(A.WORK_DT, 1, 4)||SUBSTR(A.WORK_DT, 6, 2) BETWEEN '"+startYYYYMM+"' AND '"+endYYYYMM+"'               " +
"  ORDER BY A.FACI_NM, A.DISCHARGE_NUM, A.WORK_DT DESC, B.WORK_DT                                                    " ;
}else{
	sql = " SELECT '9999' AS NO , MAX(WORK_DT) AS WORK_DT_VAL FROM VPLA_FACI_OUT_TOTAL WHERE FACI_CD IN (" + siteIds + ")	";
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
	
	String FACI_CD = "";
	String FACI_NM = "";
	
	String WORK_DT_VAL = "";
	JSONArray WORK_DT_GRAPH = new JSONArray();
	
	String DISCHARGE_NUM = "";
	
	String DISCHARGE_AMT_PHYS_VAL = "";
	JSONArray DISCHARGE_AMT_PHYS_GRAPH = new JSONArray();
	JSONArray Chart_Data_tmp = new JSONArray();
	
	String DISCHARGE_AMT_BIO_VAL = "";
	JSONArray DISCHARGE_AMT_BIO_GRAPH = new JSONArray();
	
	String DISCHARGE_AMT_HIGHTEC_VAL = "";
	JSONArray DISCHARGE_AMT_HIGHTEC_GRAPH = new JSONArray();
	
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
	
	
	String DISCHARGE_DISINFECT = "";
	String DISCHARGE_FACI_NM = "";
	
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
		  		jsonRecord.put("DISCHARGE_NUM", DISCHARGE_NUM);
		  		jsonRecord.put("DISCHARGE_AMT_PHYS_VAL", DISCHARGE_AMT_PHYS_VAL);
		  		jsonRecord.put("DISCHARGE_AMT_PHYS_GRAPH", DISCHARGE_AMT_PHYS_GRAPH);
		  		jsonRecord.put("DISCHARGE_AMT_BIO_VAL", DISCHARGE_AMT_BIO_VAL);
		  		jsonRecord.put("DISCHARGE_AMT_BIO_GRAPH", DISCHARGE_AMT_BIO_GRAPH);
		  		jsonRecord.put("DISCHARGE_AMT_HIGHTEC_VAL", DISCHARGE_AMT_HIGHTEC_VAL);
		  		jsonRecord.put("DISCHARGE_AMT_HIGHTEC_GRAPH", DISCHARGE_AMT_HIGHTEC_GRAPH);
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
		  		jsonRecord.put("DISCHARGE_DISINFECT", DISCHARGE_DISINFECT);
		  		jsonRecord.put("DISCHARGE_FACI_NM", DISCHARGE_FACI_NM);
		  		
		  		jsonArr.add(jsonRecord);
		  		WORK_DT_GRAPH = new JSONArray();
		  		DISCHARGE_AMT_PHYS_GRAPH = new JSONArray();
		  		DISCHARGE_AMT_BIO_GRAPH = new JSONArray();
		  		DISCHARGE_AMT_HIGHTEC_GRAPH = new JSONArray();
		  		BOD_GRAPH = new JSONArray();
		  		COD_GRAPH  = new JSONArray();
		  		SS_GRAPH  = new JSONArray();
		  		TN_GRAPH  = new JSONArray();
		  		TP_GRAPH  = new JSONArray();
		  		COLI_GRAPH  = new JSONArray();
			}
				//parentId = rs.getString("parentId");
				FACI_CD  = rs.getString("FACI_CD");
				FACI_NM  = rs.getString("FACI_NM");
				
				WORK_DT_VAL = rs.getString("WORK_DT_VAL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("CHART_DATE").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("WORK_DT_GRAPH"));
				WORK_DT_GRAPH.add(Chart_Data_tmp);
				
				DISCHARGE_NUM  = rs.getString("DISCHARGE_NUM");
				
				
				DISCHARGE_AMT_PHYS_VAL  = rs.getString("DISCHARGE_AMT_PHYS_VAL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("DISCHARGE_AMT_PHYS_GRAPH"));
				DISCHARGE_AMT_PHYS_GRAPH.add(Chart_Data_tmp);
				
				
				DISCHARGE_AMT_BIO_VAL  = rs.getString("DISCHARGE_AMT_BIO_VAL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("DISCHARGE_AMT_BIO_GRAPH"));
				DISCHARGE_AMT_BIO_GRAPH.add(Chart_Data_tmp);
				
				
				DISCHARGE_AMT_HIGHTEC_VAL  = rs.getString("DISCHARGE_AMT_HIGHTEC_VAL");
				Chart_Data_tmp = new JSONArray();
				Chart_Data_tmp.add(cnt + rs.getString("WORK_DT_GRAPH").replace("-", ""));
				Chart_Data_tmp.add(rs.getString("DISCHARGE_AMT_HIGHTEC_GRAPH"));
				DISCHARGE_AMT_HIGHTEC_GRAPH.add(Chart_Data_tmp);
				
				
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
		  		
		  		
		  		
		  		DISCHARGE_DISINFECT = rs.getString("DISCHARGE_DISINFECT");
		  		DISCHARGE_FACI_NM = rs.getString("DISCHARGE_FACI_NM");
				
		  		
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
		jsonRecord.put("DISCHARGE_NUM", DISCHARGE_NUM);
		jsonRecord.put("DISCHARGE_AMT_PHYS_VAL", DISCHARGE_AMT_PHYS_VAL);
		jsonRecord.put("DISCHARGE_AMT_PHYS_GRAPH", DISCHARGE_AMT_PHYS_GRAPH);
		jsonRecord.put("DISCHARGE_AMT_BIO_VAL", DISCHARGE_AMT_BIO_VAL);
		jsonRecord.put("DISCHARGE_AMT_BIO_GRAPH", DISCHARGE_AMT_BIO_GRAPH);
		jsonRecord.put("DISCHARGE_AMT_HIGHTEC_VAL", DISCHARGE_AMT_HIGHTEC_VAL);
		jsonRecord.put("DISCHARGE_AMT_HIGHTEC_GRAPH", DISCHARGE_AMT_HIGHTEC_GRAPH);
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
		jsonRecord.put("DISCHARGE_DISINFECT", DISCHARGE_DISINFECT);
		jsonRecord.put("DISCHARGE_FACI_NM", DISCHARGE_FACI_NM);
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