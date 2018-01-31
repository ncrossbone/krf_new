<%@page import="java.net.URLDecoder"%>
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
	String title = request.getParameter("title");
	String contents = request.getParameter("contents");
	String type = request.getParameter("boardType");
	String seq = request.getParameter("seq");
	
	//특수문자때문에 escape() 써서 넘어온 URL Encoding 된것들을 다시 decode 해준다.
	title = title.replaceAll("%(?![0-9a-zA-Z]{2})", "%25").replaceAll("\\+", "%2B").replaceAll(" ", "%20"); 
	contents = contents.replaceAll("%(?![0-9a-zA-Z]{2})", "%25").replaceAll("\\+", "%2B").replaceAll(" ", "%20"); 
	
	title = URLDecoder.decode(title, "UTF-8");
	contents = URLDecoder.decode(contents, "UTF-8");
	
	
	StringBuffer sb = new StringBuffer();
	
	if(seq != null && !"".equals(seq)){
		sb.append("\n UPDATE KRF_BOARD        ");
		sb.append("\n    SET TITLE = '").append(title).append("'");
		sb.append("\n       ,BOARD_CONTENTS = '").append(contents).append("'");
		sb.append("\n  WHERE SEQ = ").append(seq);
		sb.append("\n    AND TYPE = '").append(seq).append("'");
	} else {
		sb.append("\n INSERT INTO KRF_BOARD VALUES ");
		sb.append("\n (                            ");
		sb.append("\n  KRF_BOARD_SEQ.NEXTVAL       ");
		sb.append("\n ,'").append(title).append("'");
		sb.append("\n ,'").append(contents).append("'");
		sb.append("\n ,SYSDATE                     ");
		sb.append("\n ,'").append(type).append("'");
		sb.append("\n )                            ");
	}
	
	sql = sb.toString();
	
	//System.out.println(sql);
	
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
		alert('게시글 등록에 실패하였습니다.');	
		history.back();
	} else {
		alert('게시글이 등록되었습니다.');		
		location.href="./GetBoard.jsp";
	}
	
</script>