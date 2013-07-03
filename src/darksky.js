var DarkSky;

(function() {
  "use strict";

  DarkSky = {
    translate: function parse(template, expr) {
      if(typeof expr === "number")
        return expr.toString();

      else if(typeof expr === "string") {
        if(template.hasOwnProperty(expr))
          return template[expr];
      }

      else if(Array.isArray(expr)) {
        if(template.hasOwnProperty(expr[0])) {
          if(typeof template[expr[0]] === "string")
            return template[expr[0]].replace(/\$\d+/g, function(n) {
              return parse(template, expr[n.slice(1)|0]);
            });

          if(typeof template[expr[0]] === "function")
            return template[expr[0]].apply(null, expr.slice(1).map(function(arg) {
              return parse(template, arg);
            }));
        }
      }

      throw new Error("Invalid expression.");
    }
  };
})();
