<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<title>KRF-공지사항</title>
<link href="./css/BasicSet.css" rel="stylesheet" type="text/css" />
<link href="./css/board.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./js/board.js"></script>
<script type="text/javascript">
	
	function cancelWriting(){
		if(confirm('게시글 작성을 취소하시겠습니까?')){
			location.href='./GetBoard.jsp';
		}
	}
	function submitWriting(){
		
		var title = document.getElementById("title").value;
		var contents = document.getElementById("contents").value;
		var type = document.getElementById("boardType").value;
		var seq = document.getElementById("seq").value;
		
		if(title == '' || title == null){
			alert('제목을 입력하여주십시오.');
			return;
		}
		
		if(contents == '' || contents == null){
			alert('내용을 입력하여주십시오.');
			return;
		}
		contents = checkCharater(contents);

		title = encodeURIComponent(title);
		contents = encodeURIComponent(contents);
		
		var url = 'title='+title+'&contents='+contents+'&boardType='+type+'&seq='+seq;
		
		if(confirm('게시글을 등록하시겠습니까?')){
			
			location.href = './writeBoard.jsp?'+url;
			
		}
	}
	
</script>


<div class="boardArea">
    <table class="fullFrame MgT15" summary="공지사항 혹은 Q&A ">
        <colgroup>
            <col width="120" />
            <col />
        </colgroup>
        <thead>
        	<tr>
                <th>제목</th>
                <td class="AL PdL15"><input type="text" name="title" id="title" value="" size="69" maxlength="200" /></td>
            </tr>
            <tr>
                <th>게시글 종류</th>
                <td class="AL PdL15">
                	<select class="W100 fl" id="boardType" >
			            <option value="1" >Q & A</option>
			            <option value="2" >공지사항</option>
			        </select>
                </td>
            </tr>
        </thead>
        <tbody>
        	<tr>
            	<td class="AL Pd20"colspan="2">
                	<textarea name="contents" cols="" rows="" class="contsWrite H250" id="contents"></textarea>
                </td>
            </tr>
        </tbody>
    </table>
    <input type="hidden" id="seq" value="" readonly="readonly"/>

<%@ include file="dbConn.jsp" %>
<%
try{
	
	String seq = request.getParameter("seq");
	
	StringBuffer sb = new StringBuffer();
	
	if(seq != null && !"".equals(seq)){
		
		sb.append("\n SELECT SEQ                                   ");
		sb.append("\n       ,TITLE                                 ");
		sb.append("\n       ,TO_CHAR(REGDT,'YYYY-MM-DD') AS REGDT  ");
		sb.append("\n       ,BOARD_CONTENTS                        ");
		sb.append("\n   FROM KRF_BOARD ");
		sb.append("\n  WHERE SEQ = ").append(seq);	
		
		stmt = con.createStatement();   
		sql = sb.toString();
		rs = stmt.executeQuery(sql);
		
		//System.out.println(sql);
		
		while(rs.next()){
%>
<script type="text/javascript">
	var boardContents = '<%= rs.getString("BOARD_CONTENTS") %>';
	
	boardContents = boardContents.replace(/<br>/g, "\r\n");
	
	document.getElementById("title").value = '<%= rs.getString("TITLE") %>';
	document.getElementById("contents").value = boardContents;
	document.getElementById("seq").value = '<%= rs.getString("SEQ") %>';
</script>
<%		
		}
	}
	

%>

     <div class="btnArea2 fr MgT20" id="btnArea">
     <%if(seq != null && !"".equals(seq)){ %>
    	<a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="modifyBtn" onclick="javascript:submitWriting();">수정</a>
     <%} %>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="removeBtn" onclick="javascript:cancelWriting();">취소</a>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="listBtn"   onclick="location.href='./GetBoard.jsp'">목록</a>
     <%if(seq == null || "".equals(seq)){ %>
        <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="newBtn"    onclick="javascript:submitWriting();">등록</a>
     <%} %>
    </div>
</div>

<%

//out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>

