//用于提供一些工具函数, 全局或者包装过的
define(function(require, exports, module){
  if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
      return (this.match("^"+str)==str);
    };
  }


  function loadCss(url) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
  }

  exports.loadCss = loadCss;
})
