/*!
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.ResultWindow', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
    ],

    id:'result-win',

    init : function(){
        this.launcher = {
            text: 'ResultWindow',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(config){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('result-win');
        var cfg = Ext.applyIf(config || {}, {
			            id: 'result-win',
			            title:'검색결과',
			            width:800,
			            height:480,
			            iconCls: 'icon-grid',
			            animCollapse:false,
			            layout: 'fit',
//			            maximizable : false,
			            xtype : 'common-windowcontrol',
			            itemxType: 'panel',
			            winSizeMode: 'normal',
			            preWidth: null,
	            		preHeight: null,
	            		preX: null,
	            		preY: null,
	            		constrain: true,
	            		constrainHeader:false,
			            items: [
			            ]
			        });
        
        if(!win){
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});

