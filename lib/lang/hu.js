function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "ma" || m === "holnap")
    m =  "a"  + m + "i nap";

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + " és " + b.slice(i)+ joiner;
}

function strip_prefix(period) {
  return period.slice(0, 9) === "éjszaka" ? period.slice(4) :
         period.slice(0, 7) ===   "" ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "derült",
  "no-precipitation": "csapadékmentes idő",
  "mixed-precipitation": "vegyes csapadék",
  "possible-very-light-precipitation": "szitáló csapadék lehetséges",
  "very-light-precipitation": "szitáló csapadék",
  "possible-light-precipitation": "gyenge csapadék lehetséges",
  "light-precipitation": "gyenge csapadék",
  "medium-precipitation": "csapadék",
  "heavy-precipitation": "intenzív csapadék",
  "possible-very-light-rain": "gyenge szitálás lehetséges",
  "very-light-rain": "gyenge szitálás",
  "possible-light-rain": "gyenge eső lehetséges",
  "light-rain": "gyenge eső",
  "medium-rain": "eső",
  "heavy-rain": "intenzív eső",
  "possible-very-light-sleet": "ónos szitálás lehetséges",
  "very-light-sleet": "ónos szitálás",
  "possible-light-sleet": "gyenge ónos eső lehetséges",
  "light-sleet": "gyenge ónos eső",
  "medium-sleet": "ónos eső",
  "heavy-sleet": "havas eső",
  "possible-very-light-snow": "hószállingózás lehetséges",
  "very-light-snow": "hószállingózás",
  "possible-light-snow": "gyenge havazás lehetséges",
  "light-snow": "gyenge havazás",
  "medium-snow": "havazás",
  "heavy-snow": "intenzív havazás",
  "light-wind": "enyhe szél",
  "medium-wind": "mérsékelt szél",
  "heavy-wind": "erős szél",
  "low-humidity": "száraz idő",
  "high-humidity": "párás idő",
  "fog": "ködös idő",
  "light-clouds": "közepes felhősödés",
  "medium-clouds": "erős felhősödés",
  "heavy-clouds": "borult idő",
  "today-morning": "ma reggel",
  "later-today-morning": "ma késő délelőtt",
  "today-afternoon": "ma délután",
  "later-today-afternoon": "ma késő délután",
  "today-evening": "ma este",
  "later-today-evening": "ma késő este",
  "today-night": "ma éjjel",
  "later-today-night": "ma késő éjjel",
  "tomorrow-morning": "holnap reggel",
  "tomorrow-afternoon": "holnap délután",
  "tomorrow-evening": "holnap este",
  "tomorrow-night": "holnap éjjel",
  "morning": "reggel",
  "afternoon": "délután",
  "evening": "este",
  "night": "éjjel",
  "today": "ma",
  "tomorrow": "holnap",
  "sunday": "vasárnap",
  "monday": "hétfői nap",
  "tuesday": "keddi nap",
  "wednesday": "szerdai nap",
  "thursday": "csütörtöki nap",
  "friday": "pénteki nap",
  "saturday": "szombati nap",
  "minutes": "$1 perc",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "$1 alatt",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      ""
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " között");
  },
  "with": "$1, $2",
  "range": "$1\u2013$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "vegyes csapadék" ? " hó)" : ")");
  },
  "for-hour": "$1 ebben az órában",
  "starting-in": "$1 $2 múlva",
  "stopping-in": "$1 $2 múlva véget ér",
  "starting-then-stopping-later": "$1 $2 múlva, $3ig",
  "stopping-then-starting-later": "$1 $2 múlva véget ér, de $3 elteltével újra várható",
  "for-day": "$1 egész nap",
  "starting": "$1 lesz $2",
  "until": function(condition, period) {
    return condition + " " + strip_prefix(period)+ "";
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " " + strip_prefix(a) + ", majd "+ b +" ismét" ;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " kezdődik " + a + ", " + strip_prefix(b) + " folytatódik";
  },
  "during": "$1 $2",
  "for-week": "$1 ezen a héten",
  "over-weekend": "$1 a hétvégén",
  "temperatures-peaking": "$1 csúcshőmérséklettel $2",
  "temperatures-rising": "$1-ra emelkedő hőmérséklettel $2",
  "temperatures-valleying": "$1 minimum hőmérséklettel $2",
  "temperatures-falling": "$1-ra eső hőmérséklettel $2",
  /* Capitalize the first letter of first word. */
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
