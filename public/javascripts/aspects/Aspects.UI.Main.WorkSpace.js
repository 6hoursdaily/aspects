Ext.define('Aspects.UI.Main.WorkSpace',
{
    statics: {
        _tabId: "tab-workspace",
        _tabPage:null,

        buildWorkSpace: function()
        {
            var panel = Aspects.UI.Main.Tabs.getTabPanel();

            panel.suspendLayout = true;

            panel.add({
               id: this._tabId,
               title: 'Workspace',
               closable: false,
               autoScroll: true,
               items:[
                   {
                       title: "Recent"
                   }
               ]
            });

            panel.suspendLayout = false;
        },

        getTabPage: function()
        {
            if (!this._tabPage) {
                var panel = Aspects.UI.Main.Tabs.getTabPanel();
                this._tabPage = panel.items.get(this._tabId);
            }

            return this._tabPage;
        }
    }
});