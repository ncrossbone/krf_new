<%@ page language="java" import="java.sql.*" %>
<%
//String DB_URL = "jdbc:oracle:thin:@cetech.iptime.org:11521:orcl";
String DB_URL = "jdbc:oracle:thin:@cetech.iptime.org:31521:orcl";
//String DB_USER    = "SGIS_INTRA";
String DB_USER    = "WATER";
//String DB_PASSWORD = "SGIS_INTRA";
String DB_PASSWORD = "WATER";

Connection con = null;
Statement stmt = null;
Statement stmtNew = null;
ResultSet rs = null;
ResultSet rsNew = null;
String sql=null;

try
{
	Class.forName("oracle.jdbc.driver.OracleDriver");
	con = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
}catch(SQLException ex){
	System.out.println(ex);
	out.println("error");
}
%>