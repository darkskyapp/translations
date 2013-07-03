var DarkSky;

(function() {
  "use strict";

  DarkSky = {
    translate: function parse(template, expr) {
      if(typeof expr === "number")
        return expr.toString();

      if(typeof expr === "string")
        return template.hasOwnProperty(expr) ? template[expr] : expr;

      if(Array.isArray(expr) && template.hasOwnProperty(expr[0])) {
        if(typeof template[expr[0]] === "string")
          return template[expr[0]].replace(/\$\d+/g, function(n) {
            return parse(template, expr[n.slice(1)|0]);
          });

        if(typeof template[expr[0]] === "function")
          return template[expr[0]].apply(null, expr.slice(1).map(function(arg) {
            return parse(template, arg);
          }));
      }

      throw new Error("Invalid expression.");
    }
  };
})();
