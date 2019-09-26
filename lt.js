"use strict";

function join_with_shared_prefix(a, b, joiner) {
  let i = 0;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function time2(time) {
  switch(time) {
    case "ryte": return "ryto";
    case "dieną": return "dienos";
    case "vakare": return "vakaro";
    case "naktį": return "nakties";
    case "šiandien ryte": return "šiandienos ryto";
    case "šiandien priešpiet": return "šiandienos priešpiečio";
    case "šiandien dieną": return "vidurdienio";
    case "šiandien popiet": return "popiečio";
    case "šiandien vakare": return "vakaro";
    case "vėlai vakare": return "vėlyvo vakaro";
    case "šianakt": return "šios nakties";
    case "šiandien vėlai naktį": return "vidurnakčio";
    case "rytojaus rytą": return "rytojaus ryto";
    case "rytoj dieną": return "rytojaus dienos";
    case "rytoj vakare": return "rytojaus vakaro";
    case "rytoj naktį": return "rytojaus nakties";
    case "sekmadienį": return "sekmadienio";
    case "pirmadienį": return "pirmadienio";
    case "antradienį": return "antradienio";
    case "trečiadienį": return "trečiadienio";
    case "ketvirtadienį": return "ketvirtadienio";
    case "penktadienį": return "penktadienio";
    case "šeštadienį": return "šeštadienio";
    default: return time;
  }
}

module.exports = {
  "clear": "giedra",
  "no-precipitation": "be kritulių",
  "mixed-precipitation": "mišrūs krituliai",
  "possible-very-light-precipitation": "galimi nedideli krituliai",
  "very-light-precipitation": "nediddeli krituliai",
  "possible-light-precipitation": "galimi lengvi krituliai",
  "light-precipitation": "lengvi krituliai",
  "medium-precipitation": "krituliai",
  "heavy-precipitation": "gausūs krituliai",
  "possible-very-light-rain": "galimas negausus lietus",
  "very-light-rain": "negausus lietus",
  "possible-light-rain": "galimas negausus lietus",
  "light-rain": "lengvas lietus",
  "medium-rain": "lietus",
  "heavy-rain": "liūtis",
  "possible-very-light-sleet": "galima lengva kruša",
  "very-light-sleet": "lengva kruša",
  "possible-light-sleet": "galima lengva kruša",
  "light-sleet": "lengva kruša",
  "medium-sleet": "kruša",
  "heavy-sleet": "stipri kruša",
  "possible-very-light-snow": "galimas lengvas sniegas",
  "very-light-snow": "lengvas sniegas",
  "possible-light-snow": "galimas lengvas sniegas",
  "light-snow": "negausus sniegas",
  "medium-snow": "sniegas",
  "heavy-snow": "pūga",
  "possible-thunderstorm": "galimas griaustinis",
  "thunderstorm": "griaustinis",
  "light-wind": "silpnas vėjas",
  "medium-wind": "vėjas",
  "heavy-wind": "stiprus vėjas",
  "low-humidity": "sausa",
  "high-humidity": "drėgna",
  "fog": "rūkas",
  "light-clouds": "nedidelis debesuotumas",
  "medium-clouds": "debesuota",
  "heavy-clouds": "stiprus debesuotumas",
  "today-morning": "šiandien ryte",
  "later-today-morning": "šiandien priešpiet",
  "today-afternoon": "šiandien dieną",
  "later-today-afternoon": "šiandien po pietų",
  "today-evening": "šiandien vakare",
  "later-today-evening": "šiandien vėlai vakare",
  "today-night": "šianakt",
  "later-today-night": "vėlai naktį",
  "tomorrow-morning": "rytoj ryte",
  "tomorrow-afternoon": "rytoj po pietų",
  "tomorrow-evening": "rytoj vakare",
  "tomorrow-night": "rytoj naktį",
  "morning": "ryte",
  "afternoon": "dieną",
  "evening": "vakare",
  "night": "naktį",
  "today": "šiandien",
  "tomorrow": "rytoj",
  "sunday": "sekmadienį",
  "monday": "pirmadienį",
  "tuesday": "antradienį",
  "wednesday": "trečiadienį",
  "thursday": "ketvirtadienį",
  "friday": "penktadienį",
  "saturday": "šeštadienį",
  "next-sunday": "kitą sekmadienį",
  "next-monday": "kitą pirmadienį",
  "next-tuesday": "kitą antradienį",
  "next-wednesday": "kitą trečiadienį",
  "next-thursday": "kitą ketvirtadienį",
  "next-friday": "kitą penktadienį",
  "next-saturday": "kitą šeštadienį",
  "minutes": "$1 min",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 см.",
  "less-than": "mažiau $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", ir " : " ir "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, time2(b), " iki ");
  },
  "with": "$1, с $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 valandos bėgyje",
  "starting-in": "$1 prasidės $2",
  "stopping-in": "$1 baigsis $2",
  "starting-then-stopping-later": "$1 prasidės $2, ir baigsis už $3",
  "stopping-then-starting-later": "$1 baigsis už $2, ir vėl pasidės $3",
  "for-day": "$1 visos dienos bėgyje",
  "starting": "$1 prasideda $2",
  "until": function(condition, time) {
    return condition + " iki " + time2(time);
  },
  "until-starting-again": function(condition, timeUntil, timeAgain){
    timeUntil = time2(timeUntil);
    return condition + " iki " + timeUntil + ", prasidedant vėl " + timeAgain;
  },
  "starting-continuing-until": function(condition, timeFrom, timeTo) {
    timeFrom = time2(timeFrom);
    timeTo = time2(timeTo);
    return condition + ", pradedant nuo " + timeFrom + ", ir iki " + timeTo;
  },
  "during": function(condition, time) {
    return condition + " " + time;
  },
  "for-week": "$1 visos savaitės bėgyje",
  "over-weekend": "$1 visą savaitgalį",
  "temperatures-peaking": "temperatūra siekianti iki $1 $2",
  "temperatures-rising": "temperatūra pakils iki $1 $2",
  "temperatures-valleying": "temperatūra kris iki $1 $2",
  "temperatures-falling": "temperatūra krentanti iki $1 $2",
  /* Capitalize the first letter of every word, except if that word is "e". */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "ir" ?
        word :
        word.charAt(0).toUpperCase() + word.slice(1);
    });
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  },
};
