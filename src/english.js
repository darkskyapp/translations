(function() {
  "use strict";

  var ATOMS = {
        "clear": "clear",
        "very-light-rain": "drizzle",
        "light-rain": "light rain",
        "medium-rain": "rain",
        "heavy-rain": "heavy rain",
        "very-light-sleet": "light sleet",
        "light-sleet": "light sleet",
        "medium-sleet": "sleet",
        "heavy-sleet": "heavy sleet",
        "very-light-snow": "flurries",
        "light-snow": "light snow",
        "medium-snow": "snow",
        "heavy-snow": "heavy snow",
        "light-wind": "breezy",
        "medium-wind": "windy",
        "heavy-wind": "dangerously windy",
        "very-heavy-wind": "violently windy",
        "low-humidity": "dry",
        "high-humidity": "humid",
        "foggy": "fog",
        "light-clouds": "partly cloudy",
        "medium-clouds": "mostly cloudy",
        "heavy-clouds": "overcast"
      },
      PREDICATES = {
        "and": function() {
          switch(arguments.length) {
            case 1:
              return arguments[0];

            case 2:
              return arguments[0] + " and " + arguments[1];

            default:
              return Array.prototype.slice.call(arguments, 0, -1).join(", ") + ", and " + arguments[arguments.length - 1];
          }
        },
        /* Capitalize the first letter of every word, except if that word is
         * "and". (This is a very crude bastardization of proper English
         * titling rules, but it is adequate for the purposes of this
         * module.) */
        "title": function(expr) {
          return expr.replace(
            /\b(?:a(?!nd\b)|[^\Wa])/g,
            function(letter) {
              return letter.toUpperCase();
            }
          );
        },
        /* Capitalize the first word of the sentence and end with a period. */
        "sentence": function(expr) {
          return expr.charAt(0).toUpperCase() + expr.slice(1) + ".";
        }
      };

  function translate(expr) {
    return typeof expr === "string" ?
             ATOMS[expr] :
             Array.isArray(expr) &&
               expr.length &&
               PREDICATES.hasOwnProperty(expr[0]) ?
                 PREDICATES[expr[0]].apply(null, expr.slice(1).map(translate)) :
                 undefined;
  }

  if(!this.DarkSky)
    this.DarkSky = {};

  if(!this.DarkSky.Summary)
    this.DarkSky.Summary = {};

  if(!this.DarkSky.Summary.English)
    this.DarkSky.Summary.English = translate;
}).call(this);

console.log(this.DarkSky.Summary.English(["title", ["and", "heavy-wind", "medium-clouds"]]));
