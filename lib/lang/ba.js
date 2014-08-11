function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  /* HACK: This gets around "today through on Tuesday" or cases like it, which
   * are incorrect in English. */
  if(m === "danas" || m === "sutra")
    m = "na " + m;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "preko noći" ? period.slice(4) :
         period.slice(0, 7) ===   "u " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "vedro",
  "no-precipitation": "nema padavine",
  "mixed-precipitation": "razna padavina",
  "possible-very-light-precipitation": "moguće slaba padavina",
  "very-light-precipitation": "slaba padavina",
  "possible-light-precipitation": "moguće slaba padavina",
  "light-precipitation": "slaba padavina",
  "medium-precipitation": "padavina",
  "heavy-precipitation": "jaka padavina",
  "possible-very-light-rain": "moguće sitna kiša",
  "very-light-rain": "sitna kiša",
  "possible-light-rain": "moguće slaba kiša",
  "light-rain": "slaba kiša",
  "medium-rain": "kiša",
  "heavy-rain": "jaka kiša",
  "possible-very-light-sleet": "moguće slaba susnježica",
  "very-light-sleet": "slaba susnježica",
  "possible-light-sleet": "moguće slaba susnježica",
  "light-sleet": "slaba susnježica",
  "medium-sleet": "susnježica",
  "heavy-sleet": "jaka susnježica",
  "possible-very-light-snow": "moguće mokar snijeg",
  "very-light-snow": "mokar snijeg",
  "possible-light-snow": "moguće sitan snijeg",
  "light-snow": "sitan snijeg",
  "medium-snow": "snijeg",
  "heavy-snow": "jak snijeg",
  "light-wind": "vjetrovito",
  "medium-wind": "vjetrovito",
  "heavy-wind": "opasno vjetrovito",
  "low-humidity": "suho",
  "high-humidity": "vlažno",
  "fog": "maglovito",
  "light-clouds": "djelom oblačno",
  "medium-clouds": "pretežno oblačno",
  "heavy-clouds": "oblačno",
  "today-morning": "ovo jutro",
  "later-today-morning": "kasnije ovog jutra",
  "today-afternoon": "popodne",
  "later-today-afternoon": "kasnije popodne",
  "today-evening": "uveče",
  "later-today-evening": "kansije uveče",
  "today-night": "noćas",
  "later-today-night": "kasnije u noć",
  "tomorrow-morning": "sutra ujutro",
  "tomorrow-afternoon": "sutra popodne",
  "tomorrow-evening": "sutra uveče",
  "tomorrow-night": "sutra u noć",
  "morning": "ujutro",
  "afternoon": "popodne",
  "evening": "uveče",
  "night": "preko noći",
  "today": "danas",
  "tomorrow": "sutra",
  "sunday": "u Nedjelju",
  "monday": "u Ponedjeljak",
  "tuesday": "u Utorak",
  "wednesday": "u Srijedu",
  "thursday": "u Četvrtak",
  "friday": "u Petak",
  "saturday": "u Subotu",
  "minutes": "$1 minut.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 inč.",
  "centimeters": "$1 centimetar.",
  "less-than": "ispod $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", i " : " i "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " kroz ");
  },
  "with": "$1, s $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 za sat",
  "starting-in": "$1 počinje za $2",
  "stopping-in": "$1 staje za $2",
  "starting-then-stopping-later": "$1 počinje za $2, staje $3 kasnije",
  "stopping-then-starting-later": "$1 staje za $2, počinje opet $3 kasnije",
  "for-day": "$1 tokom cijelog dana",
  "starting": "$1 počinje $2",
  "until": function(condition, period) {
    return condition + " do " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " do " + strip_prefix(a) + ", počinje opet " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " počinje " + a + ", pa sve do " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 tokom sedmice",
  "over-weekend": "$1 tokom vikend",
  "temperatures-peaking": "temperature najviše u $1 $2",
  "temperatures-rising": "temperature rastu do $1 $2",
  "temperatures-valleying": "temperature najniže do $1 $2",
  "temperatures-falling": "temperature padaju do $1 $2",
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
