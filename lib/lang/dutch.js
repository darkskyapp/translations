function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "'s nachts" ? period.slice(4) :
         period.slice(0, 7) ===   "in de " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "helder",
  "no-precipitation": "geen neerslag",
  "mixed-precipitation": "wisselende neerslag",
  "very-light-precipitation": "lichte neerslag",
  "light-precipitation": "lichte neerslag",
  "medium-precipitation": "neerslag",
  "heavy-precipitation": "zware neerslag",
  "very-light-rain": "motregen",
  "light-rain": "lichte regen",
  "medium-rain": "regen",
  "heavy-rain": "zware regen",
  "very-light-sleet": "hele lichte natte sneeuw",
  "light-sleet": "lichte natte sneeuw",
  "medium-sleet": "natte sneeuw",
  "heavy-sleet": "zware natte sneeuw",
  "very-light-snow": "fijne sneeuw",
  "light-snow": "lichte sneeuwval",
  "medium-snow": "sneeuw",
  "heavy-snow": "zware sneeuwval",
  "light-wind": "lichte wind",
  "medium-wind": "matige wind",
  "heavy-wind": "stormachtig",
  "low-humidity": "droog",
  "high-humidity": "vochtig",
  "fog": "mistig",
  "light-clouds": "licht bewolkt",
  "medium-clouds": "veelal bewolkt",
  "heavy-clouds": "zwaar bewolkt",
  "today-morning": "vanmorgen",
  "later-today-morning": "later in de morgen",
  "today-afternoon": "deze namiddag",
  "later-today-afternoon": "later deze namiddag",
  "today-evening": "deze avond",
  "later-today-evening": "later deze avond",
  "today-night": "vannacht",
  "later-today-night": "later vannacht",
  "tomorrow-morning": "morgenochtend",
  "tomorrow-afternoon": "morgen in de namiddag",
  "tomorrow-evening": "morgenavond",
  "tomorrow-night": "morgen nacht",
  "morning": "in de morgen",
  "afternoon": "in de namiddag",
  "evening": "in de avond",
  "night": "'s nachts",
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
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "minder dan $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", en " : " en "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " de gehele ");
  },
  "with": "$1, met $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 voor dit uur",
  "starting-in": "$1 begint over $2",
  "stopping-in": "$1 stopt over $2",
  "starting-then-stopping-later": "$1 begint over $2, en stopt $3 later",
  "stopping-then-starting-later": "$1 stopt over $2, en begint opnieuw over $3",
  "for-day": "de gehele dag $1",
  "starting": "$1 begint in $2",
  "until": function(condition, period) {
    return condition + " until " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " totdat " + strip_prefix(a) + ", met opnieuw " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " beginnende " + a + ", en gaat door tot " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 de gehele week",
  "over-weekend": "het hele weekend $1",
  "temperatures-peaking": "temperaturen met uitschieters tot $1 $2",
  "temperatures-rising": "temperaturen stijgend tot $1 $2",
  "temperatures-valleying": "temperaturen dalend tot $1 $2",
  "temperatures-falling": "temperaturen zakkende tot $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!nd\b)|[^\Wa])/g,
      function(letter) {
        return letter.toUpperCase();
      }
    );
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
