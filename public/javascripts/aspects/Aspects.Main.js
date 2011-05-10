Ext.define('Aspects.Main',
{
    statics: {
        registerEvents: function()
        {
            Aspects.Events.subscribe(
              'core-exit',
              Aspects.getContextFunc(this,function(e) {
                alert("exit");
              })
            );
        }

    }
});