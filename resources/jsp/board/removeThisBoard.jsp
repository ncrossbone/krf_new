<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<script type="text/javascript">

</script>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/
String code = "";
try{
	String seq = request.getParameter("seq");
	
	sql = "DELETE FROM KRF_BOARD WHERE SEQ = " + seq;
	
	stmt = con.createStatement();   
	rs = stmt.executeQuery(sql);
	
	request.setAttribute("code", "success");
	
	code = (String)request.getAttribute("code");
	
}catch(Exception ex){ 
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
	
	request.setAttribute("code", "error");
	
	code = (String)request.getAttribute("code");
} 
%>

<%@ include file="dbClose.jsp" %>

<script type="text/javascript">
	
	if('<%=code%>' == 'error'){
		alert('게시글 삭제에 실패하였습니다.');	
		history.back();
	} else {
		alert('게시글이 삭제되었습니다.');		
		location.href="./GetBoard.jsp";
	}
	
	
</script>