<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%int cnt =0;
Object id = session.getAttribute("id");
try{


sql = "SELECT COUNT(*) FROM KRF_CONFIG_VAL WHERE USER_ID='"+id+"'";
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
try{
String value = request.getParameter("value");

if(cnt==0){
sql = "INSERT INTO KRF_CONFIG_VAL(USER_ID,CONF_VAL) VALUES('"+id+"','"+value+"')";
}else{
	sql="UPDATE KRF_CONFIG_VAL SET CONF_VAL=('"+value+"') WHERE USER_ID='"+id+"'";
}
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