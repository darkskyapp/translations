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
  return period.slice(0, 9) === "sobre la noche" ? period.slice(4) :
         period.slice(0, 7) ===         "en la " ? period.slice(7) :
                                                   period;
}

module.exports = require("../template")({
  "clear": "despejado",
  "no-precipitation": "sin precipitaciones",
  "mixed-precipitation": "precipitación mixta",
  "possible-very-light-precipitation": "posibles lluvias ligeras",
  "very-light-precipitation": "lluvias ligeras",
  "possible-light-precipitation": "posibles lluvias ligeras",
  "light-precipitation": "precipitación ligera",
  "medium-precipitation": "precipitación",
  "heavy-precipitation": "fuerte precipitación",
  "possible-very-light-rain": "posible llovizna",
  "very-light-rain": "llovizna",
  "possible-light-rain": "posible lluvia ligera",
  "light-rain": "lluvia ligera",
  "medium-rain": "lluvia",
  "heavy-rain": "fuertes lluvias",
  "possible-very-light-sleet": "posible aguanieve ligera",
  "very-light-sleet": "aguanieve ligera",
  "possible-light-sleet": "posible aguanieve ligera",
  "light-sleet": "aguanieve ligera",
  "medium-sleet": "aguanieve",
  "heavy-sleet": "fuertes aguanieves",
  "possible-very-light-snow": "posible nevada ligera",
  "very-light-snow": "nevadas ligeras",
  "possible-light-snow": "posible nevada ligera",
  "light-snow": "nevadas ligeras",
  "medium-snow": "nevadas",
  "heavy-snow": "fuertes nevadas",
  "light-wind": "pocos vientos",
  "medium-wind": "ventoso",
  "heavy-wind": "peligrosamente ventoso",
  "low-humidity": "seco",
  "high-humidity": "húmedo",
  "fog": "nublado",
  "light-clouds": "parcialmente nublado",
  "medium-clouds": "mayormente nublado",
  "heavy-clouds": "nublado",
  "today-morning": "esta mañana",
  "later-today-morning": "después esta mañana",
  "today-afternoon": "esta tarde",
  "later-today-afternoon": "después esta tarde",
  "today-evening": "esta noche",
  "later-today-evening": "después esta noche",
  "today-night": "esta noche",
  "later-today-night": "después esta noche",
  "tomorrow-morning": "mañana en la mañana",
  "tomorrow-afternoon": "mañana en la tarde",
  "tomorrow-evening": "mañana en la noche",
  "tomorrow-night": "mañana en la noche",
  "morning": "en la mañana",
  "afternoon": "en la tarde",
  "evening": "en la noche",
  "night": "en la noche",
  "today": "hoy",
  "tomorrow": "mañana",
  "sunday": "el Domingo",
  "monday": "el Lunes",
  "tuesday": "el Martes",
  "wednesday": "el Miércoles",
  "thursday": "el Jueves",
  "friday": "el Viernes",
  "saturday": "el Sábado",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "bajo $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", y " : " y "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " hasta ");
  },
  "with": "$1, con $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 por la hora",
  "starting-in": "$1 comenzando en $2",
  "stopping-in": "$1 parando en $2",
  "starting-then-stopping-later": "$1 comenzando en $2, después parando en $3",
  "stopping-then-starting-later": "$1 parando en $2, comenzando de nuevo $3 después",
  "for-day": "$1 durante el día",
  "starting": "$1 comenzando $2",
  "until": function(condition, period) {
    return condition + " hasta " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " hasta " + strip_prefix(a) + ", comenzando otra vez " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " comenzando " + a + ", continuando hasta " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 durante la semana",
  "over-weekend": "$1 sobre el fin de semana",
  "temperatures-peaking": "temperaturas alcanzando un máximo de $1 $2",
  "temperatures-rising": "temperaturas llegando a $1 $2",
  "temperatures-valleying": "temperaturas alcanzando un mínimo de $1 $2",
  "temperatures-falling": "temperaturas cayendo a $1 $2",
  /* Capitalize the first letter of every word, except if that word is "y". */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "y" ?
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
