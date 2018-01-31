<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%@ page import="java.net.InetAddress"%>
<%@ page import="java.net.NetworkInterface"%>
<%@ page import="java.net.SocketException"%>
<%@ page import="java.net.UnknownHostException"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/

InetAddress ip;
try {

    ip = InetAddress.getLocalHost();
    
    //System.out.println("Current IP address : " + ip.getHostAddress());
    out.println("Current IP address : " + ip.getHostAddress());

    NetworkInterface network = NetworkInterface.getByInetAddress(ip);

    byte[] mac = network.getHardwareAddress();

    //System.out.print("Current MAC address : ");
    out.print("Current MAC address : ");

    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < mac.length; i++) {
        sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));        
    }
    
    //System.out.println(sb.toString());
    out.println(sb.toString());
    
    String clientIp = request.getHeader("X-Forwarded-For"); 
	
	if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {  
		clientIp = request.getHeader("Proxy-Client-IP");  
	}  
	if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {  
		clientIp = request.getHeader("WL-Proxy-Client-IP");  
	}  
	if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {  
	    ip = request.getHeader("HTTP_CLIENT_IP");  
	}  
	if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {  
		clientIp = request.getHeader("HTTP_X_FORWARDED_FOR");  
	}  
	if (clientIp == null || clientIp.length() == 0 || "unknown".equalsIgnoreCase(clientIp)) {  
		clientIp = request.getRemoteAddr();  
	}
	
	//System.out.println("clientIp :"+ clientIp);
	out.print("clientIp : "+ clientIp);

} catch (UnknownHostException e) {

    e.printStackTrace();

} catch (SocketException e){

    e.printStackTrace();

}

try{
	/*
	String ip = request.getHeader("X-Forwarded-For"); 
			
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	    ip = request.getHeader("Proxy-Client-IP");  
	}  
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	    ip = request.getHeader("WL-Proxy-Client-IP");  
	}  
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	    ip = request.getHeader("HTTP_CLIENT_IP");  
	}  
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	    ip = request.getHeader("HTTP_X_FORWARDED_FOR");  
	}  
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {  
	    ip = request.getRemoteAddr();  
	}
*/	
	//System.out.println("ipAddress:"+ ip);
	//out.print("IP Address: "+ ip);
	
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>