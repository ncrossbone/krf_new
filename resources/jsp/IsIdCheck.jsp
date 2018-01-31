<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
int cnt =0;
try{
String id = request.getParameter("id");

sql = "SELECT COUNT(*) FROM TUSER WHERE USER_ID='"+id+"'";
stmt = con.createStatement();   
rs = stmt.executeQuery(sql);
while(rs.next()) {
	cnt=rs.getInt("COUNT(*)");
}
}
catch(Exception ex){
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
}
if(cnt==0){
	out.print(0);
}else{
	out.print(1);
}
%>
<%@ include file="dbClose.jsp"%>