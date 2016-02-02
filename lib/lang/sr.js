function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "today" || m === "tomorrow")
    m = "on " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "overnight" ? period.slice(4) :
         period.slice(0, 7) ===   "in the " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "vedro",
  "no-precipitation": "nema padavina",
  "mixed-precipitation": "mestimična padavina",
  "very-light-precipitation": "veoma slaba padavina",
  "light-precipitation": "slaba padavina",
  "medium-precipitation": "srednja padavina",
  "heavy-precipitation": "teška padavina",
  "possible-very-light-rain": "moguće padavine",
  "very-light-rain": "mestimična kiša",
  "possible-light-rain": "moguća laka kiša",
  "light-rain": "laka kiša",
  "medium-rain": "kiša",
  "heavy-rain": "teška kiša",
  "possible-very-light-sleet": "moguća teška kiša",
  "very-light-sleet": "laki sneg",
  "possible-light-sleet": "mogući laka teška susnežica",
  "light-sleet": "laka susnežica",
  "medium-sleet": "susnežica",
  "heavy-sleet": "teška susnežica",
  "possible-very-light-snow": "moguće pahuljice",
  "very-light-snow": "pahuljice",
  "possible-light-snow": "mogući sneg",
  "light-snow": "lak sneg",
  "medium-snow": "sneg",
  "heavy-snow": "težak sneg",
  "light-wind": "vetar",
  "medium-wind": "vetar",
  "heavy-wind": "mećava",
  "low-humidity": "suvo",
  "high-humidity": "valžno",
  "fog": "magla",
  "light-clouds": "laki oblaci",
  "medium-clouds": "mestimično oblačno",
  "heavy-clouds": "oblačno",
  "today-morning": "ovo jutr",
  "later-today-morning": "kasnije danas",
  "today-afternoon": "ovo posle podne",
  "later-today-afternoon": "kasnije posle podne",
  "today-evening": "uveče",
  "later-today-evening": "uveče",
  "today-night": "večeras",
  "later-today-night": "večeras",
  "tomorrow-morning": "sutra ujutro",
  "tomorrow-afternoon": "sutra popodne",
  "tomorrow-evening": "sutra posle podne",
  "tomorrow-night": "sutra uveče",
  "morning": "ujutro",
  "afternoon": "u podne",
  "evening": "uveče",
  "night": "večeras",
  "today": "danas",
  "tomorrow": "sutra",
  "sunday": "u Nedelju",
  "monday": "u Ponedeljak",
  "tuesday": "u Utorak ",
  "wednesday": "u Sredu",
  "thursday": "u Četrvrtak",
  "friday": "u Petak",
  "saturday": "u Subotu",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "manje od $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", and " : " and "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " do ");
  },
  "with": "$1, sa $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 za sat",
  "starting-in": "$1 počinje u $2",
  "stopping-in": "$1 prestaje u $2",
  "starting-then-stopping-later": "$1 počinje u $2, prestaje $3 later",
  "stopping-then-starting-later": "$1 prestaje u $2, počinje ponovo $3 later",
  "for-day": "$1 tokom celog dana",
  "starting": "$1 počinje $2",
  "until": function(condition, period) {
    return condition + " do " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " do " + strip_prefix(a) + ", ponovo počinje " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " od " + a + ", traje do " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 tokom vikenda",
  "over-weekend": "$1 preko vikenda",
  "temperatures-peaking": "najviša temperatura $1 $2",
  "temperatures-rising": "najviša do $1 $2",
  "temperatures-valleying": "najniža temperatura $1 $2",
  "temperatures-falling": "najniža do $1 $2",
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
