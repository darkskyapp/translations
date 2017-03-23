function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

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
  "no-precipitation": "nema padalina",
  "mixed-precipitation": "različite padaline",
  "possible-very-light-precipitation": "moguće su slabe padaline",
  "very-light-precipitation": "slabe padaline",
  "possible-light-precipitation": "moguće su slabe padaline",
  "light-precipitation": "slabe padaline",
  "medium-precipitation": "padaline",
  "heavy-precipitation": "jake padaline",
  "possible-very-light-rain": "moguća je sitna kiša",
  "very-light-rain": "sitna kiša",
  "possible-light-rain": "moguća je sitna kiša",
  "light-rain": "sitna kiša",
  "medium-rain": "kiša",
  "heavy-rain": "jaka kiša",
  "possible-very-light-sleet": "moguća je slaba susnježica",
  "very-light-sleet": "slaba susnježica",
  "possible-light-sleet": "moguća je slaba susnježica",
  "light-sleet": "slaba susnježica",
  "medium-sleet": "susnježica",
  "heavy-sleet": "jaka susnježica",
  "possible-very-light-snow": "moguć je sitan snijeg",
  "very-light-snow": "sitan snijeg",
  "possible-light-snow": "moguć je sitan snijeg",
  "light-snow": "sitan snijeg",
  "medium-snow": "snijeg",
  "heavy-snow": "jak snijeg",
  "possible-thunderstorm": "moguća grmljavina",
  "thunderstorm": "grmljavina",
  "light-wind": "vjetrovito",
  "medium-wind": "vjetrovito",
  "heavy-wind": "jako vjetrovito",
  "low-humidity": "suho",
  "high-humidity": "vlažno",
  "fog": "maglovito",
  "light-clouds": "djelomice oblačno",
  "medium-clouds": "pretežno oblačno",
  "heavy-clouds": "oblačno",
  "today-morning": "ovo jutro",
  "later-today-morning": "kasnije ovog jutra",
  "today-afternoon": "poslijepodne",
  "later-today-afternoon": "kasnije poslijepodne",
  "today-evening": "večeras",
  "later-today-evening": "kasnije večeras",
  "today-night": "noći",
  "later-today-night": "kasnije u noć",
  "tomorrow-morning": "sutra ujutro",
  "tomorrow-afternoon": "sutra popodne",
  "tomorrow-evening": "sutra navečer",
  "tomorrow-night": "sutra u noć",
  "morning": "ujutro",
  "afternoon": "popodne",
  "evening": "večeras",
  "night": "noći",
  "today": "danas",
  "tomorrow": "sutra",
  "sunday": "u nedjelju",
  "monday": "u ponedjeljak",
  "tuesday": "u utorak",
  "wednesday": "u srijedu",
  "thursday": "u četvrtak",
  "friday": "u petak",
  "saturday": "u subotu",
  "next-sunday": "sljedeću nedjelju",
  "next-monday": "sljedeći ponedjeljak",
  "next-tuesday": "sljedeći utorak",
  "next-wednesday": "sljedeću srijedu",
  "next-thursday": "sljedeći četvrtak",
  "next-friday": "sljedeći petak",
  "next-saturday": "sljedeću subotu",
  "minutes": "$1 minuta",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 inča",
  "centimeters": "$1 centimetra",
  "less-than": "ispod $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", i " : " i "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " do ");
  },
  "with": "$1, sa $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 za ovaj sat",
  "starting-in": "$1 počinje za $2",
  "stopping-in": "$1 prestaje za $2",
  "starting-then-stopping-later": "$1 počinje za $2, pa prestaje za $3",
  "stopping-then-starting-later": "$1 prestaje za $2, pa počinje za $3",
  "for-day": "$1 tijekom cijelog dana",
  "starting": "$1 počinje $2",
  "until": function(condition, period) {
    return condition + " do " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " do " + strip_prefix(a) + ", i opet počinje " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " počinje " + a + ", ostaje do " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 tijekom tjedna",
  "over-weekend": "$1 tijekom vikenda",
  "temperatures-peaking": "temperaturom najviše do $1 $2",
  "temperatures-rising": "temperaturom raste do $1 $2",
  "temperatures-valleying": "temperaturom najniže do $1 $2",
  "temperatures-falling": "temperaturom pada do $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
    /*return str.replace(
      /\b(?:a(?!nd\b)|[^\Wa])/g,
      function(letter) {
        return letter.toUpperCase();
      }
    );*/
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
