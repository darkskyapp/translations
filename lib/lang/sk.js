function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function remove_prefix_and_use_genitive(a) {
  switch(a) {
    case "dnes ráno":
      return "dnešného rána";
    case "dnes dopoludnia":
      return "dnešného dopoludnia";
    case "dnes popoludní":
      return "dnešného popoludnia";
    case "dnes podvečer":
      return "dnešného podvečera";
    case "dnes večer":
      return "dnešného večera";
    case "dnes neskoro večer":
      return "dnešného neskorého večera";
    case "dnes v noci":
      return "dnešnej noci";
    case "dnes neskoro v noci":
      return "dnešnej neskorej noci";
    case "zajtra ráno":
      return "zajtrajšieho rána";
    case "zajtra popoludní":
      return "zajtrajšieho popoludnia";
    case "zajtra večer":
      return "zajtrajšieho večera";
    case "zajtra v noci":
      return "zajtrajšej noci";
    case "ráno":
      return "rána";
    case "popoludní":
      return "popoludnia";
    case "večer":
      return "večera";
    case "v noci":
      return "noci";
    case "v pondelok":
      return "pondelka";
    case "v utorok":
      return "utorka";
    case "v stredu":
      return "stredy";
    case "vo štvrtok":
      return "štvrtka";
    case "v piatok":
      return "piatka";
    case "v sobotu":
      return "soboty";
    case "v nedeľu":
      return "nedele";
    case "budúci pondelok":
      return "budúceho pondelka";
    case "budúci utorok":
      return "budúceho utorka";
    case "budúca streda":
      return "budúcej stredy";
    case "budúci štvrtok":
      return "budúceho štvrtka";
    case "budúci piatok":
      return "budúceho piatka";
    case "budúca sobota":
      return "budúcej soboty";
    case "budúca nedeľa":
      return "budúcej nedele";
    default:
        return a;
  } 
}

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
  "no-precipitation": "bez zrážok",
  "mixed-precipitation": "zmiešané zrážky",
  "possible-very-light-precipitation": "možnosť veľmi slabých zrážok",
  "very-light-precipitation": "veľmi slabé zrážky",
  "possible-light-precipitation": "možnosť slabých zrážok",
  "light-precipitation": "slabé zrážky",
  "medium-precipitation": "zrážky",
  "heavy-precipitation": "silné zrážky",
  "possible-very-light-rain": "možnosť mrholenia",
  "very-light-rain": "mrholenie",
  "possible-light-rain": "možnosť slabého dažďa",
  "light-rain": "slabý dážď",
  "medium-rain": "dážď",
  "heavy-rain": "vydatný dážď",
  "possible-very-light-sleet": "možnosť slabého dažďa so snehom",
  "very-light-sleet": "slabý dážď so snehom",
  "possible-light-sleet": "možnosť slabého dažďa so snehom",
  "light-sleet": "slabý dážď so snehom",
  "medium-sleet": "dážď so snehom",
  "heavy-sleet": "vydatný dážď so snehom",
  "possible-very-light-snow": "možnosť slabého sneženia",
  "very-light-snow": "slabé sneženie",
  "possible-light-snow": "možnosť slabého sneženia",
  "light-snow": "slabé sneženie",
  "medium-snow": "sneženie",
  "heavy-snow": "vydatné sneženie",
  "possible-thunderstorm": "možnosť búrok",
  "thunderstorm": "búrky",
  "light-wind": "slabý vietor",
  "medium-wind": "veterno",
  "heavy-wind": "silný vietor",
  "low-humidity": "nízka vlhkosť",
  "high-humidity": "vysoká vlhkosť",
  "fog": "hmlisto",
  "light-clouds": "čiastočne zamračené",
  "medium-clouds": "prevažne zamračené",
  "heavy-clouds": "zamračené",
  "today-morning": "dnes ráno",
  "later-today-morning": "dnes dopoludnia",
  "today-afternoon": "dnes popoludní",
  "later-today-afternoon": "dnes podvečer",
  "today-evening": "dnes večer",
  "later-today-evening": "dnes neskoro večer",
  "today-night": "dnes v noci",
  "later-today-night": "dnes neskoro v noci",
  "tomorrow-morning": "zajtra ráno",
  "tomorrow-afternoon": "zajtra popoludní",
  "tomorrow-evening": "zajtra večer",
  "tomorrow-night": "zajtra v noci",
  "morning": "ráno",
  "afternoon": "popoludní",
  "evening": "večer",
  "night": "v noci",
  "today": "dnes",
  "tomorrow": "zajtra",
  "sunday": "v nedeľu",
  "monday": "v pondelok",
  "tuesday": "v utorok",
  "wednesday": "v stredu",
  "thursday": "vo štvrtok",
  "friday": "v piatok",
  "saturday": "v sobotu",
  "next-sunday": "budúcu nedeľu",
  "next-monday": "budúci pondelok",
  "next-tuesday": "budúci utorok",
  "next-wednesday": "budúcu stredu",
  "next-thursday": "budúci štvrtok",
  "next-friday": "budúci piatok",
  "next-saturday": "budúcu sobotu",
  "minutes": "$1 min.",
  "fahrenheit": "$1°F",
  "celsius": "$1°C",
  "inches": "$1 in",
  "centimeters": "$1 cm",
  "less-than": "menej ako $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      " a "
    );
  },
  "through": function(a, b) {
    return "od " + remove_prefix_and_use_genitive(a) + " do " + remove_prefix_and_use_genitive(b);
  },
  "with": "$1, $2",
  "range": "$1-$2",
  "parenthetical": function(a, b) {
    return a + " (" + b + (a === "zmiešané zrážky" ? " snehu)" : ")");
  },
  "for-hour": "$1 hodinu",
  "starting-in": "$1 o $2",
  "stopping-in": "$1 skončí o $2",
  "starting-then-stopping-later": "$1 o $2, skončí o $3 neskôr",
  "stopping-then-starting-later": "$1 skončí o $2 a začne znovu o $3 neskôr",
  "for-day": "Počas dňa $1",
  "starting": function(a, b) {
    return "od " + remove_prefix_and_use_genitive(b) + " " + a;
  },
  "until": function(condition, period) {
    return condition + " až do " + remove_prefix_and_use_genitive(period);
  },
  "until-starting-again": function(condition, a, b) {
    var starting = "";
    if(endsWith(condition, "zrážky"))
      starting = ", ktoré začnú znovu ";
    else if(endsWith(condition, "dážď") || endsWith(condition, "dážď so snehom") || endsWith(condition, "vietor"))
      starting = ", ktorý začne znovu ";
    else if(endsWith(condition, "sneženie") || endsWith(condition, "mrholenie"))
      starting = ", ktoré začne znovu ";
    else if(endsWith(condition, "vlhkosť"))
      starting = ", ktorá začne znovu ";
    else if(endsWith(condition, "zamračené") || endsWith(condition, "hmlisto"))
      starting = "a začne znovu ";
    
    return condition + " až do " + remove_prefix_and_use_genitive(a) + starting + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    var continuing = "";
    if(endsWith(condition, "zrážky"))
      continuing = ", ktoré pretrvajú až do ";
    else if(endsWith(condition, "dážď") || endsWith(condition, "dážď so snehom") || endsWith(condition, "vietor"))
      continuing = ", ktorý pretrvá až do ";
    else if(endsWith(condition, "sneženie") || endsWith(condition, "mrholenie"))
      continuing = ", ktoré pretrvá až do ";
    else if(endsWith(condition, "vlhkosť"))
      continuing = ", ktorá pretrvá až do ";
    else if(endsWith(condition, "zamračené") || endsWith(condition, "hmlisto"))
      continuing = " a pretrvá až do ";
    return "od " + remove_prefix_and_use_genitive(a) + " " + condition + continuing + remove_prefix_and_use_genitive(b);
  },
  "during": "$2 $1",
  "for-week": "$1 počas týždňa",
  "over-weekend": "$1 cez víkend",
  "temperatures-peaking": "$2 s teplotným maximom $1",
  "temperatures-rising": "$2 s teplotami stúpajúcimi k $1",
  "temperatures-valleying": "$2 s teplotným minimom $1",
  "temperatures-falling": "$2 s teplotami klesajúcimi k $1",
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
