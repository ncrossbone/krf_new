<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="java.security.MessageDigest"%>
<%@page import="java.security.NoSuchAlgorithmException"%>
<%

	String pw = request.getParameter("pwd");
	String SHA = "";
	try {
		MessageDigest sh = MessageDigest.getInstance("SHA-256");
		sh.update(pw.getBytes());
		byte byteData[] = sh.digest();
		StringBuffer sb = new StringBuffer();

		for (int i = 0; i < byteData.length; i++) {
			sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16)
					.substring(1));
		}
		SHA = sb.toString();

	} catch (NoSuchAlgorithmException e) {
		e.printStackTrace();
		SHA = null;
	}

out.print(SHA);%>