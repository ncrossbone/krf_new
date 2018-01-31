<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
String value ="";
try{
	
	Object id = session.getAttribute("id");


sql = "SELECT * FROM KRF_CONFIG_VAL WHERE USER_ID='"+id+"'";
stmt = con.createStatement();   
rs = stmt.executeQuery(sql);
while(rs.next()) {
	value=rs.getString("CONF_VAL");
}
}
catch(Exception ex){
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
}

	out.print(value);

%>
<%@ include file="dbClose.jsp"%>