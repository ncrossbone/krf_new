<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
   

try{
	
  //  out.print("request.getRemoteAddr() :"+request.getRemoteAddr());
	String ip = request.getRemoteAddr();
//String ip = request.getParameter("ip");

sql = "INSERT INTO KRF_COUNT (USER_IP, LOGIN_DT) VALUES('"+ip+"',SYSDATE)";
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