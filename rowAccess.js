/* ***************************************
/* rowAccess.js v1.0
/* ***************************************
/* javascript plugin based on jquery 1.11.1
/* author: Davis Lin
/* copyright (c) since 2014. Audatex TWIC.
/* ***************************************/

$(function() {

$.fn.extend({
  rowAccess: function(userConf) {
    var conf = {},
        defaultConf = {
          tdEq: 0, // {num} 0~N; eq. of the td containing NO. info.
          markStyle: 'marked-row' // {str} css className for TR that is marked
        };
    $.extend(conf,defaultConf,userConf);

    return $(this).each(function(i, e) {
      // e: TBODY

      function rowAccess(){
        
        // private attr. & func.
        var obj = this,
            _getTr = function(){
              return $(e).children('tr');
            },
            _getNexts = function(n){ // get all rows having no. large than n.
              var tr = _getTr();
              return tr.eq(n).nextAll('tr')
            },
            _changeNo = function(n){ // getNexts and their no.s then sub 1
              var rows = _getNexts(n);
              $(rows).each(function(j,el){
                var td = $(el).find('td').eq(conf.tdEq),
                    no = td.html();
                td.html(no-1);
              });
            },
            _resetNo = function(){
              $.each(_getTr(),function(i,e){
                $(this).find('td').eq(conf.tdEq).html(i+1)
              });
            };
        
        // public func.
        obj.getTr = function(n){
          return $(e).children('tr').eq(n);
        };

        obj.delRowI = function(n,callback){ // remove a row and reOrder the no.
          var tr = _getTr();
          _changeNo(n);
          tr.eq(n).remove();
          obj.checkCallback(callback);
        };

        obj.delRow = function(el,callback){ // remove a row and reOrder the no.
          el.remove();
          _resetNo();
          obj.checkCallback(callback);
        };

        obj.markRowI = function(n,callback){ // mark a row
          var tr = _getTr();
          obj.getTr(n).addClass(conf.markStyle); //
          obj.checkCallback(callback);
        };

        obj.markRow = function(el,callback){ // mark a row
          el.addClass(conf.markStyle);
          obj.checkCallback(callback);
        };

        obj.checkCallback = function(fn){
          if (typeof fn == 'function'){
            fn();
          }
        };

      }

      var rowAccess = new rowAccess();
      $(e).data('rowAccess',rowAccess);
      
    });
  }
});

});