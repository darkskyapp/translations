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
  return period.slice(0, 13) === "yfir nóttina" ? period.slice(5) :
         period.slice(0, 4) ===   "um " ? period.slice(3) :
                                              period;
}

module.exports = require("../template")({
  "clear": "heiðskýrt",
  "no-precipitation": "engin úrkoma",
  "mixed-precipitation": "úrkoma með köflum",
  "possible-very-light-precipitation": "möguleiki á lítilsháttar úrkomu",
  "very-light-precipitation": "lítilsháttar úrkoma",
  "possible-light-precipitation": "möguleiki á smávægilegri úrkomu",
  "light-precipitation": "smávægileg úrkoma",
  "medium-precipitation": "úrkoma",
  "heavy-precipitation": "mikil úrkoma",
  "possible-very-light-rain": "líkur á úða",
  "very-light-rain": "úði",
  "possible-light-rain": "líkur á skúrum",
  "light-rain": "skúrir",
  "medium-rain": "rigning",
  "heavy-rain": "mikil rigning",
  "possible-very-light-sleet": "líkur á lítilsháttar slyddu",
  "very-light-sleet": "lítilsháttar slydda",
  "possible-light-sleet": "líkur á smávægilegri slyddu",
  "light-sleet": "smávægileg slydda",
  "medium-sleet": "slydda",
  "heavy-sleet": "mikil slydda",
  "possible-very-light-snow": "líkur á lítilsháttar snjókomu",
  "very-light-snow": "lítilsháttar snjókoma",
  "possible-light-snow": "líkur á smávægilegri snjókomu",
  "light-snow": "smávægileg snjókoma",
  "medium-snow": "snjókoma",
  "heavy-snow": "mikil snjókoma",
  "light-wind": "gola",
  "medium-wind": "rok",
  "heavy-wind": "hávaðarok",
  "low-humidity": "lítill raki",
  "high-humidity": "mikill raki",
  "fog": "þoka",
  "light-clouds": "skýjað að hluta til",
  "medium-clouds": "skýjað",
  "heavy-clouds": "alskýjað",
  "today-morning": "þennan morguninn",
  "later-today-morning": "seinna um morguninn",
  "today-afternoon": "þennan eftirmiðsdag",
  "later-today-afternoon": "seinnipart dags",
  "today-evening": "í kvöld",
  "later-today-evening": "seinna í kvöld",
  "today-night": "í nótt",
  "later-today-night": "seinna í nótt",
  "tomorrow-morning": "í fyrramálið",
  "tomorrow-afternoon": "seinnipart morgundags",
  "tomorrow-evening": "annað kvöld",
  "tomorrow-night": "næstu nótt",
  "morning": "um morguninn",
  "afternoon": "í síðdeginu",
  "evening": "um kvöldið",
  "night": "yfir nóttina",
  "today": "í dag",
  "tomorrow": "á morgun",
  "sunday": "á sunnudag",
  "monday": "á mánudag",
  "tuesday": "á þriðjudag",
  "wednesday": "á miðvikudag",
  "thursday": "á fimmtudag",
  "friday": "á föstudag",
  "saturday": "á laugardag",
  "minutes": "$1 mín.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "undir $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? " - " : " og "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " þangað til ");
  },
  "with": "$1, með $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 næsta klukkutímann",
  "starting-in": "$1 sem byrjar eftir $2",
  "stopping-in": "$1, líkur eftir $2",
  "starting-then-stopping-later": "$1 sem byrjar eftir $2, líkur $3 seinna",
  "stopping-then-starting-later": "$1 sem líkur eftir $2, byrjar aftur $3 seinna",
  "for-day": "$1 yfir daginn",
  "starting": "$1, byrjar $2",
  "until": function(condition, period) {
    return condition + " þangað til " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " þangað til " + strip_prefix(a) + ", byrjar aftur " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + ", byrjar " + a + " og heldur áfram yfir " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 yfir vikuna",
  "over-weekend": "$1 yfir helgina",
  "temperatures-peaking": "hita upp að $1 $2",
  "temperatures-rising": "hita að nálgast $1 $2",
  "temperatures-valleying": "hita niður í $1 $2",
  "temperatures-falling": "hita að falla niður í $1 $2",
  /* Capitalize the first character in the word.
   * We never titleize nor camelcase words in an sentence in Icelandic. */
  "title": function(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
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
