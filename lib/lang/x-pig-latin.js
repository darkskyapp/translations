function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "odaytay" || m === "omorrowtay")
    m = "onway " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  if(period.slice(0, 12) === "overnightway") {
    period = period.slice(12);
    return 'ightnay'+period;
  
  } else if(period.slice(0, 12)  ===  "inway ethay ") {
    return period.slice(12);
  }
  
  return period;
}

module.exports = require("../template")({
  "clear": "earclay",
  "no-precipitation": "onay ecipitationpray",
  "mixed-precipitation": "ixedmay ecipitationpray",
  "possible-very-light-precipitation": "ossiblepay ightlay ecipitationpray",
  "very-light-precipitation": "ightlay ecipitationpray",
  "possible-light-precipitation": "ossiblepay ightlay ecipitationpray",
  "light-precipitation": "ightlay ecipitationpray",
  "medium-precipitation": "ecipitationpray",
  "heavy-precipitation": "eavyhay ecipitationpray",
  "possible-very-light-rain": "ossiblepay izzledray",
  "very-light-rain": "izzledray",
  "possible-light-rain": "ossiblepay ightlay ainray",
  "light-rain": "ightlay ainray",
  "medium-rain": "ainray",
  "heavy-rain": "eavyhay ainray",
  "possible-very-light-sleet": "ossiblepay ightlay eetslay",
  "very-light-sleet": "ightlay eetslay",
  "possible-light-sleet": "ossiblepay ightlay eetslay",
  "light-sleet": "ightlay eetslay",
  "medium-sleet": "eetslay",
  "heavy-sleet": "eavyhay eetslay",
  "possible-very-light-snow": "ossiblepay urriesflay",
  "very-light-snow": "urriesflay",
  "possible-light-snow": "ossiblepay ightlay owsnay",
  "light-snow": "ightlay owsnay",
  "medium-snow": "owsnay",
  "heavy-snow": "eavyhay owsnay",
  "possible-thunderstorm": "ossiblepay understormsthay",
  "thunderstorm": "understormsthay",
  "light-wind": "eezybray",
  "medium-wind": "indyway",
  "heavy-wind": "angerouslyday indyway",
  "low-humidity": "ydray",
  "high-humidity": "umidhay",
  "fog": "oggyfay",
  "light-clouds": "artlypay oudyclay",
  "medium-clouds": "ostlymay oudyclay",
  "heavy-clouds": "overcastway",
  "today-morning": "isthay orningmay",
  "later-today-morning": "aterlay isthay orningmay",
  "today-afternoon": "isthay afternoonway",
  "later-today-afternoon": "aterlay isthay afternoonway",
  "today-evening": "isthay eveningway",
  "later-today-evening": "aterlay isthay eveningway",
  "today-night": "onighttay",
  "later-today-night": "aterlay onighttay",
  "tomorrow-morning": "omorrowtay orningmay",
  "tomorrow-afternoon": "omorrowtay afternoonway",
  "tomorrow-evening": "omorrowtay eveningway",
  "tomorrow-night": "omorrowtay ightnay",
  "morning": "inway ethay orningmay",
  "afternoon": "inway ethay afternoonway",
  "evening": "inway ethay eveningway",
  "night": "overnightway",
  "today": "odaytay",
  "tomorrow": "omorrowtay",
  "sunday": "onway undaysay",
  "monday": "onway ondaymay",
  "tuesday": "onway uesdaytay",
  "wednesday": "onway ednesdayway",
  "thursday": "onway ursdaythay",
  "friday": "onway idayfray",
  "saturday": "onway aturdaysay",
  "next-sunday": "extnay undaysay",
  "next-monday": "extnay ondaymay",
  "next-tuesday": "extnay uesdaytay",
  "next-wednesday": "extnay ednesdayway",
  "next-thursday": "extnay ursdaythay",
  "next-friday": "extnay idayfray",
  "next-saturday": "extnay aturdaysay",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "underway $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", andway " : " andway "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " oughthray ");
  },
  "with": "$1, ithway $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 orfay ethay hourway",
  "starting-in": "$1 artingstay inway $2",
  "stopping-in": "$1 oppingstay inway $2",
  "starting-then-stopping-later": "$1 artingstay inway $2, oppingstay $3 aterlay",
  "stopping-then-starting-later": "$1 oppingstay inway $2, artingstay againway $3 aterlay",
  "for-day": "$1 oughoutthray ethay ayday",
  "starting": "$1 artingstay $2",
  "until": function(condition, period) {
    return condition + " untilway " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " untilway " + strip_prefix(a) + ", artingstay againway " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " artingstay " + a + ", ontinuingcay untilway " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 oughoutthray ethay eekway",
  "over-weekend": "$1 overway ethay eekendway",
  "temperatures-peaking": "emperaturestay eakingpay atway $1 $2",
  "temperatures-rising": "emperaturestay isingray otay $1 $2",
  "temperatures-valleying": "emperaturestay ottomingbay outway atway $1 $2",
  "temperatures-falling": "emperaturestay allingfay otay $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    return str.replace(
      /\b(?:a(?!ndway\b)|[^\Wa])/g,
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
