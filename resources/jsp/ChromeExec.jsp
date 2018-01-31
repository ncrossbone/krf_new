<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ page import="java.util.*,java.text.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/
try{
	Runtime.getRuntime().exec("c:\\Program Files\\CounterPath\\CounterPath Bria Professional\\BriaProfessional.exe"); 
}
catch(Exception ex){
	
}
%>