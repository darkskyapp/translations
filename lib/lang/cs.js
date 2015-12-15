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
  "clear": "jasno",
  "no-precipitation": "bez srážek",
  "mixed-precipitation": "smíšené srážky",
  "possible-very-light-precipitation": "možnost velmi slabých srážek",
  "very-light-precipitation": " velmi slabé srážky",
  "possible-light-precipitation": "možnost lehkých srážek",
  "light-precipitation": "slabé srážky",
  "medium-precipitation": "srážky",
  "heavy-precipitation": "silné srážky",
  "possible-very-light-rain": "možnost mrholení",
  "very-light-rain": "mrholení",
  "possible-light-rain": "možnost slabého deště",
  "light-rain": "slabý déšť",
  "medium-rain": "déšť",
  "heavy-rain": "vydatný déšť",
  "possible-very-light-sleet": "possible light sleet",
  "very-light-sleet": "slabý déšť se sněhem",
  "possible-light-sleet": "možnost slabého deště se sněžením",
  "light-sleet": "slabý déšť se sněhem",
  "medium-sleet": "plískanice",
  "heavy-sleet": "silný déšť se sněhem",
  "possible-very-light-snow": "možnost slabého sněžení",
  "very-light-snow": "slabé sněžení",
  "possible-light-snow": "možnost slabého sněžení",
  "light-snow": "slabé sněžení",
  "medium-snow": "sněžení",
  "heavy-snow": "silné sněžení",
  "light-wind": "slabý vítr",
  "medium-wind": "vítr",
  "heavy-wind": "silný vítr",
  "low-humidity": "sucho",
  "high-humidity": "vlhko",
  "fog": "mlhavo",
  "light-clouds": "částečně zataženo",
  "medium-clouds": "polojasno",
  "heavy-clouds": "zataženo",
  "today-morning": "dnešní ráno",
  "later-today-morning": "dopoledne",
  "today-afternoon": "dnešní odpoledne",
  "later-today-afternoon": "pozdní odpoledne",
  "today-evening": "večer",
  "later-today-evening": "pozdní večer",
  "today-night": "noc",
  "later-today-night": "pozdě v noci",
  "tomorrow-morning": "zítra ráno",
  "tomorrow-afternoon": "zítra odpoledne",
  "tomorrow-evening": "zítra večer",
  "tomorrow-night": "zítra v noci",
  "morning": "ráno",
  "afternoon": "odpoledne",
  "evening": "večer",
  "night": "noct",
  "today": "dnes",
  "tomorrow": "zítra",
  "sunday": "v neděli",
  "monday": "v pondělí",
  "tuesday": "v úterý",
  "wednesday": "ve středu",
  "thursday": "ve čtvrtek",
  "friday": "v pátek",
  "saturday": "s sobotu",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "under $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", and " : " and "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " through ");
  },
  "with": "$1, with $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 za hodinu",
  "starting-in": "$1 začne v $2",
  "stopping-in": "$1 přestane v $2",
  "starting-then-stopping-later": "$1 začne v $2, přestane $3 později",
  "stopping-then-starting-later": "$1 přestane v $2, začne znovu $3 později",
  "for-day": "$1 přes den",
  "starting": "$1 začíná $2",
  "until": function(condition, period) {
    return condition + " dokud " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " dokud " + strip_prefix(a) + ", začne znovu " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " starting " + a + ", continuing until " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 přes týden",
  "over-weekend": "$1 přes víkend",
  "temperatures-peaking": " teplotní zlom v $1 $2",
  "temperatures-rising": " teplota stoupá na $1 $2",
  "temperatures-valleying": " teplota klesá na $1 $2",
  "temperatures-falling": " teplota klesá na $1 $2",
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
