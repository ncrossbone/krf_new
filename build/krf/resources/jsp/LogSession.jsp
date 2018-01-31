<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
try{
	String id = request.getParameter("id");
session.setAttribute("id",id);
}catch(Exception ex){
	out.println("false");
}



try{
String id = request.getParameter("id");

sql = "INSERT INTO KRF_ACCOUNT_LOG (USER_ID, LOGIN_DT) VALUES('"+id+"',SYSDATE)";
stmt = con.createStatement();   
rs = stmt.executeQuery(sql);

}
catch(Exception ex){
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
}


%>
<%@ include file="dbClose.jsp"%>