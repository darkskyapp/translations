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
  return period.slice(0, 9) === "durant la nit" ? period.slice(4) :
         period.slice(0, 7) ===         "a la " ? period.slice(7) :
                                                   period;
}

module.exports = require("../template")({
  "clear": "clar",
  "no-precipitation": "sense precipitacions",
  "mixed-precipitation": "precipitacions mixtes",
  "possible-very-light-precipitation": "possibles pluges lleugeres",
  "very-light-precipitation": "pluges lleugeres",
  "possible-light-precipitation": "possibles pluges lleugeres",
  "light-precipitation": "precipitacions lleugeres",
  "medium-precipitation": "precipitació",
  "heavy-precipitation": "fortes precipitacions",
  "possible-very-light-rain": "possible plugim",
  "very-light-rain": "plugim",
  "possible-light-rain": "possible plugim",
  "light-rain": "pluja lleugera",
  "medium-rain": "pluja",
  "heavy-rain": "plujes fortes",
  "possible-very-light-sleet": "possible aiguaneu",
  "very-light-sleet": "aiguaneu",
  "possible-light-sleet": "possible aiguaneu",
  "light-sleet": "aiguaneu",
  "medium-sleet": "aiguaneu",
  "heavy-sleet": "fortes aiguaneu",
  "possible-very-light-snow": "possible nevada lleugera",
  "very-light-snow": "lleugeres nevades",
  "possible-light-snow": "possible nevada lleugera",
  "light-snow": "lleugeres nevades",
  "medium-snow": "nevades",
  "heavy-snow": "fortes nevades",
  "possible-thunderstorm": "possibles tempestes",
  "thunderstorm": "tempesta",
  "light-wind": "vents fluixos",
  "medium-wind": "ventós",
  "heavy-wind": "perillosament ventós",
  "low-humidity": "sec",
  "high-humidity": "humit",
  "fog": "ennuvolat",
  "light-clouds": "parcialment ennuvolat",
  "medium-clouds": "majoritariament ennuvolat",
  "heavy-clouds": "ennuvolat",
  "today-morning": "aquest matí",
  "later-today-morning": "durant el matí",
  "today-afternoon": "aquesta tarda",
  "later-today-afternoon": "durant la tarda",
  "today-evening": "aquest vespre",
  "later-today-evening": "durant el vespre",
  "today-night": "aquesta nit",
  "later-today-night": "durant la nit",
  "tomorrow-morning": "demà al matí",
  "tomorrow-afternoon": "demà a la tarda",
  "tomorrow-evening": "demà al vespre",
  "tomorrow-night": "demà a la nit",
  "morning": "al matí",
  "afternoon": "a la tarda",
  "evening": "al vespre",
  "night": "a la nit",
  "today": "avui",
  "tomorrow": "demà",
  "sunday": "el Diumenge",
  "monday": "el Dilluns",
  "tuesday": "el Dimarts",
  "wednesday": "el Dimecres",
  "thursday": "el Dijous",
  "friday": "el Divendres",
  "saturday": "el Dissabte",
  "next-sunday": "el pròxim diumenge",
  "next-monday": "el pròxim dilluns",
  "next-tuesday": "el pròxim dimarts",
  "next-wednesday": "el pròxim dimecres",
  "next-thursday": "el pròxim dijous",
  "next-friday": "el pròxim divendres",
  "next-saturday": "el pròxim dissabte",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "menys de $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", i " : " i "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " fins a ");
  },
  "with": "$1, amb $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 cada hora",
  "starting-in": "$1 començant $2",
  "stopping-in": "$1 parant a $2",
  "starting-then-stopping-later": "$1 començant d'aquí $2, després parant al cap $3",
  "stopping-then-starting-later": "$1 parant d'aquí $2, tornant a començar al cap $3",
  "for-day": "$1 durant el dia",
  "starting": "$1 començant $2",
  "until": function(condition, period) {
    return condition + " " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " " + strip_prefix(a) + ", començant " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " començant " + a + ", continuant " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 durant la setmana",
  "over-weekend": "$1 cap al cap de setmana",
  "temperatures-peaking": "temperatures aconseguint un màxim de $1 $2",
  "temperatures-rising": "temperatures arribant a $1 $2",
  "temperatures-valleying": "temperatures aconseguint un mínim de $1 $2",
  "temperatures-falling": "temperatures per sota a $1 $2",
  /* Capitalize the first letter of every word, except if that word is "i". */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "i" ?
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
  }
});
