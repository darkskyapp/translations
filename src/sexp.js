var SExp;

(function() {
  "use strict";

  SExp = {
    /* FIXME: This needs a bunch of error-handling. */
    parse: function(str) {
      str = str.match(/\(|\)|[^\s\(\)]+/g);

      var stack = [[]],
          i, top;

      for(i = 0; i !== str.length; ++i)
        if(str[i] === "(")
          stack.push([]);

        else if(str[i] === ")") {
          top = stack.pop();
          stack[stack.length - 1].push(top);
        }

        else
          stack[stack.length - 1].push(str[i]);

      return stack[0][0];
    }
  };
})();
