"use strict";

function parse(template, expr, stack) {
  if(typeof expr === "number") {
    return expr.toString();
  }

  let result;

  if(typeof expr === "string") {
    if(!template.hasOwnProperty(expr)) {
      throw new Error("\"" + expr + "\" not found in language template.");
    }

    stack.push(expr);

    if(typeof template[expr] === "string") {
      if(/\$\d+/.test(template[expr])) {
        throw new Error(
          "\"" + expr + "\" was used in a value context, " +
          "but is expected in a template context."
        );
      }

      result = template[expr];
    }

    else if(typeof template[expr] === "function") {
      if(template[expr].length !== 0) {
        throw new Error(
          "\"" + expr + "\" was used in a value context, " +
          "but is expected in a template context."
        );
      }

      result = template[expr].call(stack);
    }

    else {
      throw new Error(
        "\"" + expr + "\" is not a valid language template pattern."
      );
    }
  }

  else if(Array.isArray(expr) &&
          expr.length &&
          typeof expr[0] === "string") {
    if(!template.hasOwnProperty(expr[0])) {
      throw new Error("\"" + expr[0] + "\" not found in language template.");
    }

    stack.push(expr[0]);

    if(typeof template[expr[0]] === "string") {
      result = template[expr[0]].replace(
        /\$\d+/g,
        n => parse(template, expr[n.slice(1)|0], stack)
      );
    }

    else if(typeof template[expr[0]] === "function") {
      if(template[expr[0]].length === 0) {
        throw new Error(
          "\"" + expr[0] + "\" was used in a template context, " +
          "but is expected in a value context."
        );
      }

      if(template[expr[0]].length !== expr.length - 1) {
        throw new Error(
          "Template \"" + expr[0] + "\" did not expect " +
          (expr.length - 1) + " arguments."
        );
      }

      result = template[expr[0]].apply(
        stack,
        expr.slice(1).map(arg => parse(template, arg, stack))
      );
    }

    else {
      throw new Error(
        "\"" + expr[0] + "\" is not a valid language template pattern."
      );
    }
  }

  else {
    throw new Error("Invalid expression.");
  }

  stack.pop();
  return result;
}

module.exports = template => expr => parse(template, expr, []);
