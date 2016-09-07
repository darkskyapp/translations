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
  "clear": "jasno",
  "no-precipitation": "brez padavin",
  "mixed-precipitation": "možne padavine",
  "possible-very-light-precipitation": "možne so rahle padavine",
  "very-light-precipitation": "rahle padavine",
  "possible-light-precipitation": "možne so rahle padavine",
  "light-precipitation": "rahle padavine",
  "medium-precipitation": "padavine",
  "heavy-precipitation": "močne padavine",
  "possible-very-light-rain": "možen je rahel dež",
  "very-light-rain": "rosenje",
  "possible-light-rain": "možen je rahel dež",
  "light-rain": "rahel dež",
  "medium-rain": "dež",
  "heavy-rain": "močan dež",
  "possible-very-light-sleet": "možnost rahlega žleda",
  "very-light-sleet": "rahel žled",
  "possible-light-sleet": "možnost žleda",
  "light-sleet": "rahel žled",
  "medium-sleet": "dež s snegom",
  "heavy-sleet": "žled",
  "possible-very-light-snow": "možno je rahlo sneženje",
  "very-light-snow": "rahlo sneženje",
  "possible-light-snow": "možnost rahlega sneženja",
  "light-snow": "rahlo sneženje",
  "medium-snow": "sneg",
  "heavy-snow": "močno sneženje",
  "light-wind": "vetrovno",
  "medium-wind": "vetrovno",
  "heavy-wind": "močni sunki vetra",
  "low-humidity": "suho",
  "high-humidity": "vlažno",
  "fog": "megleno",
  "light-clouds": "delno oblačno",
  "medium-clouds": "pretežno oblačno",
  "heavy-clouds": "oblačno",
  "today-morning": "danes zjutraj",
  "later-today-morning": "kasneje to jutro",
  "today-afternoon": "danes popoldan",
  "later-today-afternoon": "kasneje popoldan",
  "today-evening": "zvečer",
  "later-today-evening": "drevi",
  "today-night": "danes zvečer",
  "later-today-night": "danes zvečer",
  "tomorrow-morning": "jutri zjutraj",
  "tomorrow-afternoon": "jutri popoldne",
  "tomorrow-evening": "jutri zvečer",
  "tomorrow-night": "jutri zvečer",
  "morning": "zjutraj",
  "afternoon": "popoldan",
  "evening": "zvečer",
  "night": "zvečer",
  "today": "danes",
  "tomorrow": "jutri",
  "sunday": "v nedeljo",
  "monday": "v ponedeljek",
  "tuesday": "v torek",
  "wednesday": "v sredo",
  "thursday": "v četrtek",
  "friday": "v petek",
  "saturday": "v soboto",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "manj kot $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", in " : " in "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " do ");
  },
  "with": "$1, s $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 za uro",
  "starting-in": "$1 od $2",
  "stopping-in": "$1 do $2",
  "starting-then-stopping-later": "$1 od $2, do $3 kasneje",
  "stopping-then-starting-later": "$1 do $2, začelo bo zopet $3 kasneje",
  "for-day": "$1 čez dan",
  "starting": "$1 od $2",
  "until": function(condition, period) {
    return condition + " do " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " do " + strip_prefix(a) + ", začelo bo zopet " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " začel " + a + ", do " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 čez teden",
  "over-weekend": "$1 v soboto in nedeljo",
  "temperatures-peaking": "temperaturami do $1 $2",
  "temperatures-rising": "temperaturami do $1 $2",
  "temperatures-valleying": "najnižjimi temperaturamiokoli $1 $2",
  "temperatures-falling": "temperaturami do $1 $2",
  /* Capitalize the first letter of every word. */
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
