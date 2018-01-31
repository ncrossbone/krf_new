<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
   

try{
	
	String ip = request.getRemoteAddr();
	String type = request.getParameter("type");
	String node = request.getParameter("node");
	String parentId = request.getParameter("parentId");
	String data = request.getParameter("data");
	String id = request.getParameter("id");
  
sql = "INSERT INTO searchLogTb (USER_IP, TYPE, SEARCH_DATE , CLICK_NODE ,CLICK_PARENT_NODE ,CLICK_DATA ,CLICK_DATA_ID) VALUES('"+ip+"', '"+type+"' ,SYSDATE ,'"+node+"','"+parentId+"','"+data+"','"+id+"' )";

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