/*!
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.SearchWindow', {
    extend: 'Ext.ux.desktop.Module',
    requires: [
    	'krf_new.view.search.West'
    ],

    id:'search-win',

    init : function(){
        this.launcher = {
            text: 'Search Window',
            iconCls:'icon-grid'
        };
    },

    createWindow : function(config){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('search-win');
        var cfg = Ext.applyIf(config || {}, {
			            id: 'search-win',
			            title:'위치검색',
			            width:340,
			            height:480,
			            iconCls: 'icon-grid',
			            animCollapse:false,
			            layout: 'fit',
			            maximizable : false,
			            constrain: true,
	            		constrainHeader:false,
			            items: [
			            		{xtype:'app-default-west'}
			            ]
			        });
        
        if(!win){
            win = desktop.createWindow(cfg);
        }
        return win;
    }
});

