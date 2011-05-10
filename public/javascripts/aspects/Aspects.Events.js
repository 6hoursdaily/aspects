Ext.define('Aspects.Events',
{
    statics:
    {
        publish: function(eventName) {
            YUI().use('event-custom', function(Y2) {
                var publisher2 = new Y2.EventTarget();
                publisher2.name = eventName;

                publisher2.publish(eventName, {
                    broadcast:  2,   // global notification
                    emitFacade: true // emit a facade so we get the event target
                });

                publisher2.fire(eventName,{});
            });
        },

        subscribe: function(eventName, func) {
            YUI().use('event-custom', function(Y2) {
                Y2.Global.on(eventName,func);
            });
        }
    }
});