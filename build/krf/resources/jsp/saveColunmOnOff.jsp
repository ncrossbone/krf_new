<%@  page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.net.URLDecoder" %>
<%@ include file="dbConn.jsp"%>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
    
%>
<%
   

try{
	
  //  out.print("request.getRemoteAddr() :"+request.getRemoteAddr());
	//String hiddenSaveValue = request.getParameter("hiddenSaveValue");
	//String saveName = request.getParameter("saveName");
	String emp_name = request.getParameter("saveName")

	//String saveName = request.getParameter("saveName");
	//out.println(emp_name);
	
	log("saveName::"+saveName);
	//out.print(saveName);
	String ip = request.getRemoteAddr();
	Object[] hiddenSaveValue = request.getParameterValues("data");
	
	
	sql = " INSERT INTO visibleColunm																			";
	sql += " (user_ip,s_nm,sysd,c_0,c_1,c_2,c_3,c_4,c_5,c_6,c_7,c_8,c_9,c_10                  ";
	sql += " ,c_11,c_12,c_13,c_14,c_15,c_16,c_17,c_18,c_19,c_20             ";
	sql += " ,c_21,c_22,c_23,c_24,c_25,c_26,c_27,c_28,c_29,c_30             ";
	sql += " ,c_31,c_32,c_33,c_34,c_35,c_36,c_37,c_38,c_39,c_40             ";
	sql += " ,c_41,c_42,c_43,c_44,c_45,c_46,c_47,c_48,c_49,c_50             ";
	sql += " ,c_51,c_52,c_53,c_54,c_55,c_56,c_57,c_58,c_59,c_60             ";
	sql += " ,c_61 ) ";
			/* c_62,c_63,c_64,c_65,c_66,c_67,c_68,c_69,c_70             ";
	sql += " ,c_71,c_72,c_73,c_74,c_75,c_76,c_77,c_78,c_79,c_80             ";
	sql += " ,c_81,c_82,c_83,c_84,c_85,c_86,c_87,c_88,c_89,c_90             ";
	sql += " ,c_91,c_92,c_93,c_94,c_95,c_96,c_97,c_98,c_99,c_100            ";
	sql += " ,c_101,c_102,c_103,c_104,c_105,c_106,c_107,c_108,c_109,c_110   ";
	sql += " ,c_111,c_112,c_113,c_114,c_115,c_116,c_117,c_118,c_119,c_120   ";
	sql += " ,c_121,c_122,c_123,c_124,c_125,c_126,c_127,c_128,c_129,c_130   ";
	sql += " ,c_131,c_132,c_133,c_134,c_135,c_136,c_137,c_138,c_139,c_140   ";
	sql += " ,c_141,c_142,c_143,c_144,c_145,c_146,c_147,c_148,c_149,c_150   ";
	sql += " ,c_151,c_152,c_153,c_154,c_155,c_156,c_157,c_158,c_159,c_160   ";
	sql += " ,c_161,c_162,c_163,c_164,c_165,c_166,c_167,c_168,c_169,c_170   ";
	sql += " ,c_171,c_172,c_173,c_174,c_175,c_176,c_177,c_178,c_179,c_180   ";
	sql += " ,c_181,c_182,c_183,c_184,c_185,c_186,c_187,c_188,c_189,c_190   ";
	sql += " ,c_191,c_192,c_193,c_194,c_195,c_196,c_197,c_198,c_199,c_200   ";
	sql += " ,c_201,c_202,c_203,c_204,c_205,c_206,c_207,c_208,c_209,c_210   ";
	sql += " ,c_211,c_212,c_213,c_214,c_215,c_216,c_217,c_218,c_219,c_220   ";
	sql += " ,c_221,c_222,c_223,c_224,c_225,c_226,c_227,c_228,c_229)        "; */
	sql += " VALUES                                                         ";
	sql += " ('"+ip+"'                                            ";
	sql += " ,'"+saveName+"'                                            ";
	sql += " ,SYSDATE                                            ";
	sql += " ,'"+hiddenSaveValue[0]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[1]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[2]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[3]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[4]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[5]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[6]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[7]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[8]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[9]+"'                                            ";
	sql += " ,'"+hiddenSaveValue[10]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[11]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[12]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[13]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[14]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[15]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[16]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[17]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[18]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[19]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[20]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[21]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[22]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[23]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[24]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[25]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[26]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[27]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[28]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[29]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[30]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[31]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[32]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[33]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[34]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[35]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[36]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[37]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[38]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[39]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[40]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[41]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[42]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[43]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[44]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[45]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[46]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[47]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[48]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[49]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[50]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[51]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[52]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[53]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[54]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[55]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[56]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[57]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[58]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[59]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[60]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[61]+"')                                           ";/* 
	sql += " ,'"+hiddenSaveValue[62]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[63]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[64]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[65]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[66]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[67]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[68]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[69]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[70]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[71]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[72]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[73]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[74]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[75]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[76]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[77]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[78]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[79]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[80]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[81]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[82]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[83]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[84]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[85]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[86]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[87]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[88]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[89]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[90]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[91]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[92]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[93]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[94]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[95]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[96]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[97]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[98]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[99]+"'                                           ";
	sql += " ,'"+hiddenSaveValue[100]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[101]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[102]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[103]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[104]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[105]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[106]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[107]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[108]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[109]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[110]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[111]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[112]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[113]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[114]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[115]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[116]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[117]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[118]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[119]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[120]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[121]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[122]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[123]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[124]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[125]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[126]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[127]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[128]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[129]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[130]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[131]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[132]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[133]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[134]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[135]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[136]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[137]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[138]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[139]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[140]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[141]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[142]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[143]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[144]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[145]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[146]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[147]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[148]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[149]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[150]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[151]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[152]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[153]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[154]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[155]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[156]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[157]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[158]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[159]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[160]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[161]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[162]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[163]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[164]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[165]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[166]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[167]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[168]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[169]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[170]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[171]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[172]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[173]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[174]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[175]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[176]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[177]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[178]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[179]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[180]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[181]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[182]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[183]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[184]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[185]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[186]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[187]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[188]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[189]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[190]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[191]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[192]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[193]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[194]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[195]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[196]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[197]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[198]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[199]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[200]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[201]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[202]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[203]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[204]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[205]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[206]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[207]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[208]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[209]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[210]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[211]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[212]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[213]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[214]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[215]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[216]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[217]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[218]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[219]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[220]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[221]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[222]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[223]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[224]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[225]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[226]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[227]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[228]+"'                                          ";
	sql += " ,'"+hiddenSaveValue[229]+"')                                         "; */

	//sql = "INSERT INTO visibleColunm (c_229) VALUES ('"+hiddenSaveValue[229]+"')" ;
	
	
	
	//sql += " (c_"+i+") VALUES('"+hiddenSaveValue[i]+"')";
stmt = con.createStatement();   
rs = stmt.executeQuery(sql);
}
catch(Exception ex){
	System.out.println(ex);
	System.out.println(sql);
	out.print("error");
}


%>
<%@ include file="dbClose.jsp"%>