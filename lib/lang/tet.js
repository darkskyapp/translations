function join_with_shared_prefix(a, b, joiner) {
  var i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "iha kalan" ? period.slice(4) :
         period.slice(0, 7) ===   "iha " ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "pas",
  "no-precipitation": "udan la iha",
  "mixed-precipitation": "udan - maran kahur",
  "possible-very-light-precipitation": "karik udan uituan deit",
  "very-light-precipitation": "udan uituan",
  "possible-light-precipitation": "karik udan uituan",
  "light-precipitation": "udan uituan",
  "medium-precipitation": "udan",
  "heavy-precipitation": "udan bo'ot",
  "possible-very-light-rain": "karik udan uituan deit",
  "very-light-rain": "udan uituan deit",
  "possible-light-rain": "karik udan uituan",
  "light-rain": "udan uituan",
  "medium-rain": "udan",
  "heavy-rain": "udan bo'ot",
  "possible-very-light-sleet": "karik udan - salju kahur uituan deit",
  "very-light-sleet": "udan - salju kahur uituan deit",
  "possible-light-sleet": "karik udan - salju kahur uituan",
  "light-sleet": "udan - salju kahur uituan",
  "medium-sleet": "udan - salju kahur",
  "heavy-sleet": "udan - salju kahur bo'ot",
  "possible-very-light-snow": "karik salju uituan deit",
  "very-light-snow": "salju uituan deit",
  "possible-light-snow": "karik salju uituan",
  "light-snow": "salju uituan",
  "medium-snow": "salju",
  "heavy-snow": "salju bo'ot",
  "light-wind": "anin ki'ik",
  "medium-wind": "anin",
  "heavy-wind": "anin bo'ot",
  "low-humidity": "maran",
  "high-humidity": "bokon",
  "fog": "abu-abu taka rai",
  "light-clouds": "abu-abu uituan",
  "medium-clouds": "abu-abu",
  "heavy-clouds": "abu-abu taka loron",
  "today-morning": "ohin dader",
  "later-today-morning": "orsida ohin dader",
  "today-afternoon": "ohin lokraik",
  "later-today-afternoon": "orsida lokraik",
  "today-evening": "ohin kalan",
  "later-today-evening": "orsida kalan",
  "today-night": "ohin kalan bo'ot",
  "later-today-night": "orsida kalan bo'ot",
  "tomorrow-morning": "aban dader",
  "tomorrow-afternoon": "aban lokraik",
  "tomorrow-evening": "aban kalan",
  "tomorrow-night": "aban kalan bo'ot",
  "morning": "iha dader",
  "afternoon": "lokraik",
  "evening": "iha kalan",
  "night": "iha kalan bo'ot",
  "today": "ohin",
  "tomorrow": "aban",
  "sunday": "iha Domingu",
  "monday": "iha Segunda",
  "tuesday": "iha Tersa",
  "wednesday": "iha Kuarta",
  "thursday": "iha Kinta",
  "friday": "iha Sexta",
  "saturday": "iha Sabadu",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "$1 mai kraik",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", ho " : " ho "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " to ");
  },
  "with": "$1, ho $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 ba oras ida",
  "starting-in": "$1 hahu iha $2",
  "stopping-in": "$1 para iha $2",
  "starting-then-stopping-later": "$1 hahu iha $2, hein $3 para",
  "stopping-then-starting-later": "$1 para iha $2, hein $3 hahu fali",
  "for-day": "$1 loron tomak",
  "starting": "$1 hahu $2",
  "until": function(condition, period) {
    return condition + " to " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " to " + strip_prefix(a) + ", hahu fali " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " hahu " + a + ", kontinua to " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 durante semana ida",
  "over-weekend": "$1 durante Sabadu - Domingu",
  "temperatures-peaking": "temperatur la sai liu $1 $2",
  "temperatures-rising": "temperatur sai to $1 $2",
  "temperatures-valleying": "temperatur la tun liu $1 $2",
  "temperatures-falling": "temperatur tun to $1 $2",
  "title": function(str) {
    return str.replace(
      /(^|[\s\-])\w/g,
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
