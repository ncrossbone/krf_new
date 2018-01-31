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
	
	Object[] catDid = request.getParameterValues("catDid");
	String year = request.getParameter("year");
	
	sql = " with tbl_PLA_LANDUSE as (																																						";
	sql += "     select YYYY                                                                                      ";
	sql += "          , WS_NM                                                                                     ";
	sql += "          , MB_NM                                                                                     ";
	sql += "          , SB_NM                                                                                     ";
	sql += "          , SB_ID                                                                                     ";
	sql += "          , ADM_CD                                                                                    ";
	sql += "          , CAT_DID                                                                                   ";
	sql += "          , DO_NM||CTY_NM||DONG_NM||RI_NM as addr                                                     ";
	sql += "          , FINAL_PERCENTAGE                                                                          ";
	sql += "          , TP_TYPE                                                                                   ";
	sql += "          , AREA_SUM                                                                                  ";
	sql += "          , AREA_RICE                                                                                 ";
	sql += "          , AREA_FIELD                                                                                ";
	sql += "          , AREA_FLUIT                                                                                ";
	sql += "          , AREA_STOCKFARM                                                                            ";
	sql += "          , AREA_FOREST                                                                               ";
	sql += "          , AREA_SPA                                                                                  ";
	sql += "          , AREA_SALTFIELD                                                                            ";
	sql += "          , AREA_PLATEAU                                                                              ";
	sql += "          , AREA_FACTORY                                                                              ";
	sql += "          , AREA_EDUCATION                                                                            ";
	sql += "          , AREA_PARKING                                                                              ";
	sql += "          , AREA_OILING                                                                               ";
	sql += "          , AREA_WAREHOUSE                                                                            ";
	sql += "          , AREA_ROAD                                                                                 ";
	sql += "          , AREA_RAILROAD                                                                             ";
	sql += "          , AREA_RIVER                                                                                ";
	sql += "          , AREA_EMBANKMENT                                                                           ";
	sql += "          , AREA_WATERROAD                                                                            ";
	sql += "          , AREA_WATERRANGE                                                                           ";
	sql += "          , AREA_FISHFARM                                                                             ";
	sql += "          , AREA_WATER                                                                                ";
	sql += "          , AREA_PARK                                                                                 ";
	sql += "          , AREA_HEALTH                                                                               ";
	sql += "          , AREA_AMUSEMENTPARK                                                                        ";
	sql += "          , AREA_RELIGION                                                                             ";
	sql += "          , AREA_HISTORICAL                                                                           ";
	sql += "          , AREA_GRAVEYARD                                                                            ";
	sql += "          , AREA_MIXED                                                                                ";
	sql += "          , GOLF_RANGE                                                                                ";
	sql += "       from PLA_LANDUSE_FOR_CAT                                                                       ";
	if(catDid.length != 0){
		sql += "       WHERE CAT_DID IN (                                                                       ";
		for(int i=0;i<catDid.length;i++){
			if(i == catDid.length-1){
				sql += "	'"+catDid[i]+"' )			";
			}else{
				sql += "	'"+catDid[i]+"',			";
			}
			
		}
	}
	sql += "  AND YYYY ='"+year+"'                                 ";
	sql += "     )                                                                                                ";
	sql += " select YYYY               /*조사년도*/                                                               ";
	sql += "      , WS_NM              /*대권역*/                                                                 ";
	sql += "      , MB_NM              /*중권역*/                                                                 ";
	sql += "      , SB_NM              /*소권역*/                                                                 ";
	sql += "      , CAT_DID            /*집수구역*/                                                               ";
	sql += "      , ADDR               /*법정동리*/                                                               ";
	sql += "      , FINAL_PERCENTAGE   /*점유율*/                                                                 ";
	sql += "      , TP_TYPE            /*개별처리시설유형*/                                                       ";
	sql += "      , AREA_SUM           /*지목별 면적합계(㎡)*/                                                    ";
	sql += "      , AREA_RICE          /*전 면적(㎡)*/                                                            ";
	sql += "      , AREA_FIELD         /*답 면적(㎡)*/                                                            ";
	sql += "      , AREA_FLUIT         /*과수원 면적(㎡)*/                                                        ";
	sql += "      , AREA_STOCKFARM     /*목장용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_FOREST        /*임야 면적(㎡)*/                                                          ";
	sql += "      , AREA_SPA           /*광천지 면적(㎡)*/                                                        ";
	sql += "      , AREA_SALTFIELD     /*염전 면적(㎡)*/                                                          ";
	sql += "      , AREA_PLATEAU       /*대지 면적(㎡)*/                                                          ";
	sql += "      , AREA_FACTORY       /*공장용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_EDUCATION     /*학교용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_PARKING       /*주차장 면적(㎡)*/                                                        ";
	sql += "      , AREA_OILING        /*주유소용지 면적(㎡)*/                                                    ";
	sql += "      , AREA_WAREHOUSE     /*창고용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_ROAD          /*도로 면적(㎡)*/                                                          ";
	sql += "      , AREA_RAILROAD      /*철도용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_RIVER         /*하천 면적(㎡)*/                                                          ";
	sql += "      , AREA_EMBANKMENT    /*제방 면적(㎡)*/                                                          ";
	sql += "      , AREA_WATERROAD     /*구거 면적(㎡)*/                                                          ";
	sql += "      , AREA_WATERRANGE    /*유지 면적(㎡)*/                                                          ";
	sql += "      , AREA_FISHFARM      /*양어장 면적(㎡)*/                                                        ";
	sql += "      , AREA_WATER         /*수도용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_PARK          /*공원 면적(㎡)*/                                                          ";
	sql += "      , AREA_HEALTH        /*체육용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_AMUSEMENTPARK /*유원지 면적(㎡)*/                                                        ";
	sql += "      , AREA_RELIGION      /*종교용지 면적(㎡)*/                                                      ";
	sql += "      , AREA_HISTORICAL    /*사적지 면적(㎡)*/                                                        ";
	sql += "      , AREA_GRAVEYARD     /*묘지 면적(㎡)*/                                                          ";
	sql += "      , AREA_MIXED         /*잡종지 면적(㎡)*/                                                        ";
	sql += "      , GOLF_RANGE         /*골프장 면적(㎡)*/                                                        ";
	sql += "   from (                                                                                             ";
	sql += "         select '' as YYYY                                                                            ";
	sql += "              , '' as WS_NM                                                                           ";
	sql += "              , '' as MB_NM                                                                           ";
	sql += "              , '' as SB_NM                                                                           ";
	sql += "              , '' as SB_ID                                                                           ";
	sql += "              , '' as ADM_CD                                                                          ";
	sql += "              , '' as CAT_DID                                                                         ";
	sql += "              , '총계' as addr                                                                        ";
	sql += "              , '' as FINAL_PERCENTAGE                                                                ";
	sql += "              , '' as TP_TYPE                                                                         ";
	sql += "              , sum(AREA_SUM          ) as AREA_SUM                                                   ";
	sql += "              , sum(AREA_RICE         ) as AREA_RICE                                                  ";
	sql += "              , sum(AREA_FIELD        ) as AREA_FIELD                                                 ";
	sql += "              , sum(AREA_FLUIT        ) as AREA_FLUIT                                                 ";
	sql += "              , sum(AREA_STOCKFARM    ) as AREA_STOCKFARM                                             ";
	sql += "              , sum(AREA_FOREST       ) as AREA_FOREST                                                ";
	sql += "              , sum(AREA_SPA          ) as AREA_SPA                                                   ";
	sql += "              , sum(AREA_SALTFIELD    ) as AREA_SALTFIELD                                             ";
	sql += "              , sum(AREA_PLATEAU      ) as AREA_PLATEAU                                               ";
	sql += "              , sum(AREA_FACTORY      ) as AREA_FACTORY                                               ";
	sql += "              , sum(AREA_EDUCATION    ) as AREA_EDUCATION                                             ";
	sql += "              , sum(AREA_PARKING      ) as AREA_PARKING                                               ";
	sql += "              , sum(AREA_OILING       ) as AREA_OILING                                                ";
	sql += "              , sum(AREA_WAREHOUSE    ) as AREA_WAREHOUSE                                             ";
	sql += "              , sum(AREA_ROAD         ) as AREA_ROAD                                                  ";
	sql += "              , sum(AREA_RAILROAD     ) as AREA_RAILROAD                                              ";
	sql += "              , sum(AREA_RIVER        ) as AREA_RIVER                                                 ";
	sql += "              , sum(AREA_EMBANKMENT   ) as AREA_EMBANKMENT                                            ";
	sql += "              , sum(AREA_WATERROAD    ) as AREA_WATERROAD                                             ";
	sql += "              , sum(AREA_WATERRANGE   ) as AREA_WATERRANGE                                            ";
	sql += "              , sum(AREA_FISHFARM     ) as AREA_FISHFARM                                              ";
	sql += "              , sum(AREA_WATER        ) as AREA_WATER                                                 ";
	sql += "              , sum(AREA_PARK         ) as AREA_PARK                                                  ";
	sql += "              , sum(AREA_HEALTH       ) as AREA_HEALTH                                                ";
	sql += "              , sum(AREA_AMUSEMENTPARK) as AREA_AMUSEMENTPARK                                         ";
	sql += "              , sum(AREA_RELIGION     ) as AREA_RELIGION                                              ";
	sql += "              , sum(AREA_HISTORICAL   ) as AREA_HISTORICAL                                            ";
	sql += "              , sum(AREA_GRAVEYARD    ) as AREA_GRAVEYARD                                             ";
	sql += "              , sum(AREA_MIXED        ) as AREA_MIXED                                                 ";
	sql += "              , sum(GOLF_RANGE        ) as GOLF_RANGE                                                 ";
	sql += "           from tbl_PLA_LANDUSE                                                                       ";
	sql += "         union                                                                                        ";
	sql += "         select YYYY                                                                                  ";
	sql += "              , WS_NM                                                                                 ";
	sql += "              , MB_NM                                                                                 ";
	sql += "              , SB_NM                                                                                 ";
	sql += "              , SB_ID                                                                                 ";
	sql += "              , '' as ADM_CD                                                                          ";
	sql += "              , CAT_DID                                                                               ";
	sql += "              , '소계' as addr                                                                        ";
	sql += "              , '' as FINAL_PERCENTAGE                                                                ";
	sql += "              , '' as TP_TYPE                                                                         ";
	sql += "              , sum(AREA_SUM          ) as AREA_SUM                                                   ";
	sql += "              , sum(AREA_RICE         ) as AREA_RICE                                                  ";
	sql += "              , sum(AREA_FIELD        ) as AREA_FIELD                                                 ";
	sql += "              , sum(AREA_FLUIT        ) as AREA_FLUIT                                                 ";
	sql += "              , sum(AREA_STOCKFARM    ) as AREA_STOCKFARM                                             ";
	sql += "              , sum(AREA_FOREST       ) as AREA_FOREST                                                ";
	sql += "              , sum(AREA_SPA          ) as AREA_SPA                                                   ";
	sql += "              , sum(AREA_SALTFIELD    ) as AREA_SALTFIELD                                             ";
	sql += "              , sum(AREA_PLATEAU      ) as AREA_PLATEAU                                               ";
	sql += "              , sum(AREA_FACTORY      ) as AREA_FACTORY                                               ";
	sql += "              , sum(AREA_EDUCATION    ) as AREA_EDUCATION                                             ";
	sql += "              , sum(AREA_PARKING      ) as AREA_PARKING                                               ";
	sql += "              , sum(AREA_OILING       ) as AREA_OILING                                                ";
	sql += "              , sum(AREA_WAREHOUSE    ) as AREA_WAREHOUSE                                             ";
	sql += "              , sum(AREA_ROAD         ) as AREA_ROAD                                                  ";
	sql += "              , sum(AREA_RAILROAD     ) as AREA_RAILROAD                                              ";
	sql += "              , sum(AREA_RIVER        ) as AREA_RIVER                                                 ";
	sql += "              , sum(AREA_EMBANKMENT   ) as AREA_EMBANKMENT                                            ";
	sql += "              , sum(AREA_WATERROAD    ) as AREA_WATERROAD                                             ";
	sql += "              , sum(AREA_WATERRANGE   ) as AREA_WATERRANGE                                            ";
	sql += "              , sum(AREA_FISHFARM     ) as AREA_FISHFARM                                              ";
	sql += "              , sum(AREA_WATER        ) as AREA_WATER                                                 ";
	sql += "              , sum(AREA_PARK         ) as AREA_PARK                                                  ";
	sql += "              , sum(AREA_HEALTH       ) as AREA_HEALTH                                                ";
	sql += "              , sum(AREA_AMUSEMENTPARK) as AREA_AMUSEMENTPARK                                         ";
	sql += "              , sum(AREA_RELIGION     ) as AREA_RELIGION                                              ";
	sql += "              , sum(AREA_HISTORICAL   ) as AREA_HISTORICAL                                            ";
	sql += "              , sum(AREA_GRAVEYARD    ) as AREA_GRAVEYARD                                             ";
	sql += "              , sum(AREA_MIXED        ) as AREA_MIXED                                                 ";
	sql += "              , sum(GOLF_RANGE        ) as GOLF_RANGE                                                 ";
	sql += "           from tbl_PLA_LANDUSE                                                                       ";
	sql += "          GROUP BY YYYY, WS_NM, MB_NM, SB_NM, SB_ID, CAT_DID                                          ";
	sql += "         union                                                                                        ";
	sql += "         select YYYY                                                                                  ";
	sql += "              , WS_NM                                                                                 ";
	sql += "              , MB_NM                                                                                 ";
	sql += "              , SB_NM                                                                                 ";
	sql += "              , SB_ID                                                                                 ";
	sql += "              , ADM_CD                                                                                ";
	sql += "              , CAT_DID                                                                               ";
	sql += "              , addr                                                                                  ";
	sql += "              , FINAL_PERCENTAGE                                                                      ";
	sql += "              , TP_TYPE                                                                               ";
	sql += "              , AREA_SUM                                                                              ";
	sql += "              , AREA_RICE                                                                             ";
	sql += "              , AREA_FIELD                                                                            ";
	sql += "              , AREA_FLUIT                                                                            ";
	sql += "              , AREA_STOCKFARM                                                                        ";
	sql += "              , AREA_FOREST                                                                           ";
	sql += "              , AREA_SPA                                                                              ";
	sql += "              , AREA_SALTFIELD                                                                        ";
	sql += "              , AREA_PLATEAU                                                                          ";
	sql += "              , AREA_FACTORY                                                                          ";
	sql += "              , AREA_EDUCATION                                                                        ";
	sql += "              , AREA_PARKING                                                                          ";
	sql += "              , AREA_OILING                                                                           ";
	sql += "              , AREA_WAREHOUSE                                                                        ";
	sql += "              , AREA_ROAD                                                                             ";
	sql += "              , AREA_RAILROAD                                                                         ";
	sql += "              , AREA_RIVER                                                                            ";
	sql += "              , AREA_EMBANKMENT                                                                       ";
	sql += "              , AREA_WATERROAD                                                                        ";
	sql += "              , AREA_WATERRANGE                                                                       ";
	sql += "              , AREA_FISHFARM                                                                         ";
	sql += "              , AREA_WATER                                                                            ";
	sql += "              , AREA_PARK                                                                             ";
	sql += "              , AREA_HEALTH                                                                           ";
	sql += "              , AREA_AMUSEMENTPARK                                                                    ";
	sql += "              , AREA_RELIGION                                                                         ";
	sql += "              , AREA_HISTORICAL                                                                       ";
	sql += "              , AREA_GRAVEYARD                                                                        ";
	sql += "              , AREA_MIXED                                                                            ";
	sql += "              , GOLF_RANGE                                                                            ";
	sql += "           from tbl_PLA_LANDUSE                                                                       ";
	sql += "        )                                                                                             ";
	sql += "  ORDER BY DECODE(ADDR,'총계',1,2), SB_ID, CAT_DID, DECODE(ADDR,'소계',1,2), ADM_CD                   ";
	
	
	
	
	
    
//System.out.println(sql);
stmt = con.createStatement();
rs = stmt.executeQuery(sql);

	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		
		jsonRecord.put("YYYY",rs.getString("YYYY"));
		jsonRecord.put("WS_NM",rs.getString("WS_NM"));
		jsonRecord.put("MB_NM",rs.getString("MB_NM"));
		jsonRecord.put("SB_NM",rs.getString("SB_NM"));
		jsonRecord.put("ADDR",rs.getString("ADDR"));
		jsonRecord.put("CAT_DID",rs.getString("CAT_DID"));
		jsonRecord.put("FINAL_PERCENTAGE",rs.getString("FINAL_PERCENTAGE"));
		jsonRecord.put("TP_TYPE",rs.getString("TP_TYPE"));
		jsonRecord.put("AREA_SUM",rs.getString("AREA_SUM"));
		jsonRecord.put("AREA_RICE",rs.getString("AREA_RICE"));
		jsonRecord.put("AREA_FIELD",rs.getString("AREA_FIELD"));
		jsonRecord.put("AREA_FLUIT",rs.getString("AREA_FLUIT"));
		jsonRecord.put("AREA_STOCKFARM",rs.getString("AREA_STOCKFARM"));
		jsonRecord.put("AREA_FOREST",rs.getString("AREA_FOREST"));
		jsonRecord.put("AREA_SPA",rs.getString("AREA_SPA"));
		jsonRecord.put("AREA_SALTFIELD",rs.getString("AREA_SALTFIELD"));
		jsonRecord.put("AREA_PLATEAU",rs.getString("AREA_PLATEAU"));
		jsonRecord.put("AREA_FACTORY",rs.getString("AREA_FACTORY"));
		jsonRecord.put("AREA_EDUCATION",rs.getString("AREA_EDUCATION"));
		jsonRecord.put("AREA_PARKING",rs.getString("AREA_PARKING"));
		jsonRecord.put("AREA_OILING",rs.getString("AREA_OILING"));
		jsonRecord.put("AREA_WAREHOUSE",rs.getString("AREA_WAREHOUSE"));
		jsonRecord.put("AREA_ROAD",rs.getString("AREA_ROAD"));
		jsonRecord.put("AREA_RAILROAD",rs.getString("AREA_RAILROAD"));
		jsonRecord.put("AREA_RIVER",rs.getString("AREA_RIVER"));
		jsonRecord.put("AREA_EMBANKMENT",rs.getString("AREA_EMBANKMENT"));
		jsonRecord.put("AREA_WATERROAD",rs.getString("AREA_WATERROAD"));
		jsonRecord.put("AREA_WATERRANGE",rs.getString("AREA_WATERRANGE"));
		jsonRecord.put("AREA_FISHFARM",rs.getString("AREA_FISHFARM"));
		jsonRecord.put("AREA_WATER",rs.getString("AREA_WATER"));
		jsonRecord.put("AREA_PARK",rs.getString("AREA_PARK"));
		jsonRecord.put("AREA_HEALTH",rs.getString("AREA_HEALTH"));
		jsonRecord.put("AREA_AMUSEMENTPARK",rs.getString("AREA_AMUSEMENTPARK"));
		jsonRecord.put("AREA_RELIGION",rs.getString("AREA_RELIGION"));
		jsonRecord.put("AREA_HISTORICAL",rs.getString("AREA_HISTORICAL"));
		jsonRecord.put("AREA_GRAVEYARD",rs.getString("AREA_GRAVEYARD"));
		jsonRecord.put("AREA_MIXED",rs.getString("AREA_MIXED"));
		jsonRecord.put("GOLF_RANGE",rs.getString("GOLF_RANGE"));
		
		jsonArr.add(jsonRecord);
		
	}
	
	jsonObj.put("data", jsonArr);
//console.info(jsonObj);
out.print(jsonObj);
//out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>