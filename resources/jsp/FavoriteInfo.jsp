<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="oracle.jdbc.OraclePreparedStatement"%>

<%
Object info = request.getParameter("info");

try {
	OraclePreparedStatement ops = null;
	sql = "INSERT INTO KRF_FAVORITE_INFO VALUES(?,?,?)";
	ops = (OraclePreparedStatement) con.prepareStatement(sql);
	ops.setString(1, "111111111");
	ops.setString(2, "2015/12/16");
	ops.setStringForClob(3, info.toString());
	
	int cnt=info.toString().length();
	int byteCnt=0;
	char tempChar[]=new char[cnt];
	
	for(int i=0; i<cnt; i++){
		tempChar[i]=info.toString().charAt(i);
		if(tempChar[i]<128){
			byteCnt++;
		}else{
			byteCnt+=2;
		}
	}
	out.print(byteCnt);
	ops.execute();
} catch (Exception ex) {
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
}
%>

<%@ include file="dbClose.jsp"%>