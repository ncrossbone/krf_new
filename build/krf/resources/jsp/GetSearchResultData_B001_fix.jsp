<%@ page contentType="text/html; charset=euc-kr" pageEncoding="EUC-KR" %>
<%@ include file="dbConn.jsp" %>
<%@ page import="java.util.*,java.text.*"%>
<%@page import="org.json.simple.*"%>
<%
/* 
	중요!!!
	Json 형태로 출력하는 jsp페이지는 어떠한 html 요소도 사용하지 않아야 한다.
	<!DOCTYPE, <html 등등
*/
try{
	String siteIds = request.getParameter("siteIds");
	
	String startYear = request.getParameter("startYear");
	String startMonth = request.getParameter("startMonth");
	String endYear = request.getParameter("endYear");
	String endMonth = request.getParameter("endMonth");
	
	String startYYYYMM = startYear + startMonth;
	String endYYYYMM = endYear + endMonth;
	String startFull = request.getParameter("startFull");
	String endFull = request.getParameter("endFull");
	
	sql="WITH TBL_TEMP AS (                                                                                                                                                                      \n\r";
	sql+="SELECT RIVER_ID, SITE_NAME, MSR_DATE                                                                                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M02'  THEN M02  ELSE NULL END) AS F02   --수온1                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M03'  THEN M03  ELSE NULL END) AS F03   --수소이온농도1                                                                   \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M04'  THEN M04  ELSE NULL END) AS F04   --전기전도도1                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M05'  THEN M05  ELSE NULL END) AS F05   --용존산소1                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M06'  THEN M06  ELSE NULL END) AS F06   --총유기탄소1                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M07'  THEN M07  ELSE NULL END) AS F07   --임펄스                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M08'  THEN M08  ELSE NULL END) AS F08   --수조 pH                                                                           \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M09'  THEN M09  ELSE NULL END) AS F09   --수조 수온                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M10'  THEN M10  ELSE NULL END) AS F10   --수조 산소량                                                                       \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M11'  THEN M11  ELSE NULL END) AS F11   --활동여부                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M12'  THEN M12  ELSE NULL END) AS F12   --염화메틸렌                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M13'  THEN M13  ELSE NULL END) AS F13   --1.1.1-트리클로로에테인                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M14'  THEN M14  ELSE NULL END) AS F14   --벤젠                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M15'  THEN M15  ELSE NULL END) AS F15   --사염화탄소                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M16'  THEN M16  ELSE NULL END) AS F16   --트리클로로에틸렌                                                                \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M17'  THEN M17  ELSE NULL END) AS F17   --톨루엔                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M18'  THEN M18  ELSE NULL END) AS F18   --테트라클로로에틸렌                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M19'  THEN M19  ELSE NULL END) AS F19   --에틸벤젠                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M20'  THEN M20  ELSE NULL END) AS F20   --m,p-자일렌                                                                       \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M21'  THEN M21  ELSE NULL END) AS F21   --o-자일렌                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M22'  THEN M22  ELSE NULL END) AS F22   --[ECD]염화메틸렌                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M23'  THEN M23  ELSE NULL END) AS F23   --[ECD]1.1.1-트리클로로에테인                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M24'  THEN M24  ELSE NULL END) AS F24   --[ECD]사염화탄소                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M25'  THEN M25  ELSE NULL END) AS F25   --[ECD]트리클로로에틸렌                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M26'  THEN M26  ELSE NULL END) AS F26   --[ECD]테트라클로로에틸렌                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M27'  THEN M27  ELSE NULL END) AS F27   --총질소                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M28'  THEN M28  ELSE NULL END) AS F28   --총인                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M29'  THEN M29  ELSE NULL END) AS F29   --클로로필-a                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M30'  THEN M30  ELSE NULL END) AS F30   --투과도                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M31'  THEN M31  ELSE NULL END) AS F31   --임펄스(우)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M32'  THEN M32  ELSE NULL END) AS F32   --임펄스(좌)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M33'  THEN M33  ELSE NULL END) AS F33   --수조수온(우)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M34'  THEN M34  ELSE NULL END) AS F34   --수조수온(좌)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M35'  THEN M35  ELSE NULL END) AS F35   --인산염인                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M36'  THEN M36  ELSE NULL END) AS F36   --암모니아성질소                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M37'  THEN M37  ELSE NULL END) AS F37   --질산성질소                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M38'  THEN M38  ELSE NULL END) AS F38   --수온2                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M39'  THEN M39  ELSE NULL END) AS F39   --수소이온농도2                                                                   \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M40'  THEN M40  ELSE NULL END) AS F40   --전기전도도2                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M41'  THEN M41  ELSE NULL END) AS F41   --용존산소2                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M42'  THEN M42  ELSE NULL END) AS F42   --실내온도                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M43'  THEN M43  ELSE NULL END) AS F43   --UPS 전압                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M44'  THEN M44  ELSE NULL END) AS F44   --출입문 상태                                                                       \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M45'  THEN M45  ELSE NULL END) AS F45   --유속                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M46'  THEN M46  ELSE NULL END) AS F46   --유압                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M47'  THEN M47  ELSE NULL END) AS F47   --채수펌프(우)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M48'  THEN M48  ELSE NULL END) AS F48   --채수펌프(좌)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M49'  THEN M49  ELSE NULL END) AS F49   --여과장치                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M50'  THEN M50  ELSE NULL END) AS F50   --항온항습기                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M51'  THEN M51  ELSE NULL END) AS F51   --자탐기                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M52'  THEN M52  ELSE NULL END) AS F52   --실내습도                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M53'  THEN M53  ELSE NULL END) AS F53   --전원상태                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M54'  THEN M54  ELSE NULL END) AS F54   --일반채수기                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M55'  THEN M55  ELSE NULL END) AS F55   --VOCs채수기                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M56'  THEN M56  ELSE NULL END) AS F56   --자일렌                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M57'  THEN M57  ELSE NULL END) AS F57   --독성지수(좌)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M58'  THEN M58  ELSE NULL END) AS F58   --유영속도(좌)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M59'  THEN M59  ELSE NULL END) AS F59   --개체수(좌)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M60'  THEN M60  ELSE NULL END) AS F60   --유영속도 분포지수(좌)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M61'  THEN M61  ELSE NULL END) AS F61   --프렉탈 차수(좌)                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M62'  THEN M62  ELSE NULL END) AS F62   --시료온도(좌)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M63'  THEN M63  ELSE NULL END) AS F63   --독성지수(우)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M64'  THEN M64  ELSE NULL END) AS F64   --유영속도(우)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M65'  THEN M65  ELSE NULL END) AS F65   --개체수(우)                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M66'  THEN M66  ELSE NULL END) AS F66   --유영속도 분포지수(우)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M67'  THEN M67  ELSE NULL END) AS F67   --프렉탈 차수(우)                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M68'  THEN M68  ELSE NULL END) AS F68   --시료온도(우)                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M69'  THEN M69  ELSE NULL END) AS F69   --수온3                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M70'  THEN M70  ELSE NULL END) AS F70   --수소이온농도3                                                                   \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M71'  THEN M71  ELSE NULL END) AS F71   --전기전도도3                                                                      \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M72'  THEN M72  ELSE NULL END) AS F72   --용존산소3                                                                         \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M73'  THEN M73  ELSE NULL END) AS F73   --탁도3                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M74'  THEN M74  ELSE NULL END) AS F74   --카드뮴                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M75'  THEN M75  ELSE NULL END) AS F75   --납                                                                                  \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M76'  THEN M76  ELSE NULL END) AS F76   --구리                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M77'  THEN M77  ELSE NULL END) AS F77   --아연                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M78'  THEN M78  ELSE NULL END) AS F78   --페놀                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M79'  THEN M79  ELSE NULL END) AS F79   --탁도1                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M80'  THEN M80  ELSE NULL END) AS F80   --탁도2                                                                              \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M81'  THEN M81  ELSE NULL END) AS F81   --총유기탄소                                                                        \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M82'  THEN M82  ELSE NULL END) AS F82   --수소가스누출                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M83'  THEN M83  ELSE NULL END) AS F83   --펌프수명                                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M84'  THEN M84  ELSE NULL END) AS F84   --미생물 독성지수                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M85'  THEN M85  ELSE NULL END) AS F85   --전극(A)                                                                            \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M86'  THEN M86  ELSE NULL END) AS F86   --전극(B)                                                                            \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M87'  THEN M87  ELSE NULL END) AS F87   --조류 독성지수                                                                    \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M88'  THEN M88  ELSE NULL END) AS F88   --조류 형광량(시료)                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M89'  THEN M89  ELSE NULL END) AS F89   --조류 최대형광량(시료)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M90'  THEN M90  ELSE NULL END) AS F90   --조류 형광량(바탕시료)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M91'  THEN M91  ELSE NULL END) AS F91   --조류 최대형광량(바탕시료)                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M92'  THEN M92  ELSE NULL END) AS F92   --조류 형광산출량(시료)                                                          \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M93'  THEN M93  ELSE NULL END) AS F93   --조류 형광산출량(바탕시료)                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M94'  THEN M94  ELSE NULL END) AS F94   --채수펌프 원격제어                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M95'  THEN M95  ELSE NULL END) AS F95   --강우량                                                                             \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M96'  THEN M96  ELSE NULL END) AS F96   --저류수조수위                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M97'  THEN M97  ELSE NULL END) AS F97   --여과수조수위                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M98'  THEN M98  ELSE NULL END) AS F98   --필터유입압력                                                                     \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M99'  THEN M99  ELSE NULL END) AS F99   --유량                                                                               \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M100' THEN M100 ELSE NULL END) AS F100  --페놀2                                                                            \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M101' THEN M101 ELSE NULL END) AS F101  --Factor_Chl-a                                                                    \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M105' THEN M105 ELSE NULL END) AS F105  --독성도                                                                           \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M106' THEN M106 ELSE NULL END) AS F106  --전기전도도 R일                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M107' THEN M107 ELSE NULL END) AS F107  --전기전도도 R이                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M108' THEN M108 ELSE NULL END) AS F108  --전기전도도 R삼                                                                 \n\r";
	sql+="     , MAX(CASE WHEN BB.ITEM_ID = 'M109' THEN M109 ELSE NULL END) AS F109  --전기전도도 유입수                                                             \n\r";
	sql+="  FROM (                                                                                                                                                                                      \n\r";
	sql+="        SELECT DECODE(A.RIVER_ID, 'R01', '한강', 'R02', '낙동강', 'R03', '금강', '영산강') AS RIVER_ID                                                                      \n\r";
	sql+="             , A.SITE_ID                                                                                                                                                                       \n\r";
	sql+="             , SITE_NAME                                                                                                                                                                    \n\r";
	sql+="             , TO_CHAR(TO_DATE(MSR_DATE,'YYYY.MM.DD HH24:MI:SS'),'YYYY.MM.DD HH24:MI') AS MSR_DATE                                                     \n\r";
	sql+="             , M01, M02, M03, M04, M05, M06, M07, M08, M09, M10, M11, M12, M13, M14, M15, M16,                                                             \n\r";
	sql+="			 M17, M18, M19, M20, M21, M22, M23, M24, M25, M26, M27, M28, M29, M30, M31, M32,                                                               \n\r";
	sql+="			 M33, M34, M35, M36, M37, M38, M39, M40, M41, M42, M43, M44, M45, M46, M47, M48,                                                               \n\r";
	sql+="			 M49, M50, M51, M52, M53, M54, M55, M56, M57, M58, M59, M60, M61, M62, M63, M64,                                                               \n\r";
	sql+="			 M65, M66, M67, M68, M69, M70, M71, M72, M73, M74, M75, M76, M77, M78, M79, M80,                                                               \n\r";
	sql+="			 M81, M82, M83, M84, M85, M86, M87, M88, M89, M90, M91, M92, M93, M94, M95, M96,                                                               \n\r";
	sql+="			 M97, M98, M99, M100, M101, M105, M106, M107, M108, M109                                                                                                 \n\r";
	sql+="          FROM SITEINFO_TB A                                                                                                                                                            \n\r";
	sql+="             , MAN_FIVEDATA_TB B                                                                                                                                                       \n\r";
	sql+="         WHERE A.SITE_ID = B.SITE_ID                                                                                                                                                   \n\r";
	sql+="           AND A.SITE_ID IN (" + siteIds + ") -- 지점코드                                                                                                                  \n\r";
	sql+="           AND SUBSTR(MSR_DATE,1,6) >= '" + startYYYYMM + "'                                                                                                                          \n\r";
	sql+="           AND SUBSTR(MSR_DATE,1,6) <= '" + endYYYYMM + "'                                                                                                                          \n\r";
	sql+="       ) AA                                                                                                                                                                                     \n\r";
	sql+="     , (                                                                                                                                                                                          \n\r";
	sql+="        SELECT SITE_ID, ITEM_ID                                                                                                                                                          \n\r";
	sql+="          FROM SITEITEMLIST2_TB                                                                                                                                                        \n\r";
	sql+="         WHERE USE_YN = '1'                                                                                                                                                              \n\r";
	sql+="       ) BB                                                                                                                                                                                     \n\r";
	sql+=" WHERE AA.SITE_ID = BB.SITE_ID                                                                                                                                                        \n\r";
	sql+=" GROUP BY RIVER_ID, SITE_NAME, MSR_DATE                                                                                                                                        \n\r";
	sql+=")                                                                                                                                                                                                \n\r";
	sql+="SELECT RIVER_ID -- 대권역                                                                                                                                                                \n\r";
	sql+="     , SITE_NAME -- 측정소명                                                                                                                                                              \n\r";
	sql+="     , MSR_DATE -- 측정일시                                                                                                                                                               \n\r";
	sql+="     , CASE WHEN F02 IS NOT NULL THEN F02                                                                                                                                       \n\r";
	sql+="            WHEN F38 IS NOT NULL THEN F38                                                                                                                                        \n\r";
	sql+="            ELSE F69                                                                                                                                                                          \n\r";
	sql+="       END F02 --수온(℃)                                                                                                                                                                   \n\r";
	sql+="     , CASE WHEN F03 IS NOT NULL THEN F03                                                                                                                                       \n\r";
	sql+="            WHEN F39 IS NOT NULL THEN F39                                                                                                                                        \n\r";
	sql+="            ELSE F70                                                                                                                                                                          \n\r";
	sql+="       END F03 --수소이온농도                                                                                                                                                             \n\r";
	sql+="     , CASE WHEN F04 IS NOT NULL THEN F04                                                                                                                                       \n\r";
	sql+="            WHEN F40 IS NOT NULL THEN F40                                                                                                                                        \n\r";
	sql+="            ELSE F71                                                                                                                                                                          \n\r";
	sql+="       END F04 --전기전도도(μS/cm)                                                                                                                                                     \n\r";
	sql+="     , CASE WHEN F05 IS NOT NULL THEN F05                                                                                                                                       \n\r";
	sql+="            WHEN F41 IS NOT NULL THEN F41                                                                                                                                        \n\r";
	sql+="            ELSE F72                                                                                                                                                                          \n\r";
	sql+="       END F05 --용존산소(mg/L)                                                                                                                                                         \n\r";
	sql+="     , CASE WHEN F06 IS NOT NULL THEN F06                                                                                                                                       \n\r";
	sql+="            ELSE F81                                                                                                                                                                          \n\r";
	sql+="       END F06 --총유기탄소(mg/L)                                                                                                                                                       \n\r";
	sql+="     , CASE WHEN F79 IS NOT NULL THEN F79                                                                                                                                       \n\r";
	sql+="            WHEN F80 IS NOT NULL THEN F80                                                                                                                                        \n\r";
	sql+="            ELSE F73                                                                                                                                                                          \n\r";
	sql+="       END F05 --탁도                                                                                                                                                                       \n\r";
	sql+="     , F27  --총질소(mg/L)                                                                                                                                                                  \n\r";
	sql+="     , F28  --총인(mg/L)                                                                                                                                                                    \n\r";
	sql+="     , F36  --암모니아성질소(mg/L)                                                                                                                                                       \n\r";
	sql+="     , F37  --질산성질소(mg/L)                                                                                                                                                            \n\r";
	sql+="     , F35  --인산염인(mg/L)                                                                                                                                                               \n\r";
	sql+="     , F29  --클로로필-a(mg/㎥)                                                                                                                                                           \n\r";
	sql+="     , F14  --벤젠(μg/L)                                                                                                                                                                     \n\r";
	sql+="     , F17  --톨루엔(μg/L)                                                                                                                                                                  \n\r";
	sql+="     , F19  --에틸벤젠(μg/L)                                                                                                                                                                \n\r";
	sql+="     , F56  --자일렌                                                                                                                                                                          \n\r";
	sql+="     , F20  --m,p-자일렌(μg/L)                                                                                                                                                             \n\r";
	sql+="     , F21  --o-자일렌(μg/L)                                                                                                                                                                \n\r";
	sql+="     , F22  --염화메틸렌(μg/L)                                                                                                                                                             \n\r";
	sql+="     , F23  --1.1.1-트리클로로에테인(μg/L)                                                                                                                                              \n\r";
	sql+="     , F24  --사염화탄소(μg/L)                                                                                                                                                             \n\r";
	sql+="     , F25  --트리클로로에틸렌(μg/L)                                                                                                                                                     \n\r";
	sql+="     , F26  --테트라클로로에틸렌(μg/L)                                                                                                                                                   \n\r";
	sql+="     , F74  --카드뮴(mg/L)                                                                                                                                                                  \n\r";
	sql+="     , F75  --납(mg/L)                                                                                                                                                                       \n\r";
	sql+="     , F76  --구리(mg/L)                                                                                                                                                                    \n\r";
	sql+="     , F77  --아연(mg/L)                                                                                                                                                                    \n\r";
	sql+="     , CASE WHEN F78 IS NOT NULL THEN F78                                                                                                                                       \n\r";
	sql+="            ELSE F100                                                                                                                                                                        \n\r";
	sql+="       END F06 --페놀(mg/L)                                                                                                                                                              \n\r";
	sql+="     , F07  --임펄스(pulse)                                                                                                                                                                  \n\r";
	sql+="     , F12  --염화메틸렌(μg/L)                                                                                                                                                             \n\r";
	sql+="     , F13  --1.1.1-트리클로로에테인(μg/L)                                                                                                                                              \n\r";
	sql+="     , F15  --사염화탄소(μg/L)                                                                                                                                                             \n\r";
	sql+="     , F16  --트리클로로에틸렌(μg/L)                                                                                                                                                     \n\r";
	sql+="     , F18  --테트라클로로에틸렌(μg/L)                                                                                                                                                   \n\r";
	sql+="     , F31  --임펄스(우)(pulse)                                                                                                                                                             \n\r";
	sql+="     , F32  --임펄스(좌)(pulse)                                                                                                                                                             \n\r";
	sql+="     , F57  --독성지수(좌)                                                                                                                                                                   \n\r";
	sql+="     , F58  --유영속도(좌)                                                                                                                                                                   \n\r";
	sql+="     , F59  --개체수(좌)                                                                                                                                                                      \n\r";
	sql+="     , F63  --독성지수(우)                                                                                                                                                                   \n\r";
	sql+="     , F64  --유영속도(우)                                                                                                                                                                   \n\r";
	sql+="     , F65  --개체수(우)                                                                                                                                                                      \n\r";
	sql+="     , F84  --미생물 독성지수                                                                                                                                                               \n\r";
	sql+="     , F87  --조류 독성지수                                                                                                                                                                 \n\r";
	sql+="     , F105 --독성도                                                                                                                                                                          \n\r";
	sql+="     , F106 --전기전도도 R1                                                                                                                                                                \n\r";
	sql+="     , F107 --전기전도도 R2                                                                                                                                                                \n\r";
	sql+="     , F108 --전기전도도 R3                                                                                                                                                                \n\r";
	sql+="     , F109 --전기전도도 유입수                                                                                                                                                            \n\r";
	sql+="  FROM TBL_TEMP                                                                                                                                                                          \n\r";
	sql+=" ORDER BY RIVER_ID, MSR_DATE, SITE_NAME                                                                                                                                        \n\r";
   //out.print(sql);
   stmt = con.createStatement();   
   rs = stmt.executeQuery(sql);
	JSONObject jsonObj  = new JSONObject();
	JSONArray jsonArr = new JSONArray();
	JSONObject jsonRecord = null;
	
	while(rs.next()) {
		jsonRecord = new JSONObject();
		jsonRecord.put("RIVER_ID" , rs.getString("RIVER_ID"));
		jsonRecord.put("SITE_NAME" , rs.getString("SITE_NAME"));
		jsonRecord.put("MSR_DATE" , rs.getString("MSR_DATE"));
		jsonRecord.put("F02" , rs.getFloat("F02"));
		
		jsonRecord.put("F03" , rs.getFloat("F03"));
		jsonRecord.put("F04" , rs.getFloat("F04"));
		jsonRecord.put("F05" , rs.getFloat("F05"));
		jsonRecord.put("F06" , rs.getFloat("F06"));
		jsonRecord.put("F05" , rs.getFloat("F05"));
		jsonRecord.put("F27" , rs.getFloat("F27"));
		jsonRecord.put("F28" , rs.getFloat("F28"));
		jsonRecord.put("F36" , rs.getFloat("F36"));
		jsonRecord.put("F37" , rs.getFloat("F37"));
		jsonRecord.put("F35" , rs.getFloat("F35"));
		
		jsonRecord.put("F29" , rs.getFloat("F29"));
		jsonRecord.put("F14" , rs.getFloat("F14"));
		jsonRecord.put("F17" , rs.getFloat("F17"));
		jsonRecord.put("F19" , rs.getFloat("F19"));
		jsonRecord.put("F56" , rs.getFloat("F56"));
		jsonRecord.put("F20" , rs.getFloat("F20"));
		jsonRecord.put("F21" , rs.getFloat("F21"));
		jsonRecord.put("F22" , rs.getFloat("F22"));
		jsonRecord.put("F23" , rs.getFloat("F23"));
		jsonRecord.put("F24" , rs.getFloat("F24"));
		jsonRecord.put("F25" , rs.getFloat("F25"));
		jsonRecord.put("F26" , rs.getFloat("F26"));
		jsonRecord.put("F74" , rs.getFloat("F74"));
		jsonRecord.put("F75" , rs.getFloat("F75"));
		jsonRecord.put("F76" , rs.getFloat("F76"));
		jsonRecord.put("F77" , rs.getFloat("F77"));
		jsonRecord.put("F06" , rs.getFloat("F06"));
		
		jsonRecord.put("F07" , rs.getFloat("F07"));
		jsonRecord.put("F12" , rs.getFloat("F12"));
		jsonRecord.put("F13" , rs.getFloat("F13"));
		jsonRecord.put("F15" , rs.getFloat("F15"));
		jsonRecord.put("F16" , rs.getFloat("F16"));
		jsonRecord.put("F18" , rs.getFloat("F18"));
		jsonRecord.put("F31" , rs.getFloat("F31"));
		jsonRecord.put("F32" , rs.getFloat("F32"));
		jsonRecord.put("F57" , rs.getFloat("F57"));
		jsonRecord.put("F58" , rs.getFloat("F58"));
		jsonRecord.put("F59" , rs.getFloat("F59"));
		jsonRecord.put("F63" , rs.getFloat("F63"));
		jsonRecord.put("F64" , rs.getFloat("F64"));
		jsonRecord.put("F65" , rs.getFloat("F65"));
		
		jsonRecord.put("F84" , rs.getFloat("F84"));
		jsonRecord.put("F87" , rs.getFloat("F87"));
		jsonRecord.put("F105" , rs.getFloat("F105"));
		jsonRecord.put("F106" , rs.getFloat("F106"));
		jsonRecord.put("F107" , rs.getFloat("F107"));
		jsonRecord.put("F108" , rs.getFloat("F108"));
		jsonRecord.put("F109" , rs.getFloat("F109"));
	
		

		
  		jsonArr.add(jsonRecord);
	}
	
	jsonObj.put("data", jsonArr);
   
   out.print(jsonObj);
   //out.print("success");
}catch(Exception ex){
	//throw;
	System.out.println(ex);
	System.out.println(sql);
	//out.print(ex);
	out.print("error");
} 
%>
<%@ include file="dbClose.jsp" %>