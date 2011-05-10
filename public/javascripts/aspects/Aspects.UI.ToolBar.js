Ext.define('Aspects.UI.ToolBar',
{
    statics: {
        getButtonGroupColumns: function(buttons) {
            var largeButtons = 0;
            var smallButtons = 0;
            var butonsRowIfLargePresent = 2;
            var butonsRowIfNotLargePresent = 2;

            for(var i=0; i < buttons.length; i++)
            {
                if (buttons[i].scale == 'large')
                {
                    largeButtons++;
                }

                if (buttons[i].scale == 'small')
                {
                    smallButtons++;
                }
            }
            var columns =largeButtons;
            if (smallButtons > 0)
            {
                if (largeButtons > 0) {
                    columns += Math.floor(smallButtons/butonsRowIfLargePresent);
                    if ((smallButtons % butonsRowIfLargePresent) > 0) {
                        columns++;
                    }
                }
                else
                {
                    columns += Math.floor(smallButtons/ butonsRowIfNotLargePresent);
                    if ((smallButtons % butonsRowIfNotLargePresent) > 0) {
                        columns++;
                    }
                }
            }
            return columns;
        }
    }
});
