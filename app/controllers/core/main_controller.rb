class Core::MainController < ApplicationController
  def index
  end

  def getToolBarItems
    main_items = [];

    financials_items = [
            {
                :text => 'Financials',
                :tooltip => "Financials menu",
                :iconCls => "financials-menu-icon",
                :items => [
                    {
                        :text => "Setup",
                        :tooltip => "Setup",
                        :iconCls => "financials-setup-menu-icon",
                        :items => [
                          {
                            :text => "Methods of Payment",
                            :tooltip => "Methods of Payment",
                            :iconCls => "financials-setup-methodsofpayment-menu-icon",
                            :event => "financials-methodsofpayment-browser"
                          },
                          {
                            :text => "Tax registry Types",
                            :tooltip => "Tax registry Types",
                            :iconCls => "financials-setup-taxregistrytypes-menu-icon",
                            :event => "financials-taxregistrytypes-browser"
                          }
                          ]
                    }
                ]
            }];

    main_items.concat(financials_items);

    main_items.concat([
            {
                :text => 'Exit',
                :tooltip => "Exit",
                :iconCls => "exit-menu-icon",
                :event => "core-exit"
            }
        ]);

    data =  {
        :items => main_items
    };

    render :json => data.to_json
  end

end
