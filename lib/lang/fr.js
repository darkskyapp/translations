function join_with_shared_prefix(a, b, joiner) {
  var i = 0,
      j;

  while(i !== a.length &&
        i !== b.length &&
        a.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && a.charCodeAt(i - 1) !== 32)
    --i;

  return a.slice(0, i) + a.slice(i) + joiner + b.slice(i);
}

module.exports = require("../template")({
  "clear": "dégagé",
  "no-precipitation": "pas de précipitations",
  "mixed-precipitation": "précipitations mêlées",
  "possible-very-light-precipitation": "très faibles précipitations possibles",
  "very-light-precipitation": "très faibles précipitations",
  "possible-light-precipitation": "faibles précipitations possibles",
  "light-precipitation": "faibles précipitations",
  "medium-precipitation": "précipitations",
  "heavy-precipitation": "fortes précipitations",
  "possible-very-light-rain": "bruine possible",
  "very-light-rain": "bruine",
  "possible-light-rain": "pluie faible possible",
  "light-rain": "pluie faible",
  "medium-rain": "pluie",
  "heavy-rain": "pluie forte",
  "possible-very-light-sleet": "très faible neige fondue possible",
  "very-light-sleet": "très faible neige fondue",
  "possible-light-sleet": "faible neige fondue possible",
  "light-sleet": "faible neige fondue",
  "medium-sleet": "neige fondue",
  "heavy-sleet": "forte neige fondue",
  "possible-very-light-snow": "averses de neige possibles",
  "very-light-snow": "averses de neige",
  "possible-light-snow": "neige faible possible",
  "light-snow": "neige faible",
  "medium-snow": "neige",
  "heavy-snow": "neige forte",
  "possible-thunderstorm": "orages possibles",
  "thunderstorm": "orage",
  "light-wind": "vent faible",
  "medium-wind": "venté",
  "heavy-wind": "vent fort",
  "low-humidity": "sec",
  "high-humidity": "humide",
  "fog": "brumeux",
  "light-clouds": "nuages épars",
  "medium-clouds": "nuageux",
  "heavy-clouds": "couvert",
  "today-morning": "ce matin",
  "later-today-morning": "dans la matinée",
  "today-afternoon": "cet après-midi",
  "later-today-afternoon": "dans l’après-midi",
  "today-evening": "ce soir",
  "later-today-evening": "dans la soirée",
  "today-night": "cette nuit",
  "later-today-night": "dans la nuit",
  "tomorrow-morning": "demain matin",
  "tomorrow-afternoon": "demain après-midi",
  "tomorrow-evening": "demain soir",
  "tomorrow-night": "demain pendant la nuit",
  "morning": "dans la matinée",
  "afternoon": "dans l’après-midi",
  "evening": "dans la soirée",
  "night": "dans la nuit",
  "today": "aujourd’hui",
  "tomorrow": "demain",
  "sunday": "dimanche",
  "monday": "lundi",
  "tuesday": "mardi",
  "wednesday": "mercredi",
  "thursday": "jeudi",
  "friday": "vendredi",
  "saturday": "samedi",
  "next-sunday": "dimanche prochain",
  "next-monday": "lundi prochain",
  "next-tuesday": "mardi prochain",
  "next-wednesday": "mercredi prochain",
  "next-thursday": "jeudi prochain",
  "next-friday": "vendredi prochain",
  "next-saturday": "samedi prochain",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "moins de $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", et " : " et "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " jusqu’à ");
  },
  "with": "$1, avec $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 pendant la prochaine heure",
  "starting-in": "$1 débutant dans $2",
  "stopping-in": "$1 se terminant dans $2",
  "starting-then-stopping-later": "$1 débutant dans $2, se terminant $3 plus tard",
  "stopping-then-starting-later": "$1 se terminant dans $2, et reprenant $3 plus tard",
  "for-day": "$1 durant toute la journée",
  "starting": "$1 débutant $2",
  "until": function(condition, period) {
    return (condition + " jusqu’à " + period).
      replace("jusqu’à dans", "jusque dans");
  },
  "until-starting-again": function(condition, a, b) {
    return (condition + " jusqu’à " + a + ", reprenant " + b).
      replace("jusqu’à dans", "jusque dans");
  },
  "starting-continuing-until": function(condition, a, b) {
    return (condition + " débutant " + a + ", se prolongeant jusqu’à " + b).
      replace("jusqu’à dans", "jusque dans");
  },
  "during": "$1 $2",
  "for-week": "$1 pendant toute la semaine",
  "over-weekend": "$1 pendant tout le week-end",
  "temperatures-peaking": "des températures atteignant $1 $2",
  "temperatures-rising": "des températures montant jusqu’à $1 $2",
  "temperatures-valleying": "des températures atteignant $1 $2",
  "temperatures-falling": "des températures descendant jusqu’à $1 $2",
  /* Capitalize the first letter of every word, except if that word is "et".
   *
   * Fun fact: JavaScript regex's "\w" and "\b" don't recognize accented
   * characters (such as é or à) and so the neat trick used in the English
   * version of the "title" function can't be used here. (Conveniently,
   * anyway.) */
  "title": function(str) {
    return str.replace(/\S+/g, function(word) {
      return word === "et" ?
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
