Ext.define('Aspects.UI.QueryData', {

    config: {
        title : 'QueryData',
        eventName: '',
        masterStore: null,
        masterGridColumns: [],
        basicButtons:[
            {
                text: 'New',
                tooltip: 'New Method of Payment',
                iconCls: 'browserdata-new-menu-icon',
                scale: 'large',
                rowspan: 2,
                iconAlign: 'top'
            },
            {
                text: 'Delete',
                iconCls: 'browserdata-delete-menu-icon',
                scale: 'small'
            },
            {
                text: 'View',
                iconCls: 'browserdata-view-menu-icon',
                scale: 'small'
            },
            {
                text: 'Modify',
                iconCls: 'browserdata-edit-menu-icon',
                scale: 'small'
            }
        ],
        exportButtons:[
            {
                text: 'SpreadSheet',
                iconCls: 'browserdata-spreadsheet-menu-icon',
                scale: 'large',
                rowspan: 2,
                iconAlign: 'top'
            },
            {
                text: 'Pdf',
                iconCls: 'browserdata-pdf-menu-icon',
                scale: 'small'
            },
            {
                text: 'Xml',
                iconCls: 'browserdata-xml-menu-icon',
                scale: 'small'
            },
            {
                text: 'Csv',
                iconCls: 'browserdata-csv-menu-icon',
                scale: 'small'
            }
        ],
        importButtons:[
        ],
        searchFields:[
        ]
    },

    constructor: function(config) {
        this.initConfig(config);

        return this;
    },

    buildToolBar: function(tabPage) {
        var toolbar = Ext.create('Ext.toolbar.Toolbar');
        toolbar.suspendLayout = true;

        toolbar.add(
                {
                    xtype: 'buttongroup',
                    title: 'Basic',
                    columns: Aspects.UI.ToolBar.getButtonGroupColumns(this.getBasicButtons()),
                    items: this.getBasicButtons()
                });
        toolbar.add(
                {
                    xtype: 'buttongroup',
                    title: 'Export',
                    columns: Aspects.UI.ToolBar.getButtonGroupColumns(this.getExportButtons()),
                    items: this.getExportButtons()
                });

        if (this.getImportButtons().length > 0)
        {
            toolbar.add({
                        xtype: 'buttongroup',
                        title: 'Import',
                        columns: Aspects.UI.ToolBar.getButtonGroupColumns(this.getImportButtons()),
                        items: this.getImportButtons()
                    }
                    );
        }

        toolbar.suspendLayout = false;

        tabPage.items.add(toolbar);
    },

    buildSearch: function(tabPage) {

        // TODO: Refact to a single line :)
        if (!this.getSearchFields())
        {
            return;
        }

        if (this.getSearchFields().length == 0)
        {
            return;
        }

        var searchPanel= Ext.create('Ext.form.Panel', {
            title: 'Search',
            // frame:true,
            bodyPadding: 5,
            defaults: {
                // anchor: '100%'
            },
            defaultType: 'textfield',
            items: this.getSearchFields(),
            buttons: [
                {
                    text: 'Search',
                    iconCls: "browserdata-search-menu-icon",
                    formBind: true,
                    handler: function()
                    {
                        alert("Search here");
                    }
                },
                {
                    text: 'Clear',
                    handler: function()
                    {
                        alert("clear");
                    }
                }]
            });

        tabPage.items.add(searchPanel);
    },

    buildGrid: function(tabPage)
    {
        var grid = Ext.create('Ext.grid.Panel', {
            store: this.getMasterStore(),
            columnLines: true,
            columns: this.getMasterGridColumns(),
            width: "100%",
            // height: "100%",
            // title: 'Array Grid',
            viewConfig: {
                stripeRows: true
            },
            bbar: Ext.create('Ext.PagingToolbar', {
                store: this.getMasterStore()
                // displayInfo: true
                // displayMsg: 'Displaying topics {0} - {1} of {2}',
                // emptyMsg: "No topics to display"
                })
        });

        tabPage.items.add(grid);
    },

    render: function() {
        var panel = Aspects.UI.Main.Tabs.getTabPanel();

        var tabId = "tab-financials-methodsofpayment";

        var tabPage = panel.items.get(tabId);

        if (!tabPage)
        {
            panel.add(
                {
                   id: tabId,
                   title: this.getTitle(),
                   closable: true,
                   closeText : 'Close '+this.getTitle(),
                   autoScroll: true,
                   listeners: {
                        destroy: Aspects.getContextFunc(this,function() {
                            Aspects.UI.History.removeEvent(this.getEventName());
                            })
                        }
                });

            tabPage = panel.items.get(tabId);

            tabPage.suspendLayout = true;
            this.buildToolBar(tabPage);
            this.buildSearch(tabPage);
            this.buildGrid(tabPage);
            tabPage.suspendLayout = false;
        }

        panel.setActiveTab(tabPage);
    }
});