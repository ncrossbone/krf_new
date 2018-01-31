Ext.define('krf_new.view.south.pollution.SearchResultGrid_pollution_03', {
	
	extend: 'Ext.container.Container',
	
	xtype: 'searchResultGrid_pollution_03',
	
	id: 'searchResultpollution_03_container',
	
	height: '100%',
	width: '100%',
	closable: true,
	closeText: '×',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			//plugins: ['bufferedrenderer', 'gridfilters'],
			plugins: ['bufferedrenderer', 'gridfilters'],
			siteIds: "",
			parentIds: [],
			header: {
				height: 5
			},
			title: '검색결과',
			siteId: '',
			beforeRender: function(){
				
				var me = this;
				var parentCtl = this.findParentByType("window");
				
				me.setWidth(parentCtl.getWidth() - 10);
				me.setHeight(parentCtl.getHeight() - 110);
				
				parentCtl.on("resize", function(){
					////console.info(parentCtl);
					me.setWidth(parentCtl.getWidth() - 10);
					me.setHeight(parentCtl.getHeight() - 110);
				});
			},
			
			columns: [{	 
				text      : '조사년도',
				dataIndex : 'YYYY',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '대권역',
				dataIndex : 'WS_NM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '중권역',
				dataIndex : 'MB_NM',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '표준유역',
				dataIndex : 'SB_NM',
				width: 150,
				listeners:{

					click: function(tblView, el, rowCnt, colCnt, row){
						
						var value = Ext.getCmp("pollutionSelect").value;
						var coreMap = GetCoreMap();
						var pollutionLayerAdmin = coreMap.pollutionLayerAdmin;
						
		        		if(value == 11){
		        			return;
		        		}else if(value == 22){	
		        			var swNm = row.record.data.SB_NM;
		        			
		        			var catStore = null;
		        			
		        			var coreMap = GetCoreMap();
		        			
		        			var catDids = []; 
		        			var catDids_All = [];
		        			for(var i = 0; i < coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				if(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.SB_NM == swNm){
		        					catDids.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        				}
		        			}
		        			
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.initOpacity);
		        			}
		        			
		        			for(var j = 0; j < catDids.length;j++){
		        				var polySymbol = $("#polySymbol_" + catDids[j]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.mouseOverOpacity);
		        			}
		        			
						}else{
							var cat_did = row.record.data.CAT_DID;
							
							
							var catDids_All = [];
		        			for(var i = 0; i < coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics.length ;i++){
		        				catDids_All.push(coreMap.pollutionLayerAdmin.pollutionGraphicLayerCat.graphics[i].attributes.CAT_DID);
		        			}
							
		        			for(var k = 0; k < catDids_All.length;k++){
		        				var polySymbol = $("#polySymbol_" + catDids_All[k]);
				        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.initOpacity);
		        			}
							
							var polySymbol = $("#polySymbol_" + cat_did);
			        		polySymbol[0].setAttribute("opacity", pollutionLayerAdmin.mouseOverOpacity);
						}
					}
				}
			},{	 
				text      : '집수구역',
				dataIndex : 'CAT_DID',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '법정동리',
				dataIndex : 'ADDR',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '점유율',
				dataIndex : 'FINAL_PERCENTAGE',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '관할기관',
				dataIndex : 'INST_CD',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '휴업',
				dataIndex : 'STOP_FLAG',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '사업자등록번호',
				dataIndex : 'IND_ID',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '업소명',
				dataIndex : 'IND_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '전화',
				dataIndex : 'TEL_NO',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '대표자',
				dataIndex : 'IND_OWNER',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '허가신고여부',
				dataIndex : 'LC_YN',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '업종',
				dataIndex : 'IND_TYPE',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '규모',
				dataIndex : 'SCALE',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '업소형태',
				dataIndex : 'CTG_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '유해물질배출여부',
				dataIndex : 'TOX_FLAG',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '평균해발고도(m)',
				dataIndex : 'AVG_ELV',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '자본금(백만원)',
				dataIndex : 'CAPITAL',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '사업자면적',
				columns:[{
					text: '대지(㎡)',
					dataIndex : 'AREA_LAND',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '건물(㎡)',
					dataIndex : 'AREA_BDG',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '지역구분1',
				dataIndex : 'REGION1',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '지역구분2',
				dataIndex : 'REGION2',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '산업단지',
				dataIndex : 'IND_BASE_CD',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '기타산업단지',
				dataIndex : 'IND_ETC',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '농공단지',
				dataIndex : 'FARM_CD',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '기타농공단지',
				dataIndex : 'FARM_ETC',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '상수원보호구역',
				dataIndex : 'PROTECT_AREA',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '업소관리등급',
				dataIndex : 'IND_GRADE',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '자가측정유형',
				dataIndex : 'SELF_TYPE',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '환경관리인1',
				columns:[{
					text: '성명',
					dataIndex : 'MGR1_NM',
					width: 150,
					hidden: true
				},{
					text: '자격등급',
					dataIndex : 'MGR1_CERT',
					width: 150,
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '환경관리인2',
				columns:[{
					text: '성명',
					dataIndex : 'MGR2_NM',
					width: 150,
					hidden: true
				},{
					text: '자격등급',
					dataIndex : 'MGR2_CERT',
					width: 150,
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '전담부서',
				columns:[{
					text: '형태',
					dataIndex : 'MGR_DEP',
					width: 150,
					hidden: true
				},{
					text: '인원(명)',
					dataIndex : 'MGR_CNT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '원료1 원료명',
				dataIndex : 'MTL1_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '원료2 원료명',
				dataIndex : 'MTL2_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '원료3 원료명',
				dataIndex : 'MTL3_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '제품1',
				columns:[{
					text: '제품명',
					dataIndex : 'PDT1_NM',
					width: 150,
					hidden: true
				},{
					text: '생산량',
					dataIndex : 'PDT1_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '제품2',
				columns:[{
					text: '제품명',
					dataIndex : 'PDT2_NM',
					width: 150,
					hidden: true
				},{
					text: '생산량',
					dataIndex : 'PDT1_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '제품3',
				columns:[{
					text: '제품명',
					dataIndex : 'PDT3_NM',
					width: 150,
					hidden: true
				},{
					text: '생산량',
					dataIndex : 'PDT3_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '폐수처리',
				columns:[{
					text: '형태',
					dataIndex : 'TRT_TYPE',
					width: 150,
					hidden: true
				},{
					text: '종말처리',
					dataIndex : 'DEND_CD',
					width: 150,
					hidden: true
				},{
					text: '기타종말',
					dataIndex : 'DEND_ETC',
					width: 150,
					hidden: true
				
				},{
					text: '공동처리',
					dataIndex : 'DPUB_CD',
					width: 150,
					hidden: true
				
				},{
					text: '기타공동',
					dataIndex : 'DPUB_ETC',
					width: 150,
					hidden: true
				
				},{
					text: '위탁처리',
					dataIndex : 'DIND_CD',
					width: 150,
					hidden: true
				
				},{
					text: '기타위탁',
					dataIndex : 'DIND_ETC',
					width: 150,
					hidden: true
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '배출허용기준적용지역',
				dataIndex : 'AREA_CD',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '연계처리시설',
				dataIndex : 'FACI_NM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '방류구역코드',
				dataIndex : 'STREAM_PATH',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '방류하천코드',
				dataIndex : 'WTF_NAME',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '하류취수장이름',
				dataIndex : 'WUSE_T_SUM',
				width: 150,
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '총용수량',
				columns:[{
					text: '계(㎥/일)',
					dataIndex : 'WUSE_T_SUM',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '상수도(㎥/일)',
					dataIndex : 'WUSE_T_WATERWORK',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '지하수급수(㎥/일)',
					dataIndex : 'WUSE_T_GROUND',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				},{
					text: '하천수(㎥/일)',
					dataIndex : 'WUSE_T_STREAM',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				},{
					text: '해수(㎥/일)',
					dataIndex : 'WUSE_T_SEA',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				},{
					text: '재이용수(㎥/일)',
					dataIndex : 'WUSE_T_RECYCLE',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '공업용수량',
				columns:[{
					text: '계(㎥/일)',
					dataIndex : 'WUSE_I_SUM',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '원료및보일러용수(㎥/일)',
					dataIndex : 'WUSE_I_BOILERUSE',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '공정용수(㎥/일)',
					dataIndex : 'WUSE_I_INDUSE',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				},{
					text: '희석수(㎥/일)',
					dataIndex : 'WUSE_I_DILTE',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				},{
					text: '기타수(㎥/일)',
					dataIndex : 'WUSE_I_COOLING',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '생활용수량(㎥/일)',
				dataIndex : 'WUSE_P',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '제품및증발량(㎥/일)',
				dataIndex : 'WUSE_E',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '폐수발생량',
				columns:[{
					text: '계(㎥/일)',
					dataIndex : 'WUSE_W_SUM',
					width: 150,
					filter: {type: 'numeric'}
				},{
					text: '공정폐수(㎥/일)',
					dataIndex : 'WUSE_W_INDUSE',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '냉각폐수(㎥/일)',
					dataIndex : 'WUSE_W_COOLING',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				},{
					text: '생활오수(㎥/일)',
					dataIndex : 'WUSE_W_LIFE',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '폐수방류량(㎥/일)',
				dataIndex : 'WUSE_D',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '냉각수방류량(㎥/일)',
				dataIndex : 'WUSE_DC',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '폐수재이용수량 계(㎥/일)',
				dataIndex : 'WUSE_R_SUM',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '처리장유입전(㎥/일)',
				dataIndex : 'WUSE_R_BEFORE',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '처리장내(㎥/일)',
				dataIndex : 'WUSE_R_IN',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '폐수처리후(㎥/일)',
				dataIndex : 'WUSE_R_AFTER',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '최대폐수발생량(㎥/일)',
				dataIndex : 'WUSE_MAX',
				width: 150,
				filter: {type: 'numeric'},
				hidden: true
				//filter: {type: 'numeric'}
			},{	 
				text      : '처리전',
				columns:[{
					text: '구리(㎎/ℓ)',
					dataIndex : 'CU_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '납(㎎/ℓ)',
					dataIndex : 'PB_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '비소(㎎/ℓ)',
					dataIndex : 'A_S_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '수은(㎎/ℓ)',
					dataIndex : 'HG_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '시안(㎎/ℓ)',
					dataIndex : 'CROM_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '유기인(㎎/ℓ)',
					dataIndex : 'OP_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '6가크롬(㎎/ℓ)',
					dataIndex : 'CR6_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '카드뮴(㎎/ℓ)',
					dataIndex : 'CD_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '테트라클로로에틸렌(㎎/ℓ)',
					dataIndex : 'PC_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '트리클로로에틸렌(㎎/ℓ)',
					dataIndex : 'TC_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '페놀(㎎/ℓ)',
					dataIndex : 'PE_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'PCB(㎎/ℓ)',
					dataIndex : 'PCB_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '셀레늄(㎎/ℓ)',
					dataIndex : 'SEL_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '벤젠(㎎/ℓ)',
					dataIndex : 'BEN_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '사염화탄소(㎎/ℓ)',
					dataIndex : 'CAR_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '디클로로메탄(㎎/ℓ)',
					dataIndex : 'DICH_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '1,1-디클로로에틸렌(㎎/ℓ)',
					dataIndex : 'ETHYL_11_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '1,2-디클로로에탄(㎎/ℓ)',
					dataIndex : 'ETHYL_12_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '클로로폼(㎎/ℓ)',
					dataIndex : 'CHLO_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'pH(㎎/ℓ)',
					dataIndex : 'PH_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'BOD(㎎/ℓ)',
					dataIndex : 'BOD_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'COD(㎎/ℓ)',
					dataIndex : 'COD_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'SS(㎎/ℓ)',
					dataIndex : 'SS_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'n헥산(광유류)(㎎/ℓ)',
					dataIndex : 'NHEX_A_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'n헥산(유지류)(㎎/ℓ)',
					dataIndex : 'NHEX_P_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Cr(㎎/ℓ)',
					dataIndex : 'CR_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Zn(㎎/ℓ)',
					dataIndex : 'ZN_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Mn(㎎/ℓ)',
					dataIndex : 'MN_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '계면활성제(㎎/ℓ)',
					dataIndex : 'ABS_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'F(㎎/ℓ)',
					dataIndex : 'F_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Fe(㎎/ℓ)',
					dataIndex : 'FE_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '총인(㎎/ℓ)',
					dataIndex : 'TP_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '총질소(㎎/ℓ)',
					dataIndex : 'TN_B',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '처리후',
				columns:[{
					text: '구리(㎎/ℓ)',
					dataIndex : 'CU_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '납(㎎/ℓ)',
					dataIndex : 'PB_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '비소(㎎/ℓ)',
					dataIndex : 'A_S_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '수은(㎎/ℓ)',
					dataIndex : 'HG_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '시안(㎎/ℓ)',
					dataIndex : 'CROM_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '유기인(㎎/ℓ)',
					dataIndex : 'OP_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '6가크롬(㎎/ℓ)',
					dataIndex : 'CR6_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '카드뮴(㎎/ℓ)',
					dataIndex : 'CD_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '테트라클로로에틸렌(㎎/ℓ)',
					dataIndex : 'PC_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '트리클로로에틸렌(㎎/ℓ)',
					dataIndex : 'TC_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '페놀(㎎/ℓ)',
					dataIndex : 'PE_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'PCB(㎎/ℓ)',
					dataIndex : 'PCB_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '셀레늄(㎎/ℓ)',
					dataIndex : 'SEL_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '벤젠(㎎/ℓ)',
					dataIndex : 'BEN_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '사염화탄소(㎎/ℓ)',
					dataIndex : 'CAR_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '디클로로메탄(㎎/ℓ)',
					dataIndex : 'DICH_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '1,1-디클로로에틸렌(㎎/ℓ)',
					dataIndex : 'ETHYL_11_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '1,2-디클로로에탄(㎎/ℓ)',
					dataIndex : 'ETHYL_12_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '클로로폼(㎎/ℓ)',
					dataIndex : 'CHLO_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'pH(㎎/ℓ)',
					dataIndex : 'PH_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'BOD(㎎/ℓ)',
					dataIndex : 'BOD_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'COD(㎎/ℓ)',
					dataIndex : 'COD_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'SS(㎎/ℓ)',
					dataIndex : 'SS_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'n헥산(광유류)(㎎/ℓ)',
					dataIndex : 'NHEX_A_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'n헥산(유지류)(㎎/ℓ)',
					dataIndex : 'NHEX_P_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Cr(㎎/ℓ)',
					dataIndex : 'CR_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Zn(㎎/ℓ)',
					dataIndex : 'ZN_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Mn(㎎/ℓ)',
					dataIndex : 'MN_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '계면활성제(㎎/ℓ)',
					dataIndex : 'ABS_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'F(㎎/ℓ)',
					dataIndex : 'F_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: 'Fe(㎎/ℓ)',
					dataIndex : 'FE_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '총인(㎎/ℓ)',
					dataIndex : 'TP_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '총질소(㎎/ℓ)',
					dataIndex : 'TN_A',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '폐수오염도',
				columns:[{
					text: '특정폐수발생량(㎥/일)',
					dataIndex: 'TWW_AMT',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				},{
					text: '특정폐수방류량(㎥/일)',
					dataIndex: 'TWW_DISCHARGE',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '배출시설1',
				columns:[{
					text: '코드',
					dataIndex: 'IND_TYPE_1',
					width: 150,
					hidden: true
				},{
					text: '시설수',
					dataIndex: 'FAC_CNT_1',
					width: 150,
					hidden: true
				},{
					text: '배출량(㎥/일)',
					dataIndex: 'CAPA_SUM_1',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '배출시설2',
				columns:[{
					text: '코드',
					dataIndex: 'IND_TYPE_2',
					width: 150,
					hidden: true
				},{
					text: '시설수',
					dataIndex: 'FAC_CNT_2',
					width: 150,
					hidden: true
				},{
					text: '배출량(㎥/일)',
					dataIndex: 'CAPA_SUM_2',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '배출시설3',
				columns:[{
					text: '코드',
					dataIndex: 'IND_TYPE_3',
					width: 150,
					hidden: true
				},{
					text: '시설수',
					dataIndex: 'FAC_CNT_3',
					width: 150,
					hidden: true
				},{
					text: '배출량(㎥/일)',
					dataIndex: 'CAPA_SUM_3',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '배출시설4',
				columns:[{
					text: '코드',
					dataIndex: 'IND_TYPE_4',
					width: 150,
					hidden: true
				},{
					text: '시설수',
					dataIndex: 'FAC_CNT_4',
					width: 150,
					hidden: true
				},{
					text: '배출량(㎥/일)',
					dataIndex: 'CAPA_SUM_4',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '배출시설5',
				columns:[{
					text: '코드',
					dataIndex: 'IND_TYPE_5',
					width: 150,
					hidden: true
				},{
					text: '시설수',
					dataIndex: 'FAC_CNT_5',
					width: 150,
					hidden: true
				},{
					text: '배출량(㎥/일)',
					dataIndex: 'CAPA_SUM_5',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '방지시설1',
				columns:[{
					text: '처리방법',
					dataIndex: 'TEC_METHOD1',
					width: 150,
					hidden: true
				},{
					text: '처리능력(㎥/일)',
					dataIndex: 'TFC_CAPA1',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '방지시설2',
				columns:[{
					text: '처리방법',
					dataIndex: 'TEC_METHOD2',
					width: 150,
					hidden: true
				},{
					text: '처리능력(㎥/일)',
					dataIndex: 'TFC_CAPA2',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '방지시설3',
				columns:[{
					text: '처리방법',
					dataIndex: 'TEC_METHOD3',
					width: 150,
					hidden: true
				},{
					text: '처리능력(㎥/일)',
					dataIndex: 'TFC_CAPA3',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '방지시설4',
				columns:[{
					text: '처리방법',
					dataIndex: 'TEC_METHOD4',
					width: 150,
					hidden: true
				},{
					text: '처리능력(㎥/일)',
					dataIndex: 'TFC_CAPA4',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			},{	 
				text      : '방지시설5',
				columns:[{
					text: '처리방법',
					dataIndex: 'TEC_METHOD5',
					width: 150,
					hidden: true
				},{
					text: '처리능력(㎥/일)',
					dataIndex: 'TFC_CAPA5',
					width: 150,
					filter: {type: 'numeric'},
					hidden: true
				}]
				//filter: {type: 'numeric'}
			}],
			
			viewConfig: {
				 getRowClass: function(record, rowIndex, rowParams, store) {
					 //bold 13px/15px helvetica,arial,verdana,sans-serif
					 if(record.data.SB_NM == "총계" || record.data.SB_NM == "소계" || record.data.CAT_DID == "소계"
						 || record.data.ADDR == "총계" || record.data.ADDR == "소계"){
						 return 'pdj_total_subTotal';						 
					 }
				}
			}
		}]
	}]
});