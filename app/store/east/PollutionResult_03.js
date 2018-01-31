Ext.define('krf_new.store.east.PollutionResult_03', {
    extend : 'Ext.data.Store',
    fields: [
             'YYYY'/* 조사년도 */
             ,'WS_NM'
             ,'MB_NM'
             ,'SB_NM'
             ,'CAT_DID'
             ,'ADDR'/* 법정동리 */
             ,'FINAL_PERCENTAGE'
             /* 점유율 */
             ,'INST_CD'/* 관할기관 */
             ,'STOP_FLAG'/* 휴업 */
             ,'IND_ID'/* 사업자등록번호 */
             ,'IND_NM'/* 업소명 */
             ,'TEL_NO'/* 전화 */
             ,'IND_OWNER'/* 대표자 */
             ,'LC_YN'/* 허가신고여부 */
             ,'IND_,type'/* 업종 */
             ,'SCALE'/* 규모 */
             ,'CTG_NM'/* 업소형태 */
             ,'TOX_FLAG'/* 유해물질배출여부 */
             ,{name:'AVG_ELV'  ,type: 'number'}             /* 평균해발고도(M) */
             ,{name:'CAPITAL'  ,type: 'number'}             /* 자본금(백만원) */
             ,{name:'AREA_LAND'  ,type: 'number'}             /* 사업장면적 대지(㎡) */
             ,{name:'AREA_BDG'  ,type: 'number'}             /* 사업장면적 건물(㎡) */
             ,'REGION1'/* 지역구분1 */
             ,'REGION2'/* 지역구분2 */
             ,'IND_BASE_CD'/* 산업단지 */
             ,'IND_ETC'/* 기타산업단지 */
             ,'FARM_CD'/* 농공단지 */
             ,'FARM_ETC'/* 기타농공단지 */
             ,'PROTECT_AREA'/* 상수원보호구역 */
             ,'IND_GRADE'/* 업소관리등급 */
             ,'SELF_,type'/* 자가측정유형 */
             ,'MGR1_NM'/* 환경관리인1 성명 */
             ,'MGR1_CERT'/* 환경관리인1 자격등급 */
             ,'MGR2_NM'/* 환경관리인2 성명 */
             ,'MGR2_CERT'/* 환경관리인2 자격등급 */
             ,'MGR_DEP'/* 전담부서 형태 */
             ,'MGR_CNT'/* 전담부서 인원(명) */
             ,'MTL1_NM'/* 원료1 원료명 */
             ,'MTL2_NM'/* 원료2 원료명 */
             ,'MTL3_NM'/* 원료3 원료명 */
             ,'PDT1_NM'/* 제품1 제품명 */
             ,{name:'PDT1_AMT'  ,type: 'number'}             /* 제품1 생산량 */
             ,'PDT2_NM'/* 제품2 제품명 */
             ,{name:'PDT2_AMT'  ,type: 'number'}             /* 제품2 생산량 */
             ,'PDT3_NM'/* 제품3 제품명 */
             ,{name:'PDT3_AMT'  ,type: 'number'}             /* 제품3 생산량 */
             ,'TRT_,type'/* 폐수처리 형태 */
             ,'DEND_CD'/* 폐수처리 종말처리 */
             ,'DEND_ETC'/* 폐수처리 기타종말 */
             ,'DPUB_CD'/* 폐수처리 공동처리 */
             ,'DPUB_ETC'/* 폐수처리 기타공동 */
             ,'DIND_CD'/* 폐수처리 위탁처리 */
             ,'DIND_ETC'/* 폐수처리 기타위탁 */
             ,'AREA_CD'/* 배출허용기준적용지역 */
             ,'FACI_NM'/* 연계처리시설 */
             ,'RV_SEC_CD'/* 방류구역코드 */
             ,'STREAM_PATH'/* 방류하천코드 */
             ,'WTF_NAME'/* 하류취수장이름 */
             ,{name:'WUSE_T_SUM'  ,type: 'number'}             /* 총용수량 계(㎥/일) */
             ,{name:'WUSE_T_WATERWORK'  ,type: 'number'}             /*  총용수량 상수도(㎥/일) */
             ,{name:'WUSE_T_GROUND'  ,type: 'number'}             /*  총용수량 지하수급수(㎥/일) */
             ,{name:'WUSE_T_STREAM'  ,type: 'number'}             /*  총용수량 하천수(㎥/일) */
             ,{name:'WUSE_T_SEA'  ,type: 'number'}             /*  총용수량 해수(㎥/일) */
             ,{name:'WUSE_T_RECYCLE'  ,type: 'number'}             /*  총용수량 재이용수(㎥/일) */
             ,{name:'WUSE_I_SUM'  ,type: 'number'}             /* 공업용수량 계(㎥/일) */
             ,{name:'WUSE_I_BOILERUSE'  ,type: 'number'}             /*  원료및보일러용수(㎥/일) */
             ,{name:'WUSE_I_INDUSE'  ,type: 'number'}             /*  공업용수량공정용수(㎥/일) */
             ,{name:'WUSE_I_DILTE'  ,type: 'number'}             /*  공업용수량 희석수(㎥/일) */
             ,{name:'WUSE_I_COOLING'  ,type: 'number'}             /*  공업용수량 기타수(㎥/일) */
             ,{name:'WUSE_P'  ,type: 'number'}             /* 생활용수량(㎥/일) */
             ,{name:'WUSE_E'  ,type: 'number'}             /* 제품및증발량(㎥/일) */
             ,{name:'WUSE_W_SUM'  ,type: 'number'}             /* 폐수발생량 계(㎥/일) */
             ,{name:'WUSE_W_INDUSE'  ,type: 'number'}             /*  폐수발생량공정폐수(㎥/일) */
             ,{name:'WUSE_W_COOLING'  ,type: 'number'}             /*  폐수발생량냉각폐수(㎥/일) */
             ,{name:'WUSE_W_LIFE'  ,type: 'number'}             /*  폐수발생량생활오수(㎥/일) */
             ,{name:'WUSE_D'  ,type: 'number'}             /* 폐수방류량(㎥/일) */
             ,{name:'WUSE_DC'  ,type: 'number'}             /* 냉각수방류량(㎥/일) */
             ,{name:'WUSE_R_SUM'  ,type: 'number'}             /* 폐수재이용수량 계(㎥/일) */
             ,{name:'WUSE_R_BEFORE'  ,type: 'number'}             /*  처리장유입전(㎥/일) */
             ,{name:'WUSE_R_IN'  ,type: 'number'}             /*  처리장내(㎥/일) */
             ,{name:'WUSE_R_AFTER'  ,type: 'number'}             /*  폐수처리후(㎥/일) */
             ,{name:'WUSE_MAX'  ,type: 'number'}             /* 최대폐수발생량(㎥/일) */
             ,{name:'CU_B'  ,type: 'number'}             /* 처리전 구리(㎎/ℓ) */
             ,{name:'PB_B'  ,type: 'number'}             /* 처리전 납(㎎/ℓ) */
             ,{name:'A_S_B'  ,type: 'number'}             /* 처리전 비소(㎎/ℓ) */
             ,{name:'HG_B'  ,type: 'number'}             /* 처리전 수은(㎎/ℓ) */
             ,{name:'CROM_B'  ,type: 'number'}             /* 처리전 시안(㎎/ℓ) */
             ,{name:'OP_B'  ,type: 'number'}             /* 처리전 유기인(㎎/ℓ) */
             ,{name:'CR6_B'  ,type: 'number'}             /* 처리전 6가크롬(㎎/ℓ) */
             ,{name:'CD_B'  ,type: 'number'}             /* 처리전 카드뮴(㎎/ℓ) */
             ,{name:'PC_B'  ,type: 'number'}             /* 처리전 테트라클로로에틸렌(㎎/ℓ) */
             ,{name:'TC_B'  ,type: 'number'}             /* 처리전 트리클로로에틸렌(㎎/ℓ) */
             ,{name:'PE_B'  ,type: 'number'}             /* 처리전 페놀(㎎/ℓ) */
             ,{name:'PCB_B'  ,type: 'number'}             /* 처리전 PCB(㎎/ℓ) */
             ,{name:'SEL_B'  ,type: 'number'}             /* 처리전 셀레늄(㎎/ℓ) */
             ,{name:'BEN_B'  ,type: 'number'}             /* 처리전 벤젠(㎎/ℓ) */
             ,{name:'CAR_B'  ,type: 'number'}             /* 처리전 사염화탄소(㎎/ℓ) */
             ,{name:'DICH_B'  ,type: 'number'}             /* 처리전 디클로로메탄(㎎/ℓ) */
             ,{name:'ETHYL_11_B'  ,type: 'number'}             /* 처리전 1,1-디클로로에틸렌(㎎/ℓ) */
             ,{name:'ETHYL_12_B'  ,type: 'number'}             /* 처리전 1,2-디클로로에탄(㎎/ℓ) */
             ,{name:'CHLO_B'  ,type: 'number'}             /* 처리전 클로로폼(㎎/ℓ) */
             ,{name:'CU_A'  ,type: 'number'}             /* 처리후 구리(㎎/ℓ) */
             ,{name:'PB_A'  ,type: 'number'}             /* 처리후 납(㎎/ℓ) */
             ,{name:'A_S_A'  ,type: 'number'}             /* 처리후 비소(㎎/ℓ) */
             ,{name:'HG_A'  ,type: 'number'}             /* 처리후 수은(㎎/ℓ) */
             ,{name:'CROM_A'  ,type: 'number'}             /* 처리후 시안(㎎/ℓ) */
             ,{name:'OP_A'  ,type: 'number'}             /* 처리후 유기인(㎎/ℓ) */
             ,{name:'CR6_A'  ,type: 'number'}             /* 처리후 6가크롬(㎎/ℓ) */
             ,{name:'CD_A'  ,type: 'number'}             /* 처리후 카드뮴(㎎/ℓ) */
             ,{name:'PC_A'  ,type: 'number'}             /* 처리후 테트라클로로에틸렌(㎎/ℓ) */
             ,{name:'TC_A'  ,type: 'number'}             /* 처리후 트리클로로에틸렌(㎎/ℓ) */
             ,{name:'PE_A'  ,type: 'number'}             /* 처리후 페놀(㎎/ℓ) */
             ,{name:'PCB_A'  ,type: 'number'}             /* 처리후 PCB(㎎/ℓ) */
             ,{name:'SEL_A'  ,type: 'number'}             /* 처리후 셀레늄(㎎/ℓ) */
             ,{name:'BEN_A'  ,type: 'number'}             /* 처리후 벤젠(㎎/ℓ) */
             ,{name:'CAR_A'  ,type: 'number'}             /* 처리후 사염화탄소(㎎/ℓ) */
             ,{name:'DICH_A'  ,type: 'number'}             /* 처리후 디클로로메탄(㎎/ℓ) */
             ,{name:'ETHYL_11_A'  ,type: 'number'}             /* 처리후 1,1-디클로로에틸렌(㎎/ℓ) */
             ,{name:'ETHYL_12_A'  ,type: 'number'}             /* 처리후 1,2-디클로로에탄(㎎/ℓ) */
             ,{name:'CHLO_A'  ,type: 'number'}             /* 처리후 클로로폼(㎎/ℓ) */
             ,{name:'TWW_AMT'  ,type: 'number'}             /* 폐수오염도_특정폐수발생량(㎥/일) */
             ,{name:'TWW_DISCHARGE'  ,type: 'number'}             /* 폐수오염도_특정폐수방류량(㎥/일) */
             ,{name:'PH_B'  ,type: 'number'}             /* 처리전 PH(㎎/ℓ) */
             ,{name:'BOD_B'  ,type: 'number'}             /* 처리전 BOD(㎎/ℓ) */
             ,{name:'COD_B'  ,type: 'number'}             /* 처리전 COD(㎎/ℓ) */
             ,{name:'SS_B'  ,type: 'number'}             /* 처리전 SS(㎎/ℓ) */
             ,{name:'NHEX_A_B'  ,type: 'number'}             /* N헥산_B(광유류)(㎎/ℓ) */
             ,{name:'NHEX_P_B'  ,type: 'number'}             /* N헥산_A(유지류)(㎎/ℓ) */
             ,{name:'CR_B'  ,type: 'number'}             /* 처리전 CR(㎎/ℓ) */
             ,{name:'ZN_B'  ,type: 'number'}             /* 처리전 ZN(㎎/ℓ) */
             ,{name:'MN_B'  ,type: 'number'}             /* 처리전 MN(㎎/ℓ) */
             ,{name:'ABS_B'  ,type: 'number'}             /* 처리전 계면활성제(㎎/ℓ) */
             ,{name:'F_B'  ,type: 'number'}             /* 처리전 F(㎎/ℓ) */
             ,{name:'FE_B'  ,type: 'number'}             /* 처리전 FE(㎎/ℓ) */
             ,{name:'TP_B'  ,type: 'number'}             /* 처리전 총인(㎎/ℓ) */
             ,{name:'TN_B'  ,type: 'number'}             /* 처리전 총질소(㎎/ℓ) */
             ,{name:'PH_A'  ,type: 'number'}             /* 처리후 PH(㎎/ℓ) */
             ,{name:'BOD_A'  ,type: 'number'}             /* 처리후 BOD(㎎/ℓ) */
             ,{name:'COD_A'  ,type: 'number'}             /* 처리후 COD(㎎/ℓ) */
             ,{name:'SS_A'  ,type: 'number'}             /* 처리후 SS(㎎/ℓ) */
             ,{name:'NHEX_A_A'  ,type: 'number'}             /* N헥산_A(광유류)(㎎/ℓ) */
             ,{name:'NHEX_P_A'  ,type: 'number'}             /* N헥산_A(유지류)(㎎/ℓ) */
             ,{name:'CR_A'  ,type: 'number'}             /* 처리후 CR(㎎/ℓ) */
             ,{name:'MN_A'  ,type: 'number'}             /* 처리후 MN(㎎/ℓ) */
             ,{name:'ZN_A'  ,type: 'number'}             /* 처리후 ZN(㎎/ℓ) */
             ,{name:'F_A'  ,type: 'number'}             /* 처리후 F(㎎/ℓ) */
             ,{name:'FE_A'  ,type: 'number'}             /* 처리후 FE(㎎/ℓ) */
             ,{name:'ABS_A'  ,type: 'number'}             /* 처리후 계면활성제(㎎/ℓ) */
             ,{name:'TP_A'  ,type: 'number'}             /* 처리후 총인(㎎/ℓ) */
             ,{name:'TN_A'  ,type: 'number'}             /* 처리후 총질소(㎎/ℓ) */
             ,{name:'IND_,type_1'  ,type: 'number'}             /* 배출시설1 코드 */
             ,{name:'FAC_CNT_1'  ,type: 'number'}             /* 배출시설1 시설수 */
             ,{name:'CAPA_SUM_1'  ,type: 'number'}             /* 배출시설1 배출량(㎥/일) */
             ,{name:'IND_,type_2'  ,type: 'number'}             /* 배출시설2 코드 */
             ,{name:'FAC_CNT_2'  ,type: 'number'}             /* 배출시설2 시설수 */
             ,{name:'CAPA_SUM_2'  ,type: 'number'}             /* 배출시설2 배출량(㎥/일) */
             ,{name:'IND_,type_3'  ,type: 'number'}             /* 배출시설3 코드 */
             ,{name:'FAC_CNT_3'  ,type: 'number'}             /* 배출시설3 시설수 */
             ,{name:'CAPA_SUM_3'  ,type: 'number'}             /* 배출시설3 배출량(㎥/일) */
             ,{name:'IND_,type_4'  ,type: 'number'}             /* 배출시설4 코드 */
             ,{name:'FAC_CNT_4'  ,type: 'number'}             /* 배출시설4 시설수 */
             ,{name:'CAPA_SUM_4'  ,type: 'number'}             /* 배출시설4 배출량(㎥/일) */
             ,{name:'IND_,type_5'  ,type: 'number'}             /* 배출시설5 코드 */
             ,{name:'FAC_CNT_5'  ,type: 'number'}             /* 배출시설5 시설수 */
             ,{name:'CAPA_SUM_5'  ,type: 'number'}             /* 배출시설5 배출량(㎥/일) */
             ,{name:'TEC_METHOD1'  ,type: 'number'}             /* 방지시설1 처리방법 */
             ,{name:'TFC_CAPA1'  ,type: 'number'}             /* 방지시설1 처리능력(㎥/일) */
             ,{name:'TEC_METHOD2'  ,type: 'number'}             /* 방지시설2 처리방법 */
             ,{name:'TFC_CAPA2'  ,type: 'number'}             /* 방지시설2 처리능력(㎥/일) */
             ,{name:'TEC_METHOD3'  ,type: 'number'}             /* 방지시설3 처리방법 */
             ,{name:'TFC_CAPA3'  ,type: 'number'}             /* 방지시설3 처리능력(㎥/일) */
             ,{name:'TEC_METHOD4'  ,type: 'number'}             /* 방지시설4 처리방법 */
             ,{name:'TFC_CAPA4'  ,type: 'number'}             /* 방지시설4 처리능력(㎥/일) */
             ,{name:'TEC_METHOD5'  ,type: 'number'}             /* 방지시설5 처리방법 */
             ,{name:'TFC_CAPA5'  ,type: 'number'}             /* 방지시설5 처리능력(㎥/일) */
    ],
    remoteSort: true,	
    async:false,
    listeners: {
		load: function(store) {
			var url = ""
			if(store.selectValue == "11" || store.selectValue == ""){
				url= _API.PollutionSelect_03_01; //'./resources/jsp/pollution/PollutionSelect_03_01.jsp';
			}else if(store.selectValue == "22"){
				url= _API.PollutionSelect_03_02; //'./resources/jsp/pollution/PollutionSelect_03_02.jsp';
			}else if(store.selectValue == "33"){
				url= _API.PollutionSelect_03_03; //'./resources/jsp/pollution/PollutionSelect_03_03.jsp';
			}else{
				url= _API.PollutionSelect_03_04; //'./resources/jsp/pollution/PollutionSelect_03_04.jsp';
			}
			
			Ext.Ajax.request({
        		url: url,
        		params: { 
        			catDid: store.catDid,
        			year: store.year
        		},
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			var jsonData = Ext.util.JSON.decode( response.responseText );
        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
        				store.setData(jsonData.data);
        			}
        		},
        		failure: function(form, action) {
        			alert("오류가 발생하였습니다.");
        		}
        	});
		}
    }
});