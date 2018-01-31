<%@page import="java.io.Serializable"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<script type="text/javascript">

	function viewContents(val){
		location.href = './GetBoardContents.jsp?seq='+val;
	}
	
    var _boardType = "";
    function getListByBoard(val){
        
        if(val == ''){
            val = document.getElementById("boardType").value;
            _boardType = val
        }
        
        location.href = './GetBoard.jsp?boardType='+_boardType;
    }
	
	function getListByTitle(val){
		var boardType = document.getElementById("boardType").value;
		var selectType = document.getElementById("selectType").value;
		var wordSh = document.getElementById("wordSh").value;
		
		var url = '';
		if(wordSh == '' && selectType == 'title'){
			alert('검색하실 키워드를 입력해주십시오');
			document.getElementById("wordSh").focus();
		} else {
			url = '&wordSh='+wordSh;
		}
		
		if(val != null && val != ''){
			url += '&pageNum='+val;
		}
		location.href = './GetBoard.jsp?boardType='+boardType+'&selectType='+selectType+url;
	}
	
	function goPage(val){
		getListByTitle(val);
	}
	
</script>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@ page import="java.io.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/
String code = "";

try{
	
	String boardType = request.getParameter("boardType");
	String selectType = request.getParameter("selectType");
	String pageNumString = request.getParameter("pageNum");
	String wordSh = request.getParameter("wordSh");
	
	int pageNum = 0;
	int rowsPerPage = 10;
	
	int totCnt = 0;
	int pagingSmall = 0;
	int pagingLarge = 0;
	
	int totCntVal = 0;
	int pagingSmallVal = 0;
	int pagingLargeVal = 0;
	
	int startPage = 0;
	int maxPage = 0;
	if(pageNumString == null || "".equals(pageNumString)){
		pageNumString = "1";
	}
	
	if(boardType == null || "".equals(boardType)){
		boardType = "1";
	}

	pageNum = Integer.valueOf(pageNumString);	
	
	StringBuffer sb = new StringBuffer();
	
	sb.append("\n SELECT ROWNUM AS ROWNO              ");
	sb.append("\n       ,T2.*                         ");
	sb.append("\n   FROM (                            ");
	sb.append("\n        SELECT ROWNUM AS ROWNO1      ");
	sb.append("\n              ,T1.*                  ");
	sb.append("\n          FROM (                     ");
	sb.append("\n               SELECT SEQ            ");
	sb.append("\n                     ,COUNT(*) OVER() AS TOTCNT ");
	sb.append("\n                     ,TITLE          ");
	sb.append("\n                     ,BOARD_CONTENTS ");
	sb.append("\n                     ,TO_CHAR(REGDT,'YYYY-MM-DD') AS REGDT ");
	sb.append("\n                     ,TYPE           ");
	sb.append("\n                 FROM KRF_BOARD      ");
	sb.append("\n                WHERE TYPE = ").append(boardType);
	if(wordSh != null && !"".equals(wordSh)){
		sb.append("\n                  AND TITLE LIKE '%").append(wordSh).append("%'");
	}
	if((wordSh != null && !"".equals(wordSh)) && (selectType != null && "all".equals(selectType))){
		sb.append("\n                   OR BOARD_CONTENTS LIKE '%").append(wordSh).append("%'");
	}
	sb.append("\n                ORDER BY SEQ DESC    ");
	sb.append("\n               ) T1                  ");
	sb.append("\n        ) T2                         ");
	sb.append("\n   WHERE ROWNO1 >  ").append( (pageNum-1)*rowsPerPage);
	sb.append("\n     AND ROWNO1 <= ").append( (pageNum)*rowsPerPage);
	sb.append("\n     AND TYPE = ").append(boardType);
	
	sql = sb.toString();
	
	stmt = con.createStatement();   
	rs = stmt.executeQuery(sql);
	
	//System.out.println(sql);

	request.setAttribute("boardType", boardType);
	request.setAttribute("selectType", selectType);
	request.setAttribute("pageNum", String.valueOf(pageNum));
	request.setAttribute("wordSh", wordSh);
	
	String boardTypeVal = (String)request.getAttribute("boardType");
	String selectTypeVal = (String) request.getAttribute("selectType");
	int pageNumVal = Integer.valueOf((String)request.getAttribute("pageNum"));
	String wordShVal = String.valueOf(request.getAttribute("wordSh"));
	
%>
<title>
	<%if(boardTypeVal.equals("2")) {%>KRF-공지사항<%} %>
	<%if(boardTypeVal.equals("1")) {%>KRF- Q &amp; A<%} %>
</title>
<link href="./css/BasicSet.css" rel="stylesheet" type="text/css" />
<link href="./css/board.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="./js/board.js"></script>

<div class="boardArea" style='margin-top:20px; margin-left:10px;'>
	<div class="fullFrame H20">
        <select style="display:none;" class="W100 fl" id="boardType" onchange="javascript:getListByBoard(this.value);">
            <option value="1" <%if(boardTypeVal.equals("1")) {%>selected="selected"<%} %>>Q &amp; A</option>
            <option value="2" <%if(boardTypeVal.equals("2")) {%>selected="selected"<%} %>>공지사항</option>
        </select>
        
        <div class="fr">
            <select class="W70" id="selectType" >
                <option value="all" <%if(selectTypeVal != null && selectTypeVal.equals("all")) {%>selected="selected"<%} %>>전체</option>
                <option value="title" <%if(selectTypeVal != null && selectTypeVal.equals("title")) {%>selected="selected"<%} %>>제목</option>
<!--                 <option>글쓴이</option> -->
            </select>
            <input name="" type="text" id="wordSh" class="W150" <%if(wordShVal != null && !"".equals(wordShVal)&& !"null".equals(wordShVal)) {%>value="<%=wordShVal%>"<%} %>/>
            <a href="#" class="search" onclick="javascript:getListByTitle('');">검색</a>
        </div>
        
    </div>
    <table class="fullFrame MgT15" summary="공지사항 혹은 Q&A">
        <colgroup>
            <col width="80" />
            <col width="430" />
            <col />
        </colgroup>
        <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성일</th>
            </tr>
        </thead>
        
        <tbody>
			<%while(rs.next()){ %>
            <tr>
                <td><%=rs.getInt("ROWNO1") %></td>
                <td class="PdL10 AL"><a href="./GetBoardContents.jsp?seq=<%=rs.getInt("SEQ")%>&type=<%=rs.getString("TYPE")%>"><%=rs.getString("TITLE") %></a></td>
                <td><%=rs.getString("REGDT") %></td>
            </tr>
            <%	
           		totCnt = rs.getInt("TOTCNT");
            }
        	%>
        </tbody>
    </table>
<%
	//페이징 처리를 위한 내용
	if(totCnt%rowsPerPage == 0){
		pagingSmall = (totCnt/rowsPerPage);
	}else {
		pagingSmall = (totCnt/rowsPerPage)+1;
	}

	if(pagingSmall%10 == 0){
		pagingLarge = (pagingSmall/10);
	}else {
		pagingLarge = (pagingSmall/10)+1;
	}
	
	if(pagingSmall <= pageNumVal+10){
		maxPage = pagingSmall;
	} else {
		maxPage = pageNumVal+10;
	}
	
	request.setAttribute("totCnt", String.valueOf(totCnt));
	request.setAttribute("pagingSmall", String.valueOf(pagingSmall));
	request.setAttribute("pagingLarge", String.valueOf(pagingLarge));
	
	totCntVal = Integer.valueOf((String)request.getAttribute("totCnt"));
	pagingSmallVal = Integer.valueOf((String)request.getAttribute("pagingSmall"));
	pagingLargeVal = Integer.valueOf((String)request.getAttribute("pagingLarge"));
	
	if((boardType == null || "".equals(boardType)) && (selectType == null || "".equals(selectType))){
		startPage = 1;
	} else {
		if(pageNum%10 == 0){
			startPage = (pageNum/10);
		} else {
			startPage = (pageNum/10)+1;
		}
	}
	
%>
    <div class="btnArea MgT20">
    	<%if(pageNumVal > 10 ){%><a href="#" onclick="javascript:goPage('<%=pageNumVal-10 %>');">&lt;&lt;</a><%} %>
    	<%if(pageNumVal >= 2) {%><a href="#" onclick="javascript:goPage('<%=pageNumVal-1 %>');">&lt;</a><%} %>
    	<%for(int i = ((startPage-1)*10)+1; i <= ((startPage-1)*10)+10; i++){ 
    		if(i <= pagingSmallVal){
    	%>
    		<a href="#" onclick="javascript:goPage('<%=i %>');"<%if(pageNumVal == i) {%>class="on"<%} %>><%=i %></a>
    	<%	} 
    	}
    	%>
    	
        <%if(pagingSmallVal >= 2 && pagingSmallVal >= pageNumVal + 1) {%><a href="#" onclick="javascript:goPage('<%=pageNumVal+1 %>');">&gt;</a><%} %>
        <%if(pagingLargeVal >= 2 && pagingLargeVal >= startPage + 1) {%><a href="#" onclick="javascript:goPage('<%=maxPage %>');">&gt;&gt;</a><%} %>
    </div>
    <div class="btnArea2 fr MgT20" id="btnArea">
    	<!-- <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="listBtn"   onclick="javascript:getListByBoard('')" style='position: absolute; top: 505px; right: 10px;'>목록</a> -->
        <!-- <a href="#" onmouseover="javascript:classOn(this.id);" onmouseout="javascript:classOff(this.id);" id="newBtn"    onclick="location.href='./writeContent.jsp'" style='position: absolute; top: 505px; right: 10px;'>등록</a> -->
    </div>
</div>
<%
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
	}
	
	
</script>