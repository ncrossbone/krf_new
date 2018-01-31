Ext.define('krf_new.view.south.SearchResultGrid_PollLoad_SMAT', {
	
	extend: 'Ext.container.Container',
	//extend : 'Ext.grid.Panel',
	
	xtype: 'searchResultPollLoad',
	
	id: 'searchResultPollLoad_container',
	
	height: '100%',
	width: '100%',
	
	items: [{
		xtype: 'container',
		width: '100%',
		height: '100%',
		items: [{
			xtype: 'grid',
			cls: 'khLee-x-column-header-text',
			//plugins: ['bufferedrenderer', 'gridfilters'],
			plugins: ['gridfilters'], // bufferedrenderer 쓰면 그리드 스크롤링(gridCtl.getView().getRow(rowIdx).scrollIntoView();)이 잘 안먹음, rowindex가 높을때..(한강, 한강서울 검색확인) -- 임시
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
				text      : '총량단위유역',
				dataIndex : 'NM_FINAL',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '면적',
				dataIndex : 'FINAL_AREA',
				width: 150
				//filter: {type: 'numeric'}
			},{	 
				text      : '연도',
				dataIndex : 'YYYY',
				width: 150
				//filter: {type: 'numeric'}
			},{text:'발생유량합계',dataIndex:'GNR_FLOW_SUM',width:150}//filter:{type:numeric'}
			,{text:'발생BOD합계',dataIndex:'GNR_BOD_SUM',width:150}//filter:{type:numeric'}
			,{text:'발생TN합계',dataIndex:'GNR_TN_SUM',width:150}//filter:{type:numeric'}
			,{text:'발생TP합계',dataIndex:'GNR_TP_SUM',width:150}//filter:{type:numeric'}
			,{text:'개별배출유량합계',dataIndex:'IND_OUT_FLOW_SUM',width:150}//filter:{type:numeric'}
			,{text:'개별배출BOD합계',dataIndex:'IND_OUT_BOD_SUM',width:150}//filter:{type:numeric'}
			,{text:'개별배출TN합계',dataIndex:'IND_OUT_TN_SUM',width:150}//filter:{type:numeric'}
			,{text:'개별배출TP합계',dataIndex:'IND_OUT_TP_SUM',width:150}//filter:{type:numeric'}
				,{text:'발생유량생활',dataIndex:'GNR_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'발생유량축산',dataIndex:'GNR_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'발생유량산업',dataIndex:'GNR_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'발생유량토지',dataIndex:'GNR_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'발생유량양식',dataIndex:'GNR_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'발생유량매립',dataIndex:'GNR_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'발생BOD생활',dataIndex:'GNR_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'발생BOD축산',dataIndex:'GNR_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'발생BOD산업',dataIndex:'GNR_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'발생BOD토지',dataIndex:'GNR_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'발생BOD양식',dataIndex:'GNR_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'발생BOD매립',dataIndex:'GNR_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'발생TN생활',dataIndex:'GNR_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'발생TN축산',dataIndex:'GNR_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'발생TN산업',dataIndex:'GNR_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'발생TN토지',dataIndex:'GNR_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'발생TN양식',dataIndex:'GNR_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'발생TN매립',dataIndex:'GNR_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'발생TP생활',dataIndex:'GNR_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'발생TP축산',dataIndex:'GNR_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'발생TP산업',dataIndex:'GNR_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'발생TP토지',dataIndex:'GNR_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'발생TP양식',dataIndex:'GNR_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'발생TP매립',dataIndex:'GNR_TP_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송유량합계',dataIndex:'DRT_FLOW_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송유량생활',dataIndex:'DRT_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송유량축산',dataIndex:'DRT_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송유량산업',dataIndex:'DRT_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송유량토지',dataIndex:'DRT_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송유량양식',dataIndex:'DRT_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송유량매립',dataIndex:'DRT_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송BOD합계',dataIndex:'DRT_BOD_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송BOD생활',dataIndex:'DRT_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송BOD축산',dataIndex:'DRT_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송BOD산업',dataIndex:'DRT_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송BOD토지',dataIndex:'DRT_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송BOD양식',dataIndex:'DRT_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송BOD매립',dataIndex:'DRT_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TN합계',dataIndex:'DRT_TN_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TN생활',dataIndex:'DRT_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TN축산',dataIndex:'DRT_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TN산업',dataIndex:'DRT_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TN토지',dataIndex:'DRT_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TN양식',dataIndex:'DRT_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TN매립',dataIndex:'DRT_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TP합계',dataIndex:'DRT_TP_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TP생활',dataIndex:'DRT_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TP축산',dataIndex:'DRT_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TP산업',dataIndex:'DRT_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TP토지',dataIndex:'DRT_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TP양식',dataIndex:'DRT_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'직접이송TP매립',dataIndex:'DRT_TP_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감유량합계',dataIndex:'IND_CUT_FLOW_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감유량생활',dataIndex:'IND_CUT_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감유량축산',dataIndex:'IND_CUT_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감유량산업',dataIndex:'IND_CUT_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감유량토지',dataIndex:'IND_CUT_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감유량양식',dataIndex:'IND_CUT_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감유량매립',dataIndex:'IND_CUT_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감BOD합계',dataIndex:'IND_CUT_BOD_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감BOD생활',dataIndex:'IND_CUT_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감BOD축산',dataIndex:'IND_CUT_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감BOD산업',dataIndex:'IND_CUT_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감BOD토지',dataIndex:'IND_CUT_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감BOD양식',dataIndex:'IND_CUT_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감BOD매립',dataIndex:'IND_CUT_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TN합계',dataIndex:'IND_CUT_TN_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TN생활',dataIndex:'IND_CUT_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TN축산',dataIndex:'IND_CUT_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TN산업',dataIndex:'IND_CUT_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TN토지',dataIndex:'IND_CUT_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TN양식',dataIndex:'IND_CUT_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TN매립',dataIndex:'IND_CUT_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TP합계',dataIndex:'IND_CUT_TP_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TP생활',dataIndex:'IND_CUT_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TP축산',dataIndex:'IND_CUT_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TP산업',dataIndex:'IND_CUT_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TP토지',dataIndex:'IND_CUT_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TP양식',dataIndex:'IND_CUT_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별삭감TP매립',dataIndex:'IND_CUT_TP_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입유량합계',dataIndex:'PIT_IN_FLOW_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입유량생활',dataIndex:'PIT_IN_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입유량축산',dataIndex:'PIT_IN_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입유량산업',dataIndex:'PIT_IN_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입유량토지',dataIndex:'PIT_IN_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입유량양식',dataIndex:'PIT_IN_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입유량매립',dataIndex:'PIT_IN_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입BOD합계',dataIndex:'PIT_IN_BOD_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입BOD생활',dataIndex:'PIT_IN_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입BOD축산',dataIndex:'PIT_IN_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입BOD산업',dataIndex:'PIT_IN_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입BOD토지',dataIndex:'PIT_IN_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입BOD양식',dataIndex:'PIT_IN_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입BOD매립',dataIndex:'PIT_IN_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TN합계',dataIndex:'PIT_IN_TN_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TN생활',dataIndex:'PIT_IN_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TN축산',dataIndex:'PIT_IN_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TN산업',dataIndex:'PIT_IN_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TN토지',dataIndex:'PIT_IN_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TN양식',dataIndex:'PIT_IN_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TN매립',dataIndex:'PIT_IN_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TP합계',dataIndex:'PIT_IN_TP_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TP생활',dataIndex:'PIT_IN_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TP축산',dataIndex:'PIT_IN_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TP산업',dataIndex:'PIT_IN_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TP토지',dataIndex:'PIT_IN_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TP양식',dataIndex:'PIT_IN_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거유입TP매립',dataIndex:'PIT_IN_TP_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출유량생활',dataIndex:'IND_OUT_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출유량축산',dataIndex:'IND_OUT_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출유량산업',dataIndex:'IND_OUT_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출유량토지',dataIndex:'IND_OUT_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출유량양식',dataIndex:'IND_OUT_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출유량매립',dataIndex:'IND_OUT_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출BOD생활',dataIndex:'IND_OUT_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출BOD축산',dataIndex:'IND_OUT_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출BOD산업',dataIndex:'IND_OUT_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출BOD토지',dataIndex:'IND_OUT_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출BOD양식',dataIndex:'IND_OUT_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출BOD매립',dataIndex:'IND_OUT_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TN생활',dataIndex:'IND_OUT_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TN축산',dataIndex:'IND_OUT_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TN산업',dataIndex:'IND_OUT_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TN토지',dataIndex:'IND_OUT_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TN양식',dataIndex:'IND_OUT_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TN매립',dataIndex:'IND_OUT_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TP생활',dataIndex:'IND_OUT_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TP축산',dataIndex:'IND_OUT_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TP산업',dataIndex:'IND_OUT_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TP토지',dataIndex:'IND_OUT_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TP양식',dataIndex:'IND_OUT_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'개별배출TP매립',dataIndex:'IND_OUT_TP_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출유량합계',dataIndex:'PIT_OUT_FLOW_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출유량생활',dataIndex:'PIT_OUT_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출유량축산',dataIndex:'PIT_OUT_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출유량산업',dataIndex:'PIT_OUT_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출유량토지',dataIndex:'PIT_OUT_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출유량양식',dataIndex:'PIT_OUT_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출유량매립',dataIndex:'PIT_OUT_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출BOD합계',dataIndex:'PIT_OUT_BOD_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출BOD생활',dataIndex:'PIT_OUT_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출BOD축산',dataIndex:'PIT_OUT_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출BOD산업',dataIndex:'PIT_OUT_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출BOD토지',dataIndex:'PIT_OUT_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출BOD양식',dataIndex:'PIT_OUT_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출BOD매립',dataIndex:'PIT_OUT_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TN합계',dataIndex:'PIT_OUT_TN_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TN생활',dataIndex:'PIT_OUT_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TN축산',dataIndex:'PIT_OUT_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TN산업',dataIndex:'PIT_OUT_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TN토지',dataIndex:'PIT_OUT_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TN양식',dataIndex:'PIT_OUT_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TN매립',dataIndex:'PIT_OUT_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TP합계',dataIndex:'PIT_OUT_TP_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TP생활',dataIndex:'PIT_OUT_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TP축산',dataIndex:'PIT_OUT_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TP산업',dataIndex:'PIT_OUT_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TP토지',dataIndex:'PIT_OUT_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TP양식',dataIndex:'PIT_OUT_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'관거배출TP매립',dataIndex:'PIT_OUT_TP_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'방류유량합계',dataIndex:'DIS_FLOW_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'방류유량생활',dataIndex:'DIS_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'방류유량축산',dataIndex:'DIS_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'방류유량산업',dataIndex:'DIS_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'방류유량토지',dataIndex:'DIS_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'방류유량양식',dataIndex:'DIS_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'방류유량매립',dataIndex:'DIS_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'방류BOD합계',dataIndex:'DIS_BOD_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'방류BOD생활',dataIndex:'DIS_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'방류BOD축산',dataIndex:'DIS_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'방류BOD산업',dataIndex:'DIS_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'방류BOD토지',dataIndex:'DIS_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'방류BOD양식',dataIndex:'DIS_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'방류BOD매립',dataIndex:'DIS_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'방류TN합계',dataIndex:'DIS_TN_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'방류TN생활',dataIndex:'DIS_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'방류TN축산',dataIndex:'DIS_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'방류TN산업',dataIndex:'DIS_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'방류TN토지',dataIndex:'DIS_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'방류TN양식',dataIndex:'DIS_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'방류TN매립',dataIndex:'DIS_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'방류TP합계',dataIndex:'DIS_TP_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'방류TP생활',dataIndex:'DIS_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'방류TP축산',dataIndex:'DIS_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'방류TP산업',dataIndex:'DIS_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'방류TP토지',dataIndex:'DIS_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'방류TP양식',dataIndex:'DIS_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'방류TP매립',dataIndex:'DIS_TP_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'배출유량합계',dataIndex:'OUT_FLOW_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'배출유량생활',dataIndex:'OUT_FLOW_POP',width:150}//filter:{type:'numeric'}}
			,{text:'배출유량축산',dataIndex:'OUT_FLOW_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'배출유량산업',dataIndex:'OUT_FLOW_IND',width:150}//filter:{type:'numeric'}}
			,{text:'배출유량토지',dataIndex:'OUT_FLOW_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'배출유량양식',dataIndex:'OUT_FLOW_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'배출유량매립',dataIndex:'OUT_FLOW_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'배출BOD합계',dataIndex:'OUT_BOD_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'배출BOD생활',dataIndex:'OUT_BOD_POP',width:150}//filter:{type:'numeric'}}
			,{text:'배출BOD축산',dataIndex:'OUT_BOD_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'배출BOD산업',dataIndex:'OUT_BOD_IND',width:150}//filter:{type:'numeric'}}
			,{text:'배출BOD토지',dataIndex:'OUT_BOD_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'배출BOD양식',dataIndex:'OUT_BOD_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'배출BOD매립',dataIndex:'OUT_BOD_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'배출TN합계',dataIndex:'OUT_TN_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'배출TN생활',dataIndex:'OUT_TN_POP',width:150}//filter:{type:'numeric'}}
			,{text:'배출TN축산',dataIndex:'OUT_TN_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'배출TN산업',dataIndex:'OUT_TN_IND',width:150}//filter:{type:'numeric'}}
			,{text:'배출TN토지',dataIndex:'OUT_TN_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'배출TN양식',dataIndex:'OUT_TN_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'배출TN매립',dataIndex:'OUT_TN_LANDFILL',width:150}//filter:{type:'numeric'}}
			,{text:'배출TP합계',dataIndex:'OUT_TP_SUM',width:150}//filter:{type:'numeric'}}
			,{text:'배출TP생활',dataIndex:'OUT_TP_POP',width:150}//filter:{type:'numeric'}}
			,{text:'배출TP축산',dataIndex:'OUT_TP_ANI',width:150}//filter:{type:'numeric'}}
			,{text:'배출TP산업',dataIndex:'OUT_TP_IND',width:150}//filter:{type:'numeric'}}
			,{text:'배출TP토지',dataIndex:'OUT_TP_LAND',width:150}//filter:{type:'numeric'}}
			,{text:'배출TP양식',dataIndex:'OUT_TP_FISH',width:150}//filter:{type:'numeric'}}
			,{text:'배출TP매립',dataIndex:'OUT_TP_LANDFILL',width:150}//filter:{type:'numeric'}}]
			]
		}]
	}],
	initComponent: function(){
		
		this.callParent();
		
		// 검색조건 컨트롤 초기화
		$KRF_APP.global.TabFn.searchConditionInit("", this.down("grid"));
	}
});