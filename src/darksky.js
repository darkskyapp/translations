var DarkSky;

(function() {
  "use strict";

  var LANGUAGES = {};

  DarkSky = {
    hasLanguage: function(code) {
      return LANGUAGES.hasOwnProperty(code);
    },
    language: function(code, predicates) {
      if(DarkSky.hasLanguage(code))
        throw new Error("DarkSky already has the language code \"" + code + "\" defined.");

      LANGUAGES[code] = predicates;
    },
    translate: function(code, expr) {
      if(!LANGUAGES.hasOwnProperty(code))
        throw new Error("DarkSky doesn't know about the language code \"" + code + "\".");

      if(!Array.isArray(expr) || !expr.length)
        throw new Error("Invalid expression.");

      function recurse(expr) {
        if(typeof expr === "string")
          return expr;

        if(!Array.isArray(expr) || !expr.length)
          throw new Error("Invalid expression.");

        return LANGUAGES[code][expr[0]].apply(null, expr.slice(1).map(recurse));
      }

      return recurse(expr);
    }
  };
})();
