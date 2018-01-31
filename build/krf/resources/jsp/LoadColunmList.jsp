<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
   

try{
	
  //  out.print("request.getRemoteAddr() :"+request.getRemoteAddr());
	//String hiddenSaveValue = request.getParameter("hiddenSaveValue");
	//out.print(hiddenSaveValue);
	String ip = request.getRemoteAddr();
	Object[] hiddenSaveValue = request.getParameterValues("data");
	
	sql = "select S_NM, ";
	sql+= " C_0  ,";
	sql+= " C_1  ,";
	sql+= " C_2  ,";
	sql+= " C_3  ,";
	sql+= " C_4  ,";
	sql+= " C_5  ,";
	sql+= " C_6  ,";
	sql+= " C_7  ,";
	sql+= " C_8  ,";
	sql+= " C_9  ,";
	sql+= " C_10 ,";
	sql+= " C_11 ,";
	sql+= " C_12 ,";
	sql+= " C_13 ,";
	sql+= " C_14 ,";
	sql+= " C_15 ,";
	sql+= " C_16 ,";
	sql+= " C_17 ,";
	sql+= " C_18 ,";
	sql+= " C_19 ,";
	sql+= " C_20 ,";
	sql+= " C_21 ,";
	sql+= " C_22 ,";
	sql+= " C_23 ,";
	sql+= " C_24 ,";
	sql+= " C_25 ,";
	sql+= " C_26 ,";
	sql+= " C_27 ,";
	sql+= " C_28 ,";
	sql+= " C_29 ,";
	sql+= " C_30 ,";
	sql+= " C_31 ,";
	sql+= " C_32 ,";
	sql+= " C_33 ,";
	sql+= " C_34 ,";
	sql+= " C_35 ,";
	sql+= " C_36 ,";
	sql+= " C_37 ,";
	sql+= " C_38 ,";
	sql+= " C_39 ,";
	sql+= " C_40 ,";
	sql+= " C_41 ,";
	sql+= " C_42 ,";
	sql+= " C_43 ,";
	sql+= " C_44 ,";
	sql+= " C_45 ,";
	sql+= " C_46 ,";
	sql+= " C_47 ,";
	sql+= " C_48 ,";
	sql+= " C_49 ,";
	sql+= " C_50 ,";
	sql+= " C_51 ,";
	sql+= " C_52 ,";
	sql+= " C_53 ,";
	sql+= " C_54 ,";
	sql+= " C_55 ,";
	sql+= " C_56 ,";
	sql+= " C_57 ,";
	sql+= " C_58 ,";
	sql+= " C_59 ,";
	sql+= " C_60 ,";
	sql+= " C_61  from visibleColunm where user_ip = '"+ip+"' ORDER BY SYSD ASC";
	
	//System.out.println(sql);
	   stmt = con.createStatement();
	   rs = stmt.executeQuery(sql);
	   
		JSONObject jsonObj  = new JSONObject();
		JSONArray jsonArr = new JSONArray();
		JSONObject jsonRecord = null;
		
		while(rs.next()) {
			jsonRecord = new JSONObject();
			jsonRecord.put("S_NM",rs.getString("S_NM"));
			jsonRecord.put("C_0",rs.getString("C_0"));
			jsonRecord.put("C_1",rs.getString("C_1"));
			jsonRecord.put("C_2",rs.getString("C_2"));
			jsonRecord.put("C_3",rs.getString("C_3"));
			jsonRecord.put("C_4",rs.getString("C_4"));
			jsonRecord.put("C_5", rs.getString("C_5"));
			jsonRecord.put("C_6", rs.getString("C_6"));
			jsonRecord.put("C_7", rs.getString("C_7"));
			jsonRecord.put("C_8", rs.getString("C_8"));
			jsonRecord.put("C_9", rs.getString("C_9"));
			jsonRecord.put("C_10", rs.getString("C_10"));
			jsonRecord.put("C_11", rs.getString("C_11"));
			jsonRecord.put("C_12", rs.getString("C_12"));
			jsonRecord.put("C_13", rs.getString("C_13"));
			jsonRecord.put("C_14", rs.getString("C_14"));
			jsonRecord.put("C_15", rs.getString("C_15"));
			jsonRecord.put("C_16", rs.getString("C_16"));
			jsonRecord.put("C_17", rs.getString("C_17"));
			jsonRecord.put("C_18", rs.getString("C_18"));
			jsonRecord.put("C_19", rs.getString("C_19"));
			jsonRecord.put("C_20", rs.getString("C_20"));
			jsonRecord.put("C_21", rs.getString("C_21"));
			jsonRecord.put("C_22", rs.getString("C_22"));
			jsonRecord.put("C_23", rs.getString("C_23"));
			jsonRecord.put("C_24", rs.getString("C_24"));
			jsonRecord.put("C_25", rs.getString("C_25"));
			jsonRecord.put("C_26", rs.getString("C_26"));
			jsonRecord.put("C_27", rs.getString("C_27"));
			jsonRecord.put("C_28", rs.getString("C_28"));
			jsonRecord.put("C_29", rs.getString("C_29"));
			jsonRecord.put("C_30", rs.getString("C_30"));
			jsonRecord.put("C_31", rs.getString("C_31"));
			jsonRecord.put("C_32", rs.getString("C_32"));
			jsonRecord.put("C_33", rs.getString("C_33"));
			jsonRecord.put("C_34", rs.getString("C_34"));
			jsonRecord.put("C_35", rs.getString("C_35"));
			jsonRecord.put("C_36", rs.getString("C_36"));
			jsonRecord.put("C_37", rs.getString("C_37"));
			jsonRecord.put("C_38", rs.getString("C_38"));
			jsonRecord.put("C_39", rs.getString("C_39"));
			jsonRecord.put("C_40", rs.getString("C_40"));
			jsonRecord.put("C_41", rs.getString("C_41"));
			jsonRecord.put("C_42", rs.getString("C_42"));
			jsonRecord.put("C_43", rs.getString("C_43"));
			jsonRecord.put("C_44", rs.getString("C_44"));
			jsonRecord.put("C_45", rs.getString("C_45"));
			jsonRecord.put("C_46", rs.getString("C_46"));
			jsonRecord.put("C_47", rs.getString("C_47"));
			jsonRecord.put("C_48", rs.getString("C_48"));
			jsonRecord.put("C_49", rs.getString("C_49"));
			jsonRecord.put("C_50", rs.getString("C_50"));
			jsonRecord.put("C_51", rs.getString("C_51"));
			jsonRecord.put("C_52", rs.getString("C_52"));
			jsonRecord.put("C_53", rs.getString("C_53"));
			jsonRecord.put("C_54", rs.getString("C_54"));
			jsonRecord.put("C_55", rs.getString("C_55"));
			jsonRecord.put("C_56", rs.getString("C_56"));
			jsonRecord.put("C_57", rs.getString("C_57"));
			jsonRecord.put("C_58", rs.getString("C_58"));
			jsonRecord.put("C_59", rs.getString("C_59"));
			jsonRecord.put("C_60", rs.getString("C_60"));
			jsonRecord.put("C_61", rs.getString("C_61"));
	  		
	  		
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