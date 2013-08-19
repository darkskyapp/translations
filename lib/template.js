module.exports = function(template) {
  function parse(expr, stack) {
    var result;

    if(typeof expr === "number") {
      stack.push(expr);

      result = expr.toString();
    }

    else if(typeof expr === "string") {
      stack.push(expr);

      if(!template.hasOwnProperty(expr))
        throw new Error("\"" + expr + "\" not found in language template.");

      else if(typeof template[expr] === "string") {
        if(/\$\d+/.test(template[expr]))
          throw new Error("\"" + expr + "\" was used in a value context, but is expected in a template context.");

        else
          result = template[expr];
      }

      else if(typeof template[expr] === "function") {
        if(template[expr].length !== 0)
          throw new Error("\"" + expr + "\" was used in a value context, but is expected in a template context.");

        else
          result = template[expr].call(stack);
      }

      else
        throw new Error("\"" + expr + "\" is not a valid language template pattern.");
    }

    else if(Array.isArray(expr) &&
            expr.length &&
            typeof expr[0] === "string") {
      stack.push(expr[0]);

      if(!template.hasOwnProperty(expr[0]))
        throw new Error("\"" + expr[0] + "\" not found in language template.");

      else if(typeof template[expr[0]] === "string")
        result = template[expr[0]].replace(/\$\d+/g, function(n) {
          return parse(expr[n.slice(1)|0], stack);
        });

      else if(typeof template[expr[0]] === "function") {
        if(template[expr[0]].length === 0)
          throw new Error("\"" + expr[0] + "\" was used in a template context, but is expected in a value context.");

        else if(template[expr[0]].length !== expr.length - 1)
          throw new Error("Template \"" + expr[0] + "\" did not expect " + (expr.length - 1) + " arguments.");

        else
          result = template[expr[0]].apply(
            stack,
            expr.slice(1).map(function(arg) {
              return parse(arg, stack);
            })
          );
      }

      else
        throw new Error("\"" + expr[0] + "\" is not a valid language template pattern.");
    }

    else
      throw new Error("Invalid expression.");

    stack.pop();
    return result;
  };

  return function(expr) {
    return parse(expr, []);
  }
};
