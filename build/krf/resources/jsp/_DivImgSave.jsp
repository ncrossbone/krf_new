<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@page import="java.awt.image.RescaleOp"%>
<%@page import="java.awt.image.BufferedImageOp"%>
<%@page import="sun.misc.BASE64Decoder"%>
<%@page import="java.util.UUID"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@page import="com.google.gson.Gson"%>

<%@page import="java.awt.Color"%>
<%@page import="java.awt.Graphics2D"%>
<%@page import="java.awt.image.BufferedImage"%>
<%@page import="java.io.*"%>
<%@page import="org.apache.batik.transcoder.image.PNGTranscoder"%>
<%@page import="org.apache.batik.transcoder.TranscoderInput"%>
<%@page import="org.apache.batik.transcoder.TranscoderOutput"%>
<%@page import="java.net.URL"%>
<%@page import="java.nio.file.Paths"%>
<%@page import="javax.imageio.ImageIO"%>

<%
try
{
	response.setHeader("Access-Control-Allow-Origin","*");
	response.setHeader("Access-Control-Allow-Headers", "origin, x-requested-with, content-type, accept");
	
	//System.out.println("aa");
	//String strWidth = request.getParameter("width");
	//String strHeight = request.getParameter("height");
	/* System.out.println(request);
	String strWidth = StringUtils.defaultIfEmpty(request.getParameter("width"), "2650");
	String strHeight = StringUtils.defaultIfEmpty(request.getParameter("height"), "1100");
	System.out.println(strWidth);
	System.out.println(strHeight);
	
	width = Integer.parseInt(strWidth);
	height = Integer.parseInt(strHeight); */
	
	//int width = 2650;
	//int height = 1100;
	
	//System.out.println(test1);
	//System.out.println(test2);
	
	String strWidth = request.getParameter("width");
	String strHeight = request.getParameter("height");
	String fileName = request.getParameter("fileName");
	
	String filePath = "C:\\arcgisserver\\directories\\arcgisoutput\\customPrintTask\\";
	String randomId =  UUID.randomUUID().toString();
	String resultPngFileName = "result_" + randomId + ".png";
	
	if(strWidth == null){
		strWidth = "2650";
	}
	
	if(strHeight == null){
		strHeight = "1100";
	}
	
	int width = Integer.parseInt(strWidth);
	int height = Integer.parseInt(strHeight);
	
	Gson gson = new Gson();
	ImageInfo[] imageInfos = gson.fromJson(request.getParameter("imageInfos"), ImageInfo[].class);
	
	BufferedImage newImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
    Graphics2D graphic = newImage.createGraphics();
    
	if(fileName != null && fileName != ""){
		//System.out.println(fileName);
		//System.out.println(filePath + fileName);
		BufferedImage originImage = ImageIO.read(new File(filePath + fileName));
		graphic.drawImage(originImage, null, 0, 0);
		resultPngFileName = fileName;
	}
    
	for(int i=0; i<imageInfos.length; i++){
		
    	if(imageInfos[i].base64 == null){
    		continue;
    	}
        
    	String encodingPrefix = "base64,";
    	int contentStartIndex = imageInfos[i].base64.indexOf(encodingPrefix) + encodingPrefix.length();
    	BASE64Decoder decoder = new BASE64Decoder();
    	byte[] imageByte = decoder.decodeBuffer(imageInfos[i].base64.substring(contentStartIndex));
        ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
        BufferedImage baseImage = ImageIO.read(bis);
        bis.close();
        
        float[] scales = { 1.0f, 1.0f, 1.0f, imageInfos[i].opacity };
        float[] offsets = new float[4];
        BufferedImageOp op = new RescaleOp(scales, offsets, null);
        
    	graphic.drawImage(baseImage, op, imageInfos[i].translateX, imageInfos[i].translateY);
	}
	
    graphic.dispose();
	
    File outputfile = new File(filePath + resultPngFileName);
    ImageIO.write(newImage, "png", outputfile);
    
    HashMap hashMap = new HashMap();
    hashMap.put("fileName", resultPngFileName);
    
    out.println(gson.toJson(hashMap));
    
    //System.out.println(cnt);
}
catch(Exception e){
	System.out.println(e);
	//out.println(e);
	//e.printStackTrace();
}
%>

<%!
class ImageInfo{
	public String src;
	public String base64;
	public int translateX;
	public int translateY;
	public float opacity;
}
%>