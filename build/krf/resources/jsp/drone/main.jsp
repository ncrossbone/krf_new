<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%
	/* 
		중요!!!
		Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
		<!DOCTYPE, <html 등등
	*/
	try{
	String id = request.getParameter("id");
//String pw = request.getParameter("pw");

//out.println(id);
//out.println(pw);

Calendar oCalendar = Calendar.getInstance( );  // 현재 날짜/시간 등의 각종 정보 얻기

/*
    out.println("현재 년: " +  oCalendar.get(Calendar.YEAR));
    out.println("현재 월: " + (oCalendar.get(Calendar.MONTH) + 1));
    out.println("현재 일: " +  oCalendar.get(Calendar.DAY_OF_MONTH));
    out.println(); // 다음줄로 행갈이 하기

    out.println("현재 시: " +  oCalendar.get(Calendar.HOUR_OF_DAY)); // 24시간제
    out.println("현재 분: " +  oCalendar.get(Calendar.MINUTE));
    out.println("현재 초: " +  oCalendar.get(Calendar.SECOND));
    out.println();

    // 12시간제로 현재 시
    out.print("현재 시: " +  oCalendar.get(Calendar.HOUR));
    if (oCalendar.get(Calendar.AM_PM) == 0) out.println("am");
    else out.println("pm");

    out.println("현재 초의 1000분의1초: " +  oCalendar.get(Calendar.MILLISECOND));

    out.println("현재 요일: " +  oCalendar.get(Calendar.DAY_OF_WEEK)); // 일요일 = 1
    out.println("올해 몇 번째 날: " + oCalendar.get(Calendar.DAY_OF_YEAR)); // 1월 1일 = 1
    out.println("올해 몇 번째 주: " + oCalendar.get(Calendar.WEEK_OF_YEAR)); // 1월 1일은 = 1

    out.println("이번 달의 몇 번째 주: " + oCalendar.get(Calendar.WEEK_OF_MONTH)); // 첫째 주 = 1
    */
    
    String month = "";
    String day = "";
    String hour = "";
    String min = "";
    String sec = "";
    
    if((oCalendar.get(Calendar.MONTH) + 1) < 10)
    	month = "0" + (oCalendar.get(Calendar.MONTH) + 1);
    else
    	month = "" + (oCalendar.get(Calendar.MONTH) + 1);
    
    if(oCalendar.get(Calendar.DAY_OF_MONTH) < 10)
    	day = "0" + oCalendar.get(Calendar.DAY_OF_MONTH);
    else
    	day = "" + oCalendar.get(Calendar.DAY_OF_MONTH);
    
    if(oCalendar.get(Calendar.HOUR_OF_DAY) < 10)
    	hour = "0" + oCalendar.get(Calendar.HOUR_OF_DAY);
    else
    	hour = "" + oCalendar.get(Calendar.HOUR_OF_DAY);
    
    if(oCalendar.get(Calendar.MINUTE) < 10)
    	min = "0" + oCalendar.get(Calendar.MINUTE);
    else
    	min = "" + oCalendar.get(Calendar.MINUTE);
    
    if(oCalendar.get(Calendar.SECOND) < 10)
    	sec = "0" + oCalendar.get(Calendar.SECOND);
    else
    	sec = "" + oCalendar.get(Calendar.SECOND);
    	
    String currDate = oCalendar.get(Calendar.YEAR) + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    //out.println(currDate);
    
//sql="select * from MINE_INFO"; //쿼리 부분
   //sql="select * from KRF_DRONE_LOG"; //쿼리 부분
   sql="INSERT INTO KRF_DRONE_LOG (ID, MAIN_OP_DT) VALUES ('" + id + "', '" + currDate + "')"; //쿼리 부분
   //out.println(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
/*
 	JSONArray array = new JSONArray();
 	JSONObject obj  = new JSONObject();
 	JSONObject empinfo = null;
 */	
 	 /*	
 	while(rs.next()) {
		//empinfo = new JSONObject();	 
		
		//empinfo.put("rnum" 				, rs.getString("rnum")); 
  		//empinfo.put("MINE_CODE" 			, rs.getString("MINE_CODE"));
  		//empinfo.put("INQUIRY_AREA" 	, rs.getString("INQUIRY_AREA"));
  		//empinfo.put("INQUIRY_YEAR" 			, rs.getString("INQUIRY_YEAR"));
  		//empinfo.put("MINE_NAME" 		, rs.getString("MINE_NAME"));
  		
  		//array.add(empinfo);
  		out.println(rs.getString("ID"));
 	}
 */
 //out.println(rs);
	//obj.put("data",array);
   	//obj.put("totalCount",totalCount);
 	//out.println(obj);
 	//out.flush();

   if(rs != null) rs.close();
   if(stmt != null)stmt.close();
   if(con != null)con.close();
   
   session.setAttribute("id", id);
   session.setAttribute("currDate", currDate);
   
   out.print("success");
}catch(Exception ex){
	System.out.println(ex);
	out.print("error");
} 
 %>
<%@ include file="dbClose.jsp" %>