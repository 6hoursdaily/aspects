Ext.define('Aspects',
{
    statics: {
        getContextFunc : function (context, func) {
       return function() {
           func.apply(context, arguments);
       };
    }
    }
});
