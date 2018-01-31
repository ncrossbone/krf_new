<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

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
	String boardTypeVal = request.getParameter("type");
	
	StringBuffer sb = new StringBuffer();
	sb.append("\n SELECT SEQ                                   ");
	sb.append("\n       ,TITLE                                 ");
	sb.append("\n       ,TYPE                                  ");
	sb.append("\n       ,TO_CHAR(REGDT,'YYYY-MM-DD') AS REGDT  ");
	sb.append("\n       ,BOARD_CONTENTS                        ");
	sb.append("\n   FROM KRF_BOARD ");
	sb.append("\n  WHERE SEQ = ").append(seq);	
	
	stmt = con.createStatement();   
	sql = sb.toString();
	rs = stmt.executeQuery(sql);
	
	//System.out.println(sql);
	
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>
	<%if(boardTypeVal.equals("2")) {%>KRF-공지사항<%} %>
	<%if(boardTypeVal.equals("1")) {%>KRF- Q & A<%} %>
</title>
<link href="./css/BasicSet.css" rel="stylesheet" type="text/css" />
<link href="./css/board.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./js/board.js"></script>

<script type="text/javascript">

	//글 수정
	function modifyThisBoard(val){
		if(confirm('게시글을 수정하시겠습니까?')){
			location.href = './writeContent.jsp?seq='+val;
		}
	}
	
	//글 삭제
	function removeThisBoard(val){
		if(confirm('게시글을 정말 삭제하시겠습니까?')){
			location.href = './removeThisBoard.jsp?seq='+val;
		}
	}
	
    function getListByBoard(val){
        
        if(val == ''){
            val = document.getElementById("boardType").value;
            _boardType = val
        }
        location.href = './GetBoard.jsp?boardType='+_boardType;
    }


</script>
<div class="boardArea">
	<%while(rs.next()) {%>
    <table class="fullFrame MgT15" summary="공지사항 혹은 Q&A">
        <colgroup>
            <col width="120" />
            <col />
        </colgroup>
        
        <thead>
        	<tr>
                <th>제목</th>
                <td class="AL PdL15"><%=rs.getString("TITLE") %></td>
            </tr>
            <tr>
                <th>작성일</th>
                <td class="AL PdL15"><%=rs.getString("REGDT") %></td>
            </tr>
        </thead>
        <tbody>
        	<tr>
            	<td class="AL Pd20"colspan="2">
                	<%=rs.getString("BOARD_CONTENTS") %>
                </td>
            </tr>
        </tbody>
        
    </table>
    <div class="btnArea2 fr MgT20" id="btnArea">
    	<%-- <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="modifyBtn" onclick="modifyThisBoard(<%=rs.getInt("SEQ") %>)">수정</a>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="removeBtn" onclick="javascript:removeThisBoard(<%=rs.getInt("SEQ") %>);">삭제</a>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="listBtn"   onclick="javascript:getListByBoard('');">목록</a>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="newBtn"    onclick="location.href='./writeContent.jsp'">등록</a> --%>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="listBtn"   onclick="javascript:getListByBoard('');">목록</a>
    </div>
    <input type="hidden" id="boardType" value="<%=rs.getString("TYPE")%>">
    <%} %>
</div>
<%

//out.print("success");
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
		alert('조회도중 에러가 발생하였습니다.');
		history.back();
	}
	
	
</script>