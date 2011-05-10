Ext.onReady(function() {
    Ext.History.init();

    Ext.QuickTips.init();

    Aspects.UI.Main.buildLayout();
    Aspects.UI.Main.buildToolBar();
    Aspects.UI.Main.WorkSpace.buildWorkSpace();

    Aspects.Main.registerEvents();

    Aspects.Financials.registerEvents();

    Aspects.UI.History.procEvents();

    Ext.History.on('change', function(token){
       Aspects.UI.History.procEvents();
    });

    //Ext.app.EventBus.
});

