function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "overnight" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "helder",
  "no-precipitation": "geen neerslag van betekenis",
  "mixed-precipitation": "wisselende neerslag",
  "very-light-precipitation": "lichte neerslag",
  "light-precipitation": "lichte neerslag",
  "medium-precipitation": "neerslag",
  "heavy-precipitation": "zware neerslag",
  "very-light-rain": "motregen",
  "light-rain": "lichte regen",
  "medium-rain": "regen",
  "heavy-rain": "zware regenbuien",
  "very-light-sleet": "lichte ijzel",
  "light-sleet": "lichte ijzel",
  "medium-sleet": "ijzel",
  "heavy-sleet": "zware ijzel",
  "very-light-snow": "lichte sneeuwbuien",
  "light-snow": "lichte sneeuwbuien",
  "medium-snow": "sneeuw",
  "heavy-snow": "zware sneeuwbuien",
  "light-wind": "weinig wind",
  "medium-wind": "veel wind",
  "heavy-wind": "zware windstoten",
  "low-humidity": "lage luchtvochtigheid",
  "high-humidity": "hoge luchtvochtigheid",
  "fog": "mistig",
  "light-clouds": "licht bewolkt",
  "medium-clouds": "overwegend bewolkt",
  "heavy-clouds": "zwaar bewolkt",
  "today-morning": "vanmorgen",
  "later-today-morning": "later vanmorgen",
  "today-afternoon": "deze middag",
  "later-today-afternoon": "later vanmiddag",
  "today-evening": "vanavond",
  "later-today-evening": "later vanavond",
  "today-night": "vannacht",
  "later-today-night": "later vannacht",
  "tomorrow-morning": "morgenochtend",
  "tomorrow-afternoon": "morgenmiddag",
  "tomorrow-evening": "morgenavond",
  "tomorrow-night": "morgennacht",
  "morning": "de ochtend",
  "afternoon": "de middag",
  "evening": "de avond",
  "night": "de nacht",
  "today": "vandaag",
  "tomorrow": "morgen",
  "sunday": "op zondag",
  "monday": "op maandag",
  "tuesday": "op dinsdag",
  "wednesday": "op woensdag",
  "thursday": "op donderdag",
  "friday": "op vrijdag",
  "saturday": "op zaterdag",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 inch",
  "centimeters": "$1 cm",
  "less-than": "minder dan $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", en " : " en "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " tot aan ");
  },
  "with": "$1 met $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "het komende uur $1",
  "starting-in": "over $2 $1",
  "stopping-in": "$1, stopt over $2",
  "starting-then-stopping-later": "$1 begint over $2 en stopt weer $3 later",
  "stopping-then-starting-later": "$1 stopt over $2 maar begint $3 later opnieuw",
  "for-day": "$1 gedurende de dag",
  "starting": "$2 begint $1",
  "until": function(condition, period) {
    return condition + " tot " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " tot " + strip_prefix(a) + " en "+ b + " weer opnieuw";
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " vanaf " + a + " continuerend tot aan " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "de hele week $1",
  "over-weekend": "$1 dit weekend",
  "temperatures-peaking": "een maximum temperatuur van $1 $2",
  "temperatures-rising": "temperaturen oplopend tot $1 $2",
  "temperatures-valleying": "een minimum temperatuur van $1 $2",
  "temperatures-falling": "temperatures zakkend tot $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
	   return str.charAt(0).toUpperCase() + str.slice(1);
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
