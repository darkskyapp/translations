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

module.exports = require("../template")({
  "clear": "limpo",
  "no-precipitation": "sem aguaceiros",
  "mixed-precipitation": "aguaceiros variados",
  "possible-very-light-precipitation": "possiveis aguaceiros muito fracos",
  "very-light-precipitation": "aguaceiros muito fracos",
  "possible-light-precipitation": "possiveis aguaceiros fracos",
  "light-precipitation": "aguaceiros fracos",
  "medium-precipitation": "aguaceiros",
  "heavy-precipitation": "aguaceiros fortes",
  "possible-very-light-rain": "possiveis chuviscos",
  "very-light-rain": "chuviscos",
  "possible-light-rain": "possivel chuva fraca",
  "light-rain": "chuva fraca",
  "medium-rain": "chuva",
  "heavy-rain": "chuva forte",
  "possible-very-light-sleet": "possivel granizo muito fraco",
  "very-light-sleet": "granizo muito fraco",
  "possible-light-sleet": "possivel granizo fraco",
  "light-sleet": "granizo fraco",
  "medium-sleet": "granizo",
  "heavy-sleet": "granizo forte",
  "possible-very-light-snow": "possivel neve muito fraca",
  "very-light-snow": "neve muito fraca",
  "possible-light-snow": "possivel neve fraca",
  "light-snow": "neve fraca",
  "medium-snow": "neve",
  "heavy-snow": "nevão",
  "possible-thunderstorm": "tempestades possíveis",
  "thurderstorm": "tempestade",
  "light-wind": "vento fraco",
  "medium-wind": "vento",
  "heavy-wind": "vento forte",
  "low-humidity": "seco",
  "high-humidity": "húmido",
  "fog": "nevoeiro",
  "light-clouds": "ligeiramente nublado",
  "medium-clouds": "nublado",
  "heavy-clouds": "muito nublado",
  "today-morning": "hoje de manhã",
  "later-today-morning": "manhã de hoje",
  "today-afternoon": "hoje à tarde",
  "later-today-afternoon": "tarde de hoje",
  "today-evening": "hoje à noite",
  "later-today-evening": "noite de hoje",
  "today-night": "hoje de madrugada",
  "later-today-night": "de madrugada",
  "tomorrow-morning": "amanhã de manhã",
  "tomorrow-afternoon": "amanhã à tarde",
  "tomorrow-evening": "amanhã à noite",
  "tomorrow-night": "amanhã de madrugada",
  "morning": "manhã",
  "afternoon": "tarde",
  "evening": "noite",
  "night": "madrugada",
  "today": "hoje",
  "tomorrow": "amanhã",
  "sunday": "domingo",
  "monday": "segunda-feira",
  "tuesday": "terça-feira",
  "wednesday": "quarta-feira",
  "thursday": "quinta-feira",
  "friday": "sexta-feira",
  "saturday": "sábado",
  "next-sunday": "próximo domingo",
  "next-monday": "próxima segunda-feira",
  "next-tuesday": "próxima terça-feira",
  "next-wednesday": "próxima quarta-feira",
  "next-thursday": "próxima quinta-feira",
  "next-friday": "próxima sexta-feira",
  "next-saturday": "próximo sábado",
  "minutes": "$1 min",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "menos de $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", e " : " e "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " durante ");
  },
  "with": "$1, com $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 na próxima hora",
  "starting-in": "$1 dentro de $2",
  "stopping-in": "$1 termina daqui a $2",
  "starting-then-stopping-later": "$1 dentro de $2, termina $3 mais tarde",
  "stopping-then-starting-later": "$1 termina dentro de $2, recomeça $3 mais tarde",
  "for-day": "$1 durante todo o dia",
  "starting": "$1 começa durante a $2",
  "until": "$1 até $2",
  "until-starting-again": "$1 até $2, recomeça $3",
  "starting-continuing-until": "$1 começa esta $2, continua até à $3",
  "during": "$1 durante $2",
  "for-week": "$1 durante toda a semana",
  "over-weekend": "$1 durante todo o fim de semana",
  "temperatures-peaking": "as temperaturas a chegar a um máximo de $1 $2",
  "temperatures-rising": "as temperaturas a subir aos $1 $2",
  "temperatures-valleying": "as temperaturas a descer até $1 $2",
  "temperatures-falling": "as temperaturas a descer até um minimo de $1 $2",
  /* Capitalize the first letter of every word, except if that word is "e". */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "e" ?
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
