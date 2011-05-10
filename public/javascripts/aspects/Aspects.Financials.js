Ext.define('Aspects.Financials',
{
    statics:
    {
        showMethodOfPaymentBrowser: function()
        {
            var myData =
            [
                ["001","FIRST"],
                ["002","SECOND"]
            ];

            var proxy = new Ext.data.ArrayStore({
                fields: [
                   {name: 'code'},
                   {name: 'name'}
                ],
                data: myData
            });

            var browser = new Aspects.UI.QueryData({
                    title: 'Methods of Payment',
                    eventName: 'financials-methodsofpayment-browser',
                    // TODO: Get search fields from controller
                    masterStore: proxy,
                    masterGridColumns: [
                        {
                            text     : 'Code',
                            // flex     : 1,
                            width    : 75,
                            sortable : true,
                            dataIndex: 'code'
                        },
                        {
                            text     : 'Name',
                            flex     : 1,
                            //width    : 75,
                            sortable : true,
                            dataIndex: 'name'
                        }
                    ],
                    searchFields:[
                        {
                            fieldLabel: 'Code',
                            name: 'code',
                            allowBlank: true,
                            maxLength: 3,
                            maxLengthText: 'Max length for Code is 3',
                            emptyText: '---',
                            width: 150
                        },
                        {
                            fieldLabel: 'Name',
                            name: 'name',
                            maxLength: 80,
                            emptyText: 'name',
                            width: 550,
                            allowBlank: true
                        }
                        ]
                });

           browser.render();
        },

        registerEvents: function()
        {
            Aspects.Events.subscribe(
              'financials-methodsofpayment-browser',
              Aspects.getContextFunc(this,function(e) {
                  this.showMethodOfPaymentBrowser();
                  Aspects.UI.History.addEvent('financials-methodsofpayment-browser');
              })
            );

            Aspects.Events.subscribe(
              'financials-taxregistrytypes-browser',
              Aspects.getContextFunc(this,function(e) {
                alert(e.target.name);
              })
            );
        }
    }
});