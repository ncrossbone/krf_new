<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@page import="java.io.File"%>
<%@ page import = "java.util.*" %>

<%

//이미지 파일 삭제
//2016.10.19 ph
String[] imgPath = {request.getParameter("resultParam"),
				    request.getParameter("svgParam"),
				    request.getParameter("pngParam")};

for(int i=0; i <= imgPath.length - 1; i++){
	File file = new File(imgPath[i]);
	file.delete();
}

//일주일 지난 이미지 삭제
//2016.10.19 ph
Calendar cal = Calendar.getInstance();
long todayMil = cal.getTimeInMillis();     // 현재 시간(밀리 세컨드)
long oneDayMil = 24*60*60*1000;            // 일 단위

Calendar fileCal = Calendar.getInstance();
Date fileDate = null ;
String[] array;

array = imgPath[0].split("\\\\");
String path = "";

for(int i=0; i <= array.length - 2; i++){
	path += array[i] + "\\";
}

File fileList = new File(path);
File[] list = fileList.listFiles();            // 파일 리스트 가져오기

for(int j=0 ; j < list.length; j++){

 // 파일의 마지막 수정시간 가져오기
 fileDate = new Date(list[j].lastModified());
 // 현재시간과 파일 수정시간 시간차 계산(단위 : 밀리 세컨드)
 fileCal.setTime(fileDate);
 long diffMil = todayMil - fileCal.getTimeInMillis();
  
 //날짜로 계산
 int diffDay = (int)(diffMil/oneDayMil);

 // 7일이 지난 파일 삭제
 if(diffDay > 7 && list[j].exists()){
    list[j].delete();
 } 
  
}

%>
