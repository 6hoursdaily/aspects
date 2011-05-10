Ext.define('Aspects.UI.Main',
{
    statics: {
        _accordion: null,
        _favorites: null,
        _tasks: null,
        _status: null,
        _maintoolbar: null,

        getMainToolBar: function () {
            return this._maintoolbar;
        },

        setMainToolBar: function (toolbar) {
            this._maintoolbar = toolbar;
        },

        getAccordion: function () {
            return this._accordion;
        },

        setAccordion: function (accordion) {
            this._accordion = accordion;
        },

        getFavorites: function () {
            return this._favorites;
        },

        setFavorites: function (favorites) {
            this._favorites = favorites;
        },

        getTasks: function () {
            return this._tasks;
        },

        setTasks: function (tasks) {
            this._tasks = tasks;
        },

        getStatus: function () {
            return this._status;
        },

        setStatus: function (status) {
            this._status = status;
        },

        buildLayout: function()
        {
            var topPanel = {
                region: 'north',
                html: '<div id="main-top"><div id="main-top-bar"></div></div>',
                height: 20, // 78,
                // autoHeight: true,
                border: false,
                margins: '0 0 5 0'
                // title : "Top"
                };

            var leftPanel = {
                    region: 'west',
                    collapsible: true,
                    title: 'Navigation',
                    width: 200,
                    layout:'accordion',
                    defaults: {
                        // applied to each contained panel
                        bodyStyle: 'padding:15px'
                    },
                    layoutConfig: {
                        // layout-specific configs go here
                        titleCollapse: true,
                        animate: true,
                        activeOnTop: true
                    },
                    items: [{
                            title: 'Favorites',
                            html : "<div>Favorites</div>",
                            iconCls : "left-favorites-panel-icon"
                            // type : "treepanel",
                        },{
                            title: 'Tasks',
                            iconCls : "left-tasks-panel-icon",
                            html : "<div>Tasks</div>"
                        }]
                    };

            var bottomPanel = {
                    region: 'south',
                    html : '<div id="main-bottom"></div>',
                    // title: 'Bottom',
                    collapsible: false,
                    split: false,
                    height: 30,
                    minHeight: 30,
                    hidden : false
                    };

            var rightPanel =  {
                    region: 'east',
                    title: 'Right',
                    collapsible: true,
                    split: true,
                    width: 200,
                    hidden : true
                    };

            var centerPanel = Ext.create('Ext.TabPanel', {
                        region: 'center', // a center region is ALWAYS required for border layout
                        deferredRender: false
                        });

            var viewPort = new Ext.container.Viewport({
                renderTo : "main-container",
                layout: 'border',
                items: [topPanel,leftPanel,bottomPanel,rightPanel,centerPanel]
            });

            // Build UI.Main elements

            this.setAccordion(leftPanel);
            this.setFavorites(leftPanel.items[0]);
            this.setTasks(leftPanel.items[1]);
            this.setStatus(bottomPanel);

            Aspects.UI.Main.Tabs.setTabPanel(centerPanel);

            var mainToolBar = Ext.create('Ext.toolbar.Toolbar');
            mainToolBar.render('main-top-bar');
            this.setMainToolBar(mainToolBar);
        },

        buildMainMenu: function(respObj)
        {
            var mainToolBar =  this.getMainToolBar();

            mainToolBar.suspendLayout = true;

            for(var i=0; i < respObj.items.length; i++) {
                var group = respObj.items[i];

                var itemGroup = this._buildMainItemMenu(group);

                mainToolBar.add(itemGroup);
            }
            mainToolBar.suspendLayout = false;
            mainToolBar.doLayout();
        },

        _buildMainItemMenu: function(item)
        {
            if (item.items) {

                var subItemsMenu = new Ext.menu.Menu();

                for(var j=0; j < item.items.length; j++) {
                    var subItem = item.items[j];

                    var subItemMenu = this._buildMainItemMenu(subItem);
                    subItemsMenu.add(subItemMenu);
                }

                return {
                    text: item.text,
                    tooltip : item.tooltip,
                    iconCls : item.iconCls,
                    menu : subItemsMenu
                };
            }
            else
            {
                return {
                    text: item.text,
                    iconCls : item.iconCls,
                    tooltip : item.tooltip,
                    handler : function() {
                        Aspects.Events.publish(item.event);
                    }
                };
            }
        },

        buildToolBar: function()
        {
            Ext.Ajax.request({
                url: '/core/main/getToolBarItems',
                success: Aspects.getContextFunc(
                        this,
                        function (response) {
                            var respObj = Ext.decode( response.responseText );

                            this.buildMainMenu(respObj);
                        }),
                failure: function () {
                   console.log('failure');
                }
            });
        }
    }
});
