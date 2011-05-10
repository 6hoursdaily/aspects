Ext.define('Aspects.UI.History',
{
    statics: {
        _eventseparator: '/',

        existsEvent: function(eventName)
        {
            var events = this._getEvents();

            for(var i=0; i < events.length; i++)
            {
                if (events[i] == eventName)
                {
                    return true;
                }
            }

            return false;
        },

        removeEvent: function(eventName)
        {
            var events = this._getEvents();

            for(var i=0; i < events.length; i++)
            {
                if (events[i] == eventName)
                {
                    Ext.Array.remove(events,eventName);
                    var token = events.join(this._eventseparator);
                    Ext.History.add(token);
                    return;
                }
            }
        },

        addEvent: function(eventName)
        {
            var token = Ext.History.getToken();

            if (token)
            {
                if (!this.existsEvent(eventName)) {
                    token += this._eventseparator;
                    token += eventName;
                    Ext.History.add(token);
                }
            }
            else
            {
                token = '';
                token += eventName;
                Ext.History.add(token);
            }
        },

        _getEvents: function()
        {
            var tokensStr = Ext.History.getToken();

            if (tokensStr)
            {
                var events = tokensStr.split(this._eventseparator);
                return events
            }
            else
            {
                return [];
            }
        },

        procEvents: function()
        {
            var events = this._getEvents();

            for(var i=0; i < events.length; i++)
            {
                var eventName = events[i];

                Aspects.Events.publish(eventName);
            }
        }
    }
});
