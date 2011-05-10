Ext.define('Aspects.UI.Main.Tabs',
{
    statics: {
        _tabPanel: null,

        getTabPanel: function () {
            return this._tabPanel;
        },

        setTabPanel: function (tabPanel) {
            this._tabPanel = tabPanel;
        }
    }
});