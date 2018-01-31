<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
String pwd ="";
try{
String id = request.getParameter("id");


sql = "SELECT * FROM TUSER WHERE USER_ID='"+id+"'";
stmt = con.createStatement();   
rs = stmt.executeQuery(sql);
while(rs.next()) {
	pwd=rs.getString("USER_PW");
}
}
catch(Exception ex){
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
}

	out.print(pwd);

%>
<%@ include file="dbClose.jsp"%>